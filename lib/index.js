//Change 'trail' attribute to take in coordinate objects rather than an array
function Player(color, startingX, startingY, startingDirection) {
  this.color     = color;
  this.trail     = [[startingX, startingY]]; //Could change to {x: startingX, y: startingY}
  this.direction = startingDirection;
}

Player.prototype.colorize = function(gameBoard) {
  for(var i = 0; i < this.trail.length; i++) {
    var el = this.trail[i];

    gameBoard.fillStyle = this.color;
    gameBoard.fillRect(el[0]*10, el[1]*10, 10, 10);
  }
};


$(document).ready(function(){
  var gameBoard = canvas();

  //Probably will make this a Player.prototype method

  Player.prototype.move = function(gameBoard) {
    var xPosition = this.trail[this.trail.length - 1][0];
    var yPosition = this.trail[this.trail.length - 1][1];

    //Could probably break this out into its own prototype method

    switch(this.direction) {
      case "right":
        xPosition++;
        break;
      case "left":
        xPosition--;
        break;
      case "up":
        yPosition--;
        break;
      case "down":
        yPosition++;
        break;
    }

    this.trail.push([xPosition, yPosition]);
    this.colorize(gameBoard);
    detectCollision(xPosition, yPosition);
    window.playerTrails.push([xPosition, yPosition]);
  };


  function detectCollision(xPosition, yPosition) {

    //Detects border collisions

    if (xPosition == -1 || xPosition == 1200/10 || yPosition == -1 || yPosition == 600/10) {
      clearInterval(window.gameLoop);
      endGame();
    }

    //Detects collisions with player trails

    for (var i = 0; i < window.playerTrails.length; i++) {
      if (xPosition == window.playerTrails[i][0] && yPosition == window.playerTrails[i][1]) {
        clearInterval(window.gameLoop);
        endGame();
      }
    }
  }

  function endGame() {
    gameBoard.fillStyle = "green";
    gameBoard.fillRect(200, 200, 775, 175);
    gameBoard.font = "40px Georgia";
    gameBoard.fillStyle = "white";
    gameBoard.fillText("Game Over! Press 'enter' to play again", 250, 300);

    $(document).keydown(function(k){
      var key = k.which;
      if(key == "13") location.reload();
    });
  }

  function movePlayers() {
    playerOne.move(gameBoard);
    playerTwo.move(gameBoard);
  }

  function playerKeys(key, keyBindings, player) {
    if(key == keyBindings.left && player.direction != "right")
      player.direction = "left";
    else if(key == keyBindings.up && player.direction != "down")
      player.direction = "up";
    else if(key == keyBindings.right && player.direction != "left")
      player.direction = "right";
    else if(key == keyBindings.down && player.direction != "up")
      player.direction = "down";
  }

  function startGame()
  {
    window.playerOne = new Player("red", 10, 30, "right");
    window.playerTwo = new Player("blue", 110, 30, "left");
    window.playerTrails = [];

    movePlayers();
    window.gameLoop = setInterval(movePlayers, 30);

    $(document).keydown(function(k){
      var key = k.which;

      var oneKeys = {
        left: "65",
        up: "87",
        right: "68",
        down: "83"
      };

      var twoKeys = {
        left: "37",
        up: "38",
        right: "39",
        down: "40"
      };

const $      = require('jquery');
const Game   = require('./game');

$(document).ready(function() {
  var game = new Game();
  game.createBoard();
  game.start();
});
