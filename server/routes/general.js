const express = require("express");
const { getDashboardStats } = require("../controllers/general.js");

const router = express.Router();

router.get("/dashboard", getDashboardStats);

module.exports = router;
