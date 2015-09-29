/****************************************
 *  AOS - Adventure of secrets          *
 *  Game.js                             *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

function Game()
{
    // canvas and canvas buffer
    var canvas;
    var canvasContext;
    var canvasBuffer;
    var canvasBufferContext; 
    
    // improving perfomance by additional canvas for tiles
    this.tilesBuffer;
    this.tilesBufferContext;
    this.X_buffer = -1;
    this.Y_buffer = -1;
    
    // managers
    this.map;
    this.imgManager;
    this.AIManager = new Object;
    this.dialogManager;
    this.spellsManager;
    this.particlesManager = new Array();
    this.gestureManager;
    this.HUD;
    this.spellList;
    this.data;
    this.state;
    
    // characters
    this.characters = new Array();
    this.player;
    
    // effect
    this.effects = 3;
    this.mouseParticle;
    this.poisonParticle;
    this.showCharacterInfo = true;
    
    // scrolling variables
    this.X_scroll = 0;
    this.Y_scroll = 0;
    var shake_scroll = 0;    

    // keyboard array
    this.keyPressed = {"LEFT": false, "RIGHT": false, "UP": false, "DOWN": false, "JUMP": false, "ACTION": false, "EXIT": false};
    
    // game pause
    this.pause = false;
    
    // function prepare canvas to drawing
    this.InitCanvas = function(){
        canvas = $("canvas");
        canvasContext = canvas.getContext("2d");
        if(DOUBLE_BUFFERING){
            canvasBuffer = document.createElement("canvas");
            canvasBuffer.width = canvas.width;
            canvasBuffer.height = canvas.height;
            canvasBufferContext = canvasBuffer.getContext("2d");
        } else {
            canvasBuffer = canvas;
            canvasBufferContext = canvasContext;
        }
        this.tilesBuffer = document.createElement("canvas");
        this.tilesBuffer.width = X_Resolution + 2*TILE_SIZE;
        this.tilesBuffer.height = Y_Resolution + 2*TILE_SIZE;
        this.tilesBufferContext = this.tilesBuffer.getContext("2d");
    }    
    
    // function selects level passed by parameter
    this.selectLevel = function(name) {
        game.map.loadMap(game.data.levels[name].map);
        game.map.triggers = game.data.levels[name].triggers;
        game.map.name = name;
        
        game.player.x = game.map.X_start * TILE_SIZE;
        game.player.y = game.map.Y_start * TILE_SIZE;
        for(var i = 0 ; i < game.map.X_size ; i++)
            for(var j = 0 ; j < game.map.Y_size ; j++) {
                // characters
                if(game.map.special[i][j] > ENEMY && game.map.special[i][j] < ENEMY + 30) {
                    var current = new CCharacter();
                    console.log("Creating: " + game.data.characterByID[game.map.special[i][j] - ENEMY]) // DEBUG
                    current.setCharacter( game.data.characterByID[game.map.special[i][j] - ENEMY] );
                    current.x = i * TILE_SIZE;
                    current.y = (j+1) * TILE_SIZE;
                    game.characters.push(current);
                }
                // items
                if(typeof game.data.items[game.map.special[i][j]] != "undefined" )
                    game.map.cover[i][j] = game.data.items[game.map.special[i][j]].defaultTile;
            }
        game.data.levels[name].init();
                
    }
    
    this.handleKeyPress = function(event){
    }
    
    // function handle key event and set information whether key is pressed to array 'this.keyPressed'
    this.handleKeyEvent = function(event){
    var val = (event.type == "keydown" ? true : false);
        switch(event.keyCode)
        {
            case LEFT_KEY   : game.keyPressed["LEFT"] = val; break;
            case RIGHT_KEY  : game.keyPressed["RIGHT"] = val; break;
            case UP_KEY     : game.keyPressed["UP"] = val; break;
            case DOWN_KEY   : game.keyPressed["DOWN"] = val; break;
            case JUMP_KEY   : game.keyPressed["JUMP"] = val; break;
            case ACTION_KEY : game.keyPressed["ACTION"] = val; break;
            case EXIT_KEY   : game.keyPressed["EXIT"] = val; break;
            default: return;
        }
    }
    
    // function gets mouse x and y coordinates on canvas
    this.getMousePosition = function(canvas, evt){
        // get canvas position
        var obj = canvas;
        var top = 0;
        var left = 0;
        while (obj && obj.tagName != 'BODY') {
            top += obj.offsetTop;
            left += obj.offsetLeft;
            obj = obj.offsetParent;
        }
 
        // return relative mouse position
        var mouseX = evt.clientX - left + window.pageXOffset;
        var mouseY = evt.clientY - top + window.pageYOffset;
        return {
            x: mouseX,
            y: mouseY
        };
}
    
    // function handle mousedown event
    this.mouseDown = function(event) {
        var pos = game.getMousePosition(canvas, event);
        if(game.pause == false) {
            if(game.effects > 1) {
                game.mouseParticle = new cParticleSystem(game.particlesManager["magicSparks"]);
                game.mouseParticle.position = Vector.create(pos.x, pos.y);
                game.mouseParticle.init();
            }
            game.gesturesManager.startCapture(pos.x, pos.y);
        }
    }
    
    // function handle mouseup event
    this.mouseUp = function(event) {
        var pos = game.getMousePosition(canvas, event);
        if(game.effects > 1 && typeof game.mouseParticle != "undefined")
            game.mouseParticle.stop();
        if(game.dialogManager.isActive())
            game.dialogManager.handleMouseUp(pos.x, pos.y);
        game.HUD.handleMouseUp(pos.x, pos.y);
        if(game.pause == false) {
            game.gesturesManager.captureMouse(pos.x, pos.y);
            game.spellsManager.addSpell(game.gesturesManager.matchGesture(), game.player);
        }
        if(game.state != null) game.state.handleMouseUp(pos.x, pos.y);
    }
    
    // function handle mousemove event
    this.mouseMove = function(event) {
        var pos = game.getMousePosition(canvas, event)
        if(game.pause == false) {
            if(game.effects > 1 && typeof game.mouseParticle != "undefined")
                game.mouseParticle.position = pos;
            if(game.gesturesManager.capturing)
                game.gesturesManager.captureMouse(pos.x, pos.y);
        }
        game.dialogManager.handleMouseMove(pos.x, pos.y);
    }
    
    // function start shaking games viewport by adding to X_scroll and Y_scroll first param
    this.startShaking = function(strength, time) {
        shake_scroll = strength;
        setTimeout(function(){shake_scroll=0;}, time);
    } 
    
    // function centre game viewport on point (x, y)
    function centreViewport(x, y) {
        game.X_scroll = x - X_Resolution/2;
        game.Y_scroll = y - Y_Resolution/2;
        
        if(game.X_scroll < 0) game.X_scroll = 0;
        if(game.Y_scroll < 0) game.Y_scroll = 0;
        if(game.X_scroll > game.map.X_size*TILE_SIZE - X_Resolution)
           game.X_scroll = game.map.X_size*TILE_SIZE - X_Resolution;
        if(game.Y_scroll > game.map.Y_size*TILE_SIZE - Y_Resolution)
           game.Y_scroll = game.map.Y_size*TILE_SIZE - Y_Resolution;
    }
    
    // function create blood efect on screen
    this.bloodEfect = function(ctx) {
        var health = game.HUD.hud_health / game.player.maxHealth;
        if(health > 0.25) return;
        var grd = ctx.createRadialGradient(X_Resolution/2, Y_Resolution/2, 10, X_Resolution/2, Y_Resolution/2, X_Resolution/2);
        grd.addColorStop(1, 'rgba(255, 0, 0, '+ (0.6 - health*2) +')');
        grd.addColorStop(0, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, X_Resolution, Y_Resolution);
    }

    // function render all tiles to tilesBuffer
    this.initTilesBuffer = function() {
        var y_tile = Math.floor(game.Y_scroll / TILE_SIZE);
        var x_tile = Math.floor(game.X_scroll / TILE_SIZE);
        if(y_tile > 0) y_tile--;
        if(x_tile > 0) x_tile--;        
        // render tiles
        for(var i = 0 ; i < TILES4X + 2; i++) {
            if(x_tile+i >= game.map.X_size) break;
            for(var j = 0 ; j < TILES4Y + 2 ; j++) {
                game.tilesBufferContext.drawImage(game.imgManager["background"],
                0, 0, TILE_SIZE, TILE_SIZE, i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.base[x_tile+i][y_tile+j] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.base[x_tile+i][y_tile+j]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.base[x_tile+i][y_tile+j]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.cover[x_tile+i][y_tile+j] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.cover[x_tile+i][y_tile+j]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.cover[x_tile+i][y_tile+j]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        console.log("initTilesBuffer");
        this.X_buffer = x_tile;
        this.Y_buffer = y_tile;
    }
    
    // function update TilesBuffer
    this.updateTilesBuffer = function() {
        // LEFT
        if(game.X_scroll < game.X_buffer*TILE_SIZE) {
            game.tilesBufferContext.drawImage(game.tilesBuffer,
                0, 0, X_Resolution + TILE_SIZE, Y_Resolution + 2*TILE_SIZE, 
                TILE_SIZE, 0, X_Resolution + TILE_SIZE, Y_Resolution + 2*TILE_SIZE);
            for(var i = 0 ; i < TILES4Y + 2 ; i++) {
                game.tilesBufferContext.drawImage(game.imgManager["background"],
                0, 0, TILE_SIZE, TILE_SIZE, 0, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.base[game.X_buffer-1][game.Y_buffer+i] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.base[game.X_buffer-1][game.Y_buffer+i]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.base[game.X_buffer-1][game.Y_buffer+i]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, 0, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.cover[game.X_buffer-1][game.Y_buffer+i] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.cover[game.X_buffer-1][game.Y_buffer+i]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.cover[game.X_buffer-1][game.Y_buffer+i]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, 0, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            game.X_buffer--;
        }
        // RIGHT
        if(game.X_scroll > (game.X_buffer+1)*TILE_SIZE) {
            game.tilesBufferContext.drawImage(game.tilesBuffer,
                TILE_SIZE, 0, X_Resolution + TILE_SIZE, Y_Resolution + 2*TILE_SIZE, 
                0, 0, X_Resolution + TILE_SIZE, Y_Resolution + 2*TILE_SIZE);
            for(var i = 0 ; i < TILES4Y + 2 ; i++) {
                game.tilesBufferContext.drawImage(game.imgManager["background"],
                0, 0, TILE_SIZE, TILE_SIZE, (TILES4X+1)*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.base[game.X_buffer+TILES4X+1][game.Y_buffer+i] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.base[game.X_buffer+TILES4X+1][game.Y_buffer+i]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.base[game.X_buffer+TILES4X+1][game.Y_buffer+i]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, TILES4X*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.cover[game.X_buffer+TILES4X+1][game.Y_buffer+i] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.cover[game.X_buffer+TILES4X+1][game.Y_buffer+i]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.cover[game.X_buffer+TILES4X+1][game.Y_buffer+i]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, TILES4X*TILE_SIZE, i*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            game.X_buffer++;
        }
        // UP
        if(game.Y_scroll < game.Y_buffer*TILE_SIZE) {
            game.tilesBufferContext.drawImage(game.tilesBuffer,
                0, 0, X_Resolution + 2*TILE_SIZE, Y_Resolution + TILE_SIZE, 
                0, TILE_SIZE, X_Resolution + 2*TILE_SIZE, Y_Resolution + TILE_SIZE);
            for(var i = 0 ; i < TILES4X + 1 ; i++) {
                game.tilesBufferContext.drawImage(game.imgManager["background"],
                0, 0, TILE_SIZE, TILE_SIZE, i*TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
                if(game.map.base[game.X_buffer+i][game.Y_buffer-1] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.base[game.X_buffer+i][game.Y_buffer-1]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.base[game.X_buffer+i][game.Y_buffer-1]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
                if(game.map.cover[game.X_buffer+i][game.Y_buffer-1] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.cover[game.X_buffer+i][game.Y_buffer-1]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.cover[game.X_buffer+i][game.Y_buffer-1]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, 0, TILE_SIZE, TILE_SIZE);
            }
            game.Y_buffer--;
        }
        // DOWN
        if(game.Y_scroll > (game.Y_buffer+1)*TILE_SIZE) {
            var TILES4Yround = Math.ceil(TILES4Y);
            
            game.tilesBufferContext.drawImage(game.tilesBuffer,
                0, TILE_SIZE, X_Resolution + 2*TILE_SIZE, Y_Resolution + TILE_SIZE, 
                0, 0, X_Resolution + 2*TILE_SIZE, Y_Resolution + TILE_SIZE);
            for(var i = 0 ; i < TILES4X + 1 ; i++) {
                game.tilesBufferContext.drawImage(game.imgManager["background"],
                0, 0, TILE_SIZE, TILE_SIZE, i*TILE_SIZE, (TILES4Y+1)*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.base[game.X_buffer+i][game.Y_buffer+TILES4Yround+1] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.base[game.X_buffer+i][game.Y_buffer+TILES4Yround+1]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.base[game.X_buffer+i][game.Y_buffer+TILES4Yround+1]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, TILES4Yround*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if(game.map.cover[game.X_buffer+i][game.Y_buffer+TILES4Yround+1] != EMPTY_TILE)
                    game.tilesBufferContext.drawImage(game.imgManager["worldAtlas"], 
                        game.map.cover[game.X_buffer+i][game.Y_buffer+TILES4Yround+1]%game.imgManager["worldAtlasWidth"]*TILE_SIZE, 
                        Math.floor(game.map.cover[game.X_buffer+i][game.Y_buffer+TILES4Yround+1]/game.imgManager["worldAtlasWidth"])*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, i*TILE_SIZE, TILES4Yround*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
            game.Y_buffer++;
        }
    }
    
    // function render map
    function RenderMap(){
        var map_Y   = Math.floor(game.Y_scroll / TILE_SIZE);
        var map_X   = Math.floor(game.X_scroll / TILE_SIZE);
        var Y_start = -(game.Y_scroll - map_Y * TILE_SIZE);
        var X_start = -(game.X_scroll - map_X * TILE_SIZE);
        
        // draw tiles
        canvasBufferContext.drawImage(game.tilesBuffer,
            game.X_scroll - game.X_buffer*TILE_SIZE, game.Y_scroll - game.Y_buffer*TILE_SIZE, X_Resolution, Y_Resolution,
            0, 0, X_Resolution, Y_Resolution);
            
        // collision DEBUG
        /*var X_bg_start = (game.X_scroll / BG_SCROLL_SPEED) % X_Resolution;
        for(var i = 0 ; i < TILES4X + (X_start == game.X_scroll ? 0 : 2); i++) {
            map_Y = Math.floor(game.Y_scroll / TILE_SIZE);
            for(var j = 0 ; j < TILES4Y + (Y_start == game.Y_scroll ? 0 : 2) ; j++) {
                if(map_X >= game.map.X_size) break; // BUG?!
                if(game.map.special[map_X][map_Y] == COLLISION) {
                    canvasBufferContext.beginPath();
                    canvasBufferContext.rect(X_start + i*TILE_SIZE, Y_start + j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    canvasBufferContext.fillStyle = "rgba(255, 0, 0, 0.3)";
                    canvasBufferContext.fill();
                    }
                if(game.map.special[map_X][map_Y] == LADDER) {
                    canvasBufferContext.beginPath();
                    canvasBufferContext.rect(X_start + i*TILE_SIZE, Y_start + j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    canvasBufferContext.fillStyle = "rgba(255, 255, 0, 0.3)";
                    canvasBufferContext.fill();
                    }
                map_Y++;
            }
            map_X++;
        }*/
            
        // player
        canvasBufferContext.drawImage(game.player.sprite.config.atlas, game.player.sprite.offset_x, game.player.sprite.offset_y, game.player.sprite.config.width, game.player.sprite.config.height,
            game.player.x - game.X_scroll, game.player.y - game.player.sprite.config.height - game.Y_scroll + SPRITE_ADD_HEIGHT, game.player.sprite.config.width, game.player.sprite.config.height);
        
        // characters
        for(key in game.characters) {
            var current = game.characters[key];
            if(current.x >= game.X_scroll && current.x <= game.X_scroll + X_Resolution && current.y >= game.Y_scroll && current.y <= game.Y_scroll + Y_Resolution) {
                if(current.health <= 0) canvasBufferContext.globalAlpha = Math.floor(100 - (-current.health*2) ) /100;
                canvasBufferContext.drawImage(current.sprite.config.atlas, current.sprite.offset_x, current.sprite.offset_y, current.sprite.config.width, current.sprite.config.height,
                current.x - game.X_scroll, current.y - current.sprite.config.height - game.Y_scroll + SPRITE_ADD_HEIGHT, current.sprite.config.width, current.sprite.config.height);
                if(current.health <= 0) canvasBufferContext.globalAlpha = 1;
                if(game.showCharacterInfo && current.health > 0) {
                    canvasBufferContext.beginPath();
                    canvasBufferContext.fillStyle = 'rgba(0, 0, 255, 0.5)';
                    canvasBufferContext.roundRect(current.x - game.X_scroll - 16, current.y - current.sprite.config.height - game.Y_scroll - 16, Math.floor((current.mana / current.maxMana)*(current.sprite.config.width+32)), 8, 4).fill();
                    canvasBufferContext.roundRect(current.x - game.X_scroll - 16, current.y - current.sprite.config.height - game.Y_scroll - 16, current.sprite.config.width+32, 8, 4).stroke();
                    canvasBufferContext.fillStyle = 'rgba(255, 0, 0, 0.5)';
                    canvasBufferContext.roundRect(current.x - game.X_scroll - 16, current.y - current.sprite.config.height - game.Y_scroll - 28, Math.floor((current.health / current.maxHealth)*(current.sprite.config.width+32)), 8, 4).fill();
                    canvasBufferContext.roundRect(current.x - game.X_scroll - 16, current.y - current.sprite.config.height - game.Y_scroll - 28, current.sprite.config.width+32, 8, 4).stroke();
                }
            }
        }
        // particles and spells
        if(typeof game.mouseParticle != "undefined")
            game.mouseParticle.render(canvasBufferContext);
        game.spellsManager.render(canvasBufferContext);
        if(game.effects > 1) {
            if(game.player.poison.time > 0)
                game.player.poison.particle.render(canvasBufferContext);
            for(key in game.characters)
                if(game.characters[key].poison.time > 0)
                    game.characters[key].poison.particle.render(canvasBufferContext);
        }
        
        // HUD
        game.HUD.render(canvasBufferContext);
        // special boxes
        if(game.state != null) game.state.render(canvasBufferContext);
        // messages
        if(game.dialogManager.isActive()) game.dialogManager.render(canvasBufferContext);
        // effects
        game.bloodEfect(canvasBufferContext);
        
        if(DOUBLE_BUFFERING){
            canvasContext.drawImage(canvasBuffer, 0, 0, X_Resolution, Y_Resolution, 0, 0, X_Resolution, Y_Resolution);
        }
    }
    
    // main game loop
    this.GameLoop = function(){
        if(game.imgManager.getProgress() == 100)
        {
            var time = (new Date).getTime();
            if(game.pause == false) {
                game.player.update();
                game.spellsManager.update();
                game.data.levels[game.map.name].update();
                if(game.effects > 1 && typeof game.mouseParticle != "undefined")
                    game.mouseParticle.update(1);
                for(key in game.characters) {
                    game.characters[key].update();
                    if(game.characters[key].health < -50)
                        game.characters.splice(key, 1);
                }
            }
            game.HUD.update();
            var res = "Updated in: " + ((new Date).getTime() - time) + " msec";
            if(game.keyPressed["JUMP"] && shake_scroll == 0){
                game.spellsManager.addSpell("rockDestroy", game.player);                    
            }            
            if(game.keyPressed["ACTION"] && game.player.potions > 0 && game.player.mana != game.player.maxMana) {
                game.player.potions--;
                game.player.mana += 50;
                if(game.player.mana > game.player.maxMana) game.player.mana = game.player.maxMana;                
            }
            centreViewport(game.player.x, game.player.y);
            if(shake_scroll){
                centreViewport(game.player.x + rand(-shake_scroll, shake_scroll) , game.player.y + rand(-shake_scroll, shake_scroll));
            }
            if(game.state != null) game.state.update();
            time = (new Date).getTime();
                if(game.X_buffer == -1) game.initTilesBuffer();
                game.updateTilesBuffer();
                RenderMap();
            res += "<br>Generated in: " + ((new Date).getTime() - time) + " msec"
            $("FPS").innerHTML = res;
        }
        else
        {
            canvasContext.fillRect(10, 10, 20, 20);
        }
        setTimeout(game.GameLoop, 1000 / FPS);
    }
    
    // function is called to run game. It initialize all stuff eg. canvas, images etc.
    this.Run = function(){
        // init canvas
        this.InitCanvas();
        // init imgManager and load images
        this.imgManager = new CImgManager();
        this.imgManager.addImage('worldAtlas', "../tiles/tiles.png", function(){game.imgManager["worldAtlasWidth"] = game.imgManager["worldAtlas"].width/TILE_SIZE;});
        this.imgManager.addImage('background', "../tiles/background.jpg");
        this.imgManager.addImage('sprites', "../sprites/sprites.png");
        this.imgManager.addImage('icons', "../sprites/icons.png");
        // init game data
        this.data = new CData();
        // init sprites
        for(var key in this.data.sprites)
            this.imgManager.addSprite(key, this.data.sprites[key]);   
        // init player
        this.player = new CPlayer();
        this.player.setCharacter("player2");
        for(var key in this.data.spells)
            this.player.spells[key] = 0;
        this.player.spells["fireBall"] = 3;
        this.player.spells["heal"] = 2;
        this.player.spells["fireArrows"] = 1;
        this.player.spells["protect"] = 3;
        this.player.spells["ice"] = 3;
        this.player.spells["poisonedLeaf"] = 3;
        this.player.spells["haste"] = 3;
        this.player.spells["explosion"] = 2;
        // dialog
        this.dialogManager = new CDialogManager();
        this.dialogManager.atlas = this.imgManager["icons"];
        // special boxes
        this.spellList - new CSpellList();
        // AI && character
        this.AIManager["simple"] = new AISimple();
        this.AIManager["followPoint"] = new AIFollowPoint();
        // init particles
        this.spellsManager = new CSpellsManager();
        this.particlesManager = this.data.particles;
        // gestures
        this.gesturesManager = new CMouseGesture();
        this.gesturesManager.init();
        this.gesturesManager.addGesture("000444", "rockDestroy");
        this.gesturesManager.addGesture("777111", "ladder");
        for(var key in this.data.spells)
            if(typeof this.data.spells[key] == "object")
                this.gesturesManager.addGesture(this.data.spells[key].gesture, key);
        // spellList and HUD init
        this.HUD = new CHUD();
        this.HUD.init(canvasBufferContext);
        this.spellList = new CSpellList();
        this.spellList.init(canvasBufferContext);
        // font init
        canvasBufferContext.textBaseline = "top";
        // add event listeners for keyboard and mouse
        if(!document.addEventListener && document.attachEvent)
        {
            document.attachEvent("onkeydown", this.handleKeyEvent);
            document.attachEvent("onkeyup", this.handleKeyEvent);
        } else {
            window.addEventListener("keydown", this.handleKeyEvent, true);
            window.addEventListener("keyup", this.handleKeyEvent, true);
        }
        canvas.addEventListener("mousedown", this.mouseDown);
        canvas.addEventListener("mouseup", this.mouseUp);
        canvas.addEventListener("mousemove", this.mouseMove);
        // loading map
        this.map = new Map();
        this.selectLevel("introduction");
        // running game loop
        alert("initialized!");
        setTimeout(this.GameLoop, 1000 / FPS);
    }
}
