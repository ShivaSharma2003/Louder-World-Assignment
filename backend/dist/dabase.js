'use strict';

var mongoose = require('mongoose');

var databseConnection = function databseConnection() {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on('connected', function () {
        console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', function (err) {
        console.error('MongoDB connection error:', err);
    });
};

module.exports = databseConnection;