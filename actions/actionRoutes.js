const express = require('express')
// Load database methods
const Action = require('../data/helpers/actionModel')
// Load middleware

// Instantiate Express Router
const router = express.Router()

//===== GET methods ===== //
router.get('/', async (req, res) => {
  let data = await Actions.get()
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

//===== DELETE methods ===== //

// ==== Custom middleware ==== //
async function validateActionId(req, res, next) {
  console.log(`validateActionId req.params: `, req.params)
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
  console.log(`requiredActionContent`, req.project.id)
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