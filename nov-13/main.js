/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let canvasX
let canvasY
let t = 0
let once = false
let done = false

var weAreGiffing = false
var numFrames = 20
var frameCount = 0


let subdivision_tree = []

var setup = ()=>{
	resetCanvas()

	//Insert canvas element into dom
	createCanvas(canvasX, canvasY)
	background(0)

	rectMode(CORNERS)

	if(weAreGiffing){
		startTheGifThing()
	}

	
	subdivision_tree = build_subdivision_tree(0)
}

let colors = [
'#56B9D0',
'#FEFEFE',
'#FBBA42',
'#F24C27',
'#3B3F42'
]

let max_depth = 4
let build_subdivision_tree = (depth)=>{
	let tree = {}
	tree.division = random(1)
	tree.c = color(pick(colors))
	tree.vertical_subdivision = coin_flip()
	if(depth<max_depth){
		tree.subtrees = [
			build_subdivision_tree(depth+1),
			build_subdivision_tree(depth+1)
		]		
	}
	return tree
}

var draw = ()=>{
	if(!done){
		clear()
		background(0)

		let bounds = {
			x_min: 100,
			x_max: canvasX-100,
			y_min: 100,
			y_max: canvasY-100,
		}

		draw_subdivision_tree(0, bounds, subdivision_tree)

		if(once) done = true
	}
	

	if(weAreGiffing){
		encoder.addFrame(context)
		if(frameCount>=numFrames){
		  endTheGifThing()
		}
	}
	frameCount++

	t++
}

let min_subdivision_size = 20
let draw_subdivision_tree = (depth, bounds, tree)=>{
	if(!tree.subtrees){
		fill(tree.c)
		draw_subdivision(bounds)
	} else {
		let min_bound
		let max_bound

		if(tree.vertical_subdivision){
			min_bound = bounds.x_min+min_subdivision_size
			max_bound = bounds.x_max-min_subdivision_size
		} else {
			min_bound = bounds.y_min+min_subdivision_size
			max_bound = bounds.y_max-min_subdivision_size
		}

		let pixel_bound = map(tree.division, 
			0,1, 
			min_bound, max_bound
		)
		let dist_to_min = pixel_bound-min_bound
		let dist_to_max = max_bound-pixel_bound
		let noise_offset = map(noise(t*0.001+tree.division*1000), 0,1, -dist_to_min,dist_to_max)
		//let sine_offset = map(sin(t*0.001+tree.division*1000), -1,1, min_bound,max_bound)
		pixel_bound = pixel_bound+noise_offset
		if(pixel_bound<min_bound){
			pixel_bound = min_bound
		}
		if(pixel_bound>max_bound){
			pixel_bound = max_bound
		}

		let bounds0
		let bounds1
		if(tree.vertical_subdivision){
			bounds0 = {
				x_min: bounds.x_min,
				x_max: pixel_bound,
				y_min: bounds.y_min,
				y_max: bounds.y_max,
			}

			bounds1 = {
				x_min: pixel_bound,
				x_max: bounds.x_max,
				y_min: bounds.y_min,
				y_max: bounds.y_max,
			}
		} else {
			bounds0 = {
				x_min: bounds.x_min,
				x_max: bounds.x_max,
				y_min: bounds.y_min,
				y_max: pixel_bound,
			}

			bounds1 = {
				x_min: bounds.x_min,
				x_max: bounds.x_max,
				y_min: pixel_bound,
				y_max: bounds.y_max,
			}
		}
		
		draw_subdivision_tree(depth+1,bounds0,tree.subtrees[0])
		draw_subdivision_tree(depth+1,bounds1,tree.subtrees[1])
	}
}

let draw_subdivision = (bounds)=>{
	noStroke()
	rect(bounds.x_min-0.2,bounds.y_min-0.2, bounds.x_max+0.2,bounds.y_max+0.2)
}


let grid_unit_size = 100
let draw_grid = ()=>{
	push()
	translate(-40,-10)

	let grid_x_min = grid_unit_size
	let grid_x_max = canvasX - grid_unit_size
	let grid_x_count = floor((grid_x_max - grid_x_min)/grid_unit_size)

	let grid_y_min = grid_unit_size
	let grid_y_max = canvasY - grid_unit_size
	let grid_y_count = floor((grid_y_max - grid_y_min)/grid_unit_size)


	for(let i=grid_x_min; i<grid_x_max; i+=grid_unit_size+20){
		for(let j=grid_y_min; j<grid_y_max; j+=grid_unit_size+20){
			recursive_subdivision({
				x:[i, i+grid_unit_size],
				y:[j, j+grid_unit_size]
			},0)
		}
	}
	pop()
}

let old_draw_recursive_subdivision = ()=>{
	recursive_subdivision(0,{
		x:[100, canvasX-100],
		y:[100, canvasY-100]
	},(depth,bounds)=>{
		noStroke()
		let roll = random(100)
		if(roll<50){
			fill(random(100,255), random(100,255), random(100,255))
		} else if(roll<75) {
			fill(0)
		} else{
			fill(255)
		}
		rect(bounds.x[0], bounds.y[0], bounds.x[1], bounds.y[1])
	})
}


let recursive_subdivision = (depth, bounds, thing_to_do)=>{
	let max_depth = 4
	if(depth>max_depth) return

	thing_to_do(depth,bounds)

	let vertical_subdivision = coin_flip()
	if(vertical_subdivision){
		let random_y_divide = floor(random(bounds.y[0]+50,bounds.y[1]-50))
		recursive_subdivision(depth+1,{
			x:[bounds.x[0],bounds.x[1]],
			y:[bounds.y[0],random_y_divide]
		},thing_to_do)
		recursive_subdivision(depth+1,{
			x:[bounds.x[0], bounds.x[1]],
			y:[random_y_divide, bounds.y[1]]
		},thing_to_do)
	} else {
		let random_x_divide = floor(random(bounds.x[0]+50,bounds.x[1]-50))
		recursive_subdivision(depth+1,{
			x:[bounds.x[0],random_x_divide],
			y:[bounds.y[0],bounds.y[1]]
		},thing_to_do)
		recursive_subdivision(depth+1,{
			x:[random_x_divide, bounds.x[1]],
			y:[bounds.y[0],bounds.y[1]]
		},thing_to_do)
	}
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













