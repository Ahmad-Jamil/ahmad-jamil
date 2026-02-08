// Vercel Serverless Function for Messages
// This file handles both GET (retrieve) and POST (save) messages
// Note: Vercel has a read-only file system, so we use /tmp for storage
// For production, consider using a database (MongoDB Atlas, Vercel KV, etc.)

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Use /tmp directory for writable storage in Vercel
  const messagesFilePath = path.join('/tmp', 'receivedMessages.json');
  const sourceFilePath = path.join(process.cwd(), 'src', 'backend', 'data', 'receivedMessages.json');

  try {
    // GET - Retrieve all messages
    if (req.method === 'GET') {
      let messages = [];
      
      // Try to read from /tmp first (writable location)
      try {
        if (fs.existsSync(messagesFilePath)) {
          const data = fs.readFileSync(messagesFilePath, 'utf8');
          messages = JSON.parse(data);
        } else {
          // If /tmp doesn't have data, try reading from source file
          if (fs.existsSync(sourceFilePath)) {
            const data = fs.readFileSync(sourceFilePath, 'utf8');
            messages = JSON.parse(data);
          }
        }
      } catch (error) {
        // If file doesn't exist or is invalid, return empty array
        messages = [];
      }
      
      return res.status(200).json(messages);
    }

    // POST - Save a new message
    if (req.method === 'POST') {
      const newMessage = req.body;
      
      // Read existing messages
      let messages = [];
      try {
        if (fs.existsSync(messagesFilePath)) {
          const data = fs.readFileSync(messagesFilePath, 'utf8');
          messages = JSON.parse(data);
        } else if (fs.existsSync(sourceFilePath)) {
          // Initialize from source file if /tmp is empty
          const data = fs.readFileSync(sourceFilePath, 'utf8');
          messages = JSON.parse(data);
        }
      } catch (error) {
        // Start with empty array if file doesn't exist
        messages = [];
      }

      // Add new message
      messages.push(newMessage);

      // Write to /tmp (writable location in Vercel)
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

      return res.status(200).json({ message: 'Message saved successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Messages error:', error);
    return res.status(500).json({ message: 'Error processing request', error: error.message });
  }
};

