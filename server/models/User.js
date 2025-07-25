import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true }
);



// hashing password before saving DB
userSchema.pre('save', async (next) => {
    if(!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
});

// comparing password during login

userSchema.method.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword,this.password)
};

const User = mongoose.model('User', userSchema);
export default User;