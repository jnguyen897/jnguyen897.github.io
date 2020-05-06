let currentPlayer = "X"; 
let gameStatus = ""; 
let numTurns = 0;


// take player turn
function playerTakeTurn(e) {
	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer; 
		checkGameStatus();
	} else {
		showLightBox("This box has already been selected,", " please try another one.");
		console.log("The box has already been clicked, please try another one.");
		return; 
	} // else
		
	// game is over
	if (gameStatus != "") {
		showLightBox(gameStatus, "Game over!"); 
		console.log("The game is over, " + currentPlayer + " wins"); 
	}
} // playerTakeTurn

// after each turn, check for a win, a tie or continue playing
function checkGameStatus () {
	numTurns++; // count turn
	
	// check win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
		console.log("Game Status: " + gameStatus); 
		return;
	}
	
	if (numTurns == 9) {
		gameStatus = "Tie Game!";
		return; 
	} // if
	
	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X"); 
	
} // checkGameStatus

// check for a win
function checkWin() {
	let cb = []; // current board
	cb [0] = ""; 
	cb [1] = document.getElementById("one").innerHTML; 
	cb [2] = document.getElementById("two").innerHTML; 
	cb [3] = document.getElementById("three").innerHTML; 
	cb [4] = document.getElementById("four").innerHTML; 
	cb [5] = document.getElementById("five").innerHTML; 
	cb [6] = document.getElementById("six").innerHTML; 
	cb [7] = document.getElementById("seven").innerHTML; 
	cb [8] = document.getElementById("eight").innerHTML; 
	cb [9] = document.getElementById("nine").innerHTML; 
	
	
	if (cb[1] != "" && cb[2] == cb[1] && cb[3] == cb[2]) {
		return true;
	}
	if (cb[1] != "" && cb[4] == cb[1] && cb[7] == cb[4]) {
		return true;
	}
	if (cb[1] != "" && cb[5] == cb[1] && cb[9] == cb[5]) {
		return true;
	}
	if (cb[2] != "" && cb[2] == cb[5] && cb[8] == cb[5]) {
		return true;
	}
	if (cb[3] != "" && cb[6] == cb[3] && cb[9] == cb[6]) {
		return true;
	}
	if (cb[3] != "" && cb[5] == cb[3] && cb[7] == cb[5]) {
		return true;
	}
	if (cb[4] != "" && cb[5] == cb[4] && cb[6] == cb[5]) {
		return true;
	}
	if (cb[7] != "" && cb[8] == cb[7] && cb[9] == cb[8]) {
		return true;
	}

} // checkWin

// change the visibility of divID
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
	
	// if the game is over, show controls
	
} 