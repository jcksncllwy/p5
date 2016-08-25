function Grid(sizeX, sizeY){
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.grid = [];
	this.reset();
}

Grid.prototype.reset = function(){
  for(var i=0; i<this.sizeX; i++){
    this.grid[i] = [];
    for(var j=0; j<this.sizeY; j++){
      this.grid[i][j] = 0;
    }
  }
}

Grid.prototype.getCell = function(cell){
	return this.grid[cell[0]][cell[1]];
}

Grid.prototype.setCell = function(cell, val){
	this.grid[cell[0]][cell[1]] = val;	
}

Grid.prototype.forEachCellRandomly = function(cells, action){
	while(cells.length>0){
		var i = Math.floor(random(cells.length));
		action(cells[i]);
		cells.splice(i,1);
	}
}

Grid.prototype.incCell = function(cell, val){
	this.grid[cell[0]][cell[1]] += val?val:1;
}

Grid.prototype.getCellsOfValue = function(val){
	var cells = [];
	for(var x=0; x<this.sizeX; x++){
		for(var y=0; y<this.sizeY; y++){
			if(this.grid[x][y]==val){
				cells.push([x,y]);
			}
		}
	}
	return cells;
}

Grid.prototype.getAdjacentCells = function(cell){
  var neighbors = [
    [cell[0]+1,cell[1]  ],//right
    [cell[0]-1,cell[1]  ],//left
    [cell[0]  ,cell[1]-1],//top
    [cell[0]  ,cell[1]+1] //bottom    
  ];  

  return this.filterOffGridCells(neighbors)
}

Grid.prototype.getRandomAdjacentCell = function(cell){
	var adjacents = this.getAdjacentCells(cell);
	return adjacents[Math.floor(random(adjacents.length))]; 
}

Grid.prototype.getRandomAdjacentZeroCell = function(cell){
	var adjacents = this.getAdjacentCells(cell);
	var zeroCells = this.filterNonZeroCells(adjacents)
	if(zeroCells.length==0){return false;}
	return zeroCells[Math.floor(random(zeroCells.length))]; 
}

Grid.prototype.getRandomAdjacentCellOfValue = function(cell, val){
	var adjacents = this.getAdjacentCells(cell);
	var zeroCells = this.filterNonZeroCells(adjacents)
	if(zeroCells.length==0){return false;}
	return zeroCells[Math.floor(random(zeroCells.length))]; 
}

Grid.prototype.getCornerCells = function(cell){
  var neighbors = [    
    [cell[0]+1,cell[1]-1],//top-right
    [cell[0]+1,cell[1]+1],//bottom-right
    [cell[0]-1,cell[1]-1],//top-left
    [cell[0]-1,cell[1]+1] //bottom-left
  ];  

  return this.filterOffGridCells(neighbors);
}

Grid.prototype.getSurroundingCells = function(cell, level){
	if(!level){
		level=1;
	}
	var surrounding = [];
	for(var x = -level; x<=level; x++){
		for(var y = -level; y<=level; y++){
			if(!(x==0&&y==0)){
				surrounding.push([cell[0]+x, cell[1]+y]);
			}			
		}
	}
	return this.filterOffGridCells(surrounding);
}

Grid.prototype.getSurroundingZeroCells = function(cell){
	var surroundingCells = this.getSurroundingCells(cell);
	return this.filterNonZeroCells(surroundingCells);	
}

Grid.prototype.getRandomSurroundingCell = function(cell){
	var surroundingCells = this.getSurroundingCells(cell);
	return surroundingCells[Math.floor(random(surroundingCells.length))];
}

Grid.prototype.getRandomSurroundingZeroCell = function(cell){
	var zeroCells = this.getSurroundingZeroCells(cell);
	if(zeroCells.length==0){ return false; }
	return zeroCells[Math.floor(random(zeroCells.length))];
}

Grid.prototype.getRandomCell = function(cells){	
	if(cells.length==0){return false;}
	return cells[Math.floor(random(cells.length))];
}

Grid.prototype.filterCellsByValue = function(cells, val){
	var filtered = [];
	for(var i=0; i<cells.length; i++){
		var cell = cells[i];
		var x = cell[0];
		var y = cell[1];
		if(this.grid[x][y]==val){
			filtered.push(cell);
		}		
	}
	return filtered;
}

Grid.prototype.filterCells = function(cells, condition){
	var filtered = [];
	for(var i=0; i<cells.length; i++){
		var cell = cells[i];
		if(condition(cell)){
			filtered.push(cell);
		}		
	}
	return filtered;
}

Grid.prototype.cellHasAtLeastSoManySurroundingCellsOfValue = function(cell, count, val, level){
	var self = this;
	var surrounding = self.getSurroundingCells(cell, level);
	console.log(cell, surrounding);
	var matchingSurrounding = self.filterCells(surrounding, function(surroundingCell){		
		return self.getCell(surroundingCell)==val;
	});
	return matchingSurrounding.length>count;
}

Grid.prototype.cellHasAdjacentOfValue = function(cell, val){
	var self = this;
	var adjacents = self.getAdjacentCells(cell);
	var matchingAdjs = self.filterCells(adjacents, function(adjCell){		
		return self.getCell(adjCell)==val;
	});
	return matchingAdjs.length>0;
}

Grid.prototype.filterCellsNotOfValue = function(cells, val){
	var filtered = [];
	for(var i=0; i<cells.length; i++){
		var cell = cells[i];
		var x = cell[0];
		var y = cell[1];
		if(this.grid[x][y]==val){
			filtered.push(cell);
		}		
	}
	return filtered;
}

Grid.prototype.filterNonZeroCells = function(cells){
	return this.filterCellsNotOfValue(cells, 0);
}

Grid.prototype.filterOffGridCells = function(cells){
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

Grid.prototype.getRandomZeroEdgeCell = function(){
  var edgeCells = this.getZeroEdgeCells();  
  if(edgeCells.length==0){
    return false;
  }
  return edgeCells[Math.floor(random(edgeCells.length))];
}

Grid.prototype.getZeroCells = function(){
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

Grid.prototype.getZeroEdgeCells = function(){
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

Grid.prototype.getRandomZeroCell = function(){
  var zeroCells = this.getZeroCells();
  if(zeroCells.length==0){
    return false;
  }
  return zeroCells[Math.floor(random(zeroCells.length))];
}

Grid.prototype.print = function(){
  var str = "";
  for(var x=0; x<this.sizeX; x++){
    for(var y=0; y<this.sizeY; y++){
      str+=this.grid[x][y]+"\t";
    }
    str+="\n";
  }
  console.log(str);
}


