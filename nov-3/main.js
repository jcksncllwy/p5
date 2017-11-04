/*
Trying for something like this 
https://scontent.fsan1-2.fna.fbcdn.net/v/t1.0-9/23244216_2082667055080574_560829053553966613_n.jpg?oh=22e267562a081be0c53b71a631ddaae6&oe=5A75D244
https://www.facebook.com/lena.young.549/posts/2082671675080112
*/

let canvasX = 300
let canvasY = 300
let t = 0

var once = false
var weAreGiffing = false
var numFrames = 120
var frameCount = 0


let snakes = []
let snakeLength = 50
let snakeCount = 50
let snakeLife = 150

let gridCount = 50
let lineCount = 300
let frameWidth = 250
let frameHeight = 250
let drawn = false

var setup = ()=>{
	//resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)
	noStroke()

	if(weAreGiffing){
		startTheGifThing()
	}

	for(var i=0; i<snakeCount; i++){
		let snake = []
		snakes.push(snake)
	}
}




var draw = ()=>{
	if(once && drawn){
		return
	}
	clear()
	background(0)
	push()
	translate((canvasX/2)-(frameWidth/2), (canvasY/2)-(frameHeight/2))

	noFill()
	stroke(255,0,0)
	strokeWeight(3)
	//rect(0,0,frameWidth,frameHeight)

	if(t%2==0){
		walk_the_snakes()		
	}
	draw_snakes()
	

	pop()

	if(weAreGiffing){
		encoder.addFrame(context)    
		if(frameCount>=numFrames){
		  endTheGifThing()
		}
	}
	frameCount++

	t++

	if(once){
		drawn = true
	}
}

let walk_the_snakes = ()=>{
	for(var i=0; i<snakeCount; i++){
		let snake = snakes[i]
		if(snakeLife>0){
			if(snake.length<=0){
				snake.push(get_random_point_on_grid())
			} else {
				snake.push(get_next_point_in_random_walk(snake[snake.length-1]))
			}
		}
		if(snake.length>=snakeLength || snakeLife<=0){
			if(snake.length>1){
				snake.shift()
			}
		}
	}
	snakeLife--
}

let draw_snakes = ()=>{
	for(var i=0; i<snakeCount; i++){
		let snake = snakes[i]
		for(var j=1; j<snake.length; j++){
			strokeWeight(2)
			stroke(map(j, 1,snake.length-1, 0,255),  map(j, 1,snake.length-1, 255,0), 255)
			line(snake[j-1].x,snake[j-1].y, snake[j].x, snake[j].y)
		}

		if(snake.length<snakeLength-1 && snakeLife>0){
			noFill()
			stroke(255)
			if(snake.length<snakeLength-45){
				strokeWeight(map(sin(t),-1,1,0,1))
			} else if(snake.length>1){
				strokeWeight(sin(map(snake.length, 0,snakeLength, 0,PI))+1)
			} else if(snakeLife<100) {
				strokeWeight(map(sin(t),-1,1,0,1))
			} else {
				strokeWeight(0)
			}
			
			ellipse(snake[0].x,snake[0].y, 10,10)
		}

		if(snake.length<snakeLength && snakeLife<0){
			noFill()
			stroke(255)
			if(snake.length>snakeLength-8){
				strokeWeight(map(sin(t),-1,1,0,1))
			} else if(snake.length>1){
				strokeWeight(sin(map(snake.length, 0,snakeLength, 0,PI))+1)
			} else if(snakeLife>-50) {
				strokeWeight(map(sin(t),-1,1,0,1))
			} else {
				strokeWeight(0)
			}
			
			ellipse(snake[snake.length-1].x,snake[snake.length-1].y, 10,10)
		}
	}
}

let draw_random_lines_on_grid = ()=>{
	for(var i =0; i<lineCount; i++){
		let startX = floor(random(0,gridCount+1))*(frameWidth/gridCount)
		let startY = floor(random(0,gridCount+1))*(frameHeight/gridCount)
		let endX = startX + (floor(random(-1,2)) * (frameWidth/gridCount))
		let endY = startY + (floor(random(-1,2)) * (frameHeight/gridCount))
		if(startX == endX && startY == endY){
			let step = random()>0.5?-1:1
			if(random()>0.5){
				endX+=step
			} else {
				endY+=step
			}
		}

		line(startX,startY,endX,endY);
	}
}

let get_random_point_on_grid = ()=>{
	return {
		x: floor(random(0,gridCount+1))*(frameWidth/gridCount),
		y: floor(random(0,gridCount+1))*(frameHeight/gridCount)
	}
}

let get_next_point_in_random_walk = (point)=>{
	let new_x = point.x + (floor(random( point.x<=0?0:-1, point.x>=frameWidth?1:2 )) * (frameWidth/gridCount))
	let new_y = point.y + (floor(random( point.y<=0?0:-1, point.y>=frameHeight?1:2 )) * (frameHeight/gridCount))
	return {
		x: new_x,
		y: new_y
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













