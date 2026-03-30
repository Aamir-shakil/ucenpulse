const { z } = require("zod");

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