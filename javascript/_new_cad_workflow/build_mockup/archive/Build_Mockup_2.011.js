/*

Script Name: Build_Mockup
Author: William Dowling
Build Date: 03 February, 2017
Description: Open a converted template from the library, change the placeholder colors to match the paramcolors from the builder json, 
				import the necessary graphics (logos, names, numbers, pattern fills) from the library
				change the text of the logo to match team name
Build number: 2.0

Progress:

	Version 2.001
		03 February, 2017
		Initial build
		Wrote getDesignNumber function to prompt user for a design number and then validate their input
	
	Version 2.002
		03 February, 2017
		Continuing initial build
		Added file paths to common customization library locations
		Wrote readJson function to find json file on network and parse the contents

	Version 2.003
		03 February, 2017
		Continuing initial build
		Created garment object to hold relevant info pulled from lib.json
		Added a testing function to test individual functions
		Added a list of possible config.name properties
			This list will be replaced with a more reliable value: config.top.garment
		Tested briefly and working on select json files (so long as the expected config.top.garment property exists.)
			successfully gets the garment name and style number from the builder generated json object.
			Still needs conditional handling for the builder generated json missing properties that are necessary
				this may be the case on older orders with the old builder, or design id's that are not for tops..

	Version 2.004
		06 February, 2017
		Continuing build
		Added getPrepressSubFolder function
		Currently working to get the correct BM Code. 
		Changing name of getPrepressSubFolder to getBMCode
		Removing the string concatenation from getBMCode function.
			path to correct prepress folder will be concatenated elsewhere

	Version 2.005
		06 February, 2017
		Adding function to find the correct parent folder for a given BM code.
		Successfully determining the BM code. Still needs more testing though.
			Some changes may need to be made to bm_code_converter.js if necessary.

	Version 2.006
		06 February, 2017
		Added getSport function to determine which folder in the prepress folder to use.
		Adding findGarmentFolder function to comb the directories in the garment.sport folder
			and look for the correct garment folder.
		Currently working to determine correct subfolder from the sport folder
			Still needs logic to handle multiple matches (like FD-161, FD-161W and FD-161Y)
		Still needs to be tested on many more design numbers and conditions need to be put in
			to look out for undesirably formatted design numbers.

	Version 2.007
		07 February, 2017
		Adding openConvertedTemplate function
		Currently working to parse JSON, get the garment information and open the file
			Universal functionality of this relies on standardization of folder structure and file naming conventions

	Version 2.008
		07 February, 2017
		Adding getGraphics function
		Successfully pulling the graphic data from the json object and pushing it to the garmentGraphics object.
			Still need to add validation to make sure values are as expected
			Still need to add color info
	
	Version 2.009
		08 February, 2017
		Added getGraphicLocations function
			This function finds the correct network paths to the parent folders of the graphics for the shirt.
		Currently working to open a converted template and correctly identify folder paths to graphics.

	Version 2.010
		09 February, 2017
		Added openGraphics function
		Currently working to open front logos, names and numbers (not tested yet on mascots, but that should be no different.);

	Version 2.011
		09 February, 2017
		Removed some alerts and $.writelns that were just for testing/verification purposes.
		Fixed bug in getGarmentFolder function that caused a runtime error if more than one match was found in the garments folder.
		Adding a generic dialog function to temporarily solve the issue of multiple matches
		Adding temporary listbox dialog instead of simple prompt for testing of multiple design numbers easily.
		Everything is currently working as long as the design number is for a top garment (no pants or shorts yet) and
			the library file paths are as expected and converted template file names have a 4 digit postfix (ie. FD-163_1003);
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
		alert(errorList.join("\n"));
	}


	//testFunction Function Description
	//run a specific test on a given function
	//Just manually pass the values that would be expected
	function testFunction()
	{
		//testing getStyleNum function
		getStyleNum("FD-FAST-SL-1066");
		alert(garment.styleNum);
	}


	//getDesignNumber Function Description
	//Prompt the user to paste the design number into the dialog
	// function getDesignNumber()
	// {
	// 	var localValid = true;

	// 	var validationPattern = /^[a-z0-9]{12}$/i;
	
	// 	var w = new Window("dialog", "Paste the design number.")
	// 		var txt = w.add("statictext", undefined, "Copy the design number from the sales order and paste it below.")
	// 		var input = w.add("edittext", undefined, "cI3xop6JZc4T");
	// 		input.characters = 13;
	// 		input.active = true;

	// 		var buttonGroup = w.add("group");
	// 			//user submits form
	// 			var okButton = buttonGroup.add("button", undefined, "Submit");
	// 			okButton.onClick = validateSubmission;

	// 			//user cancels
	// 			var cancelButton = buttonGroup.add("button", undefined, "Cancel");
	// 			cancelButton.onClick = function()
	// 			{
	// 				localValid = false;
	// 				log.e("User pressed cancel. Exiting script.");
	// 				w.close();
	// 			}

	// 			w.addEventListener("keydown",function(k)
	// 			{
	// 				if(k.keyName == "Enter")
	// 				{
	// 					validateSubmission();
	// 				}
	// 			});


	// 	w.show();


	// 	function validateSubmission()
	// 	{
	// 		var usrInput = input.text;
	// 		if(usrInput != "" && usrInput != null && usrInput != undefined && validationPattern.test(usrInput))
	// 		{
	// 			//this input passes validation.
	// 			//save the input to the global library object
	// 			lib.designNumber = usrInput;
	// 		}
	// 		else
	// 		{
	// 			//this input does not pass validation
	// 			localValid = false;
	// 			errorList.push("You didn't enter a valid design number. Please try again.")
	// 			log.e("User did not enter a valid design number.::getDesignNumber function returned false.::User input value = " + usrInput);
	// 		}
	// 		w.close();
	// 	}
	
	
	// 	return localValid
	// }

	//getDesignNumber Function Description
	//this version of getDesignNumber is just for testing
	//so i can easily choose different design numbers to hunt
	//for bugs rather than going to the folder location and
	//copying/pasting different design numbers
	function getDesignNumber()
	{
		var localValid = true;

		var folder = new Folder(lib.designFilePath);

		var filesArr = folder.getFiles();

		var files = [];

		for(var fa=0;fa<filesArr.length;fa++)
		{
			var thisFile = filesArr[fa];
			files.push(thisFile.name.substring(0,thisFile.name.indexOf(".json")));
		}
	
		var w = new Window("dialog", "choose a design");
			

			var btnGroup = w.add("group");
				var submit = btnGroup.add("button", undefined, "Submit");
					submit.onClick = function()
					{
						lib.designNumber = box.selection.text;
						w.close();
					}
				var cancel = w.add("button", undefined, "Cancel");
					cancel.onClick = function()
					{
						localValid = false;
						log.e("cancelled getDesignNumber function. exiting script.");
						w.close();
					}
			var txt = w.add("statictext", undefined, "choose a design");
			var box = w.add("listbox", undefined, files);
		w.onShow = function()
		{
			w.size = {width:300,height:400}
		}
		w.show();
	
		alert(lib.designNumber)
		return localValid
	}

	
	//readJson Function Description
	//search the designFilePath for the design number entered by the user
	//if the file does not exist throw a descriptive error
	//if the file does exist save the evaluated JSON data in the lib object
	//args:
		//path = hard coded path to the script resources folder
		//num = design number entered by user
	function readJson(path,num)
	{
		var localValid = true;
		

		var theFile = new File(path + "/" + num + ".json");

		if(!theFile.exists)
		{
			//no file using this design number exists.
			errorList.push("Sorry. That design number was not found..");
			log.e("The design number: " + num + " was not found in the script resources folder.");
			localValid = false;
		}
		else
		{
			//design id was found.
			//read and eval the contents
			//save the contents to the lib.json object.
			theFile.open();
			var contents = "(" + theFile.read() + ")";
			theFile.close();

			contents = eval(contents);
			lib.json = contents;
		}
	
	
		return localValid
	}

	/////////////////////////////
	//Garment Related Functions//
	/////////////////////////////


		//getBMCode Function Description
		//get the subfolder (typically a sport, i.e. BASKETBALL)
		//and append the proper string to the lib.prepressPath string
		function getBMCode()
		{
			var localValid = true;
		

			//**ATTENTION**//
				//this needs to be changed before distributing the script to the artists.
			//**ATTENTION**//

			//localStorage
			#include "~/Desktop/automation/javascript/utilities/bm_code_converter/bm_code_converter.js";

			try
			{
				var mid = midTable[garment.name];

				if(mid)
				{
					garment.bmCode = mid;
				}
				else
				{
					errorList.push("That garment isn't in the conversion table.");
					log.e("Could not find the proper BM Code for " + garment.name);
					localValid = false;
				}
			}
			catch(e)
			{
				errorList.push("Failed to get the correct prepress path.");
				log.e("Failed to get the correct prepress path.::The subStyle returned was " + mid + "::and the concatenated path resulted in " + garment.prepressLoc)
			}
		
		
			return localValid
		}



		//getStyleNum Function Description
		//extract the style number from the nameString and
		//add the style number to the garment object
		//nameString could be the garment code or a graphic code
		//ex. FD-FAST-2B-SS-1066 or FDSP-1032
		function getStyleNum(nameString)
		{
			var localValid = true;
			
			//format of styleNum should be 3 or 4 digits only
			var correctFormat = /\d{3,4}/;

			try
			{
				var styleNum = nameString.substring(nameString.lastIndexOf("-") + 1, nameString.length);
				if(correctFormat.test(styleNum))
				{
					garment.styleNum = styleNum;
				}
				else
				{
					errorList.push("Style number was not returned in the proper format.");
					log.e("Style number didn't match the correct format.::styleNum was returned as: " + styleNum);
					localValid = false;
				}
					
			}
			catch(e)
			{
				errorList.push("Failed to properly read the style number from the builder info. =(")
				log.e("styleNum could not be determined properly.::argument passed to function was " + nameString + "::and the returned result was " + styleNum);
				localValid = false;
			}
		
		
			return localValid
		}



		//getGarName Function Description
		//get the garment name from the nameString
		//garment name should be everything up to the style number
		function getGarName(nameString)
		{
			var localValid = true;
			
			//format of garName should be a series of chunks of a-zA-Z delimited by hyphens
			var correctFormat = /^([a-z]*-)+/i;

			try
			{
				var garName = nameString.substring(0, nameString.lastIndexOf("-"));

				if(correctFormat.test(garName))
				{
					garment.name = garName;
				}
				else
				{
					errorList.push("Garment Name was not returned in the proper format.");
					log.e("garName did not match the correct format.::garName was returned as: " + garName);
					localValid = false;
				}
			}

			catch(e)
			{
				errorList.push("Failed to properly identify the garment name.")
				log.e("garName could not be determined properly.::argument passed to function was " + nameString + "::and the returned result was " + garName);
				localValid = false;
			}
			
			
			
		
		
			return localValid
		}



		//getSport Function Description
		//Determine which prepress subfolder to use for the given bmCode
		function getSport(bmCode)
		{
			var localValid = true;
			
			switch(bmCode)
			{
				case "FD-137W":
				case "FD-137Y":
				case "FD-137":
				case "FD-210":
				case "FD-210Y":
				case "FD-215":
				case "FD-215W":
				case "FD-215Y":
				case "FD-217W":
				case "FD-217Y":
				case "FD-217":
				case "FD-220W":
				case "FD-622W":
				case "FD-622Y":
				case "FD-622":
					garment.sport = "BASKETBALL";
					break;

				case "FD-1000Y":
				case "FD-1000":
				case "FD-161W":
				case "FD-161Y":
				case "FD-161":
				case "FD-163W":
				case "FD-163Y":
				case "FD-163":
				case "FD-230Y":
				case "FD-230":
				case "FD-233Y":
				case "FD-233":
				case "FD-234Y":
				case "FD-234":
				case "FD-240W":
				case "FD-243W":
				case "FD-246W":
				case "FD-3417":
				case "FD-3417Y":
				case "FD-400W":
				case "FD-4416W":
				case "FD-500W":
				case "FD-505W":
				case "FD-5060W":
				case "FD-609W":
				case "FD-609Y":
				case "FD-609":
				case "PS-5014W":
				case "PS-5014Y":
				case "PS-5014":
				case "PS-5075W":
					garment.sport = "DIAMOND SPORTS";
					break;

				case "FD-250Y": 
				case "FD-250": 
				case "FD-251": 
				case "FD-5064Y": 
				case "FD-5064": 
				case "FD-5080Y": 
				case "FD-5080": 
				case "FD-5411Y": 
				case "FD-5411": 
					garment.sport = "FOOTBALL";
					break;

				case "FD-2000Y":
				case "FD-2000":
				case "FD-2020Y":
				case "FD-2020":
				case "FD-260Y":
				case "FD-260":
				case "FD-261Y":
				case "FD-261":
				case "FD-3007Y":
				case "FD-3007":
				case "FD-3011W":
				case "FD-3015W":
				case "FD-3019W":
				case "FD-3024Y":
				case "FD-3027":
				case "FD-3038Y":
				case "FD-3042":
				case "FD-3045W":
				case "FD-3047W":
				case "FD-3050Y":
				case "FD-3050":
				case "FD-4004W":
				case "FD-4014W":
					garment.sport = "LACROSSE";
					break;

				case "FD-3037W":
				case "FD-3048W":
				case "FD-3061Y":
				case "FD-3061":
				case "FD-3062Y":
				case "FD-3062":
				case "FD-3063Y":
				case "FD-3063":
				case "FD-3064Y":
				case "FD-3064":
				case "FD-3090W":
				case "FD-3092Y":
				case "FD-3092":
				case "FD-4005W":
				case "FD-857Y":
				case "FD-857":
				case "FD-858Y":
				case "FD-858":
					garment.sport = "SOCCER";
					break;

				case "FD-101":
				case "FD-161":
				case "FD-163":
				case "FD-164W":
				case "FD-164Y":
				case "FD-164":
				case "FD-1873W":
				case "FD-1873Y":
				case "FD-1873":
				case "FD-2042W":
				case "FD-2044W":
				case "FD-211Y":
				case "FD-211":
				case "FD-3069":
				case "FD-3070":
				case "FD-3089W":
				case "FD-3099W":
				case "FD-4009Y":
				case "FD-4010Y":
				case "FD-4018W":
				case "FD-477Y":
				case "FD-477":
				case "FD-486W":
				case "FD-486Y":
				case "FD-486":
				case "FD-487Y":
				case "FD-487":
				case "FD-5029W":
				case "FD-5036W":
				case "FD-5054":
				case "FD-597":
				case "FD-597Y":
				case "FD-597W":
				case "FD-6002W":
				case "FD-6003Y":
				case "FD-6003Y":
				case "FD-6003":
				case "FD-6004W":
				case "FD-6061W":
				case "FD-6061Y":
				case "FD-6061":
				case "FD-6062W":
				case "FD-6062Y":
				case "FD-6062":
				case "FD-6063W":
				case "FD-6063Y":
				case "FD-6063":
				case "FD-611":
				case "FD-611Y":
				case "FD-617Y":
				case "FD-617":
				case "FD-622":
				case "FD-634":
				case "FD-634Y":
				case "FD-648W":
				case "FD-648Y":
				case "FD-648":
				case "FD-659Y":
				case "FD-659":
				case "FD-682W":
				case "FD-682Y":
				case "FD-682":
				case "FD-692W":
				case "FD-692Y":
				case "FD-692":
				case "FD-7018W":
				case "FD-7020W":
				case "FD-7025Y":
				case "FD-7025":
				case "FD-706W":
				case "FD-762W":
				case "FD-828Y":
				case "FD-828":
				case "FD-829W":
				case "FD-842W":
				case "FD-842Y":
				case "FD-842":
				case "FD-862W":
				case "FD-862Y":
				case "FD-862":
				case "FD-863W":
				case "FD-863Y":
				case "FD-863":
				case "FD-872W":
				case "FD-872Y":
				case "FD-872":
					garment.sport = "SPIRITWEAR";
					break;

				case "FD-281":
				case "FD-3003":
				case "FD-3184W":
				case "FD-3185W":
					garment.sport = "VOLLEYBALL";


			}
			
			if(!garment.sport)
			{
				errorList.push("Couldn't determine the correct subfolder from the prepress folder.");
				log.e("bmCode did not match any of the cases in the switch statement.::bmCode used was " + garment.bmCode);
				localValid = false;
			}
		
		
			return localValid
		}



		//findGarmentFolder Function Description
		//comb through the sub folders of the 
		function findGarmentFolder(sport)
		{
			var localValid = true;


		
			try
			{
				var thePath = lib.prepressPath + sport;
				var sportFolder = new Folder(thePath);
				var subFolderList = sportFolder.getFiles();
				var codeMatches = [];

				for(var sf=0;sf<subFolderList.length;sf++)
				{
					var thisSubFolder = subFolderList[sf];
					if(thisSubFolder.name.indexOf(garment.bmCode)>-1)
					{
						codeMatches.push(thisSubFolder);
					}
				}

				if(codeMatches.length==1)
				{
					garment.folder = codeMatches[0];
				}
				else if(codeMatches.length == 0)
				{
					errorList.push("None of the folders inside this sport folder matched the desired BM Code.");
					log.e("The bmCode: " + garment.bmCode + " was not found in the sport folder: " + garment.sport);
					localValid = false;
				}
				else if(codeMatches.length > 1)
				{
					//do something to determine the correct code
					//this condition will occur when the code is "FD-161" and there also exist folders
					//folders named "FD-161W" and "FD-161Y"

					//commenting these lines in favor of testing with a dialog that allows the user to select the correct folder path
					//eventually this should be done automatically
					// errorList.push("There are multiple folders that match that BM Code.");
					// log.e("there are multiple folders in the sport folder that contain the BM Code " + garment.bmCode);
					// localValid = false;

					garment.folder = (whichOptionDialog(codeMatches,"Please select the correct garment."));

					if(garment.folder == undefined)
					{
						localValid = false;
						errorList.push("Couldn't identify the correct Converted_Templates Folder. Please try again.");
						log.e("User cancelled whichOptionDialog. Exiting script.");
					}
				}
			}
			catch(e)
			{
				errorList.push("Failed to find the correct garment folder inside the sport folder.");
				log.e("Failed to find the correct garment folder inside the sport folder.");
			}
		
		
			return localValid
		}



		//openConvertedTemplate Function Description
		//look for a file in the garment folder that matches the style number
		//if it exists, open it and set docRef = activeDocument
		//if it doens't exist, aler the user and exit.
		function openConvertedTemplate(folder)
		{
			var localValid = true;
		
			var containedFiles = folder.getFiles();

			var convertedFolders = [];

			//get converted_templates folder(s) and push to convertedFolders array.
			for(var ct=0;ct<containedFiles.length;ct++)
			{
				var thisFile = containedFiles[ct];
				if(thisFile.name.indexOf("onverted")>-1)
				{
					convertedFolders.push(thisFile);
				}
			}

			//check that the length of convertedFolders is only 1
			//less than 1 means this garment has not yet been converted
			//exactly 1 means we can proceed to open the file
			//more than one means something is awry and we need to figure out which is the correct folder..

			if(convertedFolders.length == 1)
			{
				var styleNumMatches = [];
				ctPath = new Folder(folder + "/" + convertedFolders[0].name);
				containedFiles = ctPath.getFiles();

				//loop each file in the converted templates folder and look for any files
				//that match the style number of the desired garment. push results to styleNumMatches array
				for(var ct=0;ct<containedFiles.length;ct++)
				{
					var thisFile = containedFiles[ct];
					if(thisFile.name.indexOf(garment.styleNum)>-1)
					{
						styleNumMatches.push(thisFile);
					}
				}

				//check the length of styleNumMatches
				//less than 1 means no file that contained the styleNum exists
				//exactly one means we found the file we needed. open it
				//more than 1 means either that the styleNum overlaps the bm code or there are 
				//multiple files with the same style number (reversible jerseys for example);
				if(styleNumMatches.length == 1)
				{
					docRef = open(styleNumMatches[0]);
				}
				else if(styleNumMatches.length == 0)
				{
					errorList.push("There was no file in the converted templates folder that matched the style number " + garment.styleNum);
					log.e("No file with the styleNum " + garment.styleNum + " exists in the converted templates folder.::Searching inside " + ctPath);
					localValid = false;
				}
				else if(styleNumMatches.length > 1)
				{
					errorList.push("There are multiple files in this folder that match that style number.");
					errorList.push("Bear with me. I'm working on how to handle that issue.");
					log.e("There are " + styleNumMatches.length + " files with the style number " + garment.styleNum + "in the converted templates folder.::\
						More logic is necessary to handle this contingency.");
					localValid = false;
				}
			}
			else if(convertedFolders.length == 0)
			{
				errorList.push("There is no converted templates folder here. It appears this garment has not yet been converted.");
				log.e("There is no converted templates folder for " + garment.name + ". Most likely this means the garment has not been converted.");
				localValid = false;
			}
			else if(convertedFolders.length > 1)
			{
				errorlist.push("There is more than 1 converted templates folder for the garment: " + garment.name);
				errorList.push("Please determine the correct converted templates folder and remove the incorrect one, then try again.");
				log.e("There is more than 1 converted templates folder for garment: " + garment.name);
				localValid = false;
			}
		
		
			return localValid;
		}
	

	/////////////////////////////
	//Graphic Related Functions//
	/////////////////////////////

		//getGraphics Function Description
		//get the information from each graphic in the lib.json
		//and save the information into garmentGraphics object
		function getGraphics()
		{
			var localValid = true;
		
			try
			{
				var graphicOptions = lib.json.config.graphics;

				for(var prop in graphicOptions)
				{
					garmentGraphics[prop] = graphicOptions[prop];
					garmentGraphics[prop].styleNum = prop.substring(prop.lastIndexOf("-")+1,prop.length);
					// garmentGraphics[prop].graphicCode = graphicOptions[prop].name;
					// garmentGraphics[prop].graphicLoc = graphicOptions[prop].locations;
					// garmentGraphics[prop].graphicColors = graphicOptions[prop].colors;
					// garmentGraphics[prop].teamNames = graphicOptions[prop].teamNames;
				}

			}
			catch(e)
			{
				errorList.push("Failed while getting the graphic information from the builder data for designId: " + lib.designNumber);
				errorList.push("Please let William know so he can analyze the data.");
				log.e("Failed to get graphic information from lib.json.::designNumber is: " + lib.designNumber + "::Continuing with execution of script\
					since this is not integral to the function of the other aspects of the script.");
			}
		
		
			return localValid
		}




	//getGraphicLocation Function Description
	//determine the path to the directory that holds the graphic
	function getGraphicLocation(code,obj)
	{
		var localValid = true;

		var codeOnly = code.substring(0,code.indexOf("-")).toLowerCase();
		
		try
		{
			switch(codeOnly)
			{
				case "fds":
					if(code.indexOf("ustom")>-1 && code.indexOf("rovided")>-1 && code.indexOf("onfile"))
					{
						obj.folder = "getItYourself";
					}
					else{
						obj.folder = lib.subGraphicsPath;
					}
					break;
				
				case "fdsp":
				case "fdsn":
					obj.folder = lib.subNameNumbersPath;
					break;

				case "fdsm":
					obj.folder = lib.mascotsPath;
					break;

				default:
					obj.folder = undefined;
			}

		}
		catch(e)
		{
			errorList.push("Failed while trying to determine the library location of the graphic: " + code);
			errorList.push("Please let William know about this error. Then please add the necessary graphic manually until the issue is fixed.");
			log.e("Failed while trying to determine the library location of the graphic: " + code +
				"::Continuing execution of script because this was not integral to the execution of the rest of the script.");

		}
	
	
		return localValid
	}



	//openGraphics Function Description
	//loop the elements of the garmentGraphics object and open
	//each graphic from it's respective location in the library
	function openGraphics(graphics)
	{
		var localValid = true;

		
		//loop each graphic and determine the correct file to open
		for (var g in graphics)
		{
			var graphicMatches = [];
			var theFolder = new Folder(graphics[g].folder);
			var containedFiles = theFolder.getFiles();

			//loop the containedFiles array and look for files that match the graphic code
			for(var gc=0;gc<containedFiles.length;gc++)
			{
				var thisFile = containedFiles[gc];
				if(thisFile.name.indexOf(graphics[g].styleNum)>-1)
				{
					graphicMatches.push(thisFile);
				}
			}

			//check how many matches there were
			//if 1, open the file
			//if 0, report the error and proceed
			//if more than one, report the error and proceed.
			if(graphicMatches.length == 1)
			{
				var theFile = new File(graphics[g].folder + "/" + graphicMatches[0].name)
				graphics[g].openedFile = open(theFile);
			}
			else if(graphicMatches.length == 0)
			{
				//didn't find the correct graphic. logging the error
				errorList.push("Could not find a graphic that matched: " + g);
				log.e("There was no graphic in " + graphics[g].folder + " matching the code: " + g + "::Continuing execution of the script\
					since this is not integral to the execution of the other aspects of the script.");
			}
			else if(graphicMatches.length > 1)
			{
				//too many graphics were found in the folder
				
				//commenting these lines in favor of a dialog to prompt the user for the correct graphic
				// errorList.push("Too many graphics were found in the graphics folder matching the code: " + g)
				// errorList.push("Please let William know about this error and pull the graphic manually until the issue is fixed.")
				// log.e("There were too many matching graphics in the folder.::Continuing execution since this is not integral to the function of the other aspects of the script.");

				log.e("There were too many matching graphics in the folder.::Prompting user for the correct graphic.");

				whichOptionDialog(graphicMatches,"Please select the correct graphic.");
			}
		}
	
	
		return localValid
	}


	/////////////////////
	//Generic Functions//
	/////////////////////

		//whichOptionDialog Function Description
		//take the matches array (which contains more than 1 item)
		//and create a dialog to prompt the user for the correct item
		function whichOptionDialog(matches, msg)
		{
		
			var result;

			var buttons = [];

			//create the dialog window
			var w = new Window("dialog", msg)
				var txt = w.add("statictext", undefined, msg);
				
				var btnGroup = w.add("group");
				btnGroup.orientation = "column";

				for(var num=0;num<matches.length;num++)
				{
					makeButton(matches[num].name,num)
				}

				var cancel = btnGroup.add("button", undefined, "Cacnel");
					cancel.onClick = function()
					{
						result = null;
						w.close();
					}
			w.show();

				
			//makeButton Function Description
			//generic button maker to use
			//inside loop
			function makeButton(txt,num)
			{
				buttons[num] = btnGroup.add("button", undefined, txt);
				buttons[num].onClick = function()
				{
					result = matches[num];
					w.close();
				}
			}


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
		designNumber : "", 
		designFilePath : "",
		subGraphicsPath : "",
		subNameNumbersPath : "",
		patternFillsPath : "",
		mascotsPath : "",
		prepressPath : "",
		designType :,
		json : {}
	}



	var garment = {};

	var garmentGraphics = {};

	var errorList = [];

	var valid = true;

	var docRef;


	//fetch the utilities container for logging
	//set the file path to the script resources folder 

	if($.os.match('Windows'))
	{
		//PC
		eval("#include \"N:\\Library\\Scripts\\Script Resources\\Data\\Utilities_Container.js\"");
		lib.designFilePath = "\"N:\\Library\\Scripts\\Script Resources\\Data\\json_design_files";
	} 
	else 
	{
		// MAC
		eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.js\"");
		lib.designFilePath = "/Volumes/Customization/Library/Scripts/Script Resources/Data/json_design_files";
		lib.subGraphicsPath = "/Volumes/Customization/Library/Graphics/Sublimation/";
		lib.subNameNumbersPath = "/Volumes/Customization/Library/Graphics/Sublimation_Name_Numbers/";
		lib.patternFillsPath = "/Volumes/Customization/Library/Pattern Fills/";
		lib.mascotsPath = "/Volumes/Customization/Library/Mascots/";
		lib.prepressPath = "/Volumes/Customization/Library/cads/prepress/";
	}


	//String object prototype that allows for getting a substring between the two arguments
	//the arguments both arguments should be either a number (index) or a regex
	// String.prototype.substringRegex = function(start,end)
	// {
	// 	if(start.typename == "Number")
	// }




	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////



	/////////////////////
	////TEST FUNCTION////
	/////////////////////

		// testFunction();

	/////////////////////
	////TEST FUNCTION////
	/////////////////////

	///////////////////////////////////////////////
	//search for design number and read json data//
	///////////////////////////////////////////////

		log.h("Beginning execution of getDesignNumber function.")
		if(getDesignNumber())
		{
			log.l("getDesignNumber function returned true. Set value of lib.designNumber to " + lib.designNumber);
		}
		else
		{
			valid = false;
		}

		if(valid)
		{
			log.h("Beginning execution of readJson function.");
			if(readJson(lib.designFilePath, lib.designNumber))
			{
				log.l("readJson function returned true. Set value of lib.json to contents of the fetched json file.")
			}
			else
			{
				valid = false;
			}
		}
	



	///////////////////////////
	//get garment information//
	///////////////////////////
		if(valid)
		{
			try
			{
				log.h("Beginning execution of getStyleNum function.");
				if(getStyleNum(lib.json.config.top.garment))
				{
					log.l("getStyleNum function returned true. Set value of garment.styleNum to " + garment.styleNum)
				}
				else
				{
					valid = false;
				}
			}
			catch(e)
			{
				errorList.push("An error occurred while getting the style number..");
				log.e("Failed while trying to get the style number.")
			}
		}

		if(valid)
		{
			log.h("Beginning execution of getGarName function.");
			if(getGarName(lib.json.config.top.garment))
			{
				log.l("getGarName function returned true. Set value of garment.name to " + garment.name);
			}
			else
			{
				valid = false;
			}
		}

		if(valid)
		{
			log.h("Beginning execution of getBMCode function.");
			if(getBMCode())
			{
				log.l("getBMCode function returned true. Set value of garment.bmCode" + garment.bmCode);
			}
			else
			{
				valid = false;
			}
		}

		if(valid)
		{
			log.h("Beginning execution of getSport function.");
			if(getSport(garment.bmCode))
			{
				log.l("getSport function returned true. Set value of garment.sport to " + garment.sport);
			}
			else
			{
				valid = false;
			}
		}

		if(valid)
		{
			log.h("Beginning execution of findGarmentFolder function.")
			if(findGarmentFolder(garment.sport))
			{
				log.l("findGarmentFolder function returned true. Set value of garment.folder to " + garment.folder);
			}
			else
			{
				valid = false;
			}
		}


	///////////////////////////
	//get graphic information//
	///////////////////////////

		if(valid)
		{
			log.h("Beginning execution of getGraphics function.");
			if(getGraphics())
			{
				log.l("getGraphics function returned true.");
				for(var graphic in garmentGraphics)
				{
					log.l("Added " + garmentGraphics[graphic].graphicCode + " to garmentGraphics object.");
				}
			}
		}

		if(valid)
		{
			log.h("Beginning loop to get location of each graphic application.")

			for(var gl in garmentGraphics)
			{
				log.h("Beginning execution of getGraphicLocation function for graphic: " + gl);
				if(getGraphicLocation(gl,garmentGraphics[gl]))
				{
					log.l("getGraphicLocation function for " + gl + " returned true. Set garmentGraphics[" + gl + "].folder to " + garmentGraphics[gl].folder);
				}
			}
		}


	/////////////////////////////
	//open files function calls//
	/////////////////////////////

		if(valid)
		{
			log.h("Beginning execution of openConvertedTemplate function.");
			if(openConvertedTemplate(garment.folder))
			{
				log.l("openConvertedTemplate function returned true. The necessary document has been opened and saved into the docRef variable.")
			}
			else
			{
				valid = false;
			}
		}

		if(valid)
		{
			log.h("Beginning execution of openGraphics function.");
			if(openGraphics(garmentGraphics))
			{
				log.l("openGraphics function returned true. The necessary documents have been opened.")
			}
			else
			{
				valid = false;
			}
		}





	////////End/////////
	///Function Calls///
	////////////////////

	/*****************************************************************************/

	//output the results of the script to the log file
	printLog();

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}
	return valid

}
container();