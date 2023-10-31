const express = require('express');
const router = express.Router();

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

// Define the route for handling the form submission
router.post('/submit', (req, res) => {
  // Check for unsafe functions in the request body
  if (req.body && hasUnsafeFunctions(req.body)) {
    // Send a response to trigger the popup
    res.status(200).send('<script>openPopup();</script>');
  } else {
    // Process the form data and provide a response
    res.send('Submitted data: ' + req.body.input);
  }
});

module.exports = router;
