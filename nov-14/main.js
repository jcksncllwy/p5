/*
Trying for something like this http://doseofdesign.me/post/166964076233
*/

let colors = [
'#56B9D0',
'#FEFEFE',
'#FBBA42',
'#F24C27',
'#3B3F42'
]



$(()=>{
	let full_block = "&#x2588;"

	update_text()

	$("#message-input").on('input',()=>{
		update_text()
	})

	let clipboard = new Clipboard('.copy-btn')

	clipboard.on('success', function(e) {
	    e.clearSelection()
	    $('.copy-btn').text('Copied')
	});

	clipboard.on('error', function(e) {
	    console.error('Action:', e.action)
	    console.error('Trigger:', e.trigger)
	});
})


let update_text = ()=>{
	let message = $("#message-input").val().toUpperCase().concat(" ").replace(/[^A-Za-z_0-9\s]/,'').split('')
	let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	let str = ''
	let i=0
	_.each(message,(letter)=>{
		if(letter==" "){
			return str+=" "
		}
		_.each(alphabet,(alpha)=>{
			if(alpha==letter){
				str+=`&nbsp; `
			} else {
				str+=alpha+" "
			}
		})
	})
	
	$('.text-container').html(str)
	$('.copy-btn').attr('data-clipboard-text',str.replace(/&nbsp;/g,'_').replace(/\s/g,''))
	$('.copy-btn').text('Copy to Clipboard')
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

var mousePressed = ()=>{
	console.log('mouse pressed')
	
}

var mouseReleased = ()=>{
	console.log('mouse released')
}

var mouseDragged = ()=>{
	console.log('mouse drag')
}












