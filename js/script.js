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

var readyForNext = true;

var pinkCardOptions = [
  'Faking an Orgasm',
  'Six Inches',
  'Slowly eating a banana while making eye contact with strangers'
];

var whiteCardOptions = [
  'The best orgasm comes when you think about ___ while screaming ___.',
  'Basic single card'
];

function decideCardType() {
    "use strict";
    var randomNumber,
        card = {};

    randomNumber = Math.floor(Math.random() * 2);

    switch (randomNumber) {
    case 0:
        card.type = "white";
        card.possibilties = whiteCardOptions;
        break;
    case 1:
        card.type = "pink";
        card.possibilties = pinkCardOptions;
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


function typeText(card, text, textLength, subString) {
    'use strict';

    subString = text.substr(0, textLength);
    textLength = textLength + 1;
    card.placeholder = subString;
    if (text === subString) { return true; }
    setTimeout(function () {
        typeText(card, text, textLength, subString);
    }, 80);
}

function changeCardText() {
    "use strict";
    var card = decideCardType(),
        cardToChange,
        textLength = 0,
        readyForNext = false,
        subString = "",
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
    //typeText(cardToChange.placeholder = card.possibilties[randomNumber]);
    readyForNext = typeText(cardToChange, card.possibilties[randomNumber], textLength, subString);
    return readyForNext;
}

changeCardText()

if (readyForNext) {
    readyForNext = setInterval(changeCardText, 1500);
}
