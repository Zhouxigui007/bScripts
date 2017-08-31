/*
Get_Collars Rebuild
Lets try to make some sense this time, eh?

Script Name: Get_Collars.js
Author: William Dowling
Build Date: 26 May, 2016
Description: Locate and grab updated collars from network to
				replace outdated Made In USA Collars
Build Number: 1.000

Ideas to implement:
	Push all gathered data into a JSON object for optimal
		handling of commands.
	Gather all relevant data before altering anything.

Progress:

	Version: 1.001
		26 May, 2016
		Continue with rebuild from original mangled mess.
		Including much more robust error handling and thorough comments.
		isTemplate function needs comments/descriptions
		not working as of save. need to improve the flow of control
		SIMPLIFY!!!

	Version: 1.002
		26 May, 2016
		Working from home.
		Simplifying functions. Broke down isTemplate to simply return
			true if at least 1 instance of a template is found, else return false.
		Built generic error reporting function that should be fully scalable.
		getTemplates function runs if isTemplate = true. returns array of template layers.
		findUSACollars function runs if there were no prior errors. populates and returns
			an array of all USA Collars in the document.
		Fixed flawed for in loops. stick to regular c style for loops.
		Currently working to populate all usa collars in array

	Version: 1.003
		27 May, 2016
		Added getObjectData function to populate theDocument objectf
		Added library object to hold placement coords and network paths
		Needs to be tested
		Should be working up to the point of populating theDocument object.
		*Update* - Tested on 31 May, fixed a couple of typos and all is working well.

	Version: 1.004
		31 May, 2016
		Moved the creation of the USA Collars layer to a later function to prevent a
			layer being created unnecessarily.
		Created function to move all usa collars to USA Collars layer, send layer to back and hide
		Tested and currently working for one or more scriptable templates

	Version: 1.005
		31 May, 2016
		Writing functions to go to network and grab DR Collars from template files.
		Added styleNum key to theDocument object
		Script is currently working all the way up to placing and positioning collars onto a scriptable template.
		Still need to include a DR collars label.
		Still need to create the rest of the library entries.
		Still need to build script UI for non-scriptable templates.
		


*/

