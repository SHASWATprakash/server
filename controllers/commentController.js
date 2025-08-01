// --- Refactored commentController.js ---
import { prisma } from "../lib/prisma.js";

// Add Comment
export const addComment = async (req, res) => {
  const { id: projectId } = req.params;
  const { text } = req.body;
  const userId = req.user?.id;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        userId,
        projectId: Number(projectId),
      },
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("❌ Failed to add comment:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// Get Comments for a Project
export const getProjectComments = async (req, res) => {
  const { id: projectId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { projectId: Number(projectId) },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Failed to fetch comments:", err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};