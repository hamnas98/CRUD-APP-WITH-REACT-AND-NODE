import Admin from "../models/Admin.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import User from '../models/User.js'


const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = { id: admin._id, role: 'admin' };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
    console.log('admin loged')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getAdminDashboard = async (req,res) => {
        try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if(!admin) {
            return res.status(404).json({messege: 'Admin not found'})
        }
        res.json({
            message: 'Admin dashboard fetched successfully',

            admin: {
            id: admin._id,
            email: admin.email,
        },
    });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const editUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is being updated to another existing user's email
    if (email) {
      const existing = await User.findOne({ email });

      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(400).json({ message: 'Email is already in use by another user' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user: updatedUser });

  } catch (err) {
    console.error('Edit user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, profileImage });

    res.status(201).json({
      message: 'User created by admin',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

const logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


export {loginAdmin, getAdminDashboard,editUser,deleteUser,createUser,getAllUsers,logout}