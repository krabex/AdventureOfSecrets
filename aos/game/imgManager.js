/****************************************
 *  AOS - Adventure of secrets          *
 *  imgManager.js                       *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
 
 // Sprite class
 /* config properties:
 {
    atlas: atlas name,
    x: x offset in atlas,
    y: y offset in atlas,
    width: single frame width,
    height: single frame height,
    animations: array of animations config
    {
        name: {
            id: animation id
            length: how many frames contain this animation,
            speed: animation speed,                        
        } , (...)    
    }
 }
 */
 function CSprite() {
        this.currentAnimation = "default";
        this.currentFrame = 0;
        this.isAnimating = false;
        this.timePerFrame;
        this.animationID;
        this.config;
        
        this.offset_x = 0;
        this.offset_y = 0;
        
        // start animation
        this.startAnimation = function(name) {
            if(typeof this.config.animations[name] == "undefined") console.log("CSprite: animation " + name + " doesnt exist!"); // DEBUG
            // object has already animation started
            if(this.isAnimating && this.currentAnimation == name)
                return false;
            // object hasnt stop animation yet
            if(this.isAnimating)
                this.stopAnimation();
            // start animation
            this.timePerFrame = this.config.animations[name].speed / this.config.animations[name].length;
            if(this.timePerFrame != 0) {
                this.currentAnimation = name;
                this.offset_x = this.config.x + this.currentFrame * this.config.width;
                this.offset_y = this.config.y + this.config.animations[this.currentAnimation].id * this.config.height;
                this.animationID = setTimeout((function(self) {
                    return function() {self.animate(); } } )(this), this.timePerFrame);
                this.isAnimating = true;
            }
        }
        
        // stop animation
        this.stopAnimation = function() {
            clearTimeout(this.animationID);
            this.isAnimating = false;
            this.currentFrame = 0;
        }
        
        // function change current frame
        this.animate = function() {
            this.currentFrame = (this.currentFrame + 1) % this.config.animations[this.currentAnimation].length;
            this.offset_x = this.config.x + this.currentFrame * this.config.width;
            this.offset_y = this.config.y + this.config.animations[this.currentAnimation].id * this.config.height;
            this.animationID = setTimeout((function(self) {
                return function() {self.animate(); } } )(this), this.timePerFrame);
        } 
 }
 
 // Image manager class
function CImgManager() {
    var loadedImages = 0;
    var nbImages = 0;
    
    this.sprites = new Array();
    this.sprite_x_offset = 0;
    this.sprite_y_offset = 0;
    
    // function load new image
    this.addImage = function(name, src, callback) {
        nbImages++;
        this[name] = new Image();
        this[name].onload = function() {
            loadedImages++;
            if(typeof callback != "undefined")
                callback.call(this);
        }
        this[name].src = src;
    }
    
    // function return loading progress
    this.getProgress = function() {
        return Math.floor(loadedImages / nbImages * 100);
    }
    
    // function add sprite info to array
    this.addSprite = function(name, config) {
        var sprite = new Object;
        var nbAnimations = 0;
        
        sprite["x"] = this.sprite_x_offset;
        sprite["y"] = this.sprite_y_offset;
        sprite.animations = {"default": {"speed": 0, "length": 1}};
        
        for(key in config)
            sprite[key] = config[key];
        
        for(key in sprite.animations) nbAnimations++;
        
        sprite.atlas = game.imgManager[sprite.atlas];

        this.sprites[name] = sprite;
        this.sprite_y_offset += nbAnimations * sprite.height;
    }
    
    // function create new sprite object
    this.createSprite = function(name) {
        if(typeof this.sprites[name] == "undefined") console.log("imgManager: sprite " + name + " doesnt exist!");    // DEBUG
        var sprite = new CSprite();
        sprite.config = this.sprites[name];
        sprite.offset_x = sprite.config.x;
        sprite.offset_y = sprite.config.y;
        return sprite;
    }
}