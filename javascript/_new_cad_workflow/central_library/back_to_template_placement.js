
function test()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;

	// #include "/Volumes/Customization/Library/Scripts/Script Resources/Data/library.js";

	#include "~/Desktop/automation/javascript/_new_cad_workflow/central_library/coords_library.js"




	for(var x=0;x<layers.length;x++)
	{
		var topLay = layers[x];
		if(topLay.name.indexOf("FD")>-1)
		{
			var code = topLay.name.substring(0,topLay.name.indexOf("_0"));
			if(templateInfo[code] == undefined)
			{
				alert("The garment: " + code + " needs to be added to the library. Sorry.\nLet William know and he'll add it.");
				return;
			}
			var coords = templateInfo[code].placement;
			if(coords.Regular != undefined || coords.Raglan != undefined)
			{
				var info = topLay.layers["Information"]
				for(var lay=0;lay<info.layers.length;lay++)
				{
					var thisInfoLay = info.layers[lay];
					if(thisInfoLay.name.indexOf("Reg")>-1)
					{
						var regRag = "Regular";
					}
					else if(thisInfoLay.name.indexOf("Rag"))
					{
						var regRag = "Raglan";
					}
				}
				coords = coords[regRag];
			}
			var prepress = topLay.layers["Prepress"];
			prepress.visible = true;
			prepress.locked = false;

			for(var a=0;a<prepress.layers.length;a++)
			{
				var curLay = prepress.layers[a];
				var curSize = curLay.name;
				for(var b=0;b<curLay.groupItems.length;b++)
				{
					var thisGroup = curLay.groupItems[b];
					thisGroup.left = coords[curSize][thisGroup.name][0];
					thisGroup.top = coords[curSize][thisGroup.name][1];
				}
			}
			prepress.visible = false;
		}


		

	}


	
}
test();