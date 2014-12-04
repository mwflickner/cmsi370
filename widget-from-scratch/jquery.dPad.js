//(function ($){
    var dPad = {

        
        
        setUpDPad: function (jQueryElements){
            jQueryElements
                .addClass("dPad")
                .keydown(this.keyer)
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



        goLeft: function (){
            console.log("LEFT!");
        },

        goUp: function (){
            console.log("UP!");
        },

        goRight: function (){
            console.log("RIGHT!");
        },

        goDown: function (){
            console.log("DOWN!");
        },

        highlight: function (){
            $()
        }



    

        
           
        

    };//closes var dPad

/*    $.fn.dPad = function () {
        dPad.setUpDPad(this);
    };

}(jQuery)); */
    