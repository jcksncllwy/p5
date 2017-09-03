$(function () {
	console.log('hello')

	var canvasX = window.innerWidth
	var canvasY = window.innerHeight

	var runSketch = function(p){
		p.setup = function(){
			p.createCanvas(canvasX,canvasY)
			p.background(p.color(0,0,0))
			p.noStroke()
			p.colorMode(p.HSB)
			p.translate(canvasX/2, canvasY/2)
		}
		
		var t = 0

		var ellipseWidth = 10

		var elements = []
		var elementCount = 1000
		for(var i=0; i<elementCount; i++){
			var hue = p.map(i, 0,elementCount, 0,360)
			elements.push(new Element(0, 0, hue, i*2 ))
		}

		p.draw = function(){
			p.background(p.color(0,0,0, 0.5))
			for(var i=0; i<elements.length; i++){
				elements[i].draw()
			}
			t++
		}

		function Element(x, y, hue, noiseOffset){
			this.x = x
			this.y = y
			this.hue = hue
			this.noiseOffset = noiseOffset
		}

		Element.prototype.draw = function(){
			p.fill(p.color(this.hue,100,100, 1))
			p.ellipse(this.x,this.y,ellipseWidth,ellipseWidth)
			xt = (t+1000+this.noiseOffset)*0.01
			yt = (t+this.noiseOffset)*0.01

			newX = this.x + p.map((p.noise(xt, t*0.0005 )), 0,1, -10,11) + (-this.x*0.02) 
			
			if(newX<((canvasX/2) - ellipseWidth/2) && newX>((-canvasX/2) + ellipseWidth/2)){
				this.x = newX
			}
			newY = this.y + p.map((p.noise(yt, t*0.0005 )), 0,1, -10,11) + (-this.y*0.02)
			
			if(newY<((canvasY/2) - ellipseWidth/2) && newY>((-canvasY/2) + ellipseWidth/2)){
				this.y = newY
			}
		}

		inc = function(val, noiseVal){
			newVal = val + p.map((p.noise(noiseVal)), 0,1, -20,20)
			if(newVal){

			}
		}
	}

	mp5Instance = new p5(runSketch)
})