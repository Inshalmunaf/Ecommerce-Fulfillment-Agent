const User = require('../../models/User'); // Import the User model
const jwt = require('jsonwebtoken');
/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  // Get email and password from the request body
  const { email, password } = req.body;

  try {
    // 1. Check if the user already exists in the database
    const userExists = await User.findOne({ email });

    if (userExists) {
      // If user exists, send a 400 Bad Request error
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 2. If user doesn't exist, create a new user instance
    const user = new User({
      email,
      password,
    });

    // 3. Save the user to the database.
    // Our 'pre-save' middleware will automatically hash the password here.
    await user.save();

    // 4. Respond with a 201 Created status and user info (excluding password)
    res.status(201).json({
      _id: user._id,
      email: user.email,
      message: 'User registered successfully',
    });

  } catch (error) {
    // If any other error occurs, send a 500 Internal Server Error
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



/**
 * @desc    Auth user & get token (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find the user by their email
      const user = await User.findOne({ email });
  
      // 2. Check if user exists AND if the password matches
      if (user && (await user.matchPassword(password))) {
        // 3. User is valid, so we generate a JWT
        const token = jwt.sign(
          { id: user._id }, // The data we want to embed in the token (payload)
          process.env.JWT_SECRET, // The secret key from our .env file
          { expiresIn: '30d' } // Token options: this token will expire in 30 days
        );
  
        // 4. Respond with the user's info and the newly created token
        res.json({
          _id: user._id,
          email: user.email,
          token: token,
        });
  
      } else {
        // If user not found or password doesn't match, send a 401 Unauthorized error
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  
module.exports = {
  registerUser,
  loginUser,
};