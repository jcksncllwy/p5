var margin = 0
var padding = 100
var weAreGiffing = false
var numFrames = 20
var frameCount = 0
var canvasSize;


function setup(){
	canvasSize = 0.7*min(windowWidth, windowHeight)
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
  
  var size = canvasSize-(margin*2)

  // Draws every pixel
  for(var i=margin;i<width-margin;i++){
    for(var j=margin;j<height-margin;j++){
      var c = pixelColorMethods[4](i,j,t)
      /*
      if(i<margin+padding){
        c = greyscale(c, map(i,0,padding,1,0))
      } else if(i>width-margin-padding){
        c = greyscale(c, map(i,width-padding,width,0,1))
      } else if(j<margin+padding){
        c = greyscale(c, map(j,0,padding,1,0))
      } else if(j>width-margin-padding){
        c = greyscale(c, map(j,height-padding,height,0,1))
      }
      */
      
      stroke(c)
      point(i,j)
    }
  }
  
  // Draws a white rectangle
  stroke(255) 
  noFill()
  //rect(canvasSize/2, canvasSize/2, size, size )

	if(weAreGiffing){
		encoder.addFrame(context)    
    if(frameCount>=numFrames){
      endTheGifThing()
    }
	}
  frameCount++
}

function greyscale(c, i){
  if(i<0)i=0
  if(i>1)i=1  
  let [rC, gC, bC] = c.levels

  let avg = map((rC+gC+bC)/3,0,255,0,1)
  let darkened = avg - 0.1
  let contrastified = map(ease(darkened, 20),0,1,0,255)

  let newR = map(i, 0,1, rC, contrastified)
  let newG = map(i, 0,1, gC, contrastified)
  let newB = map(i, 0,1, bC, contrastified)

  return color(newR,newG,newB)
}

