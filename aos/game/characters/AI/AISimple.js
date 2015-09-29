/****************************************
 *  AOS - Adventure of secrets          *
 *  AISimple.js                         *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
// simple AI - walking from wall to wall
function AISimple() {
    this.init = function() {
        this.direction = "LEFT";
        this.isWalking = true;
        this.spellTime = 0;
    }
    
    this.collisionDetected = function() {
        console.log("collision detected");
        if(this.direction == "LEFT")
            this.direction = "RIGHT";
        else if(this.direction == "RIGHT")
            this.direction = "LEFT";
    }
    
    this.playerSpoted = function(distance) {
        this.spellTime--;
        if(this.spellTime < 0)
            this.spellTime = 0;
            
        // healing
        if(this.health < this.maxHealth/2 && this.spells["heal"] > 0)
            game.spellsManager.addSpell("heal", this);
        // walking toward player
        if(distance == "INSIGHT") {
            this.direction = ( game.player.x < this.x ? "LEFT" : "RIGHT");
            this.isWalking = true;
        }
        // fighting
        if(distance == "CLOSE") {
            this.isWalking = false;
            if(game.player.x < this.x && this.direction != "LEFT") {
                this.direction = "LEFT";
                this.sprite.startAnimation("left");
            }
            if(game.player.x > this.x && this.direction != "RIGHT") {
                this.direction = "RIGHT";
                this.sprite.startAnimation("right");
            }
            if(this.spellTime <= 0) {
                game.spellsManager.addSpell("poisonedLeaf", this);
                this.spellTime += 120;
            }      
        }
        if(distance == "NORMAL" && this.isWalking == false)
            this.isWalking = true;
    }
}
