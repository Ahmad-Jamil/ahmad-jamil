const { defineConfig } = require('@vue/cli-service')

// Determine publicPath based on deployment target
// For Vercel: use root path '/'
// For GitHub Pages: use '/ahmad-jamil/'
const getPublicPath = () => {
  // Vercel automatically sets VERCEL=1 during builds
  // Also check for other Vercel indicators
  const isVercel = process.env.VERCEL === '1' || 
                   process.env.VERCEL_ENV || 
                   process.env.VERCEL_URL ||
                   process.env.VUE_APP_DEPLOY_TARGET === 'vercel' ||
                   process.env.CI === '1' && process.env.VERCEL === '1'
  
  if (isVercel) {
    console.log('🔵 Building for Vercel - using root path "/"')
    return '/'
  }
  
  // For GitHub Pages, use repository name
  const githubPath = process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/'
  console.log('🟢 Building for GitHub Pages - using path:', githubPath)
  return githubPath
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: getPublicPath()
})
