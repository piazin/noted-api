const { user_error } = require('../constants');

exports.checkNote = (req, res, next) => {
  if (!req.body)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  var { title, body } = req.body;

  console.log(!(title, body));

  if (!title || !body)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  if (title.length <= 0 || body.length <= 0)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  next();
};

exports.checkUser = (req, res, next) => {
  if (!req.body)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  var { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  if (email.length <= 0 || password.length <= 0)
    return res
      .status(400)
      .json({ status: 400, error: user_error.invalid_params });

  next();
};
