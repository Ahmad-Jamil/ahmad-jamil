const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Auth route to authenticate view messages
app.post('/api/auth', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'authentication.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error authenticating user' });
        }

        let response;
        try {
            response = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ message: 'Invalid authentication data' });
        }

        if (req.body.username === response.username && req.body.password === response.password) {
            return res.status(200).json("Welcome Back");
        }

        return res.status(401).json({ message: 'Invalid username or password' });
    });
});

// POST route to save message to JSON file
app.post('/api/messages', (req, res) => {
    const newMessage = req.body;
    const filePath = path.join(__dirname, 'data', 'receivedMessages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        const messages = JSON.parse(data);
        messages.push(newMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error writing file' });
            }

            res.status(200).json({ message: 'Message saved successfully' });
        });
    });
});

// GET route to retrieve all messages from JSON file
app.get('/api/messages', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'receivedMessages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        const messages = JSON.parse(data);
        res.status(200).json(messages);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
