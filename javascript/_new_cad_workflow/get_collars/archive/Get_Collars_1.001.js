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


*/

function container()
{
	
	///////Begin/////////
	///Logic Container///
	/////////////////////

	function isTemplate(layers)
	{
		var templateList = [];
		var result = {
			"qty" : 0,
			"template" : true

		};
		var localErrors;

		for(var a=0;a<layers.length;a++)
		{
			if(layers[a].name.indexOf("FD") > -1)
				templateList.push(layers[a]);
		}

		if(templateList.length == 0)
		{
			localErrors = "Not a scriptable template.";
			result = null;
		}
		else if(templateList.length == 1)
		{
			localErrors = null;
			result = templateList[0]
		}
		else
		{
			localErrors = null;
			result = templateList;
		}

		return {"templates":result,"errors":localErrors,"qty":templateList.length};
	}

	function findUSACollars(collarLoc)
	{
		//findUSACollars function description

		//collarLoc argument should be a string

		//"sel" - indicates the file is not a scriptable template
		// 		and collars must be selected at run-time

		//"template" - indicates file is a scriptable template
		//		top level layers are looped to find usa collars
		// 		and move all collars to USA Layer


		var localErrors	 = null;
		var usaCollars = [];

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
				//creat
				var usaLayer = docRef.layers.add();
				usaLayer.name = "USA Collars";
			}
		}
		catch(e)
		{
			localErrors = "Failed while attempting to create/identify USA Collars Layer.";
		}


		//try to move usa collars to layer
		//send error message to localErrors	
		//return errors
		try
		{
			//file is not a template
			//loop the selection to move all
			//usa collars to usaCollars array
			if(collarLoc == "sel")
			{
				for(var a=0;a<docRef.selection.length;a++)
				{
					docRef.selection[a].moveToBeginning(usaLayer);
				}
			}
		}
		catch(e)
		{
			localErrors = "Failed while attempting to move collars to USA Collars Layer.";
		}
	}

	function validateTemplate(template)
	{

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

	


	//validate the returned layer(s)
	// var validate = validateTemplate(template);


	////////End/////////
	///Function Calls///
	////////////////////


}
container();