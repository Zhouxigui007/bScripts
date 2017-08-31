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
	var csvFile = findCsv();
	csvFile = csvJSON(csvFile);
	var textLoc = findTextLoc();
	var sizes = findSizes();
	var copyPieces = selectAndCopy();
	var prodFile = createProdFile(oN);
	var artboards = createArtboards();
	checkThruCut();
	
	
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

        var result;


        
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

			var obj = contents.substring(contents.indexOf("roster"),contents.lastIndexOf("]"));
			obj = eval(obj);
			$.writeln(obj)
			$.writeln("done")

		}
    }
	
	function csvJSON(csv){
		var lines=csv.split("\n");
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
		for(var a=0;a<csvFile.length;a++){
			var valid = true;
			var thisSize = csvFile[a]["Size"];
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

	// function JSON_Parse(r){"use strict";var t,e,r,n,f={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:""},i=fun\
	// ction(e){throw{name:"SyntaxError",message:e,at:t,text:r}},u=function(n){return n&&n!==e&&i("Expected '"+n+"' instead\
	// of '"+e+"'"),e=r.charAt(t),t+=1,e},a=function(){var r,t="";for("-"===e&&(t="-",u("-"));e>="0"&&"9">=e;)t+=e,u();if("\
	// ."===e)for(t+=".";u()&&e>="0"&&"9">=e;)t+=e;if("e"===e||"E"===e)for(t+=e,u(),("-"===e||"+"===e)&&(t+=e,u());e>="0"&&\
	// "9">=e;)t+=e,u();return r=+t,isFinite(r)?r:void i("Bad number")},o=function(){var\
	// r,t,n,a="";if('"'===e)for(;u();){if('"'===e)return u(),a;if("\\"===e)if(u(),"u"===e){for(n=0,t=0;4>t&&(r=parseInt(u(\
	// ),16),isFinite(r));t+=1)n=16*n+r;a+=String.fromCharCode(n)}else{if("string"!=typeof f[e])break;a+=f[e]}else\
	// a+=e}i("Bad string")},c=function(){for(;e&&" ">=e;)u()},s=function(){switch(e){case"t":return\
	// u("t"),u("r"),u("u"),u("e"),!0;case"f":return u("f"),u("a"),u("l"),u("s"),u("e"),!1;case"n":return\
	// u("n"),u("u"),u("l"),u("l"),null}i("Unexpected '"+e+"'")},l=function(){var\
	// r=[];if("["===e){if(u("["),c(),"]"===e)return u("]"),r;for(;e;){if(r.push(n()),c(),"]"===e)return\
	// u("]"),r;u(","),c()}}i("Bad array")},d=function(){var r,t={};if("{"===e){if(u("{"),c(),"}"===e)return\
	// u("}"),t;for(;e;){if(r=o(),c(),u(":"),Object.hasOwnProperty.call(t,r)&&i('Duplicate key\
	// "'+r+'"'),t[r]=n(),c(),"}"===e)return u("}"),t;u(","),c()}}i("Bad object")};return\
	// n=function(){switch(c(),e){case"{":return d();case"[":return l();case'"':return o();case"-":return\
	// a();default:return e>="0"&&"9">=e?a():s()}},function(f,u){var a;return r=f,t=0,e=" ",a=n(),c(),e&&i("Syntax\
	// error"),"function"==typeof u?function o(r,t){var e,n,f=r[t];if(f&&"object"==typeof f)for(e in\
	// f)Object.prototype.hasOwnProperty.call(f,e)&&(n=o(f,e),void 0!==n?f[e]=n:delete f[e]);return\
	// u.call(r,t,f)}({"":a},""):a}}
	
}
wrapper();	