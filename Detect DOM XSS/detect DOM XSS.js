const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Vulnerability scanner middleware
app.use((req, res, next) => {
  // Check for unsafe functions in the request body
  if (req.body && hasUnsafeFunctions(req.body)) {
    return res.status(400).send('Potential security vulnerability detected.');
  }
  next();
});

// Function to check for unsafe functions in the request body
function hasUnsafeFunctions(data) {
  // Define a list of unsafe functions to check for
  const unsafeFunctions = ['eval', 'alert', 'prompt', 'confirm'];

  // Loop through the request body and check for unsafe functions
  for (const key in data) {
    if (typeof data[key] === 'string') {
      for (const func of unsafeFunctions) {
        if (data[key].includes(func)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Serve a simple HTML form
app.get('/', (req, res) => {
  res.send(`
    <html>
    <body>
      <h1>Input Security Scanner</h1>
      <form method="post">
        <label for="input">Enter text:</label>
        <input type="text" name="input" id="input">
        <input type="submit" value="Submit">
      </form>
    </body>
    </html>
  `);
});

// Handle form submissions
app.post('/', (req, res) => {
  res.send('Submitted data: ' + req.body.input);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
