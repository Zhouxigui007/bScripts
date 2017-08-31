
Build Template 2.0 step by step

Click to run script

Prompt user "Men's(1), Women's(2) or  Youth(3)?"
User enters selection,
Prompt user "What Garment?" //options// Slowpitch(1), Hoodie(2) etc 
	This prompt is reliant on the first prompt. Obviously different options will be available for mens/womens

Users answer will trigger different variables to be set.
	all variables will be generic until after the prompts
	if(userAnswer = 1){
		Set global variables and arrays to appropriate
	}
	this should allow for simply adding a new set of arrays/variable definitions to incorporate a new style of garment

Generate list of groupItems to be sorted
Sort into rows
Sort rows by y position

Begin function to place artwork on template based on predefined coordinates
	loop through final sorted array
	create necessary layers for chosen style of garment
		make new layer for mens/womens/youth
		make size layers based on the garment
	place each groupItem in appropriate coords and inside appropriate layer
		don't use duplicate and remove.
		use moveToBeginning(destination);
	apply name of each group item
		eg. XL Front

Begin function to create layers based on possible artwork locations
	this info will be set in the master variable set for each garment


Add Artwork 2.0 step by step

Click to run script

Loop 'Artwork Layer' to find sublayers that contain artwork, delete empty sublayers
	verify quantities of groupItems on each sublayer. there shouldnt be more than 1 for anything except 'additional artwork'
	if sublayer.groupItems.length == 1, set variable to the groupItem of that layer..
		need to sort out how to determine which variable im setting since this should be in a loop. 
	else if sublayer.groupItems.length < 1, delete sublayer
	else if sublayer.groupItems.length > 1, alert("either the artwork on layer " + sublayer.name + " isn't grouped properly, or you have more than one logo")
	
	now that quantities have been verified, loop the remaining sublayers to duplicate artwork to every size
	if curLayer.name == "Front Logo" {
		do predefined front logo function
			check for greater dimension (height or width)
			if(width>height) set a variable to do correct math
	}
	else if curLayer.name == "Front Number" {
		set function global variable to front group
		do predefined front number placement function.
			how far does the number need to move to the left for the smallest size?
			how far up/down does the number need to move for each size jersey?
			copy number into each size group and apply transformations
	}
	else {
		if curLayer.name = "Left Sleeve"
		set function global variable to target left sleeve group
		else if etc etc.
		
		run b loop from 0 - length of wearerLayer.layers
		duplicate curLayer.groupItems[a] to layers[b].targetGroup
	
	
	