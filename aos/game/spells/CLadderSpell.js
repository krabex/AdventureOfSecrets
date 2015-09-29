/****************************************
 *  AOS - Adventure of secrets          *
 *  CLadderSpell.js                     *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

 // ladder spell
CLadderSpell.prototype = new CMovingSpell();
CLadderSpell.prototype.constructor = CLadderSpell; 

function CLadderSpell() {
    this.init = function(owner) {
        console.log("init CLadderSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.particlesManager["magicField"]);
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        
        var x_tile = Math.floor(this.x/TILE_SIZE);
        var y_tile = Math.floor(this.y/TILE_SIZE);
        
        if(owner.direction == "LEFT") {
            if(game.map.special[x_tile-1][y_tile] != COLLISION && game.map.special[x_tile-1][y_tile-1] != COLLISION) {
                this.x -= TILE_SIZE;
                this.speedY = -4.0;
            }
            if(game.map.special[x_tile-1][y_tile] != COLLISION && game.map.special[x_tile-1][y_tile+1] != COLLISION) {
                this.x -= TILE_SIZE;
                this.speedY = 4.0;
            }
        }
        if(owner.direction == "RIGHT") {
            if(game.map.special[x_tile+1][y_tile] != COLLISION && game.map.special[x_tile+1][y_tile-1] != COLLISION) {
                this.x += TILE_SIZE;
                this.speedY = -4.0;
            }
            if(game.map.special[x_tile+1][y_tile] != COLLISION && game.map.special[x_tile+1][y_tile+1] != COLLISION) {
                this.x += TILE_SIZE;
                this.speedY = 4.0;
            }
        }
        if(owner.direction == "UP" && game.map.special[x_tile][y_tile-1] != COLLISION)
            this.speedY = -4.0;
        if(owner.direction == "DOWN" && game.map.special[x_tile][y_tile+1] != COLLISION)
            this.speedY = 4.0;
        if(this.speedX == 0 && this.speedY == 0)
            this.active = false;
    }
    
    this.update = function() {
        if(this.active == false) return;
        
        var x_tile = Math.floor(this.x/TILE_SIZE);
        var y_tile = Math.floor(this.y/TILE_SIZE);
        
        if(game.map.special[x_tile][y_tile] == COLLISION || this.owner.mana < 3) {
            this.active = false;
            return;
        }
        if(game.map.special[x_tile][y_tile] != LADDER) {
            game.map.special[x_tile][y_tile] = LADDER;
            game.map.cover[x_tile][y_tile] = 5;
            game.X_buffer = -1;
            console.log("CLadderSpell force redrawTiles");
            this.owner.mana -= 3;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.particle.position.x = this.x - game.X_scroll;
        this.particle.position.y = this.y - game.Y_scroll;
        this.particle.update(1);
    }
}