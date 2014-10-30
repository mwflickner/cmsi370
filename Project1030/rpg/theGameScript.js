var getCharacters = function (){

    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) {
            $("#charTable").append(characters.map(function (character) {
                return $("<tr></tr>")
                    .append($("<td></td>").text(character.name))
                    .append($("<td></td>").text(character.classType))
                    .append($("<td></td>").text(character.gender))
                    .append($("<td></td>").text(character.level))
                    .append($("<td></td>").html("<button type='button' class='btn btn-primary btn-xs' id="+character.name+" onclick='viewCharacter()'>View</button>"));
            }));
        }
    );
}

var viewCharacter = function(){
    $.getJSON(
    "http://lmu-diabolical.appspot.com/characters/5629499534213120",
    function (characterName) {
        // Do something with the character.
        $("#char").append(character.map(function (character){
            return $("tr></tr>")
                .append($("<td></td").text(character.name))
        }))
    }
);
}

var createCharacter = function (){
    var charName = $("#createCharacterName").val();
    var charClass = $("#createCharacterClass").val();
    var sex = $("input:radio[name=sex]").val();
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
        }
    });

}

var deleteCharacter = function (){

    $.ajax({
        type: 'DELETE',
        url: "http://lmu-diabolical.appspot.com/characters/5891733057437696",
        success: function (data, textStatus, jqXHR) {
            console.log("Gone baby gone.");
        }
    });
}