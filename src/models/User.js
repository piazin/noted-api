const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserShema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
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

UserShema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashPassword) => {
      if (err) {
        next(err);
      } else {
        this.password = hashPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserShema.methods.isCorrectPassword = async function (password, cb) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) cb(err);

    cb(err, same);
  });
};

module.exports = mongoose.model('User', UserShema);
