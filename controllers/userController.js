
import { prisma } from "../lib/prisma.js";


export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { bio } = req.body; // Assuming bio is also part of the update


  if (Number(id) !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized to update this profile" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name , bio},
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// ✅ GET /api/users/:id — get profile with projects & comments
export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        projects: true,
        comments: {
          include: {
            project: {
              select: { id: true, title: true },
            },
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
