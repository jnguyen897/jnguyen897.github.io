let currentPlayer = "X"; 
let gameStatus = ""; 
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]; 

	
// reset board and all variables
function newGame() {
	// resetBoard
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	} // for
	
	numTurns = 0; 
	gameStatus = ""; 
	currentPlayer = "X";

	changeVisibility("controls");
} // newGame

// take player turn
function playerTakeTurn(e) {
	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer; 
		checkGameStatus();
		
		// if game is not over, the computer goes
		if (gameStatus == "") {
			setTimeout(function() {
				computerTakeTurn();
				checkGameStatus();
			}, 500
			); 
		} // if 
	} else {
		showLightBox("This box has already been selected,", " please try another one.");
		console.log("The box has already been clicked, please try another one.");
		// return; 
	} // else
		
} // playerTakeTurn

// after each turn, check for a win, a tie or continue playing
function checkGameStatus () {
	numTurns++; // count turn
	
	if (numTurns == 9) {
		gameStatus = "Tie Game";
		console.log("Game Status: " + gameStatus); 
		setTimeout (function () {
			showLightBox(gameStatus, "Game over!"); 
		}, 100
		); 
		console.log("The game is over, " + currentPlayer + " wins");
		// return; 
	} // if
	
	// check win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
		console.log("Game Status: " + gameStatus); 
		setTimeout (function () {
			showLightBox(gameStatus, "Game over!"); 
		}, 100
		); 
		console.log("The game is over, " + currentPlayer + " wins");
		// return;
	}

	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X"); 
	
	/* // game is over
	if (gameStatus != "") {
		showLightBox(gameStatus, "Game over!"); 
		console.log("The game is over, " + currentPlayer + " wins"); 
	} // if */
	
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
	if (gameStatus != "") {
		changeVisibility("controls"); 
	}
}  // continueGame

// randomly choose a free box for computer
function computerTakeTurn() {
	let idName = "";
	let rand = 0; 

	let cb = []; // current board
	cb[0] = ""; 
	cb[1] = document.getElementById("one").innerHTML; 
	cb[2] = document.getElementById("two").innerHTML; 
	cb[3] = document.getElementById("three").innerHTML; 
	cb[4] = document.getElementById("four").innerHTML; 
	cb[5] = document.getElementById("five").innerHTML; 
	cb[6] = document.getElementById("six").innerHTML; 
	cb[7] = document.getElementById("seven").innerHTML; 
	cb[8] = document.getElementById("eight").innerHTML; 
	cb[9] = document.getElementById("nine").innerHTML;
	
	// choose random box until an empty box is found
	do {
		
		if (cb[1] != "" && cb[2] != "" && cb[3] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
		} // if 
		
		if (cb[4] != "" && cb[5] != "" && cb[6] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
		} // if 
		
		if (cb[7] != "" && cb[8] != "" && cb[9] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
				document.getElementById(idName).innerHTML = currentPlayer;
			} while (document.getElementById(idName).innerHTML != "")
				break; 
		} // if 
		
		if (cb[1] != "" && cb[4] != "" && cb[7] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
		} // if 
		
		if (cb[2] != "" && cb[5] != "" && cb[8] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
		} // if 
		
		if (cb[3] != "" && cb[6] != "" && cb[9] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break; 
		} // if 
		
		
		if (cb[1] != "" && cb[5] != "" && cb[9] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break; 
		} // if 
		
		if (cb[3] != "" && cb[5] != "" && cb[7] != "") {
			do {
				rand = parseInt(Math.random()*9) + 1;
				idName = idNames[rand - 1]; 
			} while (document.getElementById(idName).innerHTML != "")
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
		} // if 
		
			if (cb[5] == "") {
				if (cb[1] != "" || cb[3] != "" || cb[7] != "" || cb[9] != "" ) { //target the center if the player choose the corner
					document.getElementById("five").innerHTML = currentPlayer; 
					break; 
				} else if (cb[2] != "" || cb[4] != "" || cb[6] != "" || cb[8] != "") {
					document.getElementById("five").innerHTML = currentPlayer; 
					break;
				}

				if (cb[4] != "" && cb[6] == cb[4]) {
					document.getElementById("five").innerHTML = currentPlayer;
					break; 
				} 

				if (cb[5] == "" && cb[2] != "" && cb[8] == cb[2]) {
					document.getElementById("five").innerHTML = currentPlayer;
					break; 
				}

				if (cb[5] == "" && cb[1] != "" && cb[9] == cb[1]) {
					document.getElementById("five").innerHTML = currentPlayer;
					break; 
				} 

				if (cb[5] == "" && cb[3] != "" && cb[7] == cb[3]) {
					document.getElementById("five").innerHTML = currentPlayer;
					break; 
				} 
			} 
			
			if (cb[5] != "") {			// 5
				if (cb[7] == "") { //target the center if the player choose the corner
					document.getElementById("seven").innerHTML = currentPlayer;
					break; 
				}

				if (cb[9] == "") {
					document.getElementById("nine").innerHTML = currentPlayer;
					break; 
				} 
				
				if (cb[3] == "") {
					document.getElementById("three").innerHTML = currentPlayer;
					break; 
				} 
					
				if (cb[1] == "" ) {
					document.getElementById("one").innerHTML = currentPlayer;
					break; 
				}
				 // else
			} // if

			

			if (cb[1] == "" ) { // 1, 3, 7, 9
				if (cb[4] != "" && cb[7] == cb[4]) {  	 // first row
					document.getElementById("one").innerHTML = currentPlayer;
					break;
				}
				
					if (cb[2] != "" && cb[3] == cb[2]) {  // first column
						document.getElementById("one").innerHTML = currentPlayer; 
						break; 
				} 
					
					if (cb[5] != "" && cb[9] == cb[5]) {  // cross
						document.getElementById("one").innerHTML = currentPlayer;
						break; 
				} 
			} // if
			
			if (cb[3] == "") {
				if (cb[1] != "" && cb[2] == cb[1]) {  // first row
					document.getElementById("three").innerHTML = currentPlayer;
					break; 					
				} 
				
				if (cb[6] != "" && cb[9] == cb[6]) {  // third column
					document.getElementById("three").innerHTML = currentPlayer;
					break; 
				}
				
				if (cb[5] != "" && cb[7] == cb[5]) {	 // cross
					document.getElementById("three").innerHTML = currentPlayer;
					break; 
				} else {
					continue; 				
				}
			}  // if
				
				
			if (cb[7] == "") {
				if (cb[1] != "" && cb[4] == cb[1]) {	 // first column
					document.getElementById("seven").innerHTML = currentPlayer; 
					break; 
				} 
				
				if (cb[8] != "" && cb[9] == cb[8]) {	 // third row
					document.getElementById("seven").innerHTML = currentPlayer;
					break; 
				} 
				
				if (cb[5] != "" && cb[3] == cb[5]) {	 // cross
					document.getElementById("seven").innerHTML = currentPlayer; 
					break; 
				} 
			} 
					
			if (cb[9] == "") {		
				if (cb[3] != "" && cb[6] == cb[3]) {  // third column
					document.getElementById("nine").innerHTML = currentPlayer;
					break; 
				} 
				
				if (cb[7] != "" && cb[7] == cb[8]) {  // third row
					document.getElementById("nine").innerHTML = currentPlayer; 
					break; 
				} 
				
				if (cb[5] != "" && cb[1] == cb[5]) {  // cross
					document.getElementById("nine").innerHTML = currentPlayer; 
					break; 				
				} else {
					continue; 				
				}
			} // if 
			
			if (cb[2] == "") {  // 2
				if (cb[1] != "" && cb[3] == cb[1]) {  	 // second row
					document.getElementById("two").innerHTML = currentPlayer;
					break; 
				} else if (cb[5] != "" && cb[8] == cb[5]) {  	 // second row
					document.getElementById("two").innerHTML = currentPlayer; 
					break;
				}
			} // if
			
			if (cb[4] == "") {  // 4
				if (cb[1] != "" && cb[7] == cb[1]) {  	 // second column
					document.getElementById("four").innerHTML = currentPlayer;
					break;
				} else if (cb[5] != "" && cb[6] == cb[5]) {  	 // second row
					document.getElementById("four").innerHTML = currentPlayer;
					break;
				} 
			} // if
		
			if (cb[6] == "") {  // 6
				if (cb[1] != "" && cb[3] == cb[1]) {  	 // second row
					document.getElementById("six").innerHTML = currentPlayer;
					break;
				} else if (cb[5] != "" && cb[8] == cb[5]) {  	 // second row
					document.getElementById("six").innerHTML = currentPlayer;
					break;
				} 
			} // if
		
			if (cb[8] == "") {  // 8
				if (cb[7] != "" && cb[9] == cb[7]) {  	 // third row
					document.getElementById("eight").innerHTML = currentPlayer; 
					break;
				} else if (cb[2] != "" && cb[5] == cb[2]) {  	 // third row
					document.getElementById("eight").innerHTML = currentPlayer;
					break;
			} // if */
		
			}
		
		
	} while(true); 
	
} // computerTakeTurn

