//====================================
// Utilities

function rand(x, y) { return Math.round(x + Math.random()*(y-x)); };

//====================================
// global_variables

var X_Resolution = 640;
var Y_Resolution = 480;
var TILE_SIZE = 64;
var ENEMY_HEIGHT = 60;
var ENEMY_WIDTH = 50;
var TILES4X = X_Resolution / TILE_SIZE;
var TILES4Y = Y_Resolution / TILE_SIZE;
var NUMBER_OF_TILES = 144;
var EMPTY_TILE = 0;
var COLLISION = 1;
var LADDER = 2;

var IMAGES_TO_LOAD = 3;
var BG_SCROLL_SPEED = 5;

var LEFT_KEY = 37;  // LEFT ARROW
var RIGHT_KEY = 39; // RIGHT ARROW
var UP_KEY = 38;    // UP ARROW
var DOWN_KEY = 40;  // DOWN ARROW
var JUMP_KEY = 32;  // SPACE
var ACTION_KEY = 13;// ENTER
var EXIT_KEY = 27;  // ESCAPE 

var FPS = 20;

var DOUBLE_BUFFERING = false;

//====================================
// game

// Enemy class
function Enemy(type, x, y)
{
    this.type = type;
    this.X = x;
    this.Y = y;
}

// Map class
function Map()
{
    this.X_size = 0;
    this.Y_size = 0;
    this.X_start = 0;
    this.Y_start = 0;

    this.base;
    this.cover;
    this.special;
    
    this.loadMap = function(desc){
        desc = desc.split(' ');
        this.X_size = (+desc[0]);
        this.Y_size = (+desc[1]);
        this.X_start = (+desc[2]);
        this.Y_start = (+desc[3]);

        this.base = new Array(this.X_size);
        this.cover = new Array(this.X_size);
        this.special = new Array(this.X_size);
        for(var i = 0 ; i < this.X_size ; i++){
            this.base[i] = new Array(this.Y_size);
            this.cover[i] = new Array(this.Y_size);
            this.special[i] = new Array(this.Y_size);
        }
        
        var i = 0;
        var i_start = i;
        var j = 0;
        // init base tiles || iterating from i to j
        for(j = i + this.X_size*this.Y_size ; i < j ; i++){
            this.base[(i - i_start)%this.X_size][Math.floor((i - i_start)/this.X_size)] = (desc[4].charCodeAt(i) - 40);
        }
        // init cover tiles
        i_start = i;
        for(j = i + this.X_size*this.Y_size ; i < j ; i++){
            this.cover[(i - i_start)%this.X_size][Math.floor((i - i_start)/this.X_size)] = (desc[4].charCodeAt(i) - 40);
        }
        // init special tiles
        i_start = i;
        for(j = i + this.X_size*this.Y_size ; i < j ; i++){
            this.special[(i - i_start)%this.X_size][Math.floor((i - i_start)/this.X_size)] = (desc[4].charCodeAt(i) - 40);
        }
        this.special[this.X_start][this.Y_start] = 3;
    }
    
    this.printMapData = function(){
        var desc;
        desc = this.X_size + ' ' + this.Y_size + ' ' + this.X_start + ' ' + this.Y_start + ' ';
        for(var i = 0 ; i < this.Y_size; i++)
            for(var j = 0 ; j < this.X_size ; j++)
                desc += String.fromCharCode(this.base[j][i] + 40);
        for(var i = 0 ; i < this.Y_size ; i++)
            for(var j = 0 ; j < this.X_size ; j++)
                desc += String.fromCharCode(this.cover[j][i] + 40);
        for(var i = 0 ; i < this.Y_size ; i++)
            for(var j = 0 ; j < this.X_size ; j++)
                desc += String.fromCharCode(this.special[j][i] + 40);
        return desc;
    }
    
    // function create or resize map
    this.createMap = function(width, height){        
        // if map wasnt declared do it
        if(this.X_size == 0 || this.Y_size == 0){
            this.base = new Array(width);
            this.cover = new Array(width);
            this.special = new Array(width);
        
            for(var i = 0 ; i < width ; i++){
                this.base[i] = new Array(height);
                this.cover[i] = new Array(height);
                this.special[i] = new Array(height);
            }
        }
        
        for(var i = 0 ; i < this.X_size ; i++){
            for(var j = this.Y_size ; j < height ; j++){
                this.base[i][j] = EMPTY_TILE;
                this.cover[i][j] = EMPTY_TILE;
                this.special[i][j] = EMPTY_TILE;
            }
        }
        
        for(var i = this.X_size ; i < width ; i++){
            this.base[i] = new Array(height);
            this.cover[i] = new Array(height);
            this.special[i] = new Array(height);
            for(var j = 0 ; j < height ; j++){
                this.base[i][j] = EMPTY_TILE;
                this.cover[i][j] = EMPTY_TILE;
                this.special[i][j] = EMPTY_TILE;
            }
        }
        
        this.special[this.X_start][this.Y_start] = 3;
        this.X_size = width;
        this.Y_size = height;
    }
};

