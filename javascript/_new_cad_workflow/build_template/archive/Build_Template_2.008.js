/*
//Converted Templates Rebuild

Please use the old "universal_template.jsx" for any garments that have already been converted
	baseball, softball, fastpitch, hoodies, full buttons, 2 buttons etc.

/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~
_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~/~_~

Script Name: Build_Template.js
Author: William Dowling
Build Date: 01 June, 2016
Description: Convert prepress file into scriptable template
Build number 2.000

Progress:
	
	Version: 2.001
		01 June, 2016
		Initial build. Set up containers and begin defining functions
		Set up script global variables and begin library object
	
	Version: 2.002
		02 June, 2016
		Fixes and adjustments to library object due to typos.
		added newly rebuilt rowSort function.
		added test logic to rename pieces per data from library object
		rowSort function is working properly
		**NOTE**
			Make sure to include a check for improper grouping
		Testing new object oriented placement data structure.
	
	Version: 2.003
		02 June, 2016
		functions added to name and place the pieces
			tested and working
		added function to create artwork layers
		added function to remove unnecessary layers and input styleNumber information
		currently working all the way through to create a converted template for football jerseys

	Version: 2.004
		06 July, 2016
		Fixed football 5411 artwork layer name, "Sponser Logo". Updated to correct spelling of "Sponsor Logo";
		Added football 250 to library object.
		Added youth football 250.

	Version: 2.005
		11 July, 2016
		Added soccer FD_858 to library
		Added FD_BASK_RV to library

	Version: 2.006
		15 July, 2016
		Added FDWH to library
		Added functionality to duplicate art to mockup layer if there is no sewn together mockup to speak of.

	Version: 2.007
		18 July, 2016
		Added FD_BASKY_RV to library

	Version: 2.008
		22 July, 2016
		Added FD_SOC_SS to library
			Styles:
			858, 3061, 3062, 3063, 3064
		

*/

