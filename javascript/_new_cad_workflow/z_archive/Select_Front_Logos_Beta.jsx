﻿function selectFrontLogos(){	var docRef = app.activeDocument;	var layers = docRef.layers;	var wearerLayer = docRef.activeLayer;		docRef.selection = null;			if(wearerLayer.layers.length > 0){ 		if(wearerLayer.layers[0].name == "XXS" || wearerLayer.layers[0].name == "XS" || //			wearerLayer.layers[0].name == "S" || wearerLayer.layers[0].name == "YXS"){			for(var a=0;a<wearerLayer.layers.length;a++){				var curSize = wearerLayer.layers[a];				try{					var frontLogo = curSize.groupItems.getByName(curSize.name + " Front").pageItems.getByName(curSize.name + " Front Logo");					frontLogo.selected = true;				}				catch(e){					alert("There don't seem to be any Front Logos in your artwork");				}						}		}	}	else{		alert("Please select an appropriate layer" + ('\n') + "I.e. 'MENS 015' or 'WOMENS 031'");	}}selectFrontLogos();