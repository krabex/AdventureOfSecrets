/****************************************
 *  AOS - Adventure of secrets          *
 *  CMap.js                             *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/

function Map()
{
    this.X_size;
    this.Y_size;
    this.X_start;
    this.Y_start;

    this.base;
    this.cover;
    this.special;
    
    this.triggers = new Array();
    this.resources = new Array();
    
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
    }
    
    this.eraseTile = function(dest_x, dest_y) {
        if(this.base[dest_x][dest_y]%12 != 0 && this.base[dest_x][dest_y]%12 != 1)
            return false;
        // left tile
        if(this.base[dest_x - 1][dest_y] == 12)
            this.base[dest_x - 1][dest_y] = 1;
        if(this.base[dest_x - 1][dest_y] == 37)
            this.base[dest_x - 1][dest_y] = 49;
        if(this.base[dest_x - 1][dest_y] == 25)
            this.base[dest_x - 1][dest_y] = 73;
        if(this.base[dest_x - 1][dest_y] == 121)
            this.base[dest_x - 1][dest_y] = 109;
        if(this.base[dest_x - 1][dest_y] == 85)
            this.base[dest_x - 1][dest_y] = 97;
        if(this.base[dest_x - 1][dest_y] == 13)
            this.base[dest_x - 1][dest_y] = 120;
        if(this.base[dest_x - 1][dest_y] == 132)
            this.base[dest_x - 1][dest_y] = 133;
        if(this.base[dest_x - 1][dest_y] == 61)
            this.base[dest_x - 1][dest_y] = 108;
        // right tile
        if(this.base[dest_x + 1][dest_y] == 12)
            this.base[dest_x + 1][dest_y] = 13;
        if(this.base[dest_x + 1][dest_y] == 37)
            this.base[dest_x + 1][dest_y] = 61;
        if(this.base[dest_x + 1][dest_y] == 25)
            this.base[dest_x + 1][dest_y] = 85;
        if(this.base[dest_x + 1][dest_y] == 133)
            this.base[dest_x + 1][dest_y] = 109;
        if(this.base[dest_x + 1][dest_y] == 73)
            this.base[dest_x + 1][dest_y] = 97;
        if(this.base[dest_x + 1][dest_y] == 1)
            this.base[dest_x + 1][dest_y] = 120;
        if(this.base[dest_x + 1][dest_y] == 132)
            this.base[dest_x + 1][dest_y] = 121;
        if(this.base[dest_x + 1][dest_y] == 49)
            this.base[dest_x + 1][dest_y] = 108;
        // top tile
        if(this.base[dest_x][dest_y - 1] == 12)
            this.base[dest_x][dest_y - 1] = 25;
        if(this.base[dest_x][dest_y - 1] == 61)
            this.base[dest_x][dest_y - 1] = 121;
        if(this.base[dest_x][dest_y - 1] == 49)
            this.base[dest_x][dest_y - 1] = 133;
        if(this.base[dest_x][dest_y - 1] == 1)
            this.base[dest_x][dest_y - 1] = 73;    
        if(this.base[dest_x][dest_y - 1] == 13)
            this.base[dest_x][dest_y - 1] = 85;
        if(this.base[dest_x][dest_y - 1] == 37)
            this.base[dest_x][dest_y - 1] = 132;
        if(this.base[dest_x][dest_y - 1] == 120)
            this.base[dest_x][dest_y - 1] = 97;
        if(this.base[dest_x][dest_y - 1] == 108)
            this.base[dest_x][dest_y - 1] = 109;
        // bottom tile
        if(this.base[dest_x][dest_y + 1] == 12)
            this.base[dest_x][dest_y + 1] = 37;
        if(this.base[dest_x][dest_y + 1] == 1)
            this.base[dest_x][dest_y + 1] = 49;
        if(this.base[dest_x][dest_y + 1] == 13)
            this.base[dest_x][dest_y + 1] = 61;
        if(this.base[dest_x][dest_y + 1] == 97)
            this.base[dest_x][dest_y + 1] = 109;
        if(this.base[dest_x][dest_y + 1] == 25)
            this.base[dest_x][dest_y + 1] = 132;
        if(this.base[dest_x][dest_y + 1] == 120)
            this.base[dest_x][dest_y + 1] = 108;
        if(this.base[dest_x][dest_y + 1] == 85)
            this.base[dest_x][dest_y + 1] = 121;
        if(this.base[dest_x][dest_y + 1] == 73)
            this.base[dest_x][dest_y + 1] = 133;
        
        this.special[dest_x][dest_y] = EMPTY_TILE;
        this.base[dest_x][dest_y] = EMPTY_TILE;
    }
};
