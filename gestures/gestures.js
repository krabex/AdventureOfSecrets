


function CMouseGesture() {
    var DEFAULT_NB_SECTORS = 8;
    var DEFAULT_TIME_STEP = 20;
    var DEFAULT_PRECISION = 20;
    var DEFAULT_FIABILITY = 20;
    var PI2 = 3.1415926535*2.0;
    
    var results = new Array();
    var moves = new Array();
    var gestures = new Array();
    var indicies = new Array();
    
    var lastPoint = {x: 0, y: 0};
    var table = new Array();
    
    var sectorsRad;
    var anglesMap = new Array();
    
    this.capturing = false;
    
    this.init = function() {
        this.buildAnglesMap();
        
        //console.log(anglesMap);
        
        this.gestures = [];
        this.indicies = [];
        this.results = [];
    }
    
    this.addGesture = function (gesture, index) {
        var g = new Array();
        
        for(var i = 0 ; i < gesture.length ; i++)
            g.push(parseInt(gesture[i], 10));
        
        gestures.push(g);
        indicies.push(index);
    }
    
    this.buildAnglesMap = function() {
        sectorsRad = PI2/DEFAULT_NB_SECTORS;
        anglesMap = [];
        
        var step = PI2/100;
        var sector;
        
        for(var i = -sectorsRad/2 ; i <= PI2 - sectorsRad/2 ; i += step) {
            sector = Math.floor((i+sectorsRad/2)/sectorsRad);
            anglesMap.push(sector);
        }
    }
    
    this.addMove = function(dx, dy){
        var angle = Math.atan2(dy, dx) + sectorsRad/2;
        if(angle < 0) angle += PI2;
        
        var no = Math.round((angle / PI2) * 100.0);
        moves.push(anglesMap[no]);
    }
    
    this.captureMouse = function(msx, msy) {
        var difx = msx - lastPoint.x;
        var dify = msy - lastPoint.y;
        var sqDist = difx*difx+dify*dify;
        var sqPrec = DEFAULT_PRECISION*DEFAULT_PRECISION;
        
        if(sqDist > sqPrec) {            
            this.addMove(difx, dify);
            lastPoint.x = msx;
            lastPoint.y = msy;            
        }
    }
    
    this.startCapture = function(msx, msy) {
        moves = [];
        points = [];
        
        lastPoint.x = msx;
        lastPoint.y = msy;
        
        this.capturing = true;
    }
    
    this.matchGesture = function() {
        this.capturing = false;
        
        var bestCost = 1000000;
        var nbGestures = gestures.length;
        var cost;
        var gest;
        var bestGesture = -1;
        
        for(var i = 0 ; i < nbGestures ; i++) {
            gest = gestures[i];
            cost = this.costLeven(gest, moves);
            if(cost < bestCost) {
                bestCost = cost;
                bestGesture = i;
            }
        }
        //console.log("bestGesture: " + bestGesture + " bestCost: " + bestCost + " / " + (DEFAULT_FIABILITY + gestures[bestGesture].length));
        if(bestGesture >= 0 && bestCost <= (DEFAULT_FIABILITY + gestures[bestGesture].length))
            return indicies[bestGesture];
        return -1;
    }
    
    this.difAngle = function(a, b) {
        var dif = Math.abs(a-b);
        if(dif > DEFAULT_NB_SECTORS/2)
            dif = DEFAULT_NB_SECTORS - dif;
        return dif;
    }
    
    this.fill2DTable = function(w, h, f) {
        table = new Array(w);
        
        for(var i = 0 ; i < w ; i++) {
            table[i] = new Array(h);
            for(var j = 0 ; j < h ; j++)
                table[i][j] = f;
        }
    }
    
    this.costLeven = function(a, b) {
        /* WTF? */
        if(a[0] == -1 || (b.length == 0))
            return b.size == 0 ? 0 : 1000000;
            
        this.fill2DTable(a.length+1, b.length+1, 0);
        var w = table.slice();
        
        for(var i = 1 ; i <= a.length ; i++)
            for(var j = 1; j < b.length ; j++)
                table[i][j] = this.difAngle(a[i-1], b[j-1]);
        
        for (var i = 1 ; i <= b.length ; i++)
            w[0][i] = 100000;
        for (var i = 1 ; i <= a.length ; i++)
            w[i][0] = 100000;    
        w[0][0] = 0;
    
        var cost = 0;
        var pa, pb, pc;
    
        for(var i = 1 ; i <= a.length ; i++)
            for(var j = 1 ; j < b.length ; j++) {
                cost = table[i][j];
                pa=w[i-1][j] + cost;
                pb=w[i][j-1] + cost;
                pc=w[i-1][j-1] + cost;
                w[i][j] = Math.min(Math.min(pa,pb),pc);
            }
        return w[a.length-1][b.length-1];
    }
}