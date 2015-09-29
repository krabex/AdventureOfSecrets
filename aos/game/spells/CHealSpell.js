/****************************************
 *  AOS - Adventure of secrets          *
 *  CHealSpell.js                       *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
CHealSpell.prototype = new CSpell;
CHealSpell.prototype.constructor = CHealSpell;

function CHealSpell() {
    this.particle;
    this.time = 12;
    
    this.init = function(owner) {
        console.log("init CHealSpell");
        this.owner = owner;
        this.particle = new cParticleSystem(game.data.particles["greenAura"]);
        switch(owner.spells["heal"]) {
            case 1: this.particle.maxParticles = 32; 
                    owner.health += Math.floor(owner.spellsPower[1] * 25); break;
            case 2: this.particle.maxParticles = 48;
                    owner.health += Math.floor(owner.spellsPower[1] * 50); break;
            case 3: this.particle.maxParticles = 64; 
                    owner.health += Math.floor(owner.spellsPower[1] * 80); break;
        }
        this.x = owner.x + owner.sprite.config.width/2;
        this.y = owner.y - owner.sprite.config.height/2;
        this.time = this.time * owner.spells["heal"];
        this.particle.duration = (this.time/2);
        this.particle.init();
        
        if(owner.health > owner.maxHealth)
            owner.health = owner.maxHealth;
    }
    
    this.update = function() {
        this.particle.position.x = this.x - game.X_scroll;
        this.particle.position.y = this.y - game.Y_scroll;
        this.particle.update(1);
        if(this.time-- < 1)
            this.active = false;
    }
    
    this.render = function(ctx) {
        this.particle.render(ctx);
    }
}
