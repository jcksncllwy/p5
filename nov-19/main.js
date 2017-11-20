/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let canvasX
let canvasY
let t = 0
let once = false
let done = false

var weAreGiffing = false
var numFrames = 400
var frameCount = 0


var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)

	if(weAreGiffing){
		startTheGifThing()
	}

	blendMode(ADD)
	rectMode(CORNERS)
}


var draw = ()=>{
	var loopedFrameCount = (frameCount-1)%numFrames
  	t = loopedFrameCount*(1/numFrames) 
	if(!done){
		clear()
		background(0)

		let frame = 100
		let innerX = canvasX-frame*2
		let innerY = canvasY-frame*2
		let grating_size = 800
		let grating_width = 80

		for(var i=0; i<5; i++){
			push()

			let osc1 = sin(TWO_PI*t+noise(i)*200)
			let osc2 = sin(TWO_PI*t+noise(i)*100)*0.5
			let osc3 = sin(TWO_PI*t+noise(i)*400)*0.5

			let loopingXRight = (((frameCount*2*noise(i)) % (canvasX + grating_size) ) - grating_size)
			let loopingXLeft = (((frameCount*2*noise(i)) % (canvasX + grating_size) ) - grating_size)

			translate( osc1*grating_size/2 + grating_size/2, 0)

			
			let n = floor(noise(i*30)*3)
			let r = n==0
			let g = n==1
			let b = n==2

			draw_grating(color(255*r,255*g,255*b), 5, grating_width, grating_size, grating_size)

			translate(map(noise(i), 0,1, -20,0), 0)
			//draw_grating(color(0,255,0), 5, grating_width, grating_size, grating_size)

			translate(map(noise(i), 0,1, 0,20), 0)
			//draw_grating(color(0,0,255), 5, grating_width, grating_size, grating_size)

			pop()
		}

		draw_frame()

		if(once) done = true
	}
	

	if(weAreGiffing){
		encoder.addFrame(context)
		if(frameCount>=numFrames){
		  endTheGifThing()
		}
	}
	frameCount++

}

let draw_grating = (bar_color, count, bar_width, frameX=400,frameY=false)=>{
	if(!frameY) frameY = frameX
	let xInc = (frameX/count) + ((frameX/count)-bar_width)/(count-1)

	fill(0)
	//rect(1,1,frameX-1,frameY-1)
	for(var i=0; i<count; i++){
		noStroke()
		fill(bar_color)
		rect(i*xInc,0, i*xInc+bar_width, frameY)
	}
}

let draw_frame = (x=100, y=100)=>{
	fill(0)
	noStroke()
	rect(0,0,x,canvasY)
	rect(0,0,canvasX,y)
	rect(canvasX-x,0,canvasX,canvasY)
	rect(0,canvasY-y,canvasX,canvasY)
}


//tweenity goes from 0 to colors.length-1
//tweenity of 0 displays the first color
//0.5 in between c0 and c1
//2.5 in between c1 and c2 etc.
//tweenity will be modded back around to 0 past colors.
var colorTween = (tweenity=0, ...colors) =>{
	
	let maxIndex = colors.length
	tweenity = tweenity%maxIndex

	let c0Index = Math.floor(tweenity)
	let c1Index = Math.floor((tweenity+1)%maxIndex)

	let c0 = colors[c0Index]
	let c1 = colors[c1Index]

	let [rC0, gC0, bC0] = c0.levels
	let [rC1, gC1, bC1] = c1.levels

	let tweenness = tweenity-c0Index
	let rT = map(tweenness, 0,1, rC0, rC1)
	let gT = map(tweenness, 0,1, gC0, gC1)
	let bT = map(tweenness, 0,1, bC0, bC1)
	return color(rT, gT, bT)
}


//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
let pcurve = ( x, a, b )=>{
    let k = pow(a+b,a+b) / (pow(a,a)*pow(b,b));
    return k * pow( x, a ) * pow( 1.0-x, b );
}

let pick = (arr)=>{
	return arr[floor(random(arr.length))]
}

let coin_flip = ()=>{
	return floor(random(2)) == 1
}

let dice_roll = (sides)=>{
	return floor(random(sides))
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
	
}

var mouseReleased = ()=>{
	console.log('mouse released')
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













