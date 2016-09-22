var canvasX;
var canvasY;

function setup(){
    canvasX = windowWidth;
    canvasY = windowHeight;
    createCanvas(canvasX, canvasY);
    noStroke();
    angleMode(RADIANS);
}


function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}

var t=0;
function draw(){
    clear();
    push();
    plotPerlinSea(0, canvasY/4, 20, true);
    //plotPerlinSea(0, canvasY/4, 20, false);
    //stroke(0);
    //line(0,canvasY/4, canvasX, canvasY/4);
    pop();
    t+=2;
}

function plotPerlinSea(startY, endY, count, invert){
    var drawSea = function(i){
        push();
        var yTranslate = invert ? endY-i : i;
        translate(0,yTranslate);

        fill(
            map(yTranslate, startY, endY, invert?255:0, invert?0:255),
            map(yTranslate, startY, endY, invert?0:255, invert?255:0),
            255
        );

        var individualNoiseWaveOffset = noise(i)*canvasX/2;
        invert ? plotInvertedPerlinWave(individualNoiseWaveOffset) : plotPerlinWave(individualNoiseWaveOffset);

        pop();
    };

    var inc = (endY-startY)/count;
    var i = startY;
    while(i<endY){
        drawSea(i);
        i+=inc;
    }
    pop();
}

function duplexPerlinWave(wave, otherWave){
    return (wave + otherWave)/2;
}

function simplePerlinWave(xIn, jitter, noiseOffset){
    return noise((xIn+t+noiseOffset)*jitter);
}

function plotPerlinWave(noiseOffset){
    var inc = 6;
    var jitter = 0.01;
    beginShape();
    vertex(0,canvasY);
    for(var x = 0; x<canvasX; x+=inc){
        var w1 = simplePerlinWave(x, jitter, noiseOffset);
        var w2 = simplePerlinWave(-x, jitter, noiseOffset);
        var dw = duplexPerlinWave(w1,w2);
        var y = map(dw, 0, 1, 0, canvasY);
        vertex(x,y);
    }
    vertex(canvasX,canvasY);
    endShape();
}

function plotInvertedPerlinWave(noiseOffset){
    var inc = 6;
    var jitter = 0.01;
    beginShape();
    vertex(0,0);
    for(var x = 0; x<canvasX+inc; x+=inc){
        var w1 = simplePerlinWave(x, jitter, noiseOffset);
        var w2 = simplePerlinWave(-x, jitter, noiseOffset);
        var dw = duplexPerlinWave(w1,w2);
        var y = map(dw, 0, 1, 0, 100);
        vertex(x,y);
    }
    vertex(canvasX,0);
    endShape();
}




