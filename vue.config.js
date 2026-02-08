const { defineConfig } = require('@vue/cli-service')

// Determine publicPath based on deployment target
// For Vercel: use root path '/'
// For GitHub Pages: use '/ahmad-jamil/'
const getPublicPath = () => {
  // If deploying to Vercel, use root path
  if (process.env.VERCEL === '1' || process.env.VUE_APP_DEPLOY_TARGET === 'vercel') {
    return '/'
  }
  // For GitHub Pages, use repository name
  return process.env.NODE_ENV === 'production' ? '/ahmad-jamil/' : '/'
}

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: getPublicPath()
})
