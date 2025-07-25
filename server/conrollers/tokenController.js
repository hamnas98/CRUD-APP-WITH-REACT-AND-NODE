import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateToken'

const refreshAccessToken =  (req,res) => {
    
    const token = req.cookies.refreshAccessToken;

    if (!token) {
        return res.status(401).json({messege : 'No Refresh Token'});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_REFRESH_TOKEN_SECRET);
        const payload = {id:decode.id, role :decode.role};
        const accessToken = generateAccessToken(payload);
        return res.status(200).json({accessToken, messege : 'Access token send successfully'})
    } catch (error) {
        console.log(error);
        res.status(403).json({messege: " Invalid refresh token"})
    }
}

export {refreshAccessToken}