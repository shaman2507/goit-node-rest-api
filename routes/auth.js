const express = require('express');
const router = express.Router();

const registration = require('../controllers/auth/registration.js');

router.post("/users/register", registration);

module.exports = router;