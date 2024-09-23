const express = require("express");
const router = express.Router();
const ColumnController = require("../controllers/column.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createColumnValidator,
} = require("../middlewares/validate/column.validate");

router.use(authentication);

/**
 * @swagger
 * /columns:
 *  get:
 *    summary: "Get all columns"
 *    tags: [Columns]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: projectId
 *        in: query
 *        required: true
 *        description: ProjectId to get columns
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Not found
 *      501:
 *        description: Invernal server
 */
router.get("/", AsyncHandle(ColumnController.GetAllColumn));

/**
 * @swagger
 *  /columns/{id}:
 *  post:
 *    summary: Create a column
 *    tags: [Columns]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ProjectId to create columns
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              titleColumn:
 *                type: string
 *                description: The title of column
 *              taskIds:
 *                type: array
 *                items:
 *                  type: string
 *                  description: This is IDtask of columns
 *    responses:
 *      200:
 *        description: Created success
 *      400:
 *        description: Not found
 *      501:
 *        description: Internal server
 *
 */
router.post(
  "/:id",
  createColumnValidator(),
  handleValidationErrors,
  AsyncHandle(ColumnController.CreateColumn)
);

/**
 * @swagger
 * /columns/{id}:
 *  get:
 *    summary: Get column by ID column
 *    tags: [Columns]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID column
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Not found
 *      501:
 *        description: Internal server
 */
router.get("/:id", AsyncHandle(ColumnController.GetColumn));

/**
 * @swagger
 *  /columns/{id}:
 *    patch:
 *      summary: Edit column by ID columns
 *      tags: [Columns]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID column
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titleColumn:
 *                  type: string
 *                  description: name of column
 *                taskIds:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: A list of IDs task
 *    resopnses:
 *      200:
 *        description: Success
 *      400:
 *        description: Not found
 *      501:
 *        description: Internal servel
 */
router.patch("/:id", AsyncHandle(ColumnController.UpdateColumn));

/**
 * @swagger
 * /columns/{id}:
 *   delete:
 *     summary: Delete column
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the column to be deleted
 *         schema:  
 *           type: string
 *     responses: 
 *       200: 
 *         description: Success    
 *       400: 
 *         description: Not found 
 *       501: 
 *         description: Internal server error 
 */

router.delete("/:id", AsyncHandle(ColumnController.DeleteColumn));

module.exports = router;
