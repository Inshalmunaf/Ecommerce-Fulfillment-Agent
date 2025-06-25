const User = require('../../models/User'); // Import the User model

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

module.exports = {
  registerUser,
};