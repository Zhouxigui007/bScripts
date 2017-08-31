#target Illustrator-18

function Organize(){
	var docRef = app.activeDocument;
	var layer = docRef.layers[0];
	var groups = layer.groupItems;
	var groupVB = []; //array for visible bounds of all groupItems
	
	
	/*push visible bounds of groupItems into groupVB array*/
	for (g=0; g<groups.length; g++){
		var cG = groups[g].visibleBounds;
		groupVB.push(cG);
	} //end for loop g
	
	
	var sortedVB = [];
	var currentGroup= ;
	var currentRow = [];
	var groupVBCopy = groupVB.slice(0);
	for (c=0; c<groupVB.length; c++){
		currentGroup = groupVB[c];
		currentRow = [];
		for (
	



} // end function

Organize();