(function(){
  
  if (typeof Snakes == "undefined"){
    window.Snakes = {}
  }
    
  var SnakeView = window.Snakes.SnakeView = function($el){

    this.$el = $el;
    this.board = new Snakes.Board();
    this.turnSnake();
    this.toPlay = true;
    var that = this;
  }
  SnakeView.prototype.updateCounter = function(){
    var $counter = $("#apple-counter");
    console.log($counter)
    $counter.text("Current Apples: " + this.board.snake.eatenApples)
  }
  
  SnakeView.prototype.drawRestart = function(){
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    // ctx.strokeStyle = "#000"
    // ctx.lineWidth = 0.1;
    // ctx.fillRect(0, 0, 500, 500);
    // Fill with gradient
    ctx.font="60px Verdana";
    // ctx.fillStyle="white";
    ctx.fillText("Hi", 200, 200)
  }
  
  SnakeView.prototype.run = function() {  
    var restartCallback = function(event){
      var key = event.which;
      if(key == 82){
        this.run();
      }
    }
    
    this.refreshId && clearInterval(this.refreshId);
    this.$el.off();
    this.turnSnake();
    
    this.toPlay = true;
    
    var that = this;
    this.refreshId = window.setInterval(function() {
      if(that.toPlay === true) {
        that.board.snake.move();
        that.updateCounter();
        that.board.updateBoard();
      }
      
      if (that.board.snake.lost()){
        that.toPlay = false;
        that.$el.on('keydown', restartCallback.bind(that))
        that.board = new Snakes.Board();
        that.drawRestart();
      }
      
      if(that.toPlay === true){
        that.drawBoard();
      }
      
      
    }, 100);
  }
  
  SnakeView.prototype.turnSnake = function (){
    var that = this;
    this.$el.on('keydown', function(event){
      var key = event.which;
      switch(key){
      case 37:
        that.board.snake.turn('W');
        break;
      case 38:
        that.board.snake.turn('N');
        break;
      case 39:
        that.board.snake.turn('E');
        break;
      case 40:
        that.board.snake.turn('S');
        break;
      }
    });
  }
  
  
  SnakeView.prototype.drawBoard = function() {
    var str = ""
    for (var i = 0; i < Snakes.Board.DIMENSION; i++) {
      str += "<div class=\"row\">";
      for(var j = 0; j < Snakes.Board.DIMENSION; j++) {
        if(this.board.grid[i][j] == "S"){
          str += "<div class=\"tile snake\"></div>";
        } else if (this.board.grid[i][j] == "A") {
          str += "<div class=\"tile apple\"></div>";
        } else {
          str += "<div class=\"tile\"></div>";
        }
      }
      str += "</div>";
    }
    str += "<canvas id=\"canvas\"></canvas>"
    this.$el.html(str);
  }
})();