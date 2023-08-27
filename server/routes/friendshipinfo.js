const express = require("express");
const {
  getFriendsInfo
} = require("../controllers/friendship.js");

const router = express.Router();


router.get("/friendinfo/:id", getFriendsInfo);

// router.get("/userstatsinfo", getUserStatsInfo);


module.exports = router;
