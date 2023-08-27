const User = require("../models/User.js");
const {ObjectId} = require('mongodb');

const getFriends = async (req, res) => {
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
      $or: [{ username: { $regex: new RegExp(search, "i") } }],
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

const getFriendsInfo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: new ObjectId(id) });

    const username = user.username;
    console.log(`The username is: ${username}`);

    //Get Friends Field
    const friend = user.friends;

    console.log(friend)
    //Loop through friends field to get friends Id and status
    
    let friendsId = [];
    let status = [];

    for (var i = 0; i < friend.length; i++) {
      friendsId.push(friend[i].friendId);
    }

    for (var i = 0; i < friend.length; i++) {
      status.push(friend[i].status);
    }

    console.log(friendsId)
    console.log(status)

    //Funtion to get username of all friends

      const friendsUsernames = [];

      for (const id of friendsId) {

          const user = await User.findOne({ _id: id });
          if (user) {
            friendsUsernames.push(user.username);
          }

      }

      const dataOfFriends = [];

      for (let i = 0; i < friend.length; i++){
        const dataObject = {username: friendsUsernames[i], status: status[i]};
        dataOfFriends.push(dataObject);
      }


    //   const data = {
    //       friendsUsernames, status
    //     }
        console.log(dataOfFriends);

    res.status(200).json({
    //   friendsId,
      dataOfFriends,
      username,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getFriends,
  getFriendsInfo,
};
