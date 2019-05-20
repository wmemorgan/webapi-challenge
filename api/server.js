const express = require('express')
const logger = require('morgan')

// Resource Routes
const projectRoutes = require('./projects/projectRoutes')
const actionRoutes = require('./actions/actionRoutes')

const server = express()

//==== Global middleware ==== //
const validateProjectId = require('./middleware')
server.use(express.json())
server.use(logger(`dev`))

server.use(`/api/projects`, projectRoutes)
server.use(`/api/projects/:id/actions`, validateProjectId, actionRoutes)
server.use(`/`, (req, res) => {
  res.send(`<h1>Projects & Actions API microservices</h1>`)
})

module.exports = server