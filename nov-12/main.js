/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let canvasX
let canvasY
let t = 0

var weAreGiffing = false
var numFrames = 20
var frameCount = 0


let particle_count = 10;
let particles = [];

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)

	for(let i=0; i<particle_count; i++){
		particles.push({
			x: random(-10,10),
			y: random(-10,10),
			x_force: 0,
			y_force: 0,
			t: 0,
			seed: random(9999),
			c: color(random(100,255),random(100,255),random(100,255))
		})
	}


	if(weAreGiffing){
		startTheGifThing()
	}
}


var draw = ()=>{
	clear()
	background(0)

	push()
	translate(canvasX/2, canvasY/2)
	walk_particles()
	draw_particles()
	pop()


	if(weAreGiffing){
		encoder.addFrame(context)    
		if(frameCount>=numFrames){
		  endTheGifThing()
		}
	}
	frameCount++

	t++
}

let walk_particles = ()=>{
	_.each(particles, (p)=>{
		if(gravity_on){
			let x_delta = (mouseX-canvasX/2) - p.x
			let y_delta = (mouseY-canvasY/2) - p.y
			p.x_force += x_delta*0.0001
			p.y_force += y_delta*0.0001
			//p.x += map(noise(t*0.01+p.seed), 0,1, -10,10)
			//p.y += map(noise(t*0.01+1000+p.seed), 0,1, -10,10)
		} else {
			p.x_force += map(noise(t*0.01+p.seed), 0,1, -0.01,0.01)
			p.y_force += map(noise(t*0.01+1000+p.seed), 0,1, -0.01,0.01)
		}

		p.x += p.x_force>0 ? pow(p.x_force,2) : -pow(p.x_force,2)
		if(p.x_force>0) p.x_force-=0.001
		if(p.x_force<0) p.x_force+=0.001
		p.y += p.y_force>0 ? pow(p.y_force,2) : -pow(p.y_force,2)
		if(p.y_force>0) p.y_force-=0.001
		if(p.y_force<0) p.y_force+=0.001

		
		if (p.x > canvasX/2){
			p.x = canvasX/2
			p.x_force = -p.x_force*0.8
		}
		if (p.x < -canvasX/2){
			p.x = -canvasX/2
			p.x_force = -p.x_force*0.8
		} 
		if (p.y > canvasY/2){
			p.y = canvasY/2
			p.y_force = -p.y_force*0.8
		}
		if (p.y < -canvasY/2){
			p.y= -canvasY/2
			p.y_force = -p.y_force*0.8
		}
		p.t++
	})
}

let draw_particles = ()=>{
	_.each(particles, (p)=>{
		noFill()
		strokeWeight(1)
		stroke(255)
		line(p.x,p.y, p.x+p.x_force*20, p.y+p.y_force*20)
		strokeWeight(2)
		stroke(p.c)
		ellipse(p.x,p.y, 10,10)

		_.each(particles,(q)=>{			
			line(p.x,p.y, q.x,q.y)
		})
	})
}


let resetCanvas = () =>{
	canvasX = windowWidth
	canvasY = windowHeight
}

var windowResized = function() {
	windowResizing = true
	canvasX = window.innerWidth
	canvasY = window.innerHeight
	resizeCanvas(canvasX, canvasY)	
}

let gravity_on = false

var mousePressed = ()=>{
	console.log('mouse pressed')
	gravity_on = true
}

var mouseReleased = ()=>{
	console.log('mouse released')
	gravity_on = false
}

var mouseDragged = ()=>{
	console.log('mouse drag')
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













