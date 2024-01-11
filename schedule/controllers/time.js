const Time = require('../models/time');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.getTimes = async (req, res, next) => {
  try {
    const times = await Time.find({ employee: new mongoose.Types.ObjectId(req.userId) });
    if (!times[0]) {
      const error = new Error('Your reports is empty.');
      throw error;
    }
    res.status(200).json({
      msg: 'Fetched successfully',
      times: times
    })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postTime = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (user.admin) {
      const error = new Error("Admin can't report to anyone");
      error.statusCode = 401;
      throw error;
    }
    let time = new Time(req.body);
    time.employee = req.userId;
    const result = await time.save();
    res.status(201).json({
      msg: 'The note stored',
      userId: req.userId,
      timeId: result._id
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.adminGetAllTimes = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.admin) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    const times = await Time.find().sort('-date');
    res.status(200).json({
      times: times
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.adminGetTimes = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.admin) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    const employee = await User.findById(req.params.id).select('-password');
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 422;
      throw error;
    }
    const times = await Time.find({ employee: new mongoose.Types.ObjectId(req.params.id) }).sort('-date')
    res.status(200).json({
      times: times
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}