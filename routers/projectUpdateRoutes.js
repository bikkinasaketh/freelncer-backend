const express = require('express');
const router = express.Router();

const {
    addProjectUpdate,
    getProjectUpdates
} = require('../controllers/projectUpdateController');

const authMiddleware = require('../middleware/Authmiddleware');
const roleMiddleware = require('../middleware/RoleMiddleWare');

router.post(
    '/add',
    authMiddleware,
    roleMiddleware('Admin'),
    addProjectUpdate
);

router.get(
    '/:projectId',
    authMiddleware,
    roleMiddleware('Client'),
    getProjectUpdates
);

module.exports = router;