import { Request, Response, NextFunction } from "express"
import { createPlaylist, deletePlaylist, getPlaylist, getPlaylists, updatePlaylist } from "../db/repository/playlist.repository";
import { NotFoundError } from "../errors/notFound.error";
export const createPlaylistHandler=async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const playlist=await createPlaylist(title,description)
      res.status(201).json(playlist);
    } catch (err) {
      next(err);
    }
  };
  export const getPlaylistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const playlist = await getPlaylist(id);
      if(!playlist) {
       throw new NotFoundError
      }
  
      res.json(playlist);
    } catch (err) {
      next(err);
    }
  };
  export const getPlaylistsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, sort } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const sortOption = sort as string || 'title';
      const playlists = await getPlaylists(pageNumber, limitNumber, sortOption);
      res.json(playlists);
    } catch (err) {
      next(err);
    }
  };

  export const updatePlaylistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedPlaylist = await updatePlaylist(id, { title, description });
      if (!updatedPlaylist) {
        throw new NotFoundError
      }
  
      res.json(updatedPlaylist);
    } catch (err) {
      next(err);
    }
  };
  
  export const deletePlaylistHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedPlaylist = await deletePlaylist(id);
      if(!deletePlaylist){
        throw new NotFoundError
      }
  
      res.json(deletedPlaylist);
    } catch (err) {
      next(err);
    }
  };
  


  