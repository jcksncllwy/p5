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
let radius = 250
let ringCount = 4
let segmentCount = 8
let ringIndex = 0
let segmentIndex = 0
let refresh = true

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)

	ellipseMode(RADIUS)
	strokeCap(PROJECT)

}


let t = 0


var draw = ()=>{
	t++

	//drawAllRingsAndPoints()
	let glyphSize = 20
	push()
	translate(20,10)
	if(t%50==0 && refresh){	
		clear()
		background(0)
		translate()
		for(var i=0; i<canvasX; i+=glyphSize*2.5){
			for(var j=0; j<canvasY; j+=glyphSize*2.5){
				drawGlyph(i, j, glyphSize)
			}
		}
		refresh = false
	}
	pop()
}

var drawGlyph = (x,y,size)=>{
	radius = size
	push()
	translate(x,y)
	noFill()
	stroke(255)
	strokeWeight(2)
	
	let drewSegment = false
	let drewRadial = false
	let ringIndex = floor(random(ringCount))
	let segmentIndex = floor(random(segmentCount))

	let maxSteps = 30
	for(var i=0; i<maxSteps; i++){
		let incRing = random()<0.5
		stroke(255)
		if(incRing){
			if(drewRadial){
				inc = random()<0.5?1:-1
				if(ringIndex==0){inc = 1}
				else if(ringIndex==ringCount-1){inc = -1}

				ringIndex = ringIndex + inc
			} else if(drewSegment) {
				inc = random()<0.5?1:-1
				if(ringIndex==0){inc = 1}
				else if(ringIndex==ringCount-1){inc = -1}					
				ringIndex = ringIndex + inc

				if(segmentIndex==0){inc = 1}
				else if(segmentIndex==segmentCount-1){inc = -1}					
				segmentIndex = segmentIndex + inc
				
			}

			drewRadial = true
			drewSegment = false
			//console.log({drawing:drewRadial?'radial':'segment',ringIndex,segmentIndex,i})
			drawRadialLine(ringIndex, segmentIndex)				
		} else {
			if(drewSegment){
				if(segmentIndex==0){inc = 1}
				else if(segmentIndex==segmentCount-1){inc = -1}
				else{inc = random()<0.5?1:-1}
				segmentIndex = segmentIndex + inc
			}
			
			drewRadial = false
			drewSegment = true
			//console.log({drawing:drewRadial?'radial':'segment',ringIndex,segmentIndex,i})
			drawSegment(ringIndex, segmentIndex)
		}
		
	}
	pop()
}

var drawRadialLine = (ring,segment)=>{
	let cp1 = getCardinalPoint(ring,segment)
	let cp2 = getCardinalPoint(ring+1,segment)
	line(cp1.x,cp1.y,cp2.x,cp2.y)
}

var drawSegment = (ring,segment)=>{
	arc(0,0, (ring+1)*radius/ringCount,(ring+1)*radius/ringCount, segment*(TWO_PI/segmentCount), (segment+1)*(TWO_PI/segmentCount))
}

var drawGrid = ()=>{
	push()
	strokeWeight(1)
	for(let r=1; r<=ringCount; r++){
		for(let p=0; p<=segmentCount; p++){
			if(p>0){
				noFill()
				
				if(p%2==0){
					//stroke(map(p,0,segmentCount,0,255), map(p,0,segmentCount,255,0), map(p,0,segmentCount,0,255))
					stroke(255,0,0)
				} else{
					//stroke(map(p,0,segmentCount,255,0), map(p,0,segmentCount,0,255), map(p,0,segmentCount,0,255))
					stroke(0,0,255)
				}
				
				arc(0,0, r*radius/ringCount,r*radius/ringCount, (p-1)*(TWO_PI/segmentCount), p*(TWO_PI/segmentCount))

				let cardinalPoint = getCardinalPoint(r,p)
				ellipse(cardinalPoint.x,cardinalPoint.y,10,10)
				
				line(0,0,cardinalPoint.x,cardinalPoint.y)
			}		
		}

	}
	pop()
}

var getCardinalPoint = (r, i)=>{
	return {
		x: (radius/ringCount*r) * cos(TWO_PI/segmentCount*i),
		y: (radius/ringCount*r) * sin(TWO_PI/segmentCount*i)
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















