function Glyph02(sizeX, sizeY){
  this.grid = new Grid(sizeX, sizeY);
  this.heads = [];
}

Glyph02.prototype.grow = function(){
  this.seed();
  while(this.grid.getCellsOfValue(1).length>0){
    this.step();
    this.print();
  }
}

Glyph02.prototype.isGrown = function(){
  var levelOnes = this.grid.getCellsOfValue(1);
  return levelOnes.length==0; 
}

Glyph02.prototype.seed = function(){
  var halfwayX = Math.floor(this.grid.sizeX/2);
  var halfwayY = Math.floor(this.grid.sizeY/2);
  var quarterY = Math.floor(halfwayY/2);
  var quarterX = Math.floor(halfwayX/2);
  for(var x = halfwayX; x<halfwayX+1; x++){
    for(var y = halfwayY; y<halfwayY+1; y++){
      this.grid.setCell([x,y], 1);
    } 
  }
}

Glyph02.prototype.step = function(){
  var self = this;

  var levelFives = self.grid.getCellsOfValue(5);
  self.grid.forEachCellRandomly(levelFives, function(cell){
    var surrounding = self.grid.getSurroundingCells(cell, 2);
    var zeroCells = self.grid.filterCellsByValue(surrounding, 0);    
    for(var j=0; j<zeroCells.length; j++){
      self.grid.setCell(zeroCells[j], -1);
    }
    self.grid.setCell(cell, 6);
  });

  var levelFours = self.grid.getCellsOfValue(4);
  var randomLevelFour = self.grid.getRandomCell(levelFours);
  if(randomLevelFour && random(100)<1){
    self.grid.setCell(randomLevelFour, 1);

    var surroundingCells = self.grid.getSurroundingCells(randomLevelFour,2);
    var negativeSurroundingCells = self.grid.filterCellsByValue(surroundingCells, -1);
    for(var j=0; j<negativeSurroundingCells.length; j++){
      self.grid.setCell(negativeSurroundingCells[j], 0);
    }
  }
  levelFours = self.grid.getCellsOfValue(4);
  self.grid.forEachCellRandomly(levelFours, function(cell){
    self.grid.setCell(cell, 5);    
  });


  var levelThrees = self.grid.getCellsOfValue(3);
  self.grid.forEachCellRandomly(levelThrees, function(cell){
    var surrounding = self.grid.getSurroundingCells(cell, 1);
    var zeroCells = self.grid.filterCellsByValue(surrounding, 0);    
    for(var j=0; j<zeroCells.length; j++){
      self.grid.setCell(zeroCells[j], -1);
    }
    self.grid.setCell(cell, 4);
  })

  var levelTwos = self.grid.getCellsOfValue(2);
  self.grid.forEachCellRandomly(levelTwos, function(cell){
    self.grid.setCell(cell, 3);
  })  

  var levelOnes = self.grid.getCellsOfValue(1);  

  self.grid.forEachCellRandomly(levelOnes, function(cell){
    //set original levelOne cell to 2
    self.grid.setCell(cell, 2);

    //set the next cell to 1
    var adjacentCells = self.grid.getAdjacentCells(cell);
    var zeroCells = self.grid.filterCellsNotOfValue(adjacentCells, 0);
    var nextCell = self.grid.getRandomCell(zeroCells);//zeroCells[2]?zeroCells[2]:(zeroCells[1]?zeroCells[1]:zeroCells[0]);//
    if(random(10)<1){
      nextCell=self.grid.getRandomCell(zeroCells);;
    }
    if(nextCell){
      self.grid.setCell(nextCell, 1);
    } else {
      var negativeCells = self.grid.getCellsOfValue(-1);      
      var negativesWithZeroAdjacentCell = self.grid.filterCells(negativeCells, function(cell){
        var surroundingCells = self.grid.getSurroundingCells(cell, 2);
        var zeros = self.grid.filterCellsByValue(surroundingCells, 0);
        return zeros.length>0;
      });
      var newGrowthPossibileCells = self.grid.filterCells(negativesWithZeroAdjacentCell, function(cell){
        var adjacents = self.grid.getAdjacentCells(cell);
        var nonZeros = self.grid.filterCells(adjacents, function(cell){
          return self.grid.getCell(cell)>0;
        });
        return nonZeros.length>0;
      });
      var newGrowthCell = self.grid.getRandomCell(newGrowthPossibileCells);
      if(newGrowthCell){
        var surroundingCells = self.grid.getSurroundingCells(newGrowthCell, 1)
        var negativeSurroundingCells = self.grid.filterCellsByValue(surroundingCells, -1);        
        for(var j=0; j<negativeSurroundingCells.length; j++){
          self.grid.setCell(negativeSurroundingCells[j], 0);
        }
        self.grid.setCell(newGrowthCell, 1);
      }
    }
  });  

}

Glyph02.prototype.print = function(){
  this.grid.print();
}