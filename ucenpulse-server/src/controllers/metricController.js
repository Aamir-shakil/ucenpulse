const prisma = require("../utils/prisma");
const { metricSchema } = require("../validations/metricSchemas");

const getMetrics = async (req, res) => {
  try {
    const metrics = await prisma.metric.findMany({
      where: { userId: req.user.userId },
      orderBy: { date: "desc" },
    });

    res.json({ metrics });
  } catch (error) {
    console.error("Get metrics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMetricById = async (req, res) => {
  try {
    const metricId = Number(req.params.id);

    const metric = await prisma.metric.findFirst({
      where: {
        id: metricId,
        userId: req.user.userId,
      },
    });

    if (!metric) {
      return res.status(404).json({ error: "Metric not found" });
    }

    res.json({ metric });
  } catch (error) {
    console.error("Get metric by id error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMetric = async (req, res) => {
  try {
    const parsed = metricSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const metric = await prisma.metric.create({
      data: {
        steps: parsed.data.steps ?? null,
        sleep: parsed.data.sleep ?? null,
        water: parsed.data.water ?? null,
        calories: parsed.data.calories ?? null,
        date: new Date(parsed.data.date),
        userId: req.user.userId,
      },
    });

    res.status(201).json({
      message: "Metric created successfully",
      metric,
    });
  } catch (error) {
    console.error("Create metric error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMetric = async (req, res) => {
  try {
    const metricId = Number(req.params.id);

    const parsed = metricSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const existingMetric = await prisma.metric.findFirst({
      where: {
        id: metricId,
        userId: req.user.userId,
      },
    });

    if (!existingMetric) {
      return res.status(404).json({ error: "Metric not found" });
    }

    const updatedMetric = await prisma.metric.update({
      where: { id: metricId },
      data: {
        steps: parsed.data.steps ?? null,
        sleep: parsed.data.sleep ?? null,
        water: parsed.data.water ?? null,
        calories: parsed.data.calories ?? null,
        date: new Date(parsed.data.date),
      },
    });

    res.json({
      message: "Metric updated successfully",
      metric: updatedMetric,
    });
  } catch (error) {
    console.error("Update metric error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMetric = async (req, res) => {
  try {
    const metricId = Number(req.params.id);

    const existingMetric = await prisma.metric.findFirst({
      where: {
        id: metricId,
        userId: req.user.userId,
      },
    });

    if (!existingMetric) {
      return res.status(404).json({ error: "Metric not found" });
    }

    await prisma.metric.delete({
      where: { id: metricId },
    });

    res.json({ message: "Metric deleted successfully" });
  } catch (error) {
    console.error("Delete metric error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMetrics,
  getMetricById,
  createMetric,
  updateMetric,
  deleteMetric,
};