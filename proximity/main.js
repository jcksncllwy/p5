var canvasX;
var canvasY;

var grid = [];
var gridSizeX;
var gridSizeY;

var particles = []
var particleCount = 100
var particleSize = 5

function setup(){
	canvasX = windowWidth
	canvasY = windowHeight

	gridSizeX = windowWidth
	gridSizeY = windowHeight

	createCanvas(canvasX,canvasY)
	background(0)
	
	setupGrid()
	setupParticles()
}

function setupGrid(){
	//fill in cells in the simulation grid
	for(var x=0; x<gridSizeX; x++){
		if(!grid[x]){ grid[x] = [] } //need a 2d array
		for(var y=0; y<gridSizeY; y++){
			grid[x][y] = newCell(x,y)
		}
	}
}

function newCell(x,y){
	return {
		x:x,
		y:y,
		particle: null
	}
}

function setupParticles(){
	var beginCenterX = windowWidth/2 - particleCount/2
	var endCenterX = windowWidth/2 + particleCount/2
	var beginCenterY = windowHeight/2 - particleCount/2
	var endCenterY = windowHeight/2 + particleCount/2

	forEachCell(function(cell){
		if(cell.x > beginCenterX && cell.x < endCenterX){
			cell.particle = newParticle(cell)
			particles.push(cell.particle)
		}
	})
}

function forEachCell(thingToDo){
	for(var x=0; x<gridSizeX; x++){
		for(var y=0; y<gridSizeY; y++){
			thingToDo(grid[x][y])
		}
	}
}

function newParticle(cell){
	return{
		cell: cell,
		size: particleSize,
		getNeighborParticles: function(){
			neighborParticles = []
			for(var x=cell.x-particleSize/2; x<cell.x+particleSize/2; x++){
				for(var y=cell.y-particleSize/2; y<cell.y+particleSize/2; y++){
					var particle = grid[x][y].particle
					if(particle){ neighborParticles.push(particle) }
				}
			}
			return neighborParticles
		}
	}
}

function draw(){

}
