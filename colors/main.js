var canvasX;
var canvasY;
var canvas;

var t;
var bloops = [];
var selectedBloop;

function setup(){
    canvasX = windowWidth;
    canvasY = windowHeight;
    t = 0;
    canvas = createCanvas(canvasX, canvasY);
    canvas.parent("canvasContainer");
    colorMode(HSB, 100);
    noStroke();
}

function keyPressed(){
    if(keyCode==ENTER){
        var fs = fullscreen();
        fullscreen(!fs);
    }
}

function mousePressed() {
    var bloop = {
        x: mouseX,
        y: mouseY,
        r: 0.1
    }
    selectedBloop = bloop;  
    bloops.push(bloop);
    console.log(bloop);
}

function mouseReleased() {
    console.log(selectedBloop);
    selectedBloop = null;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasX = windowWidth;
    canvasY = windowHeight;
}

function draw(){
    clear();

    var x=t%1;
    background(color(100*x, 100, 100))

    if(selectedBloop){
        selectedBloop.r = selectedBloop.r * 1.1;
    } 

    var y = ((100*x) + 50)%100; //opposite color
    fill(color(y, 100, 100));
    for(var i in bloops){
        ellipse(
            bloops[i].x,
            bloops[i].y,
            bloops[i].r,
            bloops[i].r
        );
    }   

    t+=0.001;    
}
