import express from "express";
import { refreshAccessToken } from "../controllers/tokenController.js";


const router = express.Router();

router.get('/refresh-token', refreshAccessToken);

export default router;