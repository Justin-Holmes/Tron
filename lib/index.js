const sayHello = function() { console.log('Hello'); };

sayHello();


$(document).ready(function(){
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext("2d");
  var w = $(canvas).width();
  var h = $(canvas).height();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  ctx.lineWidth = 10;
  ctx.strokeStyle = "blue";
  ctx.strokeRect(0, 0, w, h);

  var d;

  var player1;

  function init()
  {
    d = "right"; //default direction
    createPlayer();
    
    $(document).keydown(function(e){
      var key = e.which;

      if(key == "37" && d != "right") d = "left";
      else if(key == "38" && d != "down") d = "up";
      else if(key == "39" && d != "left") d = "right";
      else if(key == "40" && d != "up") d = "down";
    });

    //Lets move the snake now using a timer which will trigger the paint function
    //every 60ms
    if(typeof gameLoop != "undefined") clearInterval(gameLoop);
    gameLoop = setInterval(paint, 60);
  }
  init();

  function createPlayer()
  {
    var length = 1; //Length of the snake
    player1 = []; //Empty array to start with

    for(var i = length; i < 5; i++)
    {
      player1.push({x: i, y:0});
    }
  }

  function paint()
  {
    debugger;
    var nx = player1[player1.length - 1].x;
    var ny = player1[player1.length - 1].y;

    if(d == "right") nx++;
    else if(d == "left") nx--;
    else if(d == "up") ny--;
    else if(d == "down") ny++;

    if(nx == -1 || nx == 451 || ny == -1 || ny == 451)
    {
      //restart game
      init();
      //Lets organize the code a bit now.
      return;
    }

    player1.push({x: nx, y: ny});

    for(var i = 0; i < player1.length; i++)
    {
      var c = player1[i];

      ctx.fillStyle = "red";
      ctx.fillRect(c.x*10, c.y*10, 10, 10);
    }
  }

});

