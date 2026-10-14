const express = require("express");
const { graph } = require("../data/demoData");
const router = express.Router();

router.get("/", (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  res.json(req.app.locals.threats.slice(0, limit));
});

router.get("/:id", (req, res) => {
  const threat = req.app.locals.threats.find(item => item.id === req.params.id);
  if (!threat) return res.status(404).json({ error: "Threat not found" });
  res.json(threat);
});

module.exports = router;
