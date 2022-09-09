const router = require('express').Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/UserController');

router.get('/', auth, (req, res) => {
  res.send('t');
});
router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
