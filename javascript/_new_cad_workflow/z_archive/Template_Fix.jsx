﻿function templateFixes(){	var docRef = app.activeDocument;	var layers = docRef.layers;		layers.getByName("Artwork Layer").layers.getByName("Player Name").zOrder(ZOrderMethod.BRINGFORWARD);	try{		layers.getByName("Artwork Layer").layers.getByName("Player Number").name = "Back Number";	}	catch(e){	}	var dest = layers.getByName("Information");	var bgLayer = layers.getByName("BKGRD, do not unlock");	var fabricType = bgLayer.groupItems[3].textFrames[0];	bgLayer.locked = false;	dest.locked = false;	fabricType.moveToBeginning(dest);	fabricType.zOrder(ZOrderMethod.SENDTOBACK);	fabricType.name = "Fabric Type";	bgLayer.locked = true;	dest.locked = true;		var numberBox = layers.getByName("Mockup").pageItems.getByName("Number Set Display");	numberBox.width = 581;	numberBox.left = 159;}templateFixes();