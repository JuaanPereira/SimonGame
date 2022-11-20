/* Sounds (The horrible way.) (Could be done on a variable that gets formed by getting the name of the clicked color but too lazy) */
var yellow_mp3 = new Audio("./sounds/yellow.mp3");
var blue_mp3 = new Audio("./sounds/blue.mp3");
var red_mp3 = new Audio("./sounds/red.mp3");
var green_mp3 = new Audio("./sounds/green.mp3");
var wrong_mp3 = new Audio("./sounds/wrong.mp3");
var color, randomInteger;
var started = false;
var level = 0;

/* Sequences */
const combinations = ["yellow", "blue", "red", "green"];
var usr_sequence = [];
var sys_sequence = [];

/* Events */
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var color_clicked = $(this).attr("id");
  usr_sequence.push(color_clicked);
  playSound(color_clicked);
  animatePress(color_clicked);
  checkAnswer(usr_sequence.length-1);
});

/* Functions */
function playSound(color){
  switch(color){
    case "yellow":
      yellow_mp3.play();
    break;
    case "blue":
      blue_mp3.play();
    break;
    case "red":
      red_mp3.play();
    break;
    case "green":
      green_mp3.play();
    break;
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  usr_sequence = [];
  level++;
  $("#level-title").text("Level " + level);

  /* Thank you Angela for this way of making the random int :D */
  var randomInteger = Math.floor(Math.random() * 4);

  var randomChosenColour = combinations[randomInteger];
  sys_sequence.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (sys_sequence[currentLevel] === usr_sequence[currentLevel]) {
      console.log("Correct!");
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (usr_sequence.length === sys_sequence.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        console.log("Fail.");
      }
}

/* ######### FOUND A BETTER WAY TO DO THIS #########
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomSelection(){
  randomInteger = randomIntFromInterval(0,3);
  return randomInteger;
}
###################################################### */
