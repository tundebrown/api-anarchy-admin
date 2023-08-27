const express = require("express");
const {
  getMatchStats,
  getUsersByMode
} = require("../controllers/matchstats.js");

const router = express.Router();

router.get("/matchstats", getMatchStats);
router.get("/usersbymode", getUsersByMode);



module.exports = router;
