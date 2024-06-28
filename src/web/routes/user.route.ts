import express from "express";
import signin from "../controllers/sigin.controller";
import signup from "../controllers/signup.controller";

const router = express.Router();

/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags:
 *     - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     tags:
 *     - User
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
router.post("/signin", signin);
export default router;
