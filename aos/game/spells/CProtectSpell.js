/****************************************
 *  AOS - Adventure of secrets          *
 *  CProtectSpell.js                    *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

 CProtectSpell.prototype = new CSpell;
CProtectSpell.prototype.constructor = CProtectSpell;

function CProtectSpell() {
    this.particle;
    this.time = 12;
    
    this.init = function(owner) {
        console.log("init CProtectSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["blueAura"]);
        // spell already exist
        if(owner.defend < 1) {
            owner.mana += game.data.spells["protect"].mana;
            this.active = false;
            return;
        }
        switch(owner.spells["protect"]) {
            case 1: this.particle.maxParticles = 36; break;
            case 2: this.particle.maxParticles = 48; break;
            case 3: this.particle.maxParticles = 64; break;
        }
        this.time = 30 * this.owner.spells["protect"];
        this.x = owner.x;
        this.y = owner.y - owner.sprite.config.height/2;
        this.particle.init();
        this.owner.defend -= 1.5*this.owner.spells["protect"]/10;
    }
    
    this.update = function() {
        this.particle.position.x = this.x - game.X_scroll;
        this.particle.position.y = this.y - game.Y_scroll;
        this.particle.update(1);
        if(this.time < 6)
            this.particle.maxParticles = 0;
        if(this.time-- < 1) {
            this.owner.defend += 1.5*this.owner.spells["protect"]/10;
            this.active = false;
        }
    }
    
    this.render = function(ctx) {
        this.particle.render(ctx);
    }
}
