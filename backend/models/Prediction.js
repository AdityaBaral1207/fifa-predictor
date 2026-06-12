const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        required: true
    },

    predictedWinner: {
        type: String,
        required: true
    },

    pointsEarned: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model(
    "Prediction",
    predictionSchema
);