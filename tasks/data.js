const path = require('path')
const fs = require('fs')
const glob = require('glob')

function getLocalData () {
  let data = {}
  glob.sync(path.resolve(__dirname, '../data/**/*.json'))
    .forEach(file => {
      const dataKey = path.basename(file, '.json')
      const rawData = fs.readFileSync(file, 'utf8')
      data[dataKey] = JSON.parse(rawData)
    })
  return data
}

module.exports = getLocalData()
