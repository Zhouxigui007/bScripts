
function createArtboards(){

////Set Script Global Variables////

	var docRef = app.activeDocument;
	var layer = docRef.layers[0];
	var aB = docRef.artboards;
	var groups = layer.groupItems;
	var groupList = []; //array of all groupItems
	var finalSortList = []; // final array of vertically sorted sub-arrays
	var buffer = 145;
	
////Begin Function Commands////

	deleteExistingArtboards();
	yesOrNoClipping();
     aB.setActiveArtboardIndex(0);
	
	

/////////////////////////////
////Begin Logic Container////
/////////////////////////////

	function deleteExistingArtboards(){
		var docRef = app.activeDocument;
		var aB = docRef.artboards;
		while (aB.length > 1){
		for (r=1; r < aB.length; r++){
			aB[r].remove();
		
			} // end for loop R
		} // end while loop
	}

	function yesOrNoClipping(){
		var clipOrNoClip = confirm("Are there clipping masks in your artwork?" + ('\n') + //
		"If clipping masks exist, click 'YES'." + ('\n') + "Otherwise, click 'NO'.")
	
		if(clipOrNoClip == true){
			withClip();
		}
		else if(clipOrNoClip == false){
			noClip();
		}
	}

	function noClip(){
		organize();
		spliceExtraGroups();
		for (a=0; a<finalSortList.length; a++){
			var currentRow = finalSortList[a];
			for (b=0; b< currentRow.length; b++){
				var currentGroup = currentRow[b];
				var newAb = aB.add(currentGroup.visibleBounds);
				newAb.name = currentGroup.name;
			}

		}
		
		if(aB.length > 1){
			aB[0].remove();
		}
	}

	function withClip(){
		organize();
		spliceExtraGroups();
		var abIndex = 0;
		for (a=0; a<finalSortList.length; a++){
			var currentRow = finalSortList[a];
			for (b=0; b<currentRow.length; b++){
				
				var currentGroup = currentRow[b];
				aB[abIndex].name = currentGroup.name;
				docRef.selection = null;
				currentGroup.selected = true;
				docRef.fitArtboardToSelectedArt(abIndex);
				var vB = currentRow[b].visibleBounds;
				aB.add(vB);
				abIndex++;
			}
		}
		if(aB.length>0){
			var r = aB.length-1;
			aB[r].remove();
		}
	}

	function organize(){
		var currentRowCoord;
		var sortedGroupList = []; //array of subarrays sorted by visible bounds
		var temp = []; //temporary array for the current row of groupItems. 
		var tempSorted = []; // temporary array for current row of groupItems sorted by left coordinate

	
	
		//populate groupList

		for (g=0; g<groups.length; g++){
			groupList.push(groups[g]);
		}

		//set currentRowMarker and compare rest of groupList to top coordinate of visible bounds. push true results to temp array.

		while (groupList.length > 0) { 
			var t = groupList.length-1;
			temp = [];
			for(c=0; c<groupList.length; c++){
				if((groupList[t].visibleBounds[1]-groupList[t].visibleBounds[3]) > 22){
					var markerTop = groupList[t].visibleBounds[1];
					var markerBottom = groupList[t].visibleBounds[3];
					break;
				}
			}
			currentRowCoord = markerTop + ((markerBottom - markerTop)/2);
			temp.push(groupList[t]);
			groupList.splice(t,1);
			for (r=groupList.length-1; r > -1; r--){
				var top = groupList[r].visibleBounds[1];
				var bottom = groupList[r].visibleBounds[3];
				if(top + ((bottom - top)/2) + buffer > currentRowCoord && top + ((bottom - top)/2) -buffer < currentRowCoord){
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
					topRow = sortedGroupList[s];
					deleteIndex = [s];
				}
				else if (sortedGroupList[s][0].visibleBounds[1] > placeholder){
					placeholder = sortedGroupList[s][0].visibleBounds[1];
					topRow = sortedGroupList[s];
					deleteIndex = s;
				}
			
			}
			finalSortList.push(topRow);
			sortedGroupList.splice(deleteIndex,1);	
		}
	

	}
	
	function spliceExtraGroups(){
	var L;
	var T;
	var R;
	var B;
	for(r=0; r<finalSortList.length; r++){
		var currentRow = finalSortList[r];
		for(k=currentRow.length-1; k>-1; k--){
			var MG = currentRow[k]; //measurement group
			L= MG.visibleBounds[0];
			T= MG.visibleBounds[1];
			R= MG.visibleBounds[2];
			B= MG.visibleBounds[3];
			for(s=currentRow.length-1; s>-1; s--){
				var CG = currentRow[s]; // compare group
				var CL = CG.visibleBounds[0];
				var CT= CG.visibleBounds[1];
				var CR = CG.visibleBounds[2];
				var CB = CG.visibleBounds[3];
				if(CL>L && CT<T && CR<R && CB>B){
					currentRow.splice(s,1);
				}
			}
		}
	}
}
	
	function removeExtraArtboards(){
	var docRef = app.activeDocument;
	var aB = docRef.artboards;
	var currentLeft;
	var currentTop;
	var currentRight;
	var currentBottom;
	var removeAB = [];
	for(a=0; a<aB.length; a++){
		var currentAB = aB[a];
		currentLeft = currentAB.artboardRect[0];
		currentTop = currentAB.artboardRect[1];
		currentRight = currentAB.artboardRect[2];
		currentBottom = currentAB.artboardRect[3];
		for(ra=1; ra<aB.length; ra++){
			var compareAB = aB[ra];
			var compareLeft = compareAB.artboardRect[0];
			var compareTop = compareAB.artboardRect[1];
			var compareRight = compareAB.artboardRect[2];
			var compareBottom = compareAB.artboardRect[3];
			if (compareLeft > currentLeft && compareTop < currentTop && compareRight < currentRight && compareBottom > currentBottom){
				removeAB.push(compareAB);
			}
		}
	}
	for (r=removeAB.length-1; r>-1; r--){
		removeAB[r].remove();
	}
}

/////////////////////////////	
////End Logic Container////
/////////////////////////////

}

createArtboards();

	