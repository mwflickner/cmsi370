var charLocation = "";
var itemSlots = ["head", "hand", "arms", "legs", "chest", "shoulders", "feet", "weapon1", "weapon2", "knife"];

function itemGen (){
    var index = Math.floor(Math.random()* itemSlots.length);
    return itemSlots[index];
};

function levelGen (){
    return Math.floor(Math.random()* 100) + 1;
};

var loginSuccess = function(){
    $(document).ready(function(){
        $("#loginM").click(function(){
            $("#topMenuLogin").hide();
        });
    });
};

var accountCreateSuccess = function(){
    $(document).ready(function(){
        $("#signUp").click(function(){
            $("#topMenuCreate").hide();
        });
    });
};

var logoutSuccess = function(){
    $(document).ready(function(){
        $("#logout").click(function(){
            $("#topMenuLogin").show()
            $("#topMenuCreate").show()
        })
    })
};

function clearCharTable(){
    $(document).ready(function(){
        $("#getChars").click(function(){
            $("#charTable").empty();
        })
            
    })
};

var getCharacters = function(){
    clearCharTable();
    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) {
            $("#charTable").append(characters.map(function (character) {
                return $("<tr></tr>")
                    .append($("<td></td>").text(character.name))
                    .append($("<td></td>").text(character.classType))
                    .append($("<td></td>").text(character.gender))
                    .append($("<td></td>").text(character.level))
                    .append($("<td></td>").html("<button type='button' class='btn btn-primary btn-xs' id="+character.id+" onclick='viewCharacter("+character.id+")'>Edit</button>"))
                    .append($("<td></td>").html("<button type='button' class='btn btn-danger btn-xs' id="+character.id+" onclick='deleteCharacter("+character.id+")'>Delete</button>"));
            }));
        }
    );
};

var viewCharacter = function(){
    
    $.getJSON(
    "http://lmu-diabolical.appspot.com/characters",
    function (characterName) {
        // Do something with the character.
        $("#char").append(character.map(function (character){
            return $("tr></tr>")
                .append($("<td></td").text(character.name))
        }))
    }
);
};

var createCharacter = function (){
    var charName = $("#createCharacterName").val();
    var charClass = $("#createCharacterClass").val();
    var sex = $("input[name='sex']:checked").val();
    var charLevel = $("#createCharacterLevel").val();
    var charMoney = $("#createCharacterMoney").val();
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
        complete: function (jqXHR, textStatus) {
            // The new character can be accessed from the Location header.
            console.log("You may access the new character at:" +
                jqXHR.getResponseHeader("Location"));
            charLocation = jqXHR.getResponseHeader("Location");

        }
    });

};



var deleteCharacter = function (charID){
    $.ajax({
        type: 'DELETE',
        url: "http://lmu-diabolical.appspot.com/characters/"+charID+"",
        success: function (data, textStatus, jqXHR) {
            console.log("Gone baby gone.");
        }
    });
};


var randomItem = function(){
    var itemLocation = itemGen();
    var theLevel = levelGen();
    $.getJSON(
    "http://lmu-diabolical.appspot.com/items/spawn",
    {
        level: theLevel,
        slot: itemLocation,
    },
    function (item) {
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
};




