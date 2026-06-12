require("dotenv").config();

const User = require("./models/User");

const Prediction = require("./models/Prediction");
const Match = require("./models/Match");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(cors());


app.use(express.json());

mongoose.connect(
   process.env.MONGO_URI
)
.then(() => {

    console.log("MongoDB Connected");

})
.catch((err) => {

    console.log(err);

});



app.get("/", (req,res) => {

    res.send(
        "🔥 FIFA Predictor Backend Running 🔥"
    );

});

app.get("/create-user", async (req, res) => {

    try {

        const user = new User({
            username: "Aditya",
            avatar: "🔥"
        });

        await user.save();

        res.send("User Saved!");

    } catch (error) {

        console.log(error);

        res.send("Error");

    }

});

app.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    }

    catch(error){

        console.log(error);

        res.send("Error");

    }

});

app.get("/leaderboard", async (req, res) => {

    try {

        const leaderboard = await User.find()
            .sort({ points: -1 });

        res.json(leaderboard);

    } catch (error) {

        console.log(error);

        res.send("Error");

    }

});

app.post("/register", async (req, res) => {

    try {

        const { username, avatar } = req.body;

        const newUser = new User({
            username,
            avatar
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User Registered"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});

app.get("/create-match", async (req, res) => {

    try {

        const match = new Match({

            team1: "Argentina",

            team2: "Brazil",

            matchDate: new Date()

        });

        await match.save();

        res.send("Match Created");

    }

    catch(error){

        console.log(error);

        res.send("Error");

    }

});

app.get("/matches", async (req, res) => {

    try {

        const matches = await Match.find();

        res.json(matches);

    }

    catch(error){

        console.log(error);

        res.send("Error");

    }

});

app.get("/all-data", async (req, res) => {

    const users = await User.find();

    const matches = await Match.find();

    res.json({
        users,
        matches
    });

});

app.post("/prediction", async (req, res) => {

    try {

        const {

            userId,

            matchId,

            predictedWinner

        } = req.body;

        const existingPrediction =
await Prediction.findOne({
    userId,
    matchId
});

if(existingPrediction){

    return res.json({
        success:false,
        message:"Prediction already exists"
    });

}
            const prediction = new Prediction({

            userId,

            matchId,

            predictedWinner

        });

        await prediction.save();

        res.json({

            success: true,

            message: "Prediction Saved"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false

        });

    }

});

app.get("/predictions", async (req, res) => {

    try {

        const predictions =
        await Prediction.find();

        res.json(predictions);

    }

    catch(error){

        console.log(error);

        res.send("Error");

    }

});

app.post("/set-result", async (req, res) => {

    try {

        const { matchId, winner } = req.body;

        const match = await Match.findById(matchId);

        if (!match) {

            return res.json({
                success: false,
                message: "Match not found"
            });

        }

        match.winner = winner;

        await match.save();

        const predictions =
        await Prediction.find({
            matchId
        });

        for (const prediction of predictions) {

            if (
                prediction.predictedWinner === winner
            ) {

                const user =
                await User.findById(
                    prediction.userId
                );

                if (user) {

                    user.points += 3;

                    await user.save();

                }

            }

        }

        res.json({

            success: true,

            message:
            "Result Updated & Points Awarded"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false

        });

    }

});

app.listen(5000, () => {

    console.log(
        "Server Running On Port 5000"
    );

});