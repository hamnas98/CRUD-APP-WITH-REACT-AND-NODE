import express from 'express'
import { getUserDashboard, loginUser, logout, signUpUser, uploadImage } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import {verifyUser} from '../middleware/verifyUser.js'

import uploads from '../utils/multer.js';

const router = express.Router();

router.post('/signup',signUpUser);

router.post('/login',loginUser);

router.get('/dashboard',verifyToken,verifyUser,getUserDashboard);

router.post('/profile-image', verifyToken,verifyUser, uploads.single('image'), uploadImage);

router.get('/logout',logout)

router

export default router