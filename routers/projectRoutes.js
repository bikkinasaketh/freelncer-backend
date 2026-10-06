
const express = require('express')
const router = express.Router()

const {
  CreateProject,
  GetAllProjects,
  GetClientProjects,
  UpdateProjectStatus,
  DeleteProject,
} = require('../controllers/projectController')

const authMiddleware = require('../middleware/Authmiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

// Admin: Create Project
router.post(
  '/create',
  authMiddleware,
  roleMiddleware('Admin'),
  CreateProject,
)

// Client: View Own Projects
router.get(
  '/my-projects',
  authMiddleware,
  roleMiddleware('Client'),
  GetClientProjects,
)

// Admin: View All Projects
router.get(
  '/all',
  authMiddleware,
  roleMiddleware('Admin'),
  GetAllProjects,
)

// Admin: Update Project Status
router.patch(
  '/update-status/:id',
  authMiddleware,
  roleMiddleware('Admin'),
  UpdateProjectStatus,
)

// Admin: Delete Project
router.delete(
  '/delete/:id',
  authMiddleware,
  roleMiddleware('Admin'),
  DeleteProject,
)

module.exports = router
