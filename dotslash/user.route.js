const express = require('express');
const router = express.Router();
const User = require('./user.model'); // Import the user model (replace with your actual path)

// ... other routes (if applicable)

// POST route to register a new user (WARNING: Plain text password storage!)
router.post('/', async (req, res) => {
  // Extract user data from request body
  const { username, email, password } = req.body;

  try {
    // Validate user data (optional)
    // You can add checks for username length, email format, etc.

    // Check for existing user with username or email (optional)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Create a new user object (storing password in plain text)
    const newUser = new User({ username, email, password });

    // Save the new user to the database (including plain text password)
    const savedUser = await newUser.save();

    // Send a success response or redirect to login page (optional)
    res.status(201).json({ message: 'User created successfully!' }); // Adjust response as needed
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' }); // Handle errors generically
  }
});

module.exports = router;
