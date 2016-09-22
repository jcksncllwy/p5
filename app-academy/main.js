var canvasX;
var canvasY;

function setup(){
	canvasX = windowWidth;
	canvasY = windowHeight;
	createCanvas(canvasX, canvasY);
    noStroke();

    blendMode(EXCLUSION);


}



function drawCircleGrid(offset){
    for(var x=0+offset; x<canvasX; x+=100){
        for(var y=0+offset; y<canvasY; y+=100){
            ellipse(x,y,100,100);
        }
    }
}

var t=0;

function draw(){
    clear();

    fill(255,0,0);
    drawCircleGrid(0+t);

    fill(0,255,0);
    drawCircleGrid(5+t);

    fill(0,0,255);
    drawCircleGrid(10+t);
    t++;
}




