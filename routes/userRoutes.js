import express from "express";
import { updateUserProfile, getUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/users/:id", verifyToken, updateUserProfile);
router.get("/users/:id", getUserProfile);

export default router;
