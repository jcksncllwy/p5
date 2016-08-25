var canvasX;
var canvasY;

var prevCells = [];

function setup(){
	pixelDensity(1);
	canvasX = windowWidth/2;
	canvasY = windowHeight/2;
	createCanvas(canvasX, canvasY);
	for(var x = 0; x<canvasX; x++){
		prevCells[x] = [];
		for(var y = 0; y<canvasY; y++){
			prevCells[x][y] = newCell(x,y);
		}
	}
}

function newCell(x,y){
	return {
		"x":x,
		"y":y,
		"earth": random(1),
		"water": random(1),
		"fire": random(1)
	}
}

function seed(){
	seedSquare(Math.floor(canvasX/2-40), Math.floor(canvasY/2-20), 50, 5, "earth", 1);
	seedSquare(Math.floor(canvasX/2-40), Math.floor(canvasY/2),    50, 5, "water", 1);
	seedSquare(Math.floor(canvasX/2-40), Math.floor(canvasY/2+20), 50, 5, "fire",  1);
}

function seedSquare(x, y, width, height, prop, val){
	for(var i=x; i<x+width; i++){
		for(var j=y; j<y+height; j++){
			var cell = prevCells[i][j];
			cell[prop] = val;
		}
	}

}

function draw(){
	loadPixels();	
	for(var x = 0; x<canvasX; x++){
		for(var y = 0; y<canvasY; y++){
			var pixelIndex = (x+y*canvasX)*4;
			var cell = prevCells[x][y];
			pixels[pixelIndex+0] = (cell.fire > cell.earth) && (cell.fire > cell.water) ? 255 : 0; //red
			pixels[pixelIndex+1] = (cell.earth> cell.water) && (cell.earth> cell.fire) 	? 255 : 0; //green
			pixels[pixelIndex+2] = (cell.water> cell.fire)  && (cell.water> cell.earth) ? 255 : 0; //blue
			pixels[pixelIndex+3] = 255; //alpha
		}
	}
	updatePixels();

	updateCells();


}


function updateCells(){
	var newCells = [];
	for(var x = 0; x<canvasX; x++){
		newCells[x] = [];
		for(var y = 0; y<canvasY; y++){
			var cell = prevCells[x][y];
			var nextCell = updateCell(cell);
			newCells[x][y] = nextCell;
		}
	}
	prevCells = newCells;
}

function updateCell(cell){
	var nextCell = newCell(cell.x, cell.y);
	nextCell.earth = cell.earth;
	nextCell.fire = cell.fire;
	nextCell.water = cell.water;
	/*
	var nearbyCells = getNearbyCells(cell, 2);		
	var totalEarth = 0;
	var totalFire = 0;
	var totalWater = 0;
	for(var i = 0; i<nearbyCells.length; i++){
		var nearbyCell = nearbyCells[i];
		totalEarth+=nearbyCell.earth;
		totalFire+=nearbyCell.fire;
		totalWater+=nearbyCell.water;
	}
	var avgEarth = totalEarth/nearbyCells.length;
	var avgFire = totalFire/nearbyCells.length;
	var avgWater = totalWater/nearbyCells.length;
	*/

	var earthLaplace = laplace3(cell, laplacianWeightsA, "earth");
	var waterLaplace = laplace3(cell, laplacianWeightsB, "water");
	var fireLaplace = laplace3(cell, laplacianWeightsC, "fire");

	nextCell.earth += earthLaplace;
	nextCell.earth -= fireLaplace;

	nextCell.fire += fireLaplace;
	nextCell.fire -= waterLaplace;

	nextCell.water += waterLaplace;
	nextCell.water -= earthLaplace;


	return nextCell;
}


function getNearbyCells(cell, nearness, xSpread, ySpread){
	var nearbyCells = [];
	xSpread = xSpread?xSpread:0;
	ySpread = ySpread?ySpread:0;
	for(var xOffset = -nearness-xSpread; xOffset<=nearness+xSpread; xOffset++){
		for(var yOffset = -nearness-ySpread; yOffset<=nearness+ySpread; yOffset++){
			var x = xOffset + cell.x;
			var y = yOffset + cell.y;
			if(
				x!=cell.x && y!=cell.y
			&&	x>=0 && y>=0
			&&	x<canvasX && y<canvasY){
				nearbyCells.push(prevCells[x][y]);
			}			
		}
	}
	return nearbyCells;
}

function forEach2D(arr, anon){
	for(var x = 0; x<arr.length; x++){
		for(var y = 0; y<arr[x].length; y++){
			anon(arr[x][y], x, y);
		}
	}
}

var laplacianWeightsA = [
	[0.05, 0.2, 0.05],
	[0.2 , -1 , 0.2	],
	[0.05, 0.2, 0.05]
];

var laplacianWeightsB = [
	[0.06, 0.1, 0.06],
	[0.1 , -1 , 0.1	],
	[0.06, 0.1, 0.06]
];

var laplacianWeightsC = [
	[0.04, 0.3, 0.04],
	[0.3 , -1 , 0.3	],
	[0.04, 0.3, 0.04]
];

function laplace3(targetCell, weights, cellProperty){
	var result = 0;

	forEach2D(laplacianWeightsA, function(weight, wX, wY){
		var currentX = targetCell.x+(wX-1);
		var currentY = targetCell.y+(wY-1);
		if(currentX>=0 && currentY>=0
		&& currentX<prevCells.length && currentY<prevCells[currentX].length){
			var cell = prevCells[targetCell.x+(wX-1)][targetCell.y+(wY-1)];
			result += cell[cellProperty] * weight;
		}
	})
	return result;
}












