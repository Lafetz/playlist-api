import * as repository from "../../repository/impl/song.repository";
import { CreateSong, UpdateSong, SongQuery } from "../use-cases/song";

export const createSong = async (song: CreateSong) => {
    return repository.createSong( song);
};

export const getSong = async (id: string) => {
    return repository.getSong(id);
};

export const updateSong = async (id: string, song: UpdateSong) => {
    return repository.updateSong(id, song);
};

export const deleteSong = async (id: string) => {
    return repository.deleteSong(id);
};

export const getSongs = async (playlistId: string, query: SongQuery) => {
    return repository.getSongs(playlistId, query);
};