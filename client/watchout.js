// GLOBAL VARIABLES

gameSettings = {
  current : 0,
  best : 0,
  collisionCount : 0,
  pacmanRadius : 25,
  padding : 100,
  width: 800,
  height: 600
}

var board = d3.select("#canvas")
  .style( {
    width: pixelize(gameSettings.width),
    height: pixelize(gameSettings.height)
  });

// all ghost image paths
var data = [];

// create ghost ids and image paths
for (var i = 0; i < 12; i++) {
  var ghost = {
    "id" : i
  };
  data.push(ghost);
}

// create pacman
var pacmanObj = [{
  "id": "hero"
}];

// append pacman
var pacman = board.append("div")
  .data(pacmanObj)
  .attr("class", "pacman")
  .style({
    left: pixelize(gameSettings.width / 2 - gameSettings.pacmanRadius),
    top: pixelize(gameSettings.height / 2 - gameSettings.pacmanRadius)
  })
  .call(drag);

// append ghosts
var ghosts = board.selectAll("span")
  .data(data, function(d) { return d.id; })
  .enter()
  .append("div")
  .attr("class", "ghost")
  .style({
    top: getX(),
    left: getY()
  });

// check for collisions
//d3.timer(checkCollisions);

// update ghost position
var move = function(element) {
    element.transition()
    .duration(1000)
    .ease("cubic")
    .style({
      top : getY,
      left : getX
    })
    .each("end", function() {
      move( d3.select(this) );
    });
};

// board.on("mousemove", function() {
//   var loc = d3.mouse(this);
//   d3.select(".pacman").style({
//     left : pixelize(loc[0]),
//     top : pixelize(loc[1])
//   });
// });

move(ghosts);

/* HELPER FUNCTIONS */
function pixelize(val) {
  return val + "px";
};

function getX() {
  return pixelize(Math.random() * (gameSettings.width - gameSettings.padding));
};

function getY() {
  return pixelize(Math.random() * (gameSettings.height - gameSettings.padding));
};

// make pacman draggable
function drag() {
  d3.behavior.drag()
    .origin(function (d) { return d; })
    .on("drag", dragMove);
};

// make pacman draggable
function dragMove(d) {
  d.x = d3.event.x;
  d.y = d3.event.y;
  d3.select(".pacman")
    .attr("left", d.x)
    .attr("top", d.y);
};

// adjust coordinate to be center of image
function adjustCoord(value) {
  return value + gameSettings.pacmanRadius;
};

// // check distance between two objects
function hasCollided(ghost) {
  var ghostX = adjustCoord(ghost.x);
  var ghostY = adjustCoord(ghost.y);
  var pacmanX = adjustCoord(pacman[0].x);
  var pacmanY = adjustCoord(pacman[0].y);
  var dx = pacmanX - ghostX;
  var dy = pacmanY - ghostY;
  return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(2 * gameSettings.pacmanRadius, 2);
};

function checkCollisions() {
  var ghosts = d3.selectAll(".ghost");
  ghosts.each(function(ghost) {
    if (hasCollided(ghost)) {

      collisionIncrementer();
      // resetPacman();
      // setUpPacman();
      // start();
      // return;
    }
  });
};

// increase collision counter
function collisionIncrementer() {
  var currCount = d3.select(".collisions span").text();
  currCount = parseInt(currCount, 10);
  currCount += 1;
  d3.select(".collisions span").text(currCount);
};

// function updateScore() {
//   current++;
//   d3.select(".current span").text(current);
// }

// function updateBestScore() {
//   if (current > best) {
//     d3.select(".high span").text(current);
//     current = 0;
//   }
// }


