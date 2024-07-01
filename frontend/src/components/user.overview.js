const ProfileOverviewPopup = ({ user, onClose, onOpenUpdate }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Profilübersicht</h2>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.address && <p><strong>Address:</strong> {user.address}</p>}
        {user.favorite && <p><strong>Favorit:</strong> {user.favorite}</p>}
        <p><strong>Ist Poweruser:</strong> {user.isPoweruser ? 'Yes' : 'No'}</p>
        <button onClick={onOpenUpdate}>Updaten</button>
        <button type="close" onClick={onClose} className="close">x</button>
      </div>
    </div>
  );
};

export default ProfileOverviewPopup;