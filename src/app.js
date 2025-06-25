// Import necessary packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database.js')
const userRoutes = require('./api/routes/userRoutes'); 


// Load environment variables from .env file
dotenv.config();
//Connect to Mongodb Call
connectDB()
// Initialize the Express app
const app = express();
// Define the port from environment variables, or default to 3000
const PORT = process.env.PORT || 3000;


// This is crucial for getting data from req.body
app.use(express.json());

// A simple test route to make sure everything is working
app.get('/', (req, res) => {
  res.send('AI Fulfillment Agent is running!');
});

// Any request starting with '/api/users' will be handled by userRoutes
app.use('/api/users', userRoutes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});