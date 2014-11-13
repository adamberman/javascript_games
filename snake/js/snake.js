(function(){
  if (typeof Snakes == "undefined"){
    window.Snakes = {}
  }
  
  var Coord = Snakes.Coord;
  
  var Snake = window.Snakes.Snake = function(board){
    this.board = board;
    this.dir = 'N';
    this.segments = [new Coord([10, 10]), new Coord([10, 11]), new Coord([10, 12])];
    this.eatenApples = 0;
  }
  
  Snake.prototype.move = function(){
    
    this.segments.unshift(this.getHead().plus(Snake.map[this.dir]));
    if (!this.hitApple()){
      this.segments.pop();
    }
  }
  
  Snake.prototype.getHead = function(){
    return this.segments[0]
  }
  
  Snake.prototype.turn = function(dir){
    this.dir = dir;
  }
  
  Snake.prototype.hitApple = function(){
    for (var i = 0; i < this.board.apples.length; i++){
      if (this.getHead().equals(this.board.apples[i])){
        this.board.apples.splice(i, 1);
        this.eatenApples++;
        return true;
      }
    }
    return false;  
  }
  
  Snake.prototype.lost = function(){
    return this.hitSelf() || this.hitBoundary();
  }
  
  Snake.prototype.hitSelf = function(){
    var restSegments = this.segments.slice(1);
    for (var i = 0; i < restSegments.length; i++){
      if (this.getHead().equals(restSegments[i])){
        return true;
      }
    }
    return false;
  }
  
  Snake.prototype.hitBoundary = function(){
    return this.getHead().x < 0 || this.getHead().y < 0 || 
      this.getHead().x >= Snakes.Board.DIMENSION || 
      this.getHead().y >= Snakes.Board.DIMENSION;
  }
  
  Snake.DIRECTIONS = ["N", "E", "S", "W"];
  Snake.map = Object.create(null);
  Snake.map['N'] = new Coord([-1, 0])
  Snake.map['E'] = new Coord([0, 1])
  Snake.map['S'] = new Coord([1, 0])
  Snake.map['W'] = new Coord([0, -1])
  
})();