const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// When a POST request is made to '/register', call the registerUser function
router.post('/register', registerUser);

module.exports = router;