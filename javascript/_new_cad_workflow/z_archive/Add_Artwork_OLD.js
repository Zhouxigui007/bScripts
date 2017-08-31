//Add Artwork 2.0
//Author William Dowling
//06/29/15
//Updated: 08/18/15

function scriptContainer(){
	//Script Global Variables
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var valid = true;
	var wearer;
	var wearerLayer;
	var smallestSize;
	var smallestWidth;
	var logo;
	var artLayers = layers.getByName("Artwork Layer").layers;
	var additionalArt;
	var additionalArtLoc;
	var additionalArtScale;
	
	
	//////////
	//Arrays//
	//////////
	var slowRegularPlacement = 	{
		"XS" : [[-334,625],[-1122,638],[-334,717],[-584,737],[-859,737]],
		"S" : [[-338,365],[-1125,378],[-338,459],[-589,480],[-864,481]],
		"M" : [[-341,97],[-1127,111],[-341,193],[-595,217],[-870,217]],
		"L" : [[-343,-177],[-1129,-163],[-343,-79],[-600,-54],[-875,-53]],
		"XL" : [[-346,-459],[-1131,-445],[-346,-359],[-606,-332],[-880,-332]],
		"2XL" : [[-349,-748],[-1134,-734],[-349,-646],[-611,-617],[-886,-617]],
		"3XL" : [[-352,-1041],[-1136,-1030],[-352,-938],[-616,-907],[-891,-909]],
		"4XL" : [[-355,-1346],[-1138,-1333],[-355,-1241],[-622,-1209],[-897,-1209]],
		"5XL" : [[-358,-1657],[-1140,-1643],[-358,-1550],[-627,-1516],[-902,-1515]]
	}
								
	var slowRaglanPlacement = 	{
		"XS" : [[-479,576],[-1430,522],[-693,576],[-930,618],[-1188,617]],
		"S" : [[-481,329],[-1433,272],[-695,329],[-935,372],[-1194,370]],
		"M" : [[-484,76],[-1435,15],[-698,76],[-941,118],[-1199,117]],
		"L" : [[-486,-184],[-1437,-248],[-700,-184],[-946,-142],[-1205,-143]],
		"XL" : [[-488,-449],[-1439,-518],[-702,-449],[-951,-406],[-1210,-411]],
		"2XL" : [[-490,-722],[-1442,-792],[-704,-722],[-957,-679],[-1215,-684]],
		"3XL" : [[-492,-1004],[-1444,-1078],[-706,-1004],[-962,-961],[-1221,-964]],
		"4XL" : [[-495,-1290],[-1446,-1368],[-709,-1290],[-968,-1247],[-1226,-1251]],
		"5XL" : [[-497,-1585],[-1448,-1666],[-711,-1585],[-973,-1541],[-1232,-1544]]
	}
								
	var womensSlowRegularPlacement = {
		"XXS" : [[-324,576],[-977,604],[-324,685],[-551,700],[-773,700]],
		"XS" : [[-327,288],[-979,317],[-327,396],[-555,414],[-777,414]],
		"S" : [[-330,15],[-981,44],[-330,122],[-558,144],[-781,145]],
		"M" : [[-333,-260],[-983,-232],[-333,-152],[-562,-128],[-784,-127]],
		"L" : [[-335,-567],[-985,-539],[-335,-458],[-565,-431],[-788,-430]],
		"XL" : [[-337,-862],[-987,-834],[-337,-752],[-569,-722],[-791,-722]],
		"2XL" : [[-339,-1155],[-989,-1127],[-339,-1042],[-573,-1013],[-795,-1013]],
		"3XL" : [[-342,-1470],[-991,-1442],[-342,-1357],[-576,-1327],[-799,-1326]]
	}
								
	var womensSlowRaglanPlacement = {
		"XXS" : [[-365,528],[-1211,482],[-569,528],[-769,574],[-994,573]],
		"XS" : [[-362,288],[-1213,242],[-570,288],[-773,336],[-998,334]],
		"S" : [[-371,42],[-1215,-5],[-572,42],[-777,92],[-1002,91]],
		"M" : [[-389,-209],[-1217,-257],[-574,-209],[-780,-157],[-1005,-158]],
		"L" : [[-401,-467],[-1219,-517],[-576,-467],[-784,-413],[-1009,-415]],
		"XL" : [[-409,-733],[-1221,-784],[-578,-733],[-788,-676],[-1013,-678]],
		"2XL" : [[-414,-1002],[-1223,-1055],[-580,-1002],[-791,-946],[-1016,-948]],
		"3XL" : [[-400,-1276],[-1225,-1330],[-583,-1276],[-795,-1219],[-1020,-1221]]
	}
								
	var youthSlowRegularPlacement = {
		"YXS" : [[-268,-44],[-806,-15],[-268,46],[-441,58],[-619,58]],
		"YS" : [[-272,-253],[-807,-224],[-272,-158],[-446,-146],[-624,-146]],
		"YM" : [[-275,-472],[-808,-443],[-275,-374],[-450,-360],[-628,-359]],
		"YL" : [[-278,-701],[-809,-672],[-278,-598],[-455,-584],[-634,-583]],
		"YXL" : [[-282,-941],[-810,-913],[-282,-833],[-459,-819],[-637,-819]]
	}
								
	var youthSlowRaglanPlacement = 	{
		"YXS" : [[-288,74],[-975,39],[-438,74],[-614,109],[-798,107]],
		"YS" : [[-292,-121],[-976,-160],[-442,-121],[-618,-85],[-800,-87]],
		"YM" : [[-294,-328],[-977,-370],[-444,-328],[-623,-288],[-805,-291]],
		"YL" : [[-298,-544],[-978,-590],[-448,-544],[-627,-504],[-810,-506]],
		"YXL" : [[-302,-772],[-979,-822],[-452,-772],[-632,-731],[-807,-732]]
	}
	//////////
	//Arrays//
	//////////
	
	
	
	///////////////////
	//Logic Container//
	///////////////////
	
	function generateWearer(){
		var wearerList = [];
		for(var a=0;a<layers.length;a++){
			if(layers[a].name == "MENS" || layers[a].name == "WOMENS" || layers[a].name == "YOUTH"){
				wearerList.push(layers[a].name)
			}
		}
		if(wearerList.length==0){
			alert("You are missing a necessary layer!")
			valid = false;
		}
		else if (wearerList.length == 1){
			wearer = wearerList[0];
			wearerLayer = layers.getByName(wearer);
			smallestSize = layers.getByName(wearer).layers[0].name;
			}
			
	}
	
	function unlock(){
		var curLayer = wearerLayer;
		curLayer.locked = false;
		curLayer.visible = true;
		for(var a=0;a<curLayer.layers.length;a++){
			var subLayer = curLayer.layers[a];
			subLayer.locked = false;
			subLayer.visible = true;
		}
		
	}
	
	function findSmallestWidth(){
		smallestSize = wearerLayer.layers[0].name;
		if(smallestSize == "XXS" || smallestSize == "S"){//Womens or Mens
			smallestWidth = 10.8;
		}
		else if(smallestSize == "XS" || smallestSize == "YXS"){//Mens or Youth
			smallestWidth = 14.4;
		}
	}
	
	function placeFrontLogo(){
		var logo = artLayers.getByName("Front Logo").pageItems[0];
		var logoTop = logo.top;
		var newWidth = logo.width - smallestWidth;
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var scale = (newWidth/logo.width)*100;
			var curLoc = wearerLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
			var logoResize = logo.duplicate(curLoc);
			logoResize.resize(scale,scale,true,true,true,true,00);
			logoResize.top = logoTop;
			newWidth = newWidth + 3.6;
			logoResize.name = curSize + " Front Logo";
		}
	}
	
	function placeFrontNumber(){
		var fNumber = artLayers.getByName("Front Number").pageItems[0];
		var nextSmallest = wearerLayer.layers[1].name;
		var secondSize = wearerLayer.layers[1].groupItems.getByName(nextSmallest + " Front").pageItems.getByName(nextSmallest + " Front Logo").height;
		var smallest = wearerLayer.layers[0].groupItems.getByName(smallestSize + " Front").pageItems.getByName(smallestSize + " Front Logo").height;
		var vertPos = secondSize - smallest;
		var left = fNumber.left - (smallestWidth / 2);
		var top = fNumber.top + vertPos;
		var x = 0;
		var y = 0;
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
			var fNumberCopy = fNumber.duplicate(dest);
			fNumberCopy.name = curSize + " Front Number";
			fNumberCopy.left = left;
			fNumberCopy.top = top;
			left = left + 1.8;
			top = fNumberCopy.top - vertPos;
		}
	}
	
	function placePlayerName(){
		var name = artLayers.getByName("Player Name").pageItems[0];
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Back");
			var nameCopy = name.duplicate(dest);
			nameCopy.name = curSize + " Player Name";
			nameCopy.zOrder(ZOrderMethod.BRINGTOFRONT);
		}
	}
	
	function placePlayerNumber(){
		try{
			var number = artLayers.getByName("Player Number").pageItems[0];
		}
		catch(e){
			var number = artLayers.getByName("Back Number").pageItems[0];
		}
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Back");
			var numberCopy = number.duplicate(dest);
			numberCopy.name = curSize + " Player Number";
		}
	}
	
	function placeLeftSleeve(){
		var leftSleeve = artLayers.getByName("Left Sleeve").pageItems[0];
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Left Sleeve");
			var leftCopy = leftSleeve.duplicate(dest);
			leftCopy.name = curSize + " Left Sleeve Art";
		}
	}
	
	function placeRightSleeve(){
		var rightSleeve = artLayers.getByName("Right Sleeve").pageItems[0];
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Right Sleeve");
			var rightCopy = rightSleeve.duplicate(dest);
			rightCopy.name = curSize + " Right Sleeve Art";
		}
	}
	
	function placeLockerTag(){
		var lockerTag = artLayers.getByName("Locker Tag").pageItems[0];
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Back");
			var lockerTagCopy = lockerTag.duplicate(dest);
			lockerTagCopy.name = curSize + " Locker Tag";
		
		}
	}
	
	function placeSponsor(){
		var sponsor = artLayers.getByName("Sponsor Logo").pageItems[0];
		for(var a=0;a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " Back");
			var sponsorCopy = sponsor.duplicate(dest);
			sponsorCopy.name = curSize + " Sponsor Logo"
		}
	}
	
	function placeAdditionalArt(){
		var addArt;
		var addArtLayer;
		for(var b=0;b<wearerLayer.layers.length;b++){
			if (artLayers[b].visible == true && artLayers[b].name == "Additional Art"){
				addArt = artLayers[b].pageItems[0];
				addArtLayer = artLayers[b];
				break;
			}
		}
		if(!additionalArtScale)	{	
			for(var a=0;a<wearerLayer.layers.length;a++){
				var curSize = wearerLayer.layers[a].name;
				var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " " + additionalArtLoc);
				var addArtCopy = addArt.duplicate(dest);
				addArtCopy.name = curSize + " " + additionalArt; 
			}
		}
		else if(additionalArtScale){
			addArt = artLayers[b].pageItems[0];
			var newWidth = addArt.width - smallestWidth;
			for(var a=0;a<wearerLayer.layers.length;a++){
				var curSize = wearerLayer.layers[a].name;
				var dest = wearerLayer.layers[a].groupItems.getByName(curSize + " " + additionalArtLoc);
				var scale = (newWidth / addArt.width)*100;
				var addArtCopy = addArt.duplicate(dest);
				addArtCopy.resize(scale,scale,true,true,true,true,00);
				newWidth = newWidth + 7.2;
				addArtCopy.name = curSize + " " + additionalArt;
			}
		}
		addArtLayer.visible = false;
	}
	
	function addArtwork(){
		var removeLayers = [];
		
		try{
			artLayers.getByName("Player Name").zOrder(ZOrderMethod.SENDTOBACK);
		}
		catch(e){
		}
		for(var a=0;a<artLayers.length;a++){
			var curArtLayer = artLayers[a];
			if (curArtLayer.pageItems.length < 1){
				removeLayers.push(curArtLayer);
			}
			else if (curArtLayer.pageItems.length == 1 && curArtLayer.visible == true){
				if (curArtLayer.name == "Front Logo"){
					placeFrontLogo();
				}
				else if (curArtLayer.name == "Front Number" && artLayers.getByName("Front Logo").pageItems.length>0){
					placeFrontNumber();
				}
				else if (curArtLayer.name == "Player Number" || curArtLayer.name == "Back Number"){
					placePlayerNumber();
				}
				else if (curArtLayer.name == "Left Sleeve"){
					placeLeftSleeve();
				}	
				else if (curArtLayer.name == "Right Sleeve"){
					placeRightSleeve();
				}
				else if (curArtLayer.name == "Locker Tag"){
					placeLockerTag();
				}
				else if (curArtLayer.name == "Sponsor Logo"){
					placeSponsor();
				}
				else if (curArtLayer.name == "Additional Art"){
					docRef.selection = null;
					curArtLayer.pageItems[0].selected = true;
					app.redraw();
					additionalArt = prompt("Enter description of highlighted artwork.", "e.g. Sponsor Info, Ghosted Image, etc");
					additionalArtLoc = prompt("Enter the shirt piece where the artwork will be placed." + ('\n') + "Please use title case", "e.g. Front, Back, Left Sleeve, Right Sleeve");
					additionalArtScale = confirm("Do you want to scale the artwork with the shirts?");
					if(additionalArt == null || additionalArtLoc == null){
						valid = false;
					}
					if(valid){
						placeAdditionalArt();
					}
					else{
						alert("Your selections were invalid. Undo And try again");
					}
					docRef.selection = null;
				
				}
				else if (curArtLayer.name == "Player Name"){
					placePlayerName();
				}
			}
			else if (curArtLayer.pageItems.length > 1){
				alert("You have too much artwork on layer " + curArtLayer.name);
			}
		}
		if(removeLayers.length>0){
				for(var a=removeLayers.length-1;a>-1;a--){
					removeLayers[a].remove();
				}
		}
	}
	
	function moveArtwork(){
		var style = layers.getByName("Information").layers[0].name;
		var coords;
		if(style == "Mens Raglan"){
			coords = slowRaglanPlacement;
		}
		else if(style == "Mens Regular"){
			coords = slowRegularPlacement;
		}
		else if(style == "Womens Regular"){
			coords = womensSlowRegularPlacement;
		}
		else if(style == "Womens Raglan"){
			coords = womensSlowRaglanPlacement;
		}
		else if(style == "Youth Regular"){
			coords = youthSlowRegularPlacement;
		}
		else if(style == "Youth Raglan"){
			coords = youthSlowRaglanPlacement;
		}
		for(var a=0; a<wearerLayer.layers.length;a++){
			var curSize = wearerLayer.layers[a].name;
			var curLayer = wearerLayer.layers[a];
			for(var b=0;b<curLayer.groupItems.length;b++){
				var curGroup = curLayer.groupItems[b];
				curGroup.left = coords[curSize][b][0];
				curGroup.top = coords[curSize][b][1];
			}
		}
	}
	
	function addStyleToWearerLayer(){
		var garCode = layers.getByName("Information").textFrames.getByName("Garment Code").contents;
		var styleNumber = garCode.slice(-4, garCode.length-1);
		wearerLayer.name = wearerLayer.name + " " + styleNumber;
	}
	
	///////////////////
	//Logic Container//
	///////////////////
	
	
	/////////////////////
	//Function Commands//
	/////////////////////
	
	generateWearer();
	if(valid == true){
		unlock();
	}
	if(valid == true){
		findSmallestWidth();
	}
	if(valid == true){
		addArtwork();
	}
	if(valid == true){
		try{
			moveArtwork();
			addStyleToWearerLayer();
		}
		catch(e){
			alert("Couldn't Move The Artwork");
		}
	}
}
scriptContainer();