(function(){
  if (typeof Snakes == "undefined"){
    window.Snakes = {}
  }
  
  var Coord = window.Snakes.Coord = function(pos){
    this.x = pos[0];
    this.y = pos[1];
  }
  
  Coord.prototype.plus = function(otherCoord){
    return new Coord([this.x + otherCoord.x, this.y + otherCoord.y])
  }
  
  Coord.prototype.equals = function(otherCoord){
    return (otherCoord.x == this.x && otherCoord.y == this.y);
  }
  
})();