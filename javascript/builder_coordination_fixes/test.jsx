

function test()
{
	//current document info
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var swatches = docRef.swatches;
	var mockLay = layers[0].layers["Mockup"];
	var infoLay = layers[0].layers["Information"];
	var guidesLay = layers["Guides"];
	var bkgdLay = layers["BKGRD, do not unlock"];

	var code = getCode(layers[0]);

	// #include "~/Desktop/automation/builder_coordination_fixes/fixerData.js";

	#include "/Volumes/Customization/Library/Scripts/builder_coordination_fixes/fixerData.js";

	if(fixerData[code])
	{
		var thisData = fixerData[code];
	}
	else
	{
		alert("No data for that garment. Sorry.");
		return;
	}

	infoLay.locked = false;
	guidesLay.locked = false;



	//logic container
	function getCode(layer)
	{
		return layer.name.substring(0,layer.name.lastIndexOf("_"));
	}

	function collarCallout()
	{
		var data = thisData.collarCalloutData;
		var bkgd = bkgdLay;
		bkgd.locked = false;
		var existingCallout = data.existingCallout;
		if(existingCallout)
		{
			existingCallout.left = data.moveExistingCallout.left;
			existingCallout.top = data.moveExistingCallout.top;
		}


		var newCallout = infoLay.textFrames.add();
		newCallout.name = "Collar Color"
		newCallout.contents = "COLOR";
		newCallout.textRange.characterAttributes.size = data.size;
		newCallout.textRange.characterAttributes.fillColor= swatches[data.textColor].color;
		newCallout.textRange.characterAttributes.fillColor.tint = data.tint;
		newCallout.left = data.left;
		newCallout.top = data.top;

		bkgd.locked = true;
	}


	function makeThings(dest,data)
	{
		var thisObj,newThing;
		for(var thing in data)
		{
			thisObj = data[thing];
			newThing = dest.pathItems.rectangle(thisObj.top,thisObj.left,thisObj.width,thisObj.height);
			if(thisObj.fill)
			{
				try
				{
					newThing.fillColor = swatches[thisObj.fill].color;
				}
				catch(e)
				{
					newThing.fillColor = swatches["C1"].color;
				}
			}
			else            
			{
				newThing.filled = false;
			}
			if(thisObj.stroke)
			{
				newThing.strokeColor = swatches[thisObj.stroke].color;
				newThing.strokeWidth = thisObj.strokeWidth;
			}
			else
			{
				newThing.stroked = false;
			}
			if(thisObj.rename)
			{
				newThing.name = thing;
			}
			if(thisObj.guides)
			{
				newThing.guides = true;
			}
		}
	}

	function removeGuides()
	{
		for(var rg = guidesLay.pageItems.length-1;rg >-1; rg--)
		{
			var thisItem = guidesLay.pageItems[rg];
			if(thisItem.name.indexOf("uide")>-1)
			{
				thisItem.remove();
			}
		}
	}


	//function calls

	//add the collar color callout
	collarCallout();

	if(thisData.edge)
	{
		//make the edges
		makeThings(guidesLay,thisData.edge)
	}

	//make the placment guides
	//if a placementGuides layer exists already,
	//delete it so we can start fresh
	try
	{
		infoLay.layers["Placement Guides"].remove();
	}
	catch(e)
	{
		//no existing placement guides layer.
	}

	if(thisData.placementGuides)
	{
		var placeGuideLay = infoLay.layers.add();
		placeGuideLay.name = "Placement Guides";
		makeThings(placeGuideLay,thisData.placementGuides);
	}

	if(thisData.mockupAssets)
	{
		//make the mockup assets
		makeThings(mockLay,thisData.mockupAssets);
	}

	//check if there's any additional functionality needed
	if(thisData.additionalFunctionality)
	{
		thisData.additionalFunctionality();
	}

	removeGuides();

	infoLay.locked = true;
	guidesLay.locked = true;

}

//single execution
// test();

//batch execution
while(app.documents.length > 0)
{
	test();
	app.activeDocument.close(SaveOptions.SAVECHANGES);
}