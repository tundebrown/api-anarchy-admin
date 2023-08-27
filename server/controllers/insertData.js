const User = require("../models/User");
const UserInfo = require("../models/UserInfo");
const UserStats = require("../models/UserStats");
const MatchStat = require("../models/matchStatsSchema.js");
const friendshipModel = require("../models/friendshipModel");


const insertData = async (req, res) => {
  try {

    // const newMatchStats = new MatchStat({
    //   userId: "64dc6ccc4e287cf93f7cb473",
    //   username: "Brown",
    //   roomId: 223,
    //   mode: "battleRoyale",
    //   kills: 37,
    //   deaths: 20,
    // });
    // await newMatchStats.save();
    // sort should look like this: { "field": "userId", "sort": "desc"}


    res.status(200).json({
      matchstats,

    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getMatchStats,
}
