const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// logging
require('./utils/logger')

// DB (Mongo, Mongoose)
const mongoose = require('mongoose');
// const mongo_uri = 'mongodb://localhost:27017/rasidi-sample';
const mongo_uri = 'mongodb://sampleuser:samplep00@ds147096.mlab.com:47096/rasidi-sample';
mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true }, function (err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
mongoose.set('useFindAndModify', false);

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.auth_secret))

// Routes
const authRoutes = require('./auth/logic');
const crudClientRoutes = require('./crudClient/logic');
const crudEmployeesRoutes = require('./crudEmployee/logic');
app.use('/api/auth', authRoutes);
app.use('/api/crud/client', crudClientRoutes);
app.use('/api/crud/employee', crudEmployeesRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
