function test()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	var obj = 
	{
		"gar":["collar info b"],
		"prod":["cut line", "thru-cut", "sew line"],
		"info":["info b"]
	}
	var arr = [];

	for(var x=0;x<swatches.length;x++)
	{
		arr.push(swatches[x]);
	}

	function existsIn(swatch,type)
	{
		for(var ei=0;ei<obj[type].length;ei++)
		{
			var thisSwatch = obj[type][ei];
			if(swatch == thisSwatch)
				return true;
		}
		return false;
	}

	var sg = docRef.swatchGroups;

	var infoSwatchGroup = sg["Disclaimer"];
	infoSwatchGroup.name = "Info Colors";
	var garSwatchGroup = sg["Color Group 1"];
	garSwatchGroup.name = "Garment Colors";
	var prodSwatchGroup = sg.add();
	prodSwatchGroup.name = "Production Colors";

	var cColorPat = /[CB][\d]{1,2}/;

	for(var x=0;x<arr.length;x++)
	{
		var thisSwatch = arr[x];
		var name = thisSwatch.name;
		var lcName = name.toLowerCase();
		if(cColorPat.test(name) || existsIn(lcName,"gar"))
		{
			garSwatchGroup.addSwatch(thisSwatch);
		}
		else if(existsIn(lcName,"prod"))
		{
			prodSwatchGroup.addSwatch(thisSwatch);
		}
		else if(existsIn(lcName,"info"))
		{
			infoSwatchGroup.addSwatch(thisSwatch);
		}
	}

}
test();