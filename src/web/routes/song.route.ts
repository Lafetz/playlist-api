import express from "express";
import * as Song from "../controllers/song.controller";
import { requireUser } from "../middleware/requireUser";

const router = express.Router();
/**
 * @swagger
 * /api/songs:
 *   post:
 *     tags:
 *       - Songs
 *     summary: Create a song
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Song name
 *               url:
 *                 type: string
 *                 format: url
 *                 description: Song URL
 *               playlistId:
 *                 type: string
 *                 description: Playlist ID
 *     responses:
 *       200:
 *         description: playlist deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: playlist not found
 */
router.post("/", requireUser, Song.createSongHandler);

/**
 * @swagger
 * /api/songs:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get all songs
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
 *           enum: [name, createdAt]
 *         description: Sort order
 *       - in: query
 *         name: playlistId
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: list of songs
 *       403:
 *         description: Forbidden
 *       404:
 *         description: playlsit not found
 */
router.get("/", requireUser, Song.getSongsHandler);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     tags:
 *       - Songs
 *     summary: Get a specific song
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Song ID
 *     responses:
 *       200:
 *         description: song detail
 *       403:
 *         description: Forbidden
 *       404:
 *         description: song not found
 */
router.get("/:id", requireUser, Song.getSongHandler);

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     tags:
 *       - Songs
 *     summary: Update a song
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Song ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Song name
 *               url:
 *                 type: string
 *                 format: url
 *                 description: Song URL
 *     responses:
 *       200:
 *         description: Song updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: song not found
 */
router.put("/:id", requireUser, Song.updateSongHandler);

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     tags:
 *       - Songs
 *     summary: Delete a song
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: Song ID
 *     responses:
 *       200:
 *         description: song deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: song not found
 */
router.delete("/:id", requireUser, Song.deleteSongHandler);
export default router;
