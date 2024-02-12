const express = require('express');
const router = express.Router();

const registration = require('../controllers/auth/registration.js');
const login = require('../controllers/auth/login.js');

router.post("/users/register", registration);
router.post("/login", login);

module.exports = router;