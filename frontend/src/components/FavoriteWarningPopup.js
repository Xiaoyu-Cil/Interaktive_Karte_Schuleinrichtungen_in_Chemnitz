import React from 'react';

const FavoriteWarningPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Warnung</h2>
        <p>Das Hinzufügen eines neuen Favoriten überschreibt den bestehenden Favoriten. Möchten Sie fortfahren?</p>
        <div className="popup-buttons">
          <button onClick={onConfirm}>Ja</button>
          <button onClick={onCancel}>Nein</button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteWarningPopup;