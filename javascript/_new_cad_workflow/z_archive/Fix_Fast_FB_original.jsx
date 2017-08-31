
function container()
{
	//Logic Container

	function getLayer(layers)
	{
		var result;
		var error = "No Errors";
		var templateLayers = [];

		//populate templateLayers array with scriptable layers
		for(var a=0;a<layers.length;a++)
		{
			if(layers[a].name.indexOf("FD")>-1)
				templateLayers.push(layers[a]);
		}

		//no scriptable layers found. 
		//exit script and alert user
		if(templateLayers.length == 0)
		{
			result = null;
			error = rebuildMsg;
		}
		
		//1 scriptable layer 
		//return the layer and proceed without further interaction
		else if(templateLayers.length == 1)
			result = templateLayers[0];

		//multiple scriptable layers
		//generate scriptUI to prompt user for the desired layer
		else
		{
			var buttons = [];
			var jersey;
			var whichJersey = new Window("dialog");
				var txt = whichJersey.add("statictext", undefined, "Which jersey needs to be fixed?");
				var btnGroup = whichJersey.add("group");
				btnGroup.orientation = "column";

				for(var a=0;a<templateLayers.length;a++)
				{
					makeButton(a,templateLayers[a],btnGroup,buttons)
				}

			whichJersey.show();

			function makeButton(num, layer)
			{
				buttons[num] = btnGroup.add("button", undefined, layer.name)
				buttons[num].onClick = function()
				{
					whichJersey.close();
					result = layer;
				}
			}
		}

		return [result,error];

	}



	function validate(layer)
	{
		var result;
		var error = "No Errors";

		if(layer.name.indexOf("FB_W_SL_") > -1)
			result = "sleeveless";
		else if(layer.name.indexOf("FB_W_SS_") > -1)
			result = "shortsleeve";
		else
		{
			result = null;
			error = noFixMsg;
		}

		return [result,error];
	}

	function fix(layer,adjust)
	{
		var prepress = layer.layers["Prepress"];
		try
		{
			for(var a=0;a<prepress.layers.length;a++)
			{
				var curLay = prepress.layers[a];
				var curSize = prepress.layers[a].name;
				var L = curSize + " Left Front";
				var R = curSize + " Right Front"; 
				var LM = adjust[L];
				var RM = adjust[R];
				var LL = curLay.groupItems[L].groupItems[0].groupItems[L + " Logo"];
				var RL = curLay.groupItems[R].groupItems[0].groupItems[R + " Logo"];

				LL.left = LL.left + LM;
				RL.left = RL.left + RM
			}
			return true;
		}
		catch(e)
		{
			return false;
		}
	}

	function fixedMarker(checkORmake, layer)
	{
		var infoLayer = layer.layers["Information"];
		var isMarker = false;

		if(checkORmake == "check")
		{	
			for(var a=0;a<infoLayer.layers.length;a++)
			{
				if(infoLayer.layers[a].name == "Logos Fixed")
				{
					isMarker = true;
					break;
				}
			}
		}

		else if(checkORmake == "make")
		{
			infoLayer.locked = false;
			var fixedLayer = infoLayer.layers.add();
			fixedLayer.name = "Logos Fixed";
			infoLayer.locked = true;
			isMarker = true;
		}
		return isMarker;
	}

	//Logic Container



	//Adjustments Object

	var logoAdjustments = {
		"shortsleeve" : {
			"XXS Left Front" : -.844,
			"XXS Right Front" : .953,
			"XS Left Front" : -.969,
			"XS Right Front" : .844,
			"S Left Front" : -.922,
			"S Right Front" : .734,
			"M Left Front" : -.953,
			"M Right Front" : .781,
			"L Left Front" : -.929,
			"L Right Front" : .813,
			"XL Left Front" : -.953,
			"XL Right Front" : .844,
			"2XL Left Front" : -.984,
			"2XL Right Front" : .797,
			"3XL Left Front" : -.922,
			"3XL Right Front" : .821
		},
		"sleeveless" : {
			"XXS Left Front" : -.891,
			"XXS Right Front" : .391,
			"XS Left Front" : -.938,
			"XS Right Front" : -1.313,
			"S Left Front" : -.891,
			"S Right Front" : .406,
			"M Left Front" : -.859,
			"M Right Front" : .344,
			"L Left Front" : -1.031,
			"L Right Front" : .703,
			"XL Left Front" : -.875,
			"XL Right Front" : .828,
			"2XL Left Front" : -.938,
			"2XL Right Front" : 0,
			"3XL Left Front" : -.891,
			"3XL Right Front" : -.281
		}
	}

	//Adjustments Object

	//Control Flow
		var docRef = app.activeDocument;
		var layers = docRef.layers;
		var errors;
		var rebuildMsg = "Sorry\nThis prepress can't be fixed automatically.\nPlease copy artwork to a new template and regenerate prepress.";
		var noFixMsg = "Whoops!\nThis isn't a women's full button. Only FAST_W_SS and FAST_W_SL jerseys need to be adjusted.";
		var fixedMsg = "NICE!\nThis prepress is already fixed.\nDon't forget to check the other jerseys in this prepress though.";

		var targetLayer = getLayer(layers);
		errors = targetLayer[1];
		targetLayer = targetLayer[0];

		if(errors != "No Errors")
		{
			alert(errors);
			return;
		}

		var isFixed = fixedMarker("check", targetLayer);

		if(isFixed)
		{
			alert(fixedMsg);
			return;
		}

		//validate targetLayer
		var layerInfo = validate(targetLayer);
		var sleeves = layerInfo[0];
		errors = layerInfo[1];
		if(errors != "No Errors")
		{
			alert(noFixMsg);
			return;
		}
		else
		{
			var success = fix(targetLayer,logoAdjustments[sleeves]);
			if(success)
			{
				var makeFixedMarker = fixedMarker("make", targetLayer);
				if(makeFixedMarker)
					alert("Logos Fixed Sucessfully");
				else
					alert("There was an error making the fixed marker. Reference number 2222");
			}
			else
				alert("Logos were not moved properly. Reference Number 1111");
		}


	//Control Flow
}

