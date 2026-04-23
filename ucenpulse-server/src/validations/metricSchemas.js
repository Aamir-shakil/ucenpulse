
/**
 * Metric Validation Schema
 *
 * Defines validation rules for health metric data.
 * Ensures that incoming metric values are correctly structured
 * and within valid ranges before being processed.
 */

const { z } = require("zod");

/**
 * Schema for validating metric input
 * - All metric fields are optional but must be valid if provided
 * - Enforces non-negative numeric values
 * - Validates date format (ISO string)
 */

const metricSchema = z.object({
  steps: z.number().int().nonnegative().optional(),
  sleep: z.number().nonnegative().optional(),
  water: z.number().int().nonnegative().optional(),
  calories: z.number().int().nonnegative().optional(),
  date: z.string().datetime("Invalid ISO date format"),
});

module.exports = { metricSchema };