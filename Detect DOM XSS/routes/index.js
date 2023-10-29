const express = require('express');
const router = express.Router();

// Define the route for handling the form submission
router.post('/submit', (req, res) => {
  // Vulnerability scanner middleware (you can implement this here)
  if (req.body && hasUnsafeFunctions(req.body.input)) {
    return res.status(400).send('Potential security vulnerability detected.');
  }


  // Process the form data and provide a response
  res.send('Submitted data: ' + req.body.input);
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
module.exports = router;

// Export the router object, not an object literal
