const { defineConfig } = require('@vue/cli-service')

// Determine publicPath based on deployment target
// For Vercel: use root path '/'
// For GitHub Pages: use '/ahmad-jamil/'
const getPublicPath = () => {
  // Check for Vercel environment variables (Vercel sets these automatically)
  if (process.env.VERCEL === '1' || 
      process.env.VERCEL_ENV || 
      process.env.VERCEL_URL ||
      process.env.VUE_APP_DEPLOY_TARGET === 'vercel') {
    return '/'
  }
  // For GitHub Pages, use repository name
  return process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/'
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: getPublicPath()
})
