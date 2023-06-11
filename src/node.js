const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'user_db',
    password: 'user_db',
    database: 'user_db'
});

// Create the Express app
const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Login API endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided username and password match a record in the database
    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error occurred during login:', error);
            return res.status(500).json({ message: 'An error occurred during login. Please try again.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // Login successful
        return res.json({ message: 'Login successful.' });
    });
});

// Start the server
const port = 3000; // Choose a port number
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
