////////////  KeyCode controls. ///////////////////

// We need the keys controls to move the snake up, down, left and right. We can use the onkeydown event which occurs when the player is pressing a key. We will use only the arrows of the keyboard, with the corresponding key code values 37, 38, 39 and 40. But attention! if the snake is going to the left it can’t go directly to the right because otherwise it will touch itself and the player will lose! The same for the rest of the directions. To do this, create a new javascript file (I called it app.js) and start it with a self-Invoking anonymous function with drawModule as argument:

(function (window, document, drawModule, undefined) {

 //Connect the button in the html with the _init_ function.
var btn = document.getElementById('btn');
btn.addEventListener("click", function(){ drawModule.init();});

	document.onkeydown = function(event) {

        keyCode = window.event.keyCode;
        keyCode = event.keyCode;

        switch(keyCode) {

        case 37:
          if (direction != 'right') {
            direction = 'left';
          }
          // console.log('left');
          break;

        case 39:
          if (direction != 'left') {
          direction = 'right';
          // console.log('right');
          }
          break;

        case 38:
          if (direction != 'down') {
          direction = 'up';
          // console.log('up');
          }
          break;

        case 40:
          if (direction != 'up') {
          direction = 'down';
          // console.log('down');
          }
          break;
          }
      }


})(window, document, drawModule);
