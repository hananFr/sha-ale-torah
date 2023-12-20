const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

exports.putSignup = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.admin) {
      const error = new Error('Not authenticated');
      error.statusCode = 401;
      throw error;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation faild.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12)
    const employee = new User({
      email: email,
      name: name,
      password: hashedPw,
    })
    const result = await employee.save();
    res.status(201).json({ message: 'User created', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password invalid');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: user.email,
      _id: user._id.toString(),
      admin: user.admin
    }, process.env.JWT_KEY)
    res.status(201).json({ token: token, userId: user._id.toString() })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
}
exports.updatePassword = async (req, res, next) => {

  try {
    let user = await User.findById(req.userId);
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    const newPassApproval = req.body.newPasswordApproval;

    if (newPass !== newPassApproval) {
      const error = new Error('Passwords are not compatible');
      throw error;
    }

    const isEqual = await bcrypt.compare(oldPass, user.password);
    if (!isEqual) {
      const error = new Error('Password invalid');
      error.statusCode = 401;
      throw error;
    }
    const password = await bcrypt.hash(newPass, 12);
    user.password = password;
    const result = await user.save();

    res.status(200).json({ msg: 'Password updated!' });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    throw error;
  }
  next()
}


exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.admin) {
      const error = new Error('Not Authenticated');
      error.statusCode = 401;
      throw error;
    }
    const users = await User.find({ admin: false }).select('-password');
    res.status(200).json({
      users: users
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    throw error;
  }
}

