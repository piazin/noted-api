const mongoose = require('mongoose');
const { mongo_url } = require('../config');

mongoose
  .connect(mongo_url)
  .then(() => console.log('connected db'))
  .catch(console.error());

module.exports = mongoose;
