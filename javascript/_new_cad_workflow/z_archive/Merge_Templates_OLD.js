

function copyToMaster(){
	app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var masterFile = getTargetDoc();
	if(masterFile == null){return;}
	var master = app.documents.getByName(masterFile);
	var move;
	
	///////////////////////
	////Logic Container////
	///////////////////////
	
	function outer(target,source){
		if(source.pageItems.length>0){
			for(var c=source.pageItems.length-1;c>-1;c--){
				var curItem = source.pageItems[c];
				moveItem(curItem2,move[0],move[1]);
				var curItem2 = curItem.duplicate(target);
			}
		}
		if(source.layers.length>0){
			for(var c=source.layers.length-1;c>-1;c--){
				var subSubLayer = source.layers[c];
				try{
					var innerTarget = target.layers.getByName(subSubLayer.name);
				}
				catch (e){
					var innerTarget = target.layers.add();
					innerTarget.name = subSubLayer.name;
				}
				inner(innerTarget,subSubLayer);
			}
		}

	}
	
	function inner(inTarget, inSource){
		if(inSource.pageItems.length>0){
			for(var d=inSource.pageItems.length-1;d>-1;d--){
				var curItem = inSource.pageItems[d];
				moveItem(curItem2,move[0],move[1]);
				var curItem2 = curItem.duplicate(inTarget);
			}
		}
		if(inSource.layers.length>0){

			for(var d=inSource.layers.length-1;d>-1;d--){
				try{
					var newInTarget = inTarget.layers.getByName(inSourceLayers.layers[d].name);
				}
				catch(e){
					var newInTarget = inTarget.layers.add();
					newInTarget.name = inSourceLayers.layers[d].name;
				}
				var newInSource = inSource.layers[d];
				inner(newInTarget,newInSource);
			}
		}
	}
	
	function getTargetDoc(){

		var targetIndex = new Window("dialog", "Which is Master");
			var newTextGroup = targetIndex.add("group");
				newTextGroup.text = targetIndex.add("statictext",undefined,"Which file do you want to merge to?");
				newTextGroup.align = "center";
			var radioGroup = targetIndex.add("group");
				radioGroup.alignChildren = "left";
				radioGroup.orientation = "column";
				for(var a=0;a<app.documents.length;a++){
					if(app.documents[a] != app.activeDocument){
						radioGroup.add("radiobutton",undefined,app.documents[a].name);
					}
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
		var aBcount = master.artboards.length;
		var lastAB = master.artboards[master.artboards.length-1];
		var aB = lastAB.artboardRect;
		var left = aB[0];
		var top = aB[1];
		var right = aB[2];
		var bot = aB[3];
		var moveRight = 2100;
		var moveDown = 2100;
		if(aBcount != 4 && aBcount != 8){
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
		
		//determine how far in which direction the duplicates should move
		if(aBcount < 4){
			move = [(aBcount)*2100, 0]
		}
		else if(aBcount == 4){
			move = [0,2100];
		}
		else if(aBcount>4 && aBcount<8){
			move = [(aBcount)*2100, 2100];
		}
		else if(aBcount == 8){
			move = [0,4200];
		}
		else if(aBcount > 8 && aBcount<12){
			move = [(aBcount)*2100, 4200];
		}
		
// 		master.convertCoordinate(CoordinateSystem.ARTBOARDCOORDINATESYSTEM);
		master.artboards.setActiveArtboardIndex(master.artboards.length-1);
		docRef.activate();
	}
	
	function moveItem(i,r,d){
		i.left = i.left + r;
		i.top = i.top - d;
	}
	
	function saveDoc(){
		function findDest(){
			var dest = new Folder("~/Desktop" + "/Today's Temp");
			return dest.fsName
		}
		var dest = findDest();
 		dest = "/Volumes/Macintosh HD" + dest;
		$.writeln(dest);
		if(!dest.exists){
			var newFolder = new Folder(dest);
			newFolder.create();
		}
		if(app.activeDocument.name.substring(0,2) == "Un"){
			var oN = prompt("Enter Order Number", "1234567");
			var fileName = oN + " Master";
		}
		else{
			var fileName = app.activeDocument.name;
		}
		var saveFile = fileName;
		var thisFile = new File(dest + "/" + fileName);
		app.activeDocument.saveAs(thisFile);
	}
	
	///////////////////////
	////Logic Container////
	///////////////////////
////////////////////////////////////////////////////////////////////////////////
	//////////////////////
	////Function Calls////
	//////////////////////
	
	createNewArtboard();
	
	for(var a=layers.length-1;a>-1;a--){
		var topLayer = layers[a];
		try{
			var targetLayer = master.layers.getByName(topLayer.name);

		}
		catch(e){
			var targetLayer = master.layers.add();
			targetLayer.name = topLayer.name;
		}
		targetLayer.locked = false;
		targetLayer.visible = true;
		if(topLayer.pageItems.length>0){
			for(var b=topLayer.pageItems.length-1;b>-1;b--){
				var curItem = topLayer.pageItems[b];
				moveItem(curItem2,move[0],move[1]);
				var curItem2 = curItem.duplicate(targetLayer);
			}
		}
		if(topLayer.layers.length>0){
			for(var b=topLayer.layers.length-1;b>-1;b--){
				var subLayer = topLayer.layers[b];
				try{
					var outerTarget = targetLayer.layers.getByName(subLayer.name);
				}
				catch(e){
					var outerTarget = targetLayer.layers.add();
					outerTarget.name = subLayer.name;
				}
				outerTarget.locked = false;
				outerTarget.visible = true;
				outer(outerTarget,subLayer);
			}
		}
	}
	
	
	master.activate();
	master.layers[0].zOrder(ZOrderMethod.SENDTOBACK);
	for(var a=0;a<master.layers.length;a++){
		var curLayer = master.layers[a];
		for(var b=0;b<curLayer.layers.length;b++){
			var curSubLayer = curLayer.layers[b];
			if(curSubLayer.name == "Prepress"){
				curSubLayer.visible = false;
			}
			else if(curSubLayer.name == "Information"){
				curSubLayer.locked = true;
			}
		}
	}
	try{
		var curLayer = master.layers.getByName("BKGRD, do not unlock");
			curLayer.locked = false;
			curLayer.zOrder(ZOrderMethod.SENDTOBACK);
			curLayer.locked = true;
		}
	catch(e){
	}
	try{
		var curLayer = master.layers.getByName("Guides");
			curLayer.locked = false;
			curLayer.zOrder(ZOrderMethod.SENDTOBACK);
			curLayer.locked = true;
		}
	catch(e){
	}
	
	saveDoc();
	

	//////////////////////
	////Function Calls////
	//////////////////////	
}
copyToMaster();
copyToMaster = null;