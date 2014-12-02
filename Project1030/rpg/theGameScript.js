// JD: 17
var charLocation = "";
var itemSlots = ["head", "hand", "arms", "legs", "chest", "shoulders", "feet", "weapon1", "weapon2", "knife"];
var loggedIn = false;

function itemGen (){ // JD: 12, 18
    var index = Math.floor(Math.random()* itemSlots.length);
    return itemSlots[index];
};

function levelGen (){ // JD: 12, 18
    return Math.floor(Math.random()* 100) + 1;
};

var loginSuccess = function(){
        $("#loginM").click(function(){ // JD: 12
            $("#topMenuLogin").text("Logout");
            $("#topMenuCreate").hide();
            $("#topMenuLogin").attr({
                "onclick": "logoutSuccess()", // JD: 7 (this is still equivalent to doing this in HTML)
                "data-toggle": ""
            });
        });
    loggedIn = true;
};

var accountCreateSuccess = function(){ // JD: 12 (and probably for rest of this file)
        $("#signUpM").click(function(){
            $("#topMenuCreate").hide();
            $("#topMenuLogin").text("Logout"); // JD: 19
            $("#topMenuLogin").attr({
                "onclick": "logoutSuccess()", // JD: 7
                "data-toggle": ""
            });
        });
    loggedIn=true; // JD: 12, 17---note how I can type loggedIn=true in browser to log in!
};

var logoutSuccess = function(){ // JD: 12
    $(document).ready(function(){
        $("#topMenuLogin").click(function(){
            $("#topMenuLogin").text("Login"); // JD: 19
            $("#topMenuLogin").attr({
                "onclick": "loginSucess()",
                "data-toggle": "modal"
            });
            $("#topMenuCreate").show();
        });
    });
    loggedIn=false;
};

var pageStart = function(){

    $("#mainScreen").hide();
}


var play = function(){
    if(!loggedIn){
        alert("Please Login First");
    }
    else{ // JD: 20
        $("#playBut").click(function(){
            $("#mainScreen").show();
        })
    }
}

function clearCharTable(){ // JD: 12, 18
    $(document).ready(function(){
        $("#getChars").click(function(){
            $("#charTable").empty();
        })
            
    })
};

var getCharacters = function(){
    if(!loggedIn){
        alert("Please Login First");
    }
    else{ // JD: 20
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters",
            function (characters) {
                $("#charTable").append(characters.map(function (character) {
                    return $("<tr></tr>")
                        .append($("<td></td>").text(character.name))
                        .append($("<td></td>").text(character.classType))
                        .append($("<td></td>").text(character.gender))
                        .append($("<td></td>").text(character.level))
                        .append($("<td></td>").html("<button type='button' class='btn btn-primary btn-xs' id="+character.id+" onclick='viewCharacter("+character.id+")'>View</button>")) // JD: 7 ....instead, assign actual functions
                        .append($("<td></td>").html("<button type='button' class='btn btn-danger btn-xs' id="+character.id+" onclick='deleteCharacter("+character.id+")'>Delete</button>"));
                }));
            }
        );
        clearCharTable();
    }
    
        
};



var createCharacter = function (){
    if(!loggedIn){
        alert("Please Login First");
    }
    else{ // JD: 20

        var charName = $("#createCharacterName").val();
        var charClass = $("#createCharacterClass").val();
        var sex = $("input[name='sex']:checked").val();
        var charLevel = $("#createCharacterLevel").val();
        var charMoney = $("#createCharacterMoney").val();
        var charLocation;
        $.ajax({
            type: 'POST',
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
            complete: function (jqXHR, textStatus) { // JD: 3
                // The new character can be accessed from the Location header.
                console.log("You may access the new character at:" +
                    jqXHR.getResponseHeader("Location"));
                charLocation = jqXHR.getResponseHeader("Location");
            }
        });
    }

};

var tempID;

var viewCharacter = function(charID){
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters/"+charID+"", // JD: 21
        function (character) {
            // JD: 22
            $("#viewCharName").text(character.name);
            $("#viewCharClass").text(character.classType);
            $("#viewCharGender").text(character.gender);
            $("#viewCharLevel").text(character.level);
            $("#editor").html("<button type='button' class='btn btn-default btn-sm' data-toggle='modal' data-target='#editCharModal' id='editThis'>Edit "+character.name+"</button>")
            tempID=charID; // JD: 12

            // Do something with the character.
            console.log(character);
        }
    );
}

var editCharacter = function(inputID){ // JD: 12
    if(confirm("You Sure?")){ // JD: 12
        // JD: 23
        var charName = $("#editCharacterName").val();
        var charClass = $("#editCharacterClass").val();
        var sex = $("input[name='sex']:checked").val();
        var charLevel = $("#editCharacterLevel").val();
        var charMoney = $("#editCharacterMoney").val();

        $.ajax({
            type: 'PUT',
            url: "http://lmu-diabolical.appspot.com/characters/"+inputID+"", // JD: 21
            data: JSON.stringify({
                id: inputID,
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
            }
        });
    }
        
}

var characterEditor = function(){
    editCharacter(tempID);
}



var deleteCharacter = function (charID){ // JD: 12
    if(confirm("Wanna Delete?")){ 
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/"+charID+"", // JD: 21
            success: function (data, textStatus, jqXHR) { // JD: 3
                console.log("Gone baby gone.");
            }
        });
    }
};


var randomItem = function(){
    if(!loggedIn){
        alert("Please Login First");
    }
    else{ // JD: 20
        var itemLocation = itemGen();
            var theLevel = levelGen();
            $.getJSON(
            "http://lmu-diabolical.appspot.com/items/spawn",
            {
                level: theLevel,
                slot: itemLocation,
            },
            function (item) {
                // JD: 11
               /* $("#itemTable").append(item.map(function (item) {
                        return $("<tr></tr>")
                            .append($("<td></td>").text(item.absorption))
                            .append($("<td></td>").text(item.atkspeed))
                            .append($("<td></td>").text(item.blockchance))
                            .append($("<td></td>").text(item.level))
                            .append($("<td></td>").text(item.critchance))
                            .append($("<td></td>").text(item.defense))
                            .append($("<td></td>").text(item.maxdamage))
                            .append($("<td></td>").text(item.mindamage))
                            .append($("<td></td>").text(item.name))
                            .append($("<td></td>").text(item.slot))

                    }));
                */
                // Mmmmm, new item.
                console.log(item);

            }
        );
    }
            
};




