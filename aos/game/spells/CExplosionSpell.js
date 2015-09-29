/****************************************
 *  AOS - Adventure of secrets          *
 *  CExplosionSpell.js                  *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

CExplosionSpell.prototype = new CMovingSpell();
CExplosionSpell.prototype.constructor = CExplosionSpell;

function CExplosionSpell() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CExplosionSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["fireBall"]);
        this.particle.size = 20;
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        if(owner.direction == "LEFT") this.speedX = -14.0;
        if(owner.direction == "RIGHT") this.speedX = 14.0;
    }
    
    this.collisionWithSprite = function(character) {
        if(this.time > 6 && this.speedX != 0)
            this.time = 27;
        if(this.time > 26) {
            console.log("explosion collision: " + this.owner.group + " -> " + character.group);
            character.health = character.health - Math.floor(this.owner.spellsPower[2] * character.defend * (5   + this.owner.spells["explosion"]*20));
            this.particle.maxParticles = 0;
            this.speedX = this.speedY = 0;
            this.time = 26;
        }
        if(this.time == 23 && this.speedX == 0) {
            this.particle = new cParticleSystem(game.particlesManager["explosion"]);
            this.particle.position = Vector.create(character.x + character.sprite.config.width/2, character.y - character.sprite.config.height/2);
            this.particle.maxParticles = 30 * this.owner.spells["explosion"];
            this.particle.init();
        }
        if(this.time == 20 && this.speedX == 0)
            this.particle.maxParticles = 0;
    }
}
