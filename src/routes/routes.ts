import express from "express";
import  signin  from "../controllers/sigin.controller";
import  signup from "../controllers/signup.controller";
import { createPlaylistHandler, deletePlaylistHandler, getPlaylistHandler, getPlaylistsHandler, updatePlaylistHandler } from "../controllers/playlist.controller";
import { createSongHandler, deleteSongHandler, getSongHandler, getSongsHandler, updateSongHandler } from "../controllers/song.controller";

import { requireUser } from "../middleware/requireUser";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
//playlist

router.post("/playlists",requireUser, createPlaylistHandler);
router.get("/playlists", requireUser,getPlaylistsHandler);
router.get("/playlists/:id",requireUser, getPlaylistHandler);
router.put("/playlists/:id",requireUser, updatePlaylistHandler);
router.delete("/playlists/:id", requireUser,deletePlaylistHandler);

//song

router.post("/songs",requireUser, createSongHandler);
router.get("/songs",requireUser, getSongsHandler);
router.get("/songs/:id", requireUser,getSongHandler);
router.put("/songs/:id",requireUser, updateSongHandler);
router.delete("/songs/:id", requireUser,deleteSongHandler);
export default router ;