var pixelColorMethods = [
  function(x,y,t){
    var scalarOffset1 = tunnelScalarOffset(
                          map(sin(TWO_PI*t),-1,1,canvasSize/2-20,canvasSize/2+20),
                          map(cos(TWO_PI*t),-1,1,canvasSize/2-20,canvasSize/2+20),
                          -5, 0.4, x,y)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)

    var scalarOffset1A = tunnelScalarOffset(
                          map(sin(TWO_PI*t+0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          map(cos(TWO_PI*t+0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          -5, 0.4, x,y)
    var waveform1A = sin(TWO_PI*(t+scalarOffset1A))
    var waveZeroToOne1A = map(waveform1A,-1,1,0,1)

    var scalarOffset1B = tunnelScalarOffset(
                          map(sin(TWO_PI*t-0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          map(cos(TWO_PI*t-0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          -5, 0.4, x,y)
    var waveform1B = sin(TWO_PI*(t+scalarOffset1B))
    var waveZeroToOne1B = map(waveform1B,-1,1,0,1)

    var scalarOffset2 = tunnelScalarOffset(
                          map(sin(TWO_PI*t),-1,1,canvasSize/2+20,canvasSize/2-20),
                          map(cos(TWO_PI*t),-1,1,canvasSize/2+20,canvasSize/2-20),
                          -5, 0.4, x,y)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)

    var scalarOffset2A = tunnelScalarOffset(
                          map(sin(TWO_PI*t+0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          map(cos(TWO_PI*t+0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          -5, 0.4, x,y)
    var waveform2A = sin(TWO_PI*(t+scalarOffset2A))
    var waveZeroToOne2A = map(waveform2A,-1,1,0,1)

    var scalarOffset2B = tunnelScalarOffset(
                          map(sin(TWO_PI*t-0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          map(cos(TWO_PI*t-0.1),-1,1,canvasSize/2-20,canvasSize/2+20),
                          -5, 0.4, x,y)
    var waveform2B = sin(TWO_PI*(t+scalarOffset2B))
    var waveZeroToOne2B = map(waveform2B,-1,1,0,1)

    var rC1 = 255*ease(1-waveZeroToOne1,10)
    var gC1 = 255*ease(waveZeroToOne1,10)
    var bC1 = 0

    var rC1A = 255*ease(1-waveZeroToOne1A,100)
    var gC1A = 255*ease(waveZeroToOne1A,100)
    var bC1A = 0

    var rC1B = 255*ease(1-waveZeroToOne1B,100)
    var gC1B = 255*ease(waveZeroToOne1B,100)
    var bC1B = 0

    var rC2 = 255*ease(1-waveZeroToOne2,10)
    var gC2 = 0
    var bC2 = 255*ease(waveZeroToOne2,10)

    var rC2A = 255*ease(1-waveZeroToOne2A,10)
    var gC2A = 0
    var bC2A = 255*ease(waveZeroToOne2A,10)

    var rC2B = 255*ease(1-waveZeroToOne2B,10)
    var gC2B = 0
    var bC2B = 255*ease(waveZeroToOne2B,10)

    var rC = rC1+rC1A + rC2+rC2A
    var gC = rC1      + rC2+rC2B
    var bC = rC1+rC1B + rC2

    if(rC+gC+bC<50){
      rC = rC*2
      gC = gC*2
      bC = bC*2
    } else if(rC+gC+bC>(205*3)){
      rC = pow(rC,0.89)
      bC = pow(bC,0.89)
      gC = pow(gC,0.89)
    }

    return color(rC, gC, bC)
  },
  function(x,y,t){

    var noiseAmp = 40
    var noiseScale = map(sin(TWO_PI*t),-1,1,0.001,0.005)
    var noiseOffset = -0.7*sin(TWO_PI*t)+100

    var scalarOffset1 = noiseScalarFieldOffset(x,y, noiseAmp, noiseScale,  noiseOffset)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    var easedWave1 = ease(waveZeroToOne1, 10)

    return color(255*waveZeroToOne1)
  },
  function(x,y,t){
    var scalarOffset1 = noiseScalarFieldOffset(x,y, 20,0.003,0)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    var easedWave1 = ease(waveZeroToOne1, 10)

    var scalarOffset2 = noiseScalarFieldOffset(x,y, 40,0.003,0)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)
    var easedWave2 = ease(waveZeroToOne2, 10)

    var scalarOffset3 = noiseScalarFieldOffset(x,y, 30,0.003,0)
    var waveform3 = sin(TWO_PI*(t+scalarOffset3))
    var waveZeroToOne3 = map(waveform2,-1,1,0,1)
    var easedWave3 = ease(waveZeroToOne3, 10)
    
    var r1 = 255*waveZeroToOne1
    var g1 = 255*(1-waveZeroToOne1)
    var b1 = 0

    var r2 = 255*(1-waveZeroToOne2)
    var g2 = 0
    var b2 = 255*waveZeroToOne2

    var r3 = 0
    var g3 = 255*(1-waveZeroToOne3)
    var b3 = 255*waveZeroToOne3

    var c = color((r1+r3), (g1+g2), (b2+b3))

    var scalarOffset = centerScalarOffset(canvasSize/2, canvasSize/2, 0.001, x, y)
      
    c = greyscale(c, ease(map(sin(TWO_PI*(t+scalarOffset)),-1,1,0,1),10))

    return c
  },
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
    var baseNoisePower = 50
    var noiseScale = map(sin(TWO_PI*t), -1,1, 0.02,0.002)

    var scalarOffset1 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.02, baseNoisePower)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    

    var scalarOffset2 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.02, baseNoisePower+0.5)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)
    

    var scalarOffset3 = centeredNoiseScalarOffset(canvasSize/2,canvasSize/2, x,y, 0.02, baseNoisePower+1)
    var waveform3 = sin(TWO_PI*(t+scalarOffset3))
    var waveZeroToOne3 = map(waveform3,-1,1,0,1)
    
    var distance = dist(canvasSize/2,canvasSize/2,x,y)
    var distanceColorDampening = map(ease(map(distance, 0,canvasSize/2,0,1), 5),0,1,1,0)
    return color(255*waveZeroToOne1, 255*waveZeroToOne2, 255*waveZeroToOne3)
  },
  function (x,y,t){
    var scalarOffset1 = noiseScalarFieldOffset(x,y, 20,0.003,0)
    var waveform1 = sin(TWO_PI*(t+scalarOffset1))
    var waveZeroToOne1 = map(waveform1,-1,1,0,1)
    var easedWave1 = ease(waveZeroToOne1, 10)

    var scalarOffset2 = noiseScalarFieldOffset(x,y, 40,0.003,0)
    var waveform2 = sin(TWO_PI*(t+scalarOffset2))
    var waveZeroToOne2 = map(waveform2,-1,1,0,1)
    var easedWave2 = ease(waveZeroToOne2, 10)

    var scalarOffset3 = noiseScalarFieldOffset(x,y, 30,0.003,0)
    var waveform3 = sin(TWO_PI*(t+scalarOffset3))
    var waveZeroToOne3 = map(waveform2,-1,1,0,1)
    var easedWave3 = ease(waveZeroToOne3, 10)
    
    var r1 = 255*waveZeroToOne1
    var g1 = 255*(1-waveZeroToOne1)
    var b1 = 0

    var r2 = 255*(1-waveZeroToOne2)
    var g2 = 0
    var b2 = 255*waveZeroToOne2

    var r3 = 0
    var g3 = 255*(1-waveZeroToOne3)
    var b3 = 255*waveZeroToOne3

    return color((r1+r3), (g1+g2), (b2+b3))
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

function tunnelScalarOffset(centerX,centerY,scale,exp,x,y){
  distance = dist(x,y,centerX,centerY)
  return scale*pow(distance,exp)
}

function centeredNoiseScalarOffset(centerX,centerY, x,y, noiseScale,noiseIntensity){
  distance = dist(x,y,centerX,centerY)
  perlin_noise_intensity = map(distance, 0,canvasSize/2, 1,0)*noiseIntensity
   
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
