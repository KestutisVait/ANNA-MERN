const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = 'mongodb+srv://Kestutis:gva55qKfz079cpL8@anna.er7idep.mongodb.net/?retryWrites=true&w=majority&appName=ANNA';
// const dbUrl = 'mongodb://localhost:27017/anna';

// const dbUrl_template = process.env.DB_URL;
// const dbUrl = dbUrl_template
//   .replace('<username>', process.env.DB_USERNAME)
//   .replace('<password>', process.env.DB_PASSWORD)
//   .replace('<host>', process.env.DB_HOST)
//   .replace('<db_name>', process.env.DB_NAME);



const DbConnection = () => {
    const connection = mongoose.connect(dbUrl, {serverSelectionTimeoutMS: 30000})
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
      return connection
};

module.exports = DbConnection;