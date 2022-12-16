var arrColor=["green","red","blue","yellow"];

var gamePattern=[];

userClickPattern=[];

var started=false;

var level=0;

$(document).tap(function() {
  if(!started){
    $("#level-title").text("Level " + level);
  nextSequence();
  started=true;
}
})

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
  nextSequence();
  started=true;
}
})


$(".btn").on("click", function(){
var userChosenColor=$(this).attr("id");
userClickPattern.push(userChosenColor);
playSound(userChosenColor);

animatePress(userChosenColor);

checkAnswer(userClickPattern.length-1);
})


function nextSequence(){
  userClickPattern.length=0;

  level++;

  $("#level-title").text("level "+ level);
  var randomNumber=Math.random();
  randomNumber*=4;
  randomNumber = Math.ceil(randomNumber)-1;
  var randomChoseColor = arrColor[randomNumber];
  gamePattern.push(randomChoseColor);
  var currentButton="#"+randomChoseColor;
  $(currentButton).fadeOut(100).fadeIn(100);

  playSound(randomChoseColor);
}


function  playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress (currentColor){
  var current="."+currentColor;
  var delayInMl=100;
  $(current).addClass("pressed");
  setTimeout( function(){
      $(current).removeClass("pressed");
  }, 100);

}


function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {


    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {


    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}
