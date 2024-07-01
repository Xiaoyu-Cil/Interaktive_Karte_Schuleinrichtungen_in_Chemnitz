import React, { useState } from 'react';

const Register = ({ onCreate, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState("");
  const [PLZ, setPLZ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(username, email, password, address, PLZ);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
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
            <label>Passwort:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Addresse:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <button type="submit">Erstellen</button>
          <button type="close" onClick={onClose}>x</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
