function wrapper()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	try
	{
		var theLayer = layers["Prepress"];
	}
	catch(e)
	{
		try{
			var theLayer = layers["New-Correct Cads"];
		}
		catch(e)
		{
			try
			{
				var theLayer = layers[prompt("Type the name of the prepress layer exactly. (Case Sensitive)")];
			}
			catch(e)
			{
				alert("You either hit 'Cancel' or something went seriously wrong, here. Take a screenshot and see William. He wants to know what went wrong...");
				return;
			}

		}
	}
	var theText = prompt("Enter the text:", "eg. Patriots");

	var curItem;
	for(var a=0;a<theLayer.groupItems.length;a++)
	{
		curGroup = theLayer.groupItems[a];
		if(curGroup.textFrames.length>0)
		{
			curGroup.textFrames[0].contents = theText;
		}
	}
}
wrapper();