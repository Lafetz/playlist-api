import Song from "../models/song.model";
import Playlist from "../models/playlist.model";
import mongoose from "mongoose";
import { NotFoundError } from "../../errors/notFound.error";


export const createSong = async (name: string, url: string, playlistId: string,userId:string) => {
    let createdSong;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
    
      createdSong = await Song.create([{ name, url, playlistId,userId }], { session });
      createdSong = createdSong[0]; 
  
      const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $push: { songs: createdSong._id } },
        { new: true, session }
      );
  
      if (!playlist) {
        throw new NotFoundError()
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
        throw new NotFoundError();
      }
      //
      const playlist = await Playlist.findByIdAndUpdate(
        deletedSong.playlistId,
        { $pull: { songs: deletedSong._id } },
        { new: true, session }
      );
      if (!playlist) {
        console.error("playlist not found")
        throw new NotFoundError();
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

export const getSongs = async (page: number = 1, limit: number = 10, sort: string = 'name') => {
  const skip = (page - 1) * limit;
  return await Song.find().sort(sort).skip(skip).limit(limit);
};