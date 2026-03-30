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

router.get("/", getMetrics);
router.get("/:id", getMetricById);
router.post("/", createMetric);
router.put("/:id", updateMetric);
router.delete("/:id", deleteMetric);

module.exports = router;