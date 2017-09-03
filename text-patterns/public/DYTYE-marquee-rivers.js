var letterPaths;
var canvas;
var strs;
var fontSize;
var leading;
var t;

/*

NEXT UP 

Given a set of words, display them in a grid that fills the screen.
Width of each grid cell is the size of the largest word plus a space.

Shuffle the grid every so often.

Phrases should spontaneouly arise from the random ordering of the words,
both horizontally and vertically.

*/

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    t = 0;
    letterPaths = [];
    var wordString = 'DO YOU TRUST WHAT SEE EYES YOUR ME';
    var lines = 10;
    strs = [];
    for(var l=0; l<lines; l++){
        var str = [];
        var words = wordString.split(' ')
        while(words.length>0){
            var randomIndex = Math.floor(random(words.length));
            var word = words[randomIndex];
            words.splice(randomIndex, 1);
            var letters = word.split('');
            for(var w=0; w<letters.length; w++){
                str.push(letters[w]);
            }
            str.push(' ');
        }        
        strs.push(str);
    }
    console.log(strs);
    fontSize = 30;
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
        if(Array.isArray(str)){
            var arr = str;
            letterPaths.push([]);
            for(var q=0; q<arr.length; q++){
                var innerStr = arr[q];
                placeInnerStrPath(q, innerStr, arr, s, strs, font);
            }
        } else {
            placeStrPath(s, str, strs, font);
        }
    }
}

function placeInnerStrPath(q, innerStr, arr, s, strs, font){
    var x = windowWidth/2 - (arr.length/2*fontSize) + (q*fontSize);
    var totalTextHeight = strs.length * (fontSize + leading-1);
    var currentTextHeight = s * (fontSize + leading-1);
    var y = windowHeight/2 - totalTextHeight/2 + currentTextHeight + fontSize;
    var path = font.getPath(innerStr, x, y, fontSize);
    letterPaths[letterPaths.length-1].push(path);
    for(var i=0; i<path.commands.length; i++){
        var cmd = path.commands[i];
        cmd.originalX = cmd.x;
        cmd.originalY = cmd.y;
        cmd.id = random(999999);
        //console.log(cmd);
    }
} 

function placeStrPath(s, str, strs, font){
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
        //console.log(cmd);
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
            if(Array.isArray(path)){
                for(var j = 0; j<path.length; j++){
                    var innerPath = path[j];
                    var tInc = map(noise(i),0,1,-1,1);
                    PathDrawingTools.drawClippedPathMarquee(innerPath, tInc, fontSize);
                }
            } else {
                PathDrawingTools.drawMarquee(path, 1+i);
            }            
        }
        t++;
    }
}