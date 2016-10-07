var timer = null;

function setDoubleTeamStatus(status) {
  var doubleTeamStatus = status;
  return doubleTeamStatus;
}
$('#add-blank-button').click(function addBlank(){
    //Some code
});
$('#card__input--white').blur(function checkSingleorDoubleTeamStatus(){
  var numberOfBlanks = $(this).val().match(/____/g) == null ? [] : $(this).val().match(/____/g);
  var cardStatus;
  if (numberOfBlanks.length == 2) {
      cardStatus = setDoubleTeamStatus(true);
  }
  else {
      cardStatus = setDoubleTeamStatus(false);
  }
  console.log(cardStatus);
});


function buildCardText(cardType) {
  var cardDictionary = JSON.parse(dictionaries),
  dictionaryToUse,
  blank = "_____",
  cardText = [];

  switch (cardType) {
  case "white":
    dictionaryToUse = cardDictionary.whiteCardDictionary;
    break;
  case "pinkDouble":
    dictionaryToUse = cardDictionary.whiteDoubleCardDictionary;
    break;
  case "pink":
    dictionaryToUse = cardDictionary.pinkCardDictionary;
    break;
  }
  for (var i = 0; i < dictionaryToUse.length; i++) {
    cardText.push( dictionaryToUse[i].cardText.replace(/{%blank%}/g, blank));
  }
  return cardText;
}

function decideCardType() {
    "use strict";
    var randomNumber,
        card = {};

    randomNumber = Math.floor(Math.random() * 2);

    switch (randomNumber) {
    case 0:
        card.type = "white";
        card.possibilties = buildCardText(card.type);
        break;
    case 1:
        card.type = "pink";
        card.possibilties = buildCardText(card.type);
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

    runTrigger(false); //stop the overall timer, and let the loop run.
    subString = text.substr(0, textLength);
    textLength = textLength + 1;
    card.placeholder = subString;
    if (text === subString) {
      runTrigger(true, 1500);
      return;
    }
    setTimeout(function () {
        typeText(card, text, textLength, subString);
    }, 50);
}

function changeCardText() {
    "use strict";
    var card = decideCardType(),
        cardToChange,
        textLength = 0,
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
    typeText(cardToChange, card.possibilties[randomNumber], textLength, subString);
}

runTrigger(true, 1500); //ensure that the script fires
function runTrigger(flag, time) {
  if (flag) {
    timer = setInterval(changeCardText, time);
  }
  else {
    clearInterval(timer);
  }
}
