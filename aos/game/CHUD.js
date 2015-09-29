/****************************************
 *  AOS - Adventure of secrets          *
 *  CHUD.js                             *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

 // function is used to organize HUD (display, update etc)
function CHUD() {
    this.hud_mana;
    this.hud_health;
    this.healthgrd;
    this.managrd;
    
    this.height = 32;
    this.countersWidth = 64;
    this.spaceBetween = 12;
    this.marginBottom = 8;
    this.buttonSize = ICON_SIZE /2;
    this.barWidth = (X_Resolution - 2*this.countersWidth - 6*this.spaceBetween - this.buttonSize)/2;
    this.font = "14pt Calibri";
    
    // initialize HUD class
    this.init = function(ctx) {
        this.healthgrd = ctx.createLinearGradient(0, Y_Resolution - this.height, 0, Y_Resolution);
        this.healthgrd.addColorStop(0, 'rgba(133, 22, 22, 0.8)');
        this.healthgrd.addColorStop(0.5, 'rgba(255, 0, 0, 0.8)');
        this.healthgrd.addColorStop(1, 'rgba(133, 22, 22, 0.8)');
        this.managrd = ctx.createLinearGradient(0, Y_Resolution - this.height, 0, Y_Resolution);
        this.managrd.addColorStop(0, 'rgba(22, 22, 133, 0.8)');
        this.managrd.addColorStop(0.5, 'rgba(62, 158, 255, 0.8)');
        this.managrd.addColorStop(1, 'rgba(22, 22, 133, 0.8)');
        this.hud_mana = game.player.mana;
        this.hud_health = game.player.health;
    }
    
    // handle mouse up
    this.handleMouseUp = function(mx, my) {
        if(my > Y_Resolution - this.buttonSize - this.spaceBetween && mx > X_Resolution - ICON_SIZE*2) {
            game.dialogManager.dialog(game.data.gameMenuDialog);
        }
    }
    
    // update HUD class
    this.update = function() {
        if(this.hud_mana < game.player.mana) this.hud_mana++;
        if(this.hud_mana > game.player.mana) this.hud_mana--;
        if(this.hud_health < game.player.health) this.hud_health++;
        if(this.hud_health > game.player.health) this.hud_health--;
    }
    
    // render HUD on canvas context passed by parameter
    this.render = function(ctx) {
        var left = this.spaceBetween;
        ctx.lineWidth = 1;
        // background
        ctx.beginPath();
        ctx.rect(0, Y_Resolution - this.height, X_Resolution, this.height);
        var grd = ctx.createLinearGradient(0, Y_Resolution - this.height, 0, Y_Resolution);
        grd.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
        grd.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.strokeStyle = '#999999';
        // init font
        ctx.font = this.font;
        ctx.fillStyle = '#999999';
        // potion counter
        ctx.textAlign = 'right';
        ctx.roundRect(left , Y_Resolution - this.height + this.marginBottom, this.countersWidth , this.height/2 + 2, 4).stroke();
        ctx.drawImage(game.imgManager["icons"], 0, ICON_SIZE*3, ICON_SIZE, ICON_SIZE, this.spaceBetween - 3, Y_Resolution - this.height, this.height, this.height);
        ctx.fillText(game.player.potions, this.spaceBetween + this.countersWidth - 3, Y_Resolution - this.height + this.marginBottom);
        left += this.spaceBetween + this.countersWidth;
        // gold counter
        ctx.roundRect(left, Y_Resolution - this.height + this.marginBottom, this.countersWidth , this.height/2 + 2, 4).stroke();
        ctx.drawImage(game.imgManager["icons"], ICON_SIZE, ICON_SIZE*3, ICON_SIZE, ICON_SIZE, this.spaceBetween*2+this.countersWidth - 3, Y_Resolution - this.height, this.height, this.height);
        ctx.fillText(game.player.gold, 2*(this.spaceBetween+this.countersWidth) - 3, Y_Resolution - this.height + this.marginBottom);
        left += this.spaceBetween + this.countersWidth;
        // health bar
        ctx.textAlign = 'center';
        ctx.fillStyle = this.healthgrd;
        ctx.roundRect(left, Y_Resolution - this.height + this.marginBottom, this.barWidth * this.hud_health / game.player.maxHealth, this.height/2, 4).fill();
        ctx.roundRect(left, Y_Resolution - this.height + this.marginBottom-1, this.barWidth, this.height/2 + 2, 4).stroke();
        ctx.fillStyle = '#999999';
        ctx.fillText(game.player.health + "/" + game.player.maxHealth, left+this.barWidth/2, Y_Resolution - this.height + this.marginBottom);
        left += this.spaceBetween + this.barWidth;
        // mana bar
        ctx.fillStyle = this.managrd;
        ctx.roundRect(left, Y_Resolution - this.height + this.marginBottom, this.barWidth * this.hud_mana / game.player.maxMana, this.height/2, 4).fill();
        ctx.roundRect(left, Y_Resolution - this.height + this.marginBottom-1, this.barWidth, this.height/2 + 2, 4).stroke();
        ctx.fillStyle = '#999999';
        ctx.fillText(game.player.mana + "/" + game.player.maxMana, left+this.barWidth/2, Y_Resolution - this.height + this.marginBottom);
        left += this.spaceBetween + this.barWidth;
        // menu button
        ctx.drawImage(game.imgManager["icons"], 0, ICON_SIZE*4, ICON_SIZE, ICON_SIZE, left , Y_Resolution - this.buttonSize - this.spaceBetween, this.buttonSize, this.buttonSize);
        ctx.roundRect(left, Y_Resolution - this.buttonSize - this.spaceBetween-1, this.buttonSize + 2, this.buttonSize + 2, 4).stroke();
    }
}
