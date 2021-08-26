const express = require('express');
const chatController = require('../Controller/indexController')
const route = express.Router();

route.get('/index', chatController.indexWindow);

module.exports = route;