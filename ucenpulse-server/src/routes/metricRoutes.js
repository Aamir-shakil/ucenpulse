const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMetrics,
  getMetricById,
  createMetric,
  updateMetric,
  deleteMetric,
} = require("../controllers/metricController");

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get all metrics for the logged-in user
 *     tags: [Metrics]
 *     responses:
 *       200:
 *         description: List of metrics
 */
router.get("/", getMetrics);

/**
 * @swagger
 * /api/metrics/{id}:
 *   get:
 *     summary: Get a single metric by ID
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Single metric
 */
router.get("/:id", getMetricById);

/**
 * @swagger
 * /api/metrics:
 *   post:
 *     summary: Create a new metric entry
 *     tags: [Metrics]
 *     responses:
 *       201:
 *         description: Metric created
 */
router.post("/", createMetric);

/**
 * @swagger
 * /api/metrics/{id}:
 *   put:
 *     summary: Update a metric entry
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Metric updated
 */
router.put("/:id", updateMetric);

/**
 * @swagger
 * /api/metrics/{id}:
 *   delete:
 *     summary: Delete a metric entry
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Metric deleted
 */
router.delete("/:id", deleteMetric);

module.exports = router;