var timer = null,
numberOfVisibleCards = 2;
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

function disableDoubleTeam() {
  $doubleTeamIndicator.removeClass('visible');
  doubleTeam = false;
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

// Set back to two for removal of double team
function removeDoubleTeam() {
  $whiteInput.focus();
  $pinkRightIndicator.addClass('inactive');
  $pinkLeft.animate({
    left: '55vw',
  }, 600);
  $pinkRight.animate({
    left: '100vw'
  }, 500);
  $pinkLeft.css({
    transform: 'rotate(' + ((Math.random() * 6) + 1).toFixed(2) + 'deg)'
  });
  setTimeout(function() {
    $pinkRight.css({
      'display': 'none'
    });
  }, 1000);
  disableDoubleTeam();
}

function performDoubleTeamActions() {
  animateDoubleTeam();
  numberOfVisibleCards = 3;
}

function performSingleTeamActions() {
    removeDoubleTeam();
    numberOfVisibleCards = 2
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

//Add a new blank to the white card
function addBlank() {
    if (countNumberofBlanks() <= 2) {
      $whiteCard.val($whiteCard.val() + blank);
      countNumberofBlanks()
    }
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
  if (numberOfBlanks == 2) {
      setDoubleTeamStatus(true);
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
  case "doubleWhite":
    dictionaryToUse = cardDictionary.whiteDoubleCardDictionary;
    break;
  case "pink":
    dictionaryToUse = cardDictionary.pinkCardDictionary;
    break;
  case "secondPink":
    dictionaryToUse = cardDictionary.pinkCardDictionary;
    break;
  }
  for (var i = 0; i < dictionaryToUse.length; i++) {
    cardText.push( dictionaryToUse[i].cardText.replace(/{%blank%}/g, blank));
  }
  return cardText;
}

function decideCardType(numberOfVisibleCards) {
    "use strict";
    var randomNumber,
        card = {};

    randomNumber = Math.floor(Math.random() * numberOfVisibleCards);

    switch (randomNumber) {
    case 0:
        if (numberOfVisibleCards == 3) {
          card.type = "secondPink";
        }
        else {
          card.type = "white";
        }
        card.possibilties = buildCardText(card.type);
        break;
    case 1:
        card.type = "pink";
        card.possibilties = buildCardText(card.type);
        break;
    case 2:
        card.type = "secondPink";
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
    var card = decideCardType(numberOfVisibleCards),
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
