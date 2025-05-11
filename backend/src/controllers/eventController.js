const Event = require("../models/eventModel");

const eventController = async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = eventController;
