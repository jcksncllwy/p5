var margin = 100
var weAreGiffing = false
var numFrames = 20
var frameCount = 0


function setup(){
	sz = min(windowWidth, windowHeight)
  createCanvas(sz, sz)
  if(weAreGiffing){
    startTheGifThing()
  }
}

function draw(){
  background(0)

  var loopedFrameCount = (frameCount-1)%numFrames
  t = loopedFrameCount*(1/numFrames)  

  // Draws every pixel
  for(var i=margin;i<width-margin;i++){
    for(var j=margin;j<height-margin;j++){
      stroke(pixelColor(i,j,t))
      point(i,j)
    }
  }

  // Draws a white rectangle
  stroke(255)
  noFill()
  rect(margin,margin,width-2*margin,height-2*margin)  

	if(weAreGiffing){
		encoder.addFrame(context)
    frameCount++
    if(frameCount>=numFrames){
      endTheGifThing()
    }
	}
}

function pixelColor(x,y,t){
  var scalarOffset1 = noiseScalarFieldOffset(x,y, 20,0.03,0)
  var waveform1 = sin(TWO_PI*(t+scalarOffset1))
  var waveZeroToOne1 = map(waveform1,-1,1,0,1)
  var easedWave1 = ease(waveZeroToOne1, 10)

  var scalarOffset2 = noiseScalarFieldOffset(x,y, 20,0.03,0.1)
  var waveform2 = sin(TWO_PI*(t+scalarOffset2))
  var waveZeroToOne2 = map(waveform2,-1,1,0,1)
  var easedWave2 = ease(waveZeroToOne2, 10)
  
  var r1 = 255*waveZeroToOne1
  var g1 = 255*(1-waveZeroToOne1)
  var b1 = 0

  var r2 = 255*waveZeroToOne2
  var g2 = 0
  var b2 = 255*(1-waveZeroToOne2)

  return color((r1+r2), (g1+g2), (b1+b2))
}

function noisePixelColor(x,y,t){
  var scalarOffset1 = noiseScalarFieldOffset(x,y,20,0.003,1)
  var waveform1 = sin(TWO_PI*(t+scalarOffset1))
  var waveZeroToOne1 = map(waveform1,-1,1,0,1)
  var easedWave1 = ease(waveZeroToOne1, 3)

  var scalarOffset2 = noiseScalarFieldOffset(x,y,20,0.003,100)
  var waveform2 = sin(TWO_PI*(t+scalarOffset2))
  var waveZeroToOne2 = map(waveform2,-1,1,0,1)
  var easedWave2 = ease(waveZeroToOne2, 3)

  var scalarOffset3 = noiseScalarFieldOffset(x,y,20,0.003,200)
  var waveform3 = sin(TWO_PI*(t+scalarOffset3))
  var waveZeroToOne3 = map(waveform3,-1,1,0,1)
  var easedWave3 = ease(waveZeroToOne3, 3)
  
  return color(255*easedWave1, 255*easedWave2, 255*easedWave3)
}

function centerScalarOffset(centerX,centerY, x,y){
  distance = dist(x,y,centerX,centerY)
  return 0.05*distance
}

function noiseScalarFieldOffset(x,y,amp,scale,offset){
  result = amp*noise(scale*x+offset,scale*y+offset)
  return result
}

function linearScalarFieldOffset(x,y){
  return 0.05*x+0.05*y;
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
