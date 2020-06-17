/* Ways to improve the game
* Add another enemy
* Add sound when level up *Done*
* Expand the map *Done* 
* Add a landmine and bonus point
* Lightbox when starting the game *Done*
* Some kind of effect when completing all levels (fireworks)
* Increase the speed of the enemy on higher levels
* Add favicon
* Moving bridge
* If hit water, horse drown
*/


// Animate*odd* = Animate horizontally
// Animate*even* = Animate vertically 
const levels = [	
	// level 0 
	["flag", "rock", "", "", "",
	 "fenceside", "rock", "", "", "rider",
	 "", "tree", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fenceup", "", "horseup", ""],
	 
	// level 1
	["flag", "water", "", "", "",
	 "fenceside", "water", "tree", "tree", "rider",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "rock", "", "rock",
	 "", "water", "horseup", "", ""],
	
	// level 2
	["tree", "", "", "tree", "flag",
	 "animate", "animate", "animate", "animate", "animate",
	 "water", "bridge", "water", "water", "water",
	 "", "", "", "fenceside", "",
	 "rider", "rock", "", "", "horseup"],
	 
	// level 3
	["rider", "water", "water", "rock", "", 
	"animate", "", "animate", "", "animate", 
	"tree", "", "tree", "water1", "water1",
	"fenceside", "", "tree", "fenceside", "rock",
	"tree", "horseup", "tree", "flag", ""],
	
	// level 4
	// random bridge
	["flag", "rock", "water", "animate", "horsedown",
	"", "tree", "water", "animate", "",
	"fenceside", "tree", "water", "animate", "tree",
	"", "tree", "water", "animate", "",
	"", "fenceup", "water", "animate", "rider"] 
	
	
	// no comma 
  ]; // end of level
 
const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"]; 

var currentLevel = 0;	// starting level
var riderOn = false; 	// is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation = 0; // allows 1 animation per level
var currentAnimation2 = 0;
var currentAnimation3 = 0;
var widthOfBoard = 5;
var lengthOfBoard = 5;

var bonus = new sound ("music/bounce.mp3"); 
var hitEnemy = new sound ("music/exit.mp3"); 
var levelWin = new sound ("music/levelup.mp3"); 
var loseGame = new sound ("music/lose.mp3"); 

var gameInService = false; 
var message1 = "";
var message2 = "";
var displayTime = ""; 

var locationOfEnemy = 0;
var enemyDirection = "";
var locationOfBridge = 0;
var bridgeDirection = "";
var animateBoxes = "";
var animateBoxes2 = "";

var boxes = 0;
var index = 0;
var index2 = 0;

var executed = false;
var watchOn = false; 

var runBonusPlay = (function() {
    return function() {
        if (!executed) {
            executed = true;
            bonus.play(); 
        } // if
    };
})();
	
// startGame
/* window.addEventListener("load", function() {
	loadLevel();
}); */ 

function x() {
	clearTimeout(currentAnimation);	
	clearTimeout(animateBridge);
} // x 

function startGame() {
	if (!gameInService) {
		watch.start(); 
	changeVisibility("boundaryMessage");
	changeVisibility("lightbox"); 
	loadLevel(currentLevel);
	changeVisibility("gameBoard");
	gameInService = true;
	watch.reset();  
	} // if
} 

function stopGame() {
	if (gameInService) {
		watch.stop();
		message1 = "Game Ended";
		message2 = "Level " + currentLevel + "/5. \nTotal time: " + displayTime;
		showLightBox(message1, message2);
		document.getElementById("startbutton").className = 'hidden';
		gameInService = false; 
	} // if 		
}

function resumeGame() {
	if (!gameInService) {
		animateEnemy(animateBoxes, locationOfEnemy, currentDirection);
		if (currentLevel == 4) {
			animateBridge(animateBoxes2, locationOfBridge, bridgeDirection);
		} // if 
		watch.start(); 
		gameInService = true; 
	} // if
}

function pauseGame() {
	if (gameInService) {
		clearTimeout(currentAnimation);	
		clearTimeout(animateBridge);
		watch.stop();
		gameInService = false;
	} // if
}

// move horse
document.addEventListener("keydown", function(e) {
	switch(e.keyCode) {
		case 37: // left arrow
		if (currentLocationOfHorse % lengthOfBoard !== 0) { 
			tryToMove("left");
		} // if
		break;
		
		case 38: // up arrow
		if (currentLocationOfHorse - widthOfBoard >= 0) { 
			tryToMove("up");
		} // if
		break;
		
		case 39: // right arrow
		if (currentLocationOfHorse % lengthOfBoard < lengthOfBoard - 1) { 
			tryToMove("right");
		} // if
		break;
		
		case 40: // down arrow 
		if (currentLocationOfHorse + lengthOfBoard < lengthOfBoard*lengthOfBoard) { 
			tryToMove("down");
		} // if
		break;
		
	} // switch
}); // key event listener
		
function tryToMove(direction) {
	// location before move
	let oldLocation = currentLocationOfHorse;
	
	// class of location before move
	let oldClassName = gridBoxes[oldLocation].className;
	
	let nextLocation = 0;
	let nextClass = "";  // class of location we wish to move to
	
	let nextLocation2 = 0;
	let nextClass2 = ""; 
	
	let newClass = "";  // new class to switch if move successful

	
	switch (direction) {
		case "left":
			nextLocation = currentLocationOfHorse - 1;			
			break;
		case "right":
			nextLocation = currentLocationOfHorse + 1;
			break;
		case "up":
			nextLocation = currentLocationOfHorse - lengthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse + lengthOfBoard;
			break;
	} // switch
	
	nextClass = gridBoxes[nextLocation].className;
	
	// if obstacle is not passable, don't move
	if (noPassObstacles.includes(nextClass)) {return;}	
	
	// if it's a fence & no rider, don't move
	if (!riderOn && nextClass.includes("fence")) {return;}
	
	// if there is a fence and the rider is on
	if (nextClass.includes("fence")) {
		if (riderOn) {
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
		} // if
		
		// set values according to direction
		if (direction == "left") {
			nextClass = "jumpleft";
			nextClass2 = "horserideleft";
			nextLocation2 = nextLocation - 1;
		} else if (direction == "right") {
			nextClass = "jumpright";
			nextClass2 = "horserideright";
			nextLocation2 = nextLocation + 1;
		} else if (direction == "up") {
			nextClass = "jumpup";
			nextClass2 = "horserideup";
			nextLocation2 = nextLocation - lengthOfBoard;
		} else if (direction == "down") {
			nextClass = "jumpdown";
			nextClass2 = "horseridedown";
			nextLocation2 = nextLocation + lengthOfBoard;
		} // else if 
		
		// show horse jumping
		gridBoxes[nextLocation].className = nextClass;
		setTimeout(function() {
			// set jump back to just a fence
			gridBoxes[nextLocation].className = oldClassName;
			
			// update current location to be 2 spaces past take off
			currentLocationOfHorse = nextLocation2;
			
			// get class of box after jump
			nextClass = gridBoxes[currentLocationOfHorse].className;
			// prevent jumping if there is an obstacle
			
			// show horse and rider after landing
			gridBoxes[currentLocationOfHorse].className = nextClass2;
			
			// if next box is a flag, go up a level
			levelUp(nextClass);
		}, 350); 
		return;
	} // if next class has a fence
	
	
	// if there is a rider, pickup the rider
	if (nextClass == "rider") {
		riderOn = true;
		runBonusPlay();
	} // if
	
	// if there is a bridge in the old location, keep it
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	} // else
	
	// build name of new class
	newClass = (riderOn) ? "horseride" : "horse" ; 
	newClass += direction;
	
	// if there is a bridge in the new class, keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	} 
	
	// moves 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass; 
	
	// if it is an enemy, end the game
	if (nextClass.includes("enemy")) {
		lostGame("You hit the enemy."); 
		return;
	} // if
	
	// if hit flag, move up a level
	levelUp(nextClass);
	
} // tryToMove


