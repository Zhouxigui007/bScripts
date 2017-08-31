function buildHoodieTemplate(){
	if (app.documents.length > 0){
		
		
		//global variables//
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var groups = layers.getByName("To Be Placed").groupItems;
		var mensLayer = layers.getByName("MENS HOODIE");
		var buffer = 200; //adjust this value for vertical tolerance in row sorting
		
		//arrays//
		var groupList = []; // all groupItems to be sorted
		var temp = []; // array for objects that match the current marker's vertical position
		var sortedRow = []; // after sorting finished, push tempSorting array here.
		var finalSorted = []; // push sorted rows here after they have been sorted vertically
		var mensHoodieCoords=	[
								[-15,-27],[236,-26],[487,-4],[590,-4],[487,-158],[590,-158],[12,-330],[234,-330],[49,-535],[268,-535],[14,-617],[292,-643],

								[-20,-24],[231,-22],[484,-4],[590,-4],[484,-158],[590,-158],[6,-326],[228,-326],[47,-535],[266,-535],[12,-616],[282,-643],

								[-26,-18],[226,-18],[480,-4],[590,-4],[480,-157],[590,-157],[1,-322],[223,-322],[46,-535],[265,-535],[10,-616],[271,-643],

								[-31,-15],[220,-15],[476,-4],[590,-4],[476,-157],[590,-157],[-3,-318],[219,-318],[44,-535],[262,-535],[8,-615],[258,-643],

								[-36,-11],[215,-11],[473,-2],[590,-2],[473,-155],[590,-155],[-8,-314],[214,-314],[43,-535],[259,-535],[6,-614],[246,-643],

								[-42,-8],[209,-8],[469,-2],[590,-2],[469,-155],[590,-155],[-13,-310],[209,-310],[42,-535],[258,-535],[4,-613],[239,-643],

								[-47,-4],[204,-4],[465,0],[590,0],[465,-153],[590,-153],[-18,-306],[205,-306],[40,-535],[257,-535],[2,-612],[214,-643],

								[-52,0],[199,0],[461,2],[590,2],[461,-151],[590,-151],[-22,-302],[200,-302],[39,-535],[256,-535],[0,-611],[205,-643]

		]





		var mensLayerNames = [
							"S",
							"M",
							"L",
							"XL",
							"2XL",
							"3XL",
							"4XL",
							"5XL"
						]
		var shirtNames = [
							"Front",
							"Back",
							"Right Outside Hood",
							"Left Outside Hood",
							"Left Inside Hood",
							"Right Inside Hood",
							"Right Sleeve",
							"Left Sleeve",
							"Right Cuff",
							"Left Cuff",
							"Front Pocket",
							"Waistband"
						]

		////Begin Logic Container////
		
		
		//push groups into array
		function groupPush(){
			for(a=0;a<groups.length;a++){
				groupList.push(groups[a]);
			}
		}
		
		//sort into rows
		function getRow(){
			while(groupList.length > 0){
				var sortH = [];
				temp = [];
				var rowMarker = groupList[0];
				var top = rowMarker.visibleBounds[1];
				var bot = rowMarker.visibleBounds[3];
				var compare = (top - ((bot-top)/2));
				temp.push(rowMarker);
				groupList.splice(0,1);
				for(r=groupList.length-1;r>-1;r--){
					var curGroup = groupList[r];
					var cGTop = curGroup.visibleBounds[1];
					var cGBot = curGroup.visibleBounds[3];
					var vCenter = (cGTop - ((cGTop - cGBot)/2));
					if(vCenter + buffer > compare && vCenter - buffer < compare){
						temp.push(curGroup);
						groupList.splice(r,1);
					}
				}
				
				for(s=temp.length-1;s>-1;s--){
					var placeholder = 0;
					var farLeft;
					var deleteIndex;
					docRef.selection = null;
					for(a=0;a<temp.length;a++){
						if(placeholder ==0){
							placeholder = temp[a].visibleBounds[0];
							farLeft = temp[a];
							deleteIndex = a;
						}
						else if(temp[a].visibleBounds[0]<placeholder){
							placeholder = temp[a].visibleBounds[0];
							farLeft = temp[a];
							deleteIndex = a;
						}
					}
					sortH.push(farLeft);
					temp.splice(deleteIndex,1);
				}
				
				if(sortH.length>0){
					sortedRow.push(sortH);
				}
				else if(sortH.length<1){
					alert("nothing was added to sortH");
				}
			}
		}
		
		function vSort(){
			for(v=sortedRow.length-1;v>-1;v--){
				var placeholder = 0;
				var topRow;
				var deleteIndex;
				for(s=0;s<sortedRow.length;s++){
					if(placeholder == 0){
						placeholder = sortedRow[s][0].visibleBounds[1];
						topRow = sortedRow[s];
						deleteIndex = s;
					}
					else if(sortedRow[s][0].visibleBounds[1] > placeholder){
						placeholder = sortedRow[s][0].visibleBounds[1];
						topRow = sortedRow[s];
						deleteIndex = s;
					}
				}
				
				finalSorted.push(topRow);
				sortedRow.splice(deleteIndex,1);
			}
			if(finalSorted.length<1){
				alert("nothing in finalSorted");
			}
			//temporary
// 			for(a=finalSorted[6].length-1;a>-1;a--){
// 				var elim = finalSorted[6][a];
// 				elim.remove();
// 				app.redraw();
// 			}
			//temporary
		}
		
		function moveToTemplate(){
			for(a=0;a<finalSorted.length;a++){
				mensLayer.locked = false;
				var curRow = finalSorted[a];
				var curLayerName = mensLayerNames[a];
				var sizeLayer;
				for(b=0;b<curRow.length;b++){
					var curGroup = curRow[b];
					try{
						sizeLayer = mensLayer.layers.getByName(mensLayerNames[a]);
						sizeLayer.zOrder (ZOrderMethod.SENDTOBACK);
					}
					catch(e){
						sizeLayer = mensLayer.layers.add();
						sizeLayer.name = mensLayerNames[a];
						sizeLayer.zOrder (ZOrderMethod.SENDTOBACK);
					}
					curGroup.left = mensHoodieCoords[0][0];
					curGroup.top = mensHoodieCoords[0][1];
					curGroup.name = shirtNames[b];
					curGroup.duplicate(sizeLayer);
					curGroup.remove();
					mensHoodieCoords.splice(0,1);
				}
				sizeLayer.groupItems[0].zOrder (ZOrderMethod.SENDTOBACK);
				sizeLayer.visible = false;	
			}
			try{
				layers.getByName("To Be Placed").remove();
			}
			catch(e){
			}
			layers.getByName("MENS HOODIE").layers.getByName("XL").visible = true;
		}
		
		function makeLayers(){
			try{
				var playerName = layers.getByName("Player Name");
			}
			catch(e){
				var playerName = layers.add();
				playerName.name = "Player Name";
			}
			try{
				var frontLogo = layers.getByName("Front Logo");
			}
			catch(e){
				var frontLogo = layers.add();
				frontLogo.name = "Front Logo";
			}
			try{
				var frontNumber = layers.getByName("Front Number");
			}
			catch(e){
				var frontNumber = layers.add();
				frontNumber.name = "Front Number";
			}
			try{
				var playerNumber = layers.getByName("Player Number");
			}
			catch(e){
				var playerNumber = layers.add();
				playerNumber.name = "Player Number";
			}
			try{
				var leftSleeve = layers.getByName("Left Sleeve");
			}
			catch(e){
				var leftSleeve = layers.add();
				leftSleeve.name = "Left Sleeve";
			}
			try{
				var rightSleeve = layers.getByName("Right Sleeve");
			}
			catch(e){
				var rightSleeve = layers.add();
				rightSleeve.name = "Right Sleeve";
			}
			try{
				var lockerTag = layers.getByName("Locker Tag");
			}
			catch(e){
				var lockerTag = layers.add();
				lockerTag.name = "Locker Tag";
			}
			try{
				var belowNumber = layers.getByName("Below Number");
			}
			catch(e){
				var belowNumber = layers.add();
				belowNumber.name = "Below Number";
			}
		}
		
		////End Logic Container////

		groupPush();
		getRow();
		vSort();
		moveToTemplate();
		makeLayers();
		
	}
}
buildHoodieTemplate();