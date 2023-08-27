const { $where } = require("../models/Admin.js");
const User = require("../models/User.js");
const UserInfo = require("../models/UserInfo.js");
const friendshipModel = require("../models/friendshipModel.js");
const gameplaySchema = require("../models/gameplaySchema.js");

const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "August";
    const currentYear = 2023;
    const currentDay = "2023-7-31";

    /* Recent Total users */
    const totalUsers = await User.count();

    // total friendship created
    const totalFriendship = await friendshipModel.count();

    //total gameplayed
    const totalGameplayed = await gameplaySchema.count();

    // Total active users
    const totalActiveUsers = await UserInfo.count({status: {$eq: "Active"}});

    // All users
    const users = await User.find()
    .limit(50)
    .sort({ createdOn: -1 });

    res.status(200).json({
      totalUsers,
      totalActiveUsers,
      totalFriendship,
      totalGameplayed,
      users
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
    getDashboardStats
  }