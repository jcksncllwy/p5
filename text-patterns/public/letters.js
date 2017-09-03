function Letter(l, fontSize){
	this.l = l;
	this.fontSize = fontSize;
}

Letter.prototype.draw = function(x, y){
	text(this.l, x, y);
}

Letter.prototype.getGrid = function(){

}

Letter.prototype.grids = [
	[
		[0,0,1,1,1,0,0],
	    [0,1,1,0,1,1,0],
	    [1,1,0,0,0,1,1],
	    [1,1,0,0,0,1,1],
	    [1,1,1,1,1,1,1],
	    [1,1,0,0,0,1,1],
	    [1,1,0,0,0,1,1],
	]
];