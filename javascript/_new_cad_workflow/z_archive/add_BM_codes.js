function wrapper()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var artLayer = layers[0].layers["Artwork Layer"];
	var infoLayer = layers[0].layers["Information"];
	var garCode = infoLayer.textFrames["Garment Code"];
	var fab = infoLayer.textFrames["Fabric Type"];
	var desc = infoLayer.textFrames["Garment Description"];
	var regRag = infoLayer.layers[0].name;
	var mockLayer = layers[0].layers["Mockup"];

	//lock unlock function for layers

	function lockUnlock(which)
	{
		infoLayer.locked = which;
	}

	lockUnlock(false);
	
	//change garment code conditionally based on
	//whether shirt is regular or raglan
	//else throw an error and return;


	if(regRag.indexOf("Raglan")>-1)
	{
		garCode.contents += " | FD-161Y";
	}
	else if(regRag.indexOf("Regular")>-1)
	{
		garCode.contents += " | FD-163Y";
	}
	else
	{
		alert("Couldn't find the correct information layer.");
		return;
	}

	fab.contents = "See Paperwork";
	desc.contents = "FULL DYE YOUTH SLOW PITCH SHORT SLEEVE";

	lockUnlock(true);
	artLayer.locked = true;



}

if(confirm("Batch?"))
{
	while(app.documents.length>0)
	{
		wrapper();
		app.activeDocument.close(SaveOptions.SAVECHANGES);
	}
}
else
{
	wrapper();
}