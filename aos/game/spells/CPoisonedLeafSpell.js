/****************************************
 *  AOS - Adventure of secrets          *
 *  CPoisonedLeafSpell.js               *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

CPoisonedLeafSpell.prototype = new CMovingSpell;
CPoisonedLeafSpell.prototype.constructor = CPoisonedLeafSpell;

function CPoisonedLeafSpell() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CPoisonedLeafSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["poison"]);
        switch(owner.spells["poisonedLeaf"]) {
            case 1: this.particle.maxParticles = 16; break;
            case 2: this.particle.maxParticles = 26; break;
            case 3: this.particle.maxParticles = 36; break;
        }
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height;
        if(owner.direction == "LEFT") this.speedX = -8.0;
        if(owner.direction == "RIGHT") this.speedX = 8.0;
    }
    
    this.collisionWithSprite = function(character) {
        if(this.time > 6) {
            console.log("poisonedLeaf collision: " + this.owner.group + " -> " + character.group);
            character.health -= Math.floor(5 + this.owner.spellsPower[1] * 5 * this.owner.spells["poisonedLeaf"] * character.defend);
            character.setPoison(Math.floor(750 * this.owner.spellsPower[1] * character.defend), this.owner.spells["poisonedLeaf"]);
            this.particle.maxParticles = 0;
            this.speedX = this.speedY = 0;
            this.time = 6;
        }
    }
}

