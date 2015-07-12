var Ghost = function(id, imagePath) {
  this.id = id;
  this.imagePath = imagePath;
  this.x = this.getNewX();
  this.y = this.getNewY();
};

Ghost.prototype.getNewX = function() {
  this.x = getRandomArbitrary(settings.width - (2*settings.pacmanRadius), 0);
  return this.x;
};

Ghost.prototype.getNewY = function() {
  this.y = getRandomArbitrary(settings.height - (2*settings.pacmanRadius), 0);
  return this.y;
};