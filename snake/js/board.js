(function(){
  if (typeof Snakes == "undefined"){
    window.Snakes = {}
  }
  
  var Board = window.Snakes.Board = function(){
    this.snake = new Snakes.Snake(this);
    this.grid = [];
    this.setupBoard();
    this.apples = [];
    
  }
  
  Board.prototype.setupBoard = function(){
    this.grid = [];
    for(var i = 0; i < Board.DIMENSION; i++){
      this.grid.push([])
      for(var j = 0; j < Board.DIMENSION; j++){
        this.grid[i].push(" ");
      }
    }
  }
  
  Board.prototype.generateApple = function(){
    var x = Math.floor(Math.random() * Board.DIMENSION);
    var y = Math.floor(Math.random() * Board.DIMENSION);
    if (!this.isOccupied([x, y])){
      this.apples.push(new Snakes.Coord([x, y]));
      this.insertApple();
    }
  }
  
  Board.prototype.isOccupied = function(pos){
    if (this.grid[pos[0]][pos[1]] === "S" || this.grid[pos[0]][pos[1]] === "A"){
      return true;
    } else {
      return false;
    }
    
  }
  
  Board.prototype.updateBoard = function(){
    this.setupBoard();
    this.insertSnake();
    while ( this.apples.length < 2){
      this.generateApple();
    }
    this.insertApple();
  }
  
  
  // Board.prototype.render = function(){
//     this.setupBoard();
//     this.insertSnake();
//     var string = "";
//     for(var i = 0; i < this.grid.length; i++){
//       for(var j = 0; j < this.grid[i].length; j++){
//         if (this.grid[i][j] === " "){
//           string += ".";
//         } else if (this.grid[i][j] === "S"){
//           string += "S";
//         }
//       }
//       string += "\n"
//     }
//     return string;
//
//   }
//
  Board.prototype.placeOnGrid = function(pos, mark){
    if(pos.x < 0 || pos.y < 0 || pos.x >= Board.DIMENSION || pos.y >= Board.DIMENSION ){
      return;
    }
    this.grid[pos.x][pos.y] = mark;
  }
  
  Board.prototype.insertSnake = function(){
    for(var i = 0; i < this.snake.segments.length; i++){
      this.placeOnGrid(this.snake.segments[i], "S");
    }
  }
  
  Board.prototype.insertApple = function(){
    for(var i = 0; i < this.apples.length; i++){
      this.placeOnGrid(this.apples[i], "A");
    }
  }
  
  Board.DIMENSION = 50;
})();