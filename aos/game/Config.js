/****************************************
 *  AOS - Adventure of secrets          *
 *  Utilities.js                        *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

// constants

var X_Resolution = 640;
var Y_Resolution = 480;
var BG_SCROLL_SPEED = 1;
var TILE_SIZE = 64;
var ICON_SIZE = 64;
var TILES4X = X_Resolution / TILE_SIZE;
var TILES4Y = Y_Resolution / TILE_SIZE;
var NUMBER_OF_TILES = 144;
var EMPTY_TILE = 0;
var COLLISION = 1;
var LADDER = 2;
var ENEMY = 10;
var TRIGGER = 50;
var SCOPE = 400;
var DEFAULT_SPELL_TIME = 54;

var MESSAGES_ON_SCREEN = 5;
var SPRITE_ADD_HEIGHT = 6;

var LEFT_KEY = 37;  // LEFT ARROW
var RIGHT_KEY = 39; // RIGHT ARROW
var UP_KEY = 38;    // UP ARROW
var DOWN_KEY = 40;  // DOWN ARROW
var JUMP_KEY = 32;  // SPACE
var ACTION_KEY = 13;// ENTER
var EXIT_KEY = 27;  // ESCAPE 

var FPS = 30;

var DOUBLE_BUFFERING = true;

