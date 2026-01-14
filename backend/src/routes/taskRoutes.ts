import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Apply auth middleware to all task routes
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management API
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       201:
 *         description: The task was created
 *       400:
 *         description: Validation error
 */
router.post('/', createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   status:
 *                     type: string
 *                   userId:
 *                     type: integer
 */
router.get('/', getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task description
 *       404:
 *         description: Task not found
 *       403:
 *         description: Access denied
 */
router.get('/:id', getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The task was updated
 *       404:
 *         description: Task not found
 *       403:
 *         description: Access denied
 */
router.put('/:id', updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       204:
 *         description: The task was deleted
 *       404:
 *         description: Task not found
 *       403:
 *         description: Access denied
 */
router.delete('/:id', deleteTask);

export default router;
