const prisma = require("../utils/prisma");
const { activitySchema } = require("../validations/activitySchemas");
const { getWeatherForLocation } = require("../services/weatherService");

const getActivities = async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            where: { userId: req.user.userId },
            orderBy: { date: "desc" },
        });

        res.json({ activities });
    } catch (error) {
        console.error("Get activities error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getActivityById = async (req, res) => {
    try {
        const activityId = Number(req.params.id);

        const activity = await prisma.activity.findFirst({
            where: {
                id: activityId,
                userId: req.user.userId,
            },
        });

        if (!activity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        res.json({ activity });
    } catch (error) {
        console.error("Get activity by id error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createActivity = async (req, res) => {
    try {
        const parsed = activitySchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parsed.error.flatten().fieldErrors,
            });
        }

        const type = parsed.data.type.trim();
        const duration = parsed.data.duration;
        const notes = parsed.data.notes ? parsed.data.notes.trim() : null;
        const date = new Date(parsed.data.date);
        const isOutdoor = parsed.data.isOutdoor ?? false;
        const latitude = parsed.data.latitude ?? null;
        const longitude = parsed.data.longitude ?? null;

        let weatherData = {
            weatherTemp: null,
            weatherCode: null,
            weatherWindSpeed: null,
        };

        if (isOutdoor && latitude !== null && longitude !== null) {
            const weatherResult = await getWeatherForLocation(latitude, longitude);
            if (weatherResult) {
                weatherData = weatherResult;
            }
        }

        const activity = await prisma.activity.create({
            data: {
                type,
                duration,
                notes,
                date,
                isOutdoor,
                latitude,
                longitude,
                ...weatherData,
                userId: req.user.userId,
            },
        });

        res.status(201).json({
            message: "Activity created successfully",
            activity,
        });
    } catch (error) {
        console.error("Create activity error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateActivity = async (req, res) => {
    try {
        const activityId = Number(req.params.id);

        const parsed = activitySchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parsed.error.flatten().fieldErrors,
            });
        }

        const existingActivity = await prisma.activity.findFirst({
            where: {
                id: activityId,
                userId: req.user.userId,
            },
        });

        if (!existingActivity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        const type = parsed.data.type.trim();
        const duration = parsed.data.duration;
        const notes = parsed.data.notes ? parsed.data.notes.trim() : null;
        const date = new Date(parsed.data.date);
        const isOutdoor = parsed.data.isOutdoor ?? false;
        const latitude = parsed.data.latitude ?? null;
        const longitude = parsed.data.longitude ?? null;

        let weatherData = {
            weatherTemp: null,
            weatherCode: null,
            weatherWindSpeed: null,
        };

        if (isOutdoor && latitude !== null && longitude !== null) {
            const weatherResult = await getWeatherForLocation(latitude, longitude);
            if (weatherResult) {
                weatherData = weatherResult;
            }
        }

        const updatedActivity = await prisma.activity.update({
            where: { id: activityId },
            data: {
                type,
                duration,
                notes,
                date,
                isOutdoor,
                latitude,
                longitude,
                ...weatherData,
            },
        });

        res.json({
            message: "Activity updated successfully",
            activity: updatedActivity,
        });
    } catch (error) {
        console.error("Update activity error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteActivity = async (req, res) => {
    try {
        const activityId = Number(req.params.id);

        const existingActivity = await prisma.activity.findFirst({
            where: {
                id: activityId,
                userId: req.user.userId,
            },
        });

        if (!existingActivity) {
            return res.status(404).json({ error: "Activity not found" });
        }

        await prisma.activity.delete({
            where: { id: activityId },
        });

        res.json({ message: "Activity deleted successfully" });
    } catch (error) {
        console.error("Delete activity error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
};