// Test endpoint to verify Vercel deployment
// Access at: https://your-project.vercel.app/api/test

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  return res.status(200).json({
    message: 'Vercel serverless function is working!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
    cwd: process.cwd()
  });
};

