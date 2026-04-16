const express = require("express");
const { getDatabase } = require("../lib/mongodb");
const { randomUUID } = require("crypto");

const router = express.Router();

const FEEDBACK_COLLECTION_NAME = "feedback";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return req.headers["x-real-ip"] ?? req.ip ?? "unknown";
}

function isRateLimited(clientIp) {
  const now = Date.now();
  const current = rateLimitStore.get(clientIp);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  rateLimitStore.set(clientIp, { count: current.count + 1, resetAt: current.resetAt });
  return false;
}

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

// GET /api/feedback
router.get("/", async (_req, res) => {
  try {
    const db = await getDatabase();
    const collection = db.collection(FEEDBACK_COLLECTION_NAME);

    const items = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    const feedback = items.map((doc) => ({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      message: doc.message,
      createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
    }));

    return res.status(200).json({ feedback });
  } catch (error) {
    console.error("GET /api/feedback error:", error);
    return res.status(500).json({ message: "Failed to load feedback.", feedback: [] });
  }
});

// POST /api/feedback
router.post("/", async (req, res) => {
  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      message: "Too many requests. Please wait a minute before sending more feedback.",
    });
  }

  const body = req.body;

  const payload = {
    name: normalizeValue(body.name),
    email: normalizeValue(body.email),
    message: normalizeValue(body.message),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ message: "Name, email, and feedback are required." });
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection(FEEDBACK_COLLECTION_NAME);

    const createdAt = new Date();
    const newDoc = { id: randomUUID(), ...payload, createdAt };

    await collection.insertOne(newDoc);

    return res.status(201).json({
      message: "Feedback saved successfully.",
      feedback: { ...newDoc, createdAt: createdAt.toISOString() },
    });
  } catch (error) {
    console.error("POST /api/feedback error:", error);
    return res.status(500).json({ message: "Failed to save feedback. Please try again later." });
  }
});

module.exports = router;
