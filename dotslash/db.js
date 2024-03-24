const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kritibharadwaj03:12345@cluster0.e0auapu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

module.exports = mongoose.connection;
