const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { user_error, E500 } = require('../constants');
const { jwt_secret } = require('../config');

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, error: user_error.new_user });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user)
        return res
          .status(401)
          .json({ status: 401, error: user_error.invalid_credentials });

      user.isCorrectPassword(password, function (err, same) {
        if (err) return res.status(500).json({ status: 500, error: E500 });

        if (!same)
          return res
            .status(401)
            .json({ status: 401, error: user_error.invalid_credentials });

        var token = jwt.sign({ email }, jwt_secret, { expiresIn: '1d' });

        res.status(200).json({ user, token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error: E500 });
    }
  },

  validateToken(req, res) {
    var { token } = req.body;

    if (!token) return res.status(401).send(false);

    jwt.verify(token, jwt_secret, (err, decode) => {
      if (err) return res.status(401).send(false);

      return res.status(200).send(true);
    });
  },
};
