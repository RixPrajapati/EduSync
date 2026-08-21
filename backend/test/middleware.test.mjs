import { test, describe } from "node:test";
import assert from "node:assert/strict";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-for-ci";

const { verifyToken } = await import("../src/middleware/auth.js");
const { allowRoles } = await import("../src/middleware/course.js");
const jwt = (await import("../src/utils/jwt.js")).default;

const makeRes = () => {
  const res = {};
  res.statusCode = null;
  res.body = null;
  res.status = (code) => { res.statusCode = code; return res; };
  res.json = (body) => { res.body = body; return res; };
  return res;
};

describe("verifyToken", () => {
  test("rejects a request with no token at all", async () => {
    const req = { headers: {}, cookies: {} };
    const res = makeRes();
    let nextCalled = false;
    await verifyToken(req, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 401);
    assert.equal(nextCalled, false);
  });

  test("accepts a valid Authorization header and sets req.token", async () => {
    const token = jwt.generateJwt({ _id: "user123", role: ["STUDENT"] });
    const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res = makeRes();
    let nextCalled = false;
    await verifyToken(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
    assert.equal(req.token.id, "user123");
    assert.deepEqual(req.token.role, ["STUDENT"]);
  });

  test("accepts a valid token from the cookie as a fallback", async () => {
    const token = jwt.generateJwt({ _id: "user456", role: ["ADMIN"] });
    const req = { headers: {}, cookies: { token } };
    const res = makeRes();
    let nextCalled = false;
    await verifyToken(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
    assert.equal(req.token.id, "user456");
  });

  test("rejects a malformed/invalid token", async () => {
    const req = { headers: { authorization: "Bearer not-a-real-token" }, cookies: {} };
    const res = makeRes();
    let nextCalled = false;
    await verifyToken(req, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 401);
    assert.equal(nextCalled, false);
  });
});

describe("allowRoles", () => {
  test("calls next() when the user has an allowed role", () => {
    const middleware = allowRoles("ADMIN", "TEACHER");
    const req = { token: { id: "u1", role: ["TEACHER"] } };
    const res = makeRes();
    let nextCalled = false;
    middleware(req, res, () => { nextCalled = true; });

    assert.equal(nextCalled, true);
  });

  test("returns 403 when the user's role isn't allowed", () => {
    const middleware = allowRoles("ADMIN");
    const req = { token: { id: "u1", role: ["STUDENT"] } };
    const res = makeRes();
    let nextCalled = false;
    middleware(req, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 403);
    assert.equal(nextCalled, false);
  });

  test("returns 401 when there's no decoded token at all", () => {
    const middleware = allowRoles("ADMIN");
    const req = {};
    const res = makeRes();
    let nextCalled = false;
    middleware(req, res, () => { nextCalled = true; });

    assert.equal(res.statusCode, 401);
    assert.equal(nextCalled, false);
  });
});
