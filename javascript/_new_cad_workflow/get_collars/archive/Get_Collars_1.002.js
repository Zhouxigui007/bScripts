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
				if(layers[a].name.indexOf("FD")>-1)
				{
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

		if(collarLoc == "template" || docRef.selection.length>0)
		{
			//try to identify existing or create new USA Collars layer
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
		}

		return usaCollars;
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

	var mrap = "There was an error reading the layers. Please save and relaunch Illustrator";
	var errorList = [];
	

	var theDocument = {};
	/*
		This object holds all information for garments that
		need updated collars in the current document.
		Structure should be as follows:
			theDocument = {
				"errorList" : [];
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
	
	//Check for the existence of 1 or more template layers.
	//Call subsequent functions to move all USA Collars.
	//Alert user to any errors and return if fatal error occurs.

	var existTemplate = isTemplate(layers);

	if(valid && existTemplate)
	{
		var templateList = getTemplates(layers);
		if(!valid)
		{
			sendErrors(errorList);
			return;
		}
		var usaCollars = findUSACollars("template", templateList);
	}
	else if(valid && !existTemplate)
	{
		var usaCollars = findUSACollars("sel");
	}
	else if(!valid)
	{
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



	//USA Collars have been moved to USA Collars array
	//Begin generating 


	


	//validate the returned layer(s)
	// var validate = validateTemplate(template);


	////////End/////////
	///Function Calls///
	////////////////////



	//test remove collars

		for(a in usaCollars)
			usaCollars[a].remove();

	//test remove collars


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