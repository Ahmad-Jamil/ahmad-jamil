const isVercel = process.env.VERCEL === '1'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isVercel ? '/' : isDev ? '/' : '/ahmad-jamil/'
}
