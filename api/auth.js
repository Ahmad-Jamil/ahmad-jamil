// Vercel Serverless Function for Authentication
// This file will be deployed to Vercel as a serverless function

const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Read authentication file
    // In Vercel, files are read from the project root
    const filePath = path.join(process.cwd(), 'src', 'backend', 'data', 'authentication.json');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('Authentication file not found at:', filePath);
      return res.status(500).json({ 
        message: 'Authentication configuration not found',
        debug: `Looking for file at: ${filePath}`
      });
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    const authData = JSON.parse(data);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username === authData.username && password === authData.password) {
      return res.status(200).json("Welcome Back");
    }

    return res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      message: 'Error authenticating user',
      error: error.message 
    });
  }
};

