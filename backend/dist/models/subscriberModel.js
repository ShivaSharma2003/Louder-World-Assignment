'use strict';

var mongoose = require('mongoose');

var subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/
  },
  subscribedAt: {
    type: Date,
    'default': Date.now
  },
  event_link: String
});

var Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;