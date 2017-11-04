let canvasX
let canvasY
let minX
let maxX
let minY
let maxY
let numFrames = 20
let frameCount = 0
let weAreGiffing = false
let start = false

let ampX1 = 250
let ampX1Freq = 1
let freqX1 = 1
let ampX2 = 75
let ampX2Freq = 1.5
let freqX2 = 13

let ampY1 = 250
let ampY1Freq = 1
let freqY1 = 1
let ampY2 = 75
let ampY2Freq = 1.5
let freqY2 = 24

let persistence = 0

let controls = {

}


let colors = []


var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)

	//colorMode(HSB,1)

	if(weAreGiffing){
		startTheGifThing()
	}

	$('#ampX1').val(ampX1)
	$('#ampX1Freq').val(ampX1Freq)
	$('#freqX1').val(freqX1)
	$('#ampX2').val(ampX2)
	$('#ampX2Freq').val(ampX2Freq)
	$('#freqX2').val(freqX2)

	$('#ampY1').val(ampY1)
	$('#ampY1Freq').val(ampY1Freq)
	$('#freqY1').val(freqY1)
	$('#ampY2').val(ampY2)
	$('#ampY2Freq').val(ampY2Freq)
	$('#freqY2').val(freqY2)

	$('#persistence').val(persistence)

	colors = [
		color(0,255,255),
		color(0,255,0),
		color(255,255,0),
		color(255,0,0),
		color(255,0,255),
		color(0,0,255)
	]
}


let t = 0
let timeStep = 0.005
let erode = false
let borderBox = 700


var draw = ()=>{

	background(color(0,0,0,5))

	push()
	translate(canvasX/2,canvasY/2)	

	drawBorders()

	if(start){
		putPoints(
			(n)=>{
				let osc = map(sin(n*0.001),-1,1,1,2)
				let primaryAmp = map(cos(t*ampX1Freq),-1,1,0.5,1)*ampX1
				return sin(n*freqX1-t)*primaryAmp + cos(n*freqX2+t)*cos(t*ampX2Freq)*ampX2
			},
			(n)=>{
				let osc = map(sin(n*0.001),-1,1,1,2)
				let primaryAmp = map(cos(t*ampY1Freq),-1,1,0.5,1)*ampY1
				return cos(n*freqY1-t)*primaryAmp + sin(n*freqY2+t)*cos(t*ampY2Freq)*ampY2
			},
			()=>{
				return colorTween(t,...colors)
			},
			1000,
			persistence
		)
		
		t+=timeStep
	}

	if(weAreGiffing){
		console.log('add frame')
		encoder.addFrame(context)
		if(frameCount>=numFrames){
			endTheGifThing()
		}
		frameCount++
	}

	pop()
}

let drawBorders = ()=>{
	stroke(255)
	strokeWeight(2)	
	line(-borderBox/2,-borderBox/2,borderBox/2,-borderBox/2)
	line(borderBox/2,-borderBox/2,borderBox/2,borderBox/2)
	line(borderBox/2,borderBox/2,-borderBox/2,borderBox/2)
	line(-borderBox/2,borderBox/2,-borderBox/2,-borderBox/2)
	
}

function putPoints(xF,yF,cF, numPoints, persistence){
	for(var i=1; i<=numPoints; i++){
		n = t+(i*TWO_PI/numPoints)
		x = xF(n)
		y = yF(n)
		c = cF(n)
		stroke(c)
		strokeWeight(1) 
		point(x,y)
	}
	if(persistence>0){
		t-=timeStep*persistence
		putPoints(xF, yF, ()=>0, numPoints, false)
		t+=timeStep*persistence
	}
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
  encoder.download("spiroDots.gif")
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
	background(0)
}

var mousePressed = ()=>{
	console.log('mouse pressed')	
}

var mouseDragged = ()=>{
	console.log('mouse drag')
}

var keyPressed = ()=>{
	if(keyCode===ENTER){
		$('.controls').toggleClass('hidden')
	}
	if(keyCode===32){
		reset()
	}
}

var reset = ()=>{
	clear()
	background(0)
	t = 0
	if(!start) start = true
}

var handleNewInputs = ()=>{

	ampX1 = $('#ampX1').val()
	ampX1Freq = $('#ampX1Freq').val()
	freqX1 = $('#freqX1').val()
	ampX2 = $('#ampX2').val()
	ampX2Freq = $('#ampX2Freq').val()
	freqX2 = $('#freqX2').val()

	ampY1 = $('#ampY1').val()
	ampY1Freq = $('#ampY1Freq').val()
	freqY1 = $('#freqY1').val()
	ampY2 = $('#ampY2').val()
	ampY2Freq = $('#ampY2Freq').val()
	freqY2 = $('#freqY2').val()

	persistence = $('#persistence').val()
	
	reset()
}

var hideControls = ()=>{
	$('.controls').toggleClass('hidden')
}

var handleClear = ()=>{
	clear()
	background(0)
}

var handlePause = ()=>{
	console.log('pause')
	start = !start
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











