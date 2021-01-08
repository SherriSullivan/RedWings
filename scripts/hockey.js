// with help from the coding pie
// https://thecodingpie.com/post/learn-to-code-ping-hockey-game-using-javascript-and-html5/

document.querySelector('#beginHockey').addEventListener('click', beginHockey, false);
document.querySelector('#beginHockey').addEventListener('touchend', beginHockey, false);

/////*****  SET UP CANVAS  *****/////

// create rink canvas context
const canvasRink = document.querySelector('#canvasRink');
const rink = canvasRink.getContext('2d');

// create hockey canvas context
const canvasHockey = document.querySelector('#canvasHockey');
const hockey = canvasHockey.getContext('2d');

// win/lose banner
const messageHockey = document.querySelector('#messageHockey');

// declare variables
// canvas width and height
const rinkW = canvasHockey.width;
const rinkH = canvasHockey.height;

// draw the rink
drawRink();

/////*****  END SET UP CANVAS  *****/////



/////***** VARIABLE SETUP *****/////

// set static properties
const stickW = 10;
const stickH = rinkH / 6;

// initial stick and puck positions
// left side player is AI
const ai = {
  x: 35,
  y: (rinkH - stickH) / 2,
  w: stickW,
  h: stickH,
  color: '#003d7d',
  score: 0
};

// right side player is AI
const user = {
  x: rinkW - (stickW + 35),
  y: (rinkH - stickH) / 2,
  w: stickW,
  h: stickH,
  color: '#c8102e',
  score: 0
};

const puck = {
  x: rinkW / 2,
  y: rinkH / 2,
  rad: 7,
  speed: 12,
  color: '#383838',
  // randomize direction
  velX: Math.floor(Math.random() * 10) - 5,
  velY: Math.floor(Math.random() * 10) - 5
};

// sticks are not moving to start
let moveUp = false;
let moveDown = false;

// play is in start mode to start
let gameState = 'start';

// there is no winner to start
let winner;

/////*****  END VARIABLE SETUP  *****/////




/////***** GAME RESETs *****/////

// reset the puck to center and reverse direction
function resetPuck() {
  puck.x = rinkW / 2;
  puck.y = rinkH / 2;
  puck.speed = 12;
  puck.velX = Math.floor(Math.random() * 10) - 5;
  puck.velY = Math.floor(Math.random() * 10) - 5;
}

// reset after a win
function resetHockey () {
  resetPuck();
  ai.score = 0;
  user.score = 0;
  gameState = 'play';
}

/////***** END GAME RESETs *****/////




/////***** USER ACTIONS *****/////

// event listener for key press and release
window.addEventListener('keydown', keydownHandler);
window.addEventListener('keyup', keyupHandler);

// detect mouse click or movement
window.addEventListener('click', clickHandler, false);
window.addEventListener('mousemove', mousemoveHandler, false);

// detect touch or movement
window.addEventListener('touchstart', clickHandler, {passive: true});
window.addEventListener('touchmove', touchmoveHandler, {passive: false});

// define actions for up/down arrow key press
function keydownHandler (e) {
  e.preventDefault();
  // get the code for the pressed key
  if (e.key === 'Up' || e.key === 'ArrowUp') {
      moveUp = true;
  }
  else if (e.key === 'Down' || e.key === 'ArrowDown') {
      moveDown = true;
  }
  else if (e.key === 'Escape') {
      gameState = 'pause';
  }
}

// define actions for up/down arrow key release
function keyupHandler (e) {
   // get the code for the released key
   if (e.key === 'Up' || e.key === 'ArrowUp') {
    moveUp = false;
  }
  else if (e.key === 'Down' || e.key === 'ArrowDown') {
    moveDown = false;
  }
  else if (e.key === 'Enter' || e.key === 'Return') {
    clickHandler();
  }
}

// user clicks or touches start play
function clickHandler () {
  // if game is in play, do nothing
  if (gameState == 'play') return;
  // // if restarting after a win reset the canvas
  // if (gameState == 'win') setCanvas();
  // if game is paused return to play, otherwise (win or start) reset the game
  gameState == 'pause' ? gameState = 'play' : resetHockey();
}

// move the paddle with the mouse
function mousemoveHandler (e) {
  const mouseY = e.clientY - canvasHockey.offsetTop;
  if (mouseY >= 0 + user.h / 2 && mouseY <= rinkH - user.h / 2) {
    user.y = mouseY - user.h / 2;
  }
}

// move the paddle with touch
function touchmoveHandler (e) {
  e.preventDefault();
  const touchY = e.touches[0].clientY;
  if (touchY >= 0 + user.h / 2 && touchY <= rinkH - user.h / 2) {
    user.y = touchY - user.h / 2;
  }
}

/////***** END USER ACTIONS *****/////



/////*****  DRAWING FUNCTIONS  *****/////

