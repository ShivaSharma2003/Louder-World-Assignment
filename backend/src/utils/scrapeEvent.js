const Event = require('../models/eventModel');
const axios = require('axios');
const cheerio = require('cheerio');

const scrapeEvents = async () => {
  const url = 'https://www.eventbrite.com.au/d/australia--sydney/events/';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const events = [];
    $('section.discover-vertical-event-card').each((i, el) => {
      const title = $(el).find('h3').text().trim();
      const link = $(el).find('a.event-card-link').attr('href') || '';
      const date = $(el).find('p').eq(1).text().trim();
      const image = $(el).find('img.event-card-image').attr('src') || '';
      const description = $(el).find('div > p').last().text().trim();
      const badge = $(el).find('.event-card-badge p').text().trim();

      if (title && link && date && image && description) {
        events.push({ title, date, link, image, description, badge });
      }
    });

    // Clear and insert new data
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log(`Inserted ${events.length} events into the database.`);
    console.log('Scraping completed and data saved to the database.');
  } catch (err) {
    console.error('Scraping failed:', err);
  }
}

module.exports = scrapeEvents;