/****************************************
 *  AOS - Adventure of secrets          *
 *  CSpellsManager.js                    *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
 
// Class for managing spells
function CSpellsManager() {
    this.spells = new Array();
    
    // function add spell 
    this.addSpell = function(name, character) {
        var spell;
        switch(name) {
            case "rockDestroy": 
                if(character.mana < 4) return;
                spell = new CRockDestroySpell(); 
                character.mana -= 5; break;
            case "ladder":
                if(character.mana < 3) return;
                spell = new CLadderSpell(); break;
            default: 
                if(typeof character.spells[name] == "undefined") {
                    console.log("Spell is forbidden for this character");
                    return;
                }
                if(character.spells[name] > 0) {
                    if(character.mana < game.data.spells[name].mana) return;
                    spell = game.data.spells[name].create();
                    character.mana -= game.data.spells[name].mana;
                    break;
                }
                    
                console.log("Unrecognized spell: " + name); return;
        }
        spell.init(character); 
        this.spells.push(spell);
    }
    
    // function update all spells
    this.update = function() {
        for(var i = 0 ; i < this.spells.length ; i++) {
            this.spells[i].update();
            // collision with tile
            if(game.map.special[Math.floor(this.spells[i].x/TILE_SIZE)][Math.floor(this.spells[i].y/TILE_SIZE)] == COLLISION)
                this.spells[i].collisionWithTile();
            // collision with characters
            for(var j = 0 ; j < game.characters.length ; j++)
                if(this.spells[i].owner.group != game.characters[j].group && game.data.groupRelation[this.spells[i].owner.group][game.characters[j].group] > 0)
                    if(this.spells[i].x > game.characters[j].x && this.spells[i].x < game.characters[j].x + game.characters[j].sprite.config.width && 
                   this.spells[i].y > game.characters[j].y - TILE_SIZE && this.spells[i].y < game.characters[j].y) {
                            this.spells[i].collisionWithSprite(game.characters[j]);
                            if(game.characters[j].health < 0) game.characters[j].health = 0;
                   }
            // collision with player
            if(this.spells[i].owner.group != game.player.group && game.data.groupRelation[game.player.group][this.spells[i].owner.group])
                if(this.spells[i].x > game.player.x && this.spells[i].x < game.player.x + game.player.sprite.config.width && 
                   this.spells[i].y > game.player.y - TILE_SIZE && this.spells[i].y < game.player.y) {
                        var dh = game.player.health;
                        this.spells[i].collisionWithSprite(game.player);
                        dh -= game.player.health;
                        if(game.effects >= 2) game.startShaking(2 + Math.floor(dh/3), 200);
                   }
            // removing old spells
            if(this.spells[i].active == false) {
                this.spells.splice(i, 1);
            }
        }
    }
    
    // function render all spells
    this.render = function(ctx) {
        for(key in this.spells) {
            if(this.spells[key].x < game.X_scroll || this.spells[key].x > (game.X_scroll + X_Resolution) || 
            this.spells[key].y < game.Y_scroll || this.spells[key].y > (game.Y_scroll + Y_Resolution))
                continue;
            this.spells[key].render(ctx);
        }
    } 
} 