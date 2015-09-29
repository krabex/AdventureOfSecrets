/****************************************
 *  AOS - Adventure of secrets          *
 *  CSpellList.js                       *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

function CSpellList() {
    this.disableSpellAlpha = 0.25;
    this.marginLeft = 120;
    this.marginTop = 160;
    this.spaceBetween = 8;
    
    this.activeSpell = 1;
    
    // initialize spell list
    this.init = function() {
        
    }
    
    // update spell list
    this.update = function() {
        
    }
    
    // handle mouse up
    this.handleMouseUp = function(mx, my) {
        if(mx > this.marginLeft && mx < this.marginLeft + 5*(this.spaceBetween + ICON_SIZE) && my > this.marginTop && my < this.marginTop + 3*(ICON_SIZE + this.spaceBetween)) {
            mx -= this.marginLeft;
            my -= this.marginTop;
            if(mx%(ICON_SIZE+this.spaceBetween) > ICON_SIZE || my%(ICON_SIZE+this.spaceBetween) > ICON_SIZE) return;
            var cat = Math.floor(my/(ICON_SIZE+this.spaceBetween));
            var spell = Math.floor(mx/(ICON_SIZE+this.spaceBetween));
            this.activeSpell = (cat*10) + spell;
        }
        if(my > this.marginTop + 3*(ICON_SIZE + this.spaceBetween)) game.state = null;
    }
    
    //function render spell list and show information about spells
    this.render = function(ctx) {
        // fire spells
        var height = this.marginTop;
        for(var i = 0 ; i < 5 ; i++) {
            if(game.player.spells[game.data.fireSpells[i]] == 0)
                ctx.globalAlpha = this.disableSpellAlpha;
            else
                ctx.globalAlpha = 1;
            ctx.drawImage(game.imgManager["icons"], i*ICON_SIZE, ICON_SIZE*(4 + (game.player.spells[game.data.fireSpells[i]] == 0 ? 1 : game.player.spells[game.data.fireSpells[i]])), ICON_SIZE, ICON_SIZE,
                this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE)
            if(this.activeSpell == i) ctx.strokeStyle = '#FFFF99';
            ctx.roundRect(this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE, 4).stroke();
            if(this.activeSpell == i) ctx.strokeStyle = '#D3D3D3';
        }
        // acid spells
        height += ICON_SIZE + this.spaceBetween;
        for(var i = 0 ; i < 5 ; i++) {
            if(game.player.spells[game.data.acidSpells[i]] == 0)
                ctx.globalAlpha = this.disableSpellAlpha;
            else
                ctx.globalAlpha = 1;
            ctx.drawImage(game.imgManager["icons"], i*ICON_SIZE, ICON_SIZE*(7 + (game.player.spells[game.data.acidSpells[i]] == 0 ? 1 : game.player.spells[game.data.acidSpells[i]])), ICON_SIZE, ICON_SIZE,
                this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE);
            if(this.activeSpell == 10 + i) ctx.strokeStyle = '#FFFF99';
            ctx.roundRect(this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE, 4).stroke();
            if(this.activeSpell == 10 + i) ctx.strokeStyle = '#D3D3D3';
        }
        // nature spells
        height += ICON_SIZE + this.spaceBetween;
        for(var i = 0 ; i < 5 ; i++) {
            if(game.player.spells[game.data.natureSpells[i]] == 0)
                ctx.globalAlpha = this.disableSpellAlpha;
            else
                ctx.globalAlpha = 1;
            ctx.drawImage(game.imgManager["icons"], i*ICON_SIZE, ICON_SIZE*(10 + (game.player.spells[game.data.natureSpells[i]] == 0 ? 1 : game.player.spells[game.data.natureSpells[i]])), ICON_SIZE, ICON_SIZE,
                this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE);
            if(this.activeSpell == 20 + i) ctx.strokeStyle = '#FFFF99';
            ctx.roundRect(this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE, 4).stroke();
            if(this.activeSpell == 20 + i) ctx.strokeStyle = '#D3D3D3';
        }
        // black spells
        /* not available in this version
        height += ICON_SIZE + this.spaceBetween;
        for(var i = 0 ; i < 6 ; i++) {
            if(game.player.spells[game.data.blackSpells[i]] == 0)
                ctx.globalAlpha = this.disableSpellAlpha;
            else
                ctx.globalAlpha = 1;
            ctx.drawImage(game.imgManager["icons"], i*ICON_SIZE, ICON_SIZE*(13 + (game.player.spells[game.data.blackSpells[i]] == 0 ? 1 : game.player.spells[game.data.blackSpells[i]])), ICON_SIZE, ICON_SIZE,
                this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE);
            if(this.activeSpell == 30 + i) ctx.strokeStyle = '#FFFF99';
            ctx.roundRect(this.marginLeft + i*(ICON_SIZE+this.spaceBetween), height, ICON_SIZE, ICON_SIZE, 4).stroke();
            if(this.activeSpell == 30 + i) ctx.strokeStyle = '#D3D3D3';
        }*/
        ctx.globalAlpha = 1;
        // information box
        var boxgrd = ctx.createLinearGradient(0, 24, 0, 140);
        boxgrd.addColorStop(0, "rgba(40, 40, 40, 0.6)");
        boxgrd.addColorStop(1, "rgba(140, 140, 140, 0.9)");
        ctx.fillStyle = boxgrd;
        
        ctx.roundRect(120, 24, 200, 120, 10).stroke();
        ctx.fill();
        ctx.roundRect(350, 24, 200, 120, 10).stroke();
        ctx.fill();
        // spell information
        var spell = "";
        if(this.activeSpell >= 30) spell = game.data.blackSpells[this.activeSpell - 30];
        if(this.activeSpell < 10) spell = game.data.fireSpells[this.activeSpell];
        if(this.activeSpell >= 10 && this.activeSpell < 20) spell = game.data.acidSpells[this.activeSpell - 10];
        if(this.activeSpell >= 20 && this.activeSpell < 30) spell = game.data.natureSpells[this.activeSpell - 20];
		
		if(typeof game.data.spells[spell] == 'object') {
			this.renderSpellDetails(ctx, spell);
		}
    }
	
	this.renderSpellDetails = function(ctx, spell) {
		var spellBonus = game.player.spellsPower[Math.floor(this.activeSpell/10)];
		
		ctx.font = "12pt Calibri";
        ctx.fillStyle = '#D3D3D3';
        ctx.textAlign = 'left';
        wrapText(ctx, spell, 350 + this.spaceBetween, 24 + this.spaceBetween, 200, 14);
        wrapText(ctx, "Mana: " + game.data.spells[spell].mana, 350 + this.spaceBetween, 40 + this.spaceBetween, 200, 14);
        wrapText(ctx, "Spell level: " + game.player.spells[spell], 350 + this.spaceBetween, 56 + this.spaceBetween, 200, 14);
        if(typeof game.data.spells[spell].efficiency != "undefined") {
            wrapText(ctx, "Default efficiency: " + game.data.spells[spell].efficiency[game.player.spells[spell]-1], 350 + this.spaceBetween, 72 + this.spaceBetween, 200, 14);
            wrapText(ctx, "Real efficiency: " + Math.floor(spellBonus*game.data.spells[spell].efficiency[game.player.spells[spell]-1]), 350 + this.spaceBetween, 88 + this.spaceBetween, 200, 14);
        } else 
            wrapText(ctx, "Description: " + game.data.spells[spell].description, 350 + this.spaceBetween, 72 + this.spaceBetween, 200, 14);
        // spell gesture
        var x = 180;
        var y = 100;
        var gest = game.data.spells[spell].gesture;
        for(var i = -1 ; i < gest.length ; ) {
            var dx = x;
            var dy = y;
            do {
                i++
                switch(gest[i]) {
                    case "0": dx += 16; break;
                    case "1": dy += 10; dx += 10; break;
                    case "2": dy += 16; break;
                    case "3": dx -= 10; dy += 10; break;
                    case "4": dx -= 16; break;
                    case "5": dx -= 10; dy -= 10; break;
                    case "6": dy -= 16; break;
                    case "7": dy -= 10; dx += 10; break; 
                }
            } while(i+1 < gest.length && gest[i] == gest[i+1]);
            ctx.arrow(x, y, dx, dy).stroke();
            x = dx;
            y = dy;
        }
	}
}