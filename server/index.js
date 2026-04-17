require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRouter = require("./routes/contact");

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  })
);

// ── Routes ──────────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "Portfolio backend is running." });
});

app.use("/api/contact", contactRouter);

// ── Local dev server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the other process or set a different PORT.`
    );
    process.exit(1);
  }

  throw error;
});

// Export for Vercel serverless functions
module.exports = app;