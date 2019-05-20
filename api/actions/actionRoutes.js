const express = require('express')
// Load database methods
const Action = require('../data/helpers/actionModel')
// Load middleware
const idContentCheck = [validateActionId, requiredActionContent]
// Instantiate Express Router
const router = express.Router()

//===== GET methods ===== //
router.get('/', async (req, res) => {
  let data = await Action.get()
  res.json(data)
})

router.get('/:id', validateActionId, async (req, res) => {
  res.json(req.action)
})

//===== POST methods ===== //
router.post('/', requiredActionContent, async (req, res) => {
  try {
    let data = await Action.insert(req.body)
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).json({ message: `Error creating action item` })
  }  
})

//===== PUT methods ===== //
router.put('/:id', idContentCheck, async (req, res) => {
  try {
    let data = await Action.update(req.params.id, req.body)
    res.json(data)
  }
  catch (err) {
    res.status(500).json({ message: `Error updating action item` })
  }
})

//===== DELETE methods ===== //
router.delete('/:id', validateActionId, async (req, res) => {
  try {
    let data = await Action.remove(req.params.id)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted action item number: ${req.params.id}. ` })
    }
  }
  catch (err) {
    res.status(500).json({ message: `Error deleting action item.` })
  }
})

// ==== Custom middleware ==== //
async function validateActionId(req, res, next) {
  try {
    const data = await Action.get(req.params.id)
    req.action = data
    next()  
  }
  catch (err) {
    res.status(404).json({ message: `Action item does not exist.` })
  }
}

function requiredActionContent(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing action data" })
  } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Missing required action field(s)." })
  } else if (req.body.project_id !== req.project.id) {
    res.status(400).json({ message: `Invalid Project ID` })
  } else {
    next()
  }
}

module.exports = router