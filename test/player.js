const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/player');
const Game = require('../lib/game');

const keys = { left:  "37",
               up:    "38",
               right: "39",
               down:  "40" };

describe('player', function() {

  it('should exist', function() {
    assert(Player);
  });

  var player;
  beforeEach(function() {
    player = new Player("blue", 110, 30, "left", keys);
  });

  it('initializes with a color, trail, direction, and keyBindings', function() {
    assert.equal(player.color, "blue");
    assert.equal(player.direction, "left");
    assert.equal(player.keyBindings, keys);
    assert.equal(player.trail[0].x, 110);
    assert.equal(player.trail[0].y, 30);
  });

  it("returns an object with a player's new move", function() {
    var nextPos = player.newPos();

    assert.equal(nextPos.x, 109);
    assert.equal(nextPos.y, 30);
  });

  it('turns down', function() {
    player.changeDirection(40);
    assert.equal(player.direction, "down");
  });

  it('turns right', function() {
    player.direction = "down";
    player.changeDirection(39);
    assert.equal(player.direction, "right");
  });

  it('turns up', function() {
    player.changeDirection(38);
    assert.equal(player.direction, "up");
  });

  it('turns left', function() {
    player.direction = "down";
    player.changeDirection(37);
    assert.equal(player.direction, "left");
  });

});

describe('player with game object', function() {

  var game;
  var player;
  beforeEach(function() {
    game = new Game();
    game.createBoard();
    player = new Player("blue", 110, 30, "left", keys);
  });

  it('colorizes the player', function() {
    assert.equal(player.colorize(game), "blue");
  });

  it('moves the player', function(){
    player.move(game);
    var lastPos = player.trail[player.trail.length - 1]
    assert.equal(lastPos.x, 109);
    assert.equal(lastPos.y, 30);
  });

});
