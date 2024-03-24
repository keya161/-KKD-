const mongoose = require('mongoose');

const GameRoomSchema = new mongoose.Schema({
  roomId: {
    type: Number,
    required: true,
    unique: true // Ensures no duplicate game room IDs
  },
  players: [{
    username: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 0 
    },
    perks: [{ 
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('GameRoom', GameRoomSchema);
