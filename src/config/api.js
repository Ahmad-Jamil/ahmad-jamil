// API Configuration
// This file manages the API base URL for different environments

// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // For production, use your deployed backend URL
  // After deploying to Vercel, replace with your Vercel URL
  // Example: 'https://your-project-name.vercel.app'
  // See GITHUB_VERCEL_DEPLOYMENT.md for deployment instructions
  
  return process.env.VUE_APP_API_URL || 'https://ahmad-jamil.vercel.app';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  MESSAGES: `${API_BASE_URL}/api/messages`,
};

