const express = require('express');
const router = express.Router();
const GameRoom = require('./gameroom.model'); // Replace with your model path

// POST route to create a new game room
router.post('/gameroom', async (req, res) => {
  try {
    // Extract game room data from request body
    const { roomId, players } = req.body;

    // Validate data (optional)
    // You can add checks for roomId format, player object structure, etc.

    // Create a new game room
    const newGameRoom = new GameRoom({ roomId, players });

    // Save the game room to the database
    const savedRoom = await newGameRoom.save();

    // Send a success response
    res.status(201).json({ message: 'Game room created successfully!', data: savedRoom });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to get a game room by ID
router.get('/gamerooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find the game room by ID
    const gameRoom = await GameRoom.findOne({ roomId });

    // Check if game room exists
    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }

    // Send the game room data
    res.status(200).json({ data: gameRoom });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route to update a game room (update player points, perks, etc.)
router.put('/gamerooms/:roomId', async (req, res) => {
  console.log("PUT request received!"); // Log at the beginning

  try {
      const { roomId } = req.params;
      const updates = req.body; // Update data (e.g., points, perks)
      const playerIndex = updates.index;
      const playerPoints = updates.points

      console.log("Received update data:", updates);

      // Convert roomId to a number if necessary
      const numericRoomId = roomId;

      // Find and update the game room
      const update = { $set: { [`players.${playerIndex}`]: { points: playerPoints } } };// Returns the updated document
      const filter = { roomId: numericRoomId };

      const result = await GameRoom.findOneAndUpdate(filter, update, { new: true, maxTimeMS: 50000 });

      console.log("Updated game room:", result); // Log the updated document

      if (!result) {
          return res.status(404).json({ message: 'Game room not found' });
      }

      // Send the updated game room
      res.status(200).json({ data: result });

  } catch (err) {
      console.error('Error updating game room:', err.message);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// DELETE route to delete a game room
router.delete('/gamerooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    // Delete the game room
    await GameRoom.deleteOne({ roomId });

    // Send a success response
    res.status(200).json({ message: 'Game room deleted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
