function Player(color, startingPos, startingDirection, keyBindings) {
  this.color       = color;
  this.trail       = [ startingPos ];
  this.direction   = startingDirection;
  this.keyBindings = keyBindings;
}

Player.prototype.move = function(game) {
  var nextPos = this.newPos();

  if (game.detectCollision(nextPos)) return true;
  this.trail.push(nextPos);
  this.colorize(game);
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
  var lastPos = this.trail[this.trail.length - 1];
  game.board.fillStyle = this.color;
  game.board.fillRect(lastPos.x*10, lastPos.y*10, 10, 10);
};

Player.prototype.changeDirection = function(key) {
  if (key == this.keyBindings.left && this.direction != "right") {
    this.direction = "left";
  } else if (key == this.keyBindings.up && this.direction != "down") {
    this.direction = "up";
  } else if (key == this.keyBindings.right && this.direction != "left") {
    this.direction = "right";
  } else if (key == this.keyBindings.down && this.direction != "up") {
    this.direction = "down";
  }
};

module.exports = Player;
