/****************************************
 *  AOS - Adventure of secrets          *
 *  Utilities.js                        *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/


// based on a function from prototype.js
function $()
{
    var elements = new Array();
    
    for(var i = 0 ; i < arguments.length ; i++)
    {
        var element = arguments[i];
        if(typeof element == 'string')
            element = document.getElementById(element);
            if(arguments.length == 1)
                return element;
        elements.push(element);
    }
    return elements;
}

function rand(x, y) { return Math.round(x + Math.random()*(y-x)); };

// based on Grumdrig's post : 
// http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}

CanvasRenderingContext2D.prototype.arrow = function(fromx, fromy, tox, toy) {
    this.beginPath();
    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);
    this.moveTo(fromx, fromy);
    this.lineTo(tox, toy);
    this.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    this.moveTo(tox, toy);
    this.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
    this.closePath();
    return this;
}

// Storage helpers from Guria post on stack overflow:
// http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

//====
function getFullDate() {
    var d = new Date;
    var res = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    return res;
}