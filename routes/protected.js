// routes/protected.js
import express from 'express';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed!', user: req.user });
});

export default router;
