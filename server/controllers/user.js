const User = require("../models/User.js");

const getUsers = async (req, res) => {
  try {
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
    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(search, "i") } }
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    //Get total number of searched items
    const total = await User.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      users,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getUsers
}
