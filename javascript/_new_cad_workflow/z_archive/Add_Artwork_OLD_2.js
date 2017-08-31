//Add Artwork 3.0
//Author William Dowling
//Rebuilt from v2.0 to allow for multiple garments in same master file
//Built: 09/01/15

#target Illustrator

function scriptContainer(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var valid = true;
	var wearer;
	var wearerLayer;
	var prepressLayer;
	var smallestSize;
	var smallestWidth;
	var logo;
	var artLayers;
	var additionalArt;
	var additionalArtLoc;
	var additionalArtScale;
	app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
	
	//////////
	//Arrays//
	//////////
	var slowRegularPlacement = 	{
		"XS" : [[-334,595],[-1122,608],[-334,687],[-584,707],[-859,707]],
		"S" : [[-338,335],[-1125,348],[-338,429],[-589,450],[-864,451]],
		"M" : [[-341,67],[-1127,81],[-341,163],[-595,187],[-870,187]],
		"L" : [[-343,-207],[-1129,-193],[-343,-109],[-600,-84],[-875,-83]],
		"XL" : [[-346,-489],[-1131,-475],[-346,-389],[-606,-362],[-880,-362]],
		"2XL" : [[-349,-778],[-1134,-764],[-349,-676],[-611,-647],[-886,-647]],
		"3XL" : [[-352,-1071],[-1136,-1060],[-352,-968],[-616,-937],[-891,-939]],
		"4XL" : [[-355,-1376],[-1138,-1363],[-355,-1271],[-622,-1239],[-897,-1239]],
		"5XL" : [[-358,-1687],[-1140,-1673],[-358,-1580],[-627,-1546],[-902,-1545]]
	}
								
	var slowRaglanPlacement = 	{
		"XS" : [[-237,576],[-1188,522],[-451,576],[-688,618],[-946,617]],
		"S" : [[-239,329],[-1191,272],[-453,329],[-693,372],[-952,370]],
		"M" : [[-242,76],[-1193,15],[-456,76],[-699,118],[-957,117]],
		"L" : [[-244,-184],[-1195,-248],[-458,-184],[-704,-142],[-963,-143]],
		"XL" : [[-246,-449],[-1197,-518],[-460,-449],[-709,-406],[-968,-411]],
		"2XL" : [[-248,-722],[-1200,-792],[-462,-722],[-715,-679],[-973,-684]],
		"3XL" : [[-250,-1004],[-1202,-1078],[-464,-1004],[-720,-961],[-979,-964]],
		"4XL" : [[-253,-1290],[-1204,-1368],[-467,-1290],[-726,-1247],[-984,-1251]],
		"5XL" : [[-255,-1585],[-1206,-1666],[-469,-1585],[-731,-1541],[-990,-1544]]
	}
								
	var womensSlowRegularPlacement = {
		"XXS" : [[-324,519],[-977,547],[-324,628],[-551,643],[-773,643]],
		"XS" : [[-327,231],[-979,260],[-327,339],[-555,357],[-777,357]],
		"S" : [[-330,-42],[-981,-13],[-330,65],[-558,87],[-781,88]],
		"M" : [[-333,-317],[-983,-289],[-333,-209],[-562,-185],[-784,-184]],
		"L" : [[-335,-624],[-985,-596],[-335,-515],[-565,-488],[-788,-487]],
		"XL" : [[-337,-919],[-987,-891],[-337,-809],[-569,-779],[-791,-779]],
		"2XL" : [[-339,-1212],[-989,-1184],[-339,-1099],[-573,-1070],[-795,-1070]],
		"3XL" : [[-342,-1527],[-991,-1499],[-342,-1414],[-576,-1384],[-799,-1383]]
	}
								
	var womensSlowRaglanPlacement = {
		"XXS" : [[-176,528],[-1022,482],[-380,528],[-580,574],[-805,573]],
		"XS" : [[-173,288],[-1024,242],[-381,288],[-584,336],[-809,334]],
		"S" : [[-182,42],[-1026,-5],[-383,42],[-588,92],[-813,91]],
		"M" : [[-200,-209],[-1028,-257],[-385,-209],[-591,-157],[-816,-158]],
		"L" : [[-212,-467],[-1030,-517],[-387,-467],[-595,-413],[-820,-415]],
		"XL" : [[-220,-733],[-1032,-784],[-389,-733],[-599,-676],[-824,-678]],
		"2XL" : [[-225,-1002],[-1034,-1055],[-391,-1002],[-602,-946],[-827,-948]],
		"3XL" : [[-211,-1276],[-1036,-1330],[-394,-1276],[-606,-1219],[-831,-1221]]
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
	
	var fastSleevelessPlacement = {
		"XXS" : [[-398,457],[-591,449],[-803,356]],
		"XS" : [[-401,230],[-595,223],[-805,127]],
		"S" : [[-405,-7],[-598,-13],[-807,-111]],
		"M" : [[-409,-260],[-602,-265],[-809,-365]],
		"L" : [[-412,-522],[-605,-526],[-810,-630]],
		"XL" : [[-416,-786],[-609,-788],[-810,-896]],
		"2XL" : [[-419,-1054],[-612,-1056],[-810,-1166]],
		"3XL" : [[-423,-1326],[-616,-1328],[-810,-1439]]
	}
	
	var base2buttonPlacement = {
		"S" : [[-577,751],[-856,751],[-299,718],[-299,601],[-1031,648],[-1081,619],[-1162,648],[-1110,700]],
		"M" : [[-582,454],[-862,454],[-304,428],[-304,309],[-1032,384],[-1081,354],[-1163,384],[-1111,437]],
		"L" : [[-587,150],[-867,150],[-307,116],[-307,-6],[-1032,57],[-1081,27],[-1163,57],[-1111,110]],
		"XL" : [[-593,-161],[-872,-161],[-311,-194],[-311,-320],[-1032,-257],[-1081,-288],[-1163,-257],[-1112,-204]],
		"2XL" : [[-598,-479],[-877,-479],[-314,-512],[-314,-643],[-1032,-597],[-1081,-628],[-1163,-597],[-1112,-544]],
		"3XL" : [[-603,-806],[-882,-806],[-319,-844],[-319,-972],[-1033,-938],[-1081,-970],[-1163,-938],[-1113,-885]],
		"4XL" : [[-609,-1138],[-887,-1138],[-323,-1180],[-323,-1305],[-1033,-1250],[-1081,-1283],[-1164,-1250],[-1114,-1198]],
		"5XL" : [[-614,-1472],[-893,-1472],[-328,-1516],[-328,-1639],[-1034,-1595],[-1081,-1628],[-1164,-1595],[-1115,-1543]]
	}
	//////////
	//Arrays//
	//////////
	
	
	///////////////////
	//Logic Container//
	///////////////////
	
	function generateWearer(){
		var activeLayer = docRef.activeLayer.name;
		var wearerList = [];
		for(var a=0;a<layers.length;a++){
			var curLayer = layers[a].name;
			if(curLayer.substring(0,4) == "Mens"){
				wearerList.push(curLayer.substring(0,4));
			}
			else if(curLayer.substring(0,6) == "Womens"){
				wearerList.push(curLayer.substring(0,6));
			}
			else if(curLayer.substring(0,5) == "Youth"){
				wearerList.push(curLayer.substring(0,5));
			}
			else if(curLayer.substring(0,2) == "FD"){
				wearerList.push(curLayer);
			}
		}
		if (wearerList.length>1){
			if(activeLayer.substring(0,4) == "Mens"){
				wearer = "Mens";
			}
			else if(activeLayer.substring(0,6) == "Womens"){
				wearer = "Womens";
			}
			else if(activeLayer.substring(0,5) == "Youth"){
				wearer = "Youth";
			}	
			wearerLayer = docRef.activeLayer;
			
		}
		else if(wearerList.length == 1){
			wearer = wearerList[0];
			wearerLayer = layers[0];
		}
		else if(wearerList.length<1){
			alert("You're missing a necessary layer!")
			valid = false;
			return;
		}
		if(wearer != "Mens" && wearer != "Womens" && wearer != "Youth"){
			alert("wearer = " + wearer);
			alert("Please select an appropriate layer!" + ('\n') + 'Eg. "Mens 015"');
			valid = false;
			return;
		}
		prepressLayer = wearerLayer.layers.getByName("Prepress");
		smallestSize = prepressLayer.layers[0].name;
		artLayers = wearerLayer.layers.getByName("Artwork Layer");
	}
	
	function unlock(){
		wearerLayer.locked = false;
		wearerLayer.visible = true;
		wearerLayer.layers.getByName("Prepress").visible = true;
		wearerLayer.layers.getByName("Prepress").locked = false;
	}
	
	function findSmallestWidth(){
		if(smallestSize == "XXS" || smallestSize == "S"){
			smallestWidth = 10.8;
		}
		else if (smallestSize == "XS" || smallestSize == "YXS"){
			smallestWidth = 14.4;
		}
		else{
			alert("Couldn't determine the smallest garment size.");
			valid = false;
		}	
	}
	
	function placeFrontLogo(){
		var logo = artLayers.layers.getByName("Front Logo").pageItems[0];
		var logoTop = logo.top;
		var newWidth = logo.width - smallestWidth;
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var scale = (newWidth/logo.width)*100;
			var curLoc = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
			var logoResize = logo.duplicate(curLoc);
			logoResize.resize(scale,scale,true,true,true,true,00);
			logoResize.top = logoTop;
			newWidth = newWidth + 3.6;
			logoResize.name = curSize + " Front Logo";
		}
		
	}
	
	function placeFrontNumber(){
		var fNumberLoc = prompt("As viewed on the mockup, what is the location of the number?" + ('\n') + //
								"Left (1)" + ('\n') + "Center (2)" + ('\n') + "Right (3)",
								"Enter the corresponding number here...")
		
		var left;
		var fNumber = artLayers.layers.getByName("Front Number").pageItems[0];
		var nextSmallest = prepressLayer.layers[1].name;
		var secondSize = prepressLayer.layers[1].groupItems.getByName(nextSmallest + " Front").pageItems.getByName(nextSmallest + " Front Logo").height;
		var smallest = prepressLayer.layers[0].groupItems.getByName(smallestSize + " Front").pageItems.getByName(smallestSize + " Front Logo").height;
		var vertPos = secondSize - smallest;
		var top = fNumber.top + vertPos;
		
		
		if(fNumberLoc == '1'){
			left = fNumber.left + (smallestWidth/2);
			
			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				var fNumberCopy = fNumber.duplicate(dest);
				fNumberCopy.name = curSize + " Front Number";
				fNumberCopy.left = left;
				fNumberCopy.top = top;
				left = left - 1.8;
				top = fNumberCopy.top - vertPos;
			}
		}
		else if(fNumberLoc == '3'){
			left = fNumber.left - (smallestWidth / 2);

			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				var fNumberCopy = fNumber.duplicate(dest);
				fNumberCopy.name = curSize + " Front Number";
				fNumberCopy.left = left;
				fNumberCopy.top = top;
				left = left + 1.8;
				top = fNumberCopy.top - vertPos;
			}
		}
		else if(fNumberLoc == '2'){
			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				var fNumberCopy = fNumber.duplicate(dest);
				fNumberCopy.name = curSize + " Front Number";
				fNumberCopy.top = top;
				top = fNumberCopy.top - vertPos;
			}
		}
		else{
			alert("Your selection was invalid. Please undo and try again");
			valid = false;
		}
	}
	
	function placePlayerName(){
		var name = artLayers.layers.getByName("Player Name").pageItems[0];
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Back");
			var nameCopy = name.duplicate(dest);
			nameCopy.name = curSize + " Player Name";
			nameCopy.zOrder(ZOrderMethod.BRINGTOFRONT);
		}
	}
	
	function placePlayerNumber(){
		try{
			var number = artLayers.layers.getByName("Player Number").pageItems[0];
		}
		catch(e){
			var number = artLayers.layers.getByName("Back Number").pageItems[0];
		}
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Back");
			var numberCopy = number.duplicate(dest);
			numberCopy.name = curSize + " Player Number";
		}
	}
	
	function placeLeftSleeve(){
		var leftSleeve = artLayers.layers.getByName("Left Sleeve").pageItems[0];
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Left Sleeve");
			var leftCopy = leftSleeve.duplicate(dest);
			leftCopy.name = curSize + " Left Sleeve Art";
		}
	}
	
	function placeRightSleeve(){
		var rightSleeve = artLayers.layers.getByName("Right Sleeve").pageItems[0];
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Right Sleeve");
			var rightCopy = rightSleeve.duplicate(dest);
			rightCopy.name = curSize + " Right Sleeve Art";
		}
	}
	
	function placeLockerTag(){
		var lockerTag = artLayers.layers.getByName("Locker Tag").pageItems[0];
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Back");
			var lockerTagCopy = lockerTag.duplicate(dest);
			lockerTagCopy.name = curSize + " Locker Tag";
		
		}
	}
	
	function placeSponsor(){
		var sponsor = artLayers.layers.getByName("Sponsor Logo").pageItems[0];
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " Back");
			var sponsorCopy = sponsor.duplicate(dest);
			sponsorCopy.name = curSize + " Sponsor Logo"
		}
	}
	
	function placeAdditionalArt(){
		var addArt;
		var addArtLayer;
		for(var b=0;b<prepressLayer.layers.length;b++){
			if (artLayers.layers[b].visible == true && artLayers.layers[b].name == "Additional Art"){
				addArt = artLayers.layers[b].pageItems[0];
				addArtLayer = artLayers.layers[b];
				break;
			}
		}
		if(!additionalArtScale)	{	
			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " " + additionalArtLoc);
				var addArtCopy = addArt.duplicate(dest);
				addArtCopy.name = curSize + " " + additionalArt; 
			}
		}
		else if(additionalArtScale){
			addArt = artLayers.layers[b].pageItems[0];
			var newWidth = addArt.width - smallestWidth;
			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " " + additionalArtLoc);
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
			artLayers.layers.getByName("Player Name").zOrder(ZOrderMethod.SENDTOBACK);
		}
		catch(e){
		}
		for(var a=0;a<artLayers.layers.length;a++){
			var curArtLayer = artLayers.layers[a];
			if (curArtLayer.pageItems.length < 1){
				removeLayers.push(curArtLayer);
			}
			else if (curArtLayer.pageItems.length == 1 && curArtLayer.visible == true){
				if (curArtLayer.name == "Front Logo"){
					placeFrontLogo();
				}
				else if (curArtLayer.name == "Front Number" && artLayers.layers.getByName("Front Logo").pageItems.length>0){
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
		var cut = wearerLayer.layers.getByName("Information").layers[0].name;
		var coords;
		var increase;
		if(cut == "Mens Raglan"){
			coords = slowRaglanPlacement;
		}
		else if(cut == "Mens Regular"){
			coords = slowRegularPlacement;
		}
		else if(cut == "Womens Regular"){
			coords = womensSlowRegularPlacement;
		}
		else if(cut == "Womens Raglan"){
			coords = womensSlowRaglanPlacement;
		}
		else if(cut == "Youth Regular"){
			coords = youthSlowRegularPlacement;
		}
		else if(cut == "Youth Raglan"){
			coords = youthSlowRaglanPlacement;
		}
		else if(cut == "Fast_SL" || cut == "Fast_RB"){
			coords = fastSleevelessPlacement;
		}
		for(var a=0; a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var curLayer = prepressLayer.layers[a];
			for(var b=0;b<curLayer.groupItems.length;b++){
				var curGroup = curLayer.groupItems[b];
				curGroup.left = coords[curSize][b][0];
				curGroup.top = coords[curSize][b][1];
			}
		}
	}
	
	///////////////////////
	//End Logic Container//
	///////////////////////
	
	//Begin Function Callouts//
	generateWearer();
	if(valid){
		unlock();
		findSmallestWidth();
	}
	if(valid){
		addArtwork();
	}
	if(valid){
		moveArtwork();
	}

	
	
	
	
	
}
scriptContainer();