const router = require('express').Router();
const UsersController = require('../controllers/usersController');

router.post('/signup', UsersController.register);
router.post('/signin', UsersController.loginUser);

module.exports = router;
