var Ghost = function(id, imagePath) {
  this.id = id;
  this.imagePath = imagePath;
  this.x = this.getNewX();
  this.y = this.getNewY();
};

Ghost.prototype.getNewX = function() {
  this.x = Math.random() * (parseInt(svg.style("width"), 10) - 100);
  return this.x;
};

Ghost.prototype.getNewY = function() {
  this.y = Math.random() * (parseInt(svg.style("height"), 10) - 100);
  return this.y;
};