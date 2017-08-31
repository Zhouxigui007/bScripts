var copyToMaster = function(){
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var masterFile = getTargetDoc();
	if(masterFile == null){
		return;
	}
	var master = app.documents.getByName(masterFile);
	var sourceDoc = app.activeDocument;
	var move;
	var myLayer;
	var targetLayer;
	var innerTargetLayer;
	var outerTargetLayer;
	
	
	//Logic Container//
	
	function outerRecursive(layer){
		var name = layer.name;
		try{
			outerTargetLayer = targetLayer.layers.getByName(layer.name);
		}
		catch(e){
			outerTargetLayer = targetLayer.layers.add(ElementPlacement.PLACEATBEGINNING);
			outerTargetLayer.name = name;
		}
		if(layer.pageItems.length>0){
			for(var b=layer.pageItems.length-1;b>-1;b--){
				var curItem = layer.pageItems[b];
				var copyCurItem = curItem.duplicate(outerTargetLayer,ElementPlacement.PLACEATBEGINNING);
				copyCurItem.left = curItem.left+move;
			}
		}
		if(layer.layers.length>0){
			for(var e=layer.layers.length-1;e>-1;e--){
				var subSubLayer = layer.layers[e];
				innerRecursive(subSubLayer);
			}
		}
	}
	
	function innerRecursive(subLayer){
		try{
			innerTargetLayer = outerTargetLayer.layers.getByName(subLayer.name);
		}
		catch(e){
			innerTargetLayer = outerTargetLayer.layers.add();
			innerTargetLayer.name = subLayer.name;
		}
		if(subLayer.pageItems.length>0){
			for(var g=subLayer.pageItems.length-1;g>-1;g--){
				var curItem = subLayer.pageItems[g];
				var copyCurItem = curItem.duplicate(innerTargetLayer,ElementPlacement.PLACEATBEGINNING);
				copyCurItem.left = copyCurItem.left + move;
			}
		}
		if(subLayer.layers.length>0){
			for(var h=subLayer.layers.length-1;h>-1;h--){
				innerRecursive(subLayer.layers[h]);
			}
			if(name == "Information"){
				layer.locked = true;
				layer.visible = true;
			}
			else if(name == "Prepress"){
				layer.locked = false;
				layer.visible = false;
			}
		}
		if(subLayer.name == "Information"){
			subLayer.locked = true;
			subLayer.visible = true;
		}
		else if(subLayer.name == "Prepress"){
			subLayer.locked = false;
			subLayer.visible = false;
		}
	}
	
	function getTargetDoc(){
	
		var docs = [];

		for(var a=0;a<app.documents.length;a++){
			docs.push(app.documents[a].name);
		}

		var targetIndex = new Window("dialog", "Which is Master");
			var newTextGroup = targetIndex.add("group");
				newTextGroup.text = targetIndex.add("statictext",undefined,"Which file do you want to merge to?");
				newTextGroup.align = "center";
			var radioGroup = targetIndex.add("group");
				radioGroup.alignChildren = "left";
				radioGroup.orientation = "column";
				for(var a=0;a<docs.length;a++){
					radioGroup.add("radiobutton",undefined,docs[a]);
				}
				radioGroup.children[0].value = true;
		
			var buttonGroup = targetIndex.add("group");
				var ok = buttonGroup.add("button", undefined, "OK");
				var can = buttonGroup.add("button", undefined, "Cancel");
		
		
		function selected(which){
			for(var c=0;c<which.children.length;c++){
				if(which.children[c].value == true){
					return which.children[c].text;
				}
			}
		}

		if(targetIndex.show() == 1){
			return (selected(radioGroup));
		}
		else{
			return;
		}

		targetIndex.show();
	}
	
	function createNewArtboard(){
		master.activate();
		move = ((master.artboards.length) * 2100)
		var aBcount = master.artboards.length;
		var lastAB = master.artboards[master.artboards.length-1];
		var aB = lastAB.artboardRect;
		var left = aB[0];
		var top = aB[1];
		var right = aB[2];
		var bot = aB[3];
		var moveRight = 2100;
		var moveDown = 2100;
		if(aBcount != 5 && aBcount != 10){
			var newLeft = left + moveRight;
			var newRight = right + moveRight;
			var rect = [newLeft,top,newRight,bot];
			var newAb = master.artboards.add(rect);
		}
		else{
			var originAb = master.artboards[0].artboardRect;
			var oLeft = originAb[0];
			var oTop = originAb[1];
			var oRight = originAb[2];
			var oBot = originAb[3];
			oTop = oTop - moveDown;
			oBot = oBot - moveDown;
			var rect = [oLeft,oTop,oRight,oBot];
			var newAb = master.artboards.add(rect);
		}
		sourceDoc.activate();
	}
	
	//Function Calls
	
	createNewArtboard();
	
	for(var a=0;a<layers.length;a++){
		layers[a].locked = false;
		layers[a].visible = true;
	}
	for(var a=0;a<master.layers.length;a++){
		master.layers[a].locked = false;
		master.layers[a].visible = true;
	}
	
	for(var a=layers.length-1;a>-1;a--){
		var curLayer = layers[a];
		try{
			targetLayer = master.layers.getByName(curLayer.name);
		}
		catch(e){
			targetLayer = master.layers.add();
			targetLayer.name = curLayer.name;
		}
		if(curLayer.pageItems.length>0){
			for(var k=curLayer.pageItems.length-1;k>-1;k--){
				var curItem = curLayer.pageItems[k];
				var copyCurItem = curItem.duplicate(targetLayer,ElementPlacement.PLACEATBEGINNING);
				copyCurItem.left = copyCurItem.left + move;
			}

		}
		if(curLayer.layers.length>0){
			for(var f=curLayer.layers.length-1;f>-1;f--){
				var curSubLayer = curLayer.layers[f];
				outerRecursive(curSubLayer);
			}
		}
	}
	
	//re-lock/hide layers;
	
	for(var a=0;a<master.layers.length;a++){
		if(master.layers[a].name == "Guides" || master.layers[a].name == "BKGRD, do not unlock"){
			master.layers[a].locked = true;
		}
		else{
			for(var b=0;b<master.layers[a].layers.length;b++){
				var level2 = master.layers[a].layers[b];
				if(level2.name == "Prepress"){
					level2.locked = false;
					level2.visible = false;
				}
				else if(level2.name == "Information"){
					level2.locked = true;
					level2.visible = true;
				}
			}
		}
	}
	



	
}
copyToMaster();
copyToMaster = null;