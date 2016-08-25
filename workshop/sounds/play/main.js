osc = new p5.Oscillator();

function setup(){
  createCanvas(windowWidth, windowHeight);
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();
}

function draw(){


}

function Wave(min, amp, freq, phase){
  this.m = min;
  this.a = amp;
  this.f = freq;
  this.p = phase;
}

Wave.prototype.fundamental = function(t){
  return this.a*sin(this.f*t+this.p)+this.m;
}

Wave.prototype.powTransform = function(t,power){
  return pow(fundamental(t), power);
}

Wave.prototype.plus = function(t,w){
  return this.fundamental(t)+w.fundamental(t);
}
