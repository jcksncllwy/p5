/*
* Next Thing to work on is being able to
* adjust the concentration of the placed objects.
* Gaussian distribution isn't very tunable.
*/

var t;
var timeInc;
var timeMod;
var paused=false;
var font;
var canvas;
var canvasX;
var canvasY;
var pushes = 0;
var objects;
var unsortedObjects;
var sineFreq = 1;
var sineAmp = 1;

//setup the jquery sliders
$(function(){
  $("#slider1").on("change", function(evt) {
    sineFreq = evt.value.newValue;
  });
  $("#slider2").on("change", function(evt) {
    sineAmp = evt.value.newValue;
  });
})

function setConstants(){
  t = 0.0;
  timeInc = 1;
  timeMod = 10000;
  canvasX = windowWidth;
  canvasY = windowHeight;

  objects = [];
  for(var i=0; i<canvasX; i++){
    objects.push([]);
    for(var j=0; j<canvasY; j++){
      objects[i].push(false);
    }
  }
  unsortedObjects = [];
  
  angleMode(RADIANS);
}

function setup(){
  createCanvas(windowWidth, windowHeight);  
  setConstants();
  background(0);
  
  noStroke();
  putObjects(3000, 0, 300);
  putObjects(3000, 200, 300);

  putObjects(2000, 0, 200);

  putObjects(2000, 0, 100);

  putObjects(3000, 0, 50);
}

function putObject(obj){
  if(obj.x<0 || obj.x>canvasX
  || obj.y<0 || obj.y>canvasY
  || collision(obj)){
    return false;
  }
  objects[obj.x][obj.y] = obj;
  unsortedObjects.push(obj);
  return true;
}

function collision(obj){  
  for(var i=-obj.size; i<obj.size; i++){
    for(var j=-obj.size; j<obj.size; j++){
      if(objects[obj.x+i][obj.y+j]){        
        return true;
      }
    }
  }
}

function putObjects(i, minR, maxR){
  var size = 3;

  for(var j=0; j<i; j++){
    var success = false;
    var tries = 0;
    var object = {};
    while(!success && tries<10000){
      var rotationAngle = map(random(), 0, 1, 0, 2*PI);
      var distanceFromCenter = map(randomGaussian(minR/2), -1,1, minR, maxR);
      if(distanceFromCenter>maxR || distanceFromCenter<minR){
        break;
      }

      // Convert polar to cartesian
      var cartesian = polarToCartesian(distanceFromCenter, rotationAngle);
      var x = Math.round(cartesian.x + canvasX/2) ;
      var y = Math.round(cartesian.y + canvasY/2) ;
      object = {   
        'id': random(999999),
        'x': x,
        'y': y,
        'theta': rotationAngle,
        'r': distanceFromCenter,
        'size': size,
        'minR': minR,
        'maxR': maxR
      };
      success = putObject(object);
      tries++;
    }
    if(success){
      drawObject(object);
    }
  }  
}

function drawObject(obj){  
  //hang on to old coordinates
  var lastX = obj.x;
  var lastY = obj.y;

  //generate new coordinates
  nextR = obj.r + sin(t*sineFreq)*sineAmp;
  nextTheta = obj.theta + map(noise((t/100) + obj.maxR + obj.id), 0,1, -0.5,0.6);
  var cartesian = polarToCartesian(nextR, nextTheta)
  var nextX = cartesian.x + canvasX/2;
  var nextY = cartesian.y + canvasY/2;

  //compute colors
  var r = map(obj.r, 0, obj.maxR, 0, 255);
  var g = map(obj.r, 0, obj.maxR, 200, 0);
  var b = map(obj.r, 0, obj.maxR, 200, 0);
  strokeWeight(2);
  stroke(r, g, b);

  line(lastX, lastY, nextX, nextY);

  obj.x = nextX;
  obj.y = nextY;
}

function forAllObjects(thingToDo){
  for(var i=0; i<unsortedObjects.length; i++){
    thingToDo(unsortedObjects[i]);
  }
}

function cartesianToPolar(x, y){
  var r = sqrt(pow(x,2) + pow(y,2));
  var theta =  atan(y/x);
  return {'r':r, 'theta':theta};
}

function polarToCartesian(r, theta){
  var x = r * cos(theta);
  var y = r * sin(theta);
  return {'x':x, 'y':y};
}

function draw(){
  t++;

  if(t%1==0){
    clear();
    background(0);
    forAllObjects(drawObject);
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasX = windowWidth;
  canvasY = windowHeight;
}

function mousePressed() {
  var fs = fullscreen();
  fullscreen(!fs);
}

function keyPressed(){
  if(keyCode==32){
    paused=!paused;
  }
}



