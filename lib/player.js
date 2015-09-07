function Player(color, startingX, startingY, startingDirection, keyBindings) {
  this.color       = color;
  this.trail       = [{ x: startingX, y: startingY }]
  this.direction   = startingDirection;
  this.keyBindings = keyBindings;
}

Player.prototype.move = function(game) {
  var nextPos = this.newPos();

  this.trail.push(nextPos);
  this.colorize(game);
  game.detectCollision(nextPos.x, nextPos.y);
  game.playerTrails.push(nextPos);
};

Player.prototype.newPos = function() {
  var xPosition = this.trail[this.trail.length - 1].x;
  var yPosition = this.trail[this.trail.length - 1].y;

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

  return { x: xPosition, y: yPosition };
};

Player.prototype.colorize = function(game) {
  for(var i = 0; i < this.trail.length; i++) {
    var el = this.trail[i];

    game.board.fillStyle = this.color;
    game.board.fillRect(el.x*10, el.y*10, 10, 10);
  }
  return this.color;
};

Player.prototype.changeDirection = function(key) {
  if (key == this.keyBindings.left && this.direction != "right")
    this.direction = "left";
  else if (key == this.keyBindings.up && this.direction != "down")
    this.direction = "up";
  else if (key == this.keyBindings.right && this.direction != "left")
    this.direction = "right";
  else if (key == this.keyBindings.down && this.direction != "up")
    this.direction = "down";
};

module.exports = Player;
