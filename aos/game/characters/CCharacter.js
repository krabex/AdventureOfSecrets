/****************************************
 *  AOS - Adventure of secrets          *
 *  CPlayer.js                          *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
// Elastic character class for enemies and NPC
CCharacter.prototype = new CBaseCharacter();
CCharacter.prototype.constructor = CCharacter;

function CCharacter() {
    this.AI;
    this.characterRandom;
    
    // function set character AI
    this.applyAI = function(AI_param) {
        this.AI = AI_param;
    }
    
    // function set character
    this.setCharacter = function(id) {
        if(typeof game.data.characters[id] == "undefined") {
            console.log("Unrecognized character: " + id); // DEBUG
            return;
        }
        
        for(var key in game.data.characters[id])
            this[key] = game.data.characters[id][key];
        
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.poison.particle = new cParticleSystem(game.particlesManager["poison"]);
        this.poison.particle.init();
        console.log("Character health: " + this.health + " / " + this.maxHealth);
        this.sprite = game.imgManager.createSprite(game.data.characters[id].sprite);
        this.characterRandom = rand(0, 100);
        this.applyAI(game.AIManager[game.data.characters[id].AI]);
        this.AI.init.call(this);
    }
    
    // function update character position, animation
    this.update = function() {
        if(this.health > 0) {
            if(this.detectCollision())
                this.AI.collisionDetected.call(this);

            this.updatePosition();
            this.updateAnimation();
        
            var dist_x = Math.abs(game.player.x - this.x);
            var dist_y = Math.abs(game.player.y - this.y);
            if(dist_y > 2*TILE_SIZE) 
                this.AI.playerSpoted.call(this, "FAR");
            else if(dist_x > SCOPE && dist_x < 2*SCOPE)
                this.AI.playerSpoted.call(this, "NORMAL");
            else if(dist_x < SCOPE && dist_x > SCOPE/2)
                this.AI.playerSpoted.call(this, "INSIGHT");
            else if(dist_x < SCOPE/2 + this.characterRandom)
                this.AI.playerSpoted.call(this, "CLOSE");
            // mana regeneration
            if(this.mana < this.maxMana)
                this.manaRegenerated += this.manaRegeneration;
            if(this.manaRegenerated > 20) {
                this.mana += 1;
                this.manaRegenerated -= 20;
            }
            // poison
            this.updatePoison();
        } else this.health--;     
    }
}
