//Add DR Collars
//version 1
//please continue re-building in "Get_Collars_rebuild.js"

function container()
{

	/////////////////////
	///Logic Container///
	/////////////////////

	function whatStyleDialog()
	{
		// var docRef = app.activeDocument;

		var sports = ["SLOW_SS", "SLOWW_SS", "SLOWY_SS", "FAST_SL", "FAST_RB", "FAST_FB_SL", "FAST_FB_SS", //
		"FAST_2B_SS", "BASE_FB_SL", "BASE_FB_Y_SL", "BASE_FB_SS","BASE_FB_Y_SS", "BASE_2B_SS", "BASE_2B_Y_SS"];

		

		var wS = new Window("dialog", "What Collars Do You Need?");

		var inputGroup = wS.add("group");
			inputGroup.orientation = "column";
			var sportsGroup = inputGroup.add("group");
				sportsGroup.add("statictext", undefined, "Choose Sport");

				//populate sports dropdown list
				var sportsList = sportsGroup.add("dropdownlist", undefined, sports);
				sportsList.selection = 0;

			var styleGroup = inputGroup.add("group");

				styleGroup.add("statictext", undefined, "Enter Style Number:");

				//input text box for style number
				var styleInput = styleGroup.add("edittext", undefined, "000");

		var buttonGroup = wS.add("group");
			var okButton = buttonGroup.add("button", undefined, "OK");
			var cancelButton = buttonGroup.add("button", undefined, "Cancel");


		if(wS.show() == 1)
		{
			var results = "";
			results = "FD_" + sportsList.selection.text + "_";
			results = results + styleInput.text + ".ait";
			return results;
		}
		else
		{
			return null;
		}
	}

	function getStyle(styles)
	{
		if(styles.length>1)
		{
			var result;
			var gS = new Window("dialog","Which Garment?");
				var titleText = gS.add("statictext", undefined, "Which Garment Do You Need Collars For?");
				var buttons = styles;
				var buttonGroup = gS.add("group");
				buttonGroup.orientation = "column";
					for(var s=0;s<styles.length;s++)
					{
						addButton(s, styles[s]);
					}

				function addButton(num, style)
				{
					buttons[num] = buttonGroup.add("button", undefined, style);
					buttons[num].onClick = function()
					{
						result = style + ".ait";
						gS.close();
					}
				}
			gS.show();
			// alert(result)
			return result;

		}
		else
		{
			result = styles[0] + ".ait";
			return result;
		}
	}
	function whatGarment()
	{
		var result;
		var jerseyList = [];

		for(a=0;a<layers.length;a++)
		{
			if(layers[a].name.indexOf("FD")>-1)
			{
				jerseyList.push(layers[a].name);
			}
		}

		//This prepress is not on a template
		if(jerseyList.length==0)
		{
			result = whatStyleDialog();
		}

		else
		{
			result = getStyle(jerseyList);
		}

		return result;
	}

	function findCAD(path, garment)
	{
		var loc = new Folder(path);
		var theFile = new File(loc + "/" +  garment);
		return theFile;
	}

	function copyCollars(theCAD,coords)
	{
		var collars = [];
		var collarSource = open(theCAD);
		var sourceLayer = collarSource.layers[0].layers["Prepress"];
		var curLay;
		var curGroup;

		sourceLayer.visible = true;

		collarSource.selection = null;

		for (var a=0; a< sourceLayer.layers.length;a++)
		{
			curLay = sourceLayer.layers[a];
			for(var b=0;b<curLay.groupItems.length;b++)
			{
				curGroup = curLay.groupItems[b];
				if(curGroup.name.indexOf("Collar")>-1)
				{
					curGroup.selected = true;
				}   
			}
			
		}

		app.executeMenuCommand("copy");
		docRef.activate();
		app.executeMenuCommand("paste");

		for(var a=0;a<docRef.selection.length;a++)
		{
			var curGroup = docRef.selection[a];
			var curName = curGroup.name.substring(0,curGroup.name.indexOf(" "));
			curGroup.left = coords[curName][0];
			curGroup.top = coords[curName][1];
		}

		

		// collarSource.close(SaveOptions.DONOTSAVECHANGES);
		// app.activeDocument.close(SaveOptions.SAVECHANGES);
	}

	function addCollarsToCorrectLayer(garment,coords)
	{
		try
		{
			var theLayer = docRef.layers[garment.substring(0,garment.indexOf(".ait"))].layers["Prepress"];
			theLayer.visible = true;
			// alert("theLayer = " + theLayer);
			// alert(docRef.selection.length);
			for(var a=docRef.selection.length-1;a>-1;a--)
			{
				var thisCollar = docRef.selection[a];
				var targetLayer = theLayer.layers[thisCollar.name.substring(0, thisCollar.name.indexOf(" "))];
				thisCollar.moveToBeginning(targetLayer);
			}


		}
		catch(e)
		{
			try
			{
				if(docRef.selection[0].layer != "[Layer Artwork]")
				{
					var theLayer = docRef.layers["Artwork"];
					theLayer.locked = false;
					theLayer.visible = true;
					for(var a=docRef.selection.length-1;a>-1;a--)
					{
						docRef.selection[a].moveToBeginning(theLayer);
					}
				}
			}
			catch(e)
			{
				alert("something went wrong")
			}
		}
		if(theLayer.name == "Prepress")
		{
			var drCollarLabel = docRef.layers[0].layers["Mockup"].textFrames.add()
		}
		else
		{
			var drCollarLabel = theLayer.textFrames.add();
		}
		drCollarLabel.contents = "DR Collars";
		drCollarLabel.left = coords["Label"][0];
		drCollarLabel.top = coords["Label"][1];
		drCollarLabel.textRange.characterAttributes.size = 36;
	}

	function promptToSelectCollars()
	{
		alert("running prompt to select");
		var selCol = new Window("palette");
			var text = selCol.add("statictext",undefined, "Select the USA Collars and click OK");
			var button = selCol.add("button", undefined, "OK");
			button.onClick = function()
			{
				selCol.close();
				moveCollarsToUSALayer(false);
			}
		selCol.show();
	}

	function moveCollarsToUSALayer(template,garmentLayer)
	{
		if(template)
		{
			var usaLayer = garmentLayer.layers.add();
			usaLayer.name = "USA Collars";
			var theLayer = garmentLayer.layers["Prepress"];

			for(var a=0;a<theLayer.layers.length;a++)
			{
				var curSize = theLayer.layers[a].name;
				var curLay = theLayer.layers[a];
				curLay.groupItems[curSize + " Collar"].moveToBeginning(usaLayer);
			}

			continueScript();
		}
		else
		{
			// docRef = app.activeDocument;
			var usaLayer = docRef.layers.add();
			usaLayer.name = "USA Collars";

			for(var a=0;a<docRef.selection.length;a++)
			{
				var curCollar = docRef.selection[a];
				curCollar.moveToBeginning(usaLayer);
			}
			continueScript();
		}
		


	}

	function continueScript()
	{
		var theCAD = findCAD(garmentInfo[garmentCode]["path"], garment);

		copyCollars(theCAD, garmentInfo[garmentCode]["coords"]);

		addCollarsToCorrectLayer(garment,garmentInfo[garmentCode]["coords"]);
	}

	function isTemplate

	/////////////////////
	///Logic Container///
	/////////////////////

	var docRef = app.activeDocument;
	var layers = docRef.layers;

	var template;
	

	var garmentInfo = 
	{
		"FD_SLOW_SS" : 
		{
			"path": "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOW_SS",
			"coords" : 
			{
				"XS" : [-946.67,622.35],
				"S" : [-948.92,362.97],
				"M" : [-951.17,96.54],
				"L" : [-953.42,-177.48],
				"XL" : [-955.22,-458.71],
				"2XL" : [-957.92,-747.11],
				"3XL" : [-960.17,-1042.73],
				"4XL" : [-962.42,-1345.42],
				"5XL" : [-964.67,-1654.82],
				"Label" : [-949.1,708.39]
			}
		},      
		"FD_SLOWW_SS" : "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOWW_SS",

		"FD_SLOWY_SS" : "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOWY_SS",
		"FD_FAST_RB" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_RB/Converted_Templates/",
		"FD_FAST_SL" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_SL/Converted_Templates/",
		"FD_FAST_FB_SL" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_FB_SL/Converted_Templates/",
		"FD_FAST_FB_SS" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_FB_SS/Converted_Templates/",
		"FD_FAST_2B_SS" : {
			"path": "/Volumes/Customization/Library/cads/prepress/FD_FAST_2B_W_SS/Converted_Templates/",
			"coords" : 
			{
				"XXS" : [-1011.89,455.31],
				"XS" : [-1015.33,206.79],
				"S" : [-1018.88,-60.25],
				"M" : [-1022.12,-323.7],
				"L" : [-1025.7,-595.67],
				"XL" : [-1028.83,-879.72],
				"2XL" : [-1032.38,-1168.08],
				"3XL" : [-1035.83,-1457.79],
				"Label" : [-949.1,708.39]
			}
		},
		"FD_BASE_FB_SL" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_FB_SL/Converted_Templates/",
		"FD_BASE_FB_Y_SL" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_FB_Y_SL/Converted_Templates/",
		"FD_BASE_FB_SS" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_FB_SS/Converted_Templates/",
		"FD_BASE_FB_Y_SS" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_FB_Y_SS/Converted_Templates/",
		"FD_BASE_2B_SS" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_2B_SS/Converted_Templates/",
		"FD_BASE_2B_Y_SS" : "/Volumes/Customization/Library/cads/prepress/FD_BASE_2B_Y_SS/Converted_Templates/",
	}

	var garment = whatGarment(); 

	var garmentCode = garment.substring(0, garment.indexOf("_0"));

	var styleNum = garment.substring(garment.indexOf("_0"), garment.length);

	try
	{
		docRef.layers[garment.substring(0,garment.indexOf(".ait"))].layers["Prepress"].visible = true;
		moveCollarsToUSALayer(true,docRef.layers[garment.substring(0,garment.indexOf(".ait"))]);

	}
	catch(e)
	{
		//no discernable layer structure
		alert("using catch");
		promptToSelectCollars();
	}

	

	

	

	// alert("Results:\n" + "Sport: " + garment[0] + "\nCut: " + garment[1] + "\nStyle Number: " + garment[2]);
	// alert("Results:\n" + garment);


	
}
container();