function getCoordinates(){
	var docRef = app.activeDocument;
	var getcoords = docRef.layers.getByName("Coords");
	var tempCoords = [];
	var coords = [];
	var coordsArray = {};
	var sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"]
	var curSize = 0;
	var shirtPieces = 12 
	var groupList = [];
	for(a=0;a<getcoords.groupItems.length;a++){
		var groups = getcoords.groupItems;
		groupList.push(groups[a]);
	}
	while(groupList.length>0){
		tempCoords = [];
		for(b=0; b<shirtPieces; b++){
			var curGroup = groupList[b];
			var left = curGroup.visibleBounds[0];
			var top = curGroup.visibleBounds[1];
			tempCoords.push("[" + (Math.round(left)));
			tempCoords.push(Math.round(top) + "]");
			
		}
		coords.push('"' + sizes[curSize] + '"'  + " : " + "[" + tempCoords + "],");
		curSize++;
		groupList.splice(0,shirtPieces);
	}

// 	$.writeln(tempCoords);
	$.writeln(coords.join('\n'));
}
getCoordinates();