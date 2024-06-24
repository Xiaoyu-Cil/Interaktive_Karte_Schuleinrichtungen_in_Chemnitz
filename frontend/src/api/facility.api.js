import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/facilities';

export const getAllFacilities = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const getAllFacilityByCategory = async (category) => {
    return await axios.get(`${API_URL}/category/${category}`);
};

export const getFacilityById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  };

export const getFacilityByArt = async (artType) => {
    return await axios.get(`${API_URL}/art/${artType}`);
};

