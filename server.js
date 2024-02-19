// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use the port specified in environment variables or default to 5000



// Additional API routes or other server logic can be added here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
