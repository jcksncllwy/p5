var margin = 0
var weAreGiffing = false
var numFrames = 60
var frameCount = 0
var canvasSize;


function setup(){
	canvasSize = min(windowWidth, windowHeight)
  createCanvas(canvasSize, canvasSize)
  if(weAreGiffing){
    startTheGifThing()
  }
  rectMode(CENTER)
}

function draw(){
  background(0)

  var loopedFrameCount = (frameCount-1)%numFrames
  t = loopedFrameCount*(1/numFrames) 

  // Draws every pixel
  for(var i=margin;i<width-margin;i++){
    for(var j=margin;j<height-margin;j++){
      stroke(pixelColorMethods[0](i,j,t))
      point(i,j)
    }
  }
  
  // Draws a white rectangle
  stroke(255) 
  noFill()
  var csz = min(windowWidth, windowHeight)
  var size = csz-(margin*2)
  //rect(csz/2, csz/2, size, size )

	if(weAreGiffing){
		encoder.addFrame(context)    
    if(frameCount>=numFrames){
      endTheGifThing()
    }
	}
  frameCount++
}

var pixelColorMethods = [
  function(x,y,t){

    var scalarOffset1 = centerScalarOffset(
                          canvasSize/2,
                          canvasSize/2,
                          0.05, x,y)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)

    var scalarOffset2 = centeredNoiseScalarOffset(
                          canvasSize/2,
                          canvasSize/2,
                          x, y, 0.003, 10)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)

    var distance = dist(canvasSize/2,canvasSize/2,x,y)
    var distanceDampening = map(easeM(map(distance, 0,canvasSize/2,0,1), 0.9, 1.2, 5),0,1,1,0)

    var avgWave = (waveZeroToOne1+(waveZeroToOne2))/2

    return color(255*ease(avgWave,10)*distanceDampening)
  },
  function (x,y,t){
    var baseNoisePower = 11

    var scalarOffset1 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.002, baseNoisePower)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    

    var scalarOffset2 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.002, baseNoisePower+0.5)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)
    

    var scalarOffset3 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.002, baseNoisePower+1)
    var waveform3 = sin(TWO_PI*(t+scalarOffset3))
    var waveZeroToOne3 = map(waveform3,-1,1,0,1)
    
    var distance = dist(canvasSize/2,canvasSize/2,x,y)
    var distanceColorDampening = map(ease(map(distance, 0,canvasSize/2,0,1), 5),0,1,1,0)
    return color(255*waveZeroToOne1*distanceColorDampening, 255*waveZeroToOne2*distanceColorDampening, 255*waveZeroToOne3*distanceColorDampening)
  },
  function (x,y,t){
    var scalarOffset1 = noiseScalarFieldOffset(x,y, 20,0.005,0)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    var easedWave1 = ease(waveZeroToOne1, 10)

    var scalarOffset2 = noiseScalarFieldOffset(x,y, 40,0.005,0)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)
    var easedWave2 = ease(waveZeroToOne2, 10)
    
    var r1 = 0
    var g1 = 255*waveZeroToOne1
    var b1 = 255*(1-waveZeroToOne1)

    var r2 = 255*waveZeroToOne2
    var g2 = 0
    var b2 = 255*(1-waveZeroToOne2)

    return color((r1+r2), (g1+g2), (b1+b2))
  },
  function (x,y,t){
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
  },
]

function centeredNoiseScalarOffset(centerX,centerY, x,y, noiseScale,noiseIntensity){
  distance = dist(x,y,centerX,centerY)
  perlin_noise_intensity = map(ease(map(distance, 0,canvasSize/2,0,1), 5),0,1,1,0)*noiseIntensity
   
  result = noise(noiseScale*x,noiseScale*y) * perlin_noise_intensity  
  return result
}

function centerScalarOffset(centerX,centerY,scale,x,y){
  distance = dist(x,y,centerX,centerY)
  return scale*distance
}

function noiseScalarFieldOffset(x,y,amp,scale,offset){
  result = amp*noise(scale*x+offset,scale*y+offset)
  return result
}

function linearScalarFieldOffset(x,y,scale){
  return scale*x+scale*y;
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
