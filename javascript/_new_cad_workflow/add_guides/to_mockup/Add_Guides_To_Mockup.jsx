/*

Script Name: Add_Guides
Author: William Dowling
Build Date: 24 January, 2017
Description: Create boxes in the correct artwork locations/sizes on the 000 style, then create guides 
	and duplicate those boxes to all necessary documents
Build number: 1.0

Progress:

	Version 1.001
		24 January, 2017
		Initial Build

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



	//copyArt Function Description
	//check for selection.
	//if selection length > 0, log location of selected items
	function copyArt(arg)
	{
		var localValid = true;
	
		if(docRef.selection.length == 0)
		{
			errorList.push("You must select the boxes you want to use as guides!");
			localValid = false;
		}
		else
		{
			// var newGroup = docRef.groupItems.add();
			// for(var a = docRef.selection.length-1;a >-1; a--)
			// {
			// 	var thisSel = docRef.selection[a];
			// 	thisSel.moveToBeginning(newGroup);
			// }
			// docRef.selection = null;
			// newGroup.selected = true;
			app.executeMenuCommand("outline");
			app.executeMenuCommand("group");
			docRef.selection[0].name = "Art Guidelines";
			app.executeMenuCommand("copy");
			app.selection[0].remove();
		}
	
	
		return localValid;
	}



	//pasteGuides Function Description
	//paste in the copied items and run action to make them into guides
	function pasteGuides()
	{
		var localValid = true;
		docRef = app.activeDocument;
		
		try
		{
			var guideLay = docRef.layers["Guides"];
		}
		catch(e)
		{
			var guideLay = docRef.layers.add();
			guideLay.name = "Guides";
		}
		guideLay.locked = false;
		guideLay.visible = true;
		docRef.selection = null;
		app.executeMenuCommand("pasteInPlace");
		docRef.selection[0].moveToBeginning(guideLay);
		app.executeMenuCommand("makeguide");
		guideLay.locked = true;

	
	
		return localValid
	}

	//batchPrompt Function Description
	//create a dialog to ask user whether to do a single file or batch all open files.
	function batchPrompt()
	{
		var localValid = true;
	
		var w = new Window("dialog","Batch all or just this document?");
			var topTxt = w.add("statictext", undefined, "Do you want to batch all open documents,");
			var topTxt2 = w.add("statictext", undefined, "Or just the current document?");
	
			var btnGroup = w.add("group");
				btnGroup.orientation = "column";
				var allButton = btnGroup.add("button", undefined, "Batch All");
				allButton.onClick = function()
				{
					w.close();
					while(app.documents.length>0)
					{
						pasteGuides();
						app.activeDocument.close(SaveOptions.SAVECHANGES);
					}
				}
	
				var curButton = btnGroup.add("button", undefined, "Just This Document");
				curButton.onClick = function()
				{
					w.close();
					pasteGuides();
				}
	
				var cancelButton = btnGroup.add("button", undefined, "Cancel");
				cancelButton.onClick = function()
				{
					w.close();
				}
	
		w.show();
	
	
		return localValid
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
	var errorList = [];

	var valid = true;

	valid = copyArt();

	if(valid)
	{
		batchPrompt();
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