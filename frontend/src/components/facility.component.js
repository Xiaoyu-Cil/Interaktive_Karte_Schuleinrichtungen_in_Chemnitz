import React, { useState, useEffect } from 'react';
import { 
  getAllFacilities, 
  getFacilityByCategory, 
  getFacilityById, 
  getFacilityByArt 
} from '../api/facility.api';

const FacilityComponent = () => {
  const [facilities, setFacilities] = useState([]);
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [artType, setArtType] = useState('');

  useEffect(() => {
    fetchAllFacilities();
  }, []);

  const fetchAllFacilities = async () => {
    try {
      const response = await getAllFacilities();
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching all facilities:', error);
    }
  };

  const handleGetFacilityByCategory = async () => {
    try {
      const response = await getFacilityByCategory(category);
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facility by category:', error);
    }
  };

  const handleGetFacilityById = async () => {
    try {
      const response = await getFacilityById(id);
      setFacilities([response.data]);
    } catch (error) {
      console.error('Error fetching facility by id:', error);
    }
  };

  const handleGetFacilityByArt = async () => {
    try {
      const response = await getFacilityByArt(artType);
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facility by art type:', error);
    }
  };

  return (
    <div>
      <h1>Facility Management</h1>
      
      <div>
        <button onClick={fetchAllFacilities}>Get All Facilities</button>
      </div>
      
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button onClick={handleGetFacilityByCategory}>Get Facilities by Category</button>
      </div>
      
      <div>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Facility ID"
        />
        <button onClick={handleGetFacilityById}>Get Facility by ID</button>
      </div>
      
      <div>
        <input
          type="text"
          value={artType}
          onChange={(e) => setArtType(e.target.value)}
          placeholder="Art Type"
        />
        <button onClick={handleGetFacilityByArt}>Get Facilities by Art Type</button>
      </div>
      
      <h2>Facilities List</h2>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.id}>{facility.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FacilityComponent;