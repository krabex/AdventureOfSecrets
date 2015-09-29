/****************************************
 *  AOS - Adventure of secrets          *
 *  CPlayer.js                          *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

CPlayer.prototype = new CBaseCharacter();
CPlayer.prototype.constructor = CPlayer();

function CPlayer() {
    this.type = 0;
    
    this.gold = 100;
    this.potions = 0;
    this.group = "PLAYER";

    // function set player character
    this.setCharacter = function(id) {
        switch(id)
        {
            case "player1": 
                this.maxHealth = 100;
                this.maxMana = 120;
                this.spellsPower[2] = 1.25;
                this.sprite = game.imgManager.createSprite(id);
                this.id = 0;
                break;
            case "player2":
                this.maxHealth = 120;
                this.maxMana = 100;
                this.spellsPower[0] = 1.25;
                this.sprite = game.imgManager.createSprite(id);
                this.id = 1;
                break;
            case "player3":
                this.maxHealth = this.maxMana = 100;
                this.manaRegeneration = 1.5;
                this.spellsPower[1] = 1.25;
                this.sprite = game.imgManager.createSprite(id);
                this.id = 2;
                break;
        }
        this.potions = 2;
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.poison.particle = new cParticleSystem(game.data.particles["poison"]);
        this.poison.particle.init();
    }    
    
    // function update player position, animation
    this.update = function() {
        var tile_x = Math.floor((this.x-1) / TILE_SIZE);
        var tile_y = Math.floor((this.y-1) / TILE_SIZE);
        var in_one_tile = Math.floor((this.x + this.sprite.config.width)/TILE_SIZE) == tile_x;

        // setting direction
        if(game.keyPressed["LEFT"])         { this.direction = "LEFT"; this.isWalking = true; }
        else if(game.keyPressed["RIGHT"])   { this.direction = "RIGHT"; this.isWalking = true; }
        else if(game.keyPressed["UP"])      { this.direction = "UP"; this.isWalking = true; }
        else if(game.keyPressed["DOWN"])    { this.direction = "DOWN"; this.isWalking = true; }
        else {
            this.isWalking = false;
            if(this.sprite.isAnimating) this.sprite.stopAnimation();
        }
        
        // detecting collision
        if(this.detectCollision())
            this.isWalking = false;
        
        // detect special tiles
        if(in_one_tile && typeof game.data.items[game.map.special[tile_x][tile_y]] != "undefined") {
            game.data.items[game.map.special[tile_x][tile_y]].collisionWithSprite(this);
            game.map.cover[tile_x][tile_y] = game.data.items[game.map.special[tile_x][tile_y]].emptyTile;
            game.map.special[tile_x][tile_y] = EMPTY_TILE;
            game.X_buffer = -1;
            console.log("CPlayer - detecting special tiles force redrawTiles");
        }

        // moving
        this.updatePosition();
        
        // animating     
        this.updateAnimation();
        
        // detecting triggers
        if(game.map.special[tile_x][tile_y] >= TRIGGER && game.map.special[tile_x][tile_y] < TRIGGER + 20) {
            var trg = game.map.triggers[game.map.special[tile_x][tile_y] - TRIGGER];
            switch(trg.type) {
                case "single": 
                    if(typeof trg.visited == "undefined") {
                        trg.action();
                        trg.visited = (new Date).getTime();
                    }
                    break;
                case "multiple": 
                    if(typeof trg.visited == "undefined" || ((new Date()).getTime() - trg.visited) > trg.interval) {
                        trg.action(); 
                        trg.visited = (new Date).getTime();
                    }
                    break;
                case "constant":
                    trg.action(); break;
            }
        }
        // mana regeneration
        if(this.mana < this.maxMana)
            this.manaRegenerated += this.manaRegeneration;
        if(this.manaRegenerated > 20) {
            this.mana += 1;
            this.manaRegenerated -= 20;
        }
        // poison
        this.updatePoison();
    }
}