// move up a level
function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn && currentLevel < levels.length) {
		if (currentLevel < 4) {
			showLightBox("Level Up!", "Time used: " + displayTime);
			levelWin.play();
			executed = false;
			clearTimeout(currentAnimation);
			setTimeout (function() { 
				changeVisibility("boundaryMessage");
				changeVisibility("lightbox"); 
				currentLevel++;
				loadLevel(currentLevel); 
			}, 1000); 
		} else if (currentLevel == 4) {
			showLightBox("You Won!", "You have finished in " + displayTime + ",\n try again for a faster time");
			levelWin.play();
			currentLevel = 0;
			document.querySelector("x").onclick = loadLevel();
			return; 
		} // else
	} // else
	
	
	
	/* else if (currentLevel = 4) {
		document.getElementById("youwon").style.display = "block";
		setTimeout (function() { 
			document.getElementById("youwon").style.display = "none";
			// fireworks?
		}, 1000);
		return; 
	} // else */ 
	
} // level up

function lostGame(message2) {
	loseGame.play(); 
	message1 = "You Lose";
	message2 += " Level Achieved: " + currentLevel + "/5."
	showLightBox(message1, message2);
	clearTimeout(currentAnimation);
	document.querySelector("x").onclick = location.reload();
	currentLevel = 0;
	watch.stop(); 
	gameInService = false;
} // lostGame 

