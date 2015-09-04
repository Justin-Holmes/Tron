const Player = require('./player');
const $      = require('jquery');

const oneKeys = {
  left:  "65",
  up:    "87",
  right: "68",
  down:  "83"
};

const twoKeys = {
  left:  "37",
  up:    "38",
  right: "39",
  down:  "40"
};

function Game() {
  this.playerOne    = new Player("red", 10, 30, "right", oneKeys);
  this.playerTwo    = new Player("blue", 110, 30, "left", twoKeys);
  this.playerTrails = [];
}

Game.prototype.createBoard = function() {
  var canvas    = document.getElementById('game');
  var gameBoard = canvas.getContext("2d");
  var width     = $(canvas).width();
  var height    = $(canvas).height();

  gameBoard.fillStyle = "black";
  gameBoard.fillRect(0, 0, width, height);

  this.board = gameBoard;
};

Game.prototype.movePlayers = function() {
  this.playerOne.move(this);
  this.playerTwo.move(this);
};

Game.prototype.end = function() {
  this.board.fillStyle = "green";
  this.board.fillRect(200, 200, 775, 175);

  this.board.font = "40px Georgia";
  this.board.fillStyle = "white";

  this.board.fillText("Game Over! Press 'enter' to play again", 250, 300);

  $(document).keydown(function(k){
    var key = k.which;
    if(key == "13") location.reload();
  });
};

Game.prototype.start = function () {
  this.movePlayers();
  window.gameLoopInterval = setInterval(this.movePlayers.bind(this), 30);
};

Game.prototype.detectCollision = function(xPosition, yPosition) {

  //Detects border collisions

  if (xPosition == -1 || xPosition == 1200 / 10 || yPosition == -1 || yPosition == 600 / 10) {
    clearInterval(window.gameLoopInterval);
    this.end();
  }

  //Detects collisions with player trails

  for (var i = 0; i < this.playerTrails.length; i++) {
    if (xPosition == this.playerTrails[i].x && yPosition == this.playerTrails[i].y) {
      clearInterval(window.gameLoopInterval);
      this.end();
    }
  }
};

module.exports = Game;
