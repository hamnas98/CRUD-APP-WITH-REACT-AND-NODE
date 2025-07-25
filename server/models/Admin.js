import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
    {
        name : {type : string, require: true},
        email : {type : string, require : true, unique : true},
        password : {type : string, require : true},
        profileImage : {type: string,default : ''}
    },
    {timestamps: true}
);

// hashing password before saving DB
adminSchema.pre('save', async (next) => {
    if(!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
});

// comparing password during login

adminSchema.method.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword,this.password)
};