var theGame = function (jQueryElements){
        var loggedIn = false;
        var tempID;

        //control of the play button
        $("#playBut").click(function () {
            if(!loggedIn){
                alert("Please login first!");
            }else{
                $("#mainScreen").show();
            }
        });
        
        //login sucessful
        $("#loginM").click(function () {
            $("#topMenuLogin").text("Logout");
            $("#topMenuCreate").hide();
            $("#topMenuLogin").attr({// JD: 7 (this is still equivalent to doing this in HTML)
                    "data-toggle": ""
            });
            loggedIn = true;
        });

        //create account succesful
        $("#signUpM").click(function () {
            $("#topMenuCreate").hide();
            $("#topMenuLogin").text("Logout"); // JD: 19
            $("#topMenuLogin").attr({// JD: 7
                    "data-toggle": "" // JD: 8
            });
            loggedIn = true;
        });

        //log out sucessful
        $(document).ready(function () {
            $("#topMenuLogin").click(function () {
                $("#topMenuLogin").text("Login");
                $("#topMenuLogin").attr({
                    "data-toggle": "modal" // JD: 8
                });
                $("#topMenuCreate").show();
            });
            loggedIn= false;
        });

        //page start settings
        $(document).ready(function(){
            $("#mainScreen").hide();
            $("#itemCreated").hide();
            $("#charTable").empty();
        });

        
        
        //fills out the character table
        $("#getChars").click(function(){
            $("#charTable").empty();
            $.getJSON(
                "http://lmu-diabolical.appspot.com/characters",

            function (characters) {
                $("#charTable").append(characters.map(function (character) {
                    return $("<tr></tr>")
                        .append($("<td></td>").text(character.name))
                        .append($("<td></td>").text(character.classType))
                        .append($("<td></td>").text(character.gender))
                        .append($("<td></td>").text(character.level))
                         // JD: 7 ....instead, assign actual functions
                        .append($("<td></td>").html("<button type='button' id='v"+(character.id)+"' class='characterView btn btn-primary btn-xs'>View</button>"))
                        .append($("<td></td>").html("<button type='button' id='d"+(character.id)+"' class='characterDelete btn btn-danger btn-xs'>Delete</button>"));
                }));
            });
        });
        
        //sets character to view in table
        $("#charTable").on("click", "button.characterView", function(){
            var buttonID = this.id;
            var charID = buttonID.substring(1, (buttonID.length));
            $.getJSON(
                "http://lmu-diabolical.appspot.com/characters/" + charID,// JD: 21

            function (character) {
                // JD: 22
                $("#viewCharName").text(character.name);
                $("#viewCharClass").text(character.classType);
                $("#viewCharGender").text(character.gender);
                $("#viewCharLevel").text(character.level);
                $("#editor").html("<button type='button' id='editThis' class='btn btn-default btn-sm' data-toggle='modal' data-target='#editCharModal' id='editThis'>Edit " + character.name + "</button>")
                tempID = charID;

                console.log(character);
            });
        });

        $("#editCharSave").click(function(){
            if (confirm("You Sure?")){
                // JD: 23
                var charName = $("#editCharacterName").val();
                var charClass = $("#editCharacterClass").val();
                var sex = $("input[name='sex']:checked").val();
                var charLevel = $("#editCharacterLevel").val();
                var charMoney = $("#editCharacterMoney").val();

                $.ajax({
                    type: 'PUT',
                    async: false,
                    url: "http://lmu-diabolical.appspot.com/characters/" + tempID + "", // JD: 21
                    data: JSON.stringify({
                        id: tempID,
                        name: charName,
                        classType: charClass,
                        gender: sex,
                        level: charLevel,
                        money: charMoney,
                    }),
                    contentType: "application/json",
                    dataType: "json",
                    accept: "application/json",
                    success: function (data, textStatus, jqXHR) { // JD: 3
                        console.log("Done: no news is good news.");
                        //function());
                    }
                });
                $("#getChars").click();
                $("#viewCharName").text("");
                $("#viewCharClass").text("");
                $("#viewCharGender").text("");
                $("#viewCharLevel").text("");
                $("#editThis").remove();
                
            }
        });


        //creates a character from the create character modal
        $("#createCharButton").click(function(){
            var charName = $("#createCharacterName").val();
            var charClass = $("#createCharacterClass").val();
            var sex = $("input[name='sex']:checked").val();
            var charLevel = $("#createCharacterLevel").val();
            var charMoney = $("#createCharacterMoney").val();
            var charLocation;
            $.ajax({
                type: 'POST',
                async: false,
                url: "http://lmu-diabolical.appspot.com/characters",
                data: JSON.stringify({
                    name: charName,
                    classType: charClass,
                    gender: sex,
                    level: charLevel,
                    money: charMoney,
                }),
                contentType: "application/json",
                dataType: "json",
                accept: "application/json",
                complete: function (jqXHR, textStatus) {
                    // The new character can be accessed from the Location header.
                    console.log("You may access the new character at:" + jqXHR.getResponseHeader("Location"));
                    charLocation = jqXHR.getResponseHeader("Location");
                }
            });
            $("#getChars").click();
        });

        //deletes a character
        $("#charTable").on("click", "button.characterDelete", function(){
            var buttonID = this.id;
            var charID = buttonID.substring(1, (buttonID.length));
            if (confirm("Wanna Delete?")) {
                $.ajax({
                    type: 'DELETE',
                    async: false,
                    url: "http://lmu-diabolical.appspot.com/characters/" + charID, // JD: 21
                    success: function (data, textStatus, jqXHR) { // JD: 3
                        console.log("Gone baby gone.");
                    }
                });
                $("#getChars").click();
            }
        })

        //item spawn
        $("#itemSpawn").click(function(){
            $("#itemCreated").hide();
            //assigns a random slot and level for item
            var itemSlots = ["head", "hand", "arms", "legs", "chest", "shoulders", "feet", "weapon1", "weapon2", "knife"];
            var index = Math.floor(Math.random() * itemSlots.length);
            var itemLocation = itemSlots[index];
            var theLevel = Math.floor(Math.random() * 100) + 1;

            $.getJSON(
                "http://lmu-diabolical.appspot.com/items/spawn", {
                    level: theLevel,
                    slot: itemLocation,
                },

                function (item) {
                    $("#itemCreated").show();
                    console.log(item);
                }
            );
            
        });

        //removes visual cue after itemGen
        $("#items").focusout(function(){
            $("#itemCreated").hide();
        });


    
    


  
}
