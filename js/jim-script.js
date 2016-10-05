/*

Putting these scripts into a 'test' file called Jim's Scripts.
These should work but might not be pretty cause I'm scripting as I build.

TO-DO:
- Trigger action when user enters field
- Count the number of spaces currently in the text field
- Increment/Decrement counter based on current space count
- Activate the correpsonding card indicator when user enters a text field
- Set the z-index of the currently selected card

NOTES FOLLOWING CONVERSATION:

Structure of elements:
***************************************
THE CARDS
- DIV : CARD
- - DIV : CARD-INNER
- - - TEXTAREA : CARD-INPUT

Card Actions:
  - DIV : CARD :
    - Animate
    - Sort/Bring to Front
Card Triggers:
  - DIV : CARD: TEXTAREA
    - On Focus
    - On Leave
***************************************
THE INDICATORS
- SVG : INDICATOR

Indicator Actions:
  - SVG : INDICATOR
    - Animate

Indicator Triggers:
  - SVG : INDICATOR
    - Click
***************************************

*/

// Set doubleTeam to True for testing
var doubleTeam = true;
var currentIndex = 52;
var twentyPercentWidth = 20;
var angleOrientation;
var leftVal;

var $allCards = $('div.card');
var $allCardInputs = $('textarea.card__input');
var $allCardIndicators = $('svg.indicator');

var $white = $('#main-card-white');
var $whiteInput = $('#main-card-white div textarea.card__input');

var $pinkLeft = $('#main-card-pink-left');
var $pinkLeftInput = $('#main-card-pink-left div textarea.card__input');

var $pinkRight = $('#main-card-pink-right');
var $pinkRightInput = $('#main-card-pink-right div textarea.card__input');

var $cardHeight = $white.height();
var fiftyPercentHeight = (window.innerHeight / 2) - ($cardHeight / 1.5);

/* 'Set the stage on page load' */
(function() {
  $pinkLeft.css('z-index', 52);
  dealCards();
})();

/* Deal the cards */
function dealCards() {
  $.each($allCards, function( index, value ) {
    $(this).animate({
      top: fiftyPercentHeight
    }, 500, function() {
      switch(index) {
        case 0:
          leftVal = '20vw';
          break;
        case 1:
          leftVal = '55vw';
          break;
        case 2:
          leftVal = '60vw';
          break;
        default:
          leftVal = '20vw';
      }
      $(this).addClass('dealt');
      $(this).animate({
        left: leftVal
      }, 350);
    });
  });
}

/* Collect the cards, remove from view */
function clearCards() {
  $.each($allCards, function( index, value ) {
    $(this).animate({
      top: '150%'
    }, 500);
  });
}

/* Event Handler - on focus forms : Controlling Function */
$allCardInputs.on('focus', function(event) {
  var inputColor = $(this).attr('card');
  updateIndicators(inputColor);
  if(inputColor != 'white' && isOnTop($(this))) {
    currentIndex++;
    checkIndex(inputColor);
  }
});

/* Event Handler - on click icons : Controlling Function */
$allCardIndicators.on('click', function() {
  var indicatorColor = $(this).attr('card');
  var associatedCard = $('textarea.card__input[card= ' + indicatorColor + ']');

  if(!$(this).hasClass('active')) {
    updateInput(indicatorColor);
    if(indicatorColor != 'white') {
      currentIndex++;
      isOnTop(associatedCard);
    }
  }
});

// Determine if card is lower in z-index value than current global z-index
function isOnTop(focused) {
  var $currentFocus = focused.parents('div.card'),
      lower = false;
  if($currentFocus[0].style.zIndex < currentIndex) {
    lower = true;
  }
  console.log(lower);
  return lower;
}

// Convert pixels to vw for animations
function convertPXtoVW(pxVal) {
  var vwVal = (100 / document.body.clientWidth) * pxVal; //don't cache document.body.clientWidth, we need this get a new value each time.
  return vwVal;
};

// When a user switches their text input field, update 'active' card indicator icon
function updateIndicators(selectedCard) {
  $allCardIndicators.removeClass('active');
  $('svg.indicator[card= ' + selectedCard + ']').addClass('active');
}

// When a user clicks on an indicator card in the UI, update focus
function updateInput(selectedIndicator) {
  var $intendedCard = $('textarea.card__input[card= ' + selectedIndicator + ']');
  updateIndicators(selectedIndicator);
  $intendedCard.focus();
}

// Compare the index values of pink cards when appropriate
function checkIndex(cardColorValue) {
  var leftOrRight = $('textarea.card__input[card= ' + cardColorValue + ']').parents('div.card').attr('id').slice(15);
  if(leftOrRight === 'left') {
    animateCardChange($('#main-card-pink-left'), $('#main-card-pink-right'), leftOrRight);
  } else {
    animateCardChange($('#main-card-pink-right'), $('#main-card-pink-left'), leftOrRight);
  }
}

// Function to animate the card change, updating z-index and position
function animateCardChange(top, bottom, animateDirection) {
  var currentLeft =  convertPXtoVW(parseInt(top.css('left')));
  var currentTop = parseInt(top.css('top'));
  switch(animateDirection) {
    case 'left':
      moveLeft = Math.abs(currentLeft - twentyPercentWidth);
      angleOrientation = '-';
      break;
    case 'right':
      moveLeft = Math.abs(currentLeft + twentyPercentWidth);
      angleOrientation = '+';
      break;
    default:
      moveLeft = Math.abs(currentLeft - twentyPercentWidth);
  }
  top.css({ 'transform': 'rotate(' + angleOrientation + ( (Math.random() * 6) + 1 ).toFixed(2) + 'deg)' });
  top.animate({
    left: moveLeft + 'vw',
    top: currentTop + 50
  }, 350, function() {
    $(this).css('z-index', currentIndex);
    top.animate({
      left: currentLeft + 'vw',
      top: currentTop
    }, 350);
  });
}
