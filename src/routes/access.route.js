const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const AccessController = require("../controllers/access.controller");
const { authentication } = require("../auth/authUtils");

router.get("/socket", AsynHandle(AccessController.socket));

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", AsynHandle(AccessController.signUp));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/login", AsynHandle(AccessController.login));

/**
 * @swagger
 * /handleOTP:
 *   post:
 *     summary: Handle OTP for two-factor authentication
 *     tags: [Access]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                      required:
 *                          - email
 *     responses:
 *       200:
 *         description: OTP handled successfully
 *       400:
 *         description: Bad request
 */
router.post("/handleOTP", AsynHandle(AccessController.handleOTP));

/**
 * @swagger
 * /passwordReset:
 *   post:
 *     summary: Reset user password
 *     tags: [Access]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.post("/passwordReset", AsynHandle(AccessController.resetPassword));

// Middleware for authentication
router.use(authentication);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     tags: [Access]
 *     security:
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", AsynHandle(AccessController.logout));

/**
 * @swagger
 * /handle-refresh:
 *   post:
 *     summary: Handle refresh token
 *     tags: [Access]
 *     security:
 *         - refreshToken: []
 *     responses:
 *       200:
 *         description: Refresh token handled successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/handle-refresh", AsynHandle(AccessController.handleRefreshToken));

module.exports = router;
