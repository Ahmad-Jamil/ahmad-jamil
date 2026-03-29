// API Configuration
// This file manages the API base URL for different environments

// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // If on Vercel, use same domain (relative paths work)
  // This allows frontend and backend on same Vercel deployment
  if (window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('vercel.com')) {
    return ''; // Empty string = same origin (relative paths)
  }

  // GitHub Pages (or any non-Vercel domain): you MUST set VUE_APP_API_URL
  // because same-origin APIs won't exist there.
  return process.env.VUE_APP_API_URL || '';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  MESSAGES: `${API_BASE_URL}/api/messages`,
  RESUME: `${API_BASE_URL}/api/resume`,
  PROJECTS: `${API_BASE_URL}/api/projects`,
  REFERENCES: `${API_BASE_URL}/api/references`,
};

