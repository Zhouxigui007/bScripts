	function jockTags(){
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var prepress = layers[0].layers["Prepress"];
		prepress.visible = true;
		var coords;
		var regJockCoords = {
			"XS" : [178.14,-284.84],
			"S" : [183.96,-289.25],
			"M" : [189.03,-294.21],
			"L" : [194.69,-298.28],
			"XL" : [199.8,-302.61],
			"2XL" : [205.47,-306.96],
			"3XL" : [210.56,-311.73],
			"4XL" : [216.1,-316.16],
			"5XL" : [221.48,-320.34]
		}
		
		var ragJockCoords = {
			"XS" : [178.81,-275.48],
			"S" : [184.41,-279.79],
			"M" : [189.4,-283.6],
			"L" : [195.35,-288.77],
			"XL" : [199.84,-293.31],
			"2XL" : [205.62,-297.48],
			"3XL" : [210.27,-300.55],
			"4XL" : [217.61,-307.2],
			"5XL" : [222.27,-311.4]
		}
		var regCenter = {
			"XS" : [[74.15,-97],[535.7,-90],[310.43,-114],[309.43,-280],[480,-760]],
			"S" : [[68.62,-94],[530.17,-88],[307.25,-112],[306.25,-278],[480,-760]],
			"M" : [[63.23,-92],[524.79,-86],[304.06,-110],[303.06,-276],[480,-760]],
			"L" : [[57.85,-89],[519.4,-84],[301.83,-108],[300.83,-274],[480,-760]],
			"XL" : [[52.46,-86],[514.02,-83],[299.09,-106],[298.09,-272],[480,-760]],
			"2XL" : [[47.07,-83],[508.63,-81],[295.72,-105],[294.72,-271],[480,-760]],
			"3XL" : [[41.69,-81],[503.24,-79],[293,-103],[292,-269],[480,-760]],
			"4XL" : [[36.16,-78],[497.72,-77],[289.88,-101],[288.88,-267],[480,-760]],
			"5XL" : [[30.78,-75],[492.33,-76],[286.74,-99],[285.74,-266],[480,-760]],
			"Front Guide" : [113.91,-134.47],
			"Back Guide" : [576.49,-106.99],
		}
	
		var ragCenter = {
			"XS" : [[74.54,-97],[536.54,-90],[312.43,-83],[312.43,-249]],
			"S" : [[69.3,-95],[531.3,-88],[309.66,-76],[309.66,-242]],
			"M" : [[63.77,-92],[525.77,-86],[307.43,-69],[307.43,-235]],
			"L" : [[58.39,-90],[520.39,-85],[305.27,-63],[305.27,-229]],
			"XL" : [[53,-88],[515,-83],[303.2,-56],[303.2,-222]],
			"2XL" : [[47.61,-86],[509.61,-81],[300.95,-49],[300.95,-215]],
			"3XL" : [[42.23,-82],[504.23,-80],[298.67,-42],[298.67,-208]],
			"4XL" : [[36.84,-82],[498.84,-78],[296.42,-34],[296.42,-200]],
			"5XL" : [[31.31,-79],[493.31,-76],[293.88,-28],[293.88,-194]],
			"Front Guide" : [114.03,-121.4],
			"Back Guide" : [576.49,-99.18]
		}
		var sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

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
	
		//Delete Old Jock Tags
	
		
	
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
			if(curSize == "XL"){
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
		app.documents[1].activate();
	}

jockTags();