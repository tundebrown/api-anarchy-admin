const MatchStat = require("../models/matchStatsSchema.js");

const getMatchStats = async (req, res) => {
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
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    //Get search items of data using the search parameters provided by the client
    const matchstats = await MatchStat.find({
      $or: [
        { username: { $regex: new RegExp(search, "i") } }
      ],
    })
      .sort(sortFormatted)
      .limit(pageSize);

    //Get total number of searched items
    const total = await MatchStat.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      matchstats,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUsersByMode = async (req, res) => {
  try {
      const pipeline = [
          {
              $group:{
                  _id: '$mode',
                  users: {$sum: 1},
              },
          },
      ];

      const result = await MatchStat.aggregate(pipeline);
      
      const userbymode = result.map((item) => {
          const { _id, users } = item; // Extract old field and other fields
          return { label: _id, value: users }; // Create new object with renamed field
        });

    // console.log(data);

    res.status(200).json({
      userbymode,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getMatchStats,
  getUsersByMode
}
