const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const registration = require('../controllers/auth/registration.js');
const login = require('../controllers/auth/login.js');
const logout = require('../controllers/auth/logout.js');

router.post("/users/register", registration);
router.post("/users/login", login);
router.post("/users/logout", authMiddleware, logout);

module.exports = router;