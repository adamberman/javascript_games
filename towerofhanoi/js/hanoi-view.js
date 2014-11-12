(function(){
  if(typeof(Hanoi) == "undefined"){
    window.Hanoi = {}
  }
  
  var HanoiView = window.Hanoi.HanoiView = function(game, $el){
    this.game = game;
    this.$el = $el;
    this.firstMove = null;
    this.render();
    this.clickTower();
  }
  
  HanoiView.prototype.render = function(){
    var col = "<div class=\"column\" data-stack=\"0\"><div class=\"pile\">1</div><div class=\"pile\">2</div><div class=\"pile\">3</div></div>"
    var col2 = "<div class=\"column\" data-stack=\"1\"><div class=\"pile\"></div><div class=\"pile\"></div><div class=\"pile\"></div></div>"
    var col3 = "<div class=\"column\" data-stack=\"2\"><div class=\"pile\"></div><div class=\"pile\"></div><div class=\"pile\"></div></div>"
    this.$el.append($(col+col2+col3))
  }
  
  HanoiView.prototype.clickTower = function() {
    var that = this;
    var $columns = $(".column");
    $columns.on('click', function(event){
      var $currentColumn = $(event.currentTarget);
      if (that.firstMove == null){
        that.firstMove = $currentColumn.data('stack');
        $currentColumn.toggleClass("selected")
      } else {
        var secondMove = $currentColumn.data('stack');
        if (that.game.move(that.firstMove, secondMove)){
          //change stack
          that.changeStack(that.firstMove, secondMove);
          //check for win
          if (that.game.isWon()){
            alert("you've won!")
            //reset game
          }
        } else {
          alert('Invalid move!');
        }
        var $columnStart = $("*[data-stack=\"" + that.firstMove + "\"]");
        $columnStart.toggleClass("selected")
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