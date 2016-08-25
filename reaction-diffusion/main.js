var canvasX;
var canvasY;

var grid;
var lastGrid;

var diffusionRateA = 1;
var diffusionRateB = 0.5;
var feedRate = 0.055;
var killRate = 0.062;

var laplacianWeightsA = [
	[0.05, 0.2, 0.05],
	[0.2 , -1 , 0.2	],
	[0.05, 0.2, 0.05]
];

var laplacianWeightsB = [
	[0.05, 0.2, 0.05],
	[0.2 , -1 , 0.2	],
	[0.05, 0.2, 0.05]
];

function setup(){
	canvasX = 100;
	canvasY = 100;
	createCanvas(canvasX,canvasY);
	pixelDensity(1);
	grid = newGrid();
	lastGrid = newGrid();
	iterateThisManyTimes(10000);
}

function draw(){
	background(51);
	loadPixels();	
	forEachCell(grid, function(cell, x, y){		
		var pixelIndex = (x+y*width)*4;
		pixels[pixelIndex+0] = 255 * cell.a; //red
		pixels[pixelIndex+1] = 0;	//green
		pixels[pixelIndex+2] = 255 * cell.b;	//blue
		pixels[pixelIndex+3] = 255; //alpha
	});	
	updatePixels();

}

function iterateThisManyTimes(iterations){
	for(var i=0; i<iterations; i++){
		var updatedGrid = updateGrid(grid, lastGrid);
		lastGrid = updatedGrid;
	}
	return updatedGrid;
}

function newGrid(){
	var grid = [];
	for(var x = 0; x<width; x++){
		grid[x] = [];
		for(var y = 0; y<height; y++){
			grid[x][y] = newCell(x, y);
		}
	}
	return grid;
}

function newCell(x, y){
	var a = 0;
	var b = 0;
	if(x>=width/2-5 && x<width/2+5
	&& y>=height/2-5 && y<height/2+5){
		b = 1;
	}
	return {
		'a':a,
		'b':b
	}
}

function forEachCell(grid, anon){
	for(var x = 0; x<grid.length; x++){
		for(var y = 0; y<grid[x].length; y++){
			anon(grid[x][y], x, y);
		}
	}
}


//DOES THIS WORK???
function forEachCellRandomly(grid, anon){
	var copy = copyGrid(grid);
	var totalCells = grid.length * grid[0].length;
	while(totalCells>0){
		var x = Math.floor(random(grid.length));
		var y = Math.floor(random(grid[x].length));
		anon(grid[x][y], x, y);
		grid[x].splice(y,1);
		totalCells--;
	}
}

function updateGrid(grid, lastGrid){
	forEachCell(lastGrid, function(cell, x, y){
		grid[x][y].a = constrain(updateCellA(lastGrid, x, y), 0, 1);
		grid[x][y].b = constrain(updateCellB(lastGrid, x, y), 0, 1);
	})
	return grid;
}

function updateCellA(grid, x, y){
	var laplacian = laplace3(grid, x, y, laplacianWeightsA, "a");
	var cellA = grid[x][y].a;
	var cellB = grid[x][y].b;
	return cellA + (diffusionRateA*laplacian - cellA*cellB*cellB + feedRate*(1-cellA))*1.5;
}

function updateCellB(grid, x, y){
	var laplacian = laplace3(grid, x, y, laplacianWeightsB, "b");
	var cellA = grid[x][y].a;
	var cellB = grid[x][y].b;
	return cellB + (diffusionRateB*laplacian + cellA*cellB*cellB - cellB*(feedRate+killRate))*1.5;
}

function copyGrid(grid){
	var copy = [];
	for(var x = 0; x<width; x++){
		copy[x] = [];
		for(var y = 0; y<height; y++){
			copy[x][y] = grid[x][y];
		}
	}
	return copy;
}

function laplace3(grid, x, y, weights, cellProperty){
	var result = 0;
	forEachCell(weights, function(weight, wX, wY){
		var currentX = x+(wX-1);
		var currentY = y+(wY-1);
		if(currentX>=0 && currentY>=0
		&& currentX<grid.length && currentY<grid[currentX].length){
			var cell = grid[x+(wX-1)][y+(wY-1)];
			result += cell[cellProperty] * weight;
		}
	})
	return result;
}









