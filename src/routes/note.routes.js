const router = require('express').Router();
const NoteController = require('../controllers/NoteController');
const auth = require('../middleware/auth');

router
  .route('/')
  .get(auth, NoteController.findAll)
  .post(auth, NoteController.create);

router
  .route('/:id')
  .get(auth, NoteController.findById)
  .put(auth, NoteController.update);

module.exports = router;
