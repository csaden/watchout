// GLOBAL VARIABLES

settings = {
  "width": 800,
  "height": 600,
  "pacmanRadius": 25,
  "imageHeight": "50px",
  "imageWidth": "50px",
  "animationDuration": 1500
};

var current, best, collisions;

var svg = d3.select(".board")
  .append("svg")
  .attr("class", "svg")
  .attr('width', pixelize(settings.width))
  .attr('height', pixelize(settings.height));

// all ghost image paths
var imagePaths = ["assets/blinky.ico", "assets/inky.png", "assets/pinky.png"];
var data = [];

// create ghost ids and image paths
for (var i = 0; i < 12; i++) {
  data.push( new Ghost( i, imagePaths[i % 3] ) );
}

// // make pacman draggable
// var drag = d3.behavior.drag()
//     .on("drag", dragMove);

// create and append pacman
var pacman = svg.append("image")
  .attr("class", "pacman")
  .attr("xlink:href", "assets/pacman.png")
  .attr("x", settings.width / 2 - settings.pacmanRadius)
  .attr("y", settings.height / 2 - settings.pacmanRadius)
  .attr("height", settings.imageHeight)
  .attr("width", settings.imageWidth);

// append ghosts
var ghosts = svg.selectAll("span")
  .data(data, function(d) { return d.id; })
  .enter()
  .append("image")
  .attr("class", "ghost")
  .attr("xlink:href", function(d) {return d.imagePath; })
  .attr("x", function(d) { return d.x; })
  .attr("y", function(d) { return d.y; })
  .attr("height", settings.imageHeight)
  .attr("width", settings.imageWidth);

// move function for ghosts
var move = function(element) {
  element.transition()
    .duration(settings.animationDuration)
    .ease("cubic-in-out")
    .attr("x", function(d) { return d.getNewX(); })
    .attr("y", function(d) { return d.getNewY(); })

    // transition can emit 'start' 'interrupt' and 'end' events
    // recursively move one element (this) after the previous transition ends
    .each("end", function() {
      move(d3.select(this));
    });
};

// start moving all ghosts
move(ghosts);

// make pacman draggable
svg.on("mousemove", function() {
  var loc = d3.mouse(this);
  if (settings.pacmanRadius > loc[0] || loc[0] > settings.width - settings.pacmanRadius) {
    return;
  }
  if (settings.pacmanRadius > loc[1] || loc[1] > settings.height - settings.pacmanRadius) {
    return;
  }
  pacman.attr("x", loc[0] - settings.pacmanRadius)
    .attr("y", loc[1] - settings.pacmanRadius);
});

// check for collisions
d3.timer(checkCollisions);


/* HELPER FUNCTIONS */

// add 'px' to value
function pixelize(val) {
  return val + "px";
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// update pacman's coordinates on drag
function dragMove(d) {
  d3.select(this)
    .attr("x", d3.event.x - settings.pacmanRadius)
    .attr("y", d3.event.y - settings.pacmanRadius);
}


function checkCollisions() {

  var collision = false;

  ghosts.each(function(ghost) {
    if (hasCollided(ghost)) {
      if (!collision) {
        collisionIncrementer();
        collision = true;
      }
    }
  });
}

// adjust coordinate to be center of image
function adjustCoord(value) {
  return value + settings.pacmanRadius;
}

// check distance between a ghost and pacman
function hasCollided(ghost) {
  var ghostX = adjustCoord(ghost.x);
  var ghostY = adjustCoord(ghost.y);
  var pacmanX = adjustCoord(pacman.attr("x"));
  var pacmanY = adjustCoord(pacman.attr("y"));
  var dx = pacmanX - ghostX;
  var dy = pacmanY - ghostY;
  return (dx * dx + dy * dy) < Math.pow(2 * settings.pacmanRadius, 2);
}

// increase collision counter
function collisionIncrementer() {
  var currCount = d3.select(".collisions span").text();
  currCount = parseInt(currCount, 10);
  currCount += 1;
  d3.select(".collisions span").text(currCount);
}

function updateScore() {
  d3.select(".current span").text(current);
  d3.select(".high span").text(best);
  d3.select(".collisions span").text(collisions);
}

function updateBestScore() {
  if (current > best) {
    d3.select(".high span").text(current);
  }
}
