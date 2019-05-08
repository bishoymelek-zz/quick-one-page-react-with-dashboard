/* General imports */
const express = require('express');
const app = express();
const logger = require('../utils/logger');

/* models */
const EmployeeModel = require('./models');

/* Middlewares */
const adminMiddleware = require('../utils/adminMiddleware');

app.post('/', function (req, res) {
  try {
    const employee = new EmployeeModel(req.body);
    employee.save(function (err, item) {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          console.log(err);
          // Duplicate one
          res.status(400).send({ success: false, message: err.message });
        } else {
          logger.error(`CRUD_EMPLOYEE/CREATE error:${err}`);
          res.status(500)
            .json({ success: false, message: "Internal server error" });
        }
      } else {
        res.status(200).json({ success: true, message: "Welcome to the club!", data: item });
      }
    })
  } catch (error) {
    logger.error(`CRUD_EMPLOYEE/CREATE error:${error}`);
    next(error);
  }
});

app.delete('/:id', function (req, res, next) {
  try {
    const employeeId = req.params.id;
    EmployeeModel
      .deleteOne({ id: employeeId }, (err, employeeDeleted) => {
        if (err) {
          logger.error(`CRUD_EMPLOYEE/DELETE error:${err}`);
          res.status(500).json({ success:false, message: "Error deleting it" });
        }
        res.status(200).json({success:true, message: "employee deleted" });
      });
  } catch (error) {
    logger.error(`CRUD_EMPLOYEE/DELETE error:${error}`);
    next(error);
  }
});

app.get('/:pageNum', function (req, res) {
  try {
    const perPage = 12;
    const page = req.params.pageNum || 1;
    EmployeeModel.find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function (err, data) {
        EmployeeModel.count().exec(function (err, count) {
          if (err) {
            logger.error(`CRUD_EMPLOYEE/GET_ALL error:${err}`);
            res.status(500)
              .json({ success: false, message: "Internal server error" });
          } else {
            res.status(200).json({
              success: true, message: "data loaded successfully", data: data, pages: {
                current: page,
                total: Math.ceil(count / perPage)
              }
            });
          }
        });
      });
  } catch (error) {
    logger.error(`CRUD_EMPLOYEE/GET_ALL error:${error}`);
    next(error);
  }
});
module.exports = app;