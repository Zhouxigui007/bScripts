function container(){
	function jockTags(){
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var prepress = layers[0].layers["Prepress"];
		prepress.visible = true;
		var coords;
		var regJockCoords = {
			"YXS" : [163.06,-244.89],
			"YS" : [167.59,-253.5],
			"YM" : [172.13,-261.47],
			"YL" : [176.66,-270.53],
			"YXL" : [180.79,-278.29]
		}
		
		var ragJockCoords = {
			"YXS" : [163.14,-245.06],
			"YS" : [167.46,-255.01],
			"YM" : [171.98,-262.61],
			"YL" : [176.38,-272],
			"YXL" : [180.83,-280.18]
		}
		
		var regCenter = {			
			"YXS" : [[90,-109.7],[551,-109.07],[328.88,-139.45],[328.88,-308.41]],
			"YS" : [[85.46,-108.12],[546.46,-107.34],[324.77,-135.52],[324.77,-304.49]],
			"YM" : [[80.93,-105.49],[541.93,-105.6],[321.65,-132.11],[321.65,-301.08]],
			"YL" : [[76.39,-103.8],[537.39,-103.89],[318.11,-126.44],[318.11,-295.41]],
			"YXL" : [[71.98,-101],[533,-102],[314,-121.06],[314,-290.03]],
			"Front Guide" : [114.03,-148.73],
			"Back Guide" : [575.03,-125.7]
		}
	
		var ragCenter = {
			"YXS" : [[89.86,-120],[553.84,-116.36],[328.41,-103.26],[328.41,-269.25]],
			"YS" : [[85.41,-119],[549.41,-114.38],[324.6,-97.13],[324.6,-263.38]],
			"YM" : [[80.93,-116],[544.93,-112.71],[322.06,-90.52],[322.06,-256.77]],
			"YL" : [[76.39,-114],[540.39,-110.88],[318,-81.81],[318,-247.77]],
			"YXL" : [[72,-111],[536,-109],[313.97,-73.8],[313.97,-240.05]],
			"Front Guide" : [114.03,-148.72],
			"Back Guide" : [578.03,-125.9]
		}
		var sizes = ["YXS", "YS", "YM", "YL", "YXL"];

		function cut(){
			var theCut = layers[0].layers["Information"].layers[0].name;
			if(theCut.indexOf("Regular")>-1){
				coords = regJockCoords;
				return regCenter;
			}
			else if(theCut.indexOf("Raglan")>-1){
				coords = ragJockCoords;
				return ragCenter;
			}
			else{
				alert("Woops..");
			}
		}
	
		var center = cut();
	
		try{
			var tags = app.documents["new_jock_tags.ai"];
		}
		catch(e){
			function findTags(){
				var tags = new Folder("~/Desktop/Tags");
				return tags.fsName
			}
			var tags = findTags();
			tags =new File("/Volumes/Macintosh HD/" + tags + "/" + "new_jock_tags.ai/");
			app.open(tags);
			tags = app.documents["new_jock_tags.ai"];
		} 
	
	
		
	
		//Copy jock tags into template
	
		tags.activate();
		app.selection = null;
	
		for(var a=0;a<sizes.length;a++){
			var curSize = sizes[a];
			tags.layers[0].groupItems[curSize].selected = true;
		}
		tags.layers[1].groupItems[0].selected = true;
		app.executeMenuCommand('copy');
		docRef.activate();
		app.doScript('Remove JT', 'Templates');
		var tempLayer = layers.add();
		app.selection = null;
		app.executeMenuCommand('pasteInPlace');
	
		//move jock tags into position
	
		for(var a=0;a<prepress.layers.length;a++){
			var curSize = prepress.layers[a].name;
			var frontGroup = prepress.layers[a].groupItems[curSize + " Front"];
			var theTag = layers[0].groupItems[curSize];
			theTag.moveToBeginning(frontGroup,ElementPlacement.PLACEATBEGINNING);
			theTag.left = coords[curSize][0];
			theTag.top = coords[curSize][1];
			if(curSize == "YXL"){
				var dest;
				var clips = layers[1].layers["Mockup"].groupItems;
				for(var b=0;b<clips.length;b++){
					if(clips[b].left > 0 && clips[b].left < 250){
						dest = clips[b];
					}
				}
				theTag.duplicate(dest);
			}
		}
	
		var guideDest = layers["Guides"];
		guideDest.locked = false;
	
		tempLayer.groupItems["Guide"].moveToBeginning(guideDest);
	
		app.selection = null;
	
		var frontGuide = guideDest.groupItems["Guide"];
		frontGuide.left = center["Front Guide"][0];
		frontGuide.top = center["Front Guide"][1];
		var backGuide = frontGuide.duplicate();
		backGuide.left = center["Back Guide"][0];
		backGuide.top = center["Back Guide"][1];
	
		frontGuide.selected = true;
		backGuide.selected = true;
		app.doScript('Make Guides', 'Templates');
	
		guideDest.locked = true;
	
		tempLayer.remove();
	
		//center the shirt pieces
	
		for(var a=0;a<prepress.layers.length;a++){
			var curSize = prepress.layers[a].name;
			var pieces = [" Front", " Back", " Left Sleeve", " Right Sleeve"];
			for(var b=0;b<pieces.length;b++){
				var theGroup = prepress.layers[a].groupItems[curSize + pieces[b]];
				theGroup.left = center[curSize][b][0];
				theGroup.top = center[curSize][b][1];
			}		
		}
	
		prepress.visible = false;
		docRef.close(SaveOptions.SAVECHANGES);
		try{
			app.documents[1].activate();
		}
		catch(e){}
	}

	while(app.documents.length>1){
		jockTags();
	}
}
container();