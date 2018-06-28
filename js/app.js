let gameRunning = true;
const score = document.getElementById("score");
score.textContent = 0;

const endPanel = document.querySelector(".end-panel");
const finalScore = document.getElementById("final-score");
finalScore.textContent = 0;

// Enemy Class (Enemies the player must avoid)
class Enemy {
  // Initial properties
  constructor(x, y) {
    this.sprite = "images/enemy-bug.png";
    this.x = x;
    this.y = y;
    this.defaultX = x;
    this.speed = enemySpeed();
  }
  // Ensures the game runs at the same speed regardless of device
  update(dt) {
    this.x += this.speed * dt;
    // Resets enemy positions once they reach the edge of the canvas
    if (this.x > 500) {
      this.x = this.defaultX;
      this.speed = enemySpeed();
    }
    // Collision detection inspired by MDN 2D Collision Detection
    if (
      this.x < player.x + 45 &&
      this.x + 45 > player.x &&
      this.y < player.y + 45 &&
      45 + this.y > player.y
    ) {
      // Sets gameRunning to false
      gameRunning = false;
      // Reset player on collision
      player.reset();
      // Freezes enemy movement
      allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
      });
      // Logs the final score when you hit an enemy
      finalScore.textContent = score.textContent;
      // Displays the end score panel
      endPanel.classList.remove("hidden");
      // Adds click function
      endPanel.addEventListener("click", function restartGame() {
        allEnemies = [];
        releaseEnemies(allEnemies, numEnemies);
        setTimeout(function() {
          endPanel.classList.add("hidden");
          gameRunning = true;
        }, 500);
        endPanel.removeEventListener("click", restartGame);
      });
      // Reset score
      score.textContent = 0;
    }
  }
  // Draws the Enemy bugs via their current position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Calculate random enemy speed between 350 - 100
function enemySpeed() {
  return Math.random() * (350 - 100) + 100;
}

// Calculate random starting position for the x axis
function randomX() {
  return Math.random() * (-500 - -100) + -100;
}

// Player class (the player's character)
class Player {
  // Initial properties
  constructor(x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
    // Saves default position for reset functionality
    this.defaultX = x;
    this.defaultY = y;
  }
  // Update the player's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    if (this.y === -15) {
      this.reset();
      if (gameRunning) {
        score.textContent++;
      }
    }
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Interprets key input to control player
  handleInput(keyCode) {
    if (keyCode === "left" && this.x > -2) {
      this.x -= 101;
    } else if (keyCode === "up" && this.y > -15) {
      this.y -= 83;
    } else if (keyCode === "right" && this.x < 402) {
      this.x += 101;
    } else if (keyCode === "down" && this.y < 400) {
      this.y += 83;
    }
  }
  // Resets player to starting point
  reset() {
    this.x = this.defaultX;
    this.y = this.defaultY;
  }
}

// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Number of Enemies
const numEnemies = 8;

// Instantiate enemy objects
function releaseEnemies(arr, n) {
  for (i = 0; i < n; i++) {
    // Splits enemies into separate rows
    if (i < 3) {
      arr.push(new Enemy(randomX(), 60));
    } else if (i < 6 && i >= 3) {
      arr.push(new Enemy(randomX(), 143));
    } else if (i >= 6) {
      arr.push(new Enemy(randomX(), 226));
    }
  }
}
// Calls the function to instantiate enemy objects
// Passes the allEnemies array and numEnemies
releaseEnemies(allEnemies, numEnemies);

// Instantiate player object
const character = new Player(202, 400);
// Place the player object in a variable called player
const player = character;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  if (gameRunning) {
    const allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
  }
});
