var PathDrawingTools = {

    /* Works best with single character paths*/
    drawClippedPathMarquee: function(path, tInc, fontSize){
        path.hidden = false;
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];
            /* Iterate by t */
            nextX = cmd.x + tInc;

            /* Then apply bounds */
            if(nextX > windowWidth+fontSize){
                path.hidden = true;
                if(nextX > windowWidth+2*fontSize){
                    nextX=-fontSize;
                }
            }
            if(nextX < -fontSize){
                path.hidden = true;
                if(nextX < -2*fontSize){
                    nextX=windowWidth+fontSize;
                }
            }   

            cmd.x = nextX;            
        }
        if(!path.hidden){
            path.draw(canvas.drawingContext)
        }
    },

    drawMarquee: function(path, tInc){
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];
            /* Iterate by t */
            nextX = cmd.x + tInc;

            /* Then apply bounds */
            nextX = nextX%windowWidth;

            cmd.x = nextX;
        }
        path.draw(canvas.drawingContext)
    },

    drawBoundedWanderingPath: function(path, wanderRadius, wanderSpeed, wiggleBounds, wiggleIntensity){
        wanderRadius = Math.abs(wanderRadius);
        wanderSpeed = Math.abs(wanderSpeed);
        var primaryCSSColor = "#000000";
        var secondaryCSSColor = "#ff0000";

        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];

            var originalPointIsWithinRadius = this.isPointWithinCircle(
                cmd.originalX,cmd.originalY,
                windowWidth/2, windowHeight/2,
                wanderRadius
            );
            var currentPointIsWithinRadius = this.isPointWithinCircle(
                cmd.x,cmd.y,
                windowWidth/2, windowHeight/2,
                wanderRadius
            );

            /*
             * Any points that start within the radius,
             * may wander anywhere within the radius
             */
            if(originalPointIsWithinRadius){
                 /* Wander anywhere on the screen */
                nextX = cmd.x + map(noise(cmd.id + cmd.originalX + t/wanderSpeed), 0, 1, -wanderSpeed, wanderSpeed);
                nextY = cmd.y + map(noise(cmd.id + cmd.originalY + t/wanderSpeed), 0, 1, -wanderSpeed, wanderSpeed);

                nextX = nextX + ((cmd.originalX - nextX)/(wiggleBounds<1?1:wiggleBounds*wanderSpeed));
                nextY = nextY + ((cmd.originalY - nextY)/(wiggleBounds<1?1:wiggleBounds*wanderSpeed));
                /* Then apply bounds */
                var nextPointIsWithinRadius = this.isPointWithinCircle(
                    nextX,nextY,
                    windowWidth/2, windowHeight/2,
                    wanderRadius
                );
                if(nextPointIsWithinRadius){
                    cmd.x = nextX;
                    cmd.y = nextY;
                }

                /* Paint paths that have a point within the bounds */
                path.fill = secondaryCSSColor;
            }

            /*
             * Other points wiggle near their original coordinates,
             * but never within the circle
             */
            if(!originalPointIsWithinRadius) {
                /* Wiggle around */
                nextX = cmd.originalX + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
                nextY = cmd.originalY + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
                /* Then apply bounds */
                var nextPointIsWithinRadius = this.isPointWithinCircle(
                    nextX,nextY,
                    windowWidth/2, windowHeight/2,
                    wanderRadius
                );
                if(!nextPointIsWithinRadius){
                    cmd.x = nextX;
                    cmd.y = nextY;
                }
            }

        }
        
        path.draw(canvas.drawingContext);
    },

    isPointWithinCircle: function(x,y, centerX, centerY, radius){
        return (pow((x - centerX), 2) + pow((y - centerY), 2)) < pow(radius,2);
    },


    drawWanderingPath: function(path, wiggleBounds, wiggleIntensity){
        wiggleBounds = Math.abs(wiggleBounds);
        wiggleIntensity = Math.abs(wiggleIntensity);
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];
            cmd.x = cmd.x + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -1, 1);
            cmd.y = cmd.y + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -1, 1);
        }
        path.draw(canvas.drawingContext);
    },

    drawSmoothWigglingPath: function(path, wiggleBounds, wiggleIntensity){
        wiggleBounds = Math.abs(wiggleBounds);
        wiggleIntensity = Math.abs(wiggleIntensity);
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];
            cmd.x = cmd.originalX + map(noise(cmd.id + cmd.originalX + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
            cmd.y = cmd.originalY + map(noise(cmd.id + cmd.originalY + t*wiggleIntensity), 0, 1, -wiggleBounds, wiggleBounds);
        }
        path.draw(canvas.drawingContext);
    },

    drawWigglingPath: function(path, wiggleBounds, wiggleIntensity){
        wiggleleBounds = Math.abs(wiggleBounds);
        wiggleIntensity = Math.abs(wiggleIntensity);
        for(var i=0; i<path.commands.length; i++){
            var cmd = path.commands[i];            
            
            var maybeX = cmd.x + random(-wiggleIntensity,wiggleIntensity);
            if(maybeX>cmd.originalX+wiggleBounds){
                maybeX = cmd.originalX+wiggleBounds;
            } else if(maybeX<cmd.originalX-wiggleBounds){
                maybeX = cmd.originalX-wiggleBounds;
            }
            cmd.x = maybeX;

            var maybeY = cmd.y + random(-wiggleIntensity,wiggleIntensity);
            if(maybeY>cmd.originalY+wiggleBounds){
                maybeY = cmd.originalY+wiggleBounds;
            } else if(maybeY<cmd.originalY-wiggleBounds){
                maybeY = cmd.originalY-wiggleBounds;
            }
            cmd.y = maybeY;
            
        }
        path.draw(canvas.drawingContext);
    }   
}