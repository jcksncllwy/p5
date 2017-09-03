var r = new Rune({
  container: "body",
  width: window.innerWidth,
  height: window.innerHeight
});

// Create a new Rune.Font object
var f = new Rune.Font("../fonts/PressStart2P.ttf");

// load() will actually load the font file and call the function
// when the loading is done.
f.load(function(err) {

  // Get a path of the text "Rune" from the font
  // a x,y 200,200 and font size 120.
  var path = f.toPath("Rune", 150, 200, 200)
    .fill(255, 0, 0)
    .stroke(false)

  console.log(path.vectorAt(0.5));

  // We need to specifically add the new path to the stage,
  // as is wasn't created via the r.path() function.
  r.stage.add(path);

  console.log(path);

  // Just for fun, convert the path to polygons.
  var polys = path.toPolygons({ spacing:50 });

  // loop through the points and change them a little bit
  for(var i = 0; i < polys.length; i++) {

    var poly = polys[i];
    poly.move(0, 200, true);

    for(var j = 0; j < poly.state.vectors.length; j++) {
      var vec = poly.state.vectors[j];
      vec.x += Rune.random(-3, 3);
      vec.y += Rune.random(-3, 3);
      r.circle(poly.state.x + vec.x, poly.state.y + vec.y, 3, 3);
    }

  }

  r.draw();
});