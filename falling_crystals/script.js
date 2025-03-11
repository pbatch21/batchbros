const gameContainer = document.getElementById("game-container");
const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const fireworks = document.getElementById("fireworks");

const pauseBtn = document.getElementById("pause-btn");
const playBtn = document.getElementById("play-btn");
const restartBtn = document.getElementById("restart-btn");
const backBtn = document.getElementById("back-btn");

let targetX = 150; // Initial position of the red box
let targetSpeed = 30; // Increased movement speed
let score = 0;
let gameOver = false;
let fallSpeed = 5; // Starting fall speed
let spawnRate = 1000; // Starting spawn rate (1 second)
let timeLeft = 120; // 2 minutes
let gamePaused = false;
let timerInterval;

// Move target box with arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && targetX > 0) {
        targetX -= targetSpeed;
    } else if (event.key === "ArrowRight" && targetX < 300) {
        targetX += targetSpeed;
    }
    targetBox.style.left = targetX + "px";
});

// Function to create falling gems (Red = 1 pt, Blue = 10 pts)
function createFallingGem() {
    if (gameOver || gamePaused) return;

    const gem = document.createElement("img");
    gem.classList.add("falling-gem");
    gem.style.position = "absolute";
    gem.style.top = "0px";

    // 20% chance to spawn a blue gem (worth 10 points)
    if (Math.random() < 0.2) {
        gem.src = "../public/assets/blue-gem.png"; // Corrected path
        gem.classList.add("blue-gem");
        gem.dataset.value = 10;
    } else {
        gem.src = "../public/assets/crystal.png"; // Corrected path
        gem.dataset.value = 1;
    }

    gem.onload = () => console.log("Loaded:", gem.src);
    gem.onerror = () => console.error("Error loading:", gem.src);

    gem.style.left = Math.random() * 360 + "px"; // Random start position
    gameContainer.appendChild(gem);

    let gemInterval = setInterval(() => {
        if (gamePaused) return;
        let gemTop = parseInt(gem.style.top || "0");
        gem.style.top = (gemTop + fallSpeed) + "px";

        // Check if gem reaches the target box
        if (gemTop >= 450) {
            let gemX = parseInt(gem.style.left);
            if (gemX < targetX + 100 && gemX + 40 > targetX) {
                increaseScore(parseInt(gem.dataset.value));
                clearInterval(gemInterval);
                gameContainer.removeChild(gem);
                return;
            }
        }

        // Remove gem if it falls out of screen
        if (gemTop > 500) {
            clearInterval(gemInterval);
            gameContainer.removeChild(gem);
        }
    }, 30);

    setTimeout(createFallingGem, spawnRate);
}

// Function to increase score and difficulty
function increaseScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;

    // Increase difficulty over time
    if (score % 5 === 0) {
        fallSpeed += 1;
        spawnRate = Math.max(400, spawnRate - 100);
    }
}

// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (gameOver || gamePaused) return;

        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Pause and Resume functions
pauseBtn.addEventListener("click", () => (gamePaused = true));
playBtn.addEventListener("click", () => (gamePaused = false));

// Restart game
restartBtn.addEventListener("click", () => location.reload());

// End game with fireworks
function endGame() {
    gameOver = true;
    fireworks.style.display = "block";
    alert(`Time's up! Your final score is: ${score}`);
}

// Back to Main Screen button event listener
if (backBtn) {
    backBtn.addEventListener("click", () => {
        console.log("Back button clicked!");
        window.location.href = "../index.html"; // Adjust if necessary
    });
} else {
    console.error("Back button not found! Check ID.");
}

// Start game
createFallingGem();
startTimer();
