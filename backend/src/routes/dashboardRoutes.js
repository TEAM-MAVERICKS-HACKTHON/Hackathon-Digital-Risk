const express = require("express");
const { threats } = require("../data/demoData");
const router = express.Router();

router.get("/summary", (req, res) => {
  const all = req.app.locals.threats;
  const byLevel = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  all.forEach(t => { byLevel[t.level] = (byLevel[t.level] || 0) + 1; });
  res.json({
    totalScans: all.length,
    activeThreats: all.filter(t => t.score >= 60).length,
    criticalAlerts: all.filter(t => t.level === "Critical").length,
    averageRisk: all.length ? Math.round(all.reduce((sum, t) => sum + t.score, 0) / all.length) : 0,
    byLevel
  });
});

router.get("/trends", (req, res) => {
  res.json([
    { day: "Mon", profiles: 8, links: 5, apps: 2 },
    { day: "Tue", profiles: 12, links: 8, apps: 3 },
    { day: "Wed", profiles: 9, links: 11, apps: 4 },
    { day: "Thu", profiles: 15, links: 7, apps: 5 },
    { day: "Fri", profiles: 13, links: 12, apps: 6 },
    { day: "Sat", profiles: 18, links: 10, apps: 4 },
    { day: "Sun", profiles: 16, links: 14, apps: 7 }
  ]);
});

module.exports = router;
