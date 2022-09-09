const Note = require('../models/Note');
const { user_error, E500, note_error, note_sucess } = require('../constants');
const isOwner = require('../utils/isOwner');
const isIdValid = require('../utils/isIdValid');

module.exports = {
  async create(req, res) {
    const { title, body } = req.body;

    try {
      let note = new Note({ title, body, author: req.user._id });

      await note.save();
      res.status(201).json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },

  async update(req, res) {
    var { title, body } = req.body;
    var id = req.params.id;

    try {
      let note = await Note.findById(id);

      if (isOwner(note.author, req.user._id)) {
        let note = await Note.findByIdAndUpdate(
          id,
          { $set: { title, body } },
          { upsert: true, new: true }
        );

        res.status(200).json(note);
      } else {
        res.status(403).json({ status: 403, error: user_error.unauthorized });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },

  async delete(req, res) {
    var id = req.params.id;

    if (!isIdValid(id))
      return res
        .status(400)
        .json({ status: 400, error: user_error.invalid_params });

    try {
      let note = await Note.findById(id);

      if (!note)
        return res.status(404).json({ status: 404, error: note_error.E404 });

      if (!isOwner(req.user._id, note.author))
        return res
          .status(403)
          .json({ status: 403, error: user_error.unauthorized });

      await Note.findByIdAndDelete(id);
      res.status(200).json({ status: 200, msg: note_sucess.delete });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },

  async findAll(req, res) {
    try {
      let notes = await Note.find({ author: req.user._id });
      res.status(200).json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },

  async findById(req, res) {
    const id = req.params.id;

    if (!isIdValid(id))
      return res
        .status(400)
        .json({ status: 400, error: user_error.invalid_params });

    try {
      let note = await Note.findById(id);

      if (!note)
        return res.status(404).json({ status: 404, error: note_error.E404 });

      isOwner(req.user._id, note.author)
        ? res.status(200).json(note)
        : res.status(403).json({ status: 403, error: user_error.unauthorized });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },
};
