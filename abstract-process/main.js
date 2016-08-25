var canvasX;
var canvasY;
var nodes = [];
var nodeCount = 2;
var nodeTick = 50;
var t = 0;
var boundingCircle = {
    x:0,
    y:0
};

function setup(){
    angleMode(RADIANS);
    canvasX = windowWidth;
    canvasY = windowHeight;
    createCanvas(canvasX, canvasY);
    boundingCircle.size = canvasY/2;
    seed();
    noStroke();
    fullscreen();
}

function mousePressed() {
    var fs = fullscreen();
    fullscreen(!fs);
}

var collisionMemo = {};

function draw(){
    background(0);
    push();
    translate(canvasX/2,canvasY/2);
    for(var n1 in nodes){
        var node1 = nodes[n1];
        var c = node1.cartesian();
        //retire nodes outside of bounding circle
        if(!collideCircleCircle(c.x,c.y,node1.size, boundingCircle.x,boundingCircle.y,boundingCircle.size)){
            node1.age=node1.maxAge;
        }

        for(var n2 in nodes){
            var node2 = nodes[n2];
            var ids = [node1._id,node2._id].sort();
            var collisionId = ids[0]+","+ids[1];
            var hasCollided = collisionMemo[collisionId] || false;
            if(n1!=n2 && !hasCollided){
                var collision = node1.collide(node2);
                if(collision){
                    var node1IsOlder = node1.age>node2.age;
                    node1.r+= node1IsOlder ? 1 : -1;
                    node2.r+= node1IsOlder ? -1 : 1;
                    if(node1.r<0){node1.r=0}
                    if(node2.r<0){node2.r=0}
                    node1.theta+=0.005;
                    node2.theta-=0.005;
                }
                collisionMemo[collisionId] = true;
            }
        }
        node1.draw();
        node1.grow();
    }
    collisionMemo = {};
    pop();

    t++;
    t=t%99999;
    if(t%500==0){
        console.log(nodes.length);
    }
}

function seed(){
    for(var i=0; i<nodeCount; i++){
        nodes.push(new Node(random(100),random(Math.PI),0, nodes));
    }
}

