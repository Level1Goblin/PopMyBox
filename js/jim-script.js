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

// I set ALL the variables to start!!
var $allCardInputs,
    $allCards,
    $whiteCard,
    $pinkCardLeft,
    $pinkCardRight,
    $allCardIndicators,
    $whiteCardIndicator,
    $pinkCardIndicatorLeft,
    $pinkCardIndicatorRight;

// Set doubleTeam to True for testing
var doubleTeam = true;
var index = 351;

var $allCardInputs = $('textarea.card__input');
var $allCardIndicators = $('svg.indicator');

var $white = $('#main-card-white');
var $whiteInput = $('#main-card-white div textarea.card__input');

var $pinkLeft = $('#main-card-pink-left');
var $pinkLeftInput = $('#main-card-pink-left div textarea.card__input');

var $pinkRight = $('#main-card-pink-right');
var $pinkRightInput = $('#main-card-pink-right div textarea.card__input');

function convertPXtoVW(pxVal) {
  var vwVal = (100 / document.body.clientWidth) * pxVal; //don't cache document.body.clientWidth, we need this get a new value each time.
  return vwVal;
};

$allCardInputs.on('focus', function() {
  var clicked = $(this);
  var inputColor = $(this).attr('card');

  updateIndicators(inputColor);
  checkIndex(inputColor);
  console.log(isOnTop($(this)));
});

// A function to focus on intended card when clicking on the indicator icons
$allCardIndicators.on('click', function() {
  // Make sure clicked indicator doesn't match currently focused
  if(!$(this).hasClass('active')) {
    // Set focus on corresponding click through updateInput function
    var indicatorColor = $(this).attr('card');
    updateIndicators(indicatorColor);
    checkIndex(indicatorColor);
  }
});

// Function to determine if card is lower in z-index value
isOnTop = (clicked) => {
  var $currentThis = clicked.parents('div.card'),
      $currentThat,
      lower = false;
  clicked.attr('card') === $pinkLeftInput.attr('card') ? $currentThat = $pinkRight : $currentThat = $pinkLeft;
  if($currentThis[0].style.zIndex < $currentThat[0].style.zIndex) {
    // Return true if index is lower
    lower = true;
  }
  return lower;
}

// Function when a user clicks on an indicator card in the UI
updateInput = (selectedIndicator) => {
  var $intendedCard = $('textarea.card__input[card= ' + selectedIndicator + ']');
  updateIndicators(selectedIndicator);
  $intendedCard.focus();
}

// Function when a user switches their text input field
updateIndicators = (selectedCard) => {
  $allCardIndicators.removeClass('active');
  $('svg.indicator[card= ' + selectedCard + ']').addClass('active');
}

// Function to compare the index values of pink cards when appropriate
checkIndex = (cardColorValue) => {
  // Set z-index of focused card if:
  // Currently set as 'Double Team'
  // Selected card is pink
  // z-index of selected card is lower than the other pink card
  if(doubleTeam && cardColorValue != 'white') {
    var leftOrRight = $('textarea.card__input[card= ' + cardColorValue + ']').parents('div.card').attr('id').slice(15);
    if(leftOrRight === 'left') {
      updateIndex($('#main-card-pink-left'), $('#main-card-pink-right'), leftOrRight);
    } else {
      updateIndex($('#main-card-pink-right'), $('#main-card-pink-left'), leftOrRight);
    }
  }
}

// Function to set the proper z-index if 'lower' card is selected
updateIndex = (top, bottom, animateDirection) => {
  var twentyPercentWidth = 10;
  var currentLeft =  convertPXtoVW(parseInt(top.css('left')));
  var currentTop = parseInt(top.css('top'));
  var angle;
  switch(animateDirection) {
    case 'left':
      moveLeft = Math.abs(currentLeft - twentyPercentWidth);
      angle = '-';
      break;
    case 'right':
      moveLeft = Math.abs(currentLeft + twentyPercentWidth);
      angle = '+';
      break;
    default:
      moveLeft = Math.abs(currentLeft - twentyPercentWidth);
  }
  top.css({ 'transform': 'rotate(' + angle + ( (Math.random() * 6) + 1 ).toFixed(2) + 'deg)' });
  top.animate({
    left: moveLeft + 'vw',
    top: currentTop + 50
  }, 350, function() {
    $(this).css('z-index', index++);
    top.animate({
      left: currentLeft + 'vw',
      top: currentTop
    }, 350);
  });
}
