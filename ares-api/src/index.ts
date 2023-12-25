import { PrismaClient } from "@prisma/client";
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";
import authRouter from "./routes/auth";
dotenv.config();
const corsOptions = { credentials: true };

const prisma = new PrismaClient();
const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api/users", router);
app.use("/api/auth", authRouter);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running, listening on: ${process.env.PORT || 5000}`);
});
