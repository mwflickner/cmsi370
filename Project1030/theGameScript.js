var getCharacters = function (){

    $.getJSON(
        "http://lmu-diabolical.appspot.com/characters",
        function (characters) {
            $("tbody").append(characters.map(function (character) {
                return $("<tr></tr>")
                    .append($("<td></td>").text(character.name))
                    .append($("<td></td>").text(character.classType))
                    .append($("<td></td>").text(character.gender))
                    .append($("<td></td>").text(character.level))
                    .append($("<td></td>").html("<button type='button' class='btn btn-primary btn-xs' id="+character.name+">View</button>"));
            }));
        }
    );
}

var createCharacters = function (){
    $.ajax({
        type: 'POST',
        url: "http://lmu-diabolical.appspot.com/characters",
        data: JSON.stringify({
            name: "Sam",
            classType: "rogue",
            gender: "MALE",
            level: 89,
            money: 4732349
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