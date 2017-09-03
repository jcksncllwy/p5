$(function () {
	console.log('hello')

	var canvasX = window.innerWidth
	var canvasY = window.innerHeight

	var windowResizing = false	

	var encoder = null
	var encoderFinished = false

	var canvas = null
  	var context = null

  	var weAreGiffing = false
  	var drawClock = 0

	function startTheGifThing(){
	  encoder = new GIFEncoder();
	  encoder.setRepeat(0);   //0  -> loop forever
	                          //1+ -> loop n times then stop
	  encoder.setDelay(0);  //go to next frame every n milliseconds
	  encoder.start();

	  canvas = document.getElementById('defaultCanvas0')
	  context = canvas.getContext('2d')
	}

	function endTheGifThing(){
	  if(!encoderFinished) {
	    encoder.finish();
	    encoderFinished=true;
	    encoder.download("whatever.gif");
	  }
	}

	var runSketch = function(p){
		p.setup = function(){
			p.createCanvas(canvasX,canvasY)

			p.colorMode(p.HSB, 100, 1, 1, 1)			
			p.background(p.color(0,0,0,1))
			p.noStroke()

			p.translate(canvasX/2, canvasY/2)

			if(weAreGiffing){
				startTheGifThing()
			}
		}

		p.windowResized = function() {
			windowResizing = true
			canvasX = window.innerWidth
			canvasY = window.innerHeight
			p.resizeCanvas(canvasX, canvasY)
			p.translate(canvasX/2, canvasY/2)
			windowResizing = false
		}

		p.mouseClicked = function(){
			if(colorChangeRate == 0.1){
				colorChangeRate = 1
			} else if(colorChangeRate == 1){
				colorChangeRate = 5
			} else if(colorChangeRate == 5){
				colorChangeRate = 0.1
			}
		}

		var mouseMoveLock = false
		var mouseX = 0
		var mouseY = 0
		var targetX = 0.03
		var targetY = 0.08
		p.mouseMoved = function(){
			targetX = p.map(p.mouseX, 0,canvasX, 0, 0.1)
			targetY = p.map(p.mouseY, 0,canvasY, 0, 0.1)
			p.fill(getCursorColor(drawClock))
			p.ellipse(p.mouseX-canvasX/2, p.mouseY-canvasY/2, 20,20)
		}

		var backgroundClear = function(){
			p.translate(-canvasX/2, -canvasY/2)
			p.clear()

			p.background(p.color(0,0,0))
			p.translate(canvasX/2, canvasY/2)
		}

		var getRingRadius = function(t){
			return Math.sin(t*0.1) * 300
		}		

		var getX = function(t, ringRadius){
			return Math.sin(t*mouseX) * ringRadius
		}

		var getY = function(t, ringRadius){
			return Math.cos(t*mouseY) * ringRadius
		}

		var colorChangeRate = 0.1
		var getColor = function(t){
			return p.color((t*colorChangeRate)%99,1,1,1)
		}

		var getCursorColor = function(t){
			//console.log(p.map((t*colorChangeRate)%99, 0,99, 99,0))
			return p.color( p.map((t*colorChangeRate)%99, 0,99, 99,0) ,1,1,1)
		}

		var drawBufferMax = 20
		var drawBuffer = []

		var addToDrawBuffer = function(drawFunc){
			drawBuffer.push(drawFunc)
			if(drawBuffer.length>drawBufferMax){
				drawBuffer = drawBuffer.slice(1,drawBufferMax)
			}
		}

		p.draw = function(){
			if(windowResizing){
				return
			}
			backgroundClear()

			if(Math.abs(mouseX-targetX) > 0.001){
				mouseX = p.lerp(mouseX,targetX,0.01)

				p.fill(getColor(drawClock))
				p.ellipse(p.map(mouseX, 0,0.1, -canvasX/2,canvasX/2), -canvasY/2, 100,100)
				p.ellipse(p.map(mouseX, 0,0.1, -canvasX/2,canvasX/2), canvasY/2, 100,100)
			}
			
			
			if(Math.abs(mouseY-targetY) > 0.001){
				mouseY = p.lerp(mouseY,targetY,0.01)
				p.fill(getColor(drawClock))
				p.ellipse(-canvasX/2, p.map(mouseY, 0,0.1, -canvasY/2,canvasY/2), 100,100)
				p.ellipse(canvasX/2, p.map(mouseY, 0,0.1, -canvasY/2,canvasY/2), 100,100)
			}
			

			var ringRadius = getRingRadius(drawClock)
			var x = getX(drawClock, ringRadius)
			var y = getY(drawClock, ringRadius)

			var oldClock = drawClock - 20
			var oldRingRadius = getRingRadius(oldClock)
			var oldX = getX(oldClock, oldRingRadius)
			var oldY = getY(oldClock, oldRingRadius)

			addToDrawBuffer(function(){
				p.stroke(p.color(0,0,0))
				p.strokeWeight(25)
				p.line(oldX,oldY, x,y)

				p.stroke(getColor(drawClock))
				p.strokeWeight(20)
				p.line(oldX,oldY, x,y)	
			})

			for(var i=0; i<drawBuffer.length; i++){
				var drawFunc = drawBuffer[i]
				p.background(p.color(0,0,0,i*0.005))
				drawFunc()
			}

			if(weAreGiffing){
				encoder.addFrame(context)
				if(drawClock==1){
					endTheGifThing()
				}
			}

			drawClock++
		}

		function Element(){

		}

		Element.prototype.draw = function(){
			
		}

		Element.prototype.getNewElement = function(){

		}
		
	}

	mp5Instance = new p5(runSketch)
})