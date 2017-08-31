/*

Script Name: Add_Guides_To_Prepress
Author: William Dowling
Build Date: 28 February, 2017
Description: Use the guides placed on the current active document as a template for
				guides on the rest of the open documents. This adds a guide
				to each size in the same position as the initial setup file.
Build number: 1.0

Progress:

	Version 1.001
		28 February, 2017
		Initial build
		Tested and working for football 250Y
		Distributing to art team.
	
	Version 1.002
		28 February, 2017
		Initial test produced no results for user...
		Realized i had simply forgotten to push the latest version to the network.
		Another error was discovered, only 1 guide per piece was being saved, because the guide object was being
			overwritten each time through the loop.
		Also fixed an issue which caused a new instance of the string " Guide" to be appended to the guide name
			even if the name was already correct. example "YXS Player Name Guide Guide Guide".
			Updated that so it will only rename it if the name does not already contain the name guide.

*/

function container()
{

	//sendErrors Function Description
	//Display any errors to the user in a preformatted list
	function sendErrors(errorList)
	{
		alert("The following errors occurred.\n" + errorList.join("\n"));
	}

	function getGuides()
	{
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		var placedGuides = {};

		var ppLay = layers[0].layers["Prepress"];

		placedGuides.docName = docRef.name;

		//loop the prepress layers to build placedGuides object
		//log the position and parent of each item so it
		//can be easily determined where to place the duplicated guides
		//in other styles.

		for(var pp=0;pp<ppLay.layers.length;pp++)
		{
			var thisLay = ppLay.layers[pp];
			curSize = thisLay.name;
			placedGuides[curSize] = {};

			//loop the shirt pieces in this size layer
			for(var cs=0;cs<thisLay.groupItems.length;cs++)
			{
				var thisShirtPiece = thisLay.groupItems[cs];
				thisName = thisShirtPiece.name;
				
				
				//loop the pageItems inside thisShirtPiece
				//if any pageItem.guides = true
				//log the guide to placedGuides object and 

				if(thisName.indexOf("Outside Cowl")>-1)
				{
					var pause = 0;
				}
				placedGuides[curSize][thisName] = undefined;
				for(var pi=0;pi<thisShirtPiece.pageItems.length;pi++)
				{
					var thisItem = thisShirtPiece.pageItems[pi];
					if(thisItem.guides)
					{
						// placedGuides[curSize][thisName]["guide " + pi] = {};
						if(placedGuides[curSize][thisName] == undefined)
						{
							placedGuides[curSize][thisName] = {};
						}
						placedGuides[curSize][thisName]["guide " + pi] = thisItem;
						placedGuides[curSize][thisName]["guide " + pi].shirtPiece = thisName;
						placedGuides[curSize][thisName]["guide " + pi].top = thisItem.top;
						placedGuides[curSize][thisName]["guide " + pi].left = thisItem.left;
						if(thisItem.name.indexOf("Guide")== -1)
						{
							placedGuides[curSize][thisName]["guide " + pi].name = thisItem.name + " Guide";
						}

					}
					
				}

			}
		}

		
		
		return placedGuides;
	}

	function addNewGuides(guidesToAdd)
	{
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var aB = docRef.artboards;
		var swatches = docRef.swatches;
		var localValid = true;
		var obj = {};
		var arr = [];
		
		//prepress layer
		var ppLay = layers[0].layers["Prepress"];
		ppLay.visible = true;
	
		for(var pp=0;pp<ppLay.layers.length;pp++)
		{
			var thisLay = ppLay.layers[pp];
			curSize = thisLay.name;
			var sizeObj = guidesToAdd[curSize];

			//loop the shirt pieces in this size layer
			for(var cs=0;cs<thisLay.groupItems.length;cs++)
			{
				var thisShirtPiece = thisLay.groupItems[cs];
				thisName = thisShirtPiece.name;
				if(sizeObj[thisName])
				{
					var pieceObj = sizeObj[thisName];
				}
				else
				{
					continue;
				}

				
				//loop the guides saved inside the pieceObj
				//and place each one in place on the destination piece.
				for(var prop in pieceObj)
				{
					if(prop.indexOf("guide")>-1)
					{
						//this is a proper guide object
						//duplicate the guide to the current piece and ensure it's in the right place
						var dest = thisShirtPiece;
						try
						{
							dest = dest.groupItems["Prod Info"];
						}
						catch(e)
						{
							//this garment hasn't had it's layer structure standardized. just place the guide at the top of the group
						}
						var guideCopy = pieceObj[prop].duplicate(docRef);
						guideCopy.moveToBeginning(dest);
						// guideCopy.left = pieceObj[prop].
					}
				}


			}
		}

		//hide pplay
		ppLay.visible = false;

		return localValid;
	}

	var errorList = [];

	//batchPrompt Function Description
	//create a dialog to ask user whether to do a single file or batch all open files.
	function batchPrompt()
	{
		var localValid = true;

		var w = new Window("dialog","Batch all?");
			var topTxt = w.add("statictext", undefined, "Do you want to batch all open documents,");
			var topTxt2 = w.add("statictext", undefined, "Make sure that the current document is the one with the guides already applied in the position you want them.");
			// var topTxt2 = w.add("statictext", undefined, "Or just the current document?");

			var btnGroup = w.add("group");
				btnGroup.orientation = "column";
				var allButton = btnGroup.add("button", undefined, "Batch All");
				allButton.onClick = function()
				{
					w.close();
					var newGuides = getGuides();
					while(app.documents.length>1)
					{
						if(app.activeDocument.name == newGuides.docName)
						{
							app.documents[1].activate();
						}
						addNewGuides(newGuides);
						// app.activeDocument.close(SaveOptions.SAVECHANGES);
						break;
					}
				}

				//removing this section because it doesn't currenlty make sense to
				//adjust only one document. If there is truly only one document to fix,
				//user should simply have two documents open, the one with the correct guides,
				//and the document the guides should be copied to.
				//////////////////////////////////////////////////////////////////////////////
				// var curButton = btnGroup.add("button", undefined, "Just This Document");
				// curButton.onClick = function()
				// {
				// 	w.close();
				// 	var newGuides = getGuides();
				// 	addNewGuides(newGuides);
				// }

				var cancelButton = btnGroup.add("button", undefined, "Cancel");
				cancelButton.onClick = function()
				{
					w.close();
				}

		w.show();


		return localValid
	}

	///////Begin////////
	////Data Storage////
	////////////////////

	if($.os.match('Windows'))
	{
		//PC
		eval("#include \"N:\\Library\\Scripts\\Script Resources\\Data\\Utilities_Container.js\"");
	} 
	else 
	{
		// MAC
		eval("#include \"/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.js\"");
	}

	////////End/////////
	////Data Storage////
	////////////////////



	batchPrompt();

	// var newGuides = getGuides();
	
	// while(app.documents.length > 1)
	// {
	// 	if(app.activeDocument.name == newGuides.docName)
	// 	{
	// 		app.documents[1].activate();
	// 	}

	// 	if(addNewGuides(newGuides))
	// 	{
	// 		app.activeDocument.close(SaveOptions.SAVECHANGES);
	// 	}
	// 	else
	// 	{
	// 		alert("An error occurred while trying to update the guides for the document: " + app.activeDocument.name);
	// 		if(errorList.length>0)
	// 		{
	// 			sendErrors(errorList);
	// 		}
	// 		return;
	// 	}
	// }
}
container();

