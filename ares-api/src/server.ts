import {  PrismaClient } from '@prisma/client'
import express, { type Router } from 'express'
import { createServer } from 'http'

const prisma = new PrismaClient()
export const app = express()
export const server = createServer(app)

app.use(express.json())

app.get('/get/:id', async (req, res) => {
	try {
		const userId = Number(req.params.id);
	
		const user = await prisma.user.findUnique({
		  where: {
			id: userId,
		  },
		});
	
		if (!user) {
		  return res.status(404).json({ error: 'User not found' });
		}

		return res.json(user);
	  } catch (error) {
		return res.status(500).json({ error: 'Internal server error' });
	  }
})


