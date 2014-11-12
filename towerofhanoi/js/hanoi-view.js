(function(){
  if(typeof(Hanoi) == "undefined"){
    window.Hanoi = {}
  }
  
  var HanoiView = window.Hanoi.HanoiView = function(game, $el){
    this.game = game;
    this.$el = $el;
    this.firstMove = null;
    this.grid = [['one', 'two', 'three'],["", "", ""],["", "", ""]];
    // [["", "two", "three"].["","","one"].["","",""]]
    // [["", "two", "three"],["","",""],["","",""]]
    this.render();
    this.clickTower();
  }
  
  HanoiView.prototype.render = function(){
    var string = ""
    for(var row=0; row < 3; row++){
      string += "<div class='column'";
      string += "data-stack='" + row + "'>";
      for(var col=0; col < 3; col++){
        string += "<div class=\"pile " + this.grid[row][col] + "\"></div>";
      }
      string += "</div>"
    }
    this.$el.html(string);
  }
  
  HanoiView.prototype.updateClass = function(){
    var $piles = $(".pile")
    $piles.removeClass("one two three")
    for(var i = 0; i < $piles.length; i++){
      $piles.eq(i).addClass(this.grid[ Math.floor( i / 3)][i % 3])
    }
  }
  
  
  HanoiView.prototype.clickTower = function() {
    var that = this;
    var $columns = $(".column");
    $columns.on('click', function(event){
      var $currentColumn = $(event.currentTarget);
      if (that.firstMove == null){
        //if no first move has been taken
        //set IVAR of first move and toggle it as selected
        that.firstMove = $currentColumn.data('stack');
        $currentColumn.addClass("selected");
      } else {
        //if there is a first move taken
        //find the second move and see if we can move it 
        var secondMove = $currentColumn.data('stack');
        if (that.game.move(that.firstMove, secondMove)){
          //change stack
          for( var i = 0; i < that.grid[that.firstMove].length; i++){
            if (that.grid[that.firstMove][i].length > 0){
              var classToMove = that.grid[that.firstMove][i];
              that.grid[that.firstMove][i] = "";
              i = that.grid[that.firstMove].length + 1;
            }
          }
          
          for( var i = that.grid[secondMove].length - 1; i >= 0; i-- ){
            if (that.grid[secondMove][i].length === 0){
              that.grid[secondMove][i] = classToMove;
              i = -1;
            }
          }
          that.updateClass();
          //check for win
          if (that.game.isWon()){
            alert("you've won!")
            //reset game
          }
        } else {
          //if we can't move there
          alert('Invalid move!');
          
          
        }
        
        var $columnStart = $("*[data-stack=\"" + that.firstMove + "\"]");
        $columnStart.removeClass("selected")
        that.firstMove = null;
        
        
        
      }
    })
  }
  
  HanoiView.prototype.changeStack = function(start, end){
    var $columnStart = $("*[data-stack=\"" + start + "\"]");
    var $columnEnd = $("*[data-stack=\"" + end + "\"]");
    var textToChange = $columnStart.contents(":not(:empty)").first().text();
    $columnStart.contents(":not(:empty)").first().text("");
    $columnEnd.contents(":empty").last().text(textToChange);
  }


  
  
  
  
})();