const express = require('express')
// Load database methods
const Project = require('../../data/helpers/projectModel')
// Load middleware
const validateProjectId = require('../middleware')
const idBodyCheck = [validateProjectId, requiredProjectContent]
// Instatiantiate Express Router
const router = express.Router()

//===== GET methods ===== //
router.get('/', async (req, res) => {
  try {
    let data = await Project.get()
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

//===== POST methods ===== //
router.post('/', requiredProjectContent, async (req, res) => {
  try {
    let newData = await Project.insert(req.body)
    if (newData) {
      let data = await Project.get()
      res.status(201).json(data)
    } else throw err
  }
  catch (err) {
    res.status(500).json({ message: `Error creating project record` })
  }
})

//===== PUT methods ===== //
router.put('/:id', idBodyCheck, async (req, res) => {
  try {
    let updatedData = await Project.update(req.params.id, req.body)
    if (updatedData) {
      let data = await Project.get()
      res.json(data)
    } else throw err
  }
  catch (err) {
    res.status(500).json({ message: `Error updating project record` })
  }
})

//===== DELETE methods ===== //
router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    let deleteData = await Project.remove(req.params.id)
    if (deleteData <= 0) throw err
    else {
      let data = await Project.get()
      res.json(data)
    }
  }
  catch (err) {
    res.status(500).json({ message: `Error deleting project record` })
  }
})

// ==== Custom middleware ==== //
function requiredProjectContent(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing project data" })
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required name or description field." })
  } else {
    next()
  }
}

module.exports = router