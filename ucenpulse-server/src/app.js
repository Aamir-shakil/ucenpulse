
/**
 * Express Application Setup
 *
 * Configures middleware, routes, and API documentation
 * for the UCENPulse backend application.
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const metricRoutes = require("./routes/metricRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

/**
 * Global middleware
 * - Enables cross-origin requests
 * - Parses JSON request bodies
 * - Logs HTTP requests for development
 */

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "UCENPulse API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/api/reports", reportRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

/**
 * Swagger API documentation route
 * Provides interactive interface for testing endpoints
 */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;