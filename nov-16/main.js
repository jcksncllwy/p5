/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let canvasX
let canvasY
let t = 0
let once = false
let done = false

var weAreGiffing = false
var numFrames = 120
var frameCount = 0

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)

	if(weAreGiffing){
		startTheGifThing()
	}

	rectMode(CORNERS)
}

var draw = ()=>{
	var loopedFrameCount = (frameCount-1)%numFrames
  	t = loopedFrameCount*(1/numFrames) 
	if(!done){
		clear()
		background(0)

		noFill()
		stroke(255)
		strokeWeight(1)
		rect(100,100,canvasX-100,canvasY-100)
		let num_lines = 20
		let inc = (canvasX-200)/num_lines
		let line_width = 6
		let count = 0

		for(let i=-inc; i<canvasX-100 + inc*2; i+=inc){
			fill(255)
			noStroke()
			let wav1 = map(sin(TWO_PI*t+count*0.5),-1,1,-inc*2,inc*2)
			let wav1a = map(sin(TWO_PI*t+PI+count),-1,1,0,line_width)

			let wav2 = map(sin(TWO_PI*t+PI+count*0.5),-1,1,-inc*2,inc*2)
			let wav2a = map(sin(TWO_PI*t+count),-1,1,0,line_width)
			quad(
				i-line_width/2+wav1,100,
				i+line_width/2+wav1,100,
				i+line_width/2+wav2 ,canvasY-100,
				i-line_width/2+wav2,canvasY-100
			)
			count++
		}

		fill(0)
		noStroke()
		rect(0,0,100,canvasY)
		rect(0,0,canvasX,100)
		rect(canvasX-99,0,canvasX,canvasY)
		rect(0,canvasY-99,canvasX,canvasY)

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
	subdivision_tree = build_subdivision_tree(0)
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













