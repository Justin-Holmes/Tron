function Player(color, startingX, startingY, startingDirection) {
  this.color     = color;
  this.trail     = [[startingX, startingY]]; //Could change to {x: startingX, y: startingY}
  this.direction = startingDirection;
}

Player.prototype.move = function(game) {
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
  this.colorize(game);
  game.detectCollision(xPosition, yPosition);
  game.playerTrails.push([xPosition, yPosition]);
};

Player.prototype.colorize = function(game) {
  for(var i = 0; i < this.trail.length; i++) {
    var el = this.trail[i];

    game.board.fillStyle = this.color;
    game.board.fillRect(el[0]*10, el[1]*10, 10, 10);
  }
};

module.exports = Player;
