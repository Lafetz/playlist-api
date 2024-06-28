import {
  validatePlaylistCreate,
  validatePlaylistUpdate
} from "../validator/validatePlaylist";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../validator/validateRequest";
import * as PlaylistService from "../../core/services/playlist.service";
import { validateParam, validateQueryPlay } from "../validator/validateParam";
import { NotFoundError } from "../errors/notFound.error";
import { UnauthorizedAccess } from "../errors/unauthorized.error";
export const createPlaylistHandler = [
  ...validatePlaylistCreate,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const userId = req.user.id;
      //@ts-ignore
      const { title, description } = req.body;

      const playlist = await PlaylistService.createPlaylist(userId, {
        title,
        description
      });

      res.status(201).json(playlist);
    } catch (err) {
      next(err);
    }
  }
];
export const getPlaylistHandler = [
  ...validateParam,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const playlist = await PlaylistService.getPlaylist(id);
      if (!playlist) {
        throw new NotFoundError();
      }
      res.status(200).json(playlist);
    } catch (err) {
      next(err);
    }
  }
];
export const getPlaylistsHandler = [
  ...validateQueryPlay,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const userId = req.user.id;
      const { page, limit, sort } = req.query;
      const pageNumber = parseInt(page as string, 10) || 1;
      const limitNumber = parseInt(limit as string, 10) || 10;
      const sortOption = sort as string;
      const playlists = await PlaylistService.getPlaylists(userId, {
        limit: limitNumber,
        offset: pageNumber,
        //@ts-ignore
        sort: sortOption
      });

      res.status(200).json(playlists);
    } catch (err) {
      next(err);
    }
  }
];

export const updatePlaylistHandler = [
  ...validateParam,
  ...validatePlaylistUpdate,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //@ts-ignore
      const userId = req.user.id;
      const { id } = req.params;
      const { title, description } = req.body;
      const playlist = await PlaylistService.getPlaylist(id);
      if (!playlist) {
        throw new NotFoundError();
      }
      if (playlist.userId.toString() != userId) {
        throw new UnauthorizedAccess();
      }
      const updatedPlaylist = await PlaylistService.updatePlaylist(id, {
        title,
        description
      });
      if (!updatedPlaylist) {
        throw new NotFoundError();
      }

      res.status(200).json(updatedPlaylist);
    } catch (err) {
      next(err);
    }
  }
];

export const deletePlaylistHandler = [
  ...validateParam,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      ///@ts-ignore
      const userId = req.user.id;
      const { id } = req.params;
      const playlist = await PlaylistService.getPlaylist(id);
      if (!playlist) {
        throw new NotFoundError();
      }
      if (playlist.userId.toString() !== userId) {
        throw new UnauthorizedAccess();
      }
      const deletedPlaylist = await PlaylistService.deletePlaylist(id);
      if (!deletedPlaylist) {
        throw new NotFoundError();
      }

      res.status(200).json(deletedPlaylist);
    } catch (err) {
      next(err);
    }
  }
];
