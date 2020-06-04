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
var currentLevel = 0;	// starting level
var riderOn = false; 	// is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation = 0; // allows 1 animation per level

// startGame
window.addEventListener("load", function() {
	loadLevel();
}); 

function loadLevel() {
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false; 
	
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
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
	} // else if up/down

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750); 
 // animateEnemy
}


