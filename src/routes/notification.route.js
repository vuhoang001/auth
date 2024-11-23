const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notification.controller')

router.get('project/:projectId', notificationController.getNotifications)
router.patch('/:notificationId/read', notificationController.markAsRead);
router.patch('/project/:projectId/read-all', notificationController.markAllAsRead);

module.exports = router;