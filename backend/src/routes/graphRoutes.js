const express = require("express");
const { graph } = require("../data/demoData");
const router = express.Router();

router.get("/", (req, res) => res.json(graph));

module.exports = router;
