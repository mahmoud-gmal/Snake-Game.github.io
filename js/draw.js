
// Module pattern
var drawModule = (function () {

///// Canvas elements ////

  var bodySnake = function(x, y) {
    debugger;
    // This is the single square
        ctx.fillStyle = 'brown';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

    // This is the border of the square
        ctx.strokeStyle = 'white';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var pizza = function(x, y) {

    // This is the single square of pizza which is snakes is going to eat.
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);

        // This is the border of the pizza
        //ctx.fillStyle = 'red';
        ctx.strokeStyle = 'red';
        //ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var scoreText = function() {
    // How many pizzas did the snake eat
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h-5);
  }


/////// The snake and food structures ///////

  var drawSnake = function() {

    // Initially the body of the snake will be formed by 4 squares.
      var length = 4;
      snake = []; // {x:3, y:1}, {x:3, y:0}, {x:2, y:0}, {x:1, y:0}

    // Using a for loop we push the 5 elements inside the array(squares).
  // Every element will have x = 0 and the y will take the value of the index.
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }
  }

// Now let’s create an important function: The function in which everything happens! Here we can do several things, but let’s do it step by step:

  var paint = function(){
  // Let's draw the space in which the snake will move.
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);

  // Give it a border.
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

//Disable the button _start_ while you're playing.
      btn.setAttribute('disabled', true);

      var snakeX = snake[0].x; // snakeX = 3
      var snakeY = snake[0].y; // snakeY = 1


// Make the snake move.
// Use a variable ('direction') to control the movement.
// To move the snake, pop out the last element of the array and shift it on the top as first element.

      if (direction == 'right') {
        snakeX++; }
      else if (direction == 'left') {
        snakeX--; }
      else if (direction == 'up') {
        snakeY--;
      } else if(direction == 'down') {
        snakeY++; }

// If the snake touches the canvas path or itself, it will die!
// Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
// If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again.

// x=-1, x= 350/10=35, y=-1, y=350/10=35
      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {

         // Stop the game.

        // Make the start button enabled again.
          btn.removeAttribute('disabled', true);

       // Clean up the canvas.
          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;
        }

    // If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
        if(snakeX == food.x && snakeY == food.y) {

          //Create a new square instead of moving the tail.
          var tail = {x: snakeX, y: snakeY};
          score ++;

          createFood(); //Create new food
        } else {

          //pops out the last cell
          var tail = snake.pop();
          tail.x = snakeX;
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail);

        //For each element of the array create a square using the bodySnake function we created before.
        for(var i = 0; i < snake.length; i++) {

          bodySnake(snake[i].x, snake[i].y);
        }

       //Create food using the _pizza_ function.
        pizza(food.x, food.y);

        //Put the score text.
        scoreText();
  }

// The important thing is that the food can never be in the same place where there is already the snake’s body, therefor we will create an if statement that create a new pizza if the food has the same x and y of the snake position

  var createFood = function() {
      food = {
    // Generate random numbers.
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

    // Look at the position of the snake's body.
      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

// Creating a checkCollision function to detect if the snake has crashed on its body itself:
  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      }
      return false;
  }

// Initialize function

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }

//You need to return only the _init_ function at the end of the Module.
    return {
      init : init
    };

//Close the Module.
}());
