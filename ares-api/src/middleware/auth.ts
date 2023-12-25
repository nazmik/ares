import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
	user?: any
}
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) return res.json({ error: "Null token" })
	jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!, (error, user) => {
		if (error) return res.json({ error: error })
		req.user = user;
		next()
	})

};
