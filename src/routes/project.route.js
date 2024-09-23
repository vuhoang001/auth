const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ProjectController = require("../controllers/project.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createProjectValidator,
} = require("../middlewares/validate/project.validate");

router.use(authentication);

/**
 * @swagger
 * /projects:
 *  get:
 *    summary: Retrive a list of projects
 *    tags: [Project]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A list of projects
 *      500:
 *        description: Server error
 */
router.get("/", AsynHandle(ProjectController.GetAllProjects));

/**
 * @swagger
 * /projects:
 *    post:
 *      summary: Create a porject
 *      tags: [Project]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                projectName:
 *                  type: string
 *                  description: The name of the project
 *                projectDescription:
 *                  type: string
 *                  description: A brief description of the project
 *                progressTask:
 *                  type: number
 *                  description: The progress of tasks as a percentage
 *                columnIds:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: Array of column IDs associated with the project
 *                fromDate:
 *                  type: string
 *                  format: date
 *                  description: The day start the project
 *                toDate:
 *                  type: string
 *                  format: date
 *                  description: Expected project completion date
 *                members:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: Members in the project
 *              required:
 *                - projectName
 *                - projectDescription
 *                - progressTask
 *      responses:
 *        200:
 *          description: Create success
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Cant create project
 *
 */
router.post(
  "/",
  createProjectValidator(),
  handleValidationErrors,
  AsyncHandle(ProjectController.CreateProject)
);

/**
 * @swagger
 * /projects/{id}:
 *  patch:
 *    summary: Edit the project
 *    tags: [Project]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the project to be updated
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              projectName:
 *                type: string
 *                description: The name of the project
 *              projectDescription:
 *                type: string
 *                description: The description of the project
 *              progressTask:
 *                type: number
 *                description: The progress of the project
 *              columnIds:
 *                type: array
 *                items:
 *                  type: string
 *                  description: Array of column Ids associated with the project
 *              fromDate:
 *                type: string
 *                format: date
 *                description: The day that project is started
 *              toDate:
 *                type: string
 *                format: date
 *                description: expected project completion date
 *              members:
 *                type: array
 *                items:
 *                  type: string
 *                  description: Members in the project
 *    responses:
 *      200:
 *        description: Created success
 *      400:
 *        description: Not found project
 *      500:
 *        description: Cant edit project
 *
 *
 */
router.patch("/:id", AsynHandle(ProjectController.UpdateProject));

/**
 * @swagger
 * /projects/{id}:
 *  delete:
 *    summary: Delete the project
 *    tags: [Project]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the project to be deleted
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Deleted successfully!
 *      400:
 *        description: Not found
 */
router.delete("/:id", AsynHandle(ProjectController.DeleteProject));

/**
 * @swagger
 * /projects/{id}:
 *  get:
 *    summary: Get a project
 *    tags: [Project]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID project to search
 *        schame:
 *          type: string
 *    responses:
 *      200:
 *        description: Get project success
 *      400:
 *        description: NotFoundError
 */
router.get("/:id", AsyncHandle(ProjectController.GetProject));

module.exports = router;
