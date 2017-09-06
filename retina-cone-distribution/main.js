var margin = 0
var weAreGiffing = false
var numFrames = 60
var frameCount = 0
var canvasSize;

var coneCountLM = 100;
var coneCountS = 50;

function setup(){
	canvasSize = min(windowWidth, windowHeight)
  createCanvas(canvasSize, canvasSize)
  if(weAreGiffing){
    startTheGifThing()
  }
}


var coneSize = 10
function draw(){
  background(0)

  var loopedFrameCount = (frameCount-1)%numFrames
  t = loopedFrameCount*(1/numFrames) 

  
  for(var i=0; i<coneCountLM; i++){
    noStroke()

    var r = map(random(),0,1,0,canvasSize/2)
    var theta = map(random(),0,1,0,TWO_PI)
    var x = canvasSize/2 + r * cos(theta)
    var y = canvasSize/2 + r * sin(theta)
    
    fill(255,0,0)
    ellipse(x,y,coneSize,coneSize)

    var r = map(random(),0,1,0,canvasSize/2)
    var theta = map(random(),0,1,0,TWO_PI)
    var x = canvasSize/2 + (r * cos(theta))
    var y = canvasSize/2 + (r * sin(theta))
    fill(0,255,0)
    ellipse(x,y,coneSize,coneSize)
  }

  for(var i=0; i<coneCountS; i++){
    noStroke()

    var r = map(random(),0,1,0,canvasSize/2)
    var theta = map(random(),0,1,0,TWO_PI)
    var x = canvasSize/2 + (r * cos(theta))
    var y = canvasSize/2 + (r * sin(theta))
    
    fill(0,0,255)
    ellipse(x,y,coneSize,coneSize)
  }

  noFill()
  stroke(255)
  rect(0,0,canvasSize-1,canvasSize-1)
  

	if(weAreGiffing){
		encoder.addFrame(context)    
    if(frameCount>=numFrames){
      endTheGifThing()
    }
	}
  frameCount++
}

function easeM(p, m, s, g){
  if (p < m)
    return 0.5 * pow(s*p, g)
  else
    return 1 - 0.5 * pow(s*(1 - p), g)
}

function ease(p, g){
  if (p < 0.5)
    return 0.5 * pow(2*p, g)
  else
    return 1 - 0.5 * pow(2*(1 - p), g)
}

function startTheGifThing(){
  encoder = new GIFEncoder();
  encoder.setRepeat(0);   //0  -> loop forever
                          //1+ -> loop n times then stop
  encoder.setDelay(20);   //go to next frame every n milliseconds
  encoder.start();

  canvas = document.getElementById('defaultCanvas0')
  context = canvas.getContext('2d')
}

function endTheGifThing(){
  encoder.finish()
  weAreGiffing=false
  encoder.download("whatever.gif")
}
