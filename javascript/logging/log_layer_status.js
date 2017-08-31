//getLayerInfo Function Description
//
function getLayerInfo()
{
	var localValid = true;
	var docRef = app.activeDocument;

	for(var a=0;a<docRef.layers.length;a++)
	{
		$.writeln("ran " + (a+1) + " times");
		
		var thisLay = docRef.layers[a];
		$.writeln("Top Layer: " + thisLay.name);
		$.writeln(thisLay.name + ".locked = " + thisLay.locked);
		$.writeln(thisLay.name + ".visible = " + thisLay.visible);
		$.writeln("");
		
		if(thisLay.layers.length > 0)
		{
			for(var b=0;b<thisLay.layers.length;b++)
			{
				var thisInLay = thisLay.layers[b];
				$.writeln(thisLay.name + " Sublayer: " + thisInLay.name);
				$.writeln(thisInLay.name + ".locked = " + thisInLay.locked);
				$.writeln(thisInLay.name + ".visible = " + thisInLay.visible);
				$.writeln("");
				
				if(thisInLay.layers.length>0)
				{
					for(var c=0;c<thisInLay.layers.length;c++)
					{
						var thisInInLay = thisInLay.layers[c];
						$.writeln(thisInLay.name + " Sublayer: " + thisInInLay.name);
						$.writeln(thisInInLay.name + ".locked = " + thisInInLay.locked);
						$.writeln(thisInInLay.name + ".visible = " + thisInInLay.visible);
						$.writeln("");
						
					};
				};
				
			};
		};

	};





	return localValid
}
getLayerInfo();