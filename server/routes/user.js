const express = require("express");
const {
  getUsers,
  // getUserStatsInfo
} = require("../controllers/user.js");

const router = express.Router();

router.get("/user", getUsers);

// router.get("/userstatsinfo", getUserStatsInfo);


module.exports = router;
