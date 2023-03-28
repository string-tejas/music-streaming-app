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
