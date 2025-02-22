const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerX = 175; // Initial player position
let playerSpeed = 20;
let score = 0;
let gameOver = false;

// Move player with arrow keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    } else if (event.key === "ArrowRight" && playerX < 350) {
        playerX += playerSpeed;
    }
    player.style.left = playerX + "px";
});

// Function to create falling crystal gems
function createFallingGem() {
    if (gameOver) return;

    const gem = document.createElement("img");
    gem.src = "assets/crystal.webp"; // Make sure the path is correct
    gem.classList.add("falling-gem");
    gem.style.left = Math.random() * 370 + "px"; // Random start position
    gameContainer.appendChild(gem);

    let fallSpeed = 5;
    let gemInterval = setInterval(() => {
        let gemTop = parseInt(gem.style.top || "0");
        gem.style.top = gemTop + fallSpeed + "px";

        // Collision detection
        if (gemTop >= 450 && gemTop <= 500) {
            let gemX = parseInt(gem.style.left);
            if (gemX < playerX + 50 && gemX + 30 > playerX) {
                endGame();
            }
        }

        // Remove gem if it falls out of screen
        if (gemTop > 500) {
            clearInterval(gemInterval);
            gameContainer.removeChild(gem);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 30);

    setTimeout(createFallingGem, Math.random() * 1000 + 500); // New gem every 0.5-1.5 sec
}

// End game function
function endGame() {
    gameOver = true;
    alert(`Game Over! Your score: ${score}`);
    location.reload(); // Restart game
}

// Start the game
createFallingGem();
