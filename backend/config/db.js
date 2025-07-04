// backend/config/db.js

const mongoose = require('mongoose');

// This is the connection string for your local MongoDB database.
// The last part of the URL ('voicechef') is the name of the database that will be created.
const db = 'mongodb://localhost:27017/voicechef';

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;