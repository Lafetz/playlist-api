import { Request, Response, NextFunction } from 'express';
import { createSong, deleteSong, getSong, getSongs, updateSong } from '../db/repository/song.repository';
import { NotFoundError } from '../errors/notFound.error';

import { validateRequest } from '../validator/validateRequest';
import { validateSongCreate, validateSongUpdate } from '../validator/validateSong';

import { validateParam,validateQueryParams } from '../validator/validateParam';
export const createSongHandler = [...validateSongCreate,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, url, playlistId } = req.body;
    //@ts-ignore
    const userId=req.user.id
  
    const song = await createSong(name, url, playlistId,userId);
    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
}]

export const getSongHandler =[...validateParam,validateRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const song = await getSong(id);
    if (!song) {
      throw new NotFoundError();
    }
    res.status(200).json(song);
  } catch (err) {
    next(err);
  }
}]

export const getSongsHandler =[ ...validateQueryParams,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, sort } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const sortOption = sort as string; 
    const songs = await getSongs(pageNumber, limitNumber, sortOption);
    res.status(200).json(songs);
  } catch (err) {
    next(err);
  }
}]

export const updateSongHandler = [ ...validateParam,...validateSongUpdate,validateRequest,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, url } = req.body;
    const updatedSong = await updateSong(id, { name, url });
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
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (!deletedSong) {
      throw new NotFoundError();
    }
    res.status(200).json(deletedSong);
  } catch (err) {
    next(err);
  }
}]