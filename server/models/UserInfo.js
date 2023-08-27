const mongoose = require('mongoose');
const { stringify } = require('querystring');
const internal = require('stream');

const userInfoSchema = new mongoose.Schema({


    username: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

    totalDeaths: {
        type: Number
    },

    totalkills: {
        type: Number
    },

    country: {
        type: String
    },

    state: {
        type: String
    },

    friends: {
        type: String
    },

    totalplaytimeHrs: {
        type: String
    },

    tokens: {
        type: String
    },

    status: {
        type: String
    },

    ip: {
        type: String
    },

    devicetype: {
        type: Array
    },

    osversion: {
        type: String
    },

    clans: {
        type: Array
    }

});

module.exports = mongoose.model('UserInfo', userInfoSchema);