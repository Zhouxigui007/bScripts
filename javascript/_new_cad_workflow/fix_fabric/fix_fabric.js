function test()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	

	var garCode = "FD_243W_"

	var saveLoc = "~/Desktop/automation/template_creation/full_button_fabric_update/243W/";

	var newFabric = "UTK-2619";

	var styleNum = layers[0].name.substring(layers[0].name.lastIndexOf("_")+1,layers[0].name.length);

	layers[0].name = garCode + styleNum;

	var infoLay = layers[0].layers["Information"];
	var fab = infoLay.textFrames["Fabric Type"];
	var codeCallout = infoLay.textFrames["Garment Code"];

	infoLay.locked = false;
	fab.contents = newFabric;
	codeCallout.contents = garCode + styleNum;
	infoLay.locked = true;

	var fileName = garCode + styleNum + ".ai";
	var saveFile = new File(saveLoc + fileName);

	docRef.saveAs(saveFile);
}

var batch = prompt("Batch all open documents or just one document?","Enter \"1\" for single document. Or enter \"all\" to batch all open documents.");

if(batch == "all")
{
	while(app.documents.length>0)
	{
		test();
		app.activeDocument.close();
	}
}
else if(batch == "1")
{
	test();
}
else
{
	alert("Invalid Selection.");
}