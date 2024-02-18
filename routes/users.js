const router = require('express').Router();
const userController = require('../controllers/user');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/current', authMiddleware, userController.getCurrentUser)

module.exports = router;