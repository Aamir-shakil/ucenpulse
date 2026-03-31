const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSummaryReport } = require("../controllers/reportController");

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/reports/summary:
 *   get:
 *     summary: Get summary report for the logged-in user
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Summary report returned successfully
 */
router.get("/summary", getSummaryReport);

module.exports = router;