var mic;
var amp;

function setup(){
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);
}

function draw(){
  background(0);

  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 500);
  fill(255);
  ellipse(width/2, height/2, diam, diam);
}
