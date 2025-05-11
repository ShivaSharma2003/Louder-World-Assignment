const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  event_link: String
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;