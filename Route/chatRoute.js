const express = require('express');
const chatController = require('../Controller/chatController')
const route = express.Router();

route.get('/chat', chatController.chatWindow);

module.exports = route;