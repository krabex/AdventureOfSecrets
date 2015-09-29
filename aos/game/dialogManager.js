/****************************************
 *  AOS - Adventure of secrets          *
 *  dialogManager.js                    *
 *  Author: Krzysztof "Krabex" Drab     *
 *  Mail: Krabex93@gmail.com            *
 ****************************************/
 
 function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(" ");
        var line = "";

        for(var n = 0; n < words.length; n++) {
          if(words[n] == "\n") {
            context.fillText(line, x, y);
            line = "";
            y += lineHeight;
          }
          var testLine = line + words[n] + " ";
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }

 
 /* dialog properties
 [
    {
        condition: function that determines whether a message is shown
        icon_x: icon x offset,
        icon_y: icon y offset,
        message: string containing message,
        result: function that is invoked by clicking
        }
    }
 ]
 */
 
// function is used to organize dialogs, questions and menu
function CDialogManager() {
    var messages = new Array();
    var dialog = new Array();
    
    this.dialogProgress = 0;
    
    this.atlas;
    this.marginLeft = 40;
    this.marginTop = 48;
    this.width = X_Resolution - 2*this.marginLeft;
    this.height = 54;
    this.spaceBetween = 16;
    this.iconSize = 64;
   
    // function add message to queue
    this.addMessage = function(msg) {
        
        messages.push(msg);
        if(messages.length > MESSAGES_ON_SCREEN)
            messages.splice(0, messages.length - MESSAGES_ON_SCREEN);
    }
   
    // function shows the dialog passed as parameter
    this.dialog = function(dial) {
        game.pause = true;
        if(typeof dial != "undefined") {
            dialog = dial;
            this.dialogProgress = 0;
        }
        
        for(; this.dialogProgress < dialog.length ; this.dialogProgress++) {
            if(typeof dialog[this.dialogProgress].condition == "undefined" || dialog[this.dialogProgress].condition.call(this) == true) {
                this.addMessage(dialog[this.dialogProgress]);
            }
            console.log("Dialog: " + (this.dialogProgress+1)+" / "+dialog.length);
            if(typeof dialog[this.dialogProgress].result != "undefined" && this.dialogProgress+1 != dialog.length && typeof dialog[this.dialogProgress+1].result == "undefined")
                break;
        }
    }
   
    // mouse move handler
    this.handleMouseMove = function(mx, my) {
        var y = this.marginTop + messages.length*(this.height+this.spaceBetween);
        var x = this.marginLeft + this.width * 0.1;
        
        for(var i = messages.length-1 ; i >= 0 ; i--) {
            y -= this.height + this.spaceBetween;
            
            if(typeof messages[i].result !== "function") break;
            if(mx > x && mx < this.width && my > y && my < y+this.height)
                messages[i].active = true;
            else
                messages[i].active = false;
        }
    }
    
    // mouse up handler
    this.handleMouseUp = function(mx, my) {
        var y = this.marginTop + messages.length*(this.height+this.spaceBetween);
        var x = this.marginLeft + this.width * 0.1;
        
        for(var i = messages.length-1 ; i >= 0 ; i--) {
            y -= this.height + this.spaceBetween;
            
            if(typeof messages[i].result !== "function") break;
            if(mx > x && mx < this.width && my > y && my < y+this.height) {
                    messages[i].active = false;
                    this.dialogProgress++;
                    messages[i].result();
                    this.dialog();
            }
        }
        if(this.isActive() == false)
            game.pause = false;
    }
    
    // function check whether dialog is active
    this.isActive = function() {
        return (this.dialogProgress <= dialog.length);
    }
    
    // function finish showing dialog
    this.finish = function() {
        this.dialogProgress = dialog.length + 1; 
    }
    
    // render messages
    this.render = function(ctx) {
        var y = this.marginTop;
        var x = this.marginLeft;
        
        ctx.textAlign = "left";
        
        for(var i = 0 ; i < messages.length ; i++) {
            var grd = ctx.createLinearGradient(0, y, 0, y + this.height);
            grd.addColorStop(0, (messages[i]["active"] ? "rgba(40, 40, 40, 0.5)" : "rgba(10, 10, 10, 0.7)"));
            grd.addColorStop(1, "rgba(140, 140, 140, 0.9)");
            
            x = (typeof messages[i].result != "undefined" ? x = this.marginLeft + this.width * 0.1 : x = this.marginLeft);
            ctx.roundRect(x, y, (typeof messages[i].result != "undefined" ? this.width * 0.9 : this.width), this.height, 5);
            ctx.fillStyle = grd;
            ctx.fill();
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = (messages[i]["active"] ? '#FFFF99' : '#D3D3D3');
            ctx.stroke();
            
            ctx.font = "13pt Calibri";
            ctx.fillStyle = '#D3D3D3';
            wrapText(ctx, messages[i].message, x + 3 + this.height, y + 3, this.width - this.iconSize, 16);
            
            ctx.drawImage(this.atlas, messages[i].icon_x, messages[i].icon_y, this.iconSize, this.iconSize,
                x + 3, y + 3, this.height-6, this.height-6);
            
            y += this.height + this.spaceBetween;
        }
    }
}