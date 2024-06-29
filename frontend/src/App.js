import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import Register from "./components/user.register";
import LoginPopup from "./components/user.login";
import ProfileOverviewPopup from "./components/user.overview";
import ProfileUpdatePopup from "./components/user.update";
import { handleCreateProfile, handleLogin, handleLogout, handleUpdateProfile, handleDeleteUser } from "./components/user.component";
import { useFacilities, handleCategoryChange, handleArtChange, handleHomeCheckboxChange, handleFavoriteCheckboxChange } from "./components/facility.component";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isProfileOverviewPopupOpen, setIsProfileOverviewPopupOpen] = useState(false);
  const [isProfileUpdatePopupOpen, setIsProfileUpdatePopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const {
    facilities,
    allFacilities,
    category,
    setCategory,
    art,
    setArt,
    showHome,
    setShowHome,
    showFavorite,
    setShowFavorite,
    favorites,
    setFavorites
  } = useFacilities();

  return (
    <div className="App">
      <header className="App-header">
        <div className="menu">
          {loggedIn ? (
            <>
              <button onClick={() => setIsProfileOverviewPopupOpen(true)}>Profile Overview</button>
              <button onClick={() => setIsProfileUpdatePopupOpen(true)}>Update Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsProfilePopupOpen(true)}>Register</button>
              <button onClick={() => setIsLoginPopupOpen(true)}>Login</button>
            </>
          )}
          <div className="filter-section">
            <label>
              Kategorie:
              <select value={category} onChange={handleCategoryChange(setCategory)} className="select">
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
                <select value={art} onChange={handleArtChange(setArt)} className="select">
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
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={showHome} onChange={handleHomeCheckboxChange(setShowHome)} />
              Home
            </label>
            <label>
              <input type="checkbox" checked={showFavorite} onChange={handleFavoriteCheckboxChange(setShowFavorite, favorites)} />
              Favorite
            </label>
          </div>
        </div>
      </header>
      <main>
        <Map
          facilities={facilities}
          allFacilities={allFacilities}
          updateFavorites={setFavorites}
          user={user}
          showHome={showHome}
          showFavorite={showFavorite}
          category={category}
          token={token}
        />
      </main>
      {isProfilePopupOpen && (
        <Register
          onClose={() => setIsProfilePopupOpen(false)}
          onCreate={(username, email, password, address, PLZ) => handleCreateProfile(username, email, password, address, PLZ, setIsProfilePopupOpen)}
        />
      )}
      {isLoginPopupOpen && (
        <LoginPopup
          onClose={() => setIsLoginPopupOpen(false)}
          onLogin={(username, password) => handleLogin(username, password, setToken, setUser, setLoggedIn, setIsLoginPopupOpen, setFavorites)}
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
          onUpdateProfile={(updatedData) => handleUpdateProfile(user, updatedData, token, setUser, setIsProfileUpdatePopupOpen)}
          onDeleteUser={() => handleDeleteUser(handleLogout)}
          token={token}
        />
      )}
    </div>
  );
}

export default App;