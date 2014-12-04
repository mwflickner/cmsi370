var theGame = {
    //var charLocation;
    //var itemSlots = ["head", "hand", "arms", "legs", "chest", "shoulders", "feet", "weapon1", "weapon2", "knife"];
    //var loggedIn = false;

    itemGen: function () {
        var itemSlots = ["head", "hand", "arms", "legs", "chest", "shoulders", "feet", "weapon1", "weapon2", "knife"];
        var index = Math.floor(Math.random() * itemSlots.length);
        return itemSlots[index];
    },

    levelGen: function () {
        return Math.floor(Math.random() * 100) + 1;
    },


    loginSuccess: function () {
        $("#loginM").click(function () {
            $("#topMenuLogin").text("Logout");
            $("#topMenuCreate").hide();
            $("#topMenuLogin").attr({
                "onclick": "logoutSuccess()",
                    "data-toggle": ""
            });
        });
    },

    accountCreateSuccess: function () {
        $("#signUpM").click(function () {
            $("#topMenuCreate").hide();
            $("#topMenuLogin").text("Logout");
            $("#topMenuLogin").attr({
                "onclick": "logoutSuccess()",
                    "data-toggle": ""
            });
        });
    },

    logoutSuccess: function () {
        $(document).ready(function () {
            $("#topMenuLogin").click(function () {
                $("#topMenuLogin").text("Login");
                $("#topMenuLogin").attr({
                    "onclick": "loginSucess()",
                        "data-toggle": "modal"
                });
                $("#topMenuCreate").show();
            });
        });
    },

    pageStart: function () {
        $("#mainScreen").hide();
    },


    play: function () {
        $("#playBut").click(function(){
            $("#mainScreen").show();        
        });
            
    },

    clearCharTable: function() {
        $(document).ready(function () {
            $("#getChars").click(function () {
                 $("#charTable").empty();
            })

        })
    },

    getCharacters: function () {
        
            $.getJSON(
                "http://lmu-diabolical.appspot.com/characters",

            function (characters) {
                $("#charTable").append(characters.map(function (character) {
                    return $("<tr></tr>")
                        .append($("<td></td>").text(character.name))
                        .append($("<td></td>").text(character.classType))
                        .append($("<td></td>").text(character.gender))
                        .append($("<td></td>").text(character.level))
                        .append($("<td></td>").html("<button type='button' class='btn btn-primary btn-xs' id=" + character.id + " onclick='theGame.viewCharacter(" + character.id + ")'>View</button>"))
                        .append($("<td></td>").html("<button type='button' class='btn btn-danger btn-xs' id=" + character.id + " onclick='theGame.deleteCharacter(" + character.id + ")'>Delete</button>"));
                }));
            });
            this.clearCharTable();
        


    },



    createCharacter: function () {
        

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
                complete: function (jqXHR, textStatus) {
                    // The new character can be accessed from the Location header.
                    console.log("You may access the new character at:" + jqXHR.getResponseHeader("Location"));
                    charLocation = jqXHR.getResponseHeader("Location");
                }
            });
        

    },

    //var tempID;

    viewCharacter: function (charID) {
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/" + charID + "",

        function (character) {
            $("#viewCharName").text(character.name);
            $("#viewCharClass").text(character.classType);
            $("#viewCharGender").text(character.gender);
            $("#viewCharLevel").text(character.level);
            $("#editor").html("<button type='button' class='btn btn-default btn-sm' data-toggle='modal' data-target='#editCharModal' id='editThis'>Edit " + character.name + "</button>")
            tempID = charID;

            // Do something with the character.
            console.log(character);
        });
    },

    editCharacter: function (inputID) {
        if (confirm("You Sure?")) {
            var charName = $("#editCharacterName").val();
            var charClass = $("#editCharacterClass").val();
            var sex = $("input[name='sex']:checked").val();
            var charLevel = $("#editCharacterLevel").val();
            var charMoney = $("#editCharacterMoney").val();

            $.ajax({
                type: 'PUT',
                url: "http://lmu-diabolical.appspot.com/characters/" + inputID + "",
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
                success: function (data, textStatus, jqXHR) {
                    console.log("Done: no news is good news.");
                }
            });
        }

    },

    characterEditor: function () {
        this.editCharacter(tempID);
    },



    deleteCharacter: function (charID) {
        if (confirm("Wanna Delete?")) {
            $.ajax({
                type: 'DELETE',
                url: "http://lmu-diabolical.appspot.com/characters/" + charID + "",
                success: function (data, textStatus, jqXHR) {
                    console.log("Gone baby gone.");
                }
            });
        }
    },


    randomItem: function () {
        
            var itemLocation = this.itemGen();
            var theLevel = this.levelGen();
            $.getJSON(
                "http://lmu-diabolical.appspot.com/items/spawn", {
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

            });

    }
}