function container()
{
	
	///////Begin/////////
	///Logic Container///
	/////////////////////

	function isTemplate(layers)
	{
		
		var result = false;
		
		try
		{
			//loop layers to find first instance
			//of a layer name that contains "FD"
			for(var a=0;a<layers.length;a++)
			{
				if(layers[a].name.indexOf("FD")>-1)
					result = true;
					break;
			}

			return result;
		}
		catch(e)
		{
			result = false;
			valid = false;
			errorList.push(mrap);
		}

		return result;
	}

	function getTemplates(layers)
	{
		var templateList = [];
		try
		{
			//loop layers and find all instances of
			//"FD". Push true results to templateList array
			for(var a=0;a<layers.length;a++)
			{
				var thisName = layers[a].name;
				if(thisName.indexOf("FD")>-1)
				{
					if(thisName.indexOf("MH")<0 && thisName.indexOf("WH")<0 && thisName.indexOf("YH")<0)
						templateList.push(layers[a]);
				}
			}
		}
		catch(e)
		{
			errorList.push(mrap);
			valid = false;
			return null;
		}

		return templateList;
	}

	function findUSACollars(collarLoc, templateList)
	{
		//findUSACollars function description

		//collarLoc argument should be a string
		//are collars located in the current selection or in a template layer?

		//"sel" - indicates the file is not a scriptable template
		// 		and collars must be selected at run-time

		//"template" - indicates file is a scriptable template
		//		top level layers are looped to find usa collars
		// 		and push all collars to usaCollars array.

		//templateList argument is an array of verified template layers.
		//only necessary if collarLoc == "template";

		var usaCollars = [];

		//try to populate usaCollars array
		//push errors to errorList
		try
		{
			//file is not a template.
			//loop the selection to move all
			//usa collars to usaCollars array
			if(collarLoc == "sel")
			{
				if(docRef.selection.length < 1)
				{
					errorList.push("Since this isn't a scriptable template, you must select the USA Collars first. Then re-run the script.");
					valid = false;
					return;
				}
				for(var a=0;a<docRef.selection.length;a++)
				{
					usaCollars.push(docRef.selection[a])
				}
			}


			//file contains at least one template.
			//loop the template layers and 
			//populate the usaCollars array
			else if(collarLoc == "template")
			{
				for(var a=0;a<templateList.length;a++)
				{
					var curTemplate = templateList[a];
					var prepress = curTemplate.layers["Prepress"];
					for(var b=0;b<prepress.layers.length;b++)
					{
						var curSize = prepress.layers[b];
						for(var c=0;c<curSize.groupItems.length;c++)
						{
							if(curSize.groupItems[c].name.indexOf("Collar")>-1)
							{
								usaCollars.push(curSize.groupItems[c]);
								break;
							}
						}
					}
				}
			}
		}
		catch(e)
		{
			errorList.push("Failed while attempting to populate usaCollars array.");
			return;
		}

		return usaCollars;
	}

	function getObjectData(thisTemplate, library)
	{
		//function description
		//retrieve necessary data from thisTemplate variable (layer)
		//and populate result object.

		var result = {};
		// try to populate result object
		try{
			var theCode = thisTemplate.name.substring(0,thisTemplate.name.indexOf("_0"));
			result.code = thisTemplate.name.substring(0,thisTemplate.name.indexOf("_0"));
			result.styleNum = thisTemplate.name.substring(thisTemplate.name.indexOf("_0")+1,thisTemplate.name.length);
			result.coords = library[theCode]["coords"];
			result.path = library[theCode]["path"];


			return result;
		}
		catch(e)
		{
			errorList.push(mrap + "\n getObjectData failure")
			valid = false;
			return;
		}
	}

	function moveUSACollars(collars)
	{

		//check if there are any usa collars to move

		if(collars.length < 1)
		{
			errorList.push("There aren't any USA Collars to move.\nEither the collars have already been moved, or this is not a scriptable template and you don't have any collars selected!");
			valid = false;
			return;
		}
		//create or identify USA Collars layer

		try
		{
			//check if USA Collars layer exists already
			//create one if it does not exist
			try
			{
				//USA Collars layer exists
				var usaLayer = docRef.layers["USA Collars"];
			}
			catch(e)
			{
				//create USA Collar layer
				var usaLayer = docRef.layers.add();
				usaLayer.name = "USA Collars";
			}
		}
		catch(e)
		{
			errorList.push("Failed while attempting to create/identify USA Collars Layer.");
			valid = false;
			return;
		}

		//try to move all collars
		try
		{
			for each(a in collars)
				a.moveToBeginning(usaLayer);
			usaLayer.zOrder(ZOrderMethod.SENDTOBACK);
			usaLayer.visible = false;
		}
		catch(e)
		{
			errorList.push("Failed while attempting to move collars to USA Collars Layer.");
			valid = false;
			return;
		}
	}

	function getNewCollars(code,path,coords,style)
	{
		//open template from network

		var source = new File(path + code + "_" + style + ".ait")
		var sourceDoc = app.open(source);
		var sourcePrepress = sourceDoc.layers[code + "_" + style].layers["Prepress"];

		//establish destination 

		if(existTemplate)
			var dest = docRef.layers[code + "_" + style].layers["Prepress"];
		else
			try
			{
				var dest = docRef.layers["Artwork"];
			}
			catch(e)
			{
				var dest = docRef.layers[0];
			}
		try
		{
			dest.locked = false;
			dest.visible = true;
		}
		catch(e)
		{
			errorList.push(mrap + "\n getNewCollars failure!\nfailed trying to unlock/unhide layers.");
			valid = false;
			return;
		}

		//duplicate collars to prepress

		var sourceCollar;
		var curSize;
		var collarDest;

		for(var a=0;a<sourcePrepress.layers.length;a++)
		{
			curSize = sourcePrepress.layers[a].name;
			sourceCollar = sourcePrepress.layers[a].groupItems[curSize + " Collar"];

			if(dest.name.indexOf("Prepress") > -1)
				collarDest = dest.layers[curSize];
			else
				collarDest = dest;

			var copiedCollar = sourceCollar.duplicate(collarDest);
			copiedCollar.left = coords[curSize][0];
			copiedCollar.top = coords[curSize][1];
		}

		sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

	}


	function sendErrors(errorList)
	{
		var errorString = "The Following Errors Occurred:\n";

		for(var a=0;a<errorList.length;a++)
		{
			errorString += errorList[a] + "\n";
		}
		alert(errorString);
	}




	////////End//////////
	///Logic Container///
	/////////////////////


	///////Begin////////
	///Function Calls///
	////////////////////

	//Script Global Variable Definitions

	var docRef = app.activeDocument;
	var layers = docRef.layers
	var valid = true;

	app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

	var mrap = "There was an error reading the layers. Please save and relaunch Illustrator";
	var errorList = [];
	

	var theDocument = {
		"qty":0
	}; //for theDocument formatting info expand below

		/*
		This object holds all information for garments that
		need updated collars in the current document.
		Structure should be as follows:
			theDocument = {
				"qty" : 2, //this is the quantity of garments in the doc that need updated collars,
				"usaCollars" : [(array of collars/groupItems returned from findUSACollars)],
				"garment1" : {
					"template" : true,
					"garmentCode" : "FD_SLOW",
					"styleNumber" : "000",
					"path" : "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOW_SS",
					"coords" : {
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
					
				} 
			}
		*/

	var library =
	{
		//this object stores all relevant data for the network
		//location and placement coords of DR collars
		"FD_SLOW_SS" : 
		{
			"path": "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOW_SS/",
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
		"FD_SLOWW_SS" : "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOWW_SS/",

		"FD_SLOWY_SS" : "/Volumes/Customization/Library/cads/prepress/FD_SLOW_SS/ConvertedTemplates/FD_SLOWY_SS/",
		"FD_FAST_RB" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_RB/Converted_Templates/",
		"FD_FAST_SL" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_SL/Converted_Templates/",
		"FD_FAST_FB_SL" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_FB_SL/Converted_Templates/",
		"FD_FAST_FB_SS" : "/Volumes/Customization/Library/cads/prepress/FD_FAST_FB_SS/Converted_Templates/",
		"FD_FAST_2B_SS" : {
			"path": "/Volumes/Customization/Library/cads/prepress/FD_FAST_2B_SS/Converted_Templates/",
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
	
	//Check for the existence of 1 or more template layers.
	//Call subsequent functions to move all USA Collars.
	//Alert user to any errors and return if fatal error occurs.

	var existTemplate = isTemplate(layers);

	if(valid && existTemplate)
	{
		//No errors and file is a scriptable template
		var templateList = getTemplates(layers);
		if(!valid)
		{
			sendErrors(errorList);
			return;
		}
		var usaCollars = findUSACollars("template", templateList);
		theDocument.usaCollars = usaCollars;
	}
	else if(valid && !existTemplate)
	{
		//no errors and file is NOT a scriptable template
		var usaCollars = findUSACollars("sel");
		theDocument.usaCollars = usaCollars;


		//***********
		//***TO DO***
		//***********
		//insert function call for scriptUI to populate templateList array
	}
	else if(!valid)
	{
		//errors occurred. do not proceed.
		sendErrors(errorList);
		return;
	}

	//check for fatal errors during population of
	//usaCollars array
	if(!valid)
	{
		sendErrors(errorList);
		return;
	}


	//usaCollars array populated succesfully
	//loop templateList to populate theDocument object

	for(var a=0;a<templateList.length;a++)
	{
		var curGarment = templateList[a];
		theDocument["garment" + a] = getObjectData(curGarment,library);
	}

	if(!valid)
	{
		sendErrors(errorList);
		return;
	}

	//move usaCollars to USA Collars layer

	moveUSACollars(theDocument.usaCollars);

	if(!valid)
	{
		sendErrors(errorList);
		return;
	}

	var counter = 0;

	for(key in theDocument)
	{
		docRef.activate();
		docRef.artboards.setActiveArtboardIndex(counter);
		if(key != "qty" && key != "usaCollars")
		{
			getNewCollars(theDocument[key].code,theDocument[key].path,theDocument[key].coords, theDocument[key].styleNum)
			counter++;
		}
		
	}


	////////End/////////
	///Function Calls///
	////////////////////



}
container();


//Storage Locker
/*
	//get template layer or list of template layers
	//return format is array [layer(s),error string,template quantity]
	var documentInfo = isTemplate(layers);
	
	//populate theDocument object with
	//returned values from isTemplate();
	theDocument.qty = documentInfo.qty;
	if(documentInfo.errors != null)
		theDocument.errorList = documentInfo.errors;

	//create garment sub objects
	if(documentInfo.templates != null)
	{
		for (var a=0;a<documentInfo.templates.length;a++)
		{
			var garment = "garment";
			var thisTemplate = documentInfo.templates[a];
			theDocument[garment+a] = {};
			theDocument[garment+a]["template"] = true;
			theDocument[garment+a]["garmentCode"] = thisTemplate.name.substring(0,thisTemplate.name.indexOf("_0"));
		}
	}

	alert(theDocument.garment0.template);





*/