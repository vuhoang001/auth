const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const TaskController = require('../controllers/task.controller')
const { authentication } = require("../auth/authUtils");


router.use(authentication);
router.post('/add', TaskController.CreateTask)
router.get("/getall", TaskController.GetAllTasks)


module.exports = router;
