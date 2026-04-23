
/**
 * Authentication Middleware
 *
 * Protects routes by verifying JWT tokens.
 * Extracts user information from the token and attaches it to the request.
 */

const jwt = require("jsonwebtoken");

/**
 * Middleware to validate JWT from Authorization header
 * - Ensures token is present
 * - Validates token format (Bearer scheme)
 * - Verifies token signature and expiry
 * - Attaches decoded user data to req.user
 */

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid authorization format" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;