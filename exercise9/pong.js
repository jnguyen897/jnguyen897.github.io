var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var score1 = 1;
var score2 = 1;

var paddleHeight1 = document.getElementById("paddle1").offsetHeight; 
var paddleHeight2 = document.getElementById("paddle2").offsetHeight; 
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop; 

const ballHeight = document.getElementById("ball").offsetHeight;
const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

var topPositionOfBall = startTopPositionOfBall;
var	leftPositionOfBall = startLeftPositionOfBall; 
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var bounce = new sound ("bounce.mp3"); 
var exit = new sound ("exit.mp3"); 

window.addEventListener('load', function() {
	startBall();
});

document.addEventListener('keydown', function(e) {
	// console.log("key down " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	} // if
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	} // if
	
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = -10;
	} // if
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 10;
	} // if 
}); 

document.addEventListener('keyup', function(e) {
	// console.log("key up " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	} // if
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	} // if
	
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	} // if
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	} // if
});

// object constructor to play sound
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	//50% chance of starting in any direction (left or right)
	if (Math.random() < 0.5) {
		direction = 1; 
	} else {
		direction = -1;
	} // else
		
	topSpeedOfBall = (Math.random() * 2 + 3);
	leftSpeedOfBall = direction * (Math.random() * 2 + 3); 
}

// update the location of paddles and the ball
window.setInterval (function show() {
	positionOfPaddle1 += speedOfPaddle1; 
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall; 
	
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	} // if
	
	if (positionOfPaddle1 >= gameBoardHeight - paddleHeight1) {
		positionOfPaddle1 = gameBoardHeight - paddleHeight1;
	} 
	
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	} 
	
	if (positionOfPaddle2 >= gameBoardHeight - paddleHeight2) {
		positionOfPaddle2 = gameBoardHeight - paddleHeight2;
	} 
	
	// if ball hit bottom of gameBoard, change direction
	if (topPositionOfBall <= 0 || topPositionOfBall >=  gameBoardHeight - ballHeight) {
		topSpeedOfBall *= -1;
	} // if
	
	//ball on the left of gameBoard
	if (leftPositionOfBall <= paddleWidth) {
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight1) {
			leftSpeedOfBall *= -1; 
			document.getElementById("score1").innerHTML = score1++;
			bounce.play(); 
		} else {
			startBall(); 
			exit.play(); 
		} // else
	} // if

	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		if (topPositionOfBall > positionOfPaddle2 && 
			topPositionOfBall < positionOfPaddle2 + paddleHeight1) {
			leftSpeedOfBall *= -1; 
			document.getElementById("score2").innerHTML = score2++;
			bounce.play(); 
		} else {
			startBall(); 
			exit.play(); 
		} // else
	}	
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 
	document.getElementById("ball").style.top = topPositionOfBall + "px"; 
	document.getElementById("ball").style.left = leftPositionOfBall + "px"; 
}, (1000/60)) // show
