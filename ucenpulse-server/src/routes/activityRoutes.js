const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities for the logged-in user
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of activities
 */

router.get("/", getActivities);

/**
 * @swagger
 * /api/activities/{id}:
 *   get:
 *     summary: Get a single activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single activity
 */

router.get("/:id", getActivityById);

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, duration, date]
 *             properties:
 *               type:
 *                 type: string
 *                 example: Running
 *               duration:
 *                 type: integer
 *                 example: 30
 *               notes:
 *                 type: string
 *                 example: Outdoor run
 *               date:
 *                 type: string
 *                 example: 2026-03-31T08:00:00.000Z
 *               isOutdoor:
 *                 type: boolean
 *                 example: true
 *               latitude:
 *                 type: number
 *                 example: 53.4808
 *               longitude:
 *                 type: number
 *                 example: -2.2426
 *     responses:
 *       201:
 *         description: Activity created
 */


router.post("/", createActivity);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Activity updated
 */

router.put("/:id", updateActivity);


/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Activity deleted
 */

router.delete("/:id", deleteActivity);

module.exports = router;