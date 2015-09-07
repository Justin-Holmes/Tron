const Player = require('./player');
const $      = require('jquery');

function createBoard() {
  var canvas    = document.getElementById('game');
  var gameBoard = canvas.getContext("2d");
  var width     = $(canvas).width();
  var height    = $(canvas).height();

  gameBoard.fillStyle = "black";
  gameBoard.fillRect(0, 0, width, height);

  return gameBoard;
}

function Game() {
  this.board = createBoard();
  this.oneKeys = {
    left:  "65",
    up:    "87",
    right: "68",
    down:  "83"
  };
  this.twoKeys = {
    left:  "37",
    up:    "38",
    right: "39",
    down:  "40"
  };
}

Game.prototype.createPlayers = function() {
  this.playerOne = new Player("red", { x: 10, y: 30 }, "right", this.oneKeys);
  this.playerTwo = new Player("blue", { x: 110, y: 30 }, "left", this.twoKeys);
};

Game.prototype.start = function () {
  this.createPlayers();
  window.gameLoopInterval = setInterval(this.movePlayers.bind(this), 30);
};

Game.prototype.movePlayers = function() {
  this.playerOne.move(this);
  this.playerTwo.move(this);
};

Game.prototype.detectCollision = function(position) {
  var border = this.borderCollision(position);
  var playerOneCollision = this.playerCollision(position, this.playerOne);
  var playerTwoCollision = this.playerCollision(position, this.playerTwo);

  if (border || playerOneCollision || playerTwoCollision) return this.end();
};

Game.prototype.borderCollision = function(position) {
  return position.x == -1 || position.x == 1200 / 10 || position.y == -1 || position.y == 600 / 10
}

Game.prototype.playerCollision = function(position, player) {
  for (var i = 0; i < player.trail.length; i++) {
    if (position.x === player.trail[i].x && position.y === player.trail[i].y) {
      return true;
    }
  }
}

Game.prototype.end = function() {

  clearInterval(window.gameLoopInterval);
  document.getElementById("end").style.display = 'inline';

  var game = this;
  $(document).keydown(function(k){
    if (k.which == "13") {
      // $('canvas').remove();
      // $('body').prepend("<canvas id='game' width='1200' height='600'></canvas>");
      // document.getElementById("end").style.display = 'none';
      // game.board = createBoard();
      // game.start();
      document.location.reload(true);
    }
  });
  return true;
};

module.exports = Game;
