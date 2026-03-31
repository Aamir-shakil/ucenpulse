const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/utils/prisma");

describe("Authentication and protected route tests", () => {
  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });

    await prisma.$disconnect();
  });

  test("GET / should return API running message", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "UCENPulse API is running");
  });

  test("POST /api/auth/register should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  test("POST /api/auth/login should return JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("GET /api/protected should reject request without token", async () => {
    const res = await request(app).get("/api/protected");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Authorization token required");
  });

  test("GET /api/protected should allow request with valid token", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Protected route accessed successfully"
    );
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });
});