// Game class
function Game()
{
    // variables
    var canvas;
    var canvasContext;
    var canvasBuffer;
    var canvasBufferContext; 

    var loadedImages = 0;
    var world_atlas;
    var world_atlas_width;
    var background_atlas;
    var special_atlas;
    var special_atlas_width;
    var map;
    
    var X_scroll = 0;
    var Y_scroll = 0;
    
    var X_tile = 0;
    var Y_tile = 0;
    var X_special = 0;
    var Y_special = 0;
    
    var mouse_x;
    var mouse_y;
    
    var default_collision;
    var keys_pressed = {LEFT: false, RIGHT: false, UP: false, DOWN: false, JUMP: false, ACTION: false, EXIT: false};
    
    // function prepare canvas to drawing
    this.InitCanvas = function(){
        canvas = $("canvas")[0];
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
    }
    
    this.tilesOnLoad = function(){
        loadedImages++;
        world_atlas_width = world_atlas.width/TILE_SIZE;
        // creating img to choose tile
        $("#tiles_dialog").append("<img id='which_tile_img' src='../tiles/tiles.png'>");
        // creating div to indicate which tile is selected
        $("#tiles_dialog").append("<div id='which_tile_div' style='position: relative; width: " + TILE_SIZE + "px; height: " + TILE_SIZE + "px; border: 2px solid yellow; background: black;opacity: 0.5; display: block; top: " + (-world_atlas.height-4) + "px;'>");
        // select tile
        $("#which_tile_img").click(function(e){
            var X_dialog = $("#tiles_dialog").dialog("option", "position")[0] + this.offsetLeft + $("#tiles_dialog")[0].offsetLeft;
            var Y_dialog = $("#tiles_dialog").dialog("option", "position")[1] + this.offsetTop + $("#tiles_dialog")[0].offsetTop;
            X_tile = Math.floor((e.pageX - X_dialog + $("#tiles_dialog").scrollLeft()) / TILE_SIZE);
            Y_tile = Math.floor((e.pageY - Y_dialog + $("#tiles_dialog").scrollTop()) / TILE_SIZE);
            $("#which_tile_div").animate({left: X_tile*TILE_SIZE - 2, top: Y_tile*TILE_SIZE - 6 - world_atlas.height}, 500);
        });    
    }
    
    this.specialOnLoad = function(){
        loadedImages++;
        special_atlas_width = special_atlas.width/TILE_SIZE;
        // create img to choose tile
        $("#special_dialog").append("<img id='which_special_img' src='../tiles/special.png'>");
        // create div to indicate wchich special tile is selected
        $("#special_dialog").append("<div id='which_special_div' style='position: relative; width: " + TILE_SIZE + "px; height: " + TILE_SIZE + "px; border: 2px solid yellow; background: black;opacity: 0.5; display: block; top: " + (-special_atlas.height-4) + "px;'>");
        // select special tile
        $("#which_special_img").click(function(e){
            var X_dialog = $("#special_dialog").dialog("option", "position")[0] + this.offsetLeft + $("#special_dialog")[0].offsetLeft;
            var Y_dialog = $("#special_dialog").dialog("option", "position")[1] + this.offsetTop + $("#special_dialog")[0].offsetTop;
            X_special = Math.floor((e.pageX - X_dialog + $("#special_dialog").scrollLeft()) / TILE_SIZE);
            Y_special = Math.floor((e.pageY - Y_dialog + $("#special_dialog").scrollTop()) / TILE_SIZE);
            $("#which_special_div").animate({left: X_special*TILE_SIZE - 2, top: Y_special*TILE_SIZE - 4 - special_atlas.height}, 500);
        });
    }
    
    // function load all images(atlases)
    this.LoadImages = function(){
        world_atlas = new Image();
        world_atlas.onload = this.tilesOnLoad;
        world_atlas.src = "../tiles/tiles.png";
        special_atlas = new Image();
        special_atlas.onload = this.specialOnLoad;
        special_atlas.src = "../tiles/special.png";
        background_atlas = new Image();
        background_atlas.onload = function(){loadedImages++;};
        background_atlas.src = "../tiles/background.jpg";
    }
    
    
    this.handleKeyPress = function(event){
    }
    
    // function handle key event and set information whether key is pressed to array 'keys_pressed'
    this.handleKeyEvent = function(event){
    var val = (event.type == "keydown" ? true : false);
        switch(event.keyCode)
        {
            case LEFT_KEY   : keys_pressed["LEFT"] = val; break;
            case RIGHT_KEY  : keys_pressed["RIGHT"] = val; break;
            case UP_KEY     : keys_pressed["UP"] = val; break;
            case DOWN_KEY   : keys_pressed["DOWN"] = val; break;
            case JUMP_KEY   : keys_pressed["JUMP"] = val; break;
            case ACTION_KEY : keys_pressed["ACTION"] = val; break;
            case EXIT_KEY   : keys_pressed["EXIT"] = val; break;
            default: return;
        }
    }
    
    this.mouseMove = function(e){
        mouse_x = Math.floor((e.pageX - $("#canvas")[0].offsetLeft)/TILE_SIZE);
        mouse_y = Math.floor((e.pageY - $("#canvas")[0].offsetTop)/TILE_SIZE)
    }
    
    // function render map
    function RenderMap(){        
        var map_Y   = Math.floor(Y_scroll / TILE_SIZE);
        var map_X   = Math.floor(X_scroll / TILE_SIZE);
        var Y_start = -(Y_scroll - map_Y * TILE_SIZE);
        var X_start = -(X_scroll - map_X * TILE_SIZE);
        
        // render background
        var X_bg_start = (X_scroll / BG_SCROLL_SPEED) % X_Resolution;
        canvasBufferContext.drawImage(background_atlas, X_bg_start, 0, X_Resolution-X_bg_start, Y_Resolution, 
            0, 0, X_Resolution-X_bg_start, Y_Resolution);
        canvasBufferContext.drawImage(background_atlas, 0, 0, X_bg_start, Y_Resolution, 
           X_Resolution-X_bg_start, 0, X_bg_start, Y_Resolution);    
        // render tiles
        for(var i = 0 ; i < TILES4X  + (X_start == X_scroll ? 0 : 2); i++) {
            map_Y = Math.floor(Y_scroll / TILE_SIZE);
            for(var j = 0 ; j < TILES4Y + (Y_start == Y_scroll ? 0 : 2) ; j++) {
                if(map_X >= map.X_size) break; // BUG?!
                if($("#check_base").is(":checked") && map.base[map_X][map_Y] != EMPTY_TILE)
                    canvasBufferContext.drawImage(world_atlas, 
                        map.base[map_X][map_Y]%world_atlas_width*TILE_SIZE, 
                        Math.floor(map.base[map_X][map_Y]/world_atlas_width)*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, X_start + i*TILE_SIZE, Y_start + j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if($("#check_cover").is(":checked") && map.cover[map_X][map_Y] != EMPTY_TILE)
                    canvasBufferContext.drawImage(world_atlas, 
                        map.cover[map_X][map_Y]%world_atlas_width*TILE_SIZE, 
                        Math.floor(map.cover[map_X][map_Y]/world_atlas_width)*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, X_start + i*TILE_SIZE, Y_start + j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if($("#check_special").is(":checked") && map.special[map_X][map_Y] != EMPTY_TILE)
                    canvasBufferContext.drawImage(special_atlas, 
                        map.special[map_X][map_Y]%special_atlas_width*TILE_SIZE, 
                        Math.floor(map.special[map_X][map_Y]/special_atlas_width)*TILE_SIZE,
                        TILE_SIZE, TILE_SIZE, X_start + i*TILE_SIZE, Y_start + j*TILE_SIZE, TILE_SIZE, TILE_SIZE);
                map_Y++;
            }
            map_X++;
            // highlight tile
            var begin_x;
            var begin_y;
            var brush_size = $("#brush_size").slider( "option", "value" ) - 1;
            var temp = 0;
            
            if(brush_size % 2 == 0) {
                begin_x = mouse_x - brush_size/2;
                begin_y = mouse_y - brush_size/2;

                if(mouse_x + brush_size/2 > TILES4X - 1)
                    begin_x += TILES4X - (mouse_x + brush_size/2) - 1;
                if(mouse_x - brush_size/2 < 0)
                    begin_x = 0;
                if(mouse_y + brush_size/2 > Math.floor(TILES4Y))
                    begin_y += Math.floor(TILES4Y) - (mouse_y + brush_size/2);
                if(mouse_y - brush_size/2 < 0)
                    begin_y = 0;
            }
            if(brush_size % 2 == 1) {
                begin_x = mouse_x - (brush_size-1)/2;
                begin_y = mouse_y - (brush_size-1)/2;
                
                if(mouse_x + (brush_size+1)/2 > TILES4X - 1)
                    begin_x += TILES4X - (mouse_x + (brush_size+1)/2) - 1;
                else if(mouse_x - (brush_size-1)/2 < 0)
                    begin_x = 0;
                if(mouse_y + (brush_size+1)/2 > TILES4Y)
                    begin_y += Math.floor(TILES4Y) - (mouse_y + (brush_size+1)/2);
                else if(mouse_y - (brush_size-1)/2 < 0)
                    begin_y = 0;
            }
            
            canvasBufferContext.beginPath();
            canvasBufferContext.strokeStyle = 'rgb(255, 255, 155)';
            canvasBufferContext.rect(begin_x * TILE_SIZE - X_scroll%TILE_SIZE, begin_y * TILE_SIZE - Y_scroll % TILE_SIZE, TILE_SIZE*(brush_size+1), TILE_SIZE*(brush_size+1));
            canvasBufferContext.stroke();
        }
        if(DOUBLE_BUFFERING){
            //TODO:canvasBuffer.drawImage(canvasBufferContext, 0, 0, X_Resolution, Y_Resolution, 0, 0, X_Resolution, Y_Resolution);
        }
    }
    
    // function draw on highlighted tiles
    this.drawTiles = function(e) {
        // variables
        var Y_map   = Math.floor(Y_scroll / TILE_SIZE);
        var X_map   = Math.floor(X_scroll / TILE_SIZE);
        var mouse_x = Math.floor((e.pageX - $("#canvas")[0].offsetLeft)/TILE_SIZE);
        var mouse_y = Math.floor((e.pageY - $("#canvas")[0].offsetTop)/TILE_SIZE);
        // highlighted tiles
        var begin_x;
        var begin_y;
        var brush_size = $("#brush_size").slider( "option", "value" ) - 1;
        var temp = 0;
            
        if(brush_size % 2 == 0) {
            begin_x = mouse_x - brush_size/2;
            begin_y = mouse_y - brush_size/2;

            if(mouse_x + brush_size/2 > TILES4X - 1)
                begin_x += TILES4X - (mouse_x + brush_size/2) - 1;
            if(mouse_x - brush_size/2 < 0)
                begin_x = 0;
            if(mouse_y + brush_size/2 > Math.floor(TILES4Y))
                begin_y += Math.floor(TILES4Y) - (mouse_y + brush_size/2);
            if(mouse_y - brush_size/2 < 0)
                begin_y = 0;
        }
        if(brush_size % 2 == 1) {
            begin_x = mouse_x - (brush_size-1)/2;
            begin_y = mouse_y - (brush_size-1)/2;
                
            if(mouse_x + (brush_size+1)/2 > TILES4X - 1)
                begin_x += TILES4X - (mouse_x + (brush_size+1)/2) - 1;
            else if(mouse_x - (brush_size-1)/2 < 0)
                begin_x = 0;
            if(mouse_y + (brush_size+1)/2 > TILES4Y)
                begin_y += Math.floor(TILES4Y) - (mouse_y + (brush_size+1)/2);
            else if(mouse_y - (brush_size-1)/2 < 0)
                begin_y = 0;
        }
        // draw on all highlighted tiles
        for(var i = 0 ; i <= brush_size ; i++)
            for(var j = 0 ; j <= brush_size ; j++)
                game.drawTile(X_map + begin_x + i, Y_map + begin_y + j);
    }
    
    this.drawTile = function(dest_x, dest_y){
        var tile_number = Y_tile*world_atlas_width + X_tile;
        var special_number = Y_special*special_atlas_width + X_special;

        // if erasing tile - erase collision
        if(tile_number == EMPTY_TILE && map.special[dest_x][dest_y] == COLLISION)
            map.special[dest_x][dest_y] = EMPTY_TILE;
        // if erasing tile - erase ladder
        if(tile_number == EMPTY_TILE && map.special[dest_x][dest_y] == LADDER)
            map.special[dest_x][dest_y] = EMPTY_TILE;

        // smart erasing
        if($("#check_smart_erasing").is(":checked") && tile_number == EMPTY_TILE && $("#radio_base").is(":checked")) {
            var dest_x = dest_x;
            var dest_y = dest_y;
            // left tile
            if(map.base[dest_x - 1][dest_y] == 12)
                map.base[dest_x - 1][dest_y] = 1;
            if(map.base[dest_x - 1][dest_y] == 37)
                map.base[dest_x - 1][dest_y] = 49;
            if(map.base[dest_x - 1][dest_y] == 25)
                map.base[dest_x - 1][dest_y] = 73;
            if(map.base[dest_x - 1][dest_y] == 121)
                map.base[dest_x - 1][dest_y] = 109;
            if(map.base[dest_x - 1][dest_y] == 85)
                map.base[dest_x - 1][dest_y] = 97;
            if(map.base[dest_x - 1][dest_y] == 13)
                map.base[dest_x - 1][dest_y] = 120;
            if(map.base[dest_x - 1][dest_y] == 132)
                map.base[dest_x - 1][dest_y] = 133;
            if(map.base[dest_x - 1][dest_y] == 61)
                map.base[dest_x - 1][dest_y] = 108;
            // right tile
            if(map.base[dest_x + 1][dest_y] == 12)
                map.base[dest_x + 1][dest_y] = 13;
            if(map.base[dest_x + 1][dest_y] == 37)
                map.base[dest_x + 1][dest_y] = 61;
            if(map.base[dest_x + 1][dest_y] == 25)
                map.base[dest_x + 1][dest_y] = 85;
            if(map.base[dest_x + 1][dest_y] == 133)
                map.base[dest_x + 1][dest_y] = 109;
            if(map.base[dest_x + 1][dest_y] == 73)
                map.base[dest_x + 1][dest_y] = 97;
            if(map.base[dest_x + 1][dest_y] == 1)
                map.base[dest_x + 1][dest_y] = 120;
            if(map.base[dest_x + 1][dest_y] == 132)
                map.base[dest_x + 1][dest_y] = 121;
            if(map.base[dest_x + 1][dest_y] == 49)
                map.base[dest_x + 1][dest_y] = 108;
            // top tile
            if(map.base[dest_x][dest_y - 1] == 12)
                map.base[dest_x][dest_y - 1] = 25;
            if(map.base[dest_x][dest_y - 1] == 61)
                map.base[dest_x][dest_y - 1] = 121;
            if(map.base[dest_x][dest_y - 1] == 49)
                map.base[dest_x][dest_y - 1] = 133;
            if(map.base[dest_x][dest_y - 1] == 1)
                map.base[dest_x][dest_y - 1] = 73;    
            if(map.base[dest_x][dest_y - 1] == 13)
                map.base[dest_x][dest_y - 1] = 85;
            if(map.base[dest_x][dest_y - 1] == 37)
                map.base[dest_x][dest_y - 1] = 132;
            if(map.base[dest_x][dest_y - 1] == 120)
                map.base[dest_x][dest_y - 1] = 97;
            if(map.base[dest_x][dest_y - 1] == 108)
                map.base[dest_x][dest_y - 1] = 109;
            // bottom tile
            if(map.base[dest_x][dest_y + 1] == 12)
                map.base[dest_x][dest_y + 1] = 37;
            if(map.base[dest_x][dest_y + 1] == 1)
                map.base[dest_x][dest_y + 1] = 49;
            if(map.base[dest_x][dest_y + 1] == 13)
                map.base[dest_x][dest_y + 1] = 61;
            if(map.base[dest_x][dest_y + 1] == 97)
                map.base[dest_x][dest_y + 1] = 109;
            if(map.base[dest_x][dest_y + 1] == 25)
                map.base[dest_x][dest_y + 1] = 132;
            if(map.base[dest_x][dest_y + 1] == 120)
                map.base[dest_x][dest_y + 1] = 108;
            if(map.base[dest_x][dest_y + 1] == 85)
                map.base[dest_x][dest_y + 1] = 121;
            if(map.base[dest_x][dest_y + 1] == 73)
                map.base[dest_x][dest_y + 1] = 133;   
                
        }

        if($("#radio_base").is(":checked")) {
            map.base[dest_x][dest_y] = tile_number;
            if($("#check_autocollision").is(":checked") && default_collision[map.base[dest_x][dest_y]] != EMPTY_TILE) 
                map.special[dest_x][dest_y] = default_collision[map.base[dest_x][dest_y]];
        }
        if( $("#radio_cover").is(":checked")) {
            map.cover[dest_x][dest_y] = tile_number;
            if($("#check_autocollision").is(":checked") && default_collision[map.cover[dest_x][dest_y]] != EMPTY_TILE) 
                map.special[dest_x][dest_y] = default_collision[map.base[dest_x][dest_y]];
        }
        if($("#radio_special").is(":checked")) {
            // start position
            if(special_number == 3) {
                map.special[map.X_start][map.Y_start] = EMPTY_TILE;
                map.X_start = dest_x;
                map.Y_start = dest_y;
            }
            map.special[dest_x][dest_y] = special_number;
        }
    }
    
    // main game loop
    this.GameLoop = function(){
        if(loadedImages == IMAGES_TO_LOAD)
        {
            if(keys_pressed["LEFT"]) X_scroll -= TILE_SIZE;
            if(keys_pressed["RIGHT"]) X_scroll += TILE_SIZE;
            if(keys_pressed["UP"]) Y_scroll -= TILE_SIZE;
            if(keys_pressed["DOWN"]) Y_scroll += TILE_SIZE;
            if(X_scroll < 0) X_scroll = 0;
            if(Y_scroll < 0) Y_scroll = 0;
            if(X_scroll > map.X_size*TILE_SIZE - X_Resolution) X_scroll = map.X_size*TILE_SIZE - X_Resolution;
            if(Y_scroll > map.Y_size*TILE_SIZE - Y_Resolution) Y_scroll = map.Y_size*TILE_SIZE - Y_Resolution;
            
            var time = (new Date).getTime();
                RenderMap();
            $("FPS").innerHTML = "Generated in: " + ((new Date).getTime() - time) + " msec";
        }
        else
        {
            canvasContext.fillRect(10, 10, 20, 20);
        }
    }
    
    // function is called to run game. It initialize all stuff eg. canvas, images etc.
    this.Run = function(){
        this.InitCanvas();
        this.LoadImages();
        
        // add keys event
        if(!document.addEventListener && document.attachEvent)
        {
            document.attachEvent("onkeydown", this.handleKeyEvent);
            document.attachEvent("onkeyup", this.handleKeyEvent);
        } else {
            window.addEventListener("keydown", this.handleKeyEvent, true);
            window.addEventListener("keyup", this.handleKeyEvent, true);
        }
        // init default collision
        default_collision = new Array(NUMBER_OF_TILES);
        for(var i = 0 ; i < NUMBER_OF_TILES ; i++)
            default_collision[i] = EMPTY_TILE;
        default_collision[12] = default_collision[24] = default_collision[36] = default_collision[48] = default_collision[60] = default_collision[72] = default_collision[84] = default_collision[96] = default_collision[108] = default_collision[120] = default_collision[132] = COLLISION;
        default_collision[1] = default_collision[13] = default_collision[25] = default_collision[37] = default_collision[49] = default_collision[61] = default_collision[73] = default_collision[85] = default_collision[97] = default_collision[109] = default_collision[121] = default_collision[133] = COLLISION;
        default_collision[98] = default_collision[110] = default_collision[122] = default_collision[134] = COLLISION;
        default_collision[5] = LADDER;
        // init drawing event
        $("#canvas").click(this.drawTiles);
        $("#canvas").mousemove(this.mouseMove);
        // create empty map
        map = new Map();
        map.createMap(16, 12);
        $("#map_height").val(12);
        $("#map_width").val(16);
        // setting GUI
        $("#settings_dialog").dialog({buttons: {
				"Set settings": function() {
                    if($("#map_height").val() < 12 || $("#map_width").val() < 16) 
                    {
                        alert("Map cant be too small");
                        return false;
                    }

                    map.createMap( $("#map_width").val(), $("#map_height").val() );
                    alert("Map resized.");
                },
                "Map code": function() {
                    $("#output_area").val( map.printMapData() );
                    $("#output_dialog").dialog('open');
                }}});
        $("#output_dialog").dialog({buttons: {
            "Load this code": function() {
                map.loadMap($("#output_area").val());
                alert("Map loaded.");
            }}});
        
        $("#tiles_dialog").dialog('option', 'position', [10, 10]); 
        $("#special_dialog").dialog('option', 'position', [10, 10]); 
        $("#special_dialog").dialog('close');
        $("#output_dialog").dialog('close');
        
        // other
        alert("initialized");    
        setInterval(this.GameLoop, 1000 / FPS);
    }
}
