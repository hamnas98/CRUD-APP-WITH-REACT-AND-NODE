import Admin from "../models/Admin.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";


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


export {loginAdmin, getAdminDashboard}