let character = document.getElementById("character");
let gameStart = false
// let obstacleShort = document.getElementById("obstacle-short");

//onclick then jump 
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }

    
});

document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        if(gameStart === false){
            gameStart = true
            scheduleNextObstacle();
        }
    }
    
    
});

function jump() {
    if (character.classList != "jump-animation") {
        character.classList.add("jump-animation");
    }
    setTimeout(function () {
        character.classList.remove("jump-animation");
    }, 650);
}

function checkDead() {
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let obstacle = document.querySelectorAll(".obstacle-short"); // Get all obstacles

    obstacle.forEach(function(obstacle) {
        let obstacleRect = obstacle.getBoundingClientRect();
        let obstacleLeft = obstacleRect.left;

        
        if (obstacleLeft < 150 && obstacleLeft > 125 && characterBottom <= 40) {
            console.log("Game over!");
                gameStart = false
                document.getElementById("gameOver").classList.remove("hide");
        }
        if(gameStart === false){
            obstacle.classList.remove("obstacle-animation");
        }
    });
}

let intervalID = setInterval(checkDead, 10);


// Function to create a new obstacle
function createObstacle() {
    console.log("createObstacle");
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle-short", "obstacle-animation");
    obstacle.style.width = "50px";
    obstacle.style.height = "50px";
    obstacle.style.position = "absolute";
    obstacle.style.bottom = "0px";
    obstacle.style.right = "0px";
    obstacle.style.backgroundImage = "url('./obstacle.png')"; // Replace with your image URL
    obstacle.style.backgroundSize = "cover";
    obstacle.style.backgroundPosition = "center";
    obstacle.style.backgroundRepeat = "no-repeat";

    document.getElementById("game").appendChild(obstacle);

    scheduleNextObstacle();

    setTimeout(function() {
        console.log("animationend");
        document.getElementById("game").removeChild(obstacle)
        
    }, 3000);
    // Listen for the end of the animation
    
}

// Function to schedule the next obstacle
function scheduleNextObstacle() {
    if(gameStart === true){
        let randomTime = Math.random() * (2000) + 500; // Random time between 2 and 5 seconds
    console.log(randomTime)
    setTimeout(createObstacle, randomTime);
        }
        else{
            return
        }
    
}

setInterval(function() {
    console.log(gameStart);
}, 1000);

