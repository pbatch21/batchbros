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

// Function to create falling objects
function createFallingObject() {
    if (gameOver) return;

    const obj = document.createElement("div");
    obj.classList.add("falling-object");
    obj.style.left = Math.random() * 370 + "px"; // Random start position
    gameContainer.appendChild(obj);

    let fallSpeed = 5;
    let objInterval = setInterval(() => {
        let objTop = parseInt(obj.style.top || "0");
        obj.style.top = objTop + fallSpeed + "px";

        // Collision detection
        if (objTop >= 450 && objTop <= 500) {
            let objX = parseInt(obj.style.left);
            if (objX < playerX + 50 && objX + 30 > playerX) {
                endGame();
            }
        }

        // Remove object if it falls out of screen
        if (objTop > 500) {
            clearInterval(objInterval);
            gameContainer.removeChild(obj);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 30);

    setTimeout(createFallingObject, Math.random() * 1000 + 500); // New object every 0.5-1.5 sec
}

// End game function
function endGame() {
    gameOver = true;
    alert(`Game Over! Your score: ${score}`);
    location.reload(); // Restart game
}

// Start the game
createFallingObject();
