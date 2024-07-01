import { useState, useEffect } from "react";
import { getAllFacilities, getAllFacilityByCategory, getFacilityByArt } from "../api/facility.api";

export const useFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [category, setCategory] = useState("alle");
  const [art, setArt] = useState("");
  const [showHome, setShowHome] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [home, setHome] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFacilities = async () => {
      let response;
      try {
        if (category === "alle") {
          response = await getAllFacilities();
        } else if (category === "Schule") {
          if (art) {
            response = await getFacilityByArt(art);
          } else {
            response = await getAllFacilityByCategory(category);
          }
        } else {
          response = await getAllFacilityByCategory(category);
        }
        setFacilities(response.data);
        setCategory(category);
        if (category === "alle" || allFacilities.length === 0) {
          setAllFacilities(response.data);
        }
      } catch (error) {
        console.error("Error loading facilities:", error);
      }
    };
    loadFacilities();
  }, [category, art]);

  return {
    facilities,
    allFacilities,
    category,
    setCategory,
    art,
    setArt,
    showHome,
    setShowHome,
    home,
    showFavorite,
    setShowFavorite,
    favorites,
    setFavorites
  };
};

export const handleCategoryChange = (setCategory) => (e) => {
  setCategory(e.target.value);
};

export const handleArtChange = (setArt) => (e) => {
  setArt(e.target.value);
};

export const handleHomeChange = (setShowHome) => (e) => {
  setShowHome(e.target.checked);
};

export const handleFavoriteChange = (setShowFavorite, favorites) => (e) => {
  if (e.target.checked && favorites.length === 0) {
    alert("Bitte fügen Sie zuerst Favoriten hinzu.");
  } else {
    setShowFavorite(e.target.checked);
  }
};