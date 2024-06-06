const mongoose = require('mongoose');
require('dotenv').config();

// const dbUrl = 'mongodb://localhost:27017/anna';
// const dbUrl = `${process.env.DB_URL}`;
// const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=ANNA`;
const dbUrl_template = process.env.DB_URL;
const dbUrl = dbUrl_template
  .replace('<username>', process.env.DB_USERNAME)
  .replace('<password>', process.env.DB_PASSWORD)
  .replace('<host>', process.env.DB_HOST)
  .replace('<db_name>', process.env.DB_NAME);



const DbConnection = () => {
    console.log(dbUrl);
    mongoose.connect(dbUrl)
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
};

module.exports = DbConnection;