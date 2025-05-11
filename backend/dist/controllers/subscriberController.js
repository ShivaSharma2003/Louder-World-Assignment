"use strict";

var _this = this;

var Subscriber = require("../models/subscriberModel");

var subscriberController = function subscriberController(req, res) {
  var _req$body, email, event_link;

  return regeneratorRuntime.async(function subscriberController$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _req$body = req.body;
        email = _req$body.email;
        event_link = _req$body.event_link;

        if (!(!email || !event_link)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt("return", res.status(400).send("Missing data"));

      case 5:
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return regeneratorRuntime.awrap(Subscriber.create({ email: email, event_link: event_link }));

      case 8:
        context$1$0.next = 14;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0["catch"](5);

        console.error("Error creating subscriber:", context$1$0.t0);
        res.status(500).json({ error: context$1$0.t0.message });

      case 14:
      case "end":
        return context$1$0.stop();
    }
  }, null, _this, [[5, 10]]);
};

module.exports = subscriberController;