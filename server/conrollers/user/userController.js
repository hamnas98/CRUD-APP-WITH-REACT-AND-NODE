import User from '../../models/User.js'
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js'

const signUpUser = async (req,res) => {
    
    const {name, email, password} = req.body;

    try {

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({messege: 'User already Exists'})
        }

        const user = await User.create({name, email, password});
        
        const payload = {id:user._id, role: 'user'};
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            messege : 'Logn Successful',
            accessToken,
            user : {
                _id:user._id,
                name:user.name,
                email:user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({messege: 'Server Error'})
    }
}

const loginUser = async (req,res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        const userPassword = await user.matchPassword(password);

        if(!user || !userPassword) {
            return res.status(401).json({messege: 'Invalid Email or Password'})
        }

        const payload = {id:user._id,role : 'user'};
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // Send refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            accessToken,
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            },
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({messege: 'Server Error'})
    }
}

export {signUpUser,loginUser}