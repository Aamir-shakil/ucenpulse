const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/utils/prisma");

describe("Activities, metrics, and reports API tests", () => {
  const testUser = {
    name: "API Test User",
    email: "apitest@example.com",
    password: "password123",
  };

  let token;
  let activityId;
  let metricId;

  beforeAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.metric.deleteMany();
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });

    await request(app).post("/api/auth/register").send(testUser);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.activity.deleteMany();
    await prisma.metric.deleteMany();
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });

    await prisma.$disconnect();
  });

  test("POST /api/activities should create an activity", async () => {
    const res = await request(app)
      .post("/api/activities")
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "Running",
        duration: 30,
        notes: "Morning run",
        isOutdoor: true,
        latitude: 53.4808,
        longitude: -2.2426,
        date: "2026-04-01T08:00:00.000Z",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Activity created successfully");
    expect(res.body.activity).toHaveProperty("type", "Running");

    activityId = res.body.activity.id;
  });

  test("GET /api/activities should return activities", async () => {
    const res = await request(app)
      .get("/api/activities")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.activities)).toBe(true);
    expect(res.body.activities.length).toBeGreaterThan(0);
  });

  test("POST /api/metrics should create a metric", async () => {
    const res = await request(app)
      .post("/api/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send({
        steps: 5000,
        sleep: 8,
        water: 2000,
        calories: 450,
        date: "2026-04-01T08:00:00.000Z",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Metric created successfully");

    metricId = res.body.metric.id;
  });

  test("GET /api/metrics should return metrics", async () => {
    const res = await request(app)
      .get("/api/metrics")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.metrics)).toBe(true);
    expect(res.body.metrics.length).toBeGreaterThan(0);
  });

  test("GET /api/reports/summary should return summary data", async () => {
    const res = await request(app)
      .get("/api/reports/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Summary report generated successfully");
    expect(res.body.summary).toHaveProperty("totalActivities");
    expect(res.body.summary).toHaveProperty("totalMetrics");
  });

  test("PUT /api/activities/:id should update an activity", async () => {
    const res = await request(app)
      .put(`/api/activities/${activityId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        type: "Cycling",
        duration: 45,
        notes: "Updated ride",
        isOutdoor: true,
        latitude: 53.4808,
        longitude: -2.2426,
        date: "2026-04-01T09:00:00.000Z",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.activity).toHaveProperty("type", "Cycling");
  });

  test("DELETE /api/metrics/:id should delete a metric", async () => {
    const res = await request(app)
      .delete(`/api/metrics/${metricId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Metric deleted successfully");
  });
});