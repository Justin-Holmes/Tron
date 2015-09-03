//Change 'trail' attribute to take in coordinate objects rather than an array

const $      = require('jquery');
const Game   = require('./game');

$(document).ready(function() {
  var game = new Game();
  game.createBoard();
  game.start();
});
