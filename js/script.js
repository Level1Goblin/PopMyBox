var timer = null,
blank = " _____ ",
$addBlankButton = $('#add-blank-button'),
$blankCounter = $('#blank-counter'),

$whiteCard = $('#card__input--white'),

$pinkLeft = $('#main-card-pink-left'),
$pinkLeftInput = $('#card__input--pink'),
$pinkLeftIndicator = $('#pink-card-indicator-1'),

$pinkRight = $('#main-card-pink-right'),
$pinkRightInput = $('#card__input--secondPink'),
$pinkRightIndicator = $('#pink-card-indicator-2');

function enableDoubleTeam() {
  $doubleTeamIndicator.addClass('visible');
  doubleTeam = true;
}

// Bring in three for double team
function animateDoubleTeam() {
  currentIndex++;
  $pinkRightIndicator.removeClass('inactive');
  $pinkRight.css('z-index', currentIndex);
  $pinkRight.css({
    display: 'block',
    transform: 'rotate(' + ((Math.random() * 6) + 1).toFixed(2) + 'deg)'
  });
  $pinkRightInput.focus();
  setTimeout(function() {
    $pinkLeft.animate({
      left: '51vw',
    }, 600);
    $pinkRight.animate({
      left: '60vw'
    }, 500);
    $pinkLeft.css({
      transform: 'rotate(' + -(((Math.random() * 6) + 1).toFixed(2)) + 'deg)'
    });
  }, 250);
  enableDoubleTeam();
}

function performDoubleTeamActions() {
  animateDoubleTeam();
}

function performSingleTeamActions() {
  //code
}

function setDoubleTeamStatus(status) {
  var doubleTeamStatus = status;
  if (doubleTeamStatus) {
    performDoubleTeamActions();
  }
  else {
    performSingleTeamActions();
  }
}

function updateBlankIndicator(numberOfBlanks) {
  $blankCounter.text(numberOfBlanks);
}

function addBlank() {
    $whiteCard.val($whiteCard.val() + blank);
    countNumberofBlanks();
}

function countNumberofBlanks() {
  var numberOfBlanks = $whiteCard.val().match(/____/g) == null ? 0 : $whiteCard.val().match(/____/g);
  if (numberOfBlanks == 0) {
    updateBlankIndicator(numberOfBlanks);
    return numberOfBlanks;
  }
  else {
    updateBlankIndicator(numberOfBlanks.length);
    return numberOfBlanks.length;
  }
}

function checkSingleorDoubleTeamStatus() {
  var numberOfBlanks = countNumberofBlanks();
  console.log(numberOfBlanks);
  if (numberOfBlanks == 2) {
      setDoubleTeamStatus(true);
      console.log('hit1');
  }
  else {
      setDoubleTeamStatus(false);
  }
}


function buildCardText(cardType) {
  var cardDictionary = JSON.parse(dictionaries),
  dictionaryToUse,
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
