const express = require('express');
const router = express.Router();

const registration = require('../controllers/auth/registration.js');
const login = require('../controllers/auth/login.js');

router.post("/users/register", registration);
router.post("/users/login", login);

module.exports = router;