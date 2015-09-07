const Player = require('./player');
const $      = require('jquery');

function boardDetails() {
  var canvas    = document.getElementById('game');
  var gameBoard = canvas.getContext("2d");
  var width     = $(canvas).width();
  var height    = $(canvas).height();

  return { gameBoard: gameBoard, width: width, height: height };
}

function createBoard() {
  var board = boardDetails();
  board.gameBoard.fillStyle = "black";
  board.gameBoard.fillRect(0, 0, board.width, board.height);

  return board.gameBoard;
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
  this.end = false;
}

Game.prototype.createPlayers = function() {
  this.playerOne = new Player("red", { x: 10, y: 30 }, "right", this.oneKeys);
  this.playerTwo = new Player("blue", { x: 110, y: 30 }, "left", this.twoKeys);
};

Game.prototype.start = function () {
  this.createPlayers();
  this.gameLoopInterval = setInterval(this.movePlayers.bind(this), 30);
};

Game.prototype.movePlayers = function() {
  this.playerOne.move(this);
  this.playerTwo.move(this);
};

Game.prototype.detectCollision = function(position) {
  var border = this.borderCollision(position);
  var playerOneCollision = this.playerCollision(position, this.playerOne);
  var playerTwoCollision = this.playerCollision(position, this.playerTwo);

  if (border || playerOneCollision || playerTwoCollision) {
    this.end = true;
    this.displayEndMessage();
  }
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

Game.prototype.displayEndMessage = function() {
  clearInterval(this.gameLoopInterval);
  document.getElementById("end").style.display = 'inline';
};

Game.prototype.clearBoard = function() {
  var board = boardDetails();
  board.gameBoard.clearRect(0, 0, board.width, board.height);
};

module.exports = Game;
