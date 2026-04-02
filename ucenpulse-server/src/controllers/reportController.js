const prisma = require("../utils/prisma");

const getSummaryReport = async (req, res) => {
  try {
    const userId = req.user.userId;

    const activities = await prisma.activity.findMany({
      where: { userId },
      select: {
        duration: true,
        isOutdoor: true,
      },
    });

    const metrics = await prisma.metric.findMany({
      where: { userId },
      select: {
        steps: true,
        sleep: true,
        water: true,
        calories: true,
      },
    });

    const totalActivities = activities.length;
    const totalMetrics = metrics.length;

    const totalDuration = activities.reduce((sum, activity) => {
      return sum + activity.duration;
    }, 0);

    const outdoorActivities = activities.filter(
      (activity) => activity.isOutdoor
    ).length;

    const average = (values) => {
      const validValues = values.filter(
        (value) => value !== null && value !== undefined
      );

      if (validValues.length === 0) return null;

      const sum = validValues.reduce((acc, value) => acc + value, 0);
      return Number((sum / validValues.length).toFixed(2));
    };

    const avgSteps = average(metrics.map((metric) => metric.steps));
    const avgSleep = average(metrics.map((metric) => metric.sleep));
    const avgWater = average(metrics.map((metric) => metric.water));
    const avgCalories = average(metrics.map((metric) => metric.calories));

    res.json({
      message: "Summary report generated successfully",
      summary: {
        totalActivities,
        totalMetrics,
        totalDuration,
        outdoorActivities,
        avgSteps,
        avgSleep,
        avgWater,
        avgCalories,
      },
    });
  } catch (error) {
    console.error("Get summary report error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSummaryReport };