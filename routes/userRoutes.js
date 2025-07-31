import express from "express";
import { updateUserProfile, getUserProfile , getAuthenticatedUserProfile, getAuthenticatedUserProjects} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/users/:id", verifyToken, updateUserProfile);
router.get("/users/:id", getUserProfile);
router.get("/user/profile", verifyToken, getAuthenticatedUserProfile);
router.get("/user/projects", verifyToken, getAuthenticatedUserProjects);


export default router;
