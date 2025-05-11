'use strict';

var _this2 = this;

var Event = require('../models/eventModel');
var axios = require('axios');
var cheerio = require('cheerio');

var scrapeEvents = function scrapeEvents() {
  var url;
  return regeneratorRuntime.async(function scrapeEvents$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        url = 'https://www.eventbrite.com.au/d/australia--sydney/events/';
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return regeneratorRuntime.awrap((function callee$1$0() {
          var _ref, data, $, events;

          return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return regeneratorRuntime.awrap(axios.get(url));

              case 2:
                _ref = context$2$0.sent;
                data = _ref.data;
                $ = cheerio.load(data);
                events = [];

                $('section.discover-vertical-event-card').each(function (i, el) {
                  var title = $(el).find('h3').text().trim();
                  var link = $(el).find('a.event-card-link').attr('href') || '';
                  var date = $(el).find('p').eq(1).text().trim();
                  var image = $(el).find('img.event-card-image').attr('src') || '';
                  var description = $(el).find('div > p').last().text().trim();

                  if (title && link && date && image && description) {
                    events.push({ title: title, date: date, link: link, image: image, description: description });
                  }
                });

                // Clear and insert new data
                context$2$0.next = 9;
                return regeneratorRuntime.awrap(Event.deleteMany({}));

              case 9:
                context$2$0.next = 11;
                return regeneratorRuntime.awrap(Event.insertMany(events));

              case 11:
                console.log('Inserted ' + events.length + ' events into the database.');
                console.log('Scraping completed and data saved to the database.');

              case 13:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        })());

      case 4:
        context$1$0.next = 9;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](1);

        console.error('Scraping failed:', context$1$0.t0);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2, [[1, 6]]);
};

module.exports = scrapeEvents;