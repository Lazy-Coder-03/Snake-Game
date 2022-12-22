let snake;
let food;
let bonusFood;
let scl = 30;
let score = 0;
let gameOver = false;
let foodCount = 0; // count how many normal foods have been eaten

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  food = new Food();
  frameRate(10);
}

function draw() {
  background(51);
  snake.update();
  snake.show();
  if (snake.eat(food, "normal")) {
    foodCount++;
    if (foodCount % 5 === 0) {
      // every 10th food is a bonus food
      bonusFood = new BonusFood();
      food = new Food();
    } else {
      food = new Food();
    }
  }
  food.show();
  if (bonusFood) {
    bonusFood.show();
    bonusFood.update();
    // if (bonusfood && snake.eat(bonusFood, "bonus") ) {
    //   bonusFood = null;
    // }
  }
  textSize(32);
  fill(255);
  text(`Score: ${score}`, 10, 30);
  //text(`Size: ${snake.tail.length+1}`, 10, 60);
  if (gameOver) {
    textSize(64);
    fill(255, 0, 0);
    text("Game Over", width / 2 - 100, height / 2);
    if (confirm("Game over. Do you want to restart?")) {
      snake = new Snake();
      food = new Food();
      bonusFood = null;
      gameOver = false;
      score = 0;
      foodCount = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.yv !== 1) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.yv !== -1) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xv !== 1) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xv !== -1) {
    snake.dir(1, 0);
  }
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xv = 1;
    this.yv = 0;
    this.pv = createVector(1, 0);
    this.tot = 0;
    this.tail = [];
  }

  eat(f, type) {
    let r = random(1);
    let d = dist(this.x, this.y, f.x, f.y);
    let j = this.tot / 100;
    //console.log(j)
    if (d < 1) {
      if (type === "normal") {
        this.tot++;
        this.tail.push(
          createVector(floor(this.x / scl) * scl, floor(this.y / scl) * scl)
        );
        score++;
      } else if (type === "bonus") {
        if (r < 0.01 + j) {
          //console.log(r,0.01+j);

          this.tot = Math.max(0, this.tot - 10);// decrease size by 10, but don't allow size to become negative
          score += 100;
        } else {
          //console.log(r,0.01+j);
          this.tot = Math.max(0, this.tot - 2); // decrease size by 2, but don't allow size to become negative
          score += 10;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  dir(x, y) {
    if (this.pv.x === 0 && x !== 0) {
      this.xv = x;
      this.yv = 0;
    } else if (this.pv.y === 0 && y !== 0) {
      this.xv = 0;
      this.yv = y;
    }
    this.pv = createVector(x, y);
  }

  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.tot - 1] = createVector(this.x, this.y);
    if (this.tail.length > this.tot) {
      this.tail.splice(0, this.tail.length - this.tot);
    }
    this.x = (this.x + this.xv * scl) % width;
    if (this.x < 0) this.x = width - scl;
    this.y = (this.y + this.yv * scl) % height;
    if (this.y < 0) this.y = height - scl;
    if (this.xv !== 0 && this.yv !== 0) {
      this.xv = 0;
      this.yv = 0;
    }
    for (let i = 0; i < this.tail.length; i++) {
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        gameOver = true;
      }
    }
  }
  show() {
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}

class Food {
  constructor() {
    this.x = floor(random(width / scl)) * scl;
    this.y = floor(random(height / scl)) * scl;
    for (let i = 0; i < snake.tail.length; i++) {
      if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
        this.x = floor(random(width / scl)) * scl;
        this.y = floor(random(height / scl)) * scl;
      }
    }
  }

  update() {
    this.x = floor(random(width / scl)) * scl;
    this.y = floor(random(height / scl)) * scl;
    for (let i = 0; i < snake.tail.length; i++) {
      if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
        this.x = floor(random(width / scl)) * scl;
        this.y = floor(random(height / scl)) * scl;
      }
    }
  }

  show() {
    fill(255, 50, 100);
    rect(this.x, this.y, scl, scl);
  }
}

class BonusFood {
  constructor() {
    this.x = floor(random(width / scl)) * scl;
    this.y = floor(random(height / scl)) * scl;
    for (let i = 0; i < snake.tail.length; i++) {
      if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
        this.x = floor(random(width / scl)) * scl;
        this.y = floor(random(height / scl)) * scl;
      }
    }
    this.expirationTime = millis() + 3000; // bonus food lasts for 7 seconds
  }

  update() {
    if (millis() > this.expirationTime || snake.eat(bonusFood, "bonus")) {
      //food = new Food(); // create a new food object
      bonusFood = null; // delete the BonusFood object
    }
  }

  show() {
    fill(100, 255, 100); // green color
    rect(this.x, this.y, scl, scl);
  }
}
