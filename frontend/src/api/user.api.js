import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';
const AUTH_URL = 'http://localhost:3000/api/v1/auth';


export const getAllDeletedUsers = async () => {
  return await axios.get(`${API_URL}/deleted`);
};

export const registerUser = async (userData) => {
  return await axios.post(`${AUTH_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${AUTH_URL}/login`, credentials);
};

export const getProtectedResource = async (token) => {
  return await axios.get(`${AUTH_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserByName = async (name) => {
  return await axios.get(`${API_URL}/name/${name}`);
};

export const softDeleteUser = async (username, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/delete/${username}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error soft deleting user:', error);
    throw error;
  }
};

export const updateUser = async (username, userData, token) => {
  return await axios.patch(`${API_URL}/update/${username}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserData = async (token) => {
  return await axios.get(`${API_URL}/data`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const checkUsernameExists = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/check_username/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/check_email/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

export const fetchUserFavorites = async (username) => {
    const response = await axios.get(`${API_URL}/favorites/${username}`);
    return response.data.favorites;
};