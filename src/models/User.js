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

UserShema.pre('save', (next) => {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashPassword) => {
      if (err) {
        next(err);
      } else {
        this.password = hashPassword;
        next();
      }
    });
  }
});

module.exports = mongoose.Model('User', UserShema);
