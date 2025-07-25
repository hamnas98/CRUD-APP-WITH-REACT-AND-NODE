import express from 'express'
import { loginUser, signUpUser } from '../conrollers/user/userController.js';

const router = express.Router();

router.post('/sign-up',signUpUser);

router.post('/login',loginUser)

export default router