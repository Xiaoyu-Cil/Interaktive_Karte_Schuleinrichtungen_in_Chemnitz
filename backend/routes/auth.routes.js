const express = require('express');
const router = express.Router();
const { register, login, protect } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/protected', protect, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;