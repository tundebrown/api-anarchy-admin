const User = require("../models/User.js");

const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "August";
    const currentYear = 2023;
    const currentDay = "2023-7-31";

    /* Recent Total users */
    const totalUsers = await User.count()

    // All users
    const users = await User.find()
    .limit(50)
    .sort({ createdOn: -1 });

    res.status(200).json({
      totalUsers,
      users
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
    getDashboardStats
  }