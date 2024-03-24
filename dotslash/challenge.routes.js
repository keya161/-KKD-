const express = require('express');
const router = express.Router();
const Challenge = require('./challenge.model'); // Import the challenge model

// POST route to add a challenge (remains unchanged)
router.post('/', async (req, res) => {
  const newChallenge = new Challenge(req.body);
  try {
    const savedChallenge = await newChallenge.save();
    res.json(savedChallenge); // Send saved challenge data back (optional)
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// New route to get a random challenge by difficulty
router.get('/random/:difficultyLevel', async (req, res) => {
  const difficultyLevel = parseInt(req.params.difficultyLevel);

  try {
    // Validate difficulty level (optional)
    if (difficultyLevel < 1 || difficultyLevel > 4) {
      throw new Error('Invalid difficulty level. Must be between 1 (easy) and 4 (advanced).');
    }

    // Filter challenges based on difficulty
    const filteredChallenges = await Challenge.find({ difficulty_level: difficultyLevel });

    // Select a random challenge from the filtered results
    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    const randomChallenge = filteredChallenges[randomIndex];

    if (randomChallenge) {
      res.json(randomChallenge); // Send the random challenge back
    } else {
      res.status(404).json({ message: 'No challenge found for the given difficulty level.' }); // Handle no challenge found
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' }); // Handle errors generically
  }
});

module.exports = router;
