import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await prisma.user.findMany();    
		res.status(200);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getItems = async (req: Request, res: Response): Promise<void> => {
	try {
		const item = await prisma.item.findMany();
		res.status(200);
		res.send(item);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

// Post for a manually populating the database with the data by using Postman

const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await prisma.user.create({
      data: req.body
    });
		res.status(201);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const addItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const item = await prisma.item.create({
      data: req.body
    });
		res.status(201);
		res.send(item);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const controller = {
	getUsers,
  getItems,
  addUser,
  addItem
};

export default controller;
