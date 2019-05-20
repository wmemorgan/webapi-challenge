const express = require('express')
// Load database methods
const Actions = require('../data/helpers/actionModel')
// Load middleware
const validateProjectId = require('../middleware')
// Instantiate Express Router
const router = express.Router()

// router.use(validateProjectId)

router.get('/', async (req, res) => {
  let data = await Actions.get()
  res.json(data)
})

module.exports = router