import { checkUsernameExists, checkEmailExists, registerUser, loginUser, updateUser, fetchUserFavorites, softDeleteUser } from "../api/user.api";

export const createProfile = async (username, email, password, address, PLZ, setIsProfilePopupOpen) => {
  const userData = { username, email, password, address, PLZ };
  try {
    const usernameExistsResponse = await checkUsernameExists(username);
    if (usernameExistsResponse.exists) {
      alert("Username already exists. Please choose another username.");
      return;
    }

    const emailExistsResponse = await checkEmailExists(email);
    if (emailExistsResponse.exists) {
      alert("Email already exists. Please choose another email.");
      return;
    }

    await registerUser(userData);
    alert("User created successfully!");
    setIsProfilePopupOpen(false);
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Error creating user.");
  }
};

export const handleLogin = async (username, password, setToken, setUser, setLoggedIn, setIsLoginPopupOpen, setFavorites) => {
  try {
    const response = await loginUser({ username, password });
    const { token, user } = response.data;

    setToken(token);
    setUser(user);
    setLoggedIn(true);
    setIsLoginPopupOpen(false);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const userFavorites = await fetchUserFavorites(user.username);
    if (userFavorites) {
      setFavorites(userFavorites.split(','));
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      alert("User account is deleted. Please contact support.");
    } else {
      console.error("Error logging in:", error);
      alert("Error logging in.");
    }
  }
};

export const handleLogout = () => {
  setLoggedIn(false);
  setUser(null);
  setToken("");
  setFavorites([]);
  setShowFavorite(false);
};

export const updateProfile = async (user, updatedData, token, setUser, setIsProfileUpdatePopupOpen) => {
  try {
    await updateUser(user.username, updatedData, token);
    setUser({ ...user, ...updatedData });
    alert("Profile updated successfully!");
    setIsProfileUpdatePopupOpen(false);
  } catch (error) {
    alert("Error updating profile.");
  }
};

export const deleteUser = async (handleLogout) => {
  handleLogout();
};