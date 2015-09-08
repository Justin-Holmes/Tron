const $    = require('jquery');
const Game = require('./game');

var game = new Game();

function keyInput() {
  $(document).keydown(function(k) {
    startGame(k.which);
    playersChangeDirection(k.which);
    resetGame(k.which);
  });
}

function startGame(key) {
  if (key === 13 && !game.playerOne) {
    game.start();
    document.getElementById("instructions").style.display = 'none';
  }
}

function playersChangeDirection(key) {
  game.playerOne.changeDirection(key);
  game.playerTwo.changeDirection(key);
}

function resetGame(key) {
  if (game.end && key === 13) {
    document.getElementById("end").style.display = 'none';

    game = new Game();
    game.createBoard();
    game.start();
  }
}

function flashStartGame() {
  $('#start-game').animate({opacity: 0.2}, 1200);
  $('#start-game').animate({opacity: 0.9}, 1200, flashStartGame);
}

$(document).ready(function() {
  game.createBoard();
  flashStartGame();
  keyInput();
});
