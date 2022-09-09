const router = require('express').Router();
const NoteController = require('../controllers/NoteController');
const auth = require('../middlewares/auth');
const { checkNote } = require('../middlewares/validateReqBody');

router
  .route('/')
  .get(auth, NoteController.findAll)
  .post(checkNote, auth, NoteController.create);

router
  .route('/:id')
  .get(auth, NoteController.findById)
  .put(auth, NoteController.update);

module.exports = router;
