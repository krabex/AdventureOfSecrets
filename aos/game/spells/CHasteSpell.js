/****************************************
 *  AOS - Adventure of secrets          *
 *  CHasteSpell.js                     *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

CHasteSpell.prototype = new CSpell;
CHasteSpell.prototype.constructor = CHasteSpell;

function CHasteSpell() {
    this.bonus = 0;
    
    this.init = function(owner) {
        console.log("init CHasteSpell");
        this.owner = owner;
        // spell already exist
        if(owner.speed > 3) {
            owner.mana += game.data.spells["haste"].mana;
            this.active = false;
            return;
        }
        this.particle = new cParticleSystem(game.data.particles["fire"]);
        this.particle.size = 10;
        this.particle.init();
        this.time = 60 + owner.spells["haste"]*60;
        this.bonus = Math.floor(owner.spells["haste"] * owner.spellsPower[0]);
        this.owner.speed += this.bonus;  
    }
    
    this.update = function() {
        if(this.owner.isWalking)
            this.particle.maxParticles = 10;
        else
            this.particle.maxParticles = 0;
        this.x = this.owner.x;
        this.y = this.owner.y;
        if(game.effects > 1) {
            this.particle.position.x = this.x - game.X_scroll;
            this.particle.position.y = this.y - game.Y_scroll;
            this.particle.update(1);
        }
        if(this.time-- < 1) {
            this.active = false;
            this.owner.speed -= this.bonus;
        }
    }
    
    this.render = function(ctx) {
        if(game.effects > 1) {
            this.particle.render(ctx);
        }
    }
}
