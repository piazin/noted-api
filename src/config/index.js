require('dotenv').config();

module.exports = {
  jwt_secret: process.env.JWT,
  mongo_url: process.env.MONGO_URL,
};
