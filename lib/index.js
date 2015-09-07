const $    = require('jquery');
const Game = require('./game');

var game = new Game();

function keyInput() {
  $(document).keydown(function(k) {
    game.playerOne.changeDirection(k.which);
    game.playerTwo.changeDirection(k.which);
  });
}

function resetGame() {
  $(document).keydown(function(k) {
    if (game.end && k.which == "13") {
      document.getElementById("end").style.display = 'none';
      game.clearBoard;

      game = new Game();
      game.start();
    }
  });
}

$(document).ready(function() {
  game.start();
  keyInput();
  resetGame(game);
});
