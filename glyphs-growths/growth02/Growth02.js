function Growth02(sizeX, sizeY){
  this.sizeX = sizeX;
  this.sizeY = sizeY
  this.grid = new Grid(sizeX, sizeY);
}

Growth02.prototype.seed(){
  for(var x = 0; x<this.sizeX; x++){
    for(var y = 0; y<this.sizeY; y++){
      this.grid[x][y] = new Cell(x, y, grid);
    }
  }
}

function Cell(x, y, grid){
  this.grid = grid;
  this.x = x;
  this.y = y;
  this.age = 0;
  this.soul = 'bright'
}