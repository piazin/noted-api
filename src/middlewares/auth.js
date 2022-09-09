const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { user_error, E500 } = require('../constants');
const { jwt_secret } = require('../config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  const token = req.headers.authorization.split(' ')[1];

  if (!token)
    return res.status(401).json({ status: 401, errror: user_error.not_auth });

  jwt.verify(token, jwt_secret, (err, decode) => {
    if (err)
      return res.status(401).json({ status: 401, errror: user_error.not_auth });

    req.email = decode.email;

    User.findOne({ email: decode.email })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ status: 500, error: E500 });
      });
  });
};
