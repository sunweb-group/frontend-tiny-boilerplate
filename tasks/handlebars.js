const glob = require('glob')
const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

registerHandlebarsHelpers()
registerHandlebarsPartials()

module.exports = handlebars

function registerHandlebarsHelpers () {
  require('handlebars-helpers')({
    handlebars: handlebars
  })
}

function registerHandlebarsPartials () {
  glob.sync(path.resolve(__dirname, '../partials/**/*.hbs'))
    .forEach(partial => {
      const rawFile = fs.readFileSync(partial, 'utf8')
      const partialName = path.basename(partial, '.hbs')
      const preCompiledTemplate = handlebars.compile(rawFile)
      handlebars.registerPartial(partialName, preCompiledTemplate)
    })
}
