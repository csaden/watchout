// GLOBAL VARIABLES
var current = 0;
var best = 0;
var collisionCount = 0;
var pacmanRadius = 25;

var svg = d3.select("#canvas")
  .append("svg")
  .attr("class", "svg")
  .attr('width', '800px')
  .attr('height', '600px');

// all ghost image paths
var imagePaths = ["assets/blinky.ico", "assets/inky.png", "assets/pinky.png"];
var data = [];

// create ghost ids and image paths
for (var i = 0; i < 12; i++) {
  data.push( new Ghost( i, imagePaths[i % 3] ) );
}

// create pacman
var pacman = [{
  "id": "hero",
  "imagePath": "assets/pacman.png",
  "x": parseInt(svg.style("width"), 10) /2,
  "y": parseInt(svg.style("height"), 10) /2
}];

// make pacman draggable
var drag = d3.behavior.drag()
  .origin(function (d) { return d; })
  .on("drag", dragMove);


var setUpPacman = function() {

  // append pacman
  svg.append("image")
    .data(pacman)
    .attr("class", "pacman")
    .attr("xlink:href", function(pacman) { return pacman.imagePath; })
    .attr("x", parseInt(svg.style("width"), 10) /2)
    .attr("y", parseInt(svg.style("height"), 10) /2)
    .attr("height", 50)
    .attr("width", 50)
    .call(drag);

  // append ghosts
  svg.selectAll("span")
    .data(data, function(d) { return d.id; })
    .enter()
    .append("image")
    .attr("class", "ghost")
    .attr("xlink:href", function(d) {return d.imagePath; })
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("height", 50)
    .attr("width", 50);

};


// var start pacman
var start = function() {

  // move ghosts around every second
  setInterval(function() {
    update(data);
  }, 1000);

  // check for collisions
  d3.timer(checkCollisions);

};

// update ghost position
var update = function(data) {
  svg.selectAll("image.ghost")
    .data(data, function(d) { return d.id; })
    .transition()
    .duration(1000)
    .ease("cubic")
    .attr("x", function(d) { return d.getNewX(); })
    .attr("y", function(d) { return d.getNewY(); });
};

var resetPacman = function() {
  d3.selectAll("image").remove();
  data = [];
};

/* HELPER FUNCTIONS */

// make pacman draggable
function dragMove(d) {
  d.x = d3.event.x;
  d.y = d3.event.y;
  d3.select(".pacman")
    .attr("x", d.x)
    .attr("y", d.y);
}

// adjust coordinate to be center of image
function adjustCoord(value) {
  return value + pacmanRadius;
}

// // check distance between two objects
function hasCollided(ghost) {
  var ghostX = adjustCoord(ghost.x);
  var ghostY = adjustCoord(ghost.y);
  var pacmanX = adjustCoord(pacman[0].x);
  var pacmanY = adjustCoord(pacman[0].y);
  var dx = pacmanX - ghostX;
  var dy = pacmanY - ghostY;
  return Math.pow(dx, 2) + Math.pow(dy, 2) < Math.pow(2 * pacmanRadius, 2);
}

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
}

// increase collision counter
function collisionIncrementer() {
  var currCount = d3.select(".collisions span").text();
  currCount = parseInt(currCount, 10);
  currCount += 1;
  d3.select(".collisions span").text(currCount);
}

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

setUpPacman();
start();

