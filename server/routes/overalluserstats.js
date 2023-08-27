const express = require("express");
const {
  getHighScores,
  getUsersByCountry
} = require("../controllers/overalluserstats.js");

const router = express.Router();

router.get("/highscores", getHighScores);

router.get("/usersbycountry", getUsersByCountry);


module.exports = router;
