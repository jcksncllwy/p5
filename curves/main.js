var canvasX;
var canvasY;
var canvas;

var controlPointsColor;
var curveColor;

var t;

var slider1 = $("#slider1");
var slider2 = $("#slider2");

slider1.on("change", function(evt) {
    clear();
    drawCurveTrail(slider2.slider("getValue"), evt.value.newValue);
});

slider2.on("change", function(evt) {
    clear();
    drawCurveTrail(evt.value.newValue, slider1.slider("getValue"));
});


function setup(){
    canvasX = windowWidth;
    canvasY = windowHeight;
    controlPointsColor = color(255, 102, 0);
    curveColor = color(0,0,0);
    t = 0;
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent("canvasContainer");
    noFill();
    strokeWeight(1);

}


function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasX = windowWidth;
    canvasY = windowHeight;
}

function draw(){
    clear();
    drawNoisyCurveTrail(10,0.01);
    //drawNoisyCurveTrailSideways(5,0.01);
    t+=0.001;
}

function drawCurve(){
    stroke(curveColor);
    bezier(85, 20, 10, 10, 90, 90, 15, 80);
}

function drawNoisyCurveTrail(inc, noiseInc){
    if(!inc){inc = 1;}
    var noiseI = 0;
    var noiseJ = 0;
    var overflowX = 100;
    var overflowY = 100;
    for(var i=-overflowX; i<canvasX+overflowX; i+=inc){
        strokeWeight(map(noise(noiseI),0,1,0,10));
        var ctrl1x = map(avgNoise(noiseI+t, noiseJ+t),0,1,i-200,i+200);
        var ctrl2x = map(avgNoise(noiseI+t+200, noiseJ+t),0,1,i-200,i+200);

        var ctrl1y = map(avgNoise(noiseI+t+400, noiseJ+t),0,1,0,canvasY/2);
        var ctrl2y = map(avgNoise(noiseI+t+600, noiseJ+t),0,1,canvasY/2,canvasY);
        bezier(i,-overflowY,  ctrl1x,ctrl1y,  ctrl2x,ctrl2y,  i,canvasY+overflowY);
        noiseI+=noiseInc;
        noiseJ-=noiseInc;
    }
}

function drawNoisyCurveTrailSideways(inc, noiseInc){
    if(!inc){inc = 1;}
    var noiseI = 0;
    var noiseJ = 0;
    for(var i=0; i<canvasY; i+=inc){
        var ctrl1x = map(avgNoise(noiseI+t, noiseJ+t),0,1,0,canvasY/2);
        var ctrl2x = map(avgNoise(noiseI+t+200, noiseJ+t),0,1,canvasY/2,canvasY);

        var ctrl1y = map(avgNoise(noiseI+t+400, noiseJ+t),0,1,i-200,i+200);
        var ctrl2y = map(avgNoise(noiseI+t+600, noiseJ+t),0,1,i-200,i+200);
        bezier(0,i,  ctrl1x,ctrl1y,  ctrl2x,ctrl2y,  canvasX,i);
        noiseI+=noiseInc;
        noiseJ-=noiseInc;
    }
}

function avgNoise(i,j){
    return (noise(i+200)+noise(j+500))/2;
}

function drawCurveTrail(length, inc){
    if(!inc){inc = 1;}
    if(!length){length = 200}
    for(var i = 0; i<length; i+=inc){
        push();
        translate(i,0);
        drawCurve();
        pop();
    }
}

function drawCurveGrid(width, height){

}