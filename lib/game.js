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
  this.playerTrails = [];
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

Game.prototype.detectCollision = function(xPosition, yPosition) {
  this.detectBorderCollision(xPosition, yPosition);
  this.detectPlayerCollision(xPosition, yPosition);
};

Game.prototype.detectBorderCollision = function(xPosition, yPosition) {
  if (xPosition == -1 || xPosition == 1200 / 10 || yPosition == -1 || yPosition == 600 / 10) {
    this.end();
  }
}

Game.prototype.detectPlayerCollision = function(xPosition, yPosition) {
  for (var i = 0; i < this.playerTrails.length; i++) {
    if (xPosition == this.playerTrails[i].x && yPosition == this.playerTrails[i].y) {
      this.end();
    }
  }
}

Game.prototype.end = function() {
  clearInterval(window.gameLoopInterval);
  this.makeEndGameMessage();

  $(document).keydown(function(k){
    if (k.which == "13") location.reload();
  });
};

Game.prototype.makeEndGameMessage = function() {
  this.board.fillStyle = "green";
  this.board.fillRect(200, 200, 775, 175);

  this.board.font = "40px Georgia";
  this.board.fillStyle = "white";

  this.board.fillText("Game Over! Press 'enter' to play again", 250, 300);
};

module.exports = Game;
