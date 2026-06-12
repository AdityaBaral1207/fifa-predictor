const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({

    team1: {
        type: String,
        required: true
    },

    team2: {
        type: String,
        required: true
    },

    matchDate: {
        type: Date,
        required: true
    },

    winner: {
        type: String,
        default: null
    },

    status: {
        type: String,
        default: "upcoming"
    }

});

module.exports = mongoose.model(
    "Match",
    matchSchema
);