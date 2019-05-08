/* General imports */
const express = require('express');
const app = express();
const logger = require('../utils/logger');
const secret = process.env.auth_secret || 'noway';
const jwt = require('jsonwebtoken');

/* models */
const AdminModel = require('./models');

/* Middlewares */
const adminMiddleware = require('../utils/adminMiddleware');

app.post('/register', function (req, res) {
  const { email, password } = req.body;
  const user = new AdminModel({ email, password });
  user.save(function (err) {
    if (err) {
      res.status(500)
        .json({
          success: false,
          message: "Error registering new user please try again."
        });
    } else {
      res.status(200)
        .json({
          success: true,
          message: "Welcome to the club!"
        });
    }
  });
});

app.post('/login', function (req, res) {
  const { email, password } = req.body;
  AdminModel.findOne({ email }, function (err, user) {
    if (err) {
      logger.error({
        message: `AUTH/LOGIN Internal error please try again ${err}`
      });
      res.status(500)
        .json({
          success: false,
          message: err.message
        });
    } else if (!user) {
      res.status(400)
        .json({
          success: false,
          message: 'No user exists with that Email Address'
        });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          logger.error({
            message: `AUTH/LOGIN Internal error please try again ${err}`
          });
          res.status(500)
            .json({
              success: false,
              error: err.message
            });
        } else if (!same) {
          logger.info({
            message: 'AUTH/LOGIN incorrect password'
          });
          res.status(400)
            .json({
              success: false,
              error: 'Incorrect password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '10h'
          });
          res.cookie('token', token, { httpOnly: true })
            .status(200)
            .json({
              success: true,
              message: 'logged in successfully'
            });
        }
      });
    }
  });
});

app.get('/checkToken', adminMiddleware, function (req, res) {
  res.sendStatus(200);
});

module.exports = app;