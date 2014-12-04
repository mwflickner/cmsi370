//(function ($){
    var dPad = {

        
        
        setUpDPad: function (jQueryElements){
            jQueryElements
                .ready(this.setUpButtons)
                .keydown(this.keyer)
                .keyup(this.keyerUpper)
        },

        setUpButtons: function (button){
            var left = '<div class = "row"><div class="col-md-4"><button class = "dPadButton" id = "left"><span class = "glyphicon glyphicon-arrow-left"></span></button></div>';
            var up = '<div class = "row"><div class="col-md-4 col-md-offset-3"><button class= "dPadButton" id = "up"><span class="glyphicon glyphicon-arrow-up"></span></button></div></div>';
            var right = '<div class= "col-md-4 col-md-offset-2"><button class = "dPadButton" id = "right" ><span class="glyphicon glyphicon-arrow-right"></span></button></div></div>';
            var down = '<div class = "row"><div class="col-md-4 col-md-offset-3"><button class = "dPadButton" id = "down" ><span class="glyphicon glyphicon-arrow-down"></span></button></div></div>';
            $(".dPad").append(up + left + right + down);
            
            

        },

        keyer: function (event){
            switch(event.which){
                case 37: // left arrow
                    console.log("SWITCH WORKS");
                    dPad.goLeft();
                    break;

                case 38: // up arrow
                    console.log("SWITCH WORKS!");
                    dPad.goUp();
                    break;

                case 39: // right arrow
                    console.log("SWITCH WORKS");
                    dPad.goRight();
                    break;

                case 40: // down arrow
                    console.log("SWITCH WORKS");
                    dPad.goDown();
                    break;  
            }
        },

        keyerUpper: function (event){
            switch(event.which){
                case 37: // left arrow
                    console.log("KEYUP WORKS");
                    $("#left").removeClass("button-highlight");
                    break;

                case 38: // up arrow
                    console.log("KEYUP WORKS!");
                    $("#up").removeClass("button-highlight");
                    break;

                case 39: // right arrow
                    console.log("KEYUP WORKS");
                    $("#right").removeClass("button-highlight");
                    break;

                case 40: // down arrow
                    console.log("KEYUP WORKS");
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
        },

        goRight: function (){
            console.log("RIGHT!");
            $("#right").addClass("button-highlight");
        },

        goDown: function (){
            console.log("DOWN!");
            $("#down").addClass("button-highlight");
        },

        


        /*unhighlight: function () {
            $(this).removeClass("button-highlight");
        },*/

        


    

        
           
        

    };//closes var dPad

/*    $.fn.dPad = function () {
        dPad.setUpDPad(this);
    };

}(jQuery)); */
    