function loadLevel(currentLevel) {
	let levelMap = levels[currentLevel];
	riderOn = false; 
	executed = false;
	
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		console.log(levelMap[i]); 
		if (gridBoxes[i].className.includes("horse")) {
			currentLocationOfHorse = i;
		} // if
	} // for
	
	if (currentLevel < 4) {
		animateBoxes = document.querySelectorAll(".animate");
		animateEnemy(animateBoxes, 0, "right");
	} else if (currentLevel == 4) { 
		animateBoxes2 = document.querySelectorAll(".water");
		animateBridge(animateBoxes2, 1, "down"); ;
		animateBoxes = document.querySelectorAll(".animate");
		animateEnemy(animateBoxes, 0, "down");
	} // else
	
}


// box - array of grid boxes that include the animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
	let nextClass = "";

	// exit the function if there is no animation
	if (boxes.length <= 0) {return;}
	
	// update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else if (direction == "left") {
		boxes[index].classList.add("enemyleft");
	} else if (direction == "up") {
		boxes[index].classList.add("enemyup");
	} else if (direction == "down") {
		boxes[index].classList.add("enemydown");
	}	// else if
	
	// remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyup");
			boxes[i].classList.remove("enemydown");
		} // if
	} // for
	
	// if the enemy hit the player, end the game
	if (boxes[index].className.includes("horse")) {
		lostGame("The enemy hit you.");  
		return;
	} // if
	
	// moving right
	if (direction == "right") {
		// turn around if hit right side
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		} else {
			index++;
		} // else
	
	// moving left
	} else if (direction == "left") {
		// turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		} // if

	// moving down
	} else if (direction == "down") {
		// turn around if hit top side
		if (index == boxes.length - 1) {
			index--;
			direction = "up";
		} else {
			index++;
		}// else
	
	// moving up
	} else if (direction == "up") {
		// turn around if hit bottom side
		if (index == 0) {
			index++;
			direction = "down";
		} else {
			index--;
		} // if
	}
	
	
	locationOfEnemy = index;
	currentDirection = direction;
	
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750); 
	
	
 // animateEnemy
}

function animateBridge(boxes, index, direction) {
	var bridgeExisted = false;
	// update the location of the bridge
	index = Math.floor(Math.random() * 5); 
	index2 = index; 
	let element = boxes[index];
	if (!bridgeExisted) {
	element.className = (element.className == 'bridge')? 'water' : 'bridge'; 
	bridgeExisted = true;
	} // if 	
	/* element.classList.remove("water"); 
	element.classList.add("bridge"); */
	
	setTimeout(function(){ bridgeExisted = false; }, 750);
	
	bridgeDirection = direction;
	locationOfBridge = index2;
	
	currentAnimation = setTimeout(function() {
		animateBridge(boxes, index, direction);
		bridgeExisted = false;
	}, 1500); 
} // animateBridge

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
} // sound

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


/* stopWatch Code 
Credit to: https://gist.github.com/anonymous/fe5cdd7e9cd14fea796b27d19f8d1cb6
*/
function stopwatch(elem) {
  var time = 0;
  var offset;
  var interval;
	
	function update() {
		time += delta();
		elem.textContent = timeFormatter(time);
	}
	function delta() {
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	}
	
	function timeFormatter(timeInMilliseconds) {
		var time = new Date(timeInMilliseconds);
		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();
	
		if (minutes.length < 2) {
			minutes = "0" + minutes;
		} // if
		
		if (seconds.length < 2) {
			seconds = "0" + seconds;
		} // if
		
		displayTime = minutes + ":" + seconds;
		return displayTime;
	}
	
	
	this.start = function() {
		if (!gameInService) {
			interval = setInterval(update, 10);
			offset = Date.now();
		} // if
	}; 
	this.stop = function() {
		if (gameInService) {
			clearInterval(interval);
			interval = null;
		} // if
	};
	this.reset = function() {
		time = 0;
	};
	
}

var watch = new stopwatch(); 

var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');

var watch = new stopwatch(timer);

function start() {
	watch.start();
}

function stop() {
	watch.stop();
}

 /* End of Stopwatch code */ 