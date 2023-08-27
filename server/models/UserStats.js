const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

    totalTimeSpent: {
        type: String,
    },

    totalDeath: {
        type: Number,
    },

    totalKills: {
        type: Number
    },

    totalTokens: {
        type: Number
    },

    lastMatchToken: {
        type: String
    },

});

module.exports = mongoose.model('UserStats', userStatsSchema);