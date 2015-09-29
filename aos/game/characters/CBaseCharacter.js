/****************************************
 *  AOS - Adventure of secrets          *
 *  CBaseCharacter.js                   *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
 
// Character base class. Responsible for:
//  * detecting collisions
//  * updating position
//  * updating proper animation
function CBaseCharacter() {
    this.health;
    this.maxHealth;
    this.mana;
    this.maxMana;
    this.manaRegeneration = 1;
    this.manaRegenerated = 0;
    this.spellsPower = [1, 1, 1, 1];
    this.spells = new Array();
    this.group;
    this.defend = 1;
    this.poison = { "time" : 0, "strange" : 0 };
    
    this.x = 0;
    this.y = 0;
    this.speed = 3;
    this.gravity = 0;
    this.direction = 0;
    this.isWalking = false;
    
    this.sprite;
    
    // function set character position
    this.setPosition = function(nx, ny) {
        this.x = nx;
        this.y = ny;
    }
    
    // function detect collisions
    this.detectCollision = function() {
        var tile_x = Math.floor((this.x-1) / TILE_SIZE);
        var tile_y = Math.floor((this.y-1) / TILE_SIZE);
        var in_one_tile = Math.floor((this.x + this.sprite.config.width)/TILE_SIZE) == tile_x;
        
        if(this.isWalking)
            switch(this.direction) {
                case "LEFT":
                    if(Math.floor((this.x - this.speed) / TILE_SIZE) < tile_x && game.map.special[tile_x-1][tile_y] == COLLISION)
                        return true;
                    if(Math.floor((this.x - this.speed) / TILE_SIZE) < tile_x && game.map.special[tile_x-1][tile_y] != LADDER && game.map.special[tile_x-1][tile_y] != COLLISION && game.map.special[tile_x-1][tile_y+1] != COLLISION)
                        return true;
                    if(game.map.special[tile_x][tile_y] == LADDER && game.map.special[tile_x-1][tile_y+1] == COLLISION
                        && game.map.special[tile_x-1][tile_y] != COLLISION && game.map.special[tile_x-1][tile_y-1] == COLLISION
                        && this.y - this.sprite.config.height + SPRITE_ADD_HEIGHT < tile_y * TILE_SIZE)
                            return true;
                    break;
                case "RIGHT":
                    if(Math.floor((this.x + this.sprite.config.width + this.speed) / TILE_SIZE) > tile_x  && game.map.special[tile_x+1][tile_y] == COLLISION)
                        return true;
                    if(Math.floor((this.x + this.sprite.config.width + this.speed) / TILE_SIZE) > tile_x  && game.map.special[tile_x+1][tile_y] != LADDER && game.map.special[tile_x+1][tile_y] != COLLISION && game.map.special[tile_x+1][tile_y+1] != COLLISION)
                        return true;
                    if(game.map.special[tile_x][tile_y] == LADDER && game.map.special[tile_x+1][tile_y+1] == COLLISION
                        && game.map.special[tile_x+1][tile_y] != COLLISION && game.map.special[tile_x+1][tile_y-1] == COLLISION
                        && this.y - this.sprite.config.height + SPRITE_ADD_HEIGHT < tile_y * TILE_SIZE)
                            return true;
                    break;
                case "UP":
                    if(game.map.special[tile_x][tile_y] != LADDER)
                        return true;
                    if(in_one_tile == false || (game.map.special[tile_x][tile_y-1] != LADDER && this.y - this.speed + this.sprite.config.height < (tile_y+2)*TILE_SIZE))
                        return true;
                    break;
                case "DOWN":
                    if(game.map.special[tile_x][tile_y] != LADDER)
                        return true;
                    if(in_one_tile == false || (game.map.special[tile_x][tile_y+1] != LADDER && this.y + this.speed >= (tile_y+1)*TILE_SIZE))
                        return true;
                    break;
            }
        return false;
    }
    
    // function move character
    this.updatePosition = function() {
        var tile_x = Math.floor((this.x-1) / TILE_SIZE);
        var tile_y = Math.floor((this.y-1) / TILE_SIZE);
        
        if(this.isWalking) 
        switch(this.direction) {
            case "LEFT": this.x -= this.speed; break;
            case "RIGHT": this.x += this.speed; break;
            case "UP": this.y -= this.speed; break;
            case "DOWN": this.y += this.speed; break;
        }
        // gravity
        if( game.map.special[tile_x][tile_y] != LADDER && (this.y % TILE_SIZE > 0) || (game.map.special[tile_x][tile_y+1] != COLLISION) && game.map.special[tile_x][tile_y+1] != LADDER) {
            if(this.gravity < TILE_SIZE) this.gravity++;
            if(game.map.special[tile_x][Math.floor((this.y+this.gravity) / TILE_SIZE)] == COLLISION) {
                this.y += TILE_SIZE - this.y%TILE_SIZE;
                if(this.gravity > TILE_SIZE/4)
                    this.health -= this.gravity;
                this.gravity = 0;
            }
            this.y += this.gravity;
        }
    }
    
    // function set proper animation
    this.updateAnimation = function() {
        var tile_x = Math.floor((this.x-1) / TILE_SIZE);
        var tile_y = Math.floor((this.y-1) / TILE_SIZE);
        
        if(this.isWalking) {
            switch(this.direction) {
                case "LEFT":    if(game.map.special[tile_x][tile_y] == LADDER || game.map.special[Math.floor((this.x-1+this.sprite.config.width) / TILE_SIZE)][tile_y] == LADDER) {
                                    if(this.sprite.currentAnimation != "up" || this.sprite.isAnimating == false)
                                        this.sprite.startAnimation("up");
                                } else if(this.sprite.currentAnimation != "left" || this.sprite.isAnimating == false)
                                        this.sprite.startAnimation("left"); 
                                break;
                case "RIGHT":   if(game.map.special[tile_x][tile_y] == LADDER || game.map.special[Math.floor((this.x-1+this.sprite.config.width) / TILE_SIZE)][tile_y] == LADDER) {
                                    if(this.sprite.currentAnimation != "up" || this.sprite.isAnimating == false)
                                        this.sprite.startAnimation("up");
                                } else if(this.sprite.currentAnimation != "right" || this.sprite.isAnimating == false)
                                        this.sprite.startAnimation("right"); 
                                break;
                case "UP":      if(this.sprite.currentAnimation != "up" || this.sprite.isAnimating == false)
                                    this.sprite.startAnimation("up"); 
                                break;
                case "DOWN":    if(this.sprite.currentAnimation != "up" || this.sprite.isAnimating == false)
                                    this.sprite.startAnimation("up"); 
                                break;
            }
        }
        if(this.isWalking == false)
            this.sprite.stopAnimation();
    }
    
    // function update poison
    this.updatePoison = function() {
        if(this.poison.time > 0) {
            if(this.poison.time % 50 == 0) {
                this.health -= this.poison.strange;
                if(game.effects > 1) {
                    this.poison.particle.position.x = this.x - game.X_scroll;
                    this.poison.particle.position.y = this.y - game.Y_scroll - this.sprite.config.height/2;
                    this.poison.particle.maxParticles = 16;
                }
            } else  this.poison.particle.maxParticles = 0;
            this.poison.particle.update(1);
            this.poison.time--;
        }
    }
    
    // function set poison parameters
    this.setPoison = function(time, strange) {
        if(time*strange > this.poison.time*this.poison.strange) {
            this.poison.time = time;
            this.poison.strange = strange;
        }
    }
} 