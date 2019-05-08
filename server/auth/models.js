const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const saltRounds = 10;
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// if it's new document or the password changed, encript it before saving into db
AdminSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function (err, hashedPassword) {
        if (err) {
          logger.error({
            message: `AUTH/LOGIN/PRE_SAVE/HASH_PASS Internal error please try again ${err}`
          });
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
  } else {
    next();
  }
});

// dycript pass and compare
AdminSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      logger.error({
        message: `AUTH/LOGIN/PRE_SAVE/UN_HASH_PASS Internal error please try again ${err}`
      });
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

module.exports = mongoose.model('Admin', AdminSchema);
