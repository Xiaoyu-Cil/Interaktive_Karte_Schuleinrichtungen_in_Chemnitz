import React, { useState, useEffect } from "react";
import { softDeleteUser } from "../api/user.api";

function ProfileUpdatePopup({ user, onClose, onUpdateProfile, onDeleteUser, token }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    adress: "",
    PLZ: "",
    isPoweruser: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        adress: user.adress || "",
        PLZ: user.PLZ || "",
        isPoweruser: user.isPoweruser || false
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
  };

  const handleDeleteUser = async () => {
    try {
      await softDeleteUser(user.username, token);
      alert("User deleted successfully!");
      onDeleteUser();
    } catch (error) {
      alert("Error deleting user.");
      console.error(error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>PLZ</label>
            <input
              type="text"
              name="PLZ"
              value={formData.PLZ}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isPoweruser"
                checked={formData.isPoweruser}
                onChange={handleChange}
              />
              Power User
            </label>
          </div>
          <div className="button-group">
            <button type="submit">Update</button>
            <button type="button" onClick={handleDeleteUser} className="delete-btn">Delete</button>
          </div>
        </form>
        <button type="button" onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default ProfileUpdatePopup;