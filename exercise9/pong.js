var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var score1 = 1;
var score2 = 1;
var heart1 = 1;
var heart2 = 1; 

var paddleHeight1 = document.getElementById("paddle1").offsetHeight; 
var paddleHeight2 = document.getElementById("paddle2").offsetHeight; 
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop; 

const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const ballHeight = document.getElementById("ball").offsetHeight;
const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

var topPositionOfBall = startTopPositionOfBall;
var	leftPositionOfBall = startLeftPositionOfBall; 
var topSpeedOfBall = 3;
var leftSpeedOfBall = 3;
var speedOfBall = 1000/60; 


var bounce = new sound ("bounce.mp3"); 
var exit = new sound ("exit.mp3"); 

// used to control game start/stop
var controlPlay; 

/*
window.addEventListener('load', function() {
	startBall();
}); */

// move paddles
// move paddles
document.addEventListener('keydown', function(e) {
	// console.log("key down " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	} // if
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	} // iftyggfgd
	
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = -10;
	} // if
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 10;
	} // if 
	
	if (e.keyCode == 120 || e.which == 120 || e.KeyCode == 88 || e.which == 88) {
		if (score1 > 5 && paddleHeight1 == 150) {
			doubleHeight(3000, 1);
			score1 -= 5;
			document.getElementById("score1").innerHTML = score1;
		} else {
			window.alert("You need at least 5 points to use this bonus"); 
		} // if else
	} // if 
	
	if (e.keyCode == 112 || e.which == 112 || e.KeyCode == 80 || e.which == 80) {
		if (score2 > 5 && paddleHeight2 == 150) {
			doubleHeight(3000, 2); 
			score2 -= 5;
			document.getElementById("score2").innerHTML = score2;
		} else {
			window.alert("You need at least 5 points to use this bonus"); 
		} // else
	} // if 
}); // event function 


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

function startBall(topSpeedOfBall) {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	//50% chance of starting in any direction (left or right)
	if (Math.random() < 0.5) {
		direction = 1; 
	} else {
		direction = -1;
	} // else
		
	leftSpeedOfBall = direction * topSpeedOfBall; 
}

// update the location of paddles and the ball
function show() { 
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
			if (heart1 < 3) {
				heart1++;
				hideImage("player1life" + heart1);
				speedOfBall-=5; 
				if (speedOfBall < 5) {
					speedOfBall = 5;
				} 
				topSpeedOfBall--;
				leftSpeedOfBall--; 
				startBall(topSpeedOfBall, leftSpeedOfBall); 
				exit.play(); 
				/* speedOfBall = speedOfBall - 5;
				if (speedOfBall < 10) {
					speedOfBall = 10;
				} // if */ 
			} else {
				hideImage("player1life3");
				stopGame(); 
			} // else
		} // else
	} // if

	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		if (topPositionOfBall > positionOfPaddle2 && 
			topPositionOfBall < positionOfPaddle2 + paddleHeight1) {
			leftSpeedOfBall *= -1; 
			document.getElementById("score2").innerHTML = score2++;
			bounce.play(); 
		} else {
			if (heart2 < 3) {
				heart2++; 
				hideImage("player2life" + heart2); 
				speedOfBall-=5; 
				if (speedOfBall < 5) {
					speedOfBall = 5;
				} 
				topSpeedOfBall++;
				leftSpeedOfBall++; 
				startBall(topSpeedOfBall, leftSpeedOfBall); 
				exit.play(); 
				/* speedOfBall = speedOfBall - 5;
				if (speedOfBall < 10) {
					speedOfBall = 10;
				} // if */ 
			} else { 
				stopGame(); 
				hideImage("player2life3");
			} // else 
		} // else
	}	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 
	document.getElementById("ball").style.top = topPositionOfBall + "px"; 
	document.getElementById("ball").style.left = leftPositionOfBall + "px"; 
	
} // show

/* function changePaddleHeight(paddle) {
	if (paddle == 1) {
		paddleHeight1 = 150;
		document.getElementById("paddle1").style.height = "150px"; 
	} else if (paddle == 2) {
		paddleHeight2 = 150;
		document.getElementById("paddle2").style.height = "150px"; 
	} // else if 
} // changePaddleHeight */ 

function doubleHeight (timeTillReset, paddle) {
	if (paddle == 1) { 
		paddleHeight1 *= 2;
		document.getElementById("paddle1").style.height = paddleHeight1 + "px";
		setTimeout (function() {
			paddleHeight1 /= 2;
			document.getElementById("paddle1").style.height = paddleHeight1 + "px";
		}, timeTillReset);
	} else if (paddle == 2) {
		paddleHeight2 *= 2;
		document.getElementById("paddle2").style.height = paddleHeight1 + "px";
		setTimeout (function() {
			paddleHeight2 /= 2;
			document.getElementById("paddle2").style.height = paddleHeight1 + "px";
		}, timeTillReset); 
	} // else
} // doubleHeight 

// resume game play
function resumeGame () {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, speedOfBall);
	} // if
} // resumeGame

function pauseGame () {
	window.clearInterval(controlPlay);
	controlPlay = false; 
} // pauseGame 

function startGame() {
	// reset score, ball and paddle location;
	showImage("player1life1");
	showImage("player1life2");
	showImage("player1life3");
	showImage("player2life1");
	showImage("player2life2");
	showImage("player2life3");

	score1 = 1;
	score2 = 1;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall(3, 3);  
	if (!controlPlay) {
		controlPlay = window.setInterval(show, speedOfBall);
	}
} // startGame

// stop game play
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false; 
	
	// show lightbox with point
	let message1 = "Tie Game";
	let message2 = "Close to continue"; 
	
	if (score2 > score1) {
		message1 = "Player 2 wins with " + (score2-1) + " points";
		message2 = "Player 1 had " + (score1-1) + " points"; 
	} else if (score1 > score2) {
		message1 = "Player 1 wins with " + (score1-1) + " points";
		message2 = "Player 2 had " + (score2-1) + " points"; 
	} // else if
	
	showLightBox(message1, message2); 
} // pause game

function hideImage(divID) {
	var element = document.getElementById(divID);
	//if element exists, toggle it's class
	//between hidden and unhidden 
	if (element.className != 'imgHidden') {
		element.className = 'imgHidden';
	} // if
} // hideImage

function showImage(divID) {
	var element = document.getElementById(divID);
	if (element.className != 'imgUnhidden') {
		element.className = 'imgUnhidden';
	} // if
}

/**** Lightbox Code ****/
function changeVisibility(divID) {
	var element = document.getElementById(divID);
	//if element exists, toggle it's class
	//between hidden and unhidden 
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden'; 
	} // if
} // changeVisibility

function showLightBox(message, message2) {
	//set message
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // showLightBox

// closeLightBox

function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // continueGame 