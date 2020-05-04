// change the visibility of divID
function changeVisibility(divID) {
	var element = document.getElementById(divID);
	
	//if element exists, toggle it's class
	//between hidden and unhidden 
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden'; 
	} // if
} // changeVisibility

// display lightbox with bigImage in it
function displayLightBox(imageFile, alt) {
	var image = new Image(); 
	var bigImage = document.getElementById("bigImage"); 
	
	image.src = "images/" + imageFile; 
	image.alt = alt; 
	
	// anonymous function
	// force the image to preload
	// access to it's width to center on page
	image.onload = function () {
		var width = image.width; 
		document.getElementById("boundaryBigImage").style.width = width + "px"; 
	};
	
	bigImage.src = image.src; 
	bigImage.alt = image.alt; 
	
	changeVisibility('lightbox');
	changeVisibility('boundaryBigImage'); 
} //displayLightBox
	