$(document).ready(function(){

  var canvas    = document.getElementById('game');
  var gameBoard = canvas.getContext("2d");
  var width     = $(canvas).width();
  var height    = $(canvas).height();

  gameBoard.fillStyle = "black";
  gameBoard.fillRect(0, 0, width, height);

  //Change 'trail' attribute to take in coordinate objects rather than an array

  function Player(color, startingX, startingY, startingDirection) {
    this.color     = color;
    this.trail     = [[startingX, startingY]]; //Could change to {x: startingX, y: startingY}
    this.direction = startingDirection;
  }

  Player.prototype.move = function() {
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
    colorizePlayers();
    detectCollision(xPosition, yPosition);
    window.playerTrails.push([xPosition, yPosition]);
  };

  //Probably will make this a Player.prototype method

  function colorizePlayers() {
    for(var i = 0; i < playerOne.trail.length; i++)
    {
      var el = playerOne.trail[i];

      gameBoard.fillStyle = playerOne.color;
      gameBoard.fillRect(el[0]*10, el[1]*10, 10, 10);
    }
  }

  function detectCollision(xPosition, yPosition) {

    //Detects border collisions

    if(xPosition == -1 || xPosition == 1200/10 || yPosition == -1 || yPosition == 600/10)
    {
      clearInterval(window.gameLoop);
      endGame();
    }

    //Detects collisions with player trails

    for(var i = 0; i < window.playerTrails.length; i++){
      if(xPosition == window.playerTrails[i][0] && yPosition == window.playerTrails[i][1]){
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

      if(key == "13")
        location.reload();
    });
  }

  function movePlayers() {
    playerOne.move();
  }

  function startGame()
  {
    window.playerOne = new Player("red", 0, 0, "right");
    window.playerTrails = [];

    movePlayers();
    window.gameLoop = setInterval(movePlayers, 30);

    $(document).keydown(function(k){
      var key = k.which;

      if(key == "37" && playerOne.direction != "right")
        playerOne.direction = "left";
      else if(key == "38" && playerOne.direction != "down")
        playerOne.direction = "up";
      else if(key == "39" && playerOne.direction != "left")
        playerOne.direction = "right";
      else if(key == "40" && playerOne.direction != "up")
        playerOne.direction = "down";
    });
  }

  startGame();
});

