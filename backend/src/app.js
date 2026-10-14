require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { threats } = require("./data/demoData");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const linkRoutes = require("./routes/linkRoutes");
const appRoutes = require("./routes/appRoutes");
const threatRoutes = require("./routes/threatRoutes");
const graphRoutes = require("./routes/graphRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",").map(value => value.trim());

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use("/api", rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false }));
app.locals.threats = [...threats];

app.get("/", (req, res) => res.json({ name: "ThreatNexus API", docs: "/api/health" }));
app.get("/api/health", (req, res) => res.json({ status: "ok", project: "ThreatNexus", timestamp: new Date().toISOString() }));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/apps", appRoutes);
app.use("/api/threats", threatRoutes);
app.use("/api/graph", graphRoutes);
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use(errorHandler);

module.exports = app;
