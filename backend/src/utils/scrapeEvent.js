const Event = require('../models/eventModel');
const axios = require('axios');
const cheerio = require('cheerio');

const scrapeEvents = async () => {
  const url = 'https://www.eventbrite.com.au/d/australia--sydney/events/';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const events = [];

    $('.search-event-card-wrapper').each((i, el) => {
      const title = $(el).find('.eds-event-card-content__title').text().trim();
      const link = $(el).find('a').attr('href');
      const date = $(el).find('.eds-text-bs--fixed').first().text().trim();

      if (title && link && date) {
        events.push({ title, date, link });
      }
    });

    // Clear and insert new data
    await Event.deleteMany({});
    await Event.insertMany(events);
  } catch (err) {
    console.error('Scraping failed:', err);
  }
}

module.exports = scrapeEvents;