const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use the MONGODB_URI from our .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit the process with a failure code if we can't connect
    process.exit(1);
  }
};

module.exports = connectDB;