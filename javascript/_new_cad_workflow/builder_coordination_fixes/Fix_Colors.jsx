function fixColors()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var swatches = docRef.swatches;

	var undesirable = ["[None]", "[Registration]", "Info B", "SEW LINE", "CUT LINE", "Thru-cut", "Jock Tag B", "EDGE", "C=3 M=0 Y=100 K=3 2", "C=3 M=0 Y=100 K=3"];

	var possibleSwatches = ["Select a Swatch", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14"];

	var tempSwatches = ["TMP1", "TMP2", "TMP3", "TMP4", "TMP5", "TMP6", "TMP7", "TMP8", "TMP9", "TMP10", "TMP11", "TMP12"];

	var swatchInfo = 
	{
		C1: {
			cyan: 100,
			magenta: 0,
			yellow: 0,
			black: 0
		},
		C2: {
			cyan: 0,
			magenta: 100,
			yellow: 0,
			black: 0
		},
		C3: {
			cyan: 0,
			magenta: 0,
			yellow: 100,
			black: 0
		},
		C4: {
			cyan: 81.9607973098755,
			magenta: 4.31369990110397,
			yellow: 100,
			black: 0.39220000617206
		},
		C5: {
			cyan: 40.3921991586685,
			magenta: 52.5489985942841,
			yellow: 0,
			black: 0
		},
		C6: {
			cyan: 0,
			magenta: 54.0428757667542,
			yellow: 99.801629781723,
			black: 0
		},
		C7: {
			cyan: 91.869992017746,
			magenta: 27.0000010728836,
			yellow: 41.4984345436096,
			black: 26.2180507183075
		},
		C8: {
			cyan: 0,
			magenta: 100,
			yellow: 55.0000011920929,
			black: 30.0000011920929
		},
		C9: {
			cyan: 41.7700439691544,
			magenta: 1.44655527547002,
			yellow: 100,
			black: 0
		},
		C10: {
			cyan: 59.7985804080963,
			magenta: 85.1071894168854,
			yellow: 0,
			black: 0
		},
		C11: {
			cyan: 100,
			magenta: 68.9999997615814,
			yellow: 0,
			black: 0
		},
		C14: {
			cyan: 9.00000035762787,
			magenta: 0,
			yellow: 0,
			black: 75.9999990463257
		},
		C13: {
			cyan: 0,
			magenta: 54.0000021457672,
			yellow: 100,
			black: 23.0000004172325
		},
		C12: {
			cyan: 81.0000002384186,
			magenta: 0,
			yellow: 81.9999992847443,
			black: 64.9999976158142
		},

		B1: {
			cyan: 100,
			magenta: 0,
			yellow: 0,
			black: 0
		},
		B2: {
			cyan: 0,
			magenta: 100,
			yellow: 0,
			black: 0
		},
		B3: {
			cyan: 0,
			magenta: 0,
			yellow: 100,
			black: 0
		},
		B4: {
			cyan: 81.9607973098755,
			magenta: 4.31369990110397,
			yellow: 100,
			black: 0.39220000617206
		},
		B5: {
			cyan: 40.3921991586685,
			magenta: 52.5489985942841,
			yellow: 0,
			black: 0
		},
		B6: {
			cyan: 0,
			magenta: 54.0428757667542,
			yellow: 99.801629781723,
			black: 0
		},
		B7: {
			cyan: 91.869992017746,
			magenta: 27.0000010728836,
			yellow: 41.4984345436096,
			black: 26.2180507183075
		},
		B8: {
			cyan: 0,
			magenta: 100,
			yellow: 55.0000011920929,
			black: 30.0000011920929
		},
		B9: {
			cyan: 41.7700439691544,
			magenta: 1.44655527547002,
			yellow: 100,
			black: 0
		},
		B10: {
			cyan: 59.7985804080963,
			magenta: 85.1071894168854,
			yellow: 0,
			black: 0
		},
		B11: {
			cyan: 100,
			magenta: 68.9999997615814,
			yellow: 0,
			black: 0
		},
		B14: {
			cyan: 9.00000035762787,
			magenta: 0,
			yellow: 0,
			black: 75.9999990463257
		},
		B13: {
			cyan: 0,
			magenta: 54.0000021457672,
			yellow: 100,
			black: 23.0000004172325
		},
		B12: {
			cyan: 81.0000002384186,
			magenta: 0,
			yellow: 81.9999992847443,
			black: 64.9999976158142
		}
	}

	var swatchNames = getSwatches();

	var obj = {};
	var swatchesToUpdate = {};

	//logic

	function getSwatches()
	{
		var result = [];
		for(var gs=0;gs<swatches.length;gs++)
		{
			var thisSwatch = swatches[gs];
			if(!isUndesirable(thisSwatch.name))
				result.push(thisSwatch.name);
		}
		return result;
	}

	function makeTempSwatch(tmpSwatch)
	{
		var newSpot = docRef.spots.add();
		newSpot.name = tmpSwatch;
		newSpot.colorType = ColorModel.SPOT;

		var newSpotColor = new SpotColor();
		newSpotColor.spot = newSpot;
		return swatches[tmpSwatch];
	}

	function makeNewSpot(name,value)
	{
		var newColor = new CMYKColor();
		newColor.cyan = value.cyan;
		newColor.magenta = value.magenta;
		newColor.yellow = value.yellow;
		newColor.black = value.black;

		var newSpot = docRef.spots.add();
		newSpot.name = name;
		newSpot.color = newColor;
		newSpot.colorType = ColorModel.SPOT;

		var newSpotColor = new SpotColor();
		newSpotColor.spot = newSpot;

	}

	function changeColors(curSwatch,newSwatch,tmp)
	{
		var result = true;

		if(tmp)
		{
			//check that there's a swatch whose name matches newSwatch
			try
			{
				swatches.getByName(newSwatch);
			}
			catch(e)
			{
				alert("Sorry. The temporary swatch: " + newSwatch + " was not properly created.. =(");
				return false;
			}
		}
		else
		{
			try
			{
				swatches.getByName(newSwatch);
			}
			catch(e)
			{
				makeNewSpot(newSwatch,swatchInfo[newSwatch]);
			}
		}

		//swatch name to hex converter
		var swatchHexConverter = 
		{
			//temp swatches
			"TMP1":"544d5031",
			"TMP2":"544d5032",
			"TMP3":"544d5033",
			"TMP4":"544d5034",
			"TMP5":"544d5035",
			"TMP6":"544d5036",
			"TMP7":"544d5037",
			"TMP8":"544d5038",
			"TMP9":"544d5039",
			"TMP10":"544d503130",
			"TMP11":"544d503131",
			"TMP12":"544d503132",

			//regular c swatches
			"C1":"4331",
			"C2":"4332",
			"C3":"4333",
			"C4":"4334",
			"C5":"4335",
			"C6":"4336",
			"C7":"4337",
			"C8":"4338",
			"C9":"4339",
			"C10":"433130",
			"C11":"433131",
			"C12":"433132",
			"C13":"433133",
			"C14":"433134",

			//bottom b colors
			"B1":"4231",
			"B2":"4232",
			"B3":"4233",
			"B4":"4234",
			"B5":"4235",
			"B6":"4236",
			"B7":"4237",
			"B8":"4238",
			"B9":"4239",
			"B10":"423130",
			"B11":"423131",
			"B12":"423132",
			"B13":"423133",
			"B14":"423134"
		}

		//applySwatchAction Function Description
		//build a dyanmic action to apply a particular swatch
		//to the selected art.
		function createApplySwatchAction(swatchHexValue,len)
		{
			var localValid = true;

			var dest = new Folder("~/Documents");
			var actionFile = new File(dest + "/merge_swatches.aia" );

			var actionString =
			[
				"/version 3",
				"/name [ 12",
				"4170706c7920537761746368",
				"]",
				"/isOpen 1",
				"/actionCount 1",
				"/action-1 {",
				"/name [ 5",
				"6d65726765",
				"]",
				"/keyIndex 0",
				"/colorIndex 0",
				"/isOpen 1",
				"/eventCount 1",
				"/event-1 {",
				"/useRulersIn1stQuadrant 0",
				"/internalName (ai_plugin_swatches)",
				"/localizedName [ 8",
				"5377617463686573",
				"]",
				"/isOpen 0",
				"/isOn 1",
				"/hasDialog 0",
				"/parameterCount 1",
				"/parameter-1 {",
				"/key 1937204072",
				"/showInPalette 4294967295",
				"/type (ustring)", 
				"/value [ " + len,
				//this is the value to change for each swatch
				swatchHexValue,
				"]",
				"}",
				"}",
				"}"
			].join("\n");

			actionFile.open("w");
			actionFile.write(actionString);
			actionFile.close();
			
			//load the action
			app.loadAction(actionFile);

			//execute the action
			app.doScript("merge","Apply Swatch");

			//delete temporary rectangle
			tempRect.remove();
			docRef.selection = null;

			try
			{
				app.unloadAction("Apply Swatch","");
			}
			catch(e)
			{
				//log.l("Failed to unload the apply swatch action.. That probably means the action didn't get created properly..");
			}

			return localValid
		}

		var hex = swatchHexConverter[newSwatch];
		var len = newSwatch.length;

		docRef.selection = null;

		var tmpLay = layers.add();
		var tempRect = tmpLay.pathItems.rectangle(0,0,5,5);
		tempRect.stroked = false;
		tempRect.fillColor = swatches[curSwatch].color;
		//select same fill color
		app.executeMenuCommand("Find Fill Color menu item");

		createApplySwatchAction(hex,len);
		tmpLay.remove();
	}

	function makeAssets(curGroup,repGroup)
	{
		swatchNames.unshift("Select a Swatch");
		for(var cs=0;cs<swatches.length;cs++)
		{
			var thisSwatch = swatches[cs];
			var name = thisSwatch.name;
			if(isUndesirable(thisSwatch.name))continue;
			obj[name] = {};
			obj[name].group = container.add("group");
			obj[name].swatch = swatches[cs];
			obj[name].dispTxt = obj[name].group.add("statictext", undefined, thisSwatch.name);
			obj[name].repSwatch = obj[name].group.add("dropdownlist", undefined, possibleSwatches);
			obj[name].repSwatch.selection = 0;
		}
	}

	function isUndesirable(swatch)
	{
		var result = false;
		for(var u=0;u<undesirable.length && !result;u++)
		{
			var thisUndesirable = undesirable[u];
			if(swatch == thisUndesirable)result = true;
		}
		return result;
	}

	function finishUp()
	{
		var result = {};
		//loop the obj object and pull out any swatches
		//that the user deemed 'needs changing'
		for(var prop in obj)
		{
			//check whether this swatch needs to be updated
			if(obj[prop].repSwatch.selection.text != "Select a Swatch")
			{
				result[prop] = {};
				result[prop].newSwatch = obj[prop].repSwatch.selection.text;
				result[prop].newSwatchValue = swatchInfo[prop];
			}
		}
		swatchesToUpdate = result;
	}

	//logic


	//code up that dialog
	var w = new Window("dialog", "Set up the swatch relationships.");
		w.preferredSize = [500,""];

		//container group that holds the side by side columns
		//each column will be a subgroup of the container group
		var container = w.add("group");
			container.orientation = "column";


			//create an static text frame for each swatch in the document
			//followed by a horizontal separator
			//create a corresponding dropdown list for each static text frame
			//that will represent what color the swatch should be changed to
			makeAssets();

		var btnGroup = w.add("group");
			var submit = btnGroup.add("button", undefined, "Submit");
				submit.onClick = function()
				{
					finishUp();
					w.close();
				}
			var cancel = btnGroup.add("button", undefined, "Cancel");
				cancel.onClick = function()
				{
					w.close();
				}
	w.show();

	var ppLay = layers[0].layers["Prepress"];
	ppLay.visible = true;

	var tmpSwatchCounter = 0;
	//change each swatch to a temporarry swatch
	for(var prop in swatchesToUpdate)
	{
		var thisProp = swatchesToUpdate[prop];
		thisProp.tmpSwatch = tempSwatches[tmpSwatchCounter];
		var tempSwatch = makeTempSwatch(tempSwatches[tmpSwatchCounter]);
		changeColors(prop,tempSwatch.name,true);
		tmpSwatchCounter++;
	}

	//now switch all the swatches back to their correct c value
	for(var prop in swatchesToUpdate)
	{
		var thisProp = swatchesToUpdate[prop];
		var thisTempSwatch = thisProp.tmpSwatch;
		changeColors(thisTempSwatch,thisProp.newSwatch,false);
		swatches[thisTempSwatch].remove();
	}

	ppLay.visible = false;

	

	
}
fixColors();