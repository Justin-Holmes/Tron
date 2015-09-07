const Player = require('./player');
const $      = require('jquery');

function Game() {
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
  this.end = false;
}

Game.prototype.createBoard = function() {
  var canvas = document.getElementById('game');
  this.board = canvas.getContext("2d");
  var context = canvas.getContext("2d");
  var width  = $(canvas).width();
  var height = $(canvas).height();

  var img = new Image();
  img.src = "./lib/grid.png";

  img.onload = function() {
    var pattern = context.createPattern(img, "repeat");
    context.fillStyle = pattern;
    context.fillRect(0, 0, width, height);
  };
};

Game.prototype.createPlayers = function() {
  this.playerOne = new Player("#14CDE8", { x: 10, y: 30 }, "right", this.oneKeys);
  this.playerTwo = new Player("#E2AA13", { x: 90, y: 30 }, "left", this.twoKeys);
};

Game.prototype.start = function () {
  this.createBoard();
  this.createPlayers();
  this.gameLoopInterval = setInterval(this.movePlayers.bind(this), 30);
};

Game.prototype.movePlayers = function() {
  this.playerOne.move(this);
  this.playerTwo.move(this);
};

Game.prototype.detectCollision = function(position) {
  var border             = this.borderCollision(position);
  var playerOneCollision = this.playerCollision(position, this.playerOne);
  var playerTwoCollision = this.playerCollision(position, this.playerTwo);

  if (border || playerOneCollision || playerTwoCollision) {
    this.end = true;
    this.displayEndMessage();
  }
};

Game.prototype.borderCollision = function(position) {
  return position.x == -1 || position.x == 800 / 8 || position.y == -1 || position.y == 480 / 8
};

Game.prototype.playerCollision = function(position, player) {
  for (var i = 0; i < player.trail.length; i++) {
    if (position.x === player.trail[i].x && position.y === player.trail[i].y) {
      return true;
    }
  }
};

Game.prototype.displayEndMessage = function() {
  clearInterval(this.gameLoopInterval);
  document.getElementById("end").style.display = 'inline';
};

module.exports = Game;
