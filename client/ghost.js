/* make ghost class */

var Ghost = function(id, imagePath) {
  this.x = this.getNewX();
  this.y = this.getNewY();
  this.id = id;
  this.imagePath = imagePath;
};

Ghost.prototype.getNewX = function() {
  var newX = Math.random() * (parseInt(svg.style("width")) - 100);
  this.x = newX;
  return newX;
};

Ghost.prototype.getNewY = function() {
  var newY = Math.random() * (parseInt(svg.style("height")) - 100);
  this.y = newY;
  return newY;
};