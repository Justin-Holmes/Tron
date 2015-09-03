function Player(color, startingX, startingY, startingDirection, keyBindings) {
  this.color       = color;
  this.trail       = [[startingX, startingY]]; //Could change to {x: startingX, y: startingY}
  this.direction   = startingDirection;
  this.keyBindings = keyBindings;
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

  Player.prototype.changeDirection = function(key) {
    if(key == this.keyBindings.left && this.direction != "right")
      this.direction = "left";
    else if(key == this.keyBindings.up && this.direction != "down")
      this.direction = "up";
    else if(key == this.keyBindings.right && this.direction != "left")
      this.direction = "right";
    else if(key == this.keyBindings.down && this.direction != "up")
      this.direction = "down";
  };

module.exports = Player;
