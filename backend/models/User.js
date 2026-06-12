const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: "⚽"
    },

    points: {
        type: Number,
        default: 0
    },

    streak: {
        type: Number,
        default: 0
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "User",
    userSchema
);