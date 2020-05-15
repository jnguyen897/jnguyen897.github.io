var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop; 
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop; 

document.addEventListener('keydown', function(e) {
	// console.log("key down " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	} // if
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	} // if
	show(); 
}); 

document.addEventListener('keyup', function(e) {
	// console.log("key up " + e.keyCode); 
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	} // if
	show(); 
	
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	} // if
	show(); 
});

document.addEventListener('keydown', function(e) {
	// console.log("key down " + e.keyCode); 
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = -10;
	} // if
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 10;
	} // if
	show(); 
}); 

document.addEventListener('keyup', function(e) {
	// console.log("key up " + e.keyCode); 
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	} // if
	show(); 
	
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	} // if
	show(); 
});

// update the location of paddles and the ball
function show() {
	let paddleHeight1 = document.getElementById("paddle1").offsetHeight; 
	let paddleHeight2 = document.getElementById("paddle2").offsetHeight; 
	let gameBoardHeight = document.getElementById("gameBoard").offsetHeight; 
	
	positionOfPaddle1 += speedOfPaddle1; 
	positionOfPaddle2 += speedOfPaddle2; 
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px"; 
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px"; 
	
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	} 
	
	if (positionOfPaddle1 >= gameBoardHeight - paddleHeight1) {
		positionOfPaddle1 = gameBoardHeight - paddleHeight1;
	} 
	
	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	} 
	
	if (positionOfPaddle2 >= gameBoardHeight - paddleHeight2) {
		positionOfPaddle2 = gameBoardHeight - paddleHeight2;
	} 
} // show