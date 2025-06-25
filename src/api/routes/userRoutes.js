const express = require('express');
const router = express.Router();
const { registerUser ,loginUser } = require('../controllers/userController');

// When a POST request is made to '/register', call the registerUser function
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;