import mongoose from "mongoose";
import Playlist from "../models/playlist.model";
import Song from "../models/song.model";
import { NotFoundError } from "../../errors/notFound.error";

export const createPlaylist = async (title: string, description: string,userId:string) => {
  const playlist = new Playlist({ title, description,userId });
  await playlist.save();
  return playlist;
};

export const getPlaylist = async (id: string) => {
  return await Playlist.findById(id).populate('songs');
};

export const updatePlaylist = async (id: string, updateData: Partial<{ title: string; description: string; }>) => {
  return await Playlist.findByIdAndUpdate(id, updateData, { new: true }).populate('songs');
};

export const deletePlaylist = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
      const playlist = await Playlist.findById(id).session(session);
      if (!playlist) {
        throw new NotFoundError();
      }
      const songsToDelete = await Song.find({ playlist: id }).session(session);
      const songIds = songsToDelete.map(song => song._id);
      await Song.deleteMany({ _id: { $in: songIds } }).session(session);
      await Playlist.findByIdAndDelete(id).session(session);

      await session.commitTransaction();

  } catch (error) {
     
      await session.abortTransaction();
      throw error;
  } finally {
      session.endSession();
  }
};
export const getPlaylists = async (page: number = 1, limit: number = 10, sort: string = '-createdAt') => {
  const skip = (page - 1) * limit;
  return await Playlist.find().sort(sort).skip(skip).limit(limit).populate('songs');
};