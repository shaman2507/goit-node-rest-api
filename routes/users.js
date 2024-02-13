const router = require('express').Router();
const userController = require('../controllers/user');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, userController.addContact)
router.get('/', authMiddleware, userController.getContacts)
router.get('/:id', authMiddleware, userController.getContact)

module.exports = router;