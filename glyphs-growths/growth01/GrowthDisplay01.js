var canvasX;
var canvasY;

var cellCountX;
var cellCountY;

var glyphCountX;
var glyphCountY;

var glyphPaddingFactorX;
var glyphPaddingFactorY;
var cellSizeX;
var cellSizeY;
var glyphSizeX;
var glyphSizeY;
var glyph;

var clock;


function setup(){
	canvasX = windowWidth;
	canvasY = windowHeight;

	cellCountX = Math.floor(windowWidth/4);
	cellCountY = Math.floor(windowHeight/4);

	glyphCountX = 1;
	glyphCountY = 1;

	glyphPaddingFactorX = 1.1;
	glyphPaddingFactorY = 1.1;
	cellSizeX = canvasX/glyphCountX/cellCountX;
	cellSizeY = canvasY/glyphCountY/cellCountY;
	glyphSizeX = cellCountX*cellSizeX;
	glyphSizeY = cellCountY*cellSizeY;
	glyph = new Glyph02(cellCountX, cellCountY);

	clock = 0;


	createCanvas(canvasX,canvasY);
	background(color(0,0,0));	
	glyph.seed();
}

function drawGlyph(glyph){
	for(var x=0;x<cellCountX;x++){
		for(var y=0;y<cellCountY;y++){
			var cellVal = this.glyph.grid.getCell([x,y]);			
			if(cellVal>=1){
				fill(color(0, 255, 55*cellVal));				
				rect(x*cellSizeX, y*cellSizeY, cellSizeX, cellSizeY);
			}
			if(cellVal<0){
				fill(color(255, 0, 0));				
				rect(x*cellSizeX, y*cellSizeY, cellSizeX, cellSizeY);
			}
		}
	}
}

function drawGlyphGrid(){
	for(var x=0; x<glyphCountX; x++){
		for(var y=0; y<glyphCountY; y++){
			var g = new Glyph02(cellCountX,cellCountY);
			g.grow();
			push();
			translate(x*glyphSizeX*glyphPaddingFactorX, y*glyphSizeY*glyphPaddingFactorY);
			fill(color(0, 255, 255-y*10));
			drawGlyph(g);
			pop();			
		}
	}
}

var wait = 0;
var done = false;
function draw(){
	noStroke();
	background(color(0,0,0));
	if(wait==0){		
		glyph.step();
		//glyph.print();
		drawGlyph(glyph);		
	}
	if(glyph.isGrown()){
		console.log("DONE");		
		glyph=new Glyph02(cellCountX, cellCountY);
		glyph.seed();
		wait = 500;
	}
	if(wait>0){
		wait--;
		if(wait==1){
			background(color(0,0,0));
		}
	}
	clock++;	
}
