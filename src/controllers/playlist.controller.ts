import { Request, Response, NextFunction } from "express"
import { createPlaylist, deletePlaylist, getPlaylist, getPlaylists, updatePlaylist } from "../db/repository/playlist.repository";
import { NotFoundError } from "../errors/notFound.error";
import { validatePlaylistCreate, validatePlaylistUpdate } from "../validator/validatePlaylist";
import { validateRequest } from "../validator/validateRequest";
import { validateParam, validateQueryParams } from "../validator/validateParam";
export const createPlaylistHandler=[...validatePlaylistCreate,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
     //@ts-ignore
     const userId=req.user.id
      const playlist=await createPlaylist(title,description,userId)
      res.status(201).json(playlist);
    } catch (err) {
      next(err);
    }
  }]
  export const getPlaylistHandler = [ ...validateParam ,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const playlist = await getPlaylist(id);
      if(!playlist) {
       throw new NotFoundError
      }
  
      res.status(200).json(playlist);
    } catch (err) {
      next(err);
    }
  }]
  export const getPlaylistsHandler = [...validateQueryParams,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, sort } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const sortOption = sort as string ;
      const playlists = await getPlaylists(pageNumber, limitNumber, sortOption);
      res.status(200).json(playlists);
    } catch (err) {
      next(err);
    }
  }]

  export const updatePlaylistHandler =[ ...validateParam ,...validatePlaylistUpdate,validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedPlaylist = await updatePlaylist(id, { title, description });
      if (!updatedPlaylist) {
        throw new NotFoundError
      }
  
      res.status(200).json(updatedPlaylist);
    } catch (err) {
      next(err);
    }
  }]
  
  export const deletePlaylistHandler = [ ...validateParam ,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedPlaylist = await deletePlaylist(id);
      if(!deletePlaylist){
        throw new NotFoundError
      }
  
      res.status(200).json(deletedPlaylist);
    } catch (err) {
      next(err);
    }
  }]
  


  