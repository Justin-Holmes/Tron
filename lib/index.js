$(document).ready(function(){

  var canvas    = document.getElementById('game');
  var gameBoard = canvas.getContext("2d");
  var width     = $(canvas).width();
  var height    = $(canvas).height();

  gameBoard.fillStyle = "black";
  gameBoard.fillRect(0, 0, width, height);

  function Player(color, startingX, startingY, startingDirection) {
    this.color     = color;
    this.trail     = [[startingX, startingY]];
    this.direction = startingDirection;
  }

  Player.prototype.move = function() {
    var xPosition = this.trail[this.trail.length - 1][0];
    var yPosition = this.trail[this.trail.length - 1][1];

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

    detectCollision(xPosition, yPosition);
    this.trail.push([xPosition, yPosition]);
    colorizePlayers()
  };

  function colorizePlayers() {
    for(var i = 0; i < playerOne.trail.length; i++)
    {
      var el = playerOne.trail[i];

      gameBoard.fillStyle = playerOne.color;
      gameBoard.fillRect(el[0]*10, el[1]*10, 10, 10);
    }
  }

  function detectCollision(xPosition, yPosition) {
    if(xPosition == -1 || xPosition == 1200/10 || yPosition == -1 || yPosition == 600/10)
    {
      clearInterval(window.gameLoop);
      endGame();
    }
  }

  function endGame() {
    alert("Player one loses! Press enter to play again");
    location.reload();
  }

  function movePlayers() {
    playerOne.move();
  }

  function startGame()
  {
    window.playerOne = new Player("red", 0, 0, "right");

    playerOne.move();

    $(document).keydown(function(e){
      var key = e.which;

      if(key == "37" && playerOne.direction != "right")
        playerOne.direction = "left";
      else if(key == "38" && playerOne.direction != "down")
        playerOne.direction = "up";
      else if(key == "39" && playerOne.direction != "left")
        playerOne.direction = "right";
      else if(key == "40" && playerOne.direction != "up")
        playerOne.direction = "down";
    });

    window.gameLoop = setInterval(movePlayers, 30);
  }

  startGame();
});

