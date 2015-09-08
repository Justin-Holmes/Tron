function Player(color, startingPos, startingDirection, keyBindings) {
  this.color       = color;
  this.trail       = [ startingPos ];
  this.direction   = startingDirection;
  this.keyBindings = keyBindings;
}

Player.prototype.move = function(game) {
  var nextPos = this.newPos();
  game.detectCollision(nextPos);

  if (game.end === false) {
    this.trail.push(nextPos);
    this.colorize(game);
  }
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
  game.board.strokeStyle = this.color;
  game.board.strokeRect(lastPos.x*8, lastPos.y*8, 8, 8);
  game.board.fillStyle = "rgba(" + hexToRgb(this.color) + ", 0.5)";
  game.board.fillRect(lastPos.x*8, lastPos.y*8, 8, 8);
};

Player.prototype.changeDirection = function(key) {
  if (key == this.keyBindings.left && this.direction !== "right") {
    this.direction = "left";
  } else if (key == this.keyBindings.up && this.direction !== "down") {
    this.direction = "up";
  } else if (key == this.keyBindings.right && this.direction !== "left") {
    this.direction = "right";
  } else if (key == this.keyBindings.down && this.direction !== "up") {
    this.direction = "down";
  }
};

function hexToRgb(hex) {
  var resultObj = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var result = resultObj ? {
    r: parseInt(resultObj[1], 16),
    g: parseInt(resultObj[2], 16),
    b: parseInt(resultObj[3], 16)
  } : null;

  return (result.r + "," + result.g + "," + result.b);
}

module.exports = Player;
