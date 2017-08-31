function makeSeparation(){
	var sourceDoc = app.activeDocument;
	if(sourceDoc.selection.length == 1){
	var theArt = sourceDoc.selection
	var templateLoc = new Folder("~/Desktop/Templates/");
	var template = new File(templateLoc + "/STE_TEMPLATE.ait");
	var destDoc = open(template);
}