function drawRink () {
  // zone face-off circles
  rink.strokeStyle = '#c8102e';
  rink.lineWidth = 2;
  rink.beginPath();
  rink.arc(rinkW / 5, rinkH / 4, 45, 0, Math.PI * 2);
  rink.stroke();
  rink.beginPath();
  rink.arc(rinkW / 5, rinkH / 4, 3, 0, Math.PI * 2);
  rink.fill();
  rink.beginPath();
  rink.arc(rinkW / 5, rinkH / 4 * 3, 45, 0, Math.PI * 2);
  rink.stroke();
  rink.beginPath();
  rink.arc(rinkW / 5, rinkH / 4 * 3, 3, 0, Math.PI * 2);
  rink.fill();
  rink.beginPath();
  rink.arc(rinkW / 5 * 4, rinkH / 4, 45, 0, Math.PI * 2);
  rink.stroke();
  rink.beginPath();
  rink.arc(rinkW / 5 * 4, rinkH / 4, 3, 0, Math.PI * 2);
  rink.fill();
  rink.beginPath();
  rink.arc(rinkW / 5 * 4, rinkH / 4 * 3, 45, 0, Math.PI * 2);
  rink.stroke();
  rink.beginPath();
  rink.arc(rinkW / 5 * 4, rinkH / 4 * 3, 3, 0, Math.PI * 2);
  rink.fill();
  // blue lines
  rink.fillStyle = '#0032a0';
  rink.fillRect(225 - 2, 0, 4, rinkH);
  rink.fillRect(rinkW - 225 + 2, 0, 4, rinkH);
  // center circle
  rink.strokeStyle = '#0032a0';
  rink.lineWidth = 3;
  rink.beginPath();
  rink.arc(rinkW / 2, rinkH / 2, 55, 0, Math.PI * 2);
  rink.stroke();
  // goal trapezoids
  rink.fillStyle = '#00c4cc';
  rink.beginPath();
  rink.moveTo(0, rinkH / 4);
  rink.lineTo(32, rinkH / 3);
  rink.lineTo(32, rinkH / 3 * 2);
  rink.lineTo(0, rinkH / 4 * 3);
  rink.fill();
  rink.beginPath();
  rink.moveTo(rinkW, rinkH / 4);
  rink.lineTo(rinkW - 32, rinkH / 3);
  rink.lineTo(rinkW - 32, rinkH / 3 * 2);
  rink.lineTo(rinkW, rinkH / 4 * 3);
  rink.fill();
  // goals
  rink.strokeStyle = '#000';
  rink.fillStyle = '#fff';
  rink.strokeRect(22, rinkH / 3, 10, rinkH / 3);
  rink.strokeRect(rinkW - 22, rinkH / 3, -10, rinkH / 3);
  rink.fillRect(22, rinkH / 3, 10, rinkH / 3);
  rink.fillRect(rinkW - 22, rinkH / 3, -10, rinkH / 3);
  // center line
  rink.fillStyle = '#C8102E';
  rink.fillRect(rinkW / 2 - 4, 0, 8, rinkH);
  // goal lines
  rink.fillRect(33 - 1, 0, 2, rinkH);
  rink.fillRect(rinkW - 33, 0, 2, rinkH);
}

function drawStartScreen () {
  hockey.fillStyle = '#fff';
  hockey.fillRect(rinkW / 2 - 200, rinkH / 3 - 40, 400, 100);
  hockey.fillStyle = '#000';
  hockey.strokeRect(rinkW / 2 - 200, rinkH / 3 - 40, 400, 100);
  hockey.font = '20px Montserrat';
  hockey.textAlign = 'center';
  hockey.fillText('Welcome to Hockey!', rinkW / 2, rinkH / 3);
  hockey.font = '14px Montserrat';
  hockey.fillText('Press Enter to Play', rinkW / 2, rinkH / 3 + 30);
}

function drawWinScreen() {
  hockey.fillStyle = '#fff';
  hockey.fillRect(rinkW / 2 - 200, rinkH / 3 - 40, 400, 100);
  hockey.fillStyle = '#000';
  hockey.strokeRect(rinkW / 2 - 200, rinkH / 3 - 40, 400, 100);
  hockey.font = '24px Montserrat';
  hockey.textAlign = 'center';
  hockey.fillText(winner, rinkW / 2, rinkH / 3);
  hockey.font = '14px';
  hockey.fillText('Press Enter to Play Again', rinkW / 2, rinkH / 3 + 30);
}

function drawScore (x, y, score) {
  hockey.fillStyle = '#000';
  hockey.font = '40px Montserrat';
  hockey.fillText(score, x, y);
}

function drawStick (x, y, w, h, color) {
  hockey.fillStyle = color;
  hockey.fillRect(x, y, w, h);
}

function drawPuck (x, y, rad, color) {
  hockey.fillStyle = color;
  hockey.beginPath();
  hockey.arc(x, y, rad, 0, Math.PI * 2, true);
  hockey.closePath();
  hockey.fill();
}

/////*****  END DRAWING FUNCTIONS *****/////



/////***** COLLISION DETECTION *****/////

function detectCollision (stick, puck) {
  // if puck is to the left or right, no collision
  if (puck.x > stick.x + stick.w || puck.x + puck.rad < stick.x) {
    return false;
  }
  // if the puck is above or below, no collision
  if (puck.y > stick.y + stick.h || puck.y + puck.rad < stick.y) {
    return false;
  }
  return true;
}

