var letterPaths;
var canvas;
var strs;
var fontSize;
var leading;
var t;

/**
Next thing! Have all the path points wander within a bounding circle
    or even better, a bounding shape!
**/

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    t = 0;
    letterPaths = [];    
    strs = ['CAN YOU', 'TRUST', 'YOUR EYES?'];
    strs = [
    'DO YOU TRUST YOUR EYES?',
    'YOU TRUST YOUR EYES? DO',
    'TRUST YOUR EYES? DO YOU',
    'YOUR EYES? DO YOU TRUST',
    'EYES? DO YOU TRUST YOUR',
    'DO YOU TRUST YOUR EYES?',
    'YOU TRUST YOUR EYES? DO',
    'TRUST YOUR EYES? DO YOU',
    'YOUR EYES? DO YOU TRUST',
    
    ];
    fontSize = 40;
    leading = 10;

    opentype.load('../fonts/PressStart2P.ttf', function(err, font) {
        if (err) {
             alert('Font could not be loaded: ' + err);
        } else {
            setupText(font);
        }
    });
}

function setupText(font){    
    for(var s=0; s<strs.length; s++){
        var str = strs[s];
        var x = windowWidth/2 - (str.length/2*fontSize);
        var totalTextHeight = strs.length * (fontSize + leading-1);
        var currentTextHeight = s * (fontSize + leading-1);
        var y = windowHeight/2 - totalTextHeight/2 + currentTextHeight + fontSize;
        var path = font.getPath(str, x, y, fontSize);
        letterPaths.push(path);
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];
            cmd.originalX = cmd.x;
            cmd.originalY = cmd.y;
            cmd.id = random(999999);
        }
    }
}

function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    if(letterPaths.length>0){
        clear();
        background(255);
        for(var i = 0; i<letterPaths.length; i++){
            var path = letterPaths[i];
            PathDrawingTools.drawMarquee(path, 1+i);
        }
        t++;
    }
}