const Subscriber = require("../models/subscriberModel");

const subscriberController = async (req, res) => {
  const { email, event_link } = req.body;
  if (!email || !event_link) return res.status(400).send("Missing data");

  try {
    await Subscriber.create({ email, event_link });
  } catch (err) {
    console.error("Error creating subscriber:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = subscriberController;