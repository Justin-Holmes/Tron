const $      = require('jquery');
const Game   = require('./game');

$(document).ready(function() {
  var game = new Game();
  game.start();

  $(document).keydown(function(k) {
    var key = k.which;

    game.playerOne.changeDirection(key);
    game.playerTwo.changeDirection(key);
  });
});
