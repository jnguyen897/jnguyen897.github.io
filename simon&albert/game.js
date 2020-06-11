const levels = [	
	// level 0 
	["flag", "rock", "", "", "",
	 "fenceside", "rock", "", "", "rider",
	 "", "tree", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fenceup", "", "horseup", ""],
	 
	// level 1
	["flag", "water", "", "", "",
	 "fenceside", "water", "", "", "rider",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "water", "horseup", "", ""],
	
	// level 2
	["tree", "tree", "flag", "tree", "tree",
	 "animate", "animate", "animate", "animate", "animate",
	 "water", "bridge", "water", "water", "water",
	 "", "", "", "fence", "",
	 "rider", "rock", "", "", "horseup"]
	 
	// level 3
	
	
	// level 4
	
	
	// level 5
	
	
	
	// no comma 
  ]; // end of level
 
const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"]; 

var currentLevel = 0;	// starting level
var riderOn = false; 	// is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation = 0; // allows 1 animation per level
var widthOfBoard = 5;


window.addEventListener("load", function() {
	loadLevel();
}); 

// move horse
document.addEventListener("keydown", function(e) {
	switch(e.keyCode) {
		case 37: // left arrow
		if (currentLocationOfHorse % widthOfBoard !== 0) { 
			tryToMove("left");
		} // if
		break;
		
		case 38: // up arrow
		if (currentLocationOfHorse - widthOfBoard >= 0) { 
			tryToMove("up");
		} // if
		break;
		
		case 39: // right arrow
		if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) { 
			tryToMove("right");
		} // if
		break;
		
		case 40: // down arrow 
		if (currentLocationOfHorse + widthOfBoard < widthOfBoard*widthOfBoard) { 
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
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;
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
			nextLocation2 = nextLocation - widthOfBoard;
		} else if (direction == "down") {
			nextClass = "jumpdown";
			nextClass2 = "horseridedown";
			nextLocation2 = nextLocation + widthOfBoard;
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
		document.getElementById("lose").style.display = "block"; 

		return;
	}
	
	// if hit flag, move up a level
	levelUp(nextClass);
 
	
} // tryToMove


// move up a level
function levelUp(nextClass) {
	if (nextClass == "flag" && riderOn) {
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout (function() { 
			document.getElementById("levelup").style.display = "none";
			currentLevel++;
			loadLevel(); 
		}, 1000);
	}
	
} // level up

function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false; 
	
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		console.log(levelMap[i]); 
		if (levelMap[i].includes("horse")) {
			currentLocationOfHorse = i;
		}
	}
	
	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0, "right"); 
}


// box - array of grid boxes that include the animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
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
	
	if (direction == "right") {
		if (index == boxes.length-1) {
			index--;
			direction = "left";
		} else {
			index++;
		} // else
			
		// if moving left
	} else if (direction == "left") {
		if (index == 0) {
			index++;
			direction = "right";
		} else { 
			index--;
		} // else 
			
		// if moving up
	} else if (direction == "up") {
		if (index + widthOfBoard < widthOfBoard*widthOfBoard) {
			index -= widthOfBoard;
			direction = "down";
		} else {
			index += widthOfBoard;
		} // else 
			
		// if moving down
	} else if (direction == "down") {
		if (index - widthOfBoard >= 0) {
			index += widthOfBoard;
			direction = "up";
		} else {
			index -= widthOfBoard;
		} // else
	} // else if 
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750); 
 // animateEnemy
}



