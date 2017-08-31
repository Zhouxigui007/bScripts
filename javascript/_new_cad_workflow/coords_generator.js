//cords generator rebuild for new template builder script
//updating to include size information and print data in JSON format	



function coord()
{
	var docRef = app.activeDocument;
	var coords = "";
	var layer = docRef.layers[0].layers["Prepress"];

	for(var a=0;a<layer.layers.length;a++)
	{
		var curSize = layer.layers[a].name;
		var pieces = [];
		for(var b=0;b<layer.layers[a].groupItems.length;b++)
		{
			pieces.push(layer.layers[a].groupItems[b]);
		}
		coords += '\n"' + curSize + '" : {';
		for(thisPiece in pieces)
			coords += '"' + pieces[thisPiece].name + '" : [' +(Math.floor(pieces[thisPiece].left *1000)/1000) + ',' + (Math.floor(pieces[thisPiece].top *1000)/1000) + '],';
		coords = coords.substring(0,coords.length-1);
		coords += "},";
	}
	coords = coords.substring(0,coords.length-1);
	$.writeln(coords);
}


coord();




//////////////////////////////////////////////////////////
// Below is the old coords generators.
// Use these for non-named items
//////////////////////////////////////////////////////////



// //BACKWARD-- USE THIS FOR TEMPLATE PLACEMENT

// function coord(){
// 	var docRef = app.activeDocument;
// 	var coords = [];
// 	var pieces = [];
// 	var layer = docRef.layers[0].layers.getByName("Prepress");
// 	for(var a=0;a<layer.layers.length;a++){
// 		var sizeCoords = [];
// 		var subLayer = layer.layers[a];
// 		var curSize = subLayer.name;
// 		for(var b=subLayer.groupItems.length-1;b>-1;b--){
// 			var curGroup = subLayer.groupItems[b];
// // 			if(curGroup.name != curSize + " Collar"){
// 				var curLeft = Math.round(curGroup.left*100) / 100;
// 				var curTop = Math.round(curGroup.top*100) / 100;
// 				sizeCoords.push("[" + curLeft);
// 				sizeCoords.push(curTop + "]");
// 				if(a==0){
// 					pieces.push(curGroup.name);
// 				}
// // 			}
// 		}
// 		coords.push(('\n') + '"' + curSize + '"' + " : " + "[" + sizeCoords + "]");
// 	}
// 	$.writeln(coords);
// 	$.writeln(pieces);
// }
// coord();




// //FORWARD-- USE THIS FOR PREPRESS PLACEMENT

// function coord(){
// 	var docRef = app.activeDocument;
// 	var coords = [];
// 	var pieces = [];
// 	var layer = docRef.layers[0].layers.getByName("Prepress");
// 	for(var a=0;a<layer.layers.length;a++){
// 		var sizeCoords = [];
// 		var subLayer = layer.layers[a];
// 		var curSize = subLayer.name;
// 		for(var b=0;b<subLayer.groupItems.length;b++){
// 			var curGroup = subLayer.groupItems[b];
// // 			if(curGroup.name != curSize + " Collar"){
// 				var curLeft = Math.round(curGroup.left*100) / 100;
// 				var curTop = Math.round(curGroup.top*100) / 100;
// 				sizeCoords.push("[" + curLeft);
// 				sizeCoords.push(curTop + "]");
// 				if(a==0){
// 					pieces.push(curGroup.name);
// 				}
// // 			}
// 		}
// 		coords.push(('\n') + '"' + curSize + '"' + " : " + "[" + sizeCoords + "]");
// 	}
// 	$.writeln(coords);
// 	$.writeln("Pieces: [" + pieces + "]");
// }
// coord();






