function test()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	var obj = 
	{
		sizes : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		name : "Binding",
		coords : 
		{
			"S Binding" : [237.382,363.783],
			"M Binding" : [237.726,363.709],
			"L Binding" : [237.726,363.74],
			"XL Binding" : [237.726,363.678],
			"2XL Binding" : [237.723,363.735],
			"3XL Binding" : [237.382,363.756],
			"4XL Binding" : [237.315,363.756],
			"5XL Binding" : [237.382,363.756]
		}
	};
	var arr = [];

	var items = [];

	var prepress = layers[0].layers["Prepress"];

	app.executeMenuCommand("paste");

	prepress.visible = true;

	for(a=0;a<layers[0].groupItems.length;a++)
	{
		var thisGroup = layers[0].groupItems[a];
		items.push(thisGroup);
	}

	var sortedItems = sortTheItems(items);
	
	for(a=0;a<sortedItems.length;a++)
	{
		sortedItems[a].name = obj.sizes[a] + " " + obj.name;
		sortedItems[a].moveToBeginning(prepress.layers[obj.sizes[a]]);
		sortedItems[a].left = obj.coords[sortedItems[a].name][0];
		sortedItems[a].top = obj.coords[sortedItems[a].name][1];
	}


	function sortTheItems(items)
	{
		var sorted = [];
		var itemsCopy = items;
		while(itemsCopy.length>0)
		{	
			$.writeln("running while");
			var top = -100000;
			var topMost;
			var deleteIndex;

			for(var a = itemsCopy.length-1;a >-1; a--)
			{
				var thisItem = itemsCopy[a];
				if(thisItem.top > top)
				{
					top = thisItem.top;
					topMost = thisItem;
					deleteIndex = a;
				}
			}
			sorted.push(topMost);
			itemsCopy.splice(deleteIndex,1);
		}
		return sorted;
	}

	prepress.visible = false;
}

while(app.documents.length>0)
{
	test();
	app.activeDocument.close(SaveOptions.SAVECHANGES);
}


