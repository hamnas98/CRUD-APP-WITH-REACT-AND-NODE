import express from "express";
import { getAdminDashboard, loginAdmin, deleteUser, createUser, editUser, getAllUsers, logout } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import uploads from '../utils/multer.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/dashboard', verifyToken, verifyAdmin, getAdminDashboard);

router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, verifyAdmin, deleteUser);
router.post('/create-user', verifyToken, verifyAdmin, uploads.single("profileImage"), createUser);
router.put('/users/:id', verifyToken, verifyAdmin, editUser);

router.get('/logout',logout)

export default router