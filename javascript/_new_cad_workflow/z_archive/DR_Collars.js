//Replace slowpitch collars with Made in DR collars

function wrapper(){
	app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
	var docRef = app.activeDocument;
	var sourceDoc = app.documents["DR Collars.ai"];
	var layers = docRef.layers;
	var mockSize;


	var regRag = layers[0].layers["Information"].layers[0].name;
	if(regRag.indexOf("Reg")>-1){
		regRag = "Reg";
	}
	else if(regRag.indexOf("Rag")>-1){
		regRag = "Rag";
	}


	var wearer = docRef.layers[0].name;
	if(wearer.indexOf("SLOWW")>-1){
		wearer = "Womens";
		mockSize = "M";
	}
	else if(wearer.indexOf("SLOWY")>-1){
		wearer = "Youth";
		mockSize = "YXL";
	}
	else if(wearer.indexOf("SLOW")>-1){
		wearer = "Mens";
		mockSize = "XL";
	}


	var getCollars = sourceDoc.layers[wearer + " " + regRag].groupItems;

	function usaCollars(){
		var dest = docRef.layers[0].layers.add();
		dest.name = "USA Collars";
		dest.zOrder(ZOrderMethod.SENDTOBACK);
		var ppLayer = layers[0].layers["Prepress"]
		ppLayer.visible = true;
		var sizes = ppLayer.layers;
		for(var a=sizes.length-1;a>-1;a--){
			var curSize = sizes[a].name;
			var theCollar = sizes[a].groupItems[curSize + " Collar"];
			theCollar.moveToBeginning(dest);

		}
		dest.visible = false;
		var mockupItems = layers[0].layers["Mockup"].pageItems;
		for(var a=0;a<mockupItems.length;a++){
			if(mockupItems[a].name.indexOf("Collar")>-1){
				mockupItems[a].remove();
				break;
			}
		}
	}
	usaCollars();

	function drCollars(srcCollars){
		var ppLayer = layers[0].layers["Prepress"];
		for(var a=0;a<srcCollars.length;a++){
			var curSize = srcCollars[a].name.substring(0,srcCollars[a].name.indexOf(" "));
			var dest = ppLayer.layers[curSize];
			srcCollars[a].duplicate(dest);
			if(curSize == mockSize){
				srcCollars[a].duplicate(layers[0].layers["Mockup"]);
			}
		}ppLayer.visible = false;
	}
	drCollars(getCollars);

}

while(app.documents.length>1){
	if(app.documents[0].name != "DR Collars.ai"){
		app.documents[0].activate();
		wrapper();
		app.activeDocument.close(SaveOptions.SAVECHANGES);
	}
	else{
		app.documents[1].activate();
		wrapper();
		app.activeDocument.close(SaveOptions.SAVECHANGES);
	}
}