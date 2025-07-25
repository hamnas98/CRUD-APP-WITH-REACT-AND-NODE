import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startWith('Bearer ')) {
        return res.status(401).json({messege : 'No Token Provided'})
    }
    const token = authHeader.split(' ')[1];

   try {
        const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        req.user = decoded
        next();
   } catch (error) {
        console.error(error);
        return res.status(401).json({messege : 'Invalid or Expired Token'})
   }
};

export {verifyToken}