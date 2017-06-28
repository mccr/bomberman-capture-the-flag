function Bomb(map, tileSize) {
this.tileSize = tileSize;
this.map = map;
this.x = 0;
this.y = 0;
}

Bomb.prototype.dropBomb = function(x,y){
  this.x = x;
  this.y = y;
  var id = '#'+y+'-'+x;
  var bomb = $('<img>').attr({
          src: 'css/assets/Bomb/Bomb_f01.png',
          width: '32px'
        });
  $('#board > div'+id).append(bomb);
  this._explode();
  this._isBreakable();
};

Bomb.prototype._isBreakable = function(){
  if(this.map[this.x-1][this.y] === '*') this._breakUp();
  if(this.map[this.x+1][this.y] === '*') this._breakDown();
  if(this.map[this.x][this.y+1] === '*') this._breakRigth();
  if(this.map[this.x][this.y-1] === '*') this._breakLeft();
};

Bomb.prototype._breakUp = function() {
  var x = this.x - 1,
      y = this.y;
  this._explodeAdjacent(x,y);
};

Bomb.prototype._breakDown = function() {
  var x = this.x + 1,
      y = this.y;
  this._explodeAdjacent(x,y);
};

Bomb.prototype._breakRigth = function() {
  var x = this.x,
      y = this.y + 1;
  this._explodeAdjacent(x,y);
};

Bomb.prototype._breakLeft = function() {
  var x = this.x,
      y = this.y - 1;
  this._explodeAdjacent(x,y);
};

Bomb.prototype._explodeAdjacent = function(x,y) {
  var id = '#'+y+'-'+x;
  var that = this;
  setTimeout(function(){
    var flame = $('<img>').attr({
            src: 'css/assets/Flame/Flame_F02.png',
            width: '32px'
          });
    $('#board > div'+id).removeClass('brick').addClass('empty');
    $('#board > div'+id).append(flame);
      setTimeout(function(){
        $('#board > div'+id).empty();
        that._updateMap(x,y);
      },2 * 1000);
  },1 * 1000);
};

Bomb.prototype._explode = function() {
  var prevId = '#'+this.y+'-'+this.x;
  setTimeout(function(){
    $('#board > div'+prevId).empty();
    var flame = $('<img>').attr({
            src: 'css/assets/Flame/Flame_F02.png',
            width: '32px'
          });
    $('#board > div'+prevId).append(flame);
      setTimeout(function(){
        $('#board > div'+prevId).empty();
      },2 * 1000);
  },1 * 1000);
};

Bomb.prototype._updateMap = function(x,y) {
  this.map[x][y]= 'E';
};
// Player.prototype.dropBomb = function(bomb) {
//   //if(bomb && this.bombs > 3){
//     // this.bombs--;
//     // console.log(this.bombs);
//     var that = this;
//     var bombBreak = this._isBreakable();
//     console.log(bombBreak);
//     if(bombBreak){
//       var id = '#'+this.gridPosition.col+'-'+this.gridPosition.row;
//       console.log(id);
//       var breakId = '#'+bombBreak[0]+'-'+bombBreak[1];
//       console.log(breakId);
//       var bombing = $('<img>').attr({
//         src: 'css/assets/Bomb/Bomb_f01.png',
//         width: '32px'
//       });
//       var flame = $('<img>').attr({
//         src: 'css/assets/Flame/Flame_F02.png',
//         width: '32px'
//       });
//       $('#board > div'+id).append(bombing);
//       var bombOut = setTimeout(function(){
//         $('#board > div'+id).empty();
//         $('#board > div'+breakId).removeClass('brick');
//         $('#board > div'+breakId).addClass('empty');
//         $('#board > div'+breakId).append(flame);
//         $('#board > div'+id).append(flame);
//         var flameOut = setTimeout(function(){
//           $('#board > div'+id).empty();
//           $('#board > div'+breakId).empty();
//           that._updateGridBreak(bombBreak);
//         }, 1 * 1000);
//       },1 * 1000);
//     }
//   //}
// };
//
// Player.prototype._isBreakable = function(){
//   var xBomb = this.gridPosition.row,
//       yBomb = this.gridPosition.col,
//       response;
//
//   switch (this.direction) {
//     case 0:
//       if((xBomb-1) >= 0 && (this.maps[xBomb-1][yBomb] == '*')){
//         xBomb -= 1;
//         response = [yBomb, xBomb];
//       } else {
//         response = false;
//       }
//       break;
//     case 1:
//       if((yBomb+1 < this.maps[0].length) && (this.maps[xBomb][yBomb+1] == '*')){
//         yBomb += 1;
//         response = [yBomb, xBomb];
//       } else {
//         response = false;
//       }
//       break;
//     case 2:
//       if((xBomb+1 < this.maps.length) && (this.maps[xBomb+1][yBomb] == '*')) {
//         xBomb += 1;
//         response = [yBomb, xBomb];
//       } else {
//         response = false;
//       }
//       break;
//     case 3:
//       if((yBomb-1 >= 0) && (this.maps[xBomb][yBomb-1] == '*')){
//         yBomb -= 1;
//         response = [yBomb, xBomb];
//       } else {
//         response = false;
//       }
//       break;
//   }
//   return response;
// };
//
// Player.prototype._updateGridBreak = function(bombBreak){
//   var x = bombBreak[1],
//       y = bombBreak[0];
//   this.maps[x][y] = 'E';
// };
//
// Player.prototype.dropSolidTile = function(element) {
//   console.log(element);
//   element.removeClass('empty');
//   element.addClass('solidTile');
//   var id = element[0].id;
//   var arr = id.split('-').map(function(n){
//     return parseInt(n);
//   });
//   var y = arr[0];
//   var x = arr[1];
//   console.log(y,x);
//   this.maps[x][y] = 'S';
// };