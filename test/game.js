const chai   = require('chai');
const assert = chai.assert;
const Game   = require('../lib/game');
const Player = require('../lib/player');

describe('game', function() {

  it('should exist', function() {
    assert(Game);
  });

  var game;
  beforeEach(function() {
    game = new Game();
  });


  it('initializes with a 2 players and a playerTrails array', function() {
    assert(game.playerOne);
    assert(game.playerTwo);
    assert.equal(game.playerTrails.length, 0);
  });

  it('creates the board', function() {
    assert.equal(game.board, undefined);

    game.createBoard();

    assert(game.board);
  });

  it('moves both players', function() {
    assert.equal(game.playerTrails.length, 0);

    game.createBoard();
    game.movePlayers();

    assert.equal(game.playerTrails.length, 2);
  });

  it('starts a new game', function() {
    game.start();

    assert(window.gameLoopInterval);
  });

  it('ends a game', function() {
    game.createBoard();
    game.start();
    game.end();

    assert.equal(game.board.font, "40px Georgia");
  });

  it('detects a collision', function() {
    game.createBoard();
    var noCollision = [0,0];
    var collisions   = [[-1, 0], [120, 0], [0, -1], [0, 60]];

    assert.equal(game.detectCollision(noCollision), undefined);

    collisions.forEach(function(collision){
      game.detectCollision(collision);
      assert.equal(game.board.font, "40px Georgia");
    });
  });
});
