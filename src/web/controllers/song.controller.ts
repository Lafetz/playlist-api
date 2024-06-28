import { Request, Response, NextFunction } from 'express';
import * as SongService from "../../core/services/song.service"
import { NotFoundError } from '../errors/notFound.error';
import { validateRequest } from '../validator/validateRequest';
import { validateSongCreate, validateSongUpdate } from '../validator/validateSong';
import { validateParam, validateQuerySong } from '../validator/validateParam';
import { UnauthorizedAccess } from '../errors/unauthorized.error';
export const createSongHandler = [...validateSongCreate,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, url, playlistId } = req.body;
    //@ts-ignore
    const userId=req.user.id
    const song = await SongService.createSong({name, url, playlistId,userId})
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
}]

export const getSongHandler =[...validateParam,validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const song = await SongService.getSong(id);
    if (!song) {
      throw new NotFoundError();
    }
    res.status(200).json(song);
  } catch (err) {
    next(err);
  }
}]

export const getSongsHandler =[ ...validateQuerySong,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sort,playlistId} = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const sortOption = sort as string; 
    //@ts-ignore
    const songs = await SongService.getSongs(playlistId as string,{offset:pageNumber, limit:limitNumber, sort:sortOption});
    res.status(200).json(songs);
  } catch (err) {
    next(err);
  }
}]

export const updateSongHandler = [ ...validateParam,...validateSongUpdate,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
      //@ts-ignore
    const userId=req.user.id
    const { id } = req.params;
    const song = await SongService.getSong(id);
    if (!song) {
      throw new NotFoundError();
    }
   if(song.userId.toString()!==userId){
    throw new UnauthorizedAccess()
   }
    const { name, url } = req.body;
    const updatedSong = await SongService.updateSong(id, { name, url });
    if (!updatedSong) {
      throw new NotFoundError();
    }
    res.status(200).json(updatedSong);
  } catch (err) {
    next(err);
  }
}]

export const deleteSongHandler =[ ...validateParam,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
      //@ts-ignore
      const userId=req.user.id
      const { id } = req.params;
      const song = await SongService.getSong(id);
      if (!song) {
        throw new NotFoundError();
      }
     if(song.userId.toString()!==userId){
      throw new UnauthorizedAccess()
     }
    const deletedSong = await SongService.deleteSong(id);
    if (!deletedSong) {
      throw new NotFoundError();
    }
    res.status(200).json(deletedSong);
  } catch (err) {
    next(err);
  }
}]