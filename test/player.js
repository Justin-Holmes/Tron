const chai   = require('chai');
const assert = chai.assert;
const Player = require('../lib/player');
const Game   = require('../lib/game');

const keys = {
  left:  "37",
  up:    "38",
  right: "39",
  down:  "40"
};

describe('player', function() {

  it('should exist', function() {
    assert(Player);
  });

  var player;
  beforeEach(function() {
    player = new Player("blue", { x: 110, y: 30 }, "left", keys);
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

const otherKeys = {
  left:  "65",
  up:    "87",
  right: "68",
  down:  "83"
};

describe('player within game object', function() {

  var game;
  beforeEach(function() {
    game = new Game();
    game.createBoard();
    game.playerOne = new Player("red", { x: 10, y: 30 }, "right", otherKeys);
    game.playerTwo = new Player("blue", { x: 110, y: 30 }, "left", keys);
  });

  it('moves player one', function(){
    game.playerOne.move(game);
    var lastPos = game.playerOne.trail[game.playerOne.trail.length - 1]

    assert.equal(lastPos.x, 11);
    assert.equal(lastPos.y, 30);
  });

  it('moves player two', function(){
    game.playerTwo.move(game);
    var lastPos = game.playerTwo.trail[game.playerTwo.trail.length - 1]

    assert.equal(lastPos.x, 109);
    assert.equal(lastPos.y, 30);
  });

});
