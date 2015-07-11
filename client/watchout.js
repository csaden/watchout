// GLOBAL VARIABLES
var current = 0;
var best = 0;
var collisionCount = 0;





var svg = d3.select("#canvas")
            .append("svg")
            .attr('width', '800px')
            .attr('height', '600px');

// all ghost image paths
var imagePaths = ["assets/blinky.ico", "assets/inky.png", "assets/pinky.png"];
var data = [];

// create ghost ids and image paths
for (var i = 0; i <= 12; i++) {
  data.push( { "id": i,
                "imagePath": imagePaths[i % 3]
              });
}

// create pacman
var pacman = [{
  "id": "hero",
  "imagePath": "assets/pacman.png",
  "x": parseInt(svg.style("width"))/2,
  "y": parseInt(svg.style("height"))/2
}];


// make pacman draggable
var drag = d3.behavior.drag()
              .origin(function (d) { return d; })
              .on("drag", dragMove);

              /*
              .on("dragstart", dragStarted)
              .on("drag", dragging)
              .on("dragend", dragEnded); */

// append pacman
svg.append("svg:image")
  .data(pacman)
  .attr("class", "pacman")
  .attr("xlink:href", function(pacman) { return pacman.imagePath; })
  .attr("x", parseInt(svg.style("width"))/2)
  .attr("y", parseInt(svg.style("height"))/2)
  .attr("height", 50)
  .attr("width", 50)
  .call(drag);

// append ghosts
svg.selectAll("span")
  .data(data, function(d) { return d.id; })
  .enter()
  .append("svg:image")
  .attr("class", "ghost")
  .attr("xlink:href", function(d) {return d.imagePath; })
  .attr("x", function() { return Math.random() * (parseInt(svg.style("width")) - 100); })
  .attr("y", function() { return Math.random() * (parseInt(svg.style("height")) - 100); })
  .attr("height", 50)
  .attr("width", 50);

// update ghost position
var update = function(data) {
  svg.selectAll("image.ghost")
    .data(data, function(d) { return d.id; })
    .transition()
    .duration(1000)
    .ease("cubic")
    .attr("x", function() { return Math.random() * (parseInt(svg.style("width")) - 100); })
    .attr("y", function() { return Math.random() * (parseInt(svg.style("height")) - 100); })
    .tween("custom", checkCollisions);
};

setInterval(function() {
  update(data);
}, 1000);


// make pacman draggable
function dragMove(d) {
  d.x = d3.event.x;
  d.y = d3.event.y;
  d3.select(".pacman")
    .attr("x", d.x)
    .attr("y", d.y);
};

// get center of object
function getCenter(d) {
  return [d.x+25, d.y+25];
};

// check distance between two objects
function hasCollided(d) {
  debugger;
  return (Math.sqrt((d.x - pacman[0].x)^2 + (d.y - pacman[0].y)^2) <= 50);
};

function checkCollisions(d) {
  if (hasCollided(d)) {
    updateBestScore();
    score = 0;
    updateScore();
    //increment collisons
    collisionIncrementer();
  }
};

// increase collision counter
function collisionIncrementer() {
  var currCount = d3.select(".collisions span").text();
  currCount = parseInt(currCount)
  currCount++;
  d3.select(".collisions span").text(currCount);
};



function updateScore() {
  // d3.select(".score")
  //   .

};

function updateBestScore() {
  // d3.select(".bestScore")
  //   .

};


