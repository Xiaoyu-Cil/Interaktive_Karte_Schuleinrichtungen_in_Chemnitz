import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import Register from "./components/user.register";
import LoginPopup from "./components/user.login";
import ProfileOverview from "./components/user.overview";
import Update from "./components/user.update";
import { createProfile, handleLogin, handleLogout, updateProfile, deleteUser } from "./components/user.component";
import { useFacilities, handleCategoryChange, handleArtChange, handleHomeChange, handleFavoriteChange } from "./components/facility.component";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
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

  const openUpdateProfile = () => {
    setShowProfile(false);
    setShowUpdateProfile(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="menu">
          {loggedIn ? (
            <>
              <button onClick={() => setShowProfile(true)}>Profile</button>
              <button onClick={() => handleLogout(setLoggedIn, setUser, setToken, setFavorites, setShowFavorite)}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => setShowRegister(true)}>Registrieren</button>
              <button onClick={() => setShowLogin(true)}>Login</button>
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
              <input type="checkbox" checked={showHome} onChange={handleHomeChange(setShowHome)} />
              Heimatadresse
            </label>
            <label>
              <input type="checkbox" checked={showFavorite} onChange={handleFavoriteChange(setShowFavorite, favorites)} />
              Favoriten
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
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onCreate={(username, email, password, address, PLZ) => createProfile(username, email, password, address, PLZ, setShowRegister)}
        />
      )}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={(username, password) => handleLogin(username, password, setToken, setUser, setLoggedIn, setShowLogin, setFavorites)}
        />
      )}
      {showProfile && (
        <ProfileOverview
          user={user}
          onOpenUpdate={openUpdateProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
      {showUpdateProfile && (
        <Update
          user={user}
          onClose={() => setShowUpdateProfile(false)}
          onUpdateProfile={(updatedData) => updateProfile(user, updatedData, token, setUser, setShowUpdateProfile)}
          onDeleteUser={() => deleteUser(handleLogout)}
          token={token}
        />
      )}
    </div>
  );
}

export default App;