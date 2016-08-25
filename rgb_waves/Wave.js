function Wave(min, amp, freq, phase){
  this.m = min;
  this.a = amp;
  this.f = freq;
  this.p = phase;
}

Wave.prototype.fundamental = function(t){
  return this.a*sin(this.f*t+this.p)+this.m;
}

Wave.prototype.ellipseAmp = function(t, radius, raise){
  var exp = pow((pow(radius,2)-pow(t, 2)), raise);
  return this.a*exp*sin(this.f*t+this.p)+this.m;
}

Wave.prototype.naturalAmp = function(t, spread){
  var exp = pow(Math.E, (-pow(t,2)) / (spread?spread:1));
  return this.a*exp*sin(this.f*t+this.p)+this.m;
}

Wave.prototype.powTransform = function(t,power){
  return pow(this.fundamental(t), power);
}

Wave.prototype.plus = function(t,w){
  return this.fundamental(t)+w.fundamental(t);
}
