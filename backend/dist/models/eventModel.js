'use strict';

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  link: String,
  image: String,
  description: String

});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;