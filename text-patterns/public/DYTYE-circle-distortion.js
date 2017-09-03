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
    'EYES? DO YOU TRUST YOUR',
    ];
    fontSize = 72;
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
        var wiggleMax = 50;
        var wiggleBounds = (sin(0.02*t)*wiggleMax)+wiggleMax;
        var wanderRadius = 200;
        var wanderSpeed = 1;
        var wanderIntensity = 0.01;        
        //drawWigglingPath(path, wiggleBounds, wiggleSpeed);        
        for(var i = 0; i<letterPaths.length; i++){
            var path = letterPaths[i];
            //drawSmoothWigglingPath(path, wiggleBounds, 0.01)
            drawBoundedWanderingPath(path, wanderRadius, wanderSpeed, wiggleBounds, 0.01)
        }
        t++;
    }
}

function drawBoundedWanderingPath(path, wanderRadius, wanderSpeed, wiggleBounds, wiggleIntensity){
    wanderRadius = Math.abs(wanderRadius);
    wanderSpeed = Math.abs(wanderSpeed);
    var primaryCSSColor = "#000000";
    var secondaryCSSColor = "#ff0000";

    for(var i=0; i<path.commands.length; i++){
        var cmd = path.commands[i];

        var originalPointIsWithinRadius = isPointWithinCircle(
            cmd.originalX,cmd.originalY,
            windowWidth/2, windowHeight/2,
            wanderRadius
        );
        var currentPointIsWithinRadius = isPointWithinCircle(
            cmd.x,cmd.y,
            windowWidth/2, windowHeight/2,
            wanderRadius
        );

        /*
         * Any points that start within the radius,
         * may wander anywhere within the radius
         */
        if(originalPointIsWithinRadius){
             /* Wander anywhere on the screen */
            nextX = cmd.x + map(noise(cmd.id + cmd.originalX + t/wanderSpeed), 0, 1, -wanderSpeed, wanderSpeed);
            nextY = cmd.y + map(noise(cmd.id + cmd.originalY + t/wanderSpeed), 0, 1, -wanderSpeed, wanderSpeed);

            nextX = nextX + ((cmd.originalX - nextX)/(wiggleBounds<1?1:wiggleBounds*wanderSpeed));
            nextY = nextY + ((cmd.originalY - nextY)/(wiggleBounds<1?1:wiggleBounds*wanderSpeed));
            /* Then apply bounds */
            var nextPointIsWithinRadius = isPointWithinCircle(
                nextX,nextY,
                windowWidth/2, windowHeight/2,
                wanderRadius
            );
            if(nextPointIsWithinRadius){
                cmd.x = nextX;
                cmd.y = nextY;
            }

            /* Paint paths that have a point within the bounds */
            path.fill = secondaryCSSColor;
        }

        /*
         * Other points wiggle near their original coordinates,
         * but never within the circle
         */
        if(!originalPointIsWithinRadius) {
            /* Wiggle around */
            nextX = cmd.originalX + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
            nextY = cmd.originalY + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
            /* Then apply bounds */
            var nextPointIsWithinRadius = isPointWithinCircle(
                nextX,nextY,
                windowWidth/2, windowHeight/2,
                wanderRadius
            );
            if(!nextPointIsWithinRadius){
                cmd.x = nextX;
                cmd.y = nextY;
            }
        }

    }
    
    path.draw(canvas.drawingContext);
}

function isPointWithinCircle(x,y, centerX, centerY, radius){
    return (pow((x - centerX), 2) + pow((y - centerY), 2)) < pow(radius,2);
}


function drawWanderingPath(path, wiggleBounds, wiggleIntensity){
    wiggleBounds = Math.abs(wiggleBounds);
    wiggleIntensity = Math.abs(wiggleIntensity);
    for(var i=0; i<path.commands.length; i++){
        var cmd = path.commands[i];
        cmd.x = cmd.x + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -1, 1);
        cmd.y = cmd.y + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -1, 1);
    }
    path.draw(canvas.drawingContext);
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