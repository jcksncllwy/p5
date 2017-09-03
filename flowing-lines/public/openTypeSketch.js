var path;
var canvas;
var str;
var fontSize;
var t;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);    

    t = 0;    
    str = 'CANYOUTRUSTYOUREYES?';
    fontSize = 72;  

    opentype.load('../fonts/PressStart2P.ttf', function(err, font) {
        if (err) {
             alert('Font could not be loaded: ' + err);
        } else {            
            var x = windowWidth/2 - (str.length/2*fontSize);
            var y = windowHeight/2 + (fontSize/2);
            path = font.getPath(str, x, y, fontSize);
            for(var i=0; i<path.commands.length; i++){
                var cmd = path.commands[i];
                cmd.originalX = cmd.x;
                cmd.originalY = cmd.y;     
                cmd.id = random(999999);
            }
        }
    });
}

function draw(){
    if(path){
        clear();
        var wiggleMax = 50;
        var wiggleBounds = (sin(0.005*t)*wiggleMax)+wiggleMax;
        //drawWigglingPath(path, wiggleBounds, wiggleSpeed);
        drawSmoothWigglingPath(path, wiggleBounds, 0.01)
        t++;
    }
}

function drawSmoothWigglingPath(path, wiggleBounds, wiggleIntensity){
    wiggleBounds = Math.abs(wiggleBounds);
    wiggleIntensity = Math.abs(wiggleIntensity);
    for(var i=0; i<path.commands.length; i++){
        var cmd = path.commands[i];
        cmd.x = cmd.originalX + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
        cmd.y = cmd.originalY + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
    }
    path.draw(canvas.drawingContext);
}

function drawWigglingPath(path, wiggleBounds, wiggleIntensity){
    wiggleBounds = Math.abs(wiggleBounds);
    wiggleIntensity = Math.abs(wiggleIntensity);
    for(var i=0; i<path.commands.length; i++){
        var cmd = path.commands[i];            
        
        var maybeX = cmd.x + random(-wiggleIntensity,wiggleIntensity);
        if(maybeX>cmd.originalX+wiggleBounds){
            maybeX = cmd.originalX+wiggleBounds;
        } else if(maybeX<cmd.originalX-wiggleBounds){
            maybeX = cmd.originalX-wiggleBounds;
        }
        cmd.x = maybeX;

        var maybeY = cmd.y + random(-wiggleIntensity,wiggleIntensity);
        if(maybeY>cmd.originalY+wiggleBounds){
            maybeY = cmd.originalY+wiggleBounds;
        } else if(maybeY<cmd.originalY-wiggleBounds){
            maybeY = cmd.originalY-wiggleBounds;
        }
        cmd.y = maybeY;
        
    }
    path.draw(canvas.drawingContext);
}