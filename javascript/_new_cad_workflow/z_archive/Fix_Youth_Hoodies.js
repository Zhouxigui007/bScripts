/*

	Fix youth hoodies.

	swap all sleeves and cuffs

	swap ym inner left and outer right hood

*/

function fix()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var prepress = layers[0].layers["Prepress"];

	prepress.visible = true;

	//swap sleeves and cuffs
	for(var a=0;a<prepress.layers.length;a++)
	{
		var curLay = prepress.layers[a]
		var curSize = curLay.name;

		var LS = curLay.groupItems[curSize + " Left Sleeve"];
		var LSLeft = LS.left;
		var RS = curLay.groupItems[curSize + " Right Sleeve"];
		var RSLeft = RS.left;

		LS.name = curSize + " Right Sleeve";
		LS.left = RSLeft;

		RS.name = curSize + " Left Sleeve";
		RS.left = LSLeft;

		var LC = curLay.groupItems[curSize + " Left Cuff"];
		var LCLeft = LC.left;
		var RC = curLay.groupItems[curSize + " Right Cuff"];
		var RCLeft = RC.left;

		LC.name = curSize + " Right Cuff";
		LC.left = RCLeft;

		RC.name = curSize + " Left Cuff";
		RC.left = LCLeft;

		// if(curSize == "YM")
		// {
		// 	var RIH = curLay.groupItems[curSize + " Right Inside Hood"];
		// 	var RIHTop = RIH.top;
		// 	var LOH = curLay.groupItems[curSize + " Left Outside Hood"];
		// 	var LOHTop = LOH.top;

		// 	RIH.name = curSize + " Left Outside Hood";
		// 	RIH.top = LOHTop;

		// 	LOH.name = curSize + " Right Inside Hood";
		// 	LOH.top = RIHTop;
		// }

	}
	
	prepress.visible = false;

	docRef.close(SaveOptions.SAVECHANGES);



	
}

while(app.documents.length>0)
	fix();
