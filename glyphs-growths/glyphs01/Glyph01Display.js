var cellCountX = 5;
var cellCountY = 5;
var glyphCountX = 20;
var glyphCountY = 20;
var canvasX = 800;
var canvasY = 800;

var glyphPaddingFactorX = 1.2;
var glyphPaddingFactorY = 1.2;
var cellSizeX = canvasX/glyphCountX/cellCountX;
var cellSizeY = canvasY/glyphCountY/cellCountY;
var glyphSizeX = cellCountX*cellSizeX;
var glyphSizeY = cellCountY*cellSizeY;


var clock = 0;

function setup(){
	createCanvas(canvasX,canvasY);	
}

function drawGlyph(glyph){
	for(var x=0;x<cellCountX;x++){
		for(var y=0;y<cellCountY;y++){
			if(glyph.grid[x][y]>0){
				rect(x*cellSizeX, y*cellSizeY, cellSizeX, cellSizeY);
			}			
		}
	}
}

function drawGlyphGrid(){
	for(var x=0; x<glyphCountX; x++){
		for(var y=0; y<glyphCountY; y++){
			var g = new Glyph01(cellCountX,cellCountY);
			g.grow();
			push();
			translate(x*glyphSizeX*glyphPaddingFactorX, y*glyphSizeY*glyphPaddingFactorY);
			fill(color(0, 255, 255-y*10));
			drawGlyph(g);
			pop();			
		}
	}
}

function draw(){
	noStroke();
	if(clock%50==0){
		background(color(255,85,225));
		
		drawGlyphGrid();
	}
	clock++;
}
