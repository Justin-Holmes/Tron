const chai = require('chai');
const assert = chai.assert;

describe('player', function () {

  const keys = { left:  "37",
                 up:    "38",
                 right: "39",
                 down:  "40" };

  it('initializes with a color, trail, direction, and keyBindings', function () {
    var player = new Player("blue", 110, 30, "left", keys);
    assert.equal(player.color, "blue");
    assert.equal(player.direction, "left");
    assert.equal(player.keyBindings, keys);
    assert.equal(player.trail, [[110, 30]]);
  });

  // describe('node', function () {
  //   var node = new Node("hello");
  //
  //   it('has data', function () {
  //     assert.equal(node.data, "hello");
  //   });
  //
  //   it('initializes with an empty link', function() {
  //     assert.equal(node.link, undefined);
  //   });
  //
  //   it('has a link when one is passed in', function() {
  //     var blueNode = new Node("blue")
  //     node.link = blueNode;
  //
  //     assert.equal(node.link.data, "blue");
  //   });
  // });



});
