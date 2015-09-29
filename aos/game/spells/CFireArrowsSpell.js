/****************************************
 *  AOS - Adventure of secrets          *
 *  CFireArrowsSpell.js                 *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
// Fire arrows
// single fire arrow
CFireArrow.prototype = new CMovingSpell;
CFireArrow.prototype.constructor = CFireArrow;

function CFireArrow() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CFireArrow");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["fireBall"]);
        switch(owner.spells["fireArrows"]) {
            case 1: this.particle.size = 16; break;
            case 2: this.particle.size = 20; break;
            case 3: this.particle.size = 24; break;
        }
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height + rand(-18, 18);
        
        if(owner.direction == "LEFT") this.speedX = -8.0 + rand(-1, 1);
        if(owner.direction == "RIGHT") this.speedX = 8.0 + rand(-1, 1);
    }
    
    this.collisionWithSprite = function(character) {
        if(this.time > 6) {
            console.log("fireAroow collision: " + this.owner.group + " -> " + character.group);
            character.health = character.health - Math.floor(this.owner.spellsPower[0] * character.defend * (7 + this.owner.spells["fireArrows"]));
            this.particle.maxParticles = 0;
            this.speedX = this.speedY = 0;
            this.time = 6;
        }
    }
}

// CFireArrowsSpell

CFireArrowsSpell.prototype = new CSpell;
CFireArrowsSpell.prototype.constructor = CFireArrowsSpell;

function CFireArrowsSpell() {
    this.arrows = 0;
    this.maxArrows;
    this.time = 12*4;
    
    this.init = function(owner) {
        console.log("init CFireArrowsSpell");
        this.owner = owner;
        this.maxArrows = owner.spells["fireArrows"]*2;
    }
    
    this.update = function() {
        if(this.arrows < this.maxArrows && this.time%6 == 0) {
            var arrow = new CFireArrow();
            arrow.init(this.owner);
            game.spellsManager.spells.push(arrow);
            this.arrows++;
        }
        if(this.time-- < 1)
            this.active = false;
    }
}