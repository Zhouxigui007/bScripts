function deleteExistingArtboards(){
	var docRef = app.activeDocument;
	var aB = docRef.artboards;
	while (aB.length > 1){
	for (r=1; r < aB.length; r++){
		aB[r].remove();
		
		} // end for loop R
	} // end while loop
}

function organize(){
	var docRef = app.activeDocument;
	var layer = docRef.layers[0];
	var aB = docRef.artboards;
	var groups = layer.groupItems;

	var currentRowCoord;

	var groupList = []; //array of all groupItems
	var sortedGroupList = []; //array of subarrays sorted by visible bounds
	var temp = []; //temporary array for the current row of groupItems. 
	var tempSorted = []; // temporary array for current row of groupItems sorted by left coordinate
	var finalSortList = []; // final array of vertically sorted sub-arrays
	
	
	//populate groupList

	for (g=0; g<groups.length; g++){
		groupList.push(groups[g]);
	}

	//set currentRowMarker and compare rest of groupList to top coordinate of visible bounds. push true results to temp array.

	while (groupList.length > 0) { 
		var t = groupList.length-1;
		temp = [];
		var markerTop = groupList[t].visibleBounds[1];
		var markerBottom = groupList[t].visibleBounds[3];
		currentRowCoord = markerTop + ((markerBottom - markerTop)/2);
		temp.push(groupList[t]);
		groupList.splice(t,1);
		for (r=groupList.length-1; r > -1; r--){
			var top = groupList[r].visibleBounds[1];
			var bottom = groupList[r].visibleBounds[3];
			if(top + ((bottom - top)/2) + 20 > currentRowCoord && top + ((bottom - top)/2) -20 < currentRowCoord){
				temp.push(groupList[r]);
				groupList.splice(r,1);
			}
		}
		
	
		
		//sort temp array from left to right here:
		
		for (s=temp.length; s>0; s--){ // this loop pushes farthest left groupItem into sortedTemp array and splices it from temp array
			var placeholder = 0;
			var farthestLeft;
			var deleteIndex; 
			for (a=0; a<temp.length; a++){ // this loop finds farthest left groupItem.
				if(placeholder == 0){
					placeholder = temp[a].visibleBounds[0];
					farthestLeft = temp[a];
					deleteIndex = a;
				}
				else if(temp[a].visibleBounds[0] < placeholder){
					placeholder = temp[a].visibleBounds[0];
					farthestLeft = temp[a];
					deleteIndex = a;
				}
			}
			tempSorted.push(farthestLeft);
			temp.splice(deleteIndex,1);
			
		}
	
		
		
		//
		if(tempSorted.length > 0){
	        sortedGroupList.push(tempSorted);
		}
		tempSorted = [];
	}
	
	//sort rows vertically here:
	
	for (v=sortedGroupList.length-1; v>-1; v--){
		var placeholder = 0;
		var topRow;
		var deleteIndex;
		for (s=0; s<sortedGroupList.length; s++){
			if (placeholder == 0){
				placeholder = sortedGroupList[s][0].visibleBounds[1];
				topRow = sortedGroupList
			}
		}	
	}
	
	//sortedGroupList.sort(function(a,b){return b.visibleBounds[1] > a.visibleBounds[1];});
	
	//
	
	for (a=0; a<sortedGroupList.length; a++){
		var currentRow = sortedGroupList[a];
		for (b=0; b< currentRow.length; b++){
			var currentGroup = currentRow[b];
			aB.add(currentGroup.visibleBounds);
//~ 			app.redraw();
		}
	}
	if(aB.length > 0){
		aB[0].remove();
	}
}

deleteExistingArtboards();
app.redraw();
organize(); 



line by line description:

set document variable
define layer 0 as variable
define variable for all group items
define placeholder variable for current row top coordinate
define empty array for list of groupItems
define empty array for sub arrays of left>right sorted rows
define empty array for temporary currentGroup list. to be emptied at the beginning of for loop t
populate groupList array with all groupItems of layer
begin for loop for first row
	clear temp array
	redefine currentRowMarker to top coordinate of first groupItem in groupList
	push the first groupItem to the temp array
	remove groupItem from groupList array
	begin comparrison for loop. cycle through remaining groupItems of groupList to comapre with currentRowMarker
		set currentgroup variable
		set vB to get top coordinate of the currentGroups visible bounds
		comparison statement. if the top coordinate of currentGroup is within tolerance (+/- 20) then push to temp array and splice from groupList.
	once entire row has been pushed to temp array, sort temp array by left coordinate from left to right	
	
	
ideas to sort groupItems by visibleBounds

after finding all items in a particular row, 