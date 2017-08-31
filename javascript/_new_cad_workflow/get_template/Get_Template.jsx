/*



Script Name: Get Template
Author: William Dowling
Build Date: 06 September, 2016
Description: Locate the needed template on the network and open/merge with current document.
Build number: 1.000

Progress:

	Version 1.001
		Initial Build
	Version 1.002
		Fixed labeling and garment codes concatenation.
		Currently working to open templates from existing library
		Simply add new library entries with correct network locations to expand capabilities.

	Version 1.003
		Updated so no document needs to be open.

*/

function container()
{

	/*****************************************************************************/

	///////Begin/////////
	///Logic Container///
	/////////////////////

	function whichGarments(garmentList)
	{
		//Script UI window to prompt user for garment info for non-scriptable prepresses

		var sportsList = [];

		for(var s in library.sports)
		{
			sportsList.push(s)
		}

		var result = [];

		var currentGarments = [];
		

		var wS = new Window("dialog", "What templateListDisplay Do You Need?");

		if(garmentList.length>0)
		{
			var templateListDisplay = wS.add("group");
				templateListDisplay.orientation = "column";
				var TLDLabel = templateListDisplay.add("statictext", undefined, "Grabbing Template(s) for:");
			
			for each(shirt in garmentList)
			{
				templateListDisplay.add("statictext", undefined, shirt)
			}
			var separatorGroup = wS.add("group");
			var separator = separatorGroup.add("statictext", undefined, "---------Click \"I'm Finished\" to get Template for the above garments.---------");
		}

		

		

		var inputGroup = wS.add("group");
			inputGroup.orientation = "column";
			var sportsGroup = inputGroup.add("group");
				sportsGroup.add("statictext", undefined, "Choose Sport");

				//populate sports dropdown list
				var sportsList = sportsGroup.add("dropdownlist", undefined, sportsList);
				sportsList.selection = 0;

			var styleGroup = inputGroup.add("group");

				styleGroup.add("statictext", undefined, "Enter Style Number:");

				//input text box for style number
				var styleInput = styleGroup.add("edittext", undefined, "000");
					styleInput.characters = 5;

		var buttonGroup = wS.add("group");
			var submitButton = buttonGroup.add("button", undefined, "Submit");
			submitButton.onClick = function()
			{
				var thisResult = "";
				thisResult = sportsList.selection.text + "_" + styleInput.text;
				wS.close();
				result = thisResult;
			}
			var cancelButton = buttonGroup.add("button", undefined, "Cancel");
			cancelButton.onClick = function()
			{
				cont = false;
				wS.close();
				result = "cancelled";
			}
			var finishedButtonGroup = buttonGroup.add("group");
			var doneButton = finishedButtonGroup.add("button", undefined, "I'm Finished");
			doneButton.onClick = function()
			{
				cont = false;
				wS.close();
				result = null;
			}


		wS.show();

		return result;
	}

	function openEachTemplate(templates)
	{
		for(var temp in templates)
		{
			var code = templates[temp].substring(0,templates[temp].indexOf("_0"));
			var style = templates[temp].substring(templates[temp].indexOf("_0")+1, templates[temp].length);

			if(library.sports[code] == undefined)
			{
				valid = false;
				alert("Sorry. I don't know where to find the template for the following garment:\n" + code);
				continue;
			}
			
			var thePath = library.prepress + library.sports[code].path + templates[temp] + ".ait";
			var theFile = new File(thePath);
			app.open(theFile);
		}
	}


	////////End//////////
	///Logic Container///
	/////////////////////

	/*****************************************************************************/

	///////Begin////////
	////Data Storage////
	////////////////////

	var library =
	{
		"prepress" : "/Volumes/Customization/Library/cads/prepress/",
		
		//this object stores all relevant data for the network location of each template

		"sports" : 
		{
			"FD_SLOW_SS" : 
			{
				"path": "FD_SLOW_SS/ConvertedTemplates/FD_SLOW_SS/"
			},      
			"FD_SLOWW_SS" : 
			{
				"path" : "FD_SLOW_SS/ConvertedTemplates/FD_SLOWW_SS/"
			},
			"FD_SLOWY_SS" :
			{
				"path" : "FD_SLOW_SS/ConvertedTemplates/FD_SLOWY_SS/"
			},
			"FD_FAST_RB" : 
			{
				"path" : "FD_FAST_RB/Converted_Templates/"
			},
			"FD_FAST_SL" :
			{
				"path" : "FD_FAST_SL/Converted_Templates/"
			} ,
			"FD_FAST_FB_SL" : 
			{
				"path" : "FD_FAST_FB_SL/Converted_Templates/"
			},
			"FD_FAST_FB_SS" : 
			{
				"path" : "FD_FAST_FB_SS/Converted_Templates/"
			},
			"FD_FAST_2B_SS" : 
			 {
				"path": "FD_FAST_2B_SS/Converted_Templates/"
			},
			"FD_FAST_2B_W" : 
			 {
				"path": "FD_FAST_2B_SS/Converted_Templates/"
			},
			"FD_BASE_FB_SL" : 
			{
				"path" : "FD_BASE_FB_SL/Converted_Templates/"
			},
			"FD_BASE_FB_Y_SL" : 
			{
				"path" : "FD_BASE_FB_Y_SL/Converted_Templates/"
			},
			"FD_BASE_FB_SS" : 
			{
				"path" : "FD_BASE_FB_SS/Converted_Templates/"
			},
			"FD_BASE_FB_Y_SS" : 
			{
				"path" : "FD_BASE_FB_Y_SS/Converted_Templates/"
			},
			"FD_BASE_2B_SS" : 
			{
				"path" : "FD_BASE_2B_SS/Converted_Templates/"
			},
			"FD_BASE_2B_Y_SS" : 
			{
				"path" : "FD_BASE_2B_Y_SS/Converted_Templates/",
			}
		}
	}



	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////

	// // var docRef = app.activeDocument;
	// var layers = docRef.layers;
	var valid = true;

	app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;

	var garmentList = [];

	var cont = true;
	while(cont)
	{
		var thisGarment = whichGarments(garmentList);
		if(thisGarment == "cancelled")
		{
			garmentList = [];
			valid = false;
			return;
		}
		else if(thisGarment != null)
		{
			garmentList.push(thisGarment);
		}
	}

	if(!valid)
	{
		return;
	}
	else if(garmentList.length<1)
	{
		errorList.push("Sorry. I didn't get the appropriate information for which template(s) you need.\n=(")
	}

	//open all templates
	openEachTemplate(garmentList);



	////////End/////////
	///Function Calls///
	////////////////////

	/*****************************************************************************/

}
container();