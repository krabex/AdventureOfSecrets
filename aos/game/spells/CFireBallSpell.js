/****************************************
 *  AOS - Adventure of secrets          *
 *  CFireBallSpell.js                     *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

 // fireBall spell
CFireBallSpell.prototype = new CMovingSpell("fireBall");
CFireBallSpell.prototype.constructor = CFireBallSpell;

function CFireBallSpell() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CFireBallSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["fireBall"]);
        switch(owner.spells["fireBall"]) {
            case 1: this.particle.size = 16; break;
            case 2: this.particle.size = 28; break;
            case 3: this.particle.size = 40; break;
        }
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        if(owner.direction == "LEFT") this.speedX = -8.0;
        if(owner.direction == "RIGHT") this.speedX = 8.0;
    }
    
    this.collisionWithSprite = function(character) {
        if(this.time > 6) {
            console.log("fireBall collision: " + this.owner.group + " -> " + character.group);
            character.health -= Math.floor(this.owner.spellsPower[0] * 12 * this.owner.spells["fireBall"] * character.defend);
            this.particle.maxParticles = 0;
            this.speedX = this.speedY = 0;
            this.time = 6;
        }
    }
}