//Add Artwork 4.0
//Author William Dowling
//Rebuilt from v3.0 to accomodate standardized layer names and variable additional artwork scaling.
//Built: 09/18/15

#target Illustrator

function scriptContainer(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var valid = true;
	var wearerLayer;
	var prepressLayer;
	var smallestSize;
	var smallestWidth;
	var smallestScale;
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
	
	var youth2buttonPlacement = {
		"YS" : [[-480,-2],[-673,-2],[-293,-25],[-293,-125],[-795,-74],[-839,-99],[-904,-74],[-861,-20]],
		"YM" : [[-483,-241],[-676,-241],[-295,-264],[-295,-365],[-795,-348],[-838,-375],[-904,-348],[-862,-291]],
		"YL" : [[-488,-491],[-681,-491],[-298,-517],[-298,-621],[-801,-596],[-844,-625],[-909,-596],[-868,-541]],
		"YXL" : [[-492,-751],[-685,-751],[-300,-781],[-300,-886],[-803,-853],[-845,-884],[-911,-853],[-871,-799]]
	}
	
	var baseFullButtonPlacement = {
		"S" : [[-887,727],[-248,703],[-248,587],[-518,734],[-716,727],[-1020,728],[-1099,728],[-1234,618]],
		"M" : [[-890,432],[-250,409],[-250,288],[-523,439],[-718,432],[-1021,432],[-1100,432],[-1235,319]],
		"L" : [[-892,129],[-254,105],[-254,-18],[-528,136],[-721,129],[-1021,129],[-1100,129],[-1235,13]],
		"XL" : [[-895,-182],[-257,-204],[-257,-331],[-533,-174],[-724,-182],[-1021,-181],[-1100,-181],[-1236,-300]],
		"2XL" : [[-898,-499],[-261,-522],[-261,-652],[-538,-492],[-726,-499],[-1021,-499],[-1100,-499],[-1236,-621]],
		"3XL" : [[-901,-824],[-266,-853],[-266,-980],[-543,-816],[-729,-824],[-1022,-823],[-1101,-823],[-1237,-949]],
		"4XL" : [[-903,-1155],[-271,-1188],[-271,-1311],[-550,-1148],[-732,-1155],[-1022,-1155],[-1101,-1155],[-1237,-1281]],
		"5XL" : [[-906,-1487],[-277,-1523],[-277,-1643],[-555,-1480],[-735,-1487],[-1023,-1487],[-1102,-1487],[-1238,-1613]]
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
			if(curLayer.substring(0,2) == "FD"){
				wearerList.push(layers[a]);
			}
			else if(curLayer.substring(0,2) == "Me" || curLayer.substring(0,2) == "Wo" || curLayer.substring(0,2) == "Yo"){
				wearerList.push(layers[a]);
			}
		}
		if (wearerList.length>1){
			wearerLayer = docRef.activeLayer;
		}
		else if(wearerList.length == 1){
			wearerLayer = layers[0];
		}
		else if(wearerList.length<1){
			alert("You're missing a necessary layer!")
			valid = false;
			return;
		}
		if(wearerLayer.name.substring(0,2)!="FD" && wearerLayer.name.substring(0,2)!="Me" &&//
			wearerLayer.name.substring(0,2)!="Wo" && wearerLayer.name.substring(0,2)!="Yo"){
			alert("Please select an appropriate layer!" + ('\n') + 'Eg. "FD_SLOW_015"');
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
		if(smallestSize == "XXS" || smallestSize == "S" || smallestSize == "YS"){
			smallestWidth = 10.8;
			smallestScale = 3;
		}
		else if (smallestSize == "XS" || smallestSize == "YXS"){
			smallestWidth = 14.4;
			smallestScale = 4;
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
			if(wearerLayer.name.substring(0,13) != "FD_BASE_FB_SS"){
				var curLoc = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				var logoResize = logo.duplicate(curLoc);
				logoResize.resize(scale,scale,true,true,true,true,00);
				logoResize.top = logoTop;
				newWidth = newWidth + 3.6;
				logoResize.name = curSize + " Front Logo";
			}
			else{
				var curLocLeft = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Left Front");
				var curLocRight = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Right Front");
				var logoResize = logo.duplicate(curLocLeft);
				logoResize.resize(scale,scale,true,true,true,true,00);
				logoResize.top = logoTop;
				logoResize.name = curSize + " Left Front Logo";
				
				logoResize = logo.duplicate(curLocRight);
				logoResize.resize(scale,scale,true,true,true,true,00);
				logoResize.top = logoTop;
				logoResize.name = curSize + " Right Front Logo";
				
				newWidth = newWidth + 3.6;
			}
		}
		
	}
	
	function placeFrontNumber(){
		var fNumberLoc = prompt("As viewed on the mockup, what is the location of the number?" + ('\n') + //
								"Left (1)" + ('\n') + "Center (2)" + ('\n') + "Right (3)",
								"Enter the corresponding number here...")
		
		var left;
		var fNumber = artLayers.layers.getByName("Front Number").pageItems[0];
		var nextSmallest = prepressLayer.layers[1].name;
		if(wearerLayer.name.substring(0,13)!= "FD_BASE_FB_SS"){
			var secondSize = prepressLayer.layers[1].groupItems.getByName(nextSmallest + " Front").pageItems.getByName(nextSmallest + " Front Logo").height;
			var smallest = prepressLayer.layers[0].groupItems.getByName(smallestSize + " Front").pageItems.getByName(smallestSize + " Front Logo").height;
		}
		else if(wearerLayer.name.substring(0,13) == "FD_BASE_FB_SS" && fNumberLoc == 1){
			var secondSize = prepressLayer.layers[1].groupItems.getByName(nextSmallest + " Right Front").pageItems.getByName(nextSmallest + " Right Front Logo").height;
			var smallest = prepressLayer.layers[0].groupItems.getByName(smallestSize + " Right Front").pageItems.getByName(smallestSize + " Right Front Logo").height;
		}
		else if (wearerLayer.name.substring(0,13) == "FD_BASE_FB_SS" && fNumberLoc == 3){
			var secondSize = prepressLayer.layers[1].groupItems.getByName(nextSmallest + " Left Front").pageItems.getByName(nextSmallest + " Left Front Logo").height;
			var smallest = prepressLayer.layers[0].groupItems.getByName(smallestSize + " Left Front").pageItems.getByName(smallestSize + " Left Front Logo").height;
		}
		var vertPos = secondSize - smallest;
		var top = fNumber.top + vertPos;
		
		
		if(fNumberLoc == '1'){
			left = fNumber.left + (smallestWidth/2);
			
			for(var a=0;a<prepressLayer.layers.length;a++){
				var curSize = prepressLayer.layers[a].name;
				if(wearerLayer.name.substring(0,13)!= "FD_BASE_FB_SS"){
					var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				}
				else{
					var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Right Front");
				}
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
				if(wearerLayer.name.substring(0,13)!= "FD_BASE_FB_SS"){
					var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Front");
				}
				else{
					var dest = prepressLayer.layers.getByName(curSize).groupItems.getByName(curSize + " Left Front");
				}
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
			return;
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
		var addscale = ((additionalArtScale * 72)/10);
		for(var b=0;b<prepressLayer.layers.length;b++){
			if (artLayers.layers[b].name == "Additional Art" && artLayers.layers[b].visible == true){
				addArt = artLayers.layers[b].pageItems[0];
				addArtLayer = artLayers.layers[b];
				break;
			}
		}
		addArt = artLayers.layers[b].pageItems[0];
		var newWidth = addscale * smallestScale;
		newWidth = addArt.width - newWidth;
		for(var a=0;a<prepressLayer.layers.length;a++){
			var curSize = prepressLayer.layers[a].name;
			var dest = prepressLayer.layers[a].groupItems.getByName(curSize + " " + additionalArtLoc); 
			var scale = (newWidth / addArt.width)*100;
			var addArtCopy = addArt.duplicate(dest);
			addArtCopy.resize(scale,scale,true,true,true,true,00);
			newWidth = newWidth + addscale;
			addArtCopy.name = curSize + " Additional Art";
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
				if (curArtLayer.name == "Additional Art"){
					docRef.selection = null;
					curArtLayer.pageItems[0].selected = true;
					app.redraw();
					additionalArt = prompt("Enter description of highlighted artwork.", "e.g. Sponsor Info, Ghosted Image, etc");
					additionalArtLoc = prompt("Enter the shirt piece where the artwork will be placed." + ('\n') + "Please use title case", "e.g. Front, Back, Left Sleeve, Right Sleeve");
					additionalArtScale = prompt("How much do you want to scale the artwork, in inches?" + ('\n') + "Enter number between 0 and 1" + ('\n') + "1 = 1 inch" + ('\n') + ".5 = 1/2 inch", "Enter 0 for no scaling");
					additionalArt = Number(additionalArt);
					if(additionalArt == null || additionalArtLoc == null || additionalArtScale == null){
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
				else if (curArtLayer.name == "Front Logo"){
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
		if(cut.substring(cut.length-11,cut.length) == "Mens Raglan"){
			coords = slowRaglanPlacement;
		}
		else if(cut.substring(cut.length-12,cut.length) == "Mens Regular"){
			coords = slowRegularPlacement;
		}
		else if(cut.substring(cut.length-14,cut.length) == "Womens Regular"){
			coords = womensSlowRegularPlacement;
		}
		else if(cut.substring(cut.length-13,cut.length) == "Womens Raglan"){
			coords = womensSlowRaglanPlacement;
		}
		else if(cut.substring(cut.length-13,cut.length) == "Youth Regular"){
			coords = youthSlowRegularPlacement;
		}
		else if(cut.substring(cut.length-12,cut.length) == "Youth Raglan"){
			coords = youthSlowRaglanPlacement;
		}
		else if(cut.substring(cut.length-7,cut.length) == "Fast_SL" || cut.substring(cut.length-7,cut.length) == "Fast_RB"){
			coords = fastSleevelessPlacement;
		}
		else if(cut == "FD_BASE_2B_SS_"){
			coords = base2buttonPlacement;
		}
		else if(cut == "FD_BASE_2B_Y_"){
			coords = youth2buttonPlacement;
		}
		else if(cut == "FD_BASE_FB_SS_"){
			coords = baseFullButtonPlacement;
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