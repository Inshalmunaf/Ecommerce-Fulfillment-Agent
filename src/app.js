// Import necessary packages
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Define the port from environment variables, or default to 3000
const PORT = process.env.PORT || 3000;

// A simple test route to make sure everything is working
app.get('/', (req, res) => {
  res.send('AI Fulfillment Agent is running!');
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});