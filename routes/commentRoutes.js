import express from "express";
import { addComment } from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/projects/:id/comments", verifyToken, addComment);

export default router;
