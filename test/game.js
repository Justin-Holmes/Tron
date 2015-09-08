const chai   = require('chai');
const assert = chai.assert;
const Game   = require('../lib/game');

describe('game', function() {

  it('should exist', function() {
    assert(Game);
  });

  var game;
  beforeEach(function() {
    game = new Game();
  });

  it('initializes correctly', function() {
    assert(game.oneKeys);
    assert(game.twoKeys);
    assert.equal(game.end, false);
  });

  it('creates 2 player objects', function() {
    game.createPlayers();

    assert(game.playerOne);
    assert(game.playerTwo);
  });

  it('moves both players', function() {
    game.createPlayers();

    assert.equal(game.playerOne.trail.length, 1);
    assert.equal(game.playerTwo.trail.length, 1);

    game.createBoard();
    game.movePlayers();

    assert.equal(game.playerOne.trail.length, 2);
    assert.equal(game.playerTwo.trail.length, 2);
  });

  it('starts a new game', function() {
    game.start();

    assert(game.playerOne);
    assert(game.playerTwo);
    assert(game.gameLoopInterval);
  });

  it('detects a border collision', function() {
    game.start();
    var noCollision = { x: 0, y: 0 };
    var collisions   = [{ x: -1, y: 0 }, { x: 100, y: 0 }, { x: 0, y: -1}, { x: 0, y: 60 }];

    assert.equal(game.borderCollision(noCollision), false);

    collisions.forEach(function(collision){
      assert.equal(game.borderCollision(collision), true);
    });
  });

  it('detects a player collision', function() {
    game.start();

    assert.equal(game.playerCollision({ x: 0, y: 0 }, game.playerOne), undefined);
    assert.equal(game.playerCollision({ x: 10, y: 30 }, game.playerOne), true);
  });
});
