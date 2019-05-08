/* General imports */
const express = require('express');
const app = express();
const logger = require('../utils/logger');
const moment = require('moment');

/* models */
const ClientModel = require('./models');

/* Middlewares */
const adminMiddleware = require('../utils/adminMiddleware');

app.post('/', adminMiddleware, function (req, res) {
  try {
    const client = new ClientModel(req.body);
    client.save(function (err) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate one
          res.status(400).send({ success: false, message: 'Phone num already exist' });
        } else {
          logger.error(`CRUD_CLIENT/CREATE error:${err}`);
          res.status(500)
            .json({ success: false, message: "Internal server error" });
        }
      } else {
        res.status(200).json({ success: true, message: "Welcome to the club!" });
      }
    })
  } catch (error) {
    logger.error(`CRUD_CLIENT/CREATE error:${err}`);
    next(error);
  }
});

app.put('/', function (req, res) {
  try {
    const docId = req.body._id;
    delete req.body._id;
    ClientModel.findOneAndUpdate({ _id: docId }, { $set: req.body }, function (err, updated) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // Duplicate one
          res.status(400).send({ success: false, message: err.message });
        } else {
          logger.error(`CRUD_CLIENT/UPDATE error:${err}`);
          res.status(500)
            .json({ success: false, message: "Internal server error" });
        }
      } else {
        res.status(200).json({ success: true, message: "Updated successfully" });
      }
    })
  } catch (error) {
    logger.error(`CRUD_CLIENT/UPDATE error:${err}`);
    next(error);
  }
});

app.delete('/:id', function (req, res, next) {
  try {
    const clientId = req.params.id;
    ClientModel
      .deleteOne({ _id: clientId }, (err, clientDeleted) => {
        if (err) {
          logger.error(`CRUD_CLIENT/DELETE error:${err}`);
          res.status(500).json({ message: "Error deleting it" });
        }
        res.status(200).json({ success: true, message: "client deleted" });
      });
  } catch (error) {
    logger.error(`CRUD_CLIENT/DELETE error:${err}`);
    next(error);
  }
});

app.get('/report/by-date/:pageNum/:isDaily', function (req, res) {
  try {
    const shouldLoadDaily = req.params.isDaily;
    let startFrom
    let stopAt = moment(moment().startOf('day')).endOf('day').toDate();
    if (shouldLoadDaily === "true") {
      startFrom = moment().startOf('day').toDate();
    } else {
      startFrom = moment().subtract(7, 'days').toDate();
    }
    const perPage = 12;
    const page = req.params.pageNum || 1;
    ClientModel.find({
      updatedAt: {
        $gte: startFrom,
        $lte: stopAt
      }
    })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function (err, data) {
        ClientModel.count().exec(function (err, count) {
          if (err) {
            logger.error(`CRUD_CLIENT/GET_ALL error:${err}`);
            res.status(500)
              .json({ success: false, message: "Internal server error" });
          } else {
            res.status(200).json({
              success: true, message: "data loaded successfully", data: data, pages: {
                current: parseInt(page),
                total: Math.ceil(count / perPage)
              }
            });
          }
        });
      });
  } catch (error) {
    logger.error(`CRUD_CLIENT/GET_ALL error:${error}`);
    next(error);
  }
});
module.exports = app;