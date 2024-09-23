const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const TaskController = require("../controllers/task.controller");
const { authentication } = require("../auth/authUtils");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createTaskValidator,
} = require("../middlewares/validate/task.validate");
router.use(authentication);

/**
 * @swagger
 *  /tasks:
 *    get:
 *      summary: Get all Tasks
 *      tags: [Tasks]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    title:
 *                      type: string
 *                    description:
 *                      type: string
 *        400:
 *          description: Bad request
 *        501:
 *          description: Internal server error
 */
router.get("/", AsyncHandle(TaskController.GetAllTasks));

/**
 * @swagger
 *  /tasks/{id}:
 *    get:
 *      summary: Get task by ID
 *      tags: [Tasks]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the task
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not found
 *        501:
 *          description: Internal server error
 */
router.get("/:id", AsyncHandle(TaskController.GetTaskById));

/**
 *
 * @swagger
 *  /tasks/{id}:
 *    post:
 *      summary: Create a task
 *      tags: [Tasks]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the column to which the task belongs
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                taskName:
 *                  type: string
 *                  description: Name of the task
 *                taskDescription:
 *                  type: string
 *                  description: Description of the task
 *                priority:
 *                  type: string
 *                  enum: ["Low", "Medium", "High"]
 *                  description: Priority of the task
 *                taskStatus:
 *                  type: string
 *                  enum: ["Công việc cần làm", "Đang tiến hành", "Kiểm tra", "Hoàn thành"]
 *                  description: Status of the task
 *                assignees:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: ID account
 *                comments:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      user:
 *                        type: string
 *                        format: objectId
 *                        description: User ID referencing for Account
 *                      comment:
 *                        type: string
 *                        description: The comment text
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the comment was created
 *              required:
 *                - taskName
 *                - priority
 *                - taskStatus
 *      responses:
 *        200:
 *          description: Success, returns the created task details
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not found
 *        500:
 *          description: Internal server error
 *
 */
router.post(
  "/:id",
  createTaskValidator(),
  handleValidationErrors,
  AsyncHandle(TaskController.CreateTask)
);

router.patch("/:id", AsyncHandle(TaskController.UpdateTask));

/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *    summary: Delete task
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the task to delete
 *    responses:
 *      204:
 *        description: Task deleted successfully
 *      400:
 *        description: Bad request (e.g., invalid ID format)
 *      404:
 *        description: Task not found
 *      500:
 *        description: Internal server error
 */

router.delete("/:id", AsyncHandle(TaskController.DeleteTask));
module.exports = router;
