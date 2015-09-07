const $      = require('jquery');
const Game   = require('./game');

$(document).ready(function() {
  var game = new Game();
  game.start();

  $(document).keydown(function(k) {
    var key = k.which;

    game.playerOne.changeDirection(key);
    game.playerTwo.changeDirection(key);

    if (game.end && key == "13") {
      document.getElementById("end").style.display = 'none';
      var canvas    = document.getElementById('game');
      var gameBoard = canvas.getContext("2d");
      var width     = $(canvas).width();
      var height    = $(canvas).height();

      gameBoard.clearRect(0, 0, width, height);
      game = new Game();
      game.start();
    }
  });
});
