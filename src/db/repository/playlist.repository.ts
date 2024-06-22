import Playlist from "../models/playlist.model";

export const createPlaylist = async (title: string, description: string) => {
  const playlist = new Playlist({ title, description });
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
  return await Playlist.findByIdAndDelete(id);
};

export const getPlaylists = async (page: number = 1, limit: number = 10, sort: string = 'title') => {
  const skip = (page - 1) * limit;
  return await Playlist.find().sort(sort).skip(skip).limit(limit).populate('songs');
};