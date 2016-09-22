var canvasX;
var canvasY;
var centerX;
var centerY;

function setup(){
    canvasX = windowWidth;
    canvasY = windowHeight;
    centerX = windowWidth/2;
    centerY = windowHeight/2;

    createCanvas(canvasX, canvasY);
    noStroke();
    blendMode(DIFFERENCE);
}


function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}

var t=0;
function draw(){
    clear();
    push();
    var particleSize = 100;
    translate(particleSize/4,particleSize/4);
    for(var x=-100; x<canvasX+100; x+=particleSize+20){
        for(var y=-100; y<canvasY+100; y+=particleSize+20){
            drawVoidParticle(x,y,100);
        }
    }

    pop();
    t+=1;
}


function drawVoidParticle(x,y,size){
    function drawNoiseCircle(thing1,thing2){
        var xNoiseOffset = noise(thing1)*100;
        var yNoiseOffset = noise(thing2)*100;
        ellipse(x+purelinNoise(t,null,xNoiseOffset,20),y+purelinNoise(t,null,yNoiseOffset,20),size,size);
    }

    fill(255,0,0);
    drawNoiseCircle(x+10,y+3);
    fill(0,255,0);
    drawNoiseCircle(x+2,y+12);
    fill(0,0,255);
    drawNoiseCircle(x+32,y+1);

    fill(255,255,255);
    drawNoiseCircle(x+20,y+30);
}



function drawRainbowParticle(){
    fill(255,0,0);
    drawChaosCircle();
    fill(0,255,0);
    drawChaosCircle();
    fill(0,0,255);
    drawChaosCircle();
}

function drawChaosCircle(){
    var xOffset = random()*100;
    var yOffset = random()*100;
    ellipse(centerX+purelinNoise(t,null,xOffset,20),centerY+purelinNoise(t,null,yOffset,20),100,100);
}

function purelinNoise(x, freq, offset, amp){
    freq=freq?freq:0.005;
    amp=amp?amp:1;
    offset=offset?offset:0;
    return map(noise((x+offset)*freq), 0,1, -amp, amp);
}
