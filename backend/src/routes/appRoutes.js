const express = require("express");
const { scanApp } = require("../services/appDetector");
const router = express.Router();

router.post("/scan", (req, res, next) => {
  try {
    const result = scanApp(req.body);
    req.app.locals.threats.unshift({ ...result, status: result.score >= 60 ? "Needs review" : "Monitoring" });
    res.status(201).json(result);
  } catch (err) { next(err); }
});

module.exports = router;
