const express = require('express');
const cors = require('cors'); // Add CORS for frontend access (if applicable)
const challengeRoutes = require('./challenge.routes'); // Include routes (if applicable)
const userRoutes = require('./user.route.js');
const gameRoomRoutes = require('./gameroom.route.js');
const mongoose = require('./db'); // Import the connection from db.js

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());


// Parse incoming JSON data
app.use(express.json());

// Use challenge routes (if applicable)
//app.use('/',gameRoomRoutes);
app.use('/challenges', challengeRoutes); 
app.use('/users',userRoutes)


// Wait for database connection before starting the server
mongoose.once('open', () => {
  console.log('Database connection established. Starting server...');
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});

module.exports = app;
