import mongoose from "mongoose";
import Playlist from "../models/playlist.model";
import Song from "../models/song.model";
import { CreatePlaylist, PlaylistQuery } from "../../core/use-cases/playlist";


export const createPlaylist = async (userId:string,playlistData: CreatePlaylist) => {
  const playlist = new Playlist({ ...playlistData,userId });
  await playlist.save();
  return playlist;
};

export const getPlaylist = async (id: string) => {
  return await Playlist.findById(id)
};

export const updatePlaylist = async (id: string, updateData: Partial<{ title: string; description: string; }>) => {
  return await Playlist.findByIdAndUpdate(id, updateData, { new: true })
};

export const deletePlaylist = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
      const playlist = await Playlist.findById(id).session(session);
      if (!playlist) {
        return null
      }
      const songsToDelete = await Song.find({ playlist: id }).session(session);
      const songIds = songsToDelete.map(song => song._id);
      await Song.deleteMany({ _id: { $in: songIds } }).session(session);
     const play= await Playlist.findByIdAndDelete(id).session(session);
      await session.commitTransaction();
    return play
  } catch (error) {
     
      await session.abortTransaction();
      throw error;
  } finally {
      session.endSession();
  }
};
export const getPlaylists = async (userId: string, query: PlaylistQuery) => {
  const { offset=0, limit= 10, sort= '-createdAt' } = query;
  const skip = (offset - 1) * limit;
  return await Playlist.find({ userId: userId })
    .sort(sort)
    .skip(skip)
    .limit(limit)
};