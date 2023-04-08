import axios from "axios";

const baseURL = "http://localhost:4000/api";

const api = axios.create({
    baseURL: baseURL,
});

export const validateUser = async (token) => {
    try {
        const res = await api.get(`/users/login`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error?.response?.data);
    }
};

export const getAllUsers = async () => {
    try {
        const res = await api.get("/users/getUsers");
        return res.data;
    } catch (error) {
        console.log(error?.response?.data);
        return null;
    }
};

export const removeUser = async (userId) => {
    try {
        const res = api.delete(`/users/delete/${userId}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const changingUserRole = async (userId, role) => {
    try {
        const res = api.put(`/users/updateRole/${userId}`, {
            data: { role: role },
        });
        return res;
    } catch (error) {
        return null;
    }
};

export const changeUserToArtist = async (userId, role) => {
    try {
        const res = api.put(`/users/updateUserToArtist/${userId}`, {
            data: { role: role },
        });
        return res;
    } catch (error) {
        return null;
    }
};

export const requestArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}/requests/createRequest`, { ...data });
        return res;
    } catch (error) {
        console.log("err in request artist : ", error);
    }
};

export const approveRequestProperty = async (requestId) => {
    try {
        const res = axios.put(`${baseURL}/requests/approveRequest/${requestId}`);
        return res;
    } catch (error) {
        console.log("err in request artist : ", error);
    }
};

export const getArtistRequests = async () => {
    try {
        const res = axios.get(`${baseURL}/requests/getRequests`);
        return res;
    } catch (error) {
        console.log("err in request artist : ", error);
    }
};

export const updateSongCount = async (songId) => {
    try {
        const res = api.put(`/songs/updateCount/${songId}`);
        return res;
    } catch (error) {
        console.log("error in count : ", error);
        return null;
    }
};

export const getTrendingSongs = async () => {
    try {
        const res = api.get(`/songs/trending`);
        return res;
    } catch (error) {
        console.log("error in trending : ", error);
        return null;
    }
};

export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}/songs/getAllSongs`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}/albums/getAllAlbums`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getAllArtist = async () => {
    try {
        const res = await axios.get(`${baseURL}/artists/getAllArtists`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const saveNewArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}/artists/save`, { ...data });
        return (await res).data.artist;
    } catch (error) {
        return null;
    }
};

export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseURL}/albums/save`, { ...data });
        return (await res).data.album;
    } catch (error) {
        return null;
    }
};

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}/songs/save`, { ...data });
        return (await res).data.song;
    } catch (error) {
        return null;
    }
};

export const deleteSongById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}/songs/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};
export const deleteAlbumById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}/albums/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};
export const deleteArtistById = async (id) => {
    try {
        const res = axios.delete(`${baseURL}/artists/delete/${id}`);
        return res;
    } catch (error) {
        return null;
    }
};

export const searchAll = async (query) => {
    try {
        const res = await axios.get(`${baseURL}/search?query=${query}`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const exploreSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}/songs/explore-category`);
        return res.data;
    } catch (error) {
        return null;
    }
};

// write full function getArtistByName
export const getArtistByName = async (name) => {
    try {
        const res = await axios.get(`${baseURL}/artists/getArtistByName/${name}`);
        return res.data;
    } catch (error) {
        return null;
    }
};

// get songs by artist name
export const getSongsByArtistName = async (name) => {
    try {
        const res = await axios.get(`${baseURL}/songs/by-artist/${name}`);
        return res.data;
    } catch (error) {
        return null;
    }
};

// favorite a song
export const favoriteSongWithId = async (songId) => {
    try {
        const res = await api.get(`${baseURL}/songs/favorite/${songId}`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const unfavoriteSongWithId = async (songId) => {
    try {
        const res = await api.get(`${baseURL}/songs/unfavorite/${songId}`);
        return res.data;
    } catch (error) {
        return null;
    }
};
