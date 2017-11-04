/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let canvasX
let canvasY
let t = 0

var weAreGiffing = false
var numFrames = 20
var frameCount = 0

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)
	noStroke()

	if(weAreGiffing){
		startTheGifThing()
	}
}


let ellipseSize = 20
let ellipseCount = 100
let frameWidth = 500
let frameHeight = 500

var draw = ()=>{
	clear()
	background(0)
	push()
	translate((canvasX/2)-(frameWidth/2), (canvasY/2)-(frameHeight/2))

	noFill()
	stroke(255)
	rect(0,0,frameWidth,frameHeight)

	translate(0, (frameHeight/2))

	/*
	for(let x=0; x<=frameWidth; x+=(frameWidth/ellipseCount)){
		let y = sin(x*0.03)*100
		ellipse(x, y, ellipseSize,ellipseSize)
	}
	*/
	

	draw_equidistant_points_on_sine_curve()
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

/*
Nabbed this from 
https://stackoverflow.com/questions/26226663/evenly-space-circles-along-sin-curve
http://jsfiddle.net/alnitak/fp7aknoc/
*/

let draw_equidistant_points_on_sine_curve = ()=>{
	var dx = 0.0001;  // increase for performance vs accuracy
	var s = 0;
	var step = 0.1;
	var total = 0;

	function f(x) {
	    return sin(x+t*0.01) //+ map(noise(x),0,1,-1,1))/2;
	}

	for (var x = 0; x < 2 * Math.PI; x += dx) {
	    
	    // method using difference between successive y values to calculate dy
	    // NB: in practise you should remember the value of fx from the previous
	    // iteration to avoid two evaluations of f(x) per loop
	    var fx = f(x);
	    var dy = f(x + dx) - fx;
	    
	    var ds = (dx * dx + dy * dy) / dx; //alternate method
	    var ds = Math.sqrt(dx * dx + dy * dy);
	    
	    // alternate method using derivative of f(x)
	    // var f_x = Math.cos(x);              // from calculus
	    // var dy = dx * f_x;                  // dy/dx = f'(x)  -> dy = dx * f'(x)
	    // var ds = dx * Math.sqrt(1 + f_x * f_x);    
	    
	    // add up distance so far
	    s += ds;
	    total += ds;
	    
	    if (s >= step) {
	        var px = frameWidth * (x / (2 * Math.PI));
	        var py = 100*fx;
	        
	        fill(255,0,255)
	        noStroke()
	        ellipse(px,py,10,10)
	        let trailCount = 10
	        for(let i=trailCount; i>=0; i--){
	        	let offset = i*py*0.1
	        	fill(255-(i*50),0,255)
	        	ellipse(px,py+offset,10-i,10-i)
	        }

	        
	        s -= step;
	    }
	}
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

var mousePressed = ()=>{
	console.log('mouse pressed')
	refresh = true
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













