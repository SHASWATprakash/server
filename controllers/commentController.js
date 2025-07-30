import { prisma } from "../lib/prisma.js";

export const addComment = async (req, res) => {
  const { id: projectId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

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
