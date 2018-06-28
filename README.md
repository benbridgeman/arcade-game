frontend-nanodegree-arcade-game
===============================

### Running the game
Upon opening the page the game will start:
* gameRunning variable is set to true.
* the 'keyup' event listener will then become active (disabled on 'death').
* the releaseEnemies function will create a default of 8 enemy objects with random speed and location along the x axis calling the enemySpeed() and randomX() functions respectively, populating the allEnemies array.
* the player object is created.
* use the up, down, left & right arrow keys to control the player. Try to navigate between enemies to reach the pond.
* upon reaching the pond the score indicator at the top will increase by one point, and will reset the player to the starting location.
* if an enemy is hit the game will end (player loacation is reset, enemies freeze in place, gameRunning is set to false, disabling the 'keyup' event/control functionality) displaying a pop-up score screen displaying the number of times you reached the pond without colliding with an enemy, a click event listener is enabled to reset the game (disabled on restart until next 'death'). After clicking to restart the allEnemies array is emptied to be repopulated with new objects and the game will start again.
    
### References
I used a very helpful guide on MDN regarding 2D collision detection: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

