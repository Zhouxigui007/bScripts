function test()
{

	//LOGIC CONTAINER//

	function rowSort(theArray)
	{
		// try
		// {
			var finalSorted = [];
			var rows = [];
			var buffer = 210;

			//populate temp arraywith groups of the same row
			while(theArray.length > 0)
			{
				// $.writeln("theArray.length = " + theArray.length);
				var temp = [];
				var tempSorted = [];
				var rowMarker = theArray[0].top - theArray[0].height/2;
				temp.push(theArray[0]);
				theArray.splice(0,1);
				for(var a=theArray.length-1;a>-1;a--)
				{
					var thisGroup = theArray[a];
					var vPos = thisGroup.top - thisGroup.height/2
					// alert("vPos, buffer and rowMarker\nvPos = " + vPos + "\nbuffer = " + buffer + "\nrowMarker = " + rowMarker);
					if(vPos + buffer > rowMarker && vPos - buffer < rowMarker)
					{
						temp.push(theArray[a]);
						theArray.splice(a,1);
					}
				}
				
				// alert("temp.length = " + temp.length);

				//row has been determined
				//loop the row to find farLeft and push to tempSorted
				if(temp.length==1)
				{
					rows.push(temp);
				}
				else
				{
					while(temp.length>0)
					{
						// $.writeln("temp.length = " + temp.length);
						var farLeft = temp[0];
						var deleteIndex = 0;

						for(var a=temp.length-1;a>0;a--)
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


					finalSort = sortVert(tempSorted)



					//push the left to right sorted row to rows array
					rows.push(finalSort);
					$.writeln("rows.typename = " + rows.typename);
				}
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
						vMarker = topMost[0].top;
						deleteIndex = a;
					}
				}
				finalSorted.push(topMost);
				rows.splice(deleteIndex,1)
			}
		// }
		// catch(e)
		// {
		// 	alert("failed while sorting the pieces");
		// 	valid = false;
		// 	return;
		// }
		return finalSorted;
	}









	function sortVert(thisRow)
	{
		var finishedSorting = [];

		if(thisRow.length==1)
		{
			finishedSorting.push(thisRow[0]);
			return finishedSorting;
		}
		while(thisRow.length>0)
		{
			var sharedLefts = [];
			var shared = false;
			var curLeft = thisRow[0].left;
			for(var a=thisRow.length-1;a>0;a--)
			{
				var thisGroup = thisRow[a];

				if(thisGroup.left + 5 > curLeft && thisGroup.left - 5 < curLeft)
				{
					//this group and thisRow[0] share a left coordinate
					sharedLefts.push(thisGroup)
					shared = true;
					thisRow.splice(a,1);
				}
			}
			
			if(!shared)
			{
				finishedSorting.push(thisRow[0])
				thisRow.splice(0,1);
			}
			else
			{
				sharedLefts.push(thisRow[0]);
				thisRow.splice(0,1);

				while(sharedLefts.length>0)
				{
					var top = sharedLefts[0].top;
					var topMost = sharedLefts[0];
					var di = 0;
					for(var t = 1;t <sharedLefts.length; t++)
					{
						var thisGroup = sharedLefts[t];
						if(thisGroup.top > top)
						{
							top = thisGroup.top;
							topMost = thisGroup;
							di = t;
						}
					}
					finishedSorting.push(topMost);
					sharedLefts.splice(di,1);
				}

			}
		}
		// $.writeln("finishedSorting = " + finishedSorting);
		return finishedSorting;
	}


	function namePieces(allRows)
	{
		//first row
		for(var a=0;a<allRows.length;a++)
		{
			if(a>0 && a<5)
			{
				thisItem = allRows[a][0];
				thisItem.name = obj.sizes[a] + " Binding";
				continue;
			}
			var thisRow = allRows[a];
			var curSize = obj.sizes[a];
			for(var b=0;b<thisRow.length;b++)
			{
				// $.writeln("piece: " + a + "-" + b + " = " + obj.pieces[b]);
				var thisPiece = thisRow[b];
				thisPiece.name = curSize + " " + obj.pieces[b];
			}
		}
	}

	function movePieces(allRows)
	{
		var prepress = layers[0].layers["Prepress"];
		prepress.visible = true;
		var yxsLay = prepress.layers.add();
		yxsLay.name = "YXS";
		var y2xlLay = prepress.layers.add();
		y2xlLay.name = "Y2XL";
		y2xlLay.zOrder(ZOrderMethod.SENDTOBACK);

		//move the pieces
		for(var a=0;a<allRows.length;a++)
		{
			var thisRow = allRows[a];
			var curSize = obj.sizes[a];
			for(var b=0;b<thisRow.length;b++)
			{
				var thisItem = thisRow[b];
				if(thisItem.name.indexOf("Outside")>-1)
				{
					thisItem.rotate(180);
				}
				thisItem.moveToBeginning(prepress.layers[curSize]);
				thisItem.left = obj.coords[curSize][thisItem.name][0];
				thisItem.top = obj.coords[curSize][thisItem.name][1];
			}
		}
		prepress.visible = false;
	}




	//VARS

	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var aB = docRef.artboards;
	var swatches = docRef.swatches;
	var obj = 
	{
		coords :
		{
			"YXS" : {"YXS Inside Cowl" : [249.36,204.941],"YXS Outside Cowl" : [54.011,-332.573],"YXS Collar" : [232.701,240.714],"YXS Right Sleeve" : [281.108,-66.876],"YXS Left Sleeve" : [281.073,-161.897],"YXS Right Side Panel" : [447.831,254.032],"YXS Left Side Panel" : [159.976,254.031],"YXS Binding" : [228.654,293.609],"YXS Left Cuff" : [248.818,314.583],"YXS Right Cuff" : [248.833,278.409],"YXS Front" : [46.696,-59.692],"YXS Back" : [468.361,-59.137]},
			"YS" : {"YS Binding" : [228.654,293.61]},
			"YM" : {"YM Binding" : [228.654,293.582]},
			"YL" : {"YL Binding" : [228.654,293.582]},
			"YXL" : {"YXL Binding" : [228.654,293.582]},
			"Y2XL" : {"Y2XL Right Sleeve" : [281.108,-66.861],"Y2XL Left Sleeve" : [281.073,-161.94],"Y2XL Right Side Panel" : [447.831,280.038],"Y2XL Left Side Panel" : [159.976,280.036],"Y2XL Binding" : [229.071,293.564],"Y2XL Front" : [18.178,-59.692],"Y2XL Back" : [440.013,-59.137],"Y2XL Outside Cowl" : [25.103,-328.087],"Y2XL Collar" : [232.702,240.472],"Y2XL Inside Cowl" : [221.023,201.246],"Y2XL Left Cuff" : [248.992,314.404],"Y2XL Right Cuff" : [248.833,278.535]}
		},
		pieces : ["Front", "Left Cuff", "Back", "Right Cuff", "Collar", "Left Side Panel", "Right Side Panel", "Outside Cowl", "Left Sleeve", "Binding", "Right Sleeve", "Inside Cowl"],
		// YXS : 
		// {
		// 	pieces : ["Front", "Left Cuff", "Back", "Right Cuff", "Collar", "Left Side Panel", "Right Side Panel", "Outside Cowl", "Left Sleeve", "Binding", "Right Sleeve", "Inside Cowl"],
		// },
		// Y2XL :
		// {
		// 	pieces : ["Left Side Panel", "Inside Cowl", "Collar", "Right Cuff", "Left Cuff", "Right Side Panel", "Front", "Back", "Binding", "Right Sleeve", "Left Sleeve",  "Outside Cowl"],
		// },
		sizes : ["YXS", "YS", "YM", "YL", "YXL", "Y2XL"]
	};
	var arr = [];


	//FUNCTION CALLS

	for(a=0;a<layers[0].groupItems.length;a++)
	{
		var thisGroup = layers[0].groupItems[a];
		arr.push(thisGroup);
	}

	var sorted = rowSort(arr);

	// $.writeln(sorted);

	namePieces(sorted);
	movePieces(sorted);





}
test();