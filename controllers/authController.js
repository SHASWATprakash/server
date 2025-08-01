import { prisma } from '../lib/prisma.js';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { sign } = jwt;


const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";
console.log("📦 authRoutes loaded");

// 🔐 SIGNUP CONTROLLER
export async function signup(req, res) {
  const { name, email, password } = req.body;
  console.log("Signup Request Received:", { name, email });

  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    // const hashedPassword = await hash(password, 10);
    // console.log("Password hashed");

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: password },
    });
    console.log("User created in DB:", user);

    // Create JWT
    const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("JWT Token created");

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}

// 🔐 LOGIN CONTROLLER
export async function login(req, res) {
      console.log("🚨 login() hit");

  const { email, password } = req.body;
  console.log("🔐 Login attempt:", email);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("🔍 Found user:", user);

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // const valid = await compare(password, user.password);
    // console.log("✅ Password valid:", valid);

    // if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    console.log("🎟️ Token generated:", token);

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
}

