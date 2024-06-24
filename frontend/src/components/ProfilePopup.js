import React, { useState } from 'react';

const ProfilePopup = ({ onCreate, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState("");
  const [PLZ, setPLZ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(username, email, password, adress, PLZ);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>PLZ:</label>
            <input
              type="text"
              value={PLZ}
              onChange={(e) => setPLZ(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePopup;
