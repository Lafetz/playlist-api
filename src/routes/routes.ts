import express from "express";
import  signin  from "../controllers/sigin.controller";
import  signup from "../controllers/signup.controller";
import { createPlaylistHandler, deletePlaylistHandler, getPlaylistHandler, getPlaylistsHandler, updatePlaylistHandler } from "../controllers/playlist.controller";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
//playlist
router.post("/playlist", createPlaylistHandler);
router.get("/playlist", getPlaylistsHandler);
router.get("/playlist/:id", getPlaylistHandler);
router.put("/playlist/:id", updatePlaylistHandler);
router.delete("/playlist/:id", deletePlaylistHandler);

//song
export default router ;