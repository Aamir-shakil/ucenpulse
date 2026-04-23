
/**
 * Authentication Validation Schemas
 *
 * Defines validation rules for user registration and login.
 * Ensures that authentication-related input is correctly structured
 * before being processed by the application.
 */

const { z } = require("zod");

/**
 * Schema for user registration
 * - Validates name, email, and password
 * - Enforces minimum length requirements
 */

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { registerSchema, loginSchema };