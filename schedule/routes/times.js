const express = require('express');
const router = express.Router();
const controllerTime = require('../controllers/time')

const isAuth = require('../middlewares/auth');

router.get('/', isAuth, controllerTime.getTimes);

router.get('/admin/choose/:id', isAuth, controllerTime.adminGetTimes);

router.get('/admin/all', isAuth, controllerTime.adminGetAllTimes);

router.post('/', isAuth, controllerTime.postTime);

module.exports = router;