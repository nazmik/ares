import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const jwtToken = ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  const user = { name, password };
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN!, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN!, {
    expiresIn: "6m",
  });
  return { accessToken, refreshToken };
};

interface CustomRequest extends Request {
  user?: any;
}
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.json({ error: "Null token" });
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!, (error, user) => {
    if (error) return res.json({ error: error });
    req.user = user;
    next();
  });
};
