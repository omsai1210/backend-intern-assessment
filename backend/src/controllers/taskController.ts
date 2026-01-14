import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

// Zod Schemas
const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
});

const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional(),
});

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status } = createTaskSchema.parse(req.body);
        const userId = req.user.id;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                userId,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        let tasks;

        if (user.role === 'admin') {
            tasks = await prisma.task.findMany();
        } else {
            tasks = await prisma.task.findMany({ where: { userId: user.id } });
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Access control: User can only see their own, Admin can see any
        if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const data = updateTaskSchema.parse(req.body);

        // Check existence and ownership
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (task.userId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied. You can only update your own tasks.' });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data,
        });

        res.json(updatedTask);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Access control: User (own) or Admin (any)
        if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await prisma.task.delete({ where: { id } });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
