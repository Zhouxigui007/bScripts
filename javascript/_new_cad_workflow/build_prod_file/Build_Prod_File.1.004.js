/* 	
	Script Name: Build Production File
	Author: William Dowling
	Creation Date: 10.27.15
	Script Purpose:
		Read completed prepress file and appropriate roster information from CSV.
		Copy necessary garment pieces to new file with order number as filename.
		Verify correct Thru-cut lines and create artboards in production file.
		Input player information where necessary.
		Export individual, named PDFs for each garment piece.

	Version History:
		Original Build: 10.27.15
			Set up script global variables and functions related to obtaining the necessary information.
			For testing purposes, I used local paths for source files. To this point, everything works
			up to the point of adding player information. I'm still unsure of the best looping procedure.
		Version 1.002: 10.28.15
			**WARNING WARNING WARNING**
			JSON Eval function not working. FIX IT! Need to figure out how to successfully parse the string
			imported from the foreign js file and rebuild the object in a way that's useful. 
		Version 1.003: 10.29.15
			Fixed eval function. Make note that future plain csv's need to match naming convention of web generated
			files. ie. 'name', 'number', 'jerseySize'. Still need to figure out how to loop shirt pieces and duplicate
			text frames to add customer info.
		Version 1.004: 10.29.15
			Successfully adding player names/numbers from roster information!!! Woop! Next step is to convert
			player info to outlines and expand appearance. I should like to load an action do the expanding
			and then unload the action.

*/

