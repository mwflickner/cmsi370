var BoxesTouch = {
    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    setDrawingArea: function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", BoxesTouch.trackDrag, false);
                element.addEventListener("touchend", BoxesTouch.endDrag, false);
                element.addEventListener("touchstart", BoxesTouch.startDraw, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", BoxesTouch.startMove, false);
                element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
    },
    
    setupDragState: function (){
        $(".drawing-area .box")
            .unbind("touchmove")
            .unbind("touchend")
    },
    
    
    startDraw: function (event){
        //console.log(event);
            $.each(event.changedTouches, function (index, touch){
                if(!touch.target.movingBox){
                    console.log("START!", touch);
                    this.anchorX = touch.pageX;
                    this.anchorY = touch.pageY;
                    this.drawingBox = $("<div></div>")
                    this.drawingBox
                       .appendTo($(".drawing-area"))
                       .addClass("box")
                       .offset({left: this.anchorX, top: this.anchorY});
                    $("#drawing-area").find("div.box").each(function (index, element){
                        element.addEventListener("touchstart", BoxesTouch.startMove, false);
                        element.addEventListener("touchend", BoxesTouch.unhighlight, false);
                    });
                   BoxesTouch.setupDragState();
                }
                    
                   
            });
        
    },
    

    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    trackDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               
            console.log("MOVE!", touch);
            if (this.drawingBox){
               var newOffset = {
                   left: (this.anchorX < event.pageX) ? this.anchorX : event.pageX,
                   top: (this.anchorY < event.pageY) ? this.anchorY : event.pageY
               }
               this.drawingBox
                   .offset(newOffset)
                   .width(Math.abs(event.pageX - this.anchorX))
                   .height(Math.abs(event.pageY - this.anchorY))
            }
            // Don't bother if we aren't tracking anything.
            else if (touch.target.movingBox) {
                // Reposition the object.
               
                touch.target.movingBox.offset({
                    left: touch.pageX - touch.target.deltaX,
                    top: touch.pageY - touch.target.deltaY
                });

            }
        });
        
        // Don't do any touch scrolling.
        event.preventDefault();
    },

    /**
     * Concludes a drawing or moving sequence.
     */
    endDrag: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               console.log("END", touch);
            if (this.drawingBox){
               
               this.drawingBox = null;
            }
            else if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
               var drawAreaLength = $(".drawing-area").width();
               var drawAreaHeight = $(".drawing-area").height();
               var touchedBoxLength = $(touch.target).width();
               var touchedBoxHeight = $(touch.target).height();
               var xCoord = touch.pageX;
               var yCoord = touch.pageY;
               if(xCoord > (drawAreaLength-touchedBoxLength/2)&& yCoord > (drawAreaHeight - touchedBoxHeight/2)){
                    //$(."box-highlight").css("box-shadow", "0px 0px 6px red");
                    $(touch.target).remove();
               }
                touch.target.movingBox = null;
               
            }


        });
    },

    /**
     * Indicates that an element is unhighlighted.
     */
    highlight: function() {
        $(this).addClass("box-highlight");
    },


    unhighlight: function () {
        $(this).removeClass("box-highlight");
    },

    /**
     * Begins a box move sequence.
     */
    startMove: function (event) {
        $.each(event.changedTouches, function (index, touch) {
               console.log("MOVE START", touch);
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    }

};
