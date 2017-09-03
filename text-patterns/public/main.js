var t;
var timeInc;
var timeMod;
var paused=false;
var font;
var canvas;

function setConstants(){
  t = 0.0;
  timeInc = 1;
  timeMod = 10000;
}

function preload() {
  font = loadFont('/fonts/PressStart2P.ttf');
}

function setup(){
  createCanvas(windowWidth, windowHeight);  
  setConstants();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setConstants();
}

function mousePressed() {
  var fs = fullscreen();
  //fullscreen(!fs);
}

function keyPressed(){
  if(keyCode==32){
    paused=!paused;
  }
}

function draw(){
  
  textFont(font);
  var fontSize = 30;
  textSize(fontSize);

  doOnceEveryT(100, function(){
    clear();
    background(255);
    fill(random(255), random(255), random(255));
    drawBigLetter();
  })  

  if(!paused){
    t=(t+timeInc)%timeMod;
  }
}

function drawBigLetter(){
  var grid = [
    [0,0,1,1,1,0,0],
    [0,1,1,0,1,1,0],
    [1,1,0,0,0,1,1],
    [1,1,0,0,0,1,1],
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,1,1],
    [1,1,0,0,0,1,1],
  ];
  var gridSize = grid.length;
  var cellSize = 15;
  for(var i=0; i<gridSize; i++){
    for(var j=0; j<gridSize; j++){
      if(grid[i][j]){
        text('A', j*cellSize, (i*cellSize)+30 );
      }
    }
  }
}

function doOnceEveryT(tLimit, action){
  if(t%tLimit == 0){
    action();
  }
}

function drawScreenfulOfRandomLetters(fontSize, perLetter){
  for(var x=0; x<windowWidth; x+=fontSize){
    for(var y=0; y<windowHeight; y+=fontSize){
      perLetter();
      drawRandomLetter(x, y);
    }
  }
}

function drawRandomLetter(x, y){
  text(getRandomLetter(), x, y);
}

function getRandomLetter(){
  var charCode = random(65, 123);

  //skip over non-letter characters
  if(charCode>90 && charCode<94){
    charCode = random(65, 91);
  } else if(charCode>93 && charCode<97){
    charCode = random(97, 123);
  }

  return String.fromCharCode(charCode);  
}


