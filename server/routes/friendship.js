const express = require("express");
const {
  getFriends,
//   getFriendsInfo
} = require("../controllers/friendship.js");

const router = express.Router();

router.get("/friend", getFriends);

// router.get("/userstatsinfo", getUserStatsInfo);


module.exports = router;
