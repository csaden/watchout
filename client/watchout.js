// start slingin' some d3 here.

var svg = d3.select("#canvas")
            .append("svg")
            .attr('width', '400px')
            .attr('height', '400px');

var imagePaths = ["assets/blinky.ico", "assets/inky.png", "assets/pinky.png"];
var data = [];

for (var i = 0; i < 10; i++) {
  data.push( { "id": i, 
                "imagePath": imagePaths[1]
              });
}

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

 
var update = function(data) {
  svg.selectAll("image")
    .data(data, function(d) { return d.id; })
    .transition()
    .duration(500)
    .ease("cubic")
    .attr("x", function() { return Math.random() * (parseInt(svg.style("width")) - 100); })
    .attr("y", function() { return Math.random() * (parseInt(svg.style("height")) - 100); })
};

