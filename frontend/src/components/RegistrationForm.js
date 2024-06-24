import React, { useState } from "react";
import * as UserAPI from "../api/user.api";

const RegistrationForm = ({ onClose }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    try {
      await UserAPI.createUser(userData);
      onClose();
      setMessage(
        "Dein Profil wurde erfolgreich angelegt. Du kannst dich nun einloggen."
      );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmitRegistration}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
