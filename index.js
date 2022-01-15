var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["green", "red", "yellow", "blue"]
/////////// Button Functions /////
var userChosenColour

$(".btn").on("click", function (event){    
    userChosenColour = this.id;  
    userClickedPattern.push(userChosenColour);
})

$(".btn").on("click", function(){
    checkAnswer(userClickedPattern.length - 1);
    var userAudio = new Audio("sounds/" + userChosenColour + ".mp3")
    userAudio.play();
   $("." + userChosenColour).addClass("pressed")
    setTimeout(function() {
        $("." + userChosenColour).removeClass("pressed")
    }, 100);  
})

////////////----------------------/////////////////////////////////

function nextSequence() {  
    userClickedPattern = []; 
    $("#level-title").text("Level " + level++);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var randomAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
    randomAudio.play();  
};

var level = 0;

var started = false;


$(document).on("keypress", function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentLevel) {
     
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success");

    if (gamePattern.length === userClickedPattern.length) {

    setTimeout(function() {
        nextSequence();
    },1000);
    }
}
    else {
        console.log("Wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = []
    started = false;
}