container();















//////Original Code///////
//////Disregard///////////

// function container()
// {
// 	//fast full button logo adjustments;

// 	var logoAdjustments = {
// 		"shortsleeve" : {
// 			"XXS Left Front" : -.844,
// 			"XXS Right Front" : .953,
// 			"XS Left Front" : -.969,
// 			"XS Right Front" : .844,
// 			"S Left Front" : -.922,
// 			"S Right Front" : .734,
// 			"M Left Front" : -.953,
// 			"M Right Front" : .781,
// 			"L Left Front" : -.929,
// 			"L Right Front" : .813,
// 			"XL Left Front" : -.953,
// 			"XL Right Front" : .844,
// 			"2XL Left Front" : -.984,
// 			"2XL Right Front" : .797,
// 			"3XL Left Front" : -.922,
// 			"3XL Right Front" : .821
// 		},
// 		"sleeveless" : {
// 			"XXS Left Front" : -.891,
// 			"XXS Right Front" : .391,
// 			"XS Left Front" : -.938,
// 			"XS Right Front" : -1.313,
// 			"S Left Front" : -.891,
// 			"S Right Front" : .406,
// 			"M Left Front" : -.859,
// 			"M Right Front" : .344,
// 			"L Left Front" : -1.031,
// 			"L Right Front" : .703,
// 			"XL Left Front" : -.875,
// 			"XL Right Front" : .828,
// 			"2XL Left Front" : -.938,
// 			"2XL Right Front" : 0,
// 			"3XL Left Front" : -.891,
// 			"3XL Right Front" : -.281
// 		}
// 	}

// 	function fix()
// 	{

// 		function findCut()
// 		{
// 			var result;
// 			var templateLayers = [];

// 			//populate templateLayers array with scriptable layers
// 			for(var a=0;a<layers.length;a++)
// 			{
// 				if(layers[a].name.indexOf("FD") > -1)
// 					templateLayers.push(layers[a]);
// 			}

// 			//no scriptable layers
// 			//exit findCut function and alert user
// 			if(templateLayers.length == 0)
// 				return [null,rebuildMsg];

// 			//one scriptable layer
// 			//return cut and proceed with fix without further interaction
// 			else if(templateLayers.length == 1)
// 			{
// 				if(templateLayers[0].name.indexOf("FB_W_SS") > -1 || templateLayers[0].name.indexOf("FB_W_SL") > -1)
// 				{
// 					result = [templateLayers[0], ""];
// 				}
// 				else
// 					result = [null, noFixMsg];
// 			}

// 			//multiple scriptable layers
// 			//generate scriptUI to prompt user for the desired layer
// 			else
// 			{
// 				var buttons = [];
// 				var jersey = null;
// 				var whichJersey = new Window("dialog");
// 					var txt = whichJersey.add("statictext", undefined, "Which jersey needs to be fixed?");
// 					var btnGroup = whichJersey.add("group");

// 					for(var a=0;a<templateLayers.length;a++)
// 					{
// 						addButton(a,templateLayers[a]);
// 					}
// 				whichJersey.show();

// 				function addButton(num, layer)
// 				{	
// 					buttons[num] = btnGroup.add("button", undefined, layer.name);
// 					buttons[num].onClick = function()
// 					{
// 						jersey = layer;
// 						whichJersey.close();
// 					}
// 				}

// 				result = [jersey, ""];
// 			}

			

// 			return result;
// 		}

// 		var docRef = app.activeDocument;
// 		var layers = docRef.layers;
// 		var rebuildMsg = "Sorry\nThis prepress can't be fixed automatically.\nPlease copy artwork to a new template and regenerate prepress.";
// 		var noFixMsg = "Whoops!\nThis isn't a women's full button. Only FAST_W_SS and FAST_W_SL jerseys need to be adjusted."
// 		var cut = findCut();
// 		if(cut[0] != null)
// 		{
// 			var prepress = cut[0].layers["Prepress"];

// 			if(cut[0].name.indexOf("_SL_") > -1)
// 			{
// 				var sleeves = "sleeveless";
// 			}
// 			else if(cut[0].name.indexOf("_SS_") > -1)
// 			{
// 				var sleeves = "shortsleeve";
// 			}
			
// 			for(var a=0; a<prepress.layers.length;a++)
// 			{
// 				var curLay = prepress.layers[a];
// 				var curSize = prepress.layers[a].name;
// 				var R = curSize + " Right Front";
// 				var L = curSize + " Left Front";
// 				var rightMove = logoAdjustments[sleeves][R];
// 				var leftMove = logoAdjustments[sleeves][L];
// 				var leftLogo = curLay.groupItems[L].groupItems[0].groupItems[L + " Logo"];
// 				var rightLogo = curLay.groupItems[R].groupItems[0].groupItems[R + " Logo"];
// 				rightLogo.left = rightLogo.left + rightMove;
// 				leftLogo.left = leftLogo.left + leftMove;
// 			}
// 		}

// 		else if(cut[0] == null)
// 		{
// 			alert(cut[1]);
// 			return;
// 		}
		
// 		else
// 		{
// 			alert(rebuildMsg);
// 			return;	
// 		}
		

		
// 	}
// 	fix();
// }
// container();