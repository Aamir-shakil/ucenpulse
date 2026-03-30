const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSummaryReport } = require("../controllers/reportController");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", getSummaryReport);

module.exports = router;