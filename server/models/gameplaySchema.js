const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: {type:String}, // Store username directly
    mode: {type:String},
    timestamp:{type:Date},
    kills: {type:Number},
    deaths: {type:Number},
    // Other fields
});

const Gameplays = mongoose.model('Gameplay', gameplaySchema);

module.exports = Gameplays;