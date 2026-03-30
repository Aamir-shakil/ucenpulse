const { z } = require("zod");

const metricSchema = z.object({
  steps: z.number().int().nonnegative().optional(),
  sleep: z.number().nonnegative().optional(),
  water: z.number().int().nonnegative().optional(),
  calories: z.number().int().nonnegative().optional(),
  date: z.string().datetime("Invalid ISO date format"),
});

module.exports = { metricSchema };