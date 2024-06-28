import Song from "../models/song.model";
import Playlist from "../models/playlist.model";
import mongoose from "mongoose";
import { CreateSong, SongQuery } from "../../core/use-cases/song";

export const createSong = async (song:CreateSong) => {
    let createdSong;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
    
      createdSong = await Song.create([{ ...song}], { session });
      createdSong = createdSong[0]; 
  
      const playlist = await Playlist.findByIdAndUpdate(
        song.playlistId,
        { $push: { songs: createdSong._id } },
        { new: true, session }
      );
      if (!playlist) {
        throw new Error("playlist not found")
      }
      await session.commitTransaction();
      return createdSong;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

export const getSong = async (id: string) => {
  return await Song.findById(id);
};

export const updateSong = async (id: string, updateData: Partial<{ name: string; url: string; }>) => {

  return await Song.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteSong = async (id: string) => {
    let deletedSong;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      deletedSong = await Song.findByIdAndDelete(id).session(session);
      if (!deletedSong) {
        return null
      }
      //
      const playlist = await Playlist.findByIdAndUpdate(
        deletedSong.playlistId,
        { $pull: { songs: deletedSong._id } },
        { new: true, session }
      );
      if (!playlist) {
        console.error("playlist not found")
       return null
      }
  //
      await session.commitTransaction();
      return deletedSong;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

  export const getSongs = async (playlistId: string, query:SongQuery) => {
    const {offset= 1, limit = 10, sort = 'name'}=query
    const skip = (offset - 1) * limit;
    return await Song.find({ playlistId: playlistId })
      .sort(sort)
      .skip(skip)
      .limit(limit);
  };