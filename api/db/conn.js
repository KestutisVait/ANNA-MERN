const mongoose = require('mongoose');
require('dotenv').config();

// const dbUrl = 'mongodb://localhost:27017/anna';
const dbUrl = `${process.env.DB_URL}`;

const DbConnection = () => {
    mongoose.connect(dbUrl)
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
};

module.exports = DbConnection;