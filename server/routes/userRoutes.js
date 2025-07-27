import express from 'express'
import { getUserDashboard, loginUser, signUpUser,uplaodImage } from '../conrollers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import {verifyUser} from '../middleware/verifyUser.js'

const router = express.Router();

router.post('/signup',signUpUser);

router.post('/login',loginUser);

router.get('/dashboard',verifyToken,verifyUser,getUserDashboard);

router.post('./profile-image',verifyToken,verifyUser,uplaodImage)

export default router