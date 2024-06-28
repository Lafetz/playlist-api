import express from "express";
import * as Playlist from "../controllers/playlist.controller";
import { requireUser } from "../middleware/requireUser";

const router = express.Router();
/**
 * @swagger
 * /api/playlists:
 *   post:
 *     tags:
 *       - Playlists
 *     summary: Create a playlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Playlist title
 *               description:
 *                 type: string
 *                 description: Playlist description
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       403:
 *         description: Forbidden
 */
router.post("/", requireUser, Playlist.createPlaylistHandler);

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Get all playlists
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, createdAt]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of playlists
 *       403:
 *         description: Forbidden
 */
router.get("/", requireUser, Playlist.getPlaylistsHandler);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Get a specific playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist details
 *       403:
 *         description: Forbidden
 *       404:
 *         description: playlist not found
 */
router.get("/:id", requireUser, Playlist.getPlaylistHandler);

/**
 * @swagger
 * /api/playlists/{id}:
 *   put:
 *     tags:
 *       - Playlists
 *     summary: Update a playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Playlist title
 *               description:
 *                 type: string
 *                 description: Playlist description
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: playlist not found
 */
router.put("/:id", requireUser, Playlist.updatePlaylistHandler);

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     tags:
 *       - Playlists
 *     summary: Delete a playlist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Playlist ID
 *     responses:
 *       200:
 *         description: playlist updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: song not found 
 */
router.delete("/:id", requireUser, Playlist.deletePlaylistHandler);
export default router ;