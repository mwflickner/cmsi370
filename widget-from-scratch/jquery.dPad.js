//(function ($){
    
   /* setUpDPad: function (jQueryElements){
        jQueryElements
            .addClass("dPad")
            
    },*/


   /* $.fn.dPad = function(){
        
        return this;
    };

    */

    var dPad =

        /*getKeyInput:*/ function(){
            $(document).keydown(function(event){
                switch(event.which){
                    case 37: // left arrow
                        console.log("LEFT!!");
                        $("#test").css('left', $("#test").offset().left - 5);
                        break;

                    case 38: // up arrow
                        console.log("UP!");
                        $("#test").css('top', $("#test").offset().top -5);
                        break;

                    case 39: // right arrow
                        console.log("RIGHT");
                        $("#test").css('left', $("#test").offset().left +5);
                        break;

                    case 40: // down arrow
                        console.log("DOWN!");
                        $("#test").css('top', $("#test").offset().top +5);
                        break;  
                }
            });
        }
    //};closes var dPad

//}(jQuery));
    