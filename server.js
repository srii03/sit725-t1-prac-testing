const express = require('express');
const app = express();
const port = 3001; // Changed port number to 3001

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route to render the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Define a route to handle adding two numbers using query parameters
app.get('/addTwoNumbers', (req, res) => {
    // 1. Grab the values from query parameters
    const value1 = parseInt(req.query.num1);
    const value2 = parseInt(req.query.num2);
    
    // 2. Perform calculation
    const result = value1 + value2;
    
    // 3. Return the response as a JSON object
    const response = { result: result, statusCode: 200, message: 'success' };
    res.json(response);
});

// Start the server on port 3001
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


