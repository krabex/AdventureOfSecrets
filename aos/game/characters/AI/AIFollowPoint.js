/****************************************
 *  AOS - Adventure of secrets          *
 *  AIFollowPoint.js                    *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
function AIFollowPoint() {
    this.init = function() {
        this.points = new Array();
    }
    this.collisionDetected = function() {
        if(this.direction != "DOWN" && this.direction != "UP")
            this.isWalking = false;
    }
    this.playerSpoted = function(distance) {}
    
    this.update = function() {
        if(typeof this.points == "undefined" || this.points.length == 0) {
            this.isWalking = false;
            this.sprite.startAnimation("default");
            console.log("no points");
            return;
        }
        if(this.x > this.points[0].x*TILE_SIZE && this.x < this.points[0].x*TILE_SIZE+TILE_SIZE && this.y >= this.points[0].y*TILE_SIZE && this.y <= this.points[0].y*TILE_SIZE+TILE_SIZE) {
            this.points.splice(0, 1);
            console.log("AIFollowPoint: point reached")
            return;
        }
        
        var x_tile = Math.floor(this.x/TILE_SIZE);
        var y_tile = Math.floor(this.y/TILE_SIZE);
        var in_one_tile = Math.floor((this.x + this.sprite.config.width)/TILE_SIZE) == x_tile;
        
        if(this.x < this.points[0].x*TILE_SIZE)
            this.direction = "RIGHT";
        if(this.x > this.points[0].x*TILE_SIZE)
            this.direction = "LEFT";
            
        console.log(in_one_tile);
        
        if(this.y > this.points[0].y*TILE_SIZE && game.map.special[x_tile][y_tile-1] == LADDER && this.x%TILE_SIZE>12)
            this.direction = "UP";
        if(this.y < this.points[0].y*TILE_SIZE  && game.map.special[x_tile][y_tile+1] == LADDER)
            this.direction = "DOWN";

        this.isWalking = true;
    }
}