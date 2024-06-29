import React from 'react';
import ProfileUpdatePopup from "./ProfileUpdatePopup"

const ProfileOverviewPopup = ({ user, onClose }) => {
  const [ showUpdate, setUpdate ] = useState(false);
  const handleUpdateClick = () => { setUpdate(true); };
  const handleCloseUpdate = () => { setSho}

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Profile Overview</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.address && <p><strong>Address:</strong> {user.address}</p>}
        {user.favorite && <p><strong>Favorite:</strong> {user.favorite}</p>}
        <p><strong>Is Poweruser:</strong> {user.isPoweruser ? 'Yes' : 'No'}</p>
        <button onClick={ProfileUpdatePopup}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileOverviewPopup;
