
/**
 * Activity Validation Schema
 *
 * Defines the structure and constraints for activity data.
 * Ensures incoming requests contain valid and well-formed data
 * before being processed by the application.
 */

const { z } = require("zod");

/**
 * Schema for validating activity input
 * - Enforces required fields and data types
 * - Applies constraints (e.g. positive duration, valid coordinates)
 */

const activitySchema = z.object({
  type: z.string().min(2, "Activity type is required"),
  duration: z.number().int().positive("Duration must be a positive number"),
  notes: z.string().max(500, "Notes must be 500 characters or fewer").optional(),
  date: z.string().datetime("Invalid ISO date format"),
  isOutdoor: z.boolean().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

module.exports = { activitySchema };