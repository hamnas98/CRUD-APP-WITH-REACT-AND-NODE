import express from "express";
import { getAdminDashboard, loginAdmin } from "../conrollers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/dashboard', verifyToken, verifyAdmin, getAdminDashboard)

export default router