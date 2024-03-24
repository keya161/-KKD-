const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate usernames
    minlength: 3, // Optional: Minimum username length
    maxlength: 20 // Optional: Maximum username length
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    match: /^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,}$/ // Optional: Regular expression to validate email format
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // Optional: Minimum password length
  },
  // Optional fields (add as needed):
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  // ... other fields
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now // Automatically sets update date
  }
});

module.exports = mongoose.model('User', UserSchema);
