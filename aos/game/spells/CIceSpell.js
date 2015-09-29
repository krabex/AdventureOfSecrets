/****************************************
 *  AOS - Adventure of secrets          *
 *  CIceSpell.js                        *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
// single ice missile
CIce.prototype = new CMovingSpell;
CIce.prototype.constructor = CIce;

function CIce() {
    this.time = DEFAULT_SPELL_TIME;
    
    this.init = function(owner) {
        console.log("init CIce");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["freezing"]);
        this.particle.positionRandom = Vector.create(6, 6);
        this.particle.init();
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height + rand(-18, 18);
        
        if(owner.direction == "LEFT") this.speedX = -8.0 + rand(-1, 1);
        if(owner.direction == "RIGHT") this.speedX = 8.0 + rand(-1, 1);
    }
    
    this.collisionWithSprite = function(character) {
        if(this.time > 6 && this.speedX != 0)
            this.time = 25;
        if(this.time > 24) {
            console.log("ice collision: " + this.owner.group + " -> " + character.group);
            character.health = character.health - Math.floor(this.owner.spellsPower[2] * character.defend * (8   + this.owner.spells["ice"]));
            this.particle.maxParticles = 16;
            this.particle.positionRandom = Vector.create(24, 24);
            this.speedX = this.speedY = 0;
            this.time = 24;
        }
    }
}

// CIceSpell

CIceSpell.prototype = new CSpell;
CIceSpell.prototype.constructor = CIceSpell;

function CIceSpell() {
    this.ice = 0;
    this.maxIce;
    this.time = 12*4;
    
    this.init = function(owner) {
        console.log("init CIceSpell");
        this.owner = owner;
        switch(owner.spells["ice"]) {
            case 1: this.maxIce = 1; break;
            case 2: this.maxIce = 3; break;
            case 3: this.maxIce = 6; break;
        }
    }
    
    this.update = function() {
        if(this.ice < this.maxIce && this.time%6 == 0) {
            var ice = new CIce();
            ice.init(this.owner);
            game.spellsManager.spells.push(ice);
            this.ice++;
        }
        if(this.time-- < 1)
            this.active = false;
    }
}