const express = require('express');
const cors = require('cors');
require('./db');

const user_router = require('./routes/user.routes');
const note_router = require('./routes/note.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  if (!err) return next();

  return res.status(400).json({ status: 400, error: 'Oops! Bad Request' });
});

app.use('/users', user_router);
app.use('/notes', note_router);

module.exports = app;
