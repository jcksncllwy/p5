var canvasX;
var canvasY;

function setup(){
	canvasX = windowWidth;
	canvasY = windowHeight;

	createCanvas(canvasX,canvasY);
	background(color(0,0,0));
	for(var x=0; x<canvasX; x+=1){
		for(var yOffset=-canvasY; yOffset<canvasY; yOffset+=100 ){			
			var yPrime = (yGen1(x-offset1-yOffset)+yGen1(x/2 + offset1+yOffset))/2;
			var y = yPrime+yOffset;
			setGradient(x, y, 1, 100, color(255, 0, 0), color(0, 0, 255), Y_AXIS);		
		}
	}
	offset1+=2;
}

function yGen1(x){
	var chaos = 0.01;
	return noise(x*chaos)*canvasY;
}

function yGen2(x){
	var chaos = 0.002;
	return noise(x*chaos)*canvasY;
}



function draw(){	
	//background(color(0,0,0));
	stroke(255);
	//drawPointLines();
	
}

var offset1 = 0;
var offset2 = 10;
function drawPointLines(){
	for(var x=0; x<canvasX; x+=1){
		for(var yOffset=-canvasY; yOffset<canvasY; yOffset+=100 ){			
			var yPrime = (yGen1(x-offset1-yOffset)+yGen1(x/2 + offset1+yOffset))/2;
			var y = yPrime+yOffset;
			setGradient(x, y, 1, 100, color(255, 0, 0), color(0, 0, 255), Y_AXIS);		
		}
	}
	offset1+=2;

	
}

var Y_AXIS = 1;
var X_AXIS = 2;
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i+=5) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i+=5) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}


function drawPointLine(yGenerator, yOffset){
	var lastYVal = yGenerator(0);

	for(var x=0; x<canvasX; x++){
		var y = yGenerator(x+offset)+yOffset;
		line(x, lastYVal, x, y);
		lastYVal = y;
	}
	
}


