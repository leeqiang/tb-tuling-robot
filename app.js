'use strict'
const config = require('config')
const app = require('./server/app')

app.listen(config.port, function () {
  console.info(`Server listen on ${config.port}`)
})
