var video;
var sizeX = 800;
var sizeY = 800;

function setup(){
  createCanvas(sizeX,sizeY);
  background(0);
  video = createCapture(VIDEO);
  video.size(sizeX, sizeY);
  video.hide();
}

var t = 0;

function draw(){
  t+=0.1;
  var wave = 15*sin(t);

  image(video, 0, 0, width, height);

  loadPixels();
  pixelDensity(1);

  var density = pixelDensity();
  for(var x=0;x<width;x++){
    for(var y=0;y<height;y++){
      var i = (x+y*width)*4;
      pixels[i+0] = pixels[i]+(sin(t*x+y)*100);
      pixels[i+1] = pixels[i+1]+wave;
      pixels[i+2] = pixels[i+2];
      pixels[i+3] = pixels[i+3];
    }
  }

  updatePixels();
}
