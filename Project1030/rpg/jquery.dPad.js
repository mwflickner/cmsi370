(function ($){
    var dPad = {
        
        setUpDPad: function (jQueryElements){
            jQueryElements
                .ready(this.setUpButtons)
                .keydown(this.keyer)
                .keyup(this.keyerUpper)
                //.mousedown(this.clicker)
                //.mouseup(this.unclicker)
                //.mouseleave(this.unclicker)
        },

        setUpButtons: function (button){
            //$("#dPad").css({"background-color":"#ccc","position":"absolute", "top":"150", "left":"150"});
            //$(".vertical-target").css("background-color","yellow");
            //$(".button-highlight").css("box-shadow", "0px 0px 6px #88F");
            var left = '<div class = "row"><div class="col-sm-2"><button class ="dPadButton" id ="left"><span class="glyphicon glyphicon-arrow-left"></span></button></div>';
            var up = '<div class = "row"><div class="col-sm-2 col-md-offset-1"><button class ="dPadButton" id ="up" ><span class="glyphicon glyphicon-arrow-up"></span></button></div></div>';
            var right = '<div class = "col-sm-2"><button class="dPadButton" id="right"><span class="glyphicon glyphicon-arrow-right"></span></button></div></div>';
            var down = '<div class ="row"><div class="col-sm-2 col-md-offset-1"><button class ="dPadButton" id ="down"><span class="glyphicon glyphicon-arrow-down"></span></button></div></div>';
            $(".dPad").append(up + left + right + down);
            
            
            
            

            

        },

        keyer: function (event){
            switch(event.which){
                case 37: // left arrow
                    //console.log("SWITCH WORKS");
                    dPad.goLeft();
                    break;

                case 38: // up arrow
                    //console.log("SWITCH WORKS!");
                    dPad.goUp();
                    break;

                case 39: // right arrow
                    //console.log("SWITCH WORKS");
                    dPad.goRight();
                    break;

                case 40: // down arrow
                    //console.log("SWITCH WORKS");
                    dPad.goDown();
                    break;  
            }
            event.preventDefault();
        },


        keyerUpper: function (event){
            switch(event.which){
                case 37: // left arrow
                    //console.log("KEYUP WORKS");
                    $("#left").removeClass("button-highlight");
                    break;

                case 38: // up arrow
                    //console.log("KEYUP WORKS!");
                    $("#up").removeClass("button-highlight");
                    break;

                case 39: // right arrow
                    //console.log("KEYUP WORKS");
                    $("#right").removeClass("button-highlight");
                    break;

                case 40: // down arrow
                    //console.log("KEYUP WORKS");
                    $("#down").removeClass("button-highlight");
                    break;  
            }

        },


        goLeft: function (){
            console.log("LEFT!");
            $("#left").addClass("button-highlight");
        },

        goUp: function (){
            console.log("UP!");
            $("#up").addClass("button-highlight");
            var currentTarget = parseInt($(".vertical-target").attr("id"));

            console.log(currentTarget);
            if(currentTarget > 1){
                var newTarget = currentTarget - 1;
                $("#"+ currentTarget).removeClass("vertical-target");
                $("#"+ newTarget).addClass("vertical-target");

            }
            

        },

        goRight: function (){
            console.log("RIGHT!");
            $("#right").addClass("button-highlight");
        },

        goDown: function (){
            console.log("DOWN!");
            $("#down").addClass("button-highlight");
            var currentTarget = parseInt($(".vertical-target").attr("id"));
            var rowCount = $(".tRow").length;
            console.log("table is size: " + rowCount);
            console.log(currentTarget);
            if(currentTarget < rowCount){
                var newTarget = currentTarget + 1;
                $("#"+ currentTarget).removeClass("vertical-target");
                $("#"+ newTarget).addClass("vertical-target");
            }
        },

 
        

    };//closes var dPad

    $.fn.dpad = function () {
        dPad.setUpDPad(this);
    };

}(jQuery)); 
    