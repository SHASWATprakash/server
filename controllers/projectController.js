// controllers/projectController.js
import { prisma } from "../lib/prisma.js";

export const createProject = async (req, res) => {
  const { title, description, techStack, githubLink, liveLink } = req.body;
  const userId = req.user.id;

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        techStack,
        githubLink,
        liveLink,
        userId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { user: true },
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, description, techStack, githubLink, liveLink } = req.body;

  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project || project.userId !== userId)
      return res.status(403).json({ error: "Unauthorized" });

    const updated = await prisma.project.update({
      where: { id: Number(id) },
      data: { title, description, techStack, githubLink, liveLink },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project || project.userId !== userId)
      return res.status(403).json({ error: "Unauthorized" });

    await prisma.project.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
