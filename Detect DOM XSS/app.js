const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (HTML and CSS) from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Import and use the routes defined in 'index.js'
const routes = require('./routes/index');
app.use('/', routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
