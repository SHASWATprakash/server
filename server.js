import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { prisma } from "./lib/prisma.js"; // Use shared client
import protectedRoutes from './routes/protected.js';
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";  


config();




const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/protected', protectedRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", commentRoutes);
app.use("/api", userRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("✅ API is running");
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ DB Connected!");
    

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}


startServer();
