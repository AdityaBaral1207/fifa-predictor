const API_URL = "https://fifa-predictor-ssp1.onrender.com";

const matches = [

    {
        id:1,

        team1:"Argentina",

        team2:"Brazil",

        result:null
    }

];

const matchDate = new Date("June 15, 2026 20:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = matchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    document.getElementById("days").innerText = days;

    document.getElementById("hours").innerText = hours;

    document.getElementById("minutes").innerText = minutes;

},1000);

const argBtn = document.getElementById("arg-btn");

const braBtn = document.getElementById("bra-btn");

const predictionResult =
document.getElementById("prediction-result");

argBtn.addEventListener("click", async () => {

    const response = await fetch(
        `${API_URL}/prediction`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                userId:
                "6a2c245efaffee4f02a96717",

                matchId:
                "6a2c2a5822414dbff97b7ac9",

                predictedWinner:
                "Argentina"

            })
        }
    );

    const data =
    await response.json();

    predictionResult.innerText =
    data.message;

});

braBtn.addEventListener("click", async () => {

    const response = await fetch(
    `${API_URL}/prediction`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                userId:
                "6a2c245efaffee4f02a96717",

                matchId:
                "6a2c2a5822414dbff97b7ac9",

                predictedWinner:
                "Brazil"

            })
        }
    );

    const data =
    await response.json();

    predictionResult.innerText =
    data.message;

});

const savedPrediction =
localStorage.getItem("prediction");

if(savedPrediction){

    predictionResult.innerText =
    "✅ Your saved prediction: "
    + savedPrediction;
}



let points =
localStorage.getItem("points");

if(points === null){

    points = 0;

    localStorage.setItem(
        "points",
        points
    );
}

document.getElementById("points")
.innerText = points;



function rewardPoints(){

    let currentPoints =
    parseInt(
        localStorage.getItem("points")
    );

    currentPoints += 2;

    localStorage.setItem(
        "points",
        currentPoints
    );

    document.getElementById("points")
    .innerText = currentPoints;
}


let streak =
localStorage.getItem("streak");

if(streak === null){

    streak = 0;

    localStorage.setItem(
        "streak",
        streak
    );
}

document.getElementById("streak")
.innerText = streak;

function rewardStreak(){

    let currentStreak =
    parseInt(
        localStorage.getItem("streak")
    );

    currentStreak++;

    localStorage.setItem(
        "streak",
        currentStreak
    );

    document.getElementById("streak")
    .innerText = currentStreak;
}


function checkStreakBonus(){

    let currentStreak =
    parseInt(localStorage.getItem("streak"));

    let currentPoints =
    parseInt(localStorage.getItem("points"));

    const notification =
    document.getElementById("notification");

    if(currentStreak === 3){

        currentPoints += 2;

        localStorage.setItem(
            "points",
            currentPoints
        );

        notification.innerText =
        "🔥 3 Match Streak! Bonus +2 Points";

    }

    if(currentStreak === 6){

        currentPoints += 3;

        localStorage.setItem(
            "points",
            currentPoints
        );

        notification.innerText =
        "🏆 6 Match Streak! Bonus +3 Points";

    }

    document.getElementById("points")
    .innerText = currentPoints;
}



async function loadLeaderboard() {

    const response =
    await fetch(`${API_URL}/leaderboard`);

    const users =
    await response.json();

    const leaderboard =
    document.getElementById(
        "leaderboard"
    );

    leaderboard.innerHTML = "";

    users.slice(0,3).forEach(user => {

        leaderboard.innerHTML += `
            <div class="podium-player">
                <div class="avatar">
                    ${user.avatar}
                </div>

                <div class="points">
                    ${user.points}
                </div>

                <p>
                    ${user.username}
                </p>
            </div>
        `;

    });

}

loadLeaderboard();


const signupBtn =
document.getElementById("signup-btn");

signupBtn.addEventListener(
    "click",
    async () => {

        const username =
        document.getElementById(
            "username-input"
        ).value;

        const response =
        await fetch(
            `${API_URL}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify({

                    username,

                    avatar: "🔥"

                })
            }
        );

        const data =
        await response.json();

        alert(data.message);

    }
);