import User from '../models/User.js'

import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js'

const signUpUser = async (req,res) => {

    console.log(req.body)
    
    const {name, email, password} = req.body;

    try {

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({message: 'User already Exists'})
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
        res.status(500).json({message: 'Server Error'})
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const payload = { id: user._id, role: 'user' };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({message: 'User login successfull',
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.log
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getUserDashboard = async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({message: 'User not found'})
        }
        res.json({
            message: 'User dashboard fetched successfully',
            user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
        },
    });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const uploadImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log("api called")

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Image uploaded', user });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Image upload failed' });

  }
};

export {signUpUser,loginUser,getUserDashboard,logout,uploadImage}