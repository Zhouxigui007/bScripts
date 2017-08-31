/*Issues with color blocks script:

pathItems are ignored and thus if a background piece is a simple pathItem, artboard will not be created around that piece. also clipping masks.

containment function requires an object completely within another one.

*/

function createArtboards(){
	
	//Script Global Variables
	
	var docRef = app.activeDocument;
	var layer = docRef.layers[0];
	var aB = docRef.artboards;
	var items = layer.pageItems;
	var itemList = []; // array of art items
	var finalSortList = []; //final array of vertically sorted sub-arrays
	var buffer = 145;
	
	///////////////////
	//Logic Container//
	///////////////////
	
	function deleteExistingArtboards(){
		while (aB.length > 1){
		for (r=1; r < aB.length; r++){
			aB[r].remove();
		
			} // end for loop R
		} // end while loop
	}
	
	function organize(){
		var currentRowCoord;
		var sortedRows = []; //array of subarrays sorted left to right by visible bounds
		var temp = []; //temporary array for current row
		var tempContainer = [];
		var containers = [];
		var tempSorted = []; //temporary array for current row sorted left to right;
		
		//Populate itemList
		
		for(a=0;a<items.length;a++){
			itemList.push(items[a]);
		}
		
		//Generate Rows
		
		while(itemList.length>0){
			var t = itemList.length-1;
			temp = [];
			
			//Set currentRowCoord if
			for(c=0;c<itemList.length;c++){ //find any item whose height his more than 22. ie. larger than a collar.
				if(itemList[c].height > 22){
					currentRowCoord= itemList[c].visibleBounds[1]-(itemList[c].height/2);
					temp.push(itemList[c]);
					itemList.splice(c,1);
					break;
				}
			}
			for(r=itemList.length-1;r>-1;r--){
				var top = itemList[r].visibleBounds[1];
				var vCenter = top-(itemList[r].height/2);
				if(vCenter + buffer > currentRowCoord && vCenter - buffer < currentRowCoord){
					temp.push(itemList[r]);
					itemList.splice(r,1);
				}
			}
			
			
			//Sort temp array from left to right
			
			for(s=temp.length-1;s>-1;s--){
				var placeholder = 0;
				var farthestLeft;
				var deleteIndex;
				for (a=0;a<temp.length;a++){
					if(placeholder == 0){
						placeholder = temp[a].visibleBounds[0];
						farthestLeft = temp[a];
						deleteIndex = a
					}
					else if (temp[a].visibleBounds[0] < placeholder){
						placeholder = temp[a].visibleBounds[0];
						farthestLeft = temp[a];
						deleteIndex = a;
					}
				}
				tempSorted.push(farthestLeft);
				temp.splice(deleteIndex,1);
			}
			if(tempSorted.length>0){
				sortedRows.push(tempSorted);
			}
			tempSorted = [];

		}
		
		//Sort rows vertically
		
		for(v=sortedRows.length-1;v>-1;v--){
			var placeholder = 0;
			var topRow;
			var deleteIndex;
			for(s=0;s<sortedRows.length;s++){
				if(placeholder == 0){
					placeholder = sortedRows[s][0].visibleBounds[1];
					topRow = sortedRows[s];
					deleteIndex = s;
				}
				else if (sortedRows[s][0].visibleBounds[1] < placeholder){
					placeholder = sortedRows[s][0].visibleBounds[1];
					topRow = sortedRows[s];
					deleteIndex = s;
				}
			}
			finalSortList.push(topRow);
			sortedRows.splice(deleteIndex,1);
		}
	
	
	}

	//********SPLICE EXTRAS FUNCTION NOT WORKING*********//

	function spliceExtras(){
		var L;
		var T;
		var R;
		var B;
		for(r=0;r<finalSortList.length; r++){
			var currentRow = finalSortList[r];
			for(k=currentRow.length-1; k>-1; k--){
				var M = currentRow[k];
				L = M.visibleBounds[0];
				T = M.visibleBounds[1];
				R = M.visibleBounds[2];
				B = M.visibleBounds[3];
				for(s=currentRow.length-2;s>-1;s--){
					if(s>-1){
						var C = currentRow[s];
						var CL = C.visibleBounds[0];
						var CT = C.visibleBounds[1];
						var CR = C.visibleBounds[2];
						var CB = C.visibleBounds[3];
						if(CL >= L && CT <= T && CR <= R && CB >= B){
							currentRow.splice(s,1);
						}
					}
				}
			}
		}
	}
	
	function makeAB(){
		var abIndex = 0;
		for(a=0;a<finalSortList.length; a++){
			var currentRow = finalSortList[a];
			for(b=0;b<currentRow.length;b++){
				var cur = currentRow[b];
				docRef.selection = null;
				cur.selected = true;
				docRef.fitArtboardToSelectedArt(abIndex);
				var vB = cur.visibleBounds;
				aB.add(vB);
				abIndex++;
				app.redraw();
			}
		}
		if(aB.length>1){
			aB[aB.length-1].remove();
		}
	}
	
	function test(){
		for(a=0;a<finalSortList.length;a++){
			var curRow = finalSortList[a];
			for(b=0;b<curRow.length;b++){
				cur = curRow[b];
				cur.selected = true;
				app.redraw();
				docRef.selection = null;
				app.redraw();
			}
		}
	}
	
	/////////////////////
	//Function Commands//
	/////////////////////
	
	deleteExistingArtboards();
	organize();
	spliceExtras();
	makeAB();
// 	test();
}
createArtboards();	