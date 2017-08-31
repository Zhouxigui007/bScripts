/*

Script Name: Get_Collars Rebuild 2.0
Author: William Dowling
Build Date: 01 November, 2016
Description: Rebuild of the get collars script to make best use of new filesystem
Build number: 2.0

Progress:

	Version 2.001
		01 November, 2016
		initial rebuild
		built getTemplates and getCode functionv

	Version 2.002
		continuing initial build.
		tidying up getTemplate and getCode functions
		adding detailed logging info.

*/

function container()
{

	/*****************************************************************************/

	///////Begin/////////
	///Logic Container///
	/////////////////////

	//sendErrors Function Description
	//Display any errors to the user in a preformatted list
	function sendErrors(errorList)
	{
		var localValid = true;
	
		alert(errorList.join("\n"));
	
	
		return localValid;
	}



	//getTemplates Function Description
	//
	function getTemplates(layers)
	{
		var localValid = true;

		log.bp("getTemplates(layers)")
		log.l("looping " + layers.length + " layers.")
		for(var lay=0;lay<layers.length;lay++)
		{
			var thisLay = layers[lay];
			log.L(thisLay.name);
		}
		
		for(var a=0;a<layers.length;a++)
		{

			var thisLay = layers[a];
			if(thisLay.name.indexOf("FD")>-1)
			{
				log.l("thisLay.name = " + thisLay.name);

				//Try/Catch Description:
				//check for existence of prepress layer to protect against
				//non template layers that contain the letters "FD"
				try
				{
					if(thisLay.layers["Prepress"])
					{
						log.l(thisLay.name + " contains a prepress layer. It is a scriptable template.");
						var thisCode = getCode(layers[a]);
						log.l("The garment code is: " + thisCode);
						if(thisCode == "cancelled")
						{
							log.l("getCode function failed to get code automatically.::Opened script UI dialog.::User cancelled operation. Exiting script.");
							localValid = false;
							break;
						}
						docInfo.scriptableTemplates.push(thisLay);
						docInfo.templates[thisLay.name] = {};
						docInfo.templates[thisLay.name].garCode = thisCode;
						docInfo.templates[thisLay.name].styleNum


					}
				}
				catch(e)
				{
					//thisLay is not a scriptable template layer;
					docInfo.possibleGarmentLayers.push(thisLay);
					log.l(thisLay.name + " contains \"FD\" but doesn't have the appropriate layer structure.::adding to array of potential garment layers");
				}
				
				
			}
			else
			{
				log.l(thisLay.name + " is not a scriptable template. Skipping it for now.");
			}
		}
		
	
	
		return localValid;
	}




	//getCode Function Description
	//pull out the garment code sans style number from layer name and return it.
	function getCode(layer)
	{
		log.bp("Running getCode function on " + layer.name);
		var result = {};
	
		//regex for underscore and a number (_0 or _4 etc)
		var patnum = /_\d/;

		//regex for underscore and a letter (_A or _C etc)
		var patlet = /_[a-z]/;

		//substring of layer name. everything from the last underscore to the end of the string
		var lastUnder = layer.name.substring(layer.name.lastIndexOf("_"),layer.name.length);
		log.l("lastUnder = " + lastUnder);
		log.l("checking lastUnder for a letter or number after the underscore.");


		if(patnum.test(lastUnder))
		{
			//no letter after last underscore. garment code is everything up until last underscore
			result.code = layer.name.substring(0,layer.name.lastIndexOf("_"));
			result.styleNum = layer.name.substring(layer.name.lastIndexOf("_")+1,layer.name.length)
			log.l("There was a number after the last underscore.::Garment code is: " + result.code);
		}
		else if(patlet.test(lastUnder))
		{
			//there is a letter after the last underscore which means we need to go back one underscore to get the garment code
			result.code = layer.name.substring(0,layer.name.lastIndexOf("_"));
			result.code = result.code.substring(0,result.code.lastIndexOf("_"));
			result.styleNum = result.code.substring(result.code.lastIndexOf("_")+1,result.code.length)
			log.l("There was a letter after the last underscore.::Garment code is: " + result.code);
		}
		else
		{

			log.l("getCode function failed to correctly identify the garment code.::Displaying UI dialog to get correct garment code from user.");
			//couldn't correctly determine garment code.
			//prompting user for the code.
			var userInput;

			var w = new Window("dialog", "Enter the garment code:");
				var msg1 = w.add("statictext", undefined, "Sorry. I had trouble determining the correct garment code for layer: " + layer.name)
				var msg2 = w.add("statictext", undefined, "Please enter the garment code and click submit.");
				var msg3 = w.add("statictext", undefined, "Example: FD_137  or  FD_857W");

				var input = w.add("edittext", undefined, "eg. FD_137");
				input.characters = 15;
				input.active = true;

				var btnGroup = w.add("group");
					var submit = btnGroup.add("button", undefined, "Submit");
					submit.onClick = submitForm;

					var cancel = btnGroup.add("button", undefined, "Cancel");
					cancel.onClick = function()
					{
						result.code = "cancelled";
						w.close();
					}

				function submitForm()
				{
					userInput = input.text;
					log.l("User clicked Submit. Their input was " + userInput);
					w.close();
				}

			w.show();
		}

		log.L("getCode function for layer " + layer.name + " complete.::return value = " + result);
	
		return result;
	}







	////////End//////////
	///Logic Container///
	/////////////////////

	/*****************************************************************************/

	///////Begin////////
	////Data Storage////
	////////////////////

	var lib = 
	{
		
	}

	var docInfo = 
	{
		possibleGarmentLayers : [],
		scriptableTemplates : [],
		templates : 
		{
			//gar1 :
			//{
				//garCode
				//styleNum
				//regRag
			//}

		}

	}

	#include "/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.js";


	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////

	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	var errorList = [];

	var versionNum = 2.002

	var valid = true;

	log.h("User = " + user + "::Begin Script Execution::Get_Collars v. " + versionNum);
	log.l("docRef.name = " + docRef.name);

	if(getTemplates(layers))
	{
		var valid = true;
	}
	else
	{

		valid = false;
	}





	printLog();
	



	////////End/////////
	///Function Calls///
	////////////////////

	/*****************************************************************************/

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}
	return valid

}
container();