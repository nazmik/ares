import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/auth";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      take: 50
    })
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashPassowrd = await bcrypt.hash(req.body.password, 10);
    const userEntry = await prisma.user.create({
      data: {
        name: String(req.body.name),
        password: hashPassowrd,
      },
    });
    res.json({ users: userEntry });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;