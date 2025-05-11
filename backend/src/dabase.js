const mongoose = require('mongoose');

const databseConnection = () => {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
};

module.exports = databseConnection;