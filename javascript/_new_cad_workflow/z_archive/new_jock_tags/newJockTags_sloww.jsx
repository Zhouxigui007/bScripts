	function jockTags(){
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var prepress = layers[0].layers["Prepress"];
		prepress.visible = true;
		var coords;
		var regJockCoords = {
			"WXXS" : [168.07,-287.51],
			"WXS" : [172.32,-288.1],
			"WS" : [175.65,-288.44],
			"WM" : [179.68,-293.9],
			"WL" : [182.69,-296.78],
			"WXL" : [187.01,-302.34],
			"W2XL" : [190.57,-303.15],
			"W3XL" : [193.86,-304.51]
		}
		
		var ragJockCoords = {
			"WXXS" : [168.86,-280.4],
			"WXS" : [172.25,-281.35],
			"WS" : [175.3,-286.26],
			"WM" : [179.45,-290.81],
			"WL" : [182.79,-294.49],
			"WXL" : [186.14,-299.05],
			"W2XL" : [190.14,-299.89],
			"W3XL" : [193.35,-301.3]
		}
		var regCenter = {
			"XXS" : [[83.8,-103.15],[544.81,-97.69],[327.43,-117],[326.42,-283]],
			"XS" : [[80.23,-100.52],[541.23,-95.62],[324.13,-118],[323.12,-284]],
			"S" : [[76.54,-97.64],[537.54,-93.89],[320.7,-119],[319.69,-285]],
			"M" : [[73,-95],[534,-92],[318.01,-118],[317,-284]],
			"L" : [[69.47,-92.25],[530.48,-90.2],[316.15,-117],[315.14,-283]],
			"XL" : [[65.79,-89.59],[526.79,-88.42],[313.76,-116],[312.75,-282]],
			"2XL" : [[62.25,-86.63],[523.25,-86.66],[311.83,-114],[310.82,-280]],
			"3XL" : [[58.56,-83.96],[519.56,-84.84],[309.15,-113],[308.14,-279]]
			"Front Guide" : [114.37,-140.19],
			"Back Guide" : [575.39,-114.16]
		}
	
		var ragCenter = {
			"XXS" : [318.84,-82.23],[480,-760],[318.87,-249.23],[546.95,-101.59],[84,-110.32],
			"XS" : [316.94,-81.06],[480,-760],[316.97,-248.06],[543.11,-99.65],[80.16,-107.6],
			"S" : [315.09,-80.13],[480,-760],[315.12,-247.13],[539.58,-97.82],[76.63,-104.85],
			"M" : [312.99,-77],[480,-760],[313.02,-244],[536,-96],[73.06,-103],
			"L" : [311.12,-74.02],[480,-760],[311.15,-241.02],[532.55,-93.86],[69.59,-100.73],
			"XL" : [309.59,-71.13],[480,-760],[309.62,-238.13],[528.67,-92.4],[65.72,-97.79],
			"2XL" : [306.88,-66.48],[480,-760],[306.91,-233.48],[525.17,-90.32],[62.22,-95.58],
			"3XL" : [304.62,-63.47],[480,-760],[304.65,-230.47],[521.57,-88.83],[58.61,-93.33],
			"Front Guide" : [114.41,-137.06],
			"Back Guide" : [577.41,-111.97]
		}
		var sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

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
			var curSize = "W" + sizes[a];
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