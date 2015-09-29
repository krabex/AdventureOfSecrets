/****************************************
 *  AOS - Adventure of secrets          *
 *  CMovingSpell.js                     *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

// base class for all moving spells
CMovingSpell.prototype = new CSpell();
CMovingSpell.prototype.constructor = CMovingSpell;

function CMovingSpell() {
    this.particle;
    this.speedX = 0;
    this.speedY = 0;
    
    this.init = function() {
        this.owner = owner;
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        if(owner.direction == "LEFT") this.speedX = -8.0;
        if(owner.direction == "RIGHT") this.speedX = 8.0;
    }
    
    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.particle.position.x = this.x - game.X_scroll;
        this.particle.position.y = this.y - game.Y_scroll;
        this.particle.update(1);
        if(this.time < 6)
            this.particle.maxParticles = 0;
        if(this.time-- < 1)
            this.active = false;
    }
    
    this.collisionWithTile = function() {
        this.time = 5;
        this.speedX = this.speedY = 0;
    }
    
    this.render = function(ctx) {
        this.particle.render(ctx);
    }
}