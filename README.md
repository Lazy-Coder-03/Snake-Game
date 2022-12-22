# **Snake Game**

This is a simple snake game implemented in JavaScript using the p5.js library. The game consists of a snake that moves around the screen, consuming food to grow in size. The goal is to make the snake as large as possible without colliding with its own body.

## Gameplay

The player controls the movement of the snake using the arrow keys on their keyboard. The snake will move in the direction indicated by the arrow keys, with its movement being restricted to only moving horizontally or vertically (not diagonally).

As the snake moves around the screen, it will encounter food scattered throughout the playing field. When the snake consumes the food, it will grow in size and the player's score will increase.

Every 5th piece of food that the snake eats will trigger the appearance of a bonus food item. This bonus food has a small chance of either increasing the player's score by 100 points and decreasing the size of the snake by 10 segments, or increasing the player's score by 10 points and decreasing the size of the snake by 2 segments. The probability of the bonus food reducing the snake's length by 10 segments and increasing the score by 100 points is calculated using the formula 0.01+j, where j is equal to the current length of the snake divided by 100. This means that the probability of this occurring increases as the snake grows longer.

The game ends when the snake collides with one of its own body segments. At this point, the player will be presented with the option to restart the game.

## Code Overview

The game is implemented using the p5.js library, which provides functions for creating a canvas, drawing shapes, and handling user input.

The main game loop is implemented in the draw() function, which is called repeatedly by the p5.js library. This function is responsible for updating the state of the game, rendering the visual elements of the game on the canvas, and checking for game over conditions.

The Snake class is responsible for representing the snake in the game and handling its movement and growth. The Food class represents the normal food that the snake can consume, while the BonusFood class represents the bonus food that appears every 5th piece of normal food consumed.

The player's input is captured using the keyPressed() function, which is called whenever a key is pressed on the keyboard. This function is responsible for updating the direction of the snake's movement based on the arrow keys that are pressed.

Finally, the setup() function is called once at the beginning of the game and is responsible for setting up the canvas and initializing the game elements.

### P5.js Sketch link
https://editor.p5js.org/ghosh2003sayantan/sketches/WFY-bhUdV
