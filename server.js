const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

app.use('', routes);
app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});