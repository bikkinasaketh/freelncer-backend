
const Project = require('../models/project')
const User = require('../models/user')

// Create Project
const CreateProject = async (req, res) => {
  try {
    const { title, description, client, budget } = req.body

    if (!title || !description || !client || budget == null) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    const existingClient = await User.findOne({
      _id: client,
      role: 'Client',
    })

    if (!existingClient) {
      return res.status(404).json({
        message: 'Client not found',
      })
    }

    const newProject = new Project({
      title,
      description,
      client: existingClient._id,
      budget: Number(budget),
      status: 'Pending',
    })

    await newProject.save()

    res.status(201).json({
      message: 'Project created successfully',
      project: newProject,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// Get All Projects
const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('client', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Projects fetched successfully',
      projects,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// Get Projects Assigned to Logged-in Client
const GetClientProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      client: req.user.userId,
    })
      .populate('client', 'name email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'Client projects fetched successfully',
      projects,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// Update Project Status
const UpdateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body
    const { id } = req.params

    const allowedStatus = [
      'Pending',
      'In Progress',
      'Completed',
    ]

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status',
      })
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    )

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json({
      message: 'Project status updated successfully',
      project,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// Delete Project
const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return res.status(404).json({
        message: 'Project not found',
      })
    }

    res.status(200).json({
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  CreateProject,
  GetAllProjects,
  GetClientProjects,
  UpdateProjectStatus,
  DeleteProject,
}
