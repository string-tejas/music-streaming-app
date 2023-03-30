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
}



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