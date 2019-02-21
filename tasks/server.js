const data = require('./data')
const fs = require('fs')
const http = require('http')
const path = require('path')

const rootPort = process.env.PORT || 8080
const routes = require(path.resolve(__dirname, '../pages/routes.json'))
const assetsHandler = require('./assets-handler')
const handlebars = require('./handlebars')


// Precompile the handlebars templates
const precompiledTemplates = Object.entries(routes)
    .reduce((compiledTemplates, [slug, routeData]) => {
      if (!routeData.page) return compiledTemplates
      return { ...compiledTemplates, [slug]: ((page) => {
          const rawTemplate = fs.readFileSync(path.resolve(__dirname, '../pages', page), 'utf8')
          return handlebars.compile(rawTemplate)
        })(routeData.page) }
    }, {})


// Try to render a page
const renderPage = (req, res) => {
  try {
    const html = precompiledTemplates[req.url](data)
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(html)
    res.end()
  } catch(e) {
    return new Error(e)
  }
}


// Aborts a request with 404 code
const abortRequest = (req, res) => {
  res.writeHead(404, {})
  res.end()
}


// Create and starts the server
http
  .createServer((req, res) => {
    // Handle redirects
    if (routes[req.url] && routes[req.url].redirectTo) {
      req.headers['x-request-uri'] = req.url
      req.url = routes[req.url].redirectTo
    }
    // Return response
    return routes[req.url] && routes[req.url].page
      ? renderPage(req, res)
      : assetsHandler(req, res) || abortRequest(req, res)
  })
  .listen(rootPort, () => {
    console.log(`Server listening on http://localhost:${rootPort}`)
    console.log('Ctrl + C to stop')
  })
