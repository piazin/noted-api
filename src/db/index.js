const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/noted_db')
  .then(() => console.log('connected db'))
  .catch(console.error());

module.exports = mongoose;