function wrapper(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var csvSource = new Folder("~/Desktop/In Progress/~OLD/Automation/Javascript/_New CAD Workflow/CSV Testing/");
	var wearerLayer = generateWearer();
	var prepressLayer;
	var artLayers;
	var date = getDate();
	var oN = orderNumber();
	var roster = findCsv();
	var textLoc = findTextLoc();
	var sizes = findSizes();
	var copyPieces = selectAndCopy();
	var prodFile = createProdFile(oN);
	var artboards = createArtboards();
	checkThruCut();
	var info = addInfo();
	
	
	function getDate(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getYear();
		var yy = yyyy-100;

		if(dd<10) {
			dd='0'+dd
		} 
		if(mm<10) {
			mm='0'+mm
		} 
		return mm+'.'+dd+'.'+yy;
	}
	
	function generateWearer(){
		var wearerList = [];
		var theLayer;
		for(var a=0;a<layers.length;a++){
			theLayer = layers[a];
			if(theLayer.name.indexOf("FD")>-1){
				wearerList.push(theLayer);
			}
		}
		if(wearerList.length == 0){
			alert("You're missing a necessary layer.");
			return;
		}
		else if(wearerList.length == 1){
			result = wearerList[0];
		}
		else{
			var result;
			var window = new Window("dialog");
			var textGroup = window.add("group");
			var topText = textGroup.add("statictext", undefined, "Which Garment do you want to create a production file for?");
			topText.justify = "center";
			var buttonGroup = window.add("group");
			buttonGroup.orientation = "column";
			for(var a=0;a<wearerList.length;a++){
				addButton(a, wearerList[a].name,wearerList[a]);
			}
			function addButton(num, thisName, layer){
				buttonGroup[num] = buttonGroup.add("button", undefined, thisName);
				buttonGroup[num].onClick = function(){
					result = layer;
					window.close();
				}
			}
			window.show();
		}
		prepressLayer = result.layers["Prepress"];
		artLayers = result.layers["Artwork Layer"];
		return result;
	}
	 
	function orderNumber(){
		do{var theNumber = prompt("Enter the Order Number","1234567");}
		while(isNaN(Number(theNumber)) || theNumber.length!=7)
		return theNumber;
	}
	
	function findCsv(){

		var csvFile = new File(csvSource + "/" + oN + ".csv");
    	var objFile = new File(csvSource + "/" + oN + ".js");
        
        if (csvFile.exists){
			csvFile.open();
			var contents = csvFile.read();
			csvFile.close();
		}
		else if(objFile.exists){
			objFile.open();
			var contents = objFile.read();
			objFile.close();
		}else{
		alert("The File Does Not Exist");
		return;
		}

		if(contents.indexOf("{") == 0){

			var string = contents.substring(contents.indexOf('"roster"'),contents.indexOf(',"params"'));
            string = string.substring(9,string.length+1);
			var roster = eval(string);
			return roster;

		}
		else{
			var lines=contents.split("\n");
			var result = [];
			var headers=lines[0].split(",");
			for(var i=1;i<lines.length;i++){
				var obj = {};
				var currentline=lines[i].split(",");
				for(var j=0;j<headers.length;j++){
					obj[headers[j]] = currentline[j];
				}
				result.push(obj);
			}
			return result;
		}
    }
	
	
	function findTextLoc(){
		var result = [];
		for(var a=0;a<artLayers.layers.length;a++){
			var curArtLayer = artLayers.layers[a];
			if(curArtLayer.pageItems[0].typename == "TextFrame"){
				result.push(curArtLayer.name);
			}
		}
		return result;
	}
	
	function findSizes(){
		var result = [];
		for(var a=0;a<roster.length;a++){
			var valid = true;
			var thisSize = roster[a]["jerseySize"];
			for(var b=0;b<result.length;b++){
				if(thisSize == result[b]){
					valid = false;
					break;
				}
			}
			if(valid){
				result.push(thisSize);
			}
		}
		return result;
	}
	
	function selectAndCopy(){
		docRef.selection = null;
		var len = sizes.length;
		for(var a=0;a<len;a++){
			var curSize = sizes[a];
			prepressLayer.layers[curSize].hasSelectedArtwork = true;
		}
		app.executeMenuCommand("copy");
		return docRef.selection;
	}
	
	function createProdFile(oN){
		var newDoc = app.documents.add();
		newDoc.activate();
		var destFolder = new Folder("~/Desktop/Today's Orders " + date);
		destFolder = new Folder("/Volumes/Macintosh HD" + destFolder.fsName);
		if(!destFolder.exists){
			destFolder.create();
		}
		var dest = new File(destFolder + "/" + oN + ".ai");
		app.executeMenuCommand("paste");
		newDoc.saveAs(dest);
        return newDoc;
	}
	
	function createArtboards(){
		var aB = prodFile.artboards;
		var groups = prodFile.layers[0].groupItems;
		var groupList = [];
		var finalSortList = [];
		var buffer = 145;
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
		organize();
		spliceExtraGroups();
		var abIndex = 0;
		for (a=0; a<finalSortList.length; a++){
			var currentRow = finalSortList[a];
			for (b=0; b<currentRow.length; b++){
				
				var currentGroup = currentRow[b];
				aB[abIndex].name = currentGroup.name;
				prodFile.selection = null;
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
	
	function checkThruCut(){
		var prodFile = app.activeDocument;
		var prodLayer = prodFile.layers[0];
		var aB = prodFile.artboards;
		var thruCutAction = new File("~/Desktop/Thru-Cut.aia");
		app.loadAction(thruCutAction);
		prodFile.selection = null;
		app.doScript('Copy Strokes','Thru-Cut');
		prodLayer.visible = false;
		var checkLayer = prodFile.layers.add();
		app.executeMenuCommand('paste');
		var len = aB.length;
		for(var a=0;a<len;a++){
			prodFile.selection = null;
			aB.setActiveArtboardIndex (a);
			prodFile.selectObjectsOnActiveArtboard();
			if(prodFile.selection.length < 1){
				alert("Thru-cut lines are missing. Please fix the prepress and try again.");
				return;
			}
		}
		checkLayer.hasSelectedArtwork = true;
		for(var a=prodFile.selection.length-1;a>-1;a--){
			prodFile.selection[a].remove();
		}
		prodLayer.visible = true;
		app.doScript('Copy Fills','Thru-Cut');
		if(prodFile.selection.length>0){
			for(var a=0;a<prodFile.selection.length;a++){
				prodFile.selection[a].moveToBeginning(checkLayer);
			}
			checkLayer.active = true;
			prodLayer.visible = false;
			alert("You have Thru-cut fills in the document. Please fix the prepress and try again.");
			app.unloadAction('Thru-Cut','');
			return;
		}
		checkLayer.remove();
		prodLayer.visible = true;
		app.unloadAction('Thru-Cut','');
		
	}

	function addInfo(){
		var player;
		var curSize;
		var curName;
		var curNumber;
		var groups = prodFile.layers[0].groupItems;
		for(var a=0;a<roster.length;a++){
			player = roster[a];
			curSize = player.jerseySize;
			curName = player.name;
			curNumber = player.number;
			for(var b=0;b<textLoc.length;b++){
				if(textLoc[b]=="Player Name"){
					var curPiece = groups[curSize + " Back"];
					try{
						var namesGroup = curPiece.groupItems["nameGroup"];
						var frame = namesGroup.textFrames[curSize + " Player Name"];
					}
					catch(e){
						var namesGroup = curPiece.groupItems.add();
						namesGroup.name = "nameGroup"
						var frame = curPiece.textFrames[curSize + " Player Name"];
						frame.moveToBeginning(namesGroup);
						frame.hidden = true;
					}
					var newFrame = frame.duplicate();
					newFrame.name = curSize + " Player Name " + curName;
					newFrame.contents = curName;
					if(newFrame.contents == ''){
						newFrame.remove();
					}
				}
				else if(textLoc[b]=="Back Number"){
					var curPiece = groups[curSize + " Back"];
					try{
						var backNumGroup = groups[curSize + " Back"].groupItems["backNumGroup"];
						var frame = backNumGroup.textFrames[curSize + " Player Number"];
					}
					catch(e){
						var backNumGroup = groups[curSize + " Back"].groupItems.add();
						backNumGroup.name = "backNumGroup"
						var frame = curPiece.textFrames[curSize + " Player Number"];
						frame.moveToBeginning(backNumGroup);
						frame.hidden = true;
					}
					var newFrame = frame.duplicate();
					newFrame.name = curSize + " Player Number " + curNumber;
					newFrame.contents = curNumber;
					if(newFrame.contents == ''){
						newFrame.remove();
					}
				}
				else if(textLoc[b]=="Front Number"){
					var curPiece = groups[curSize + " Front"];
					try{
						var frontNumGroup = curPiece.groupItems["frontNumGroup"];
						var frame = frontNumGroup.textFrames[curSize + " Front Number"];
					}
					catch(e){
						var frontNumGroup = curPiece.groupItems.add();
						frontNumGroup.name = "frontNumGroup";
						var frame = curPiece.textFrames[curSize + " Front Number"];
						frame.moveToBeginning(frontNumGroup);
						frame.hidden = true;
					}
					var newFrame = frame.duplicate();
					newFrame.name = curSize + " Front Number " + curNumber;
					newFrame.contents = curNumber;
					if(newFrame.contents == ''){
						newFrame.remove();
					}
				}
				else if(textLoc[b]=="Right Sleeve"){
					var curPiece = groups[curSize + " Right Sleeve"];
					try{
						var rightSleeveGroup = curPiece.groupItems["rightSleeveGroup"];
						var frame = rightSleeveGroup.textFrames[curSize + " Right Sleeve Art"];
					}
					catch(e){
						var rightSleeveGroup = curPiece.groupItems.add();
						rightSleeveGroup.name = "rightSleeveGroup";
						var frame = curPiece.textFrames[curSize + " Right Sleeve Art"];
						frame.moveToBeginning(rightSleeveGroup);
						frame.hidden = true;
					}
					var newFrame = frame.duplicate();
					newFrame.name = curSize + " Right Sleeve Number " + curNumber;
					newFrame.contents = curNumber;
					if(newFrame.contents == ''){
						newFrame.remove();
					}
				}
				else if(textLoc[b]=="Left Sleeve"){
					var curPiece = groups[curSize + " Left Sleeve"];
					try{
						var leftSleeveGroup = curPiece.groupItems["leftSleeveGroup"];
						var frame = leftSleeveGroup.textFrames[curSize + " Left Sleeve Art"];
					}
					catch(e){
						var leftSleeveGroup = curPiece.groupItems.add();
						leftSleeveGroup.name = "leftSleeveGroup";
						var frame = curPiece.textFrames[curSize + " Left Sleeve Art"];
						frame.moveToBeginning(leftSleeveGroup);
						frame.hidden = true;
					}
					var newFrame = frame.duplicate();
					newFrame.name = curSize + " Left Sleeve Number " + curNumber;
					newFrame.contents = curNumber;
					if(newFrame.contents == ''){
						newFrame.remove();
					}
				}
			}
		}
	}

	
}
wrapper();	