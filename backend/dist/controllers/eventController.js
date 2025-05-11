"use strict";

var _this = this;

var Event = require("../models/eventModel");

var eventController = function eventController(req, res) {
  var events;
  return regeneratorRuntime.async(function eventController$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(Event.find({}));

      case 3:
        events = context$1$0.sent;

        res.json(events);
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0["catch"](0);

        res.status(500).json({ error: context$1$0.t0.message });

      case 10:
      case "end":
        return context$1$0.stop();
    }
  }, null, _this, [[0, 7]]);
};

module.exports = eventController;