import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css"; // Styling for the heart icon
import { updateUser } from "../api/user.api"; // Ensure to import updateUser method
import axios from "axios";

function Map({ facilities, allFacilities, updateFavorites, user, showHome, showFavorite, category, token }) {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [routeInfo, setRouteInfo] = useState({ distance: "-", duration: "-" });
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the favorites from user data on component mount
    if (user && typeof user.favorite === "string") {
      setFavorites(user.favorite.split(","));
    }
  }, [user]);

  useEffect(() => {
    const mapElement = document.getElementById("map");

    if (!mapRef.current) {
      mapRef.current = L.map(mapElement).setView([50.827845, 12.92137], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    if (facilities && category !== "none") {
      facilities.forEach((facility) => {
        if (facility.Y && facility.X) {
          const marker = L.marker([facility.Y, facility.X], {
            icon: L.divIcon({
              className: "custom-icon",
              html: `<div style="background-color: ${getColorByCategory(
                facility.KATEGORIE
              )}; width: 8px; height: 8px; border-radius: 50%;"></div>`,
            }),
          }).addTo(mapRef.current);

          marker.on("click", () => {
            setSelectedFacility(facility);
            setRouteInfo({ distance: "-", duration: "-" }); // Reset route info
          });
        }
      });
    }

    if (showFavorite && favorites.length > 0) {
      favorites.forEach((favoriteId) => {
        const favoriteFacility = allFacilities.find(fac => fac._id === favoriteId);
        if (favoriteFacility) {
          L.marker([favoriteFacility.Y, favoriteFacility.X], {
            icon: L.divIcon({
              className: "custom-icon",
              html: '<div style="color: red;">&#9733;</div>', // Red star icon for favorite facilities
            }),
          })
            .addTo(mapRef.current)
            .bindPopup(favoriteFacility.BEZEICHNUNG);
        }
      });
    }

    if (showHome && user && user.adress) {
      const address = `${user.adress}, ${user.PLZ}, Chemnitz, Sachsen, Germany`;
      geocodeAddress(address, (lat, lon) => {
        L.marker([lat, lon], {
          icon: L.divIcon({
            className: "custom-icon",
            html: '<div style="color: blue;">&#9733;</div>', // Blue star icon for user address
          }),
        })
          .addTo(mapRef.current)
          .bindPopup("Your Address");
      });
    }

  }, [facilities, showHome, showFavorite, favorites, user, allFacilities, category]);

  const getColorByCategory = (category) => {
    switch (category) {
      case "Schule":
        return "blue";
      case "Schulsozialarbeit":
        return "green";
      case "Kindertageseinrichtung":
        return "red";
      case "Jugendberufshilfe":
        return "purple";
      default:
        return "black";
    }
  };

  const handleClosePopup = () => {
    setSelectedFacility(null);
    setRouteInfo({ distance: "-", duration: "-" });
  };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleToggleFavorite = async () => {
    if (selectedFacility) {
      let updatedFavorites;
      if (favorites.includes(selectedFacility._id)) {
        updatedFavorites = favorites.filter((id) => id !== selectedFacility._id);
      } else {
        if (!user.isPoweruser && favorites.length > 0) {
          const confirmUpdate = window.confirm(
            "Sind Sie sicher, dass Sie den Favoriten ändern möchten?"
          );
          if (!confirmUpdate) {
            return;
          }
          updatedFavorites = [selectedFacility._id];
        } else {
          updatedFavorites = [...favorites, selectedFacility._id];
        }
      }
      setFavorites(updatedFavorites);
      updateFavorites(updatedFavorites);
      await updateFavoriteList(updatedFavorites.join(","));
    }
  };

  const updateFavoriteList = async (newFavorites) => {
    try {
      console.log("Updating favorite list for user:", user.username);
      console.log("New favorites:", newFavorites);
      await updateUser(user.username, {
        favorite: newFavorites,
      });
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const handleHeartHover = () => {
    setIsHovering(!isHovering);
  };

  const handleMailClick = () => {
    if (selectedFacility && selectedFacility.EMAIL) {
      window.location.href = `mailto:${selectedFacility.EMAIL}`;
    }
  };

  const handlePhoneClick = () => {
    if (selectedFacility && selectedFacility.TELEFON) {
      window.location.href = `tel:${selectedFacility.TELEFON}`;
    }
  };

  const geocodeAddress = async (address, callback) => {
    try {
      const response = await axios.get('http://localhost:3000/api/geocode', {
        params: { address }
      });
      const { lat, lon } = response.data;
      callback(lat, lon);
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  const calculateRoute = async (start, end) => {
    try {
        const response = await axios.post('http://localhost:3000/api/route', { start, end });
        return response.data;
    } catch (error) {
        console.error('Error fetching route data:', error);
        throw error;
    }
  };

  const handleRouteClick = async () => {
    if (user && user.adress && selectedFacility) {
      geocodeAddress(`${user.adress}, ${user.PLZ}, Chemnitz, Sachsen, Germany`, async (lat, lng) => {
        const start = `${lng},${lat}`;
        const end = `${selectedFacility.X},${selectedFacility.Y}`;
        try {
          const routeData = await calculateRoute(start, end);
          console.log('Route data:', routeData);
          if (routeData && routeData.features && routeData.features.length > 0) {
            const { distance, duration } = routeData.features[0].properties.summary;
            const distanceKm = (distance / 1000).toFixed(2);
            const durationMin = (duration / 60).toFixed(2);
            setRouteInfo({ distance: distanceKm, duration: durationMin });
          } else {
            setRouteInfo({ distance: "Keine Daten", duration: "Keine Daten" });
          }
        } catch (error) {
          console.error('Error fetching route data:', error);
          setRouteInfo({ distance: "Fehler", duration: "Fehler" });
        }
      });
    }
  };

  // Use useEffect to log routeInfo changes
  useEffect(() => {
    console.log('Route Info updated:', routeInfo);
  }, [routeInfo]);

  return (
    <div>
      <div id="map" className="Map"></div>
      {selectedFacility && (
        <div className="facility-popup">
          <div className="popup-content">
            <h3>{selectedFacility.BEZEICHNUNG}</h3>
            <button className="route-btn" onClick={handleRouteClick}>
              Route anzeigen
            </button>
            <div className="contact-icons">
              {selectedFacility.EMAIL && (
                <button className="mail-button" onClick={handleMailClick}>
                  ✉️ E-Mail
                </button>
              )}
              {selectedFacility.TELEFON && (
                <button className="phone-button" onClick={handlePhoneClick}>
                  📞 Anrufen
                </button>
              )}
            </div>
            <div className="facility-details">
              <p><strong>Fahrstrecke:</strong> {routeInfo.distance} km</p>
              <p><strong>Fahrzeit:</strong> {routeInfo.duration} Minuten</p>
              {Object.entries(selectedFacility).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
              </div>
              <div className="popup-footer">
                <button className="close-btn" onClick={handleClosePopup}>
                  Close
                </button>
                <div
                  className="heart-icon"
                  onClick={handleToggleFavorite}
                  onMouseEnter={handleHeartHover}
                  onMouseLeave={handleHeartHover}
                >
                  {favorites.includes(selectedFacility._id) ? (
                    <span className="heart-filled" role="img" aria-label="Favorite"></span>
                  ) : (
                    <span className="heart-empty" role="img" aria-label="Favorite"></span>
                  )}
                  {isHovering && (
                    <div className="heart-tooltip">
                      {favorites.includes(selectedFacility._id)
                        ? "Klicke hier, um Favoriten zu entfernen"
                        : "Klicke hier, um als Favorit zu speichern"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Map;