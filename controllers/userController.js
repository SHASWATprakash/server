
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

export const getAuthenticatedUserProfile = async (req, res) => {
  console.log("✅ getAuthenticatedUserProfile function reached"); // Log at the beginning
  console.log("🔍 Request user:", req.user); // Log the user info from the token

  const userId = req.user.id; // Assuming your verifyToken middleware adds user info to req.user

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
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

    if (!user) {
      console.log(`❌ User with ID ${userId} not found`); // Log if user not found
      return res.status(404).json({ error: "User not found" });
    }

    console.log(`✅ User with ID ${userId} found`); // Log if user found
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching authenticated user profile:", error);
    res.status(500).json({ error: "Failed to fetch authenticated profile" });
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


export const getAuthenticatedUserProjects = async (req, res) => {
  console.log("✅ getAuthenticatedUserProfile function reached"); // Log at the beginning
  console.log("🔍 Request user:", req.user);
  // Log at the beginning
  const userId = req.user.id; // Get user ID from the verified token

  try {
    const userProjects = await prisma.project.findMany({
      where: { userId: Number(userId) }, // Use 'userId' to match your schema
    });
    console.log(`✅ Found ${userProjects.length} projects for user ID ${userId}`);
    res.status(200).json(userProjects);
  } catch (error) {
    console.error("❌ Error fetching authenticated user projects:", error);
    res.status(500).json({ error: "Failed to fetch authenticated user projects" });
  }
};
