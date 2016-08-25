function Glyph01(sizeX, sizeY){
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.grid = [];
  this.resetGrid();
  this.hasNextStep = true;
  this.setNewHeadCell();
  this.cellCount = 1;
}

Glyph01.prototype.resetGrid = function(){
  for(var i=0; i<this.sizeX; i++){
    this.grid[i] = [];
    for(var j=0; j<this.sizeY; j++){
      this.grid[i][j] = 0;
    }
  }
}

Glyph01.prototype.grow = function(){
  while(this.gridHasZeroEdgeCell()){
    if(!this.step()){
      this.setNewHeadCell();
      this.cellCount++;
    }
  }
}

Glyph01.prototype.gridHasZeroEdgeCell = function(){
  return this.getZeroEdgeCells().length>0;
}

Glyph01.prototype.gridHasZeroCell = function(){  
  for(var i = 0;i<this.sizeX;i++){
    for(var j = 0;j<this.sizeY;j++){
      if(this.grid[i][j]==0){ return true; }
    }
  }
  return false;
}

Glyph01.prototype.filterOffGridCells = function(cells){
  var validNeighbors = [];
  for(var i = 0; i<cells.length; i++){
    var neighbor = cells[i];
    var x = neighbor[0];
    var y = neighbor[1];
    if(x<this.sizeX &&
       x>=0         &&
       y<this.sizeY &&
       y>=0
      ){
      validNeighbors.push(neighbor);
    }
  }

  return validNeighbors;
}

Glyph01.prototype.getAdjacentCells = function(cell){
  var neighbors = [
    [cell[0]+1,cell[1]  ],//right
    [cell[0]-1,cell[1]  ],//left
    [cell[0]  ,cell[1]-1],//top
    [cell[0]  ,cell[1]+1] //bottom    
  ];  

  return this.filterOffGridCells(neighbors)
}

Glyph01.prototype.getCornerCells = function(cell){
  var neighbors = [    
    [cell[0]+1,cell[1]-1],//top-right
    [cell[0]+1,cell[1]+1],//bottom-right
    [cell[0]-1,cell[1]-1],//top-left
    [cell[0]-1,cell[1]+1] //bottom-left
  ];  

  return this.filterOffGridCells(neighbors);
}

Glyph01.prototype.getAdjacentAndCornerCells = function(cell){
  var adjacents = this.getAdjacentCells(cell);
  var corners = this.getCornerCells(cell);
  return adjacents.concat(corners);
}

Glyph01.prototype.getNextStep01 = function(cell){
  var neighbors = this.getAdjacentCells(cell);
  while(neighbors.length>0){
    var i = Math.floor(random(neighbors.length));
    var c = neighbors[i];
    if(this.grid[c[0]][c[1]]==0){
        //invalidate neighbors that weren't selected
        neighbors.concat(this.getCornerCells(cell));
        for(var j=0; j<neighbors.length; j++){
          var deadCell = neighbors[j];
          if(this.grid[deadCell[0]][deadCell[1]]==0){
            this.grid[deadCell[0]][deadCell[1]]=-1;
          }
        }
        return c;
    }
    neighbors.splice(i,1);
  }  

  return false;
}

Glyph01.prototype.getRandomZeroEdgeCell = function(){
  var edgeCells = this.getZeroEdgeCells();  
  if(edgeCells.length==0){
    return false;
  }
  return edgeCells[Math.floor(random(edgeCells.length))];
}

Glyph01.prototype.getZeroCells = function(){
  var zeroCells = [];
  for(var x = 0;x<this.sizeX;x++){
    for(var y = 0;y<this.sizeY;y++){
      if(this.grid[x][y]==0){
        zeroCells.push([x,y]);
      }
    }
  }
  return zeroCells;
}

Glyph01.prototype.getZeroEdgeCells = function(){
  var zeroCells = this.getZeroCells();
  var edgeCells = [];
  for(var i=0; i<zeroCells.length; i++){
    if(zeroCells[i][0]==0           ||
       zeroCells[i][0]==this.sizeX-1||
       zeroCells[i][1]==this.sizeY-1||
       zeroCells[i][1]==0           ){
      edgeCells.push(zeroCells[i]);
    }
  }
  return edgeCells;
}

Glyph01.prototype.getRandomZeroCell = function(){
  var zeroCells = this.getZeroCells();
  if(zeroCells.length==0){
    return false;
  }
  return zeroCells[Math.floor(random(zeroCells.length))];
}

Glyph01.prototype.getNewHeadCell = function(){
  return this.getRandomZeroEdgeCell();
}

Glyph01.prototype.setNewHeadCell = function(){
  this.headCell = this.getNewHeadCell();
}

Glyph01.prototype.hasNextStep = function(){
  return this.getNextStep01(this.headCell);
}

Glyph01.prototype.step = function(){
  this.grid[this.headCell[0]][this.headCell[1]] = this.cellCount;
  var nextCell = this.getNextStep01(this.headCell);
  if(nextCell){
    this.cellCount++;
    this.headCell = nextCell;
    return true;
  }  
  return false;
}

Glyph01.prototype.print = function(){
  var str = "";
  for(var x=0; x<this.sizeX; x++){
    for(var y=0; y<this.sizeY; y++){
      str+=this.grid[x][y]+"\t";
    }
    str+="\n";
  }
  console.log(str);
}




