const Project = require('../models/project');
const ProjectUpdate = require('../models/projectupdate');

// Admin: Add project update
const addProjectUpdate = async (req, res) => {
    try {
        const { projectId, message, progress } = req.body;

        if (!projectId || !message || progress === undefined) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
            return res.status(400).json({
                message: 'Progress must be between 0 and 100'
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        const update = await ProjectUpdate.create({
            project: projectId,
            message,
            progress
        });

        res.status(201).json({
            message: 'Project update added successfully',
            update
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Client: Get updates for a project
const getProjectUpdates = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findOne({
            _id: projectId,
            client: req.user.userId
        });

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        const updates = await ProjectUpdate.find({
            project: projectId
        }).sort({ createdAt: -1 });

        res.status(200).json({ updates });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addProjectUpdate,
    getProjectUpdates
};