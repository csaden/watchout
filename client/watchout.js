// start slingin' some d3 here.

var svg = d3.select("#canvas")
            .append("svg")
            .attr('width', '800px')
            .attr('height', '600px');

// all ghost image paths
var imagePaths = ["assets/blinky.ico", "assets/inky.png", "assets/pinky.png"];
var data = [];

// create ghost ids and image paths
for (var i = 0; i < 10; i++) {
  data.push( { "id": i, 
                "imagePath": imagePaths[1]
              });
}

var pacman = [{
  "id": "hero",
  "imagePath": "assets/pacman.png",
  "x": parseInt(svg.style("width"))/2,
  "y": parseInt(svg.style("height"))/2
}];


// make pacman draggable
var drag = d3.behavior.drag()
              .origin(function (d) { return d; })
              .on("dragstart", dragStarted)
              .on("drag", dragging)
              .on("dragend", dragEnded);

// append pacman
svg.append("svg:image")
  .data(pacman)
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
    .duration(800)
    .ease("cubic")
    .attr("x", function() { return Math.random() * (parseInt(svg.style("width")) - 100); })
    .attr("y", function() { return Math.random() * (parseInt(svg.style("height")) - 100); })
};

setInterval(function() {
  update(data);
}, 1000);

function dragStarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
};

function dragging(d) {
  d3.select(this).attr("x", d.x = d3.event.x).attr("y", d.y = d3.event.y);
};

function dragEnded(d) {
  d3.select(this).classed("dragging", false);
};




