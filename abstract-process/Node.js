class Node{
    constructor(r,theta,size, nodes, blue){
        this._id = random(99999);
        this.blue = blue?blue:random(255);
        this.r = r;
        this.theta = theta;
        this.size = size;
        this.nodes = nodes;
        this.age = 0;
        this.timeToReproduce = 500;
        this.maxAge = random(600,800);
        this.maxGrowth = random(10,50);
        this.fatigue = 0;
        this.fatigueLimit = 100;
        this.afterImages = [];
        this.afterImageCount = 10;
    }

    cartesian(){
        return {
            x: this.r * cos(this.theta),
            y: this.r * sin(this.theta)
        }
    }

    draw(){
        for(var i = 0; i<this.afterImages.length; i++){
            var image = this.afterImages[i];
            fill(this.color(map(i,0,this.afterImages.length,0,255)));
            ellipse(image.x,image.y,image.size, image.size);
        }
        var c = this.cartesian();
        ellipse(c.x,c.y,this.size,this.size);
        if(this.afterImages.length>this.afterImageCount){
            this.afterImages.shift();
        }
        this.afterImages.push({
            x:c.x,
            y:c.y,
            size:this.size
        });
        if(this.hasNotMoved()){
            this.fatigue = 0;
        } else {
            this.fatigue++;
        }
        if(this.fatigue>this.fatigueLimit){
            this.age = this.maxAge;
        }
    }

    hasNotMoved(){
        var recentImage = this.afterImages[0];
        var c = this.cartesian();
        return recentImage.x==c.x && recentImage.y==c.y;
    }

    grow(){
        this.age++;
        if(this.age>this.timeToReproduce && this.age<this.maxAge){
            random()>0.99?this.reproduce():null;
        }
        if(this.size<this.maxGrowth){
            this.size+=0.1;
        }
        if(this.age>this.maxAge){
            this.size--;
            if(this.size<0){
                this.die();
            }
        }
    }

    die(){
        var nodeIndex = this.nodes.indexOf(this);
        if(nodeIndex>-1){ this.nodes.splice(nodeIndex,1) }
    }

    reproduce(){
        this.nodes.push(new Node(this.r-this.size/2,this.theta,0,this.nodes, random(this.blue-1, this.blue+1)));
    }

    color(alpha){
        return color(map(this.age, 0, this.maxAge, 0, 255),
                     map(this.r, 0, boundingCircle.size/2, 255, 0),
                     this.blue, alpha);
    }

    collide(node){
        var c1 = this.cartesian();
        var c2 = node.cartesian();
        return collideCircleCircle(c1.x,c1.y,this.size, c2.x,c2.y,node.size);
    }


}