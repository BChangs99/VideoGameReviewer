const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        //This ObjectId refers to a user's object ID in mongodb (not shown in the Users.js model, but it does exist in db)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)