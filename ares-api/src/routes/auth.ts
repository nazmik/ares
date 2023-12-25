import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../utils/jwt-helper";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const userEntry = await prisma.user.findFirst({
      where: {
        name: { equals: String(name) },
      },
    });
    if (!userEntry) {
      return res.json({
        error: "Name incorrect!",
      });
    }
    const validPass = await bcrypt.compare(password, userEntry.password);

    if (!validPass) {
      return res.json({
        error: "Password incorrect!!!",
      });
    }

    //return jwt
    let tokens = jwtToken(userEntry);
    res.cookie("refresh__token", tokens.refreshToken, { httpOnly: true });
    res.json({ tokens });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh__token
    if (!refreshToken) return res.json({ error: "Null refresh token" })
    //@ts-expect-error
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN!, (error, user) => {
      if (error) return res.json({ error: error.message })
      let token = jwtToken(user)
      res.cookie('refresh_token', token.accessToken, { httpOnly: true })
      res.json(token.accessToken)
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router;