/*
 * private function: make the ai player take a master move,
 * that is: choose the optimal minimax decision
 * @param turn [String]: the player to play, either X or O

function takeAMasterMove(turn) {
	let cb = []; // current board
	cb[0] = ""; 
	cb[1] = document.getElementById("one").innerHTML; 
	cb[2] = document.getElementById("two").innerHTML; 
	cb[3] = document.getElementById("three").innerHTML; 
	cb[4] = document.getElementById("four").innerHTML; 
	cb[5] = document.getElementById("five").innerHTML; 
	cb[6] = document.getElementById("six").innerHTML; 
	cb[7] = document.getElementById("seven").innerHTML; 
	cb[8] = document.getElementById("eight").innerHTML; 
	cb[9] = document.getElementById("nine").innerHTML;
    
	for (int i = 0, i < 10, i++) {
		if (cb[i] == "") {
			var available = cb[i]
	var available = game.currentState.emptyCells();

    //enumerate and calculate the score for each avaialable actions to the ai player
    var availableActions = available.map(function(pos) {
        var action =  new AIAction(pos); //create the action object

        //get next state by applying the action
        var next = action.applyTo(game.currentState);

        //calculate and set the action's minmax value
        action.minimaxVal = minimaxValue(next);

        return action;
    });

    //sort the enumerated actions list by score
    if(turn === "X")
        //X maximizes --> descend sort the actions to have the largest minimax at first
        availableActions.sort(AIAction.DESCENDING);
    else
        //O minimizes --> acend sort the actions to have the smallest minimax at first
        availableActions.sort(AIAction.ASCENDING);


    //take the first action as it's the optimal
    var chosenAction = availableActions[0];
    var next = chosenAction.applyTo(game.currentState);

    // this just adds an X or an O at the chosen position on the board in the UI
    ui.insertAt(chosenAction.movePosition, turn);

    // take the game to the next state
    game.advanceTo(next);
} */