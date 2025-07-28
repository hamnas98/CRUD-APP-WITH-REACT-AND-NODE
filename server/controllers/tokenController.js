import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateToken.js'
import User from '../models/User.js'
import Admin from '../models/Admin.js'

const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ message: 'No Refresh Token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        
        let userData;
        if (decoded.role === 'admin') {
            userData = await Admin.findById(decoded.id).select('-password');
            if (!userData) {
                return res.status(401).json({ message: 'Admin not found' });
            }
        } else {
            userData = await User.findById(decoded.id).select('-password');
            if (!userData) {
                return res.status(401).json({ message: 'User not found' });
            }
        }
        const payload = { id: userData._id, role: decoded.role };
        const accessToken = generateAccessToken(payload);
        const response = {
            accessToken,
            message: 'Access token refreshed successfully'
        };
        if (decoded.role === 'admin') {
            response.admin = {
                id: userData._id,
                name: userData.name,
                email: userData.email,
            };
        } else {
            response.user = {
                id: userData._id,
                name: userData.name,
                email: userData.email,
                profileImage: userData.profileImage,
            };
        }
        return res.status(200).json(response);

    } catch (error) {
        console.error('Refresh token error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid refresh token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Refresh token expired' });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

export { refreshAccessToken }