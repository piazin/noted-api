const express = require('express');
require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello word');
});

module.exports = app;
