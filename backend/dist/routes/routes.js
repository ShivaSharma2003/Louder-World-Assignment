'use strict';

var routes = require('express').Router();
var eventController = require('../controllers/eventController');
var subscribeController = require('../controllers/subscriberController');

routes.get('/api/events', eventController);
routes.post('/api/subscribe', subscribeController);

module.exports = routes;