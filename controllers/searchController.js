// controllers/searchController.js
import { prisma } from "../lib/prisma.js";

export const search = async (req, res) => {
  const query = req.query.q;

  try {
    // Find users by name and include their projects
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select: {
        id: true,
        name: true,
        projects: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });

    // Find projects by title (not related to users necessarily)
    const projectsWithSameTitle = await prisma.project.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    res.status(200).json({ users, projectsWithSameTitle });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to perform search" });
  }
};
