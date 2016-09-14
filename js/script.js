/*
Notes:
-Build out func. for stopping time on user input; don't restart if a value has been entered in by the user.
-Build out func. to determine if a user has entered input, and if so, decide which card(s) should be sent.
-Build out func. for secondPinkCard; a.k.a Double Team
-Build out typing animation
-Build out blinking cursor

How to incorporate WuFoo forms:
    -First we try to style the form to match what we want
    -If that fails, make the form as basic as possible; and
        -Put form on page
        -Hide WuFoo form
        -When a user submits on the fake form, insert the values into the WuFoo form and submit it.
*/

function decideCardType() {
    "use strict";
    var randomNumber,
        card = {};
    
    randomNumber = Math.floor(Math.random() * 2);
    
    switch (randomNumber) {
    case 0:
        card.type = "white";
        card.possibilties = ["this", "that", "these"];
        break;
    case 1:
        card.type = "pink";
        card.possibilties = ["this2", "that2", "these2"];
        break;
    default:
        card.possibilties = "unknown card type";
        console.log(card.possibilties);
    }
    return card;

}

function getRandomNumber(cardArray) {
    "use strict";
    var randomNumber = Math.floor(Math.random() * cardArray.length);
    return randomNumber;

}

function changeCardText() {
    "use strict";
    var card = decideCardType(),
        cardToChange,
        textLength = 0,
        randomNumber = getRandomNumber(card.possibilties);
    
    switch (card.type) {
    case "white":
        cardToChange = document.getElementById("card__input--white");
        break;
    case "pink":
        cardToChange = document.getElementById("card__input--pink");
        break;
    case "secondPink":
        cardToChange = document.getElementById("card__input--secondPink");
        break;
    default:
        cardToChange = "unknown card";
        console.log(cardToChange);
    }
    cardToChange.value = card.possibilties[randomNumber];
}

setInterval(changeCardText, 1000);
