const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendshipSchema = new Schema({

  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  // an array of objects representing the status(accepted,pending,rejected ) of each user in the friendship :
  userStatus: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
      requestDate: { type: Date, default: Date.now },
      acceptDate: { type: Date },
      lastInteractionDate: { type: Date },
      gift: { type: String },//lateron we make separate model for gift 
      comments: [{
        createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }], // lateron we will make separate model for comment 
    }
  ],

});

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;



//In this `Friendship` model, the `users` field is an array of `ObjectId` references to the `user` model. 
//It will store pairs of user IDs representing the two users who are friends with each other.