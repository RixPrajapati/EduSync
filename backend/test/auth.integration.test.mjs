import { test, describe, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-for-ci";
process.env.MONGODB_URL = process.env.MONGODB_URL_TEST || "mongodb://localhost:27017/edusync-test";
process.env.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "test";
process.env.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "test";
process.env.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "test";

const { default: request } = await import("supertest");
const { default: app } = await import("../src/app.js");
const { default: mongoose } = await import("mongoose");
const { default: User } = await import("../src/models/User.js");

const validStudentPayload = () => ({
  userName: "Test User",
  email: `test.${Date.now()}.${Math.random().toString(36).slice(2)}@edusync.test`,
  password: "Passw0rd!",
  phone: String(9000000000 + Math.floor(Math.random() * 99999999)),
  address: { city: "Kathmandu" },
  gender: "MALE",
  dob: "2000-01-01",
});

before(async () => {
  await new Promise((resolve) => {
    if (mongoose.connection.readyState === 1) return resolve();
    mongoose.connection.once("connected", resolve);
  });
});

beforeEach(async () => {
  await User.deleteMany({});
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe("POST /api/auth/register", () => {
  test("the first-ever account on an empty database becomes ADMIN", async () => {
    const res = await request(app).post("/api/auth/register").send(validStudentPayload());

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.role, ["ADMIN"]);
  });

  test("every registration after the first becomes STUDENT, even if it asks for ADMIN", async () => {
    await request(app).post("/api/auth/register").send(validStudentPayload());

    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validStudentPayload(), role: ["ADMIN"] });

    assert.equal(res.status, 200);
    assert.deepEqual(res.body.role, ["STUDENT"]);
  });
});

describe("POST /api/user/addUser (privilege escalation)", () => {
  test("is rejected with no auth token at all", async () => {
    const res = await request(app)
      .post("/api/user/addUser")
      .send(validStudentPayload());

    assert.equal(res.status, 401);
  });

  test("is rejected for a logged-in STUDENT trying to create another account", async () => {
    const registerRes = await request(app).post("/api/auth/register").send(validStudentPayload());
    // First account becomes ADMIN, so log in a second (STUDENT) account to test with.
    await request(app).post("/api/auth/register").send(validStudentPayload());
    const secondEmail = (await User.findOne({ role: "STUDENT" })).email;

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: secondEmail, password: "Passw0rd!" });

    const res = await request(app)
      .post("/api/user/addUser")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .send({ ...validStudentPayload(), role: "ADMIN" });

    assert.equal(res.status, 403);
  });
});
