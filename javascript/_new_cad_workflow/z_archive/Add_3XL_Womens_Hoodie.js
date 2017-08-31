function add3XL()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var sel = docRef.selection;
	var prepress = layers[0].layers["Prepress"];
	prepress.visible = true;
	var coords = 
	{
		"3XL" : {"3XL Right Inside Hood" : [592.769,-157.908],"3XL Left Outside Hood" : [592.769,-4.254],"3XL Left Inside Hood" : [477.667,-157.914],"3XL Right Outside Hood" : [477.672,-6.066],"3XL Right Cuff" : [48.487,-534.566],"3XL Right Sleeve" : [-0.196,-317.766],"3XL Left Cuff" : [271.125,-534.513],"3XL Waistband" : [254.339,-642.024],"3XL Left Sleeve" : [222.334,-317.927],"3XL Pocket" : [10.527,-626.033],"3XL Back" : [220.993,-14.486],"3XL Front" : [-31.209,-13.51]},
		"pieces" : ["Front", "Back", "Pocket", "Left Sleeve", "Waistband", "Left Cuff", "Right Sleeve", "Right Cuff", "Right Outside Hood", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood"]
	}

	var groups = [];

	for(var a=0;a<sel.length;a++)
	{
		groups.push(sel[a]);
	}

	var sortedGroups = leftToRight(groups);
	placeOnTemplate(sortedGroups);

	prepress.visible = false;


	function leftToRight(groups)
	{
		var tempGroups = groups;
		var sorted = [];

		while(tempGroups.length>0)
		{
			var deleteIndex = 0;
			var farLeft = tempGroups[0];
			for(var a=tempGroups.length-1;a>-1;a--)
			{
				if(tempGroups[a].left < farLeft.left)
				{
					farLeft = tempGroups[a];
					deleteIndex = a;
				}
			}
			sorted.push(farLeft)
			tempGroups.splice(deleteIndex,1);
		}
		return sorted;
	}

	function placeOnTemplate(sortedGroups)
	{
		//create 3XL layer
		var newLay = prepress.layers.add();
		newLay.name = "3XL";
		newLay.zOrder(ZOrderMethod.SENDTOBACK);
		for(var a=0;a<sortedGroups.length;a++)
		{
			var curSize = "3XL";
			var thisPiece = sortedGroups[a];
			thisPiece.name = curSize + " " + coords.pieces[a];
			var thisPlace = coords["3XL"][thisPiece.name];
			thisPiece.left = thisPlace[0];
			thisPiece.top = thisPlace[1];
			thisPiece.moveToBeginning(newLay);
		}
	}


}
add3XL();