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

Game.prototype.start = function () {
  this.createPlayers();
  window.gameLoopInterval = setInterval(this.movePlayers.bind(this), 30);
};

Game.prototype.createPlayers = function() {
  this.playerOne = new Player("red", 10, 30, "right", this.oneKeys);
  this.playerTwo = new Player("blue", 110, 30, "left", this.twoKeys);
};

Game.prototype.movePlayers = function() {
  this.playerOne.move(this);
  this.playerTwo.move(this);
};

Game.prototype.detectCollision = function(position) {
  this.detectBorderCollision(position);
  this.detectPlayerCollision(position, this.playerOne);
  this.detectPlayerCollision(position, this.playerTwo);
};

Game.prototype.detectBorderCollision = function(position) {
  if (position.x == -1 || position.x == 1200 / 10 || position.y == -1 || position.y == 600 / 10) {
    this.end();
  }
}

Game.prototype.detectPlayerCollision = function(position, player) {
  for (var i = 0; i < player.trail.length; i++) {
    if (position.x === player.trail[i].x && position.y === player.trail[i].y) {
      this.end();
    }
  }
}

Game.prototype.end = function() {
  clearInterval(window.gameLoopInterval);
  document.getElementById("end").style.display = 'inline';

  $(document).keydown(function(k){
    if (k.which == "13") document.location.reload(true);
  });
};

module.exports = Game;
