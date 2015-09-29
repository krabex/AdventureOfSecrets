/****************************************
 *  AOS - Adventure of secrets          *
 *  CRockDestroySpell.js                *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

 // rock destroy spell
CRockDestroySpell.prototype = new CMovingSpell();
CRockDestroySpell.prototype.constructor = CRockDestroySpell;

function CRockDestroySpell() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CRockDestroySpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.particlesManager["magicSparks"]);
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        if(owner.direction == "LEFT") this.speedX = -8.0;
        if(owner.direction == "RIGHT") this.speedX = 8.0;
        if(owner.direction == "UP") this.speedY = -8.0;
        if(owner.direction == "DOWN") this.speedY = 8.0;
    }
    
    this.collisionWithTile = function() {
        var x_tile = Math.floor(this.x/TILE_SIZE);
        var y_tile = Math.floor(this.y/TILE_SIZE);
        
        if(this.time > 12) this.time = 12;
        this.speedX = this.speedY = 0;
        
        if(game.map.eraseTile(x_tile, y_tile) == false) return false;

        game.X_buffer = -1;
        console.log("CRockDestroySpell force redrawTiles");
        
        this.x = x_tile * TILE_SIZE + TILE_SIZE/2;
        this.y = y_tile * TILE_SIZE + TILE_SIZE/2;
        this.particle = new cParticleSystem(game.data.particles["magicField"]);
        this.particle.init();   
    }
}