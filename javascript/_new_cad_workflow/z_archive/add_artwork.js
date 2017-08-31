#target Illustrator-18

function placeArtworkMens(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var mensLayer = layers.getByName("MENS");
	var mensSizes = [
					"XS",
					"S",
					"M",
					"L",
					"XL",
					"2XL",
					"3XL",
					"4XL",
					"5XL"
					]
	var xsHeight;
	var sHeight;
	var xlHeight;
	var vertPos;
	var displayLogoScale;
	var displayNameScale;
	var logo;
	var frontNumber;
	var number;
	var name;
	var leftLogo;
	var leftNumber;
	var rightLogo;
	var rightNumber;
	
	docRef.selection = null;
					
	function unlock(){
		mensLayer.locked = false;
		mensLayer.visible = true;
		for(a=0;a<mensSizes.length;a++){
			mensLayer.layers.getByName(mensSizes[a]).locked = false;
			mensLayer.layers.getByName(mensSizes[a]).visible = true;
		}
	}
	unlock();
	
	function placeFrontLogo(){
		if(layers.getByName("Front Logo").groupItems.length>0){
			logo = layers.getByName("Front Logo").groupItems[0];
			var logoTop = logo.top;
			var logoWidth = logo.width;
			var newWidth = logoWidth - 18;
			displayLogoScale = (220/logoWidth) * 100;
			
			
		//Place logos on all shirt sizes and resize accordingly
			for(a=0;a<mensSizes.length;a++){
				var logoResize = logo.duplicate();
				var scale = (newWidth / logoWidth)*100;
				var curLoc = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Front");
				logoResize.resize(
					scale,
					scale,
					true,
					true,
					true,
					true,
					00,
				)
				logoResize.top = logoTop;
				logoResize.moveToBeginning(curLoc);
				newWidth = newWidth + 3.6
				logoResize.name = mensSizes[a] + " Front Logo";
				if(a==0){
					xsHeight = logoResize.height;
				}
				else if(a==1){
					sHeight = logoResize.height;
				}
				else if(a==4){
					xlHeight = logoResize.height;
				}
			}
			layers.getByName("Front Logo").visible = false;
			vertPos = sHeight - xsHeight;
		}
		
	}
	placeFrontLogo();

	function placeFrontNumber(){
		if(layers.getByName("Front Number").textFrames.length >0){
			frontNumber = layers.getByName("Front Number").textFrames[0];
			var frontNumberLeft = frontNumber.left - 14.4;
			var top = frontNumber.top + (xlHeight - xsHeight);
			var x=0;
			var y=0;
			for(a=0;a<mensSizes.length;a++){
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Front");
				var frontNumberCopy = frontNumber.duplicate(dest);
				frontNumberCopy.name = mensSizes[a] + " Front Number";
				frontNumberCopy.left = frontNumberLeft + x;
				frontNumberCopy.top = top - y;
				x = x + 1.8;
				y = y + vertPos;
				
			}
			layers.getByName("Front Number").visible = false;
		}
	}
	placeFrontNumber();

	function placePlayerName(){
		if(layers.getByName("Player Name").textFrames.length >0){
			name = layers.getByName("Player Name").textFrames[0];
			displayNameScale = (260/name.width) * 100;
			for(a=0;a<mensSizes.length;a++){
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Back");
				var nameCopy = name.duplicate(dest);
				nameCopy.name = mensSizes[a] + " Player Name";
			}
			layers.getByName("Player Name").visible = false;
		}
		
	}
	placePlayerName();
	
	function placePlayerNumber(){
		if(layers.getByName("Player Number").textFrames.length>0){
			number = layers.getByName("Player Number").textFrames[0];
			for(a=0;a<mensSizes.length;a++){	
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Back");
				var numCopy = number.duplicate(dest);
				numCopy.name = (mensSizes[a] + " Player Number")
			}
			layers.getByName("Player Number").visible = false;
		}
	}
	placePlayerNumber();
	
	function placeLeftSleeve(){
		if(layers.getByName("Left Sleeve").groupItems.length>0){
			leftLogo = layers.getByName("Left Sleeve").groupItems[0];
			for(a=0;a<mensSizes.length;a++){
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Left Sleeve")
				var leftCopy = leftLogo.duplicate(dest);
				leftCopy.name = mensSizes[a] + " Left Sleeve Logo";
			}
		}
		else if(layers.getByName("Left Sleeve").textFrames.length>0){
			leftNumber = layers.getByName("Left Sleeve").textFrames[0];
			for(a=0;a<mensSizes.length;a++){
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Left Sleeve")
				var leftCopy = leftNumber.duplicate(dest);
				leftCopy.name = mensSizes[a] + " Left Sleeve Number";
			}
		}
		layers.getByName("Left Sleeve").visible = false;
	}
	placeLeftSleeve();
	
	function placeRightSleeve(){
		if(layers.getByName("Right Sleeve").groupItems.length>0){
			rightLogo = layers.getByName("Right Sleeve").groupItems[0];
			for(a=0;a<mensSizes.length;a++){
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Right Sleeve")
				var rightCopy = rightLogo.duplicate(dest);
				rightCopy.name = mensSizes[a] + " Right Sleeve Logo";
			}
		}
		else if(layers.getByName("Right Sleeve").textFrames.length>0){
			rightNumber = layers.getByName("Right Sleeve").textFrames[0];
			for(a=0;a<mensSizes.length;a++){	
				var dest = mensLayer.layers.getByName(mensSizes[a]).groupItems.getByName("Right Sleeve")
				var rightCopy = rightNumber.duplicate(dest);
				rightCopy.name = mensSizes[a] + " Right Sleeve Number";
			}
		}
		layers.getByName("Right Sleeve").visible = false;
	}
	placeRightSleeve();
	
	function makeDisplayGraphics(){
		var displayLogo = logo.duplicate(layers.getByName("Artwork"));
		displayLogo.name = "Display Logo";
		displayLogo.resize(
			displayLogoScale,
			displayLogoScale,
			true,
			true,
			true,
			true,
			00,
		)
		var DLT = -537.25 + (displayLogo.height/2); // Display Logo Top
		var DLL = 456 + ((275 - displayLogo.width)/2); //Display Logo Left
		displayLogo.top = DLT;
		displayLogo.left = DLL;
		
		if(mensLayer.layers.getByName("Player Name").textFrames.length>0){
			var displayName = name.duplicate(layers.getByName("Artwork"));
			displayName.name = "Display Name";
			displayName.resize(
				displayNameScale,
				displayNameScale,
				true,
				true,
				true,
				true,
				displayNameScale,
			)
			var DPNT = -723;
			var DPNL = 182;
			displayName.top = DPNT;
			displayName.left = DPNL;
			docRef.selection = null;
		}
	
		if(mensLayer.layers.getByName("Player Number").textFrames.length>0 //
			|| mensLayer.layers.getByName("Player Number").groupItems.length>0 //
			|| mensLayer.layers.getByName("Player Number").pathItems.length>0){
			var displayNumber = number.duplicate(layers.getByName("Artwork"));
			displayNumber.contents = "1234567890";
			displayNumber.name = "Display Number";
			var DNT = -820;
			var DNL = 170;
			displayNumber.top = DNT;
			displayNumber.left = DNL;
		}
	
	}
	makeDisplayGraphics();
}
placeArtworkMens();