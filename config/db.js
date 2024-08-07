const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://garvishtayal:Abhishek0909@mern-assign.s7q21.mongodb.net/?retryWrites=true&w=majority&appName=MERN-assign';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;