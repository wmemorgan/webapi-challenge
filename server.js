const express = require('express')
const logger = require('morgan')

const server = express()

// Global middleware
server.use(express.json())
server.use(logger(`dev`))

server.use(`/`, (req, res) => {
  res.send(`<h1>Projects & Actions API microservices</h1>`)
})

module.exports = server