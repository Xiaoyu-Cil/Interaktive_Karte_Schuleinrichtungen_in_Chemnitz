import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import FavoritesList from "./components/FavoritesList";
import ProfilePopup from "./components/ProfilePopup";
import LoginPopup from "./components/LoginPopup";
import ProfileOverviewPopup from "./components/ProfileOverviewPopup";
import ProfileUpdatePopup from "./components/ProfileUpdatePopup";
import { registerUser, loginUser, updateUser, fetchUserFavorites, checkUsernameExists, checkEmailExists, softDeleteUser } from "./api/user.api";
import { getAllFacilities, getAllFacilityByCategory, getFacilityByArt } from "./api/facility.api";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isProfileOverviewPopupOpen, setIsProfileOverviewPopupOpen] = useState(false);
  const [isProfileUpdatePopupOpen, setIsProfileUpdatePopupOpen] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [allFacilities, setAllFacilities] = useState([]);
  const [category, setCategory] = useState("alle");
  const [art, setArt] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const [view, setView] = useState("map"); // 'map' oder 'favorites'
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState("");
  const [showHome, setShowHome] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);

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

  const handleCreateProfile = async (username, email, password, adress, PLZ) => {
    const userData = { username, email, password, adress, PLZ };
    try {
      const usernameExistsResponse = await checkUsernameExists(username);
      if (usernameExistsResponse.exists) {
        alert("Username already exists. Please choose another username.");
        return;
      }

      const emailExistsResponse = await checkEmailExists(email);
      if (emailExistsResponse.exists) {
        alert("Email already exists. Please choose another email.");
        return;
      }

      await registerUser(userData);
      alert("User created successfully!");
      setIsProfilePopupOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user.");
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      setLoggedIn(true);
      setIsLoginPopupOpen(false);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const userFavorites = await fetchUserFavorites(user.username);
      setFavorites(userFavorites.split(','));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("User account is deleted. Please contact support.");
      } else {
        console.error("Error logging in:", error);
        alert("Error logging in.");
      }
    }
  };


  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setToken("");
    setFavorites([]);
    setShowFavorite(false);
  };

  const handleProfileOverview = () => {
    if (loggedIn) {
      setIsProfileOverviewPopupOpen(true);
    } else {
      alert("Please login to view profile overview.");
    }
  };

  const handleProfileUpdate = () => {
    if (loggedIn) {
      setIsProfileUpdatePopupOpen(true);
    } else {
      alert("Please login to update profile.");
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUser(user.username, updatedData, token);
      setUser({ ...user, ...updatedData });
      alert("Profile updated successfully!");
      setIsProfileUpdatePopupOpen(false);
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  const handleDeleteUser = async () => {
    handleLogout();
  };

  const handleFacilityClick = (facilityId) => {
    setSelectedFacilityId(facilityId);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleArtChange = (e) => {
    setArt(e.target.value);
  };

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };

  const handleHomeCheckboxChange = (e) => {
    setShowHome(e.target.checked);
  };

  const handleFavoriteCheckboxChange = (e) => {
    if (e.target.checked && favorites.length === 0) {
      alert("Please add favorites first.");
    } else {
      setShowFavorite(e.target.checked);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleMenu} className="button">
          {menuVisible ? 'Hide Menu' : 'Show Menu'}
        </button>
        {menuVisible && (
          <div className="menu">
            {loggedIn ? (
              <>
                <button onClick={handleProfileOverview}>Profile Overview</button>
                <button onClick={handleProfileUpdate}>Update Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => setIsProfilePopupOpen(true)}>Profile</button>
                <button onClick={() => setIsLoginPopupOpen(true)}>Login</button>
              </>
            )}
            <div className="filter-section">
              <label>
                Kategorie:
                <select value={category} onChange={handleCategoryChange} className="select">
                  <option value="alle">Alle</option>
                  <option value="Schule">Schule</option>
                  <option value="Schulsozialarbeit">Schulsozialarbeit</option>
                  <option value="Kindertageseinrichtung">Kindertageseinrichtung</option>
                  <option value="Jugendberufshilfe">Jugendberufshilfe</option>
                  <option value="none">None</option>
                </select>
              </label>
              {category === "Schule" && (
                <label>
                  Art:
                  <select value={art} onChange={handleArtChange} className="select">
                    <option value="Grundschule">Grundschule</option>
                    <option value="Oberschule">Oberschule</option>
                    <option value="Gymnasium">Gymnasium</option>
                    <option value="Förderschule">Förderschule</option>
                    <option value="Berufsbildende Schule">Berufsbildende Schule</option>
                    <option value="Schule des zweiten Bildungsweges">Schule des zweiten Bildungsweges</option>
                  </select>
                </label>
              )}
            </div>
            <div className="view-switcher">
              <label>
                <input type="checkbox" checked={showHome} onChange={handleHomeCheckboxChange} />
                Home
              </label>
              <label>
                <input type="checkbox" checked={showFavorite} onChange={handleFavoriteCheckboxChange} />
                Favorite
              </label>
            </div>
          </div>
        )}
      </header>
      <main>
        {view === "map" && (
          <Map
            facilities={facilities}
            allFacilities={allFacilities}
            updateFavorites={updateFavorites}
            user={user}
            showHome={showHome}
            showFavorite={showFavorite}
            category={category}
            token={token} // Pass token to Map component
          />
        )}
        {view === "favorites" && (
          <FavoritesList facilities={facilities} favorites={favorites} />
        )}
      </main>
      {isProfilePopupOpen && (
        <ProfilePopup
          onClose={() => setIsProfilePopupOpen(false)}
          onCreate={handleCreateProfile}
        />
      )}
      {isLoginPopupOpen && (
        <LoginPopup
          onClose={() => setIsLoginPopupOpen(false)}
          onLogin={handleLogin}
        />
      )}
      {isProfileOverviewPopupOpen && (
        <ProfileOverviewPopup
          user={user}
          onClose={() => setIsProfileOverviewPopupOpen(false)}
        />
      )}
      {isProfileUpdatePopupOpen && (
        <ProfileUpdatePopup
          user={user}
          onClose={() => setIsProfileUpdatePopupOpen(false)}
          onUpdateProfile={handleUpdateProfile}
          onDeleteUser={handleDeleteUser}
          token={token} // Pass token to ProfileUpdatePopup component
        />
      )}
    </div>
  );
}

export default App;