let canvasX
let canvasY
let minX
let maxX
let minY
let maxY

/***
* Learnings:
* mouseX and all the other mousey things don't respect translations
*
****/

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)

	//seriously who wants a stroke
	noStroke()
}

let resetCanvas = () =>{
	canvasX = windowWidth
	canvasY = windowHeight
}

let t = 0

// colors
// r o y g b i v

var draw = ()=>{
	clear()
	background(0)
	t++	

	let colors = [
		color(255,0,255),
		color(0,255,255),
		color(255,255,0)
	]

	for(var i=0; i<500; i++){
		fill(colorTween((i+t*2)*0.009, ...colors))

		let x = map(i, 0,500, -200,canvasX+200)
		let n1 = noise(t*0.005, i*0.005)
		let n2 = noise((t*0.005) + 500, i*0.005)
		
		//stroke(color(0,0,0))
		//strokeWeight(1)
		ellipse(
			x + map(n2, 0,1, -100,100) + sin(t*0.05+i)*100,
			map(n1, 0,1, 0, canvasY) + cos(t*0.05+i)*100,
			sin(t*0.04+i*0.04)*50 + 50,
			sin(t*0.04+i*0.04)*50 + 50,
		)
	}	

	let rM = map(mouseX, 0,canvasX, 0,255)
	let gM = map(mouseY, 0,canvasY, 0,255)
	let bM = 100

	fill(rM, gM, bM)
	ellipse(mouseX, mouseY, 25,25)
}

var mousePressed = ()=>{
	console.log('mouse pressed')
}

var mouseDragged = ()=>{
	console.log('mouse drag')
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















