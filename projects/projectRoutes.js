const express = require('express')
// Load database methods
const Project = require('../data/helpers/projectModel')
// Load middleware
const validateProjectId = require('../middleware')
// Instatiantiate Express Router
const router = express.Router()

//===== GET methods ===== //
router.get('/', async (req, res) => {
  try {
    let data = await Project.get()
    res.json(data)
  }
  catch (err) {
    res.status(500).json({ message: `Could not retrieve projects` })
  }
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})



//===== POST methods ===== //
router.post('/', async (req, res) => {
  try {

  }
  catch (err) {

  }
})

//===== PUT methods ===== //
router.put('/:id', async (req, res) => {
  try {

  }
  catch (err) {

  }
})


//===== DELETE methods ===== //
router.delete('/:id', async (req, res) => {
  try {

  }
  catch (err) {

  }
})


// ==== Custom middleware ==== //



module.exports = router