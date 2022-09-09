const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = (id) => ObjectId.isValid(id);
