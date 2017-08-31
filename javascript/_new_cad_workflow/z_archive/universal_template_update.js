#target Illustrator-18

//Build Mockup/Prepress Template from current spread out CADs
//version 2.0
//Author: William Dowling
//Updated:9/1/15

/*
// Instructions for use:
	Open Blank Template file and place all shirt pieces of desired CAD onto "To Be Placed" layer.
	Run Script
	Folow Prompts 
*/
	
//Begin Script Container

function scriptContainer(){

	////////////////////
	//Global Variables//
	////////////////////
	
	//Related to Prompts//
	var valid = true;
	var whosWearing;
	var whatStyle;
	
	//Related to Template Creation
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var groups = layers.getByName("To Be Placed").groupItems;
	var groupList = [];
	var temp = [];
	var sortedRow = [];
	var finalSorted = [];
	var buffer = 160;
	
	//Defined by userAnswers
	var coords;
	var wearer; //this is mens/womens/youth
	var wearerLayer;
	var prepressLayer;
	var styleNumber;
	var style; // slowpitch, racerback etc
	var descriptor;
	var targetLayer;
	var mockupSize;
	var artLoc;
	
	//Possible variables
	 
	
	
	////////////////////
	//COORDS CONTAINER//
	////////////////////
	var mensSlowRegCoords = { //updated sleeves between front and back shirt pieces
		"XS" : [[74,-97],[536,-90],[309,-280],[480,-760],[310,-114]],
		"S" : [[69,-94],[530,-88],[306,-278],[480,-760],[307,-112]],
		"M" : [[63,-92],[525,-86],[303,-276],[480,-760],[304,-110]],
		"L" : [[58,-89],[519,-84],[301,-274],[480,-760],[302,-108]],
		"XL" : [[52,-86],[514,-83],[298,-272],[480,-760],[299,-106]],
		"2XL" : [[47,-83],[509,-81],[295,-271],[480,-760],[296,-105]],
		"3XL" : [[41,-81],[503,-79],[292,-269],[480,-760],[293,-103]],
		"4XL" : [[37,-78],[498,-77],[289,-267],[480,-760],[290,-101]],
		"5XL" : [[31,-75],[492,-76],[286,-266],[480,-760],[287,-99]],
		"Sizes" : ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
	};
	
	var mensSlowRagCoords = { //updated sleeves between front and back shirt pieces
		"XS" : [[75,-97],[537,-90],[312,-249],[480,-760],[312,-83]],
		"S" : [[70,-95],[531,-88],[310,-242],[480,-760],[309,-76]],
		"M" : [[64,-92],[526,-86],[307,-235],[480,-760],[307,-69]],
		"L" : [[59,-90],[520,-85],[305,-229],[480,-760],[305,-63]],
		"XL" : [[53,-88],[515,-83],[303,-222],[480,-760],[303,-56]],
		"2XL" : [[48,-86],[510,-81],[301,-215],[480,-760],[301,-49]],
		"3XL" : [[42,-82],[504,-80],[299,-208],[480,-760],[298,-42]],
		"4XL" : [[38,-82],[499,-78],[296,-200],[480,-760],[296,-34]],
		"5XL" : [[32,-79],[493,-76],[294,-194],[480,-760],[293,-28]],
		"Sizes" : ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
	};
	
	var womensSlowRegCoords = {
		"XXS" : [[83,-107],[545,-96],[327,-283],[480,-760],[328,-117]],
		"XS" : [[80,-104],[541,-96],[324,-284],[480,-760],[325,-118]],
		"S" : [[76,-97],[537,-94],[320,-285],[480,-760],[321,-119]],
		"M" : [[73,-95],[534,-92],[317,-284],[480,-760],[318,-118]],
		"L" : [[69,-91],[530,-91],[316,-283],[480,-760],[317,-117]],
		"XL" : [[66,-89],[526,-89],[313,-282],[480,-760],[314,-116]],
		"2XL" : [[62,-86],[523,-87],[311,-280],[480,-760],[312,-114]],
		"3XL" : [[58,-84],[519,-85],[309,-279],[480,-760],[310,-113]],
		"Sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
	};
	
	var womensSlowRagCoords = {
		"XXS" : [[84,-110],[547,-102],[319,-249],[480,-760],[319,-82]],
		"XS" : [[80,-107],[543,-100],[317,-248],[480,-760],[317,-81]],
		"S" : [[76,-105],[539,-98],[316,-247],[480,-760],[315,-80]],
		"M" : [[73,-103],[536,-96],[313,-244],[480,-760],[313,-77]],
		"L" : [[69,-100],[532,-94],[312,-240],[480,-760],[311,-74]],
		"XL" : [[65,-97],[528,-93],[310,-238],[480,-760],[310,-71]],
		"2XL" : [[62,-95],[525,-91],[307,-233],[480,-760],[307,-66]],
		"3XL" : [[58,-93],[521,-89],[305,-230],[480,-760],[305,-63]],
		"Sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
}
	
	var youthSlowRegCoords = {
		"YXS" : [[90,-110],[551,-109],[329,-309],[480,-760],[329,-140]],
		"YS" : [[86,-108],[547,-108],[325,-305],[480,-760],[324,-136]],
		"YM" : [[81,-106],[542,-106],[322,-301],[480,-760],[321,-132]],
		"YL" : [[77,-104],[538,-104],[318,-296],[480,-760],[318,-127]],
		"YXL" : [[72,-101],[533,-102],[314,-290],[480,-760],[314,-121]],
		"Sizes" : ["YXS", "YS", "YM", "YL", "YXL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
	}
	
	var youthSlowRagCoords = {
		"YXS" : [[90,-120],[554,-117],[329,-269],[480,-760],[329,-103]],
		"YS" : [[86,-119],[550,-115],[325,-263],[480,-760],[325,-97]],
		"YM" : [[81,-116],[545,-113],[322,-257],[480,-760],[322,-91]],
		"YL" : [[77,-114],[541,-111],[318,-248],[480,-760],[318,-82]],
		"YXL" : [[72,-111],[536,-109],[314,-240],[480,-760],[314,-74]],
		"Sizes" : ["YXS", "YS", "YM", "YL", "YXL"],
		"Pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"]
	};	
	
	var mensHoodieCoords = {
		"S" : [[-15,-27],[236,-26],[14,-617],[12,-330],[49,-535],[234,-330],[268,-535],[487,-4],[487,-158],[590,-4],[590,-158],[292,-643]],
		"M" : [[-20,-24],[231,-22],[12,-616],[6,-326],[47,-535],[228,-326],[266,-535],[484,-4],[484,-158],[590,-4],[590,-158],[282,-643]],
		"L" : [[-26,-18],[226,-18],[10,-616],[1,-322],[46,-535],[223,-322],[265,-535],[480,-4],[480,-157],[590,-4],[590,-157],[271,-643]],
		"XL" : [[-31,-15],[220,-15],[8,-615],[-3,-318],[44,-535],[219,-318],[262,-535],[476,-4],[476,-157],[590,-4],[590,-157],[258,-643]],
		"2XL" : [[-36,-11],[215,-11],[6,-614],[-8,-314],[43,-535],[214,-314],[259,-535],[473,-2],[473,-155],[590,-2],[590,-155],[246,-643]],
		"3XL" : [[-42,-8],[209,-8],[4,-613],[-13,-310],[42,-535],[209,-310],[258,-535],[469,-2],[469,-155],[590,-2],[590,-155],[239,-643],[454,-643]],
		"4XL" : [[-47,-4],[204,-4],[2,-612],[-18,-306],[40,-535],[205,-306],[257,-535],[465,0],[465,-153],[590,0],[590,-153],[214,-643],[442,-643]],
		"5XL" : [[-52,0],[199,0],[0,-611],[-22,-302],[39,-535],[200,-302],[256,-535],[461,2],[461,-151],[590,2],[590,-151],[205,-643],[440,-643]],
		"Sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"Pieces" : 	["Front", "Back", "Pocket", "Right Sleeve", "Right Cuff", "Left Sleeve", "Left Cuff", 
					"Right Outside Hood", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Waistband", "Waistband 2"]
	};
	
	var fastSleevelessCoords = {
		"XXS" : [[470,-758],[142,-110],[486,-102]],
		"XS" : [[468,-758],[138,-107],[483,-100]],
		"S" : [[466,-758],[135,-105],[479,-99]],
		"M" : [[464,-758],[131,-102],[475,-97]],
		"L" : [[463,-758],[128,-99],[472,-95]],
		"XL" : [[463,-758],[124,-95],[468,-93]],
		"2XL" : [[463,-758],[121,-93],[465,-91]],
		"3XL" : [[463,-758],[117,-91],[461,-89]],
		"Sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"Pieces" : [ "Collar", "Front", "Back"]
	};	
	
	var fastRacerbackCoords = {
		"XXS" : [[470,-758],[144,-110],[488,-116]],
		"XS" : [[468,-758],[140,-107],[484,-111]],
		"S" : [[466,-758],[137,-105],[481,-107]],
		"M" : [[464,-758],[133,-103],[477,-103]],
		"L" : [[463,-758],[129,-100],[474,-99]],
		"XL" : [[463,-758],[126,-98],[470,-95]],
		"2XL" : [[463,-758],[122,-95],[466,-90]],
		"3XL" : [[463,-758],[119,-92],[463,-85]],
		"Sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"Pieces" : [ "Collar", "Front", "Back"]
	}
	
	var mens2buttonCoords = {
		"S" : [[511,-756],[297,-183],[365,-212],[406,-183],[302,-281],[302,-97],[63,-86],[524,-79]],
		"M" : [[510,-755],[296,-182],[365,-212],[405,-182],[297,-279],[297,-95],[58,-83],[519,-77]],
		"L" : [[510,-755],[296,-182],[365,-212],[405,-182],[294,-275],[294,-91],[53,-84],[514,-77]],
		"XL" : [[509,-754],[296,-181],[365,-212],[404,-181],[291,-270],[291,-87],[48,-82],[508,-75]],
		"2XL" : [[509,-754],[296,-180],[365,-211],[404,-180],[287,-267],[287,-84],[43,-81],[503,-75]],
		"3XL" : [[508,-754],[295,-179],[365,-211],[404,-179],[282,-270],[282,-86],[38,-79],[498,-75]],
		"4XL" : [[507,-754],[295,-178],[365,-211],[403,-178],[278,-272],[278,-89],[32,-77],[492,-75]],
		"5XL" : [[506,-754],[294,-178],[365,-211],[403,-178],[273,-275],[273,-91],[27,-75],[486,-75]],
		"Sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"Pieces" : ["Collar", "Left Placard", "Center Placard", "Right Placard", "Right Sleeve", "Left Sleeve", "Front", "Back"]
	}
	
	
	////////////////////
	//COORDS CONTAINER//
	////////////////////
	
	/////////////////////
	//Artwork Locations//
	/////////////////////
	
	var slowPitchArt = ["Front Logo", 
						"Front Number",  
						"Player Name",
						"Back Number", 
						"Left Sleeve", 
						"Right Sleeve", 
						"Locker Tag", 
						"Sponsor Logo", 
						"Additional Art"];
	var hoodieArt = 	["Front Logo",
						"Front Number",
						"Player Name",
						"Back Number",
						"Left Sleeve",
						"Right Sleeve",
						"Locker Tag",
						"Sponsor Logo",
						"Right Hood",
						"Left Hood",
						"Front Pocket",
						"Additional Art"];
	var fastPitchArt =  ["Front Logo",
						"Front Number",
						"Player Name",
						"Back Number",
						"Locker Tag",
						"Sponsor Logo",
						"Additional Art"];

		
	
	/////////////////////////
	//Begin Logic Container//
	/////////////////////////
	
	//Prompt User for Garment and Wearer

	function garment(){
		var invalidAlert = "Sorry, Your selection was invalid.";
		var info = layers.getByName("Information").layers.add();
		whosWearing = 	prompt("Gender?" + ('\n') +
								"Mens (1)" + ('\n') +
								"Womens (2)" +('\n') +
								"Youth (3)",
								
								//default answer
								"Enter the number here..."
								)
		if (whosWearing == 1){//User Answered Mens
			//prompt for the kind of garment
			whatStyle = 	prompt("What Kind of Garment?" + ('\n') +
							"Slowpitch (1)" + ('\n') +
							"Hoodie (2)" + ('\n') + 
							"2Button (3)",
							"Enter the number for the garment here..."//default answer
							)
			mockupSize = "XL";
			if(whatStyle == 1){//User Answered Slowpitch
				wearer = "FD_SLOW_";
				var whichCut = 	prompt("Regular or Raglan?" + ('\n') + 
							"Regular (1)" + ('\n') + "Raglan (2)",
							"Enter the number for the cut here...");
				if(whichCut==1){
					coords = mensSlowRegCoords;
					info.name = wearer + "Mens Regular";
				}
				else if(whichCut==2){
					coords = mensSlowRagCoords;
					info.name = wearer + "Mens Raglan";
				}
				
				style = "_SLOW_SS";
				descriptor = "FULL DYE MENS SLOW PITCH SHORT SLEEVE";
				artLoc = slowPitchArt;
			}
			else if(whatStyle ==2){//User answered hoodie
				wearer = "FDMH_";
				coords = mensHoodieCoords;
				style = "MH";
				descriptor = "FULL DYE " + wearer + " HOODIE";
				artLoc = hoodieArt;
				info.name = wearer;
			}
			else if(whatStyle == 3){
				wearer = "FD_BASE_2B_SS_";
				coords = mens2buttonCoords;
				style = "_BASE_2B";
				descriptor = "FULL DYE MENS 2BUTTON";
				artLoc = slowPitchArt;
				info.name = wearer;
				
			}
			else{
				alert(invalidAlert);
				valid = false;
				return;
			}
		}
		else if(whosWearing == 2){
			whatStyle = prompt("What Kind of Garment?" + ('\n') +
							"Slowpitch (1)" + ('\n') +
							"Fastpitch (2)",
							"Enter the number for the garment here..."//default answer
							)
			if(whatStyle == 1){
				wearer = "FD_SLOWW_"
				var whichCut = prompt	("Regular or Raglan?" + ('\n') +
									"Regular (1)" + ('\n') +
									"Raglan (2)",
									"Enter the number for the cut here");
				if(whichCut==1){
					coords = womensSlowRegCoords;
					info.name = wearer + "Womens Regular";
				}
				else if (whichCut==2){
					coords = womensSlowRagCoords;
					info.name = wearer + "Womens Raglan";
				}
				else{
					alert(invalidAlert);
					valid = false;
					return;
				}
				
				mockupSize = "M";
				style = "_SLOWW_SS";
				descriptor = "FULL DYE WOMENS SLOW PITCH SHORT SLEEVE";
				artLoc = slowPitchArt;
			}
			else if(whatStyle == 2){
				var whichCut = prompt("Sleeveless or Racerback?" + ('\n') +
										"Sleeveless (1)" + ('\n') + 
										"Racerback (2)",
										"Enter number for style here"
							)
				if(whichCut == 1){
					wearer = "FD_FAST_SL_";
					coords = fastSleevelessCoords;
					info.name = wearer;;
					style = "_FAST_SL";
					descriptor = "FULL DYE WOMENS FASTPITCH SLEEVELESS";
				}
				else if(whichCut == 2){
					wearer = "FD_FAST_RB_";
					coords = fastRacerbackCoords;
					info.name = wearer;
					style = "_FAST_RB";
					descriptor = "FULL DYE WOMENS FASTPITCH RACERBACK";
				}
				else{
					alert(invalidAlert)
					valid = false;
					return;
				}
				mockupSize = "M";
				artLoc = fastPitchArt;
				
				
			}
			else{
				alert(invalidAlert);
			}
		}
		else if(whosWearing == 3){
			whatStyle = prompt("What Kind of Garment?" + ('\n') +
							"Slowpitch (1)",
							"Enter the number for the garment here..."//default answer
							)
			if(whatStyle == 1){
				wearer = "FD_SLOWY_"
				var whichCut = prompt	("Regular or Raglan?" + ('\n') +
									"Regular (1)" + ('\n') +
									"Raglan (2)",
									"Enter the number for the cut here");
				if(whichCut ==1){
					coords = youthSlowRegCoords;
					info.name = "Youth Regular";
				}
				else if(whichCut == 2){
					coords = youthSlowRagCoords;
					info.name = "Youth Raglan";
				}
				mockupSize = "YXL";
				style = "_SLOWY_SS";
				descriptor = "FULL DYE YOUTH SLOW PITCH SHORT SLEEVE";
				artLoc = slowPitchArt;

			}
			else{
				alert(invalidAlert);
			}
		}
		else {
			alert(invalidAlert);
			valid = false;
			return;
		}
		styleNumber = prompt("What's the style number?", "000");
		try{
			wearerLayer = layers.getByName(wearer + " " + styleNumber);
		}
		catch(e){
			wearerLayer = layers.add();
			wearerLayer.name = wearer + styleNumber;
		}
	}
	
	function groupPush(){
		if(layers.getByName("To Be Placed").pathItems.length>0 ||//
			layers.getByName("To Be Placed").textFrames.length>0 ||//
			layers.getByName("To Be Placed").compoundPathItems.length>0){
				alert("Make sure the shirt pieces are grouped properly");
				valid = false;
			}
		for(var a=0;a<groups.length;a++){
			groupList.push(groups[a]);
		}
	}
	
	function getRow(){
		while(groupList.length > 0){
			var sortH = [];
			temp = [];
			var rowMarker = groupList[0];
			var top = rowMarker.visibleBounds[1];
			var bot = rowMarker.visibleBounds[3];
			var compare = (top - (rowMarker.height/2));
			temp.push(rowMarker);
			groupList.splice(0,1);
			for(var r=groupList.length-1;r>-1;r--){
				var curGroup = groupList[r];
				var cGTop = curGroup.visibleBounds[1];
				var cGBot = curGroup.visibleBounds[3];
				var vCenter = (cGTop - (curGroup.height/2));
				if(vCenter + buffer > compare && vCenter - buffer < compare){
					temp.push(curGroup);
					groupList.splice(r,1);
				}
			}
	
			for(var s=temp.length-1;s>-1;s--){
				var placeholder = 0;
				var farLeft;
				var deleteIndex;
				docRef.selection = null;
				for(var a=0;a<temp.length;a++){
					if(placeholder ==0){
						placeholder = temp[a].visibleBounds[0];
						farLeft = temp[a];
						deleteIndex = a;
					}
					else if(temp[a].visibleBounds[0]<placeholder){
						placeholder = temp[a].visibleBounds[0];
						farLeft = temp[a];
						deleteIndex = a;
					}
				}
				sortH.push(farLeft);
				temp.splice(deleteIndex,1);
			}
	
			if(sortH.length>0){
				sortedRow.push(sortH);
			}
			else if(sortH.length<1){
				alert("nothing was added to sortH");
			}
		}
				}
				
	function vSort(){
		for(var v=sortedRow.length-1;v>-1;v--){
			var placeholder = 0;
			var topRow;
			var deleteIndex;
			for(var s=0;s<sortedRow.length;s++){
				if(placeholder == 0){
					placeholder = sortedRow[s][0].visibleBounds[1];
					topRow = sortedRow[s];
					deleteIndex = s;
				}
				else if(sortedRow[s][0].visibleBounds[1] > placeholder){
					placeholder = sortedRow[s][0].visibleBounds[1];
					topRow = sortedRow[s];
					deleteIndex = s;
				}
			}
	
			finalSorted.push(topRow);
			sortedRow.splice(deleteIndex,1);
		}
		if(finalSorted.length<1){
			alert("nothing in finalSorted");
		}
	}
	
	function placeOnTemplate(){
		try{
			prepressLayer = wearerLayer.layers.getByName("Prepress");
			targetLayer = prepressLayer;
		}
		catch(e){
			prepressLayer = wearerLayer.layers.add();
			prepressLayer.name = "Prepress";
			targetLayer = prepressLayer;
		}
		
		for (var a=0;a<finalSorted.length;a++){
			targetLayer.locked = false;
			var curRow = finalSorted[a];
			var curSize = coords["Sizes"][a];
			var sizeLayer;
			for(var b=0;b<curRow.length;b++){
				var curGroup = curRow[b];
				try{
					sizeLayer = targetLayer.layers.getByName(curSize);
				}
				catch(e){
					sizeLayer = targetLayer.layers.add();
					sizeLayer.name = curSize;
				}
				targetLayer.locked = false;
				targetLayer.visible = true;
				sizeLayer.zOrder (ZOrderMethod.SENDTOBACK);
				curGroup.left = coords[curSize][b][0];
				curGroup.top = coords[curSize][b][1];
				curGroup.moveToBeginning(sizeLayer);
				curGroup.name = curSize + " " + coords["Pieces"][b];
			}
		}
		layers.getByName("To Be Placed").remove();
	}
	
	function writeInfo(){
		var info = layers.getByName("Information");
		info.locked = false;
		var garmentCode = info.textFrames.getByName("Garment Code");
		garmentCode.contents = "FD" + style + "_|" + styleNumber + "|";
		var description = info.textFrames.getByName("Garment Description");
		description.contents = descriptor;
		info.name = "Information";
		info.moveToBeginning(wearerLayer);
		info.zOrder(ZOrderMethod.SENDTOBACK);
		info.locked = true;
		
	}
	
	function clipPaths(){
		var clipLayer = layers.getByName("Clip Paths")
		clipLayer.locked = false;
		clipLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
		var sourceLayer = prepressLayer.layers.getByName(mockupSize);
		for(var a=sourceLayer.groupItems.length-1;a>-1;a--){
			var curObject = sourceLayer.groupItems[a];
			if (curObject.name != mockupSize + " Collar" && curObject.name != mockupSize + " Left Placard" //
				&& curObject.name != mockupSize + " Center Placard" && curObject.name != mockupSize + " Right Placard"){
				curObject.duplicate(clipLayer);
				clipLayer.groupItems[0].zOrder(ZOrderMethod.SENDTOBACK);
			}
		}
		clipLayer.name = "Mockup";
		clipLayer.moveToBeginning(wearerLayer);
	}
	
	function artworkLayers(){
		try{
			var artLayer = layers.getByName("Artwork Layer");
			artLayer.locked = false;
			artLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
		}
		catch(e){
			var artLayer = layers.add();
			artLayer.name = "Artwork Layer";
			artLayer.zOrder(ZOrderMethod.BRINGTOFRONT);
		}
		for(var a=artLoc.length-1;a>-1;a--){
			try{
				var curLayer = artLayer.layers.getByName(artLoc[a]);
			}
			catch(e){
				var curLayer = artLayer.layers.add();
				curLayer.name = artLoc[a];
			}
		}
		artLayer.moveToBeginning(wearerLayer);
		prepressLayer.visible = false;
	}
	
	
	/////////////////////////
	//Begin script callouts//
	/////////////////////////
	
	garment();
	if(valid){
		groupPush();
	}
	if(valid){
		getRow();
		vSort();
		placeOnTemplate();
		writeInfo();
		clipPaths();
		artworkLayers();
	}//end if valid
	
} // end scriptContainer();

scriptContainer();