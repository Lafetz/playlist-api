import * as repository from "../../repository/impl/playlist.repository"
import { CreatePlaylist, PlaylistQuery, UpdatePlaylist } from "../use-cases/playlist";


export const createPlaylist = async ( userId: string, playlist: CreatePlaylist) => {
    return repository.createPlaylist(userId, playlist);
};

export const getPlaylist = async ( id: string) => {
    return repository.getPlaylist(id);
};

export const updatePlaylist = async ( id: string, playlist: UpdatePlaylist) => {
    return repository.updatePlaylist(id, playlist);
};

export const deletePlaylist = async ( id: string) => {
    return repository.deletePlaylist(id);
};

export const getPlaylists = async ( id: string, query: PlaylistQuery) => {
    return repository.getPlaylists(id, query);
};