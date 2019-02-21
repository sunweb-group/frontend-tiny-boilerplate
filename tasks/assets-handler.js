const fs = require('fs')
const path = require('path')
const url = require('url')

const assetsPath = path.resolve(__dirname, '../_dist')

const knownExtensionsHeaders = {
  '.css': { 'Content-Type': 'text/css' },
  '.ico': { 'Content-Type': 'image/x-icon' },
  '.js': { 'Content-Type': 'application/javascript' },
  '.jpg': { 'Content-Type': 'image/jpeg' },
  '.png': { 'Content-Type': 'image/png' },
  '.svg': { 'Content-Type': 'image/svg+xml' },
  '.woff': { 'Content-Type': 'application/font-woff' },
  '.woff2': { 'Content-Type': 'application/font-woff2' },
  '.map': { 'Content-Type': 'text/plain' }
}

// Handle Local Assets
module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname
  const extension = path.extname(pathname)
  if (!knownExtensionsHeaders[extension]) return
  const fixedPathname = path.join(assetsPath, pathname)
  if (!fs.existsSync(fixedPathname)) return
  res.writeHead(200, knownExtensionsHeaders[extension])
  return fs.createReadStream(fixedPathname).pipe(res)
}
