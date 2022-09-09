const router = require('express').Router();
const auth = require('../middlewares/auth');
const { checkUser } = require('../middlewares/validateReqBody');
const UserController = require('../controllers/UserController');

router.post('/login', checkUser, UserController.login);
router.post('/register', checkUser, UserController.register);

module.exports = router;
