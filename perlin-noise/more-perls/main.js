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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasX = windowWidth;
    canvasY = windowHeight;
}

var t=0;
function draw(){
    clear();
    push();

    var waveGenerator = function(i, count){
        return averageWaves(i,[
            {
                jitter: 0.01,
                speed: 0.5,
                phase: map(noise(count),0,1,0,1000),
                amp: 3

            },
            {
                jitter: 0.01,
                speed: -0.5,
                phase: map(noise(count*200),0,1,0,1000),
                amp: 3
            }
        ])
    };

    drawWaveSea(0, 0, canvasX, canvasY, 10, waveGenerator);

    //plotPerlinSea(0, canvasY, 20, true);
    //plotPerlinSea(0, canvasY/4, 20, false);
    //stroke(0);
    //line(0,canvasY/4, canvasX, canvasY/4);
    pop();
    t+=2;
}

var drawWaveSea = function(cornerX, cornerY, seaWidth, seaHeight, max, waveGenerator){
    for(var count = max; count>=0; count--){
        fill(
            map(count, 0,max,0,255),
            map(count, 0,max,255,0),
            255
        );
        var y = cornerY+(seaHeight/max)*count;


        drawWaveShape(cornerX, y, seaWidth, seaHeight/max, 1, function(i){
            return waveGenerator(i, count);
        });

        //draw padding
        if(count>0){
            rect(cornerX, cornerY+(seaHeight/max)*(count-1), seaWidth, seaHeight/max +1);
        }
    }
};

//draw a wave within a box defined by a corner point (x,y) and the boxes width and height
//resolution determines how many vertices are in the finished shape
var drawWaveShape = function(x, y, width, height, resolution, wave){

    beginShape();
    vertex(x,y);
    for(var i = 0; i<width; i+=resolution){
        var vX = x+i;

        var w = null;
        if(typeof wave === "function"){
            w = wave(i);
        }
        else {
            w = timeBasedPerlinNoise(i,t,wave.speed,wave.phase,wave.jitter);
        }
        var vY = y;
        if(typeof wave.amp === "number"){
            vY = y + w * amp;
        } else {
            vY =y+map(w, 0, 1, 0, height); //dynamically maps maximum wave value to height of containing box
        }

        vertex(vX,vY);
    }
    vertex(x+width,y);
    endShape();
};

//computes average noise value for input i given an arbitrary number of wave definitions
var averageWaves = function(i, waves){
    var sum = 0;
    for(var w = 0; w<waves.length; w++){
        sum += timeBasedPerlinNoise(i,t,waves[w].speed,waves[w].phase,waves[w].jitter,waves[w].amp);
    }
    return sum/waves.length;
};

function timeBasedPerlinNoise(i, time, speed, phase, jitter, amp){
    amp = amp?amp:1;
    return noise( (i + time * speed + phase) * jitter ) * amp;
}

function simplePerlinWave(xIn, jitter, noiseOffset){
    return noise((xIn+t+noiseOffset)*jitter);
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




