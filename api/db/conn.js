/////////////////////////////////

const mongoose = require('mongoose');
require('dotenv').config();

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Kestutis:gva55qKfz079cpL8@anna.er7idep.mongodb.net/?retryWrites=true&w=majority&appName=ANNA";

const dbUrl = 'mongodb+srv://Kestutis:gva55qKfz079cpL8@anna.er7idep.mongodb.net/anna?retryWrites=true&w=majority&appName=ANNA';
// const dbUrl = 'mongodb://localhost:27017/anna';

// const dbUrl_template = process.env.DB_URL;
// const dbUrl = dbUrl_template
//   .replace('<username>', process.env.DB_USERNAME)
//   .replace('<password>', process.env.DB_PASSWORD)
//   .replace('<host>', process.env.DB_HOST)
//   .replace('<db_name>', process.env.DB_NAME);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const DbConnection = () => {
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("anna").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
// };
const DbConnection = () => {
    const connection = mongoose.connect(dbUrl, {serverSelectionTimeoutMS: 30000})
      .then(() => console.log('Connected to MongoDB'))
      .catch((error) => console.error('MongoDB connection error:', error));
      return connection
};

module.exports = DbConnection;