/////***** END COLLISION DETECTION *****/////



/////*****  MOVE ALL THE THINGS  *****/////

function update () {
  if (gameState == 'play') {

    // make sure puck is moving adequately
    if (puck.velX < 3 && puck.velX > -3) resetPuck();
    if (puck.velY < 1 && puck.velY > -1) resetPuck(); 

    // move the stick
    // if up arrow pressed and stick is not pegged to the top, move up
    if (moveUp && user.y > 0) {
      user.y -= 8;
    }
    // if down arrow pressed and stick is not pegged to the bottom, move down
    else if (moveDown && user.y < rinkH - user.h) {
      user.y += 8;
    }

    // if the puck hits floor or ceiling
    if (puck.y + puck.rad >= rinkH || puck.y - puck.rad <= 0) {
      // reverse pucks y trajectory
      puck.velY = -puck.velY;
    }

    // if puck hits enters right goal, AI scores
    if (puck.x + puck.rad >= rinkW - 28 && 
        puck.y - puck.rad >= rinkH / 3 &&
        puck.y + puck.rad <= rinkH / 3 * 2 &&
        puck.velX > 0) {
      // increase ai score
      ai.score++;
      // check for a win
      if (ai.score >= 7) {
        gameState = 'win';
        winner = 'Computer Wins!';
      }
      // reset the puck
      resetPuck();
    } 
    // if the puck hits the end boards, reverse
    else if (puck.x >= rinkW) {
      puck.velX = -puck.velX;
    }

    // if puck enters left goal, user scores
    if (puck.x + puck.rad <= 28 &&
        puck.y - puck.rad >= rinkH / 3 &&
        puck.y + puck.rad <= rinkH / 3 * 2 &&
        puck.velX < 0) {
      // increase user score
      user.score++;
      // check for a win
      if (user.score >= 7) {
        gameState = 'win';
        winner = 'YOU WIN!!!';
      }
      // reset the puck
      resetPuck();
    }
    // if the puck hits the end boards, reverse
    else if (puck.x <= 0) {
      puck.velX = -puck.velX;
    }

    // move the puck
    puck.x += puck.velX;
    puck.y += puck.velY;

    // move AI stick
    // move stick center toward puck at specified rate
    ai.y += ((puck.y - (ai.y + ai.h / 2)) * 0.10);

    // decide who's court the puck is on
    // ai on the left, user on the right
    let player = (puck.x < rinkW / 2) ? ai : user;

    // see if the puck hit the stick
    if (detectCollision(player, puck)) {
      // default return angle is 0
      let angle = 0;

      // if puck hit the top of the stick
      if (puck.y < (player.y + player.h / 2)) {
        // have the puck rebound up 45deg
        angle = -Math.PI / 4;
      }
      // if puck hit the bottom of the stick
      else if (puck.y > (player.y + player.h / 2)) {
        // have the puck rebound down 45deg
        angle = Math.PI / 4;
      }

      // change the velocity of the puck according to which stick is hit
      // vel represents speed in the x or y direction
      // if player is user take a negative value
      puck.velX = (player === ai ? 1 : -1) * puck.speed * Math.cos(angle);
      puck.velY = puck.speed * Math.sin(angle);

      // increase puck speed
      puck.speed += 0.2;
    }
  }
}

/////*****  END MOVE ALL THE THINGS  *****/////



/////*****  DRAW THE SCREEN  *****/////

function render()
{
  // clear the screen
  hockey.clearRect(0, 0, rinkW, rinkH);

  // draw the rink
  //drawRink();

  // if game is just starting
  if (gameState == 'start') {
    drawStartScreen();
  }

  // if the game has been won
  if (gameState == 'win') {
    drawWinScreen();
  }

  // draw scores, AI score on left, user on right
  drawScore(rinkW / 4, rinkH / 6, ai.score);
  drawScore(rinkW * 3 / 4, rinkH / 6, user.score);

  // draw the sticks
  drawStick(ai.x, ai.y, ai.w, ai.h, ai.color);
  drawStick(user.x, user.y, user.w, user.h, user.color);

  // draw the puck
  drawPuck(puck.x, puck.y, puck.rad, puck.color);
} 

/////*****  END DRAW THE SCREEN  *****/////



/////*****  GAMELOOP  *****/////

function gameLoop () {
  // update the pieces
  update();
  // draw the screen
  render();
  // continue
  requestAnimationFrame(gameLoop);
}

/////*****  END GAMELOOP  *****/////

function beginHockey() {
  // set the canvas
  setCanvas();
  
  // phone settings for game
  if (rinkW < rinkH) {
    canvasRink.width = screen.height;
    canvasRink.height = screen.width;
    canvasHockey.width = screen.height;
    canvasHockey.height = screen.width;
  }

  if (gameState === 'win') {
    resetHockey();
    return;
  }
  // play the game
  requestAnimationFrame(gameLoop);
}


  // hide the message screen, bring canvas into view
  function setCanvas () {
    canvasHockey.setAttribute('style', 'opacity: 1');
    messageHockey.setAttribute('style', 'display: none');
  }