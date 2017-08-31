function fixLayers(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var artLayers = layers.getByName("Artwork Layer");
	var lockerTag = artLayers.layers.add();
	lockerTag.zOrder(ZOrderMethod.SENDTOBACK);
	lockerTag.name = "Locker Tag";
	var sponsor = artLayers.layers.add();
	sponsor.name = "Sponsor Logo";
	sponsor.zOrder(ZOrderMethod.SENDTOBACK);
}
fixLayers();