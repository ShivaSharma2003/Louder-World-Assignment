const routes = require('express').Router();
const eventController = require('../controllers/eventController');
const subscribeController = require('../controllers/subscriberController');

routes.get('/api/events', eventController);
routes.post('/api/subscribe', subscribeController);

module.exports = routes;