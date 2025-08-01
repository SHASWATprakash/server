// --- Updated commentRoutes.js ---
import express from "express";
import { addComment, getProjectComments } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projects/:id/comments", verifyToken, addComment);
router.get("/projects/:id/comments", getProjectComments); // ✅ Add this line

export default router;
