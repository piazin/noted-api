const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Note', NoteSchema);
