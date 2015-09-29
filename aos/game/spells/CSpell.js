/****************************************
 *  AOS - Adventure of secrets          *
 *  CSpell.js                     *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

/* 
   Spell template:
   * init
   * collisionWithTile
   * collisionWithSprite
   * update
   * render
*/

function CSpell() {
    this.x = 0;
    this.y = 0;
    this.owner;
    this.active = true;
    this.time;
    
    // abstract methods
    this.init = function() {};
    this.collisionWithSprite = function() {};
    this.collisionWithTile = function() {};
    this.update = function() {};
    this.render = function(ctx) {}
}