function container()	
{
	///////Begin/////////
	///Logic Container///
	/////////////////////


	function rowSort(theArray)
	{
		try
		{
			var groups = [];
			var finalSorted = [];
			var rows = [];
			var buffer = 150;

			//populate groups array
			for(var a=0;a<theArray.length;a++)
			{
				groups.push(theArray[a]);
			}

			var groupsCopy = groups;

			//populate temp arraywith groups of the same row
			while(groupsCopy.length > 0)
			{
				var temp = [];
				var tempSorted = [];
				var rowMarker = groupsCopy[0].top - groupsCopy[0].height/2;
				temp.push(groupsCopy[0]);
				groupsCopy.splice(0,1);
				for(var a=groupsCopy.length-1;a>-1;a--)
				{
					var thisGroup = groupsCopy[a];
					var vPos = thisGroup.top - thisGroup.height/2
					// alert("vPos, buffer and rowMarker\nvPos = " + vPos + "\nbuffer = " + buffer + "\nrowMarker = " + rowMarker);
					if(vPos + buffer > rowMarker && vPos - buffer < rowMarker)
					{
						temp.push(groupsCopy[a]);
						groupsCopy.splice(a,1);
					}
				}
				// alert("temp.length = " + temp.length);

				//row has been determined
				//loop the row to find farLeft and push to tempSorted
				while(temp.length>0)
				{
					var farLeft = temp[0];
					var deleteIndex = 0;

					for(var a=0;a<temp.length;a++)
					{
						if(temp[a].left < farLeft.left)
						{
							farLeft = temp[a];
							deleteIndex = a;
						}
					}
					tempSorted.push(farLeft);
					temp.splice(deleteIndex,1)

				}

				//push the left to right sorted row to rows array
				rows.push(tempSorted);
			}

			//all rows have been established and sorted left to right
			//sort rows vertically and push topMost to finalSorted array
			while(rows.length > 0)
			{
				var topMost = rows[0];
				var vMarker = topMost[0].top;
				var deleteIndex = 0;

				for(var a=1;a<rows.length;a++)
				{
					if(rows[a][0].top > vMarker)
					{
						topMost = rows[a]
						deleteIndex = a;
					}
				}
				finalSorted.push(topMost);
				rows.splice(deleteIndex,1)
			}
		}
		catch(e)
		{
			alert("failed while sorting the pieces");
			valid = false;
			return;
		}
		return finalSorted;
	}

	function nameThePieces(sorted)
	{
		try
		{
			//unlock the garment layer
			garmentLayer.locked = false;

			for(var a=0;a<sorted.length;a++)
			{
				var thisArray = sorted[a];
				var theSize = thisGarment.sizes[a]
				var newSizeLayer = prepress.layers.add();
				newSizeLayer.name = theSize;
				newSizeLayer.zOrder(ZOrderMethod.SENDTOBACK);
				for(var b=0;b<thisArray.length;b++)
				{
					var thisPieceName = thisGarment.pieces[b];
					if(thisPieceName == null)
						alert("Error in size " + theSize);
					var thisPiece = thisArray[b];
					thisPiece.name = theSize + " " + thisPieceName;
					thisPiece.moveToBeginning(newSizeLayer);

					//use this condition for non-"sewn together" mockups
					//if you're copying artwork from a "sewn together" mockup file, comment this section
					
					// if(theSize == thisGarment.mockupSize)
					// {
					// 	var mockPiece = thisPiece.duplicate(mockupLayer);
					// 	mockPiece.name = "Mockup " + thisPieceName;
					// }
				}
			}
		}
		catch(e)
		{
			alert("failed while naming the pieces");
			valid = false;
			return;
		}
	}

	function moveThePieces(layers)
	{
		try
		{
			var curLay;
			var curSize;
			for(var a=0;a<layers.length;a++)
			{
				curLay = layers[a];
				curSize = curLay.name;
				var curPiece;
				var coords;
				for(var b=0;b<curLay.groupItems.length;b++)
				{
					curPiece = curLay.groupItems[b];
					coords = thisGarment.placement[curSize][curPiece.name];
					if(curPiece.name.indexOf("Outside Cowl")>-1)
					{
						curPiece.rotate(180);
					}
					curPiece.left = coords[0];
					curPiece.top = coords[1];
					
					//use this condition for non-"sewn together" mockups
					//if you're copying artwork from a "sewn together" mockup file, comment this section

					// if(curSize == thisGarment.mockupSize)
					// {
					// 	var pieceName = curPiece.name.substring(curPiece.name.indexOf(" ")+1,curPiece.name.length);
					// 	var mockPiece = mockupLayer.groupItems["Mockup " + pieceName];
					// 	mockPiece.left = coords[0];
					// 	mockPiece.top = coords[1];
					// }
				}
			}
		}
		catch(e)
		{
			alert("failed while moving the pieces");
			valid = false;
			return;
		}
	}

	function createArtLayers()
	{
		try
		{
			var reversed = thisGarment.artLayers.reverse();
			for each(lay in reversed)
			{
				var newLay = artLayer.layers.add();
				newLay.name = lay;

			}
		}
		catch(e)
		{
			alert("Failed while creating the art layers");
			valid = false;
			return;
		}
	}

	function cleanUp()
	{
		try
		{
			
			var styleNum = prompt("Enter 3 digit style number", "015");
			infoLayer.textFrames["Garment Code"].contents = code + "_" + styleNum;
			layers["To Be Placed"].remove();
			docRef.layers[0].name = code + "_" + styleNum;
		}
		catch(e)
		{
			alert("Failed during cleanup");
			valid = false;
			return;
		}
	}


	////////End//////////
	///Logic Container///
	/////////////////////

	///////Begin////////
	////Data Storage////
	////////////////////

	var library = 
	{
		"FD_5411" :
		{
			"mockupSize" : "XL",
			"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Right Cowl", "Left Cowl", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Outside Cowl", "Left Sleeve", "Right Sleeve", "Inside Cowl"],
			"placement" : 
			{
				"S" : {"S Inside Cowl" : [225.809,199.65],"S Right Sleeve" : [274.823,-124.919],"S Outside Cowl" : [37.614,-317.605],"S Left Sleeve" : [274.811,-209.032],"S Right Side Panel" : [476.893,292.279],"S Left Side Panel" : [136.916,292.279],"S Collar" : [223.589,237.73],"S Back" : [430.864,-51.791],"S Right Cuff" : [260.789,274.13],"S Left Cuff" : [261.085,319.97],"S Front" : [44.465,-52.051]},
				"M" : {"M Inside Cowl" : [222.209,199.617],"M Right Sleeve" : [274.823,-124.919],"M Outside Cowl" : [34.014,-317.605],"M Left Sleeve" : [274.811,-209.032],"M Right Side Panel" : [476.892,296.017],"M Left Side Panel" : [136.916,296.017],"M Collar" : [223.761,237.73],"M Back" : [426.886,-51.791],"M Right Cuff" : [261.078,274.13],"M Left Cuff" : [261.023,319.97],"M Front" : [40.483,-52.051]},
				"L" : {"L Inside Cowl" : [218.609,199.617],"L Right Sleeve" : [274.823,-124.919],"L Outside Cowl" : [30.414,-317.605],"L Left Sleeve" : [274.811,-209.032],"L Right Side Panel" : [476.892,299.535],"L Left Side Panel" : [136.916,299.535],"L Collar" : [223.723,237.73],"L Back" : [422.074,-51.791],"L Right Cuff" : [260.628,274.13],"L Left Cuff" : [260.79,319.97],"L Front" : [35.674,-52.051]},
				"XL" : {"XL Inside Cowl" : [215.009,199.617],"XL Right Sleeve" : [274.823,-124.919],"XL Outside Cowl" : [26.814,-317.605],"XL Left Sleeve" : [274.811,-209.032],"XL Right Side Panel" : [476.893,303.216],"XL Left Side Panel" : [136.916,303.216],"XL Collar" : [223.799,237.729],"XL Back" : [416.513,-51.791],"XL Right Cuff" : [260.762,274.13],"XL Left Cuff" : [261.029,319.971],"XL Front" : [30.113,-52.051]},
				"2XL" : {"2XL Inside Cowl" : [211.409,199.579],"2XL Right Sleeve" : [274.823,-124.919],"2XL Outside Cowl" : [23.214,-317.605],"2XL Left Sleeve" : [274.811,-209.032],"2XL Right Side Panel" : [476.892,306.839],"2XL Left Side Panel" : [136.916,306.839],"2XL Collar" : [223.607,237.729],"2XL Back" : [410.616,-51.791],"2XL Right Cuff" : [261.233,274.13],"2XL Left Cuff" : [261.233,319.97],"2XL Front" : [24.221,-52.051]},
				"3XL" : {"3XL Inside Cowl" : [207.809,199.701],"3XL Right Sleeve" : [274.824,-124.919],"3XL Outside Cowl" : [19.615,-317.236],"3XL Left Sleeve" : [274.811,-209.032],"3XL Right Side Panel" : [476.892,310.24],"3XL Left Side Panel" : [136.916,310.24],"3XL Collar" : [223.662,237.73],"3XL Back" : [407.425,-51.791],"3XL Right Cuff" : [260.437,274.13],"3XL Left Cuff" : [260.467,319.97],"3XL Front" : [21.027,-52.051]},
				"4XL" : {"4XL Inside Cowl" : [204.209,199.579],"4XL Right Sleeve" : [274.823,-124.919],"4XL Outside Cowl" : [16.014,-317.605],"4XL Left Sleeve" : [274.811,-209.032],"4XL Right Side Panel" : [476.892,316.471],"4XL Left Side Panel" : [136.916,316.471],"4XL Collar" : [223.567,237.73],"4XL Back" : [402.915,-51.791],"4XL Right Cuff" : [260.785,274.13],"4XL Left Cuff" : [260.71,319.971],"4XL Front" : [16.516,-52.051]},
				"5XL" : {"5XL Inside Cowl" : [200.609,199.579],"5XL Right Sleeve" : [274.825,-124.919],"5XL Outside Cowl" : [12.414,-317.604],"5XL Left Sleeve" : [274.818,-209.028],"5XL Right Side Panel" : [476.892,318.793],"5XL Left Side Panel" : [136.916,318.793],"5XL Collar" : [223.365,237.729],"5XL Back" : [398.569,-51.791],"5XL Right Cuff" : [260.614,274.13],"5XL Left Cuff" : [260.94,319.97],"5XL Front" : [12.17,-52.051]}
			}
		},
		"FD_5411Y" :
		{
			"mockupSize" : "YXL",
			"sizes" : ["YS", "YM", "YL", "YXL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Right Cowl", "Left Cowl", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Left Cuff", "Back", "Right Cuff", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
			"placement" : 
			{
				"YS" : {"YS Inside Cowl" : [243.037,201.255],"YS Right Sleeve" : [281.074,-66.995],"YS Outside Cowl" : [47.69,-332.595],"YS Left Sleeve" : [281.074,-162.078],"YS Right Side Panel" : [447.835,258.278],"YS Left Side Panel" : [159.98,258.279],"YS Collar" : [232.702,238.666],"YS Right Cuff" : [249.173,278.213],"YS Back" : [462.001,-59.182],"YS Left Cuff" : [247.396,314.252],"YS Front" : [40.302,-59.767]},
				"YM" : {"YM Inside Cowl" : [236.6,201.253],"YM Right Sleeve" : [281.074,-67.003],"YM Outside Cowl" : [41.252,-332.592],"YM Left Sleeve" : [281.077,-162.078],"YM Right Side Panel" : [447.832,262.514],"YM Left Side Panel" : [159.976,262.514],"YM Collar" : [232.701,238.666],"YM Right Cuff" : [249.356,278.213],"YM Back" : [455.636,-59.182],"YM Left Cuff" : [247.411,314.252],"YM Front" : [33.905,-59.767]},
				"YL" : {"YL Inside Cowl" : [232.833,201.253],"YL Right Sleeve" : [281.077,-67.003],"YL Outside Cowl" : [37.484,-332.592],"YL Left Sleeve" : [281.078,-162.078],"YL Right Side Panel" : [447.835,268.85],"YL Left Side Panel" : [159.98,268.855],"YL Collar" : [232.701,238.666],"YL Right Cuff" : [249.266,278.213],"YL Back" : [451.987,-59.182],"YL Left Cuff" : [247.411,314.252],"YL Front" : [30.22,-59.767]},
				"YXL" : {"YXL Inside Cowl" : [226.702,201.25],"YXL Right Sleeve" : [281.078,-67.003],"YXL Outside Cowl" : [31.349,-332.592],"YXL Left Sleeve" : [281.074,-162.07],"YXL Right Side Panel" : [447.835,274.445],"YXL Left Side Panel" : [159.98,274.451],"YXL Collar" : [232.695,238.666],"YXL Right Cuff" : [249.362,278.213],"YXL Back" : [446.003,-59.182],"YXL Left Cuff" : [247.411,314.252],"YXL Front" : [24.198,-59.767]}
			}
		},
		"FD_250" :
		{
			"mockupSize" : "XL",
			"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Right Cowl", "Left Cowl", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
			"placement" : 
			{
				"S" : {"S Inside Cowl" : [225.809,199.65],"S Right Sleeve" : [274.823,-124.919],"S Outside Cowl" : [37.614,-317.605],"S Left Sleeve" : [274.811,-209.032],"S Right Side Panel" : [476.893,292.279],"S Left Side Panel" : [136.916,292.279],"S Collar" : [223.589,237.73],"S Back" : [430.864,-51.791],"S Right Cuff" : [260.789,274.13],"S Left Cuff" : [261.085,319.97],"S Front" : [44.465,-52.051]},
				"M" : {"M Inside Cowl" : [222.209,199.617],"M Right Sleeve" : [274.823,-124.919],"M Outside Cowl" : [34.014,-317.605],"M Left Sleeve" : [274.811,-209.032],"M Right Side Panel" : [476.892,296.017],"M Left Side Panel" : [136.916,296.017],"M Collar" : [223.761,237.73],"M Back" : [426.886,-51.791],"M Right Cuff" : [261.078,274.13],"M Left Cuff" : [261.023,319.97],"M Front" : [40.483,-52.051]},
				"L" : {"L Inside Cowl" : [218.609,199.617],"L Right Sleeve" : [274.823,-124.919],"L Outside Cowl" : [30.414,-317.605],"L Left Sleeve" : [274.811,-209.032],"L Right Side Panel" : [476.892,299.535],"L Left Side Panel" : [136.916,299.535],"L Collar" : [223.723,237.73],"L Back" : [422.074,-51.791],"L Right Cuff" : [260.628,274.13],"L Left Cuff" : [260.79,319.97],"L Front" : [35.674,-52.051]},
				"XL" : {"XL Inside Cowl" : [215.009,199.617],"XL Right Sleeve" : [274.823,-124.919],"XL Outside Cowl" : [26.814,-317.605],"XL Left Sleeve" : [274.811,-209.032],"XL Right Side Panel" : [476.893,303.216],"XL Left Side Panel" : [136.916,303.216],"XL Collar" : [223.799,237.729],"XL Back" : [416.513,-51.791],"XL Right Cuff" : [260.762,274.13],"XL Left Cuff" : [261.029,319.971],"XL Front" : [30.113,-52.051]},
				"2XL" : {"2XL Inside Cowl" : [211.409,199.579],"2XL Right Sleeve" : [274.823,-124.919],"2XL Outside Cowl" : [23.214,-317.605],"2XL Left Sleeve" : [274.811,-209.032],"2XL Right Side Panel" : [476.892,306.839],"2XL Left Side Panel" : [136.916,306.839],"2XL Collar" : [223.607,237.729],"2XL Back" : [410.616,-51.791],"2XL Right Cuff" : [261.233,274.13],"2XL Left Cuff" : [261.233,319.97],"2XL Front" : [24.221,-52.051]},
				"3XL" : {"3XL Inside Cowl" : [207.809,199.701],"3XL Right Sleeve" : [274.824,-124.919],"3XL Outside Cowl" : [19.615,-317.236],"3XL Left Sleeve" : [274.811,-209.032],"3XL Right Side Panel" : [476.892,310.24],"3XL Left Side Panel" : [136.916,310.24],"3XL Collar" : [223.662,237.73],"3XL Back" : [407.425,-51.791],"3XL Right Cuff" : [260.437,274.13],"3XL Left Cuff" : [260.467,319.97],"3XL Front" : [21.027,-52.051]},
				"4XL" : {"4XL Inside Cowl" : [204.209,199.579],"4XL Right Sleeve" : [274.823,-124.919],"4XL Outside Cowl" : [16.014,-317.605],"4XL Left Sleeve" : [274.811,-209.032],"4XL Right Side Panel" : [476.892,316.471],"4XL Left Side Panel" : [136.916,316.471],"4XL Collar" : [223.567,237.73],"4XL Back" : [402.915,-51.791],"4XL Right Cuff" : [260.785,274.13],"4XL Left Cuff" : [260.71,319.971],"4XL Front" : [16.516,-52.051]},
				"5XL" : {"5XL Inside Cowl" : [200.609,199.579],"5XL Right Sleeve" : [274.825,-124.919],"5XL Outside Cowl" : [12.414,-317.604],"5XL Left Sleeve" : [274.818,-209.028],"5XL Right Side Panel" : [476.892,318.793],"5XL Left Side Panel" : [136.916,318.793],"5XL Collar" : [223.365,237.729],"5XL Back" : [398.569,-51.791],"5XL Right Cuff" : [260.614,274.13],"5XL Left Cuff" : [260.94,319.97],"5XL Front" : [12.17,-52.051]}
			}
		},
		"FD_250Y" :
		{
			"mockupSize" : "YXL",
			"sizes" : ["YS", "YM", "YL", "YXL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Right Cowl", "Left Cowl", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Left Cuff", "Back", "Right Cuff", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
			"placement" : 
			{
				"YS" : {"YS Inside Cowl" : [243.037,201.255],"YS Right Sleeve" : [281.074,-66.995],"YS Outside Cowl" : [47.69,-332.595],"YS Left Sleeve" : [281.074,-162.078],"YS Right Side Panel" : [447.835,258.278],"YS Left Side Panel" : [159.98,258.279],"YS Collar" : [232.702,238.666],"YS Right Cuff" : [249.173,278.213],"YS Back" : [462.001,-59.182],"YS Left Cuff" : [247.396,314.252],"YS Front" : [40.302,-59.767]},
				"YM" : {"YM Inside Cowl" : [236.6,201.253],"YM Right Sleeve" : [281.074,-67.003],"YM Outside Cowl" : [41.252,-332.592],"YM Left Sleeve" : [281.077,-162.078],"YM Right Side Panel" : [447.832,262.514],"YM Left Side Panel" : [159.976,262.514],"YM Collar" : [232.701,238.666],"YM Right Cuff" : [249.356,278.213],"YM Back" : [455.636,-59.182],"YM Left Cuff" : [247.411,314.252],"YM Front" : [33.905,-59.767]},
				"YL" : {"YL Inside Cowl" : [232.833,201.253],"YL Right Sleeve" : [281.077,-67.003],"YL Outside Cowl" : [37.484,-332.592],"YL Left Sleeve" : [281.078,-162.078],"YL Right Side Panel" : [447.835,268.85],"YL Left Side Panel" : [159.98,268.855],"YL Collar" : [232.701,238.666],"YL Right Cuff" : [249.266,278.213],"YL Back" : [451.987,-59.182],"YL Left Cuff" : [247.411,314.252],"YL Front" : [30.22,-59.767]},
				"YXL" : {"YXL Inside Cowl" : [226.702,201.25],"YXL Right Sleeve" : [281.078,-67.003],"YXL Outside Cowl" : [31.349,-332.592],"YXL Left Sleeve" : [281.074,-162.07],"YXL Right Side Panel" : [447.835,274.445],"YXL Left Side Panel" : [159.98,274.451],"YXL Collar" : [232.695,238.666],"YXL Right Cuff" : [249.362,278.213],"YXL Back" : [446.003,-59.182],"YXL Left Cuff" : [247.411,314.252],"YXL Front" : [24.198,-59.767]}
			}
		},
		"FD_858" :
		{
			"mockupSize" : "XL",
			"sizes": ["S", "M", "L", "XL", "2XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Collar 2", "Left Sleeve"],
			"placement" : 
			{
				"S" : {"S Left Sleeve" : [204.167,-347.566],"S Collar 2" : [271.711,153.097],"S Collar" : [268.945,124.433],"S Right Sleeve" : [-10.993,-347.788],"S Back" : [446.082,-27.355],"S Front" : [58.637,-25.591]},
				"M" : {"M Left Sleeve" : [201.042,-345.766],"M Collar 2" : [269.781,153.1],"M Collar" : [268.193,124.429],"M Right Sleeve" : [-14.118,-345.988],"M Back" : [440.686,-24.274],"M Front" : [53.237,-22.801]},
				"L" : {"L Left Sleeve" : [198.218,-343.966],"L Collar 2" : [269.141,153.097],"L Collar" : [266.085,124.433],"L Right Sleeve" : [-16.942,-344.188],"L Back" : [435.282,-20.659],"L Front" : [47.837,-20.221]},
				"XL" : {"XL Left Sleeve" : [195.126,-342.166],"XL Collar 2" : [267.239	,153.1],"XL Collar" : [265.336,124.429],"XL Right Sleeve" : [-20.033,-342.388],"XL Back" : [429.886,-17.075],"XL Front" : [42.437,-17.595]},
				"2XL" : {"2XL Left Sleeve" : [192.321,-340.366],"2XL Collar 2" : [266.611,153.097],"2XL Collar" : [263.726,124.429],"2XL Right Sleeve" : [-22.839,-340.588],"2XL Back" : [424.486,-13.486],"2XL Front" : [37.037,-14.931]}
			}
		},
		"FD_3061" :
		{
			"mockupSize" : "XL",
			"sizes": ["S", "M", "L", "XL", "2XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Collar", "Front", "Back", "Left Sleeve", "Right Sleeve"],
			"placement" : 
			{
				"S" : {"S Right Sleeve" : [-9.539,-345.738],"S Left Sleeve" : [207.684,-345.692],"S Back" : [447.006,-38.846],"S Front" : [59.057,-45.736],"S Collar" : [234.214,133.38]},
				"M" : {"M Right Sleeve" : [-11.668,-338.539],"M Left Sleeve" : [205.554,-338.493],"M Back" : [441.6,-37.046],"M Front" : [53.656,-43.269],"M Collar" : [231.448,133.38]},
				"L" : {"L Right Sleeve" : [-14.184,-331.347],"L Left Sleeve" : [203.043,-331.288],"L Back" : [436.199,-35.246],"L Front" : [48.257,-40.469],"L Collar" : [229.893,133.379]},
				"XL" : {"XL Right Sleeve" : [-16.548,-324.136],"XL Left Sleeve" : [200.679,-324.09],"XL Back" : [430.8,-33.446],"XL Front" : [42.857,-37.669],"XL Collar" : [226.56,133.379]},
				"2XL" : {"2XL Right Sleeve" : [-18.91,-316.937],"2XL Left Sleeve" : [198.313,-316.897],"2XL Back" : [425.406,-31.646],"2XL Front" : [37.461,-35.132],"2XL Collar" : [224.781,133.38]}
			}
		},
		"FD_3062" :
		{
			"mockupSize" : "XL",
			"sizes": ["S", "M", "L", "XL", "2XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Collar","Collar Triangle", "Front", "Back", "Left Sleeve", "Right Sleeve"],
			"placement" : 
			{
				"S" : {"S Right Sleeve" : [-9.535,-344.109],"S Left Sleeve" : [207.689,-345.048],"S Back" : [447.1,-27.359],"S Front" : [64.832,-42.27],"S Collar Triangle" : [304.439,231.313],"S Collar" : [244.08,158.787]},
				"M" : {"M Right Sleeve" : [-11.67,-336.909],"M Left Sleeve" : [205.555,-337.85],"M Back" : [441.7,-25.558],"M Front" : [59.431,-39.632],"M Collar Triangle" : [303.679,232.22],"M Collar" : [241.995,158.787]},
				"L" : {"L Right Sleeve" : [-14.182,-329.709],"L Left Sleeve" : [203.043,-330.649],"L Back" : [436.299,-23.758],"L Front" : [54.032,-36.995],"L Collar Triangle" : [303.496,232.198],"L Collar" : [239.915,158.787]},
				"XL" : {"XL Right Sleeve" : [-16.546,-322.508],"XL Left Sleeve" : [200.678,-323.45],"XL Back" : [430.899,-21.958],"XL Front" : [48.631,-34.319],"XL Collar Triangle" : [303.214,232.212],"XL Collar" : [237.826,158.787]},
				"2XL" : {"2XL Right Sleeve" : [-18.911,-315.308],"2XL Left Sleeve" : [198.313,-316.249],"2XL Back" : [425.504,-20.159],"2XL Front" : [43.231,-31.602],"2XL Collar Triangle" : [303,232.204],"2XL Collar" : [235.739,158.787]}
			}
		},
		"FD_3063" :
		{
			"mockupSize" : "XL",
			"sizes": ["S", "M", "L", "XL", "2XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Back", "Left Sleeve", "Inside Collar", "Binding", "Outside Collar", "Right Sleeve", "Placket"],
			"placement" : 
			{
				"S" : {"S Placket" : [300.522,277.659],"S Right Sleeve" : [-1.555,-356.01],"S Outside Collar" : [259.711,150.384],"S Binding" : [260.09,222.142],"S Inside Collar" : [259.709,197.105],"S Left Sleeve" : [213.608,-356.075],"S Back" : [446.219,-39.642],"S Front" : [62.637,-42.068]},
				"M" : {"M Placket" : [300.35,277.723],"M Right Sleeve" : [-4.476,-354.216],"M Outside Collar" : [258.374,150.367],"M Binding" : [260.09,222.142],"M Inside Collar" : [258.374,197.088],"M Left Sleeve" : [210.686,-354.28],"M Back" : [440.819,-37.928],"M Front" : [57.237,-39.551]},
				"L" : {"L Placket" : [300.186,277.642],"L Right Sleeve" : [-7.518,-352.421],"L Outside Collar" : [256.482,150.36],"L Binding" : [260.09,222.142],"L Inside Collar" : [256.483,197.082],"L Left Sleeve" : [207.645,-352.484],"L Back" : [435.419,-36.136],"L Front" : [51.837,-36.833]},
				"XL" : {"XL Placket" : [300.021,277.565],"XL Right Sleeve" : [-10.553,-350.624],"XL Outside Collar" : [254.535,150.352],"XL Binding" : [260.09,222.142],"XL Inside Collar" : [254.539,197.071],"XL Left Sleeve" : [204.606,-350.688],"XL Back" : [430.019,-34.414],"XL Front" : [46.437,-34.186]},
				"2XL" : {"2XL Placket" : [299.848,277.5],"2XL Right Sleeve" : [-13.594,-348.827],"2XL Outside Collar" : [251.495,150.346],"2XL Binding" : [260.09,222.142],"2XL Inside Collar" : [251.495,197.068],"2XL Left Sleeve" : [201.568,-348.891],"2XL Back" : [424.62,-32.692],"2XL Front" : [41.037,-31.558]}
			}
		},
		"FD_3064" :
		{
			"mockupSize" : "XL",
			"sizes": ["S", "M", "L", "XL", "2XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Right Sleeve", "Left Sleeve", "Sponsor Logo", "Additional Art"],
			"pieces" : ["Front", "Collar", "Back", "Left Sleeve", "Right Sleeve"],
			"placement" : 
			{
				"S" : {"S Right Sleeve" : [-1.548,-356.126],"S Left Sleeve" : [213.612,-356.127],"S Back" : [446.313,-39.206],"S Collar" : [243.07,122.992],"S Front" : [62.73,-46.309]},
				"M" : {"M Right Sleeve" : [-4.473,-354.331],"M Left Sleeve" : [210.686,-354.332],"M Back" : [440.913,-37.406],"M Collar" : [240.838,123.175],"M Front" : [57.33,-43.815]},
				"L" : {"L Right Sleeve" : [-7.511,-352.536],"L Left Sleeve" : [207.646,-352.537],"L Back" : [435.509,-35.702],"L Collar" : [238.566,122.973],"L Front" : [51.931,-41.112]},
				"XL" : {"XL Right Sleeve" : [-10.55,-350.74],"XL Left Sleeve" : [204.606,-350.742],"XL Back" : [430.113,-33.979],"XL Collar" : [235.967,122.973],"XL Front" : [46.527,-38.408]},
				"2XL" : {"2XL Right Sleeve" : [-13.592,-348.942],"2XL Left Sleeve" : [201.572,-348.944],"2XL Back" : [424.713,-32.218],"2XL Collar" : [233.738,122.973],"2XL Front" : [41.131,-35.844]}
			}
		},
		"FD_BASK_RV" : 
		{
			"mockupSize" : "XL",
			"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Sponsor Logo", "Locker Tag", "Additional Artwork", "Left Leg", "Right Leg"],
			"pieces" : ["Front", "Back", "Right Leg Panel", "Left Leg Panel"],
			"placement" : 
			{
				"S" : {"S Left Leg Panel" : [390.37,309.26],"S Right Leg Panel" : [24.604,309.256],"S Back" : [201.566,-2.199],"S Front" : [-11.055,-1.9]},
				"M" : {"M Left Leg Panel" : [386.1,316.305],"M Right Leg Panel" : [19.961,316.301],"M Back" : [194.733,1.628],"M Front" : [-17.888,0.866]},
				"L" : {"L Left Leg Panel" : [381.436,323.475],"L Right Leg Panel" : [15.265,323.471],"L Back" : [189.6,3.25],"L Front" : [-23.02,3.482]},
				"XL" : {"XL Left Leg Panel" : [376.176,330.948],"XL Right Leg Panel" : [10.331,330.944],"XL Back" : [183.776,4.986],"XL Front" : [-28.845,6.434]},
				"2XL" : {"2XL Left Leg Panel" : [372.477,337.956],"2XL Right Leg Panel" : [5.987,337.952],"2XL Back" : [177.69,8.61],"2XL Front" : [-34.931,9.017]},
				"3XL" : {"3XL Left Leg Panel" : [368.778,337.956],"3XL Right Leg Panel" : [1.759,337.952],"3XL Back" : [172.504,10.758],"3XL Front" : [-40.118,11.796]}
			}
		},
		"FD_BASKW_RV" : 
		{
			"mockupSize" : "M",
			"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Sponsor Logo", "Locker Tag", "Additional Artwork", "Left Leg", "Right Leg"],
			"pieces" : ["Front", "Back", "Right Leg Panel", "Left Leg Panel"],
			"placement" :
			{
				"S" : {"S Left Leg Panel" : [392.719,283.345],"S Right Leg Panel" : [24.625,283.567],"S Back" : [204.176,-4.461],"S Front" : [-8.393,-2.581]},
				"M" : {"M Left Leg Panel" : [388.894,287.197],"M Right Leg Panel" : [21.458,287.404],"M Back" : [199.399,-2.079],"M Front" : [-13.143,0.266]},
				"L" : {"L Left Leg Panel" : [381.459,290.653],"L Right Leg Panel" : [16.731,290.891],"L Back" : [194.626,0.768],"L Front" : [-18.107,4.09]},
				"XL" : {"XL Left Leg Panel" : [379.171,294.107],"XL Right Leg Panel" : [12.7,294.36],"XL Back" : [189.708,3.521],"XL Front" : [-22.983,7.495]},
				"2XL" : {"2XL Left Leg Panel" : [374.777,297.745],"2XL Right Leg Panel" : [9.047,297.946],"2XL Back" : [184.538,6.289],"2XL Front" : [-28.15,11.319]},
				"3XL" : {"3XL Left Leg Panel" : [369.798,301.468],"3XL Right Leg Panel" : [4.892,301.679],"3XL Back" : [179.28,8.933],"3XL Front" : [-33.426,15.003]}
			}
		},
		"FD_BASKY_RV" :
		{
			"mockupSize" : "YXL",
			"sizes" : ["YS", "YM", "YL", "YXL"],
			"artLayers": ["Front Logo", "Front Number", "Player Name", "Back Number", "Sponsor Logo", "Locker Tag", "Additional Artwork", "Left Leg", "Right Leg"],
			"pieces" : ["Front", "Back", "Right Leg Panel", "Left Leg Panel"],
			"placement" : 
			{
				"YS" : {"YS Left Leg Panel" : [404.812,272.171],"YS Right Leg Panel" : [35.935,272.137],"YS Back" : [213.272,-10.98],"YS Front" : [0.647,-12.473]},
				"YM" : {"YM Left Leg Panel" : [400.928,279.222],"YM Right Leg Panel" : [31.067,279.141],"YM Back" : [209.57,-9.347],"YM Front" : [-3.055,-9.72]},
				"YL" : {"YL Left Leg Panel" : [396.971,286.538],"YL Right Leg Panel" : [26.833,286.425],"YL Back" : [206.212,-7.048],"YL Front" : [-6.412,-7.218]},
				"YXL" : {"YXL Left Leg Panel" : [392.214,293.755],"YXL Right Leg Panel" : [22.859,293.666],"YXL Back" : [202.486,-5.302],"YXL Front" : [-10.139,-4.441]}
			}
		},
		"FDWH" : 
		{
			"mockupSize" : "M",
			"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
			"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Left Sleeve", "Right Sleeve", "Locker Tag", "Sponsor Logo", "Right Hood", "Left Hood", "Front Pocket", "Additional Art"],
			"pieces" : ["Front", "Back", "Pocket", "Left Sleeve", "Left Cuff", "Waistband", "Right Sleeve", "Right Cuff", "Right Outside Hood", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood"],
			"placement" : 
			{
				"XXS" : {"XXS Right Inside Hood" : [592.836,-160.773],"XXS Left Outside Hood" : [592.767,-7.129],"XXS Left Inside Hood" : [493.92,-160.825],"XXS Right Outside Hood" : [493.909,-7.18],"XXS Right Cuff" : [54.626,-533.85],"XXS Right Sleeve" : [27.587,-336.184],"XXS Waistband" : [315.539,-642.713],"XXS Left Cuff" : [277.68,-534.711],"XXS Left Sleeve" : [250.158,-335.121],"XXS Pocket" : [24.683,-637.968],"XXS Back" : [250.431,-32.485],"XXS Front" : [-0.151,-33.006]},
				"XS" : {"XS Right Inside Hood" : [592.836,-160.503],"XS Left Outside Hood" : [592.767,-6.859],"XS Left Inside Hood" : [490.817,-160.555],"XS Right Outside Hood" : [490.806,-6.91],"XS Right Cuff" : [53.888,-534.238],"XS Right Sleeve" : [22.907,-333.586],"XS Waistband" : [308.339,-642.749],"XS Left Cuff" : [276.779,-534.794],"XS Left Sleeve" : [245.705,-333.684],"XS Pocket" : [22.122,-636.918],"XS Back" : [246.821,-29.779],"XS Front" : [-3.746,-29.457]},
				"S" : {"S Right Inside Hood" : [592.836,-160.168],"S Left Outside Hood" : [592.767,-6.531],"S Left Inside Hood" : [487.699,-160.22],"S Right Outside Hood" : [487.689,-6.586],"S Right Cuff" : [52.989,-534.604],"S Right Sleeve" : [18.328,-330.559],"S Waistband" : [301.139,-643.134],"S Left Cuff" : [275.879,-534.797],"S Left Sleeve" : [241.132,-330.664],"S Pocket" : [20.509,-635.1],"S Back" : [243.219,-26.213],"S Front" : [-7.354,-25.908]},
				"M" : {"M Right Inside Hood" : [592.836,-159.939],"M Left Outside Hood" : [592.767,-6.295],"M Left Inside Hood" : [485.476,-159.99],"M Right Outside Hood" : [485.465,-6.346],"M Right Cuff" : [52.09,-534.336],"M Right Sleeve" : [13.372,-327.53],"M Waistband" : [293.939,-643.047],"M Left Cuff" : [274.979,-534.857],"M Left Sleeve" : [236.178,-327.653],"M Pocket" : [18.88,-633.281],"M Back" : [239.616,-22.726],"M Front" : [-10.962,-22.305]},
				"L" : {"L Right Inside Hood" : [592.836,-159.601],"L Left Outside Hood" : [592.767,-5.957],"L Left Inside Hood" : [482.285,-159.645],"L Right Outside Hood" : [482.274,-6.008],"L Right Cuff" : [51.19,-534.63],"L Right Sleeve" : [8.797,-324.498],"L Waistband" : [286.739,-642.941],"L Left Cuff" : [274.065,-534.821],"L Left Sleeve" : [231.602,-324.598],"L Pocket" : [17.241,-631.465],"L Back" : [236.015,-19.176],"L Front" : [-14.574,-18.921]},
				"XL" : {"XL Right Inside Hood" : [592.836,-158.406],"XL Left Outside Hood" : [592.767,-4.762],"XL Left Inside Hood" : [479.723,-158.458],"XL Right Outside Hood" : [479.719,-4.814],"XL Right Cuff" : [50.29,-534.577],"XL Right Sleeve" : [3.3,-321.452],"XL Waistband" : [275.939,-643.169],"XL Left Cuff" : [273.179,-534.794],"XL Left Sleeve" : [226.098,-321.56],"XL Pocket" : [15.581,-629.66],"XL Back" : [230.607,-15.485],"XL Front" : [-19.989,-15.372]},
				"2XL" : {"2XL Right Inside Hood" : [592.836,-158.139],"2XL Left Outside Hood" : [592.767,-4.496],"2XL Left Inside Hood" : [478.694,-158.183],"2XL Right Outside Hood" : [478.688,-4.537],"2XL Right Cuff" : [49.286,-534.295],"2XL Right Sleeve" : [1.466,-319.636],"2XL Waistband" : [265.139,-642.966],"2XL Left Cuff" : [272.28,-534.754],"2XL Left Sleeve" : [224.27,-319.755],"2XL Pocket" : [13.925,-627.831],"2XL Back" : [225.205,-14.044],"2XL Front" : [-25.396,-13.393]},
				"3XL" : {"3XL Right Inside Hood" : [592.836,-157.864],"3XL Left Outside Hood" : [592.767,-4.22],"3XL Left Inside Hood" : [477.663,-157.916],"3XL Right Outside Hood" : [477.652,-4.271],"3XL Right Cuff" : [48.49,-534.595],"3XL Right Sleeve" : [-0.575,-317.151],"3XL Waistband" : [254.339,-643.028],"3XL Left Cuff" : [271.38,-534.63],"3XL Left Sleeve" : [222.227,-317.255],"3XL Pocket" : [16.572,-626.868],"3XL Back" : [219.781,-12.588],"3XL Front" : [-30.8,-11.718]}
			}

		}
	}






	////////End/////////
	////Data Storage////
	////////////////////

	///////Begin////////
	///Function Calls///
	////////////////////

	//define script global variables

	var docRef = app.activeDocument;
	var valid = true;
	var layers = docRef.layers;
	var garmentLayer = layers[1];
	var code = garmentLayer.name.substring(0,garmentLayer.name.indexOf("_0"));
	var thisGarment = library[code];
	var prepress = garmentLayer.layers["Prepress"];
	var mockupLayer = garmentLayer.layers["Mockup"];
	var sourceLayer = layers["To Be Placed"];
	var infoLayer = garmentLayer.layers["Information"];
	var artLayer = garmentLayer.layers["Artwork Layer"];

	//

	var sorted = rowSort(sourceLayer.groupItems);

	if(valid)
		nameThePieces(sorted);

	if(valid)
		moveThePieces(prepress.layers);
	
	if(valid)
		createArtLayers();

	if(valid)
	{
		cleanUp();
		prepress.visible = false;
		infoLayer.locked = true;
	}

	#include "/Users/will.dowling/Desktop/In Progress/zzzzz~OLD/Automation/Javascript/_New CAD Workflow/Build_Template/mockLabels.js";	
    if(valid)
	    mockupLabels();







	////////End/////////
	///Function Calls///
	////////////////////


}
container();