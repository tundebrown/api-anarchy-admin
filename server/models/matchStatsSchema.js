const mongoose = require("mongoose");

const matchStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String }, // Store username directly
  roomId: { type: Number },
  mode: { type: String },
  timestamp: { type: Date },
  kills: { type: Number },
  deaths: { type: Number },
  // Other fields
});

// const Gameplays = mongoose.model('MatchStats', matchStatsSchema);

module.exports = mongoose.model("MatchStats", matchStatsSchema);
