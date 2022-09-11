import axios from 'axios';

const API_URL = 'http://localhost:8080/api';


export const addPlaylist = (name) => axios.post(`${API_URL}/paylists`, {
    name
});

export const getAllPlaylists = () => axios.get(`${API_URL}/paylists`);

export const findPlaylistById = (id) => axios.get(`${API_URL}/paylists/${id}`);

export const addContentToPlaylist = (payload) => axios.put(`${API_URL}/paylistsContent`, {
    ...payload
});

export const getContentOfPlaylist = (playlistId) => axios.get(`${API_URL}/paylistsContent/playlist/${playlistId}`);

export const deleteContentOfPlaylist = (id, contentId) => axios.delete(`${API_URL}/paylistsContent/playlist/${id}/content/${contentId}`)

