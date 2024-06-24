const userChemnitz = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password, adress, ORT = "Chemnitz", PLZ, isPoweruser = false, deleted = false   } = req.body;
    try {
        const user = new userChemnitz({ username, email, password, adress, ORT, PLZ, isPoweruser, deleted: false });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userChemnitz.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      if (user.deleted) {
        return res.status(403).json({ message: 'User account is deleted.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id, isPoweruser: user.isPoweruser }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

const protect = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { register, login, protect };