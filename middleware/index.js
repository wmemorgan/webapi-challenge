// Load database methods
const Project = require('../data/helpers/projectModel')

//==== Missing Project ID Error handling ====//
async function validateProjectId(req, res, next) {
  const { id } = req.params
  try {
    const project = await Project.get(id)
    if (project) {
      req.project = project
      next()
    } else {
      res.status(404).json({ message: `Project id does not exist.` })
    }
  }
  catch (err) {
    res.status(500).json({ message: `Failed to process request` })
  }
}

module.exports = validateProjectId