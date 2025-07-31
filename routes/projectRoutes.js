// routes/projectRoutes.js
import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getUserProjectsWithComments,
  
} from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);
router.get("/users/:id/projects-with-comments", getUserProjectsWithComments);

// Optional: logged-in user's own projects with comments
router.get("/me/projects-with-comments", verifyToken, getUserProjectsWithComments);

export default router;
