const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');

router.get('/', isAuth, authController.getUsers);

router.put('/signup', isAuth, authController.putSignup);

router.post('/login', authController.postLogin);

router.put('/update', isAuth, authController.updatePassword);

module.exports = router;