var screenX;
var screenY;
var t;
var timeInc;
var timeMod;
var paused=false;

var waveWidth;
var waveBaseline;
var waveIncrement;
var waveAmp;
var leftBoundary;
var rightBoundary;

function setup(){
  angleMode(RADIANS);
  createCanvas(windowWidth,windowHeight);
  setConstants();
}

function setConstants(){
  t = 1.0;
  timeInc = 0.05;
  timeMod = 200*PI;

  waveWidth = windowWidth;
  waveBaseline = windowHeight/2;
  waveIncrement = 1;
  waveAmp = 40;
  leftBoundary=(windowWidth-waveWidth)/2;
  rightBoundary=leftBoundary+waveWidth;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setConstants();
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

function draw(){
  clear();
  background(0);
  if(!paused){
    t=(t+timeInc)%timeMod;
  }
  blendMode(EXCLUSION);
  noStroke();



/*
  fill(255,0,0);
  var radius = windowHeight*0.25;
  var raise = 0.5;
  var min = 0;
  var amp = 1;
  var freq = 0.02;
  var phase = t*0.5;
  drawSymmetricEllipseWave(function(){rotate(t)}, radius, raise,
    new Wave(min,amp,freq,phase)
  );
*/

/*
for(var i=-5; i<5; i++){
  for(var j=-5; j<5; j++){
    fill(255,0,0);
    var spread = windowHeight*10;
    var raise = 0.5;
    var min = 0;
    var amp = windowHeight*0.2;
    var freq = 0.1;
    var phase = -t*0.9;
    drawSymmetricDiminishingWave(function(){
      translate(windowHeight*0.25*i, 100*j);
    }, windowHeight*10,
      new Wave(min,amp,freq,phase)
    );

    fill(0,255,0);
    var spread = windowHeight*10;
    var raise = 0.5;
    var min = 0;
    var amp = windowHeight*0.2;
    var freq = 0.1;
    var phase = -t*0.7;
    drawSymmetricDiminishingWave(function(){
      translate(windowHeight*0.25*i, 100*j);
    }, windowHeight*10,
      new Wave(min,amp,freq,phase)
    );

    fill(0,0,255);
    var spread = windowHeight*10;
    var raise = 0.5;
    var min = 0;
    var amp = windowHeight*0.2;
    var freq = 0.1;
    var phase = -t*0.8;
    drawSymmetricDiminishingWave(function(){
      translate(windowHeight*0.25*i, 100*j);
    }, windowHeight*10,
      new Wave(min,amp,freq,phase)
    );
  }
}
*/


/*
  fill(0,0,255);
  var radius = windowHeight*0.25;
  var raise = 0.5;
  var min = 0;
  var amp = windowHeight*0.2;
  var freq = 0.8;
  var phase = -t*0.9;
  drawSymmetricDiminishingWave(null, windowHeight*10,
    new Wave(min,amp,freq,phase)
  );

  fill(0,255,0);
  var spread = windowHeight*10;
  var raise = 0.5;
  var min = 0;
  var amp = windowHeight*0.2;
  var freq = 0.11;
  var phase = -t*0.9;
  drawSymmetricDiminishingWave(null, windowHeight*10,
    new Wave(min,amp,freq,phase)
  );

  fill(255,0,0);
  var spread = windowHeight*10;
  var raise = 0.5;
  var min = 0;
  var amp = windowHeight*0.2;
  var freq = 0.21;
  var phase = -t*0.9;
  drawSymmetricDiminishingWave(null, windowHeight*10,
    new Wave(min,amp,freq,phase)
  );
*/






  function orbitRing(total, speed, clockwise){
    function orbiter(count, total, speed, clockwise){
      clockwise?null:speed=-speed;
      var spread = windowHeight*10;
      var min = 0;
      var amp = 75;
      var freq = 0.1;
      var phase = -t;
      var transform = function(){
        var r = windowHeight*0.2;
        rotate(speed*t*0.1+(count*2*PI/total));
        translate(r,0);
      }
      drawSymmetricDiminishingWave(transform, spread,
        new Wave(min,amp,freq,phase)
      );
    }

    for(var i = 0; i<total; i++){
      orbiter(i,total, speed);
    }
  }

  fill(255,0,0);
  var speedWave = 0.1*sin(0.02*t);
  orbitRing(9, 0.4, true);

  fill(0,255,0);
  orbitRing(9, 0.4, true);

  fill(0,0,255);
  orbitRing(9, 0.4, true);

}

function drawSymmetricEllipseWave(transform, radius, raise, w1){
  push();
  translate(windowWidth/2, (windowHeight/2));
  transform ? transform() : null;
  beginShape();
  vertex(-radius, 0);
  var i = -windowWidth/2;
  while(i<windowWidth/2){
    var waveVal = w1.ellipseAmp(i,radius,raise);
    var xPos = i;
    var yPos = waveVal;
    vertex(xPos,yPos);
    i+=waveIncrement;
  }
  vertex(radius, 0);
  while(i>-windowWidth/2){
    var waveVal = w1.ellipseAmp(i,radius,raise);
    var xPos = i;
    var yPos = -waveVal;
    vertex(xPos,yPos);
    i-=waveIncrement
  }
  endShape();
  pop();
}

function drawEllipseWave(radius, raise, w1){
  push();
  translate(windowWidth/2, windowHeight/2);
  beginShape();
  vertex(-radius, 0);
  for(var i = -windowWidth/2; i<windowWidth/2; i+=waveIncrement){
    var waveVal = w1.ellipseAmp(i,radius,raise);
    var xPos = i;
    var yPos = waveVal;
    vertex(xPos,yPos);
  }
  vertex(radius, 0);
  endShape();
  pop();
}

function drawSymmetricDiminishingWave(transform, spread, w1){
  push();
  translate(windowWidth/2, windowHeight/2);
  transform ? transform() : null;
  beginShape();
  vertex(-windowWidth/2, 0);
  var i = -windowWidth/2
  while(i<windowWidth/2){
    var waveVal = w1.naturalAmp(i,spread);
    var xPos = i;
    var yPos = waveVal;
    vertex(xPos,yPos);
    i+=waveIncrement
  }
  vertex(-windowWidth/2, 0);

  while(i>-windowWidth/2){
    var waveVal = w1.naturalAmp(i,spread);
    var xPos = i;
    var yPos = -waveVal;
    vertex(xPos,yPos);
    i-=waveIncrement
  }
  endShape();
  pop();
}

function drawDiminishingWave(spread, w1){
  push();
  translate(windowWidth/2, windowHeight/2);
  beginShape();
  vertex(-windowWidth/2, 0);
  for(var i = -windowWidth/2; i<windowWidth/2; i+=waveIncrement){
    var waveVal = w1.naturalAmp(i,spread);

    var xPos = i;
    var yPos = waveVal;
    vertex(xPos,yPos);
  }
  vertex(-windowWidth/2, 0);
  endShape();
  pop();
}

function drawSymmetricWave(w1, w2){

  beginShape();
  vertex(leftBoundary, waveBaseline);
  for(var i = waveIncrement; i<waveWidth; i+=waveIncrement){
    var waveVal = w2 ? w1.plus(i,w2) : w1.fundamental(i);
    var xPos = leftBoundary+i;
    var yPos = waveBaseline + waveVal - w1.a;
    vertex(xPos,yPos);
  }
  vertex(rightBoundary,waveBaseline);
  endShape();

  beginShape();
  vertex(leftBoundary,waveBaseline);
  for(var i = waveIncrement; i<waveWidth; i+=waveIncrement){
    var waveVal = w2 ? w1.plus(i,w2) : w1.fundamental(i);
    var xPos = leftBoundary+i;
    var yPos = waveBaseline - waveVal + w1.a;
    vertex(xPos,yPos);
  }
  vertex(rightBoundary, waveBaseline);
  endShape();

}

function drawWave(w1, w2){
  beginShape();
  vertex(leftBoundary,waveBaseline);
  for(var i=waveIncrement; i<waveWidth; i+=waveIncrement){
    if(w2){
      vertex(leftBoundary+i, w1.plus(i, w2));
    } else {
      vertex(leftBoundary+i, w1.fundamental(i));
    }

  }
  vertex(rightBoundary,waveBaseline);
  endShape();
}

function drawSymmetricEllipseWaves(){
  var amp = 1;
  var radius = windowHeight*0.4;
  var raise = 0.5;
  var freq = 0.05;

  fill(255,100,0);
  drawSymmetricEllipseWave(PI/12*sin(t*1/12), radius, raise,
    new Wave(0,amp,freq,-t*0.18)
  );


  fill(0,255,50);
  drawSymmetricEllipseWave(PI/12*sin(t*1/16),radius, raise,
    new Wave(0,amp,freq,t*0.15)
  );

  fill(10,100,255);
  drawSymmetricEllipseWave(PI/12*sin(t*1/24),radius, raise,
    new Wave(0,amp,freq,t*0.13)
  );
}

function drawSymmetricWaves(){
  fill(color(255,0,0,255));
  var min = 20;
  var amp = windowHeight*0.1;
  var freq = 0.01;
  drawSymmetricWave(
    new Wave(min, amp, freq, t),
    new Wave(min, amp, freq+0.1, t/2)
  );

  fill(color(0,255,0,255));
  var min = 20;
  var amp = windowHeight*0.1;
  var freq = 0.01;
  drawSymmetricWave(
    new Wave(min, amp, freq, t),
    new Wave(min, amp, freq+0.1, t/4)
  );

  fill(color(0,0,255,255));
  var min = 20;
  var amp = windowHeight*0.1;
  var freq = 0.01;
  drawSymmetricWave(
    new Wave(min, amp, freq, t),
    new Wave(min, amp, freq+0.1, t)
  );
}

function drawBrokenWaves(){
  //red
  fill(color(255,0,0));
  drawWave(
  new Wave(waveBaseline,  waveBaseline*0.5, 0.01, t),
  new Wave(0,             waveBaseline*0.2, 0.06, t));

  //green
  fill(color(0,255,0));
  drawWave(
  new Wave(waveBaseline,  waveBaseline*0.5, 0.01, t),
  new Wave(0,             waveBaseline*0.1, 0.2, t));

  //blue
  fill(color(0,0,255));
  drawWave(
  new Wave(waveBaseline,  waveBaseline*0.4, 0.01, t),
  new Wave(0,             waveBaseline*0.2, 0.03, t));
}
