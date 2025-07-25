import express from "express";
import { refreshAccessToken } from "../conrollers/tokenController.js";


const router = express.Router();

router.post('/refersh-token', refreshAccessToken)