import React, { useState } from "react";
import "./FavoritesList.css"; // Optional: CSS-Datei für Styling

function FavoritesList({ favorites, facilities }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const handleToggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((expandId) => expandId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const favoriteFacilities = facilities.filter((facility) => favorites.includes(facility.id));

  return (
    <div className="favorites-list">
      <h2>Favoriten</h2>
      {favoriteFacilities.length === 0 ? (
        <p>Keine Favoriten ausgewählt.</p>
      ) : (
        favoriteFacilities.map((facility) => (
          <div key={facility.id} className="favorite-item">
            <h3>{facility.BEZEICHNUNG}</h3>
            <button onClick={() => handleToggleExpand(facility.id)}>
              {expandedIds.includes(facility.id) ? "Weniger anzeigen" : "Mehr anzeigen"}
            </button>
            {expandedIds.includes(facility.id) && (
              <div className="facility-details">
                {Object.entries(facility).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;
