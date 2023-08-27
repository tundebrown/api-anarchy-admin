const UserInfo = require("../models/UserInfo.js");
let Country = require('country-state-city').Country;
const countryList = require('country-list');

function getCountryCode(countryName) {
    const countryCode = countryList.getCode(countryName);
  
    if (countryCode) {
      return countryCode;
    } else {
      console.error('Country not found');
    }
  }

function getLongitude(countryCode) {
    const countryInfo = Country.getCountryByCode(countryCode);
  
    if (countryInfo) {
      const latitude = countryInfo.latitude;
      const longitude = countryInfo.longitude;
      return longitude;
    } else {
      console.error('Country not found');
    }
  }

  function getLatitude(countryCode) {
    const countryInfo = Country.getCountryByCode(countryCode);
  
    if (countryInfo) {
      const latitude = countryInfo.latitude;
      const longitude = countryInfo.longitude;
      return latitude;
    } else {
      console.error('Country not found');
    }
  }

const getHighScores = async (req, res) => {
  try {
    const projection = { username: 1, totalkills: 1, _id:0 };
    const highScores = await UserInfo.find({}, projection)
      .sort({ totalkills: -1 })
      .limit(10)

      const data = highScores.map((item) => {
        const { username, totalkills } = item; // Extract old field and other fields
        return { label: username, value: totalkills }; // Create new object with renamed field
      });

      const pipeline = [
        {
            $group:{
                _id: '$country',
                users: {$sum: 1},
            },
        },
    ];

    const result = await UserInfo.aggregate(pipeline);
    
    const countrydata = result.map((item) => {
        const { _id, users } = item; // Extract old field and other fields
        return { country: _id, users: users, lat: `${getLatitude(getCountryCode(_id))}`, lng: `${getLongitude(getCountryCode(_id))}` }; // Create new object with renamed field
      });

    

    // console.log(data);

    res.status(200).json({
      data,
      countrydata
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUsersByCountry = async (req, res) => {
    try {
        const pipeline = [
            {
                $group:{
                    _id: '$country',
                    users: {$sum: 1},
                },
            },
        ];

        const result = await UserInfo.aggregate(pipeline);
        
        const countrydata = result.map((item) => {
            const { _id, users } = item; // Extract old field and other fields
            return { country: _id, users: users, lat: `${getLatitude(getCountryCode(_id))}`, lng: `${getLongitude(getCountryCode(_id))}` }; // Create new object with renamed field
          });
  
      // console.log(data);
  
      res.status(200).json({
        countrydata,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

module.exports = {
  getHighScores,
  getUsersByCountry
};
