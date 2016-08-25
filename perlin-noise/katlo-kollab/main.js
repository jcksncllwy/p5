var canvasX;
var canvasY;

var perlinCount1 = 0;
var perlinInc1 = 0.1;
var perlinCount2 = 10000000;
var perlinInc2 = 0.001;

var lineCount = 4;

var pixelYValuesByLine = [];


function setup(){
	canvasX = windowWidth;
	canvasY = windowHeight;

	createCanvas(canvasX,canvasY);
	for(var line=0; line<lineCount; line++){
		pixelYValuesByLine[line] = [];
		for(var x=0; x<canvasX; x++){
			pixelYValuesByLine[line].push(canvasY/2);
		}
	}
	
	
}



function draw(){	
	background(color(0,0,0));
	noiseValue2 = noise(perlinCount2);

	for(var notLine=0; notLine<lineCount; notLine++){
		console.log(notLine);
		for(var x = 0; x<canvasX; x++){
			var noiseValue = noise(perlinCount1, perlinCount2);
			stroke(color((notLine*123)%255,(notLine*160)%255,(notLine*200)%255));
			var y = (pixelYValuesByLine[notLine][x] + noiseValue*10 + (notLine*10) )%canvasY;
			if(x>0){
				line(x-1,pixelYValuesByLine[notLine][x-1], x, y);
			}
			line(x,pixelYValuesByLine[notLine][x], x, y);
			perlinCount1+=perlinInc1;

			pixelYValuesByLine[notLine][x]=y;
		}
	}

	perlinCount2+=perlinInc2;

}
