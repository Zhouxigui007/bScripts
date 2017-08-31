/*

Script Name: Input_Fabric
Author: William Dowling
Build Date: 10 October, 2016
Description: Pull up to date fabric info from central spreadsheet and return the value for the "Mockup Info" script to use.
Build number: 1.0

Progress:

	Version 1.001
		10 October, 2016
		

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
	
	
		return localValid
	}


	//getMasterFabrics Function Description
	//Grab master fabric spreadsheet csv file from network and generate JSON
	function getMasterFabrics()
	{
		var theObj = "[{";

		//open the csv file and save the contents to var theCSV
		var thePath = "/Volumes/Customization/Library/Scripts/Script Resources/Data/";
		var theFile = new File(thePath + "fd_fabrics_compiled.csv");
		theFile.open();
		var theCSV = theFile.read();
		theFile.close();

		//split theCSV by line break
		var contents = theCSV.split("\n");

		//build theObj string from contents
		for(var x in contents)
		{
			var thisLine = contents[x].split(",");
			if(thisLine[0].indexOf("648")>-1)
			{
				$.writeln("pause");
			}
			if(thisLine[0].indexOf("FD")==0)
			{
				theObj += '"' + thisLine[0] + '" : "' + thisLine[1] + '",';
			}
		}
		//trim the trailing comma from the string
		theObj = theObj.substring(0,theObj.lastIndexOf(","));
		theObj += "}]";

		var json = eval(theObj);
	
	
		return json;
	}

	//getCode Function Description
	//Using the document's top level layers, determine the code(s) for which fabric type is needed
	function getCode(layers)
	{
	
		var codes = [];

		//push all garment codes to codes array
		for(var x=0;x<layers.length;x++)
		{
			var thisLay = layers[x];
			if(thisLay.name.indexOf("FD")>-1)
			{
				codes.push(thisLay.name.substring(0,thisLay.name.lastIndexOf("_")));
				templateLayers.push(thisLay);
			}
		}

		return codes;
	}

	//getCallouts Function Description
	//For each of the codes in the document, find the matching value in the fabObj object
	function getCallouts(codes,fabObj,templateLayers)
	{

		for(var x in codes)
		{
			var fabric = templateLayers[x].layers["Information"].textFrames["Fabric"]
		}
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

	var templateLayers = [];

	var valid = true;

	var codes = getCode(layers);

	if(codes.length<1)
	{
		valid = false;
		errorList.push("Didn't find any scriptable garments in this document.");
	}

	if(valid)
	{
		var fabObj = getMasterFabrics();
	}

	if(valid)
	{
		getCallouts(codes,fabObj,templateLayers);
	}




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