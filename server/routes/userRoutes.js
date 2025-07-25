import express from 'express'
import { getUserDashboard, loginUser, signUpUser } from '../conrollers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import {verifyUser} from '../middleware/verifyUser.js'

const router = express.Router();

router.post('/sign-up',signUpUser);

router.post('/login',loginUser);

router.get('/dashboard',verifyToken,verifyUser,getUserDashboard)

export default router