const express = require("express");
const {
  getUserStatsInfo
} = require("../controllers/user.js");

const router = express.Router();

router.get("/userstatsinfo/:id", getUserStatsInfo);


module.exports = router;
