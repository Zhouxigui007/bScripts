var fixerData = 
{
	//basketball
		"FD_137W":
		{
			"collarCalloutData":
			{
				"left": 563.160128351657,
				"top": -779.3564453125,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[0].pageItems[6];
					}
					catch(e)
					{
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 482.278292414157,
					"top": -782.1025390625
				}
			},
			"edge":
			{
				0: {
					"left": 656.67371026701,
					"top": -715.543945361329,
					"width": 71.9919692737421,
					"height": 70.546875,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				1: {
					"left": 158.636719945462,
					"top": -811.0625,
					"width": 581.186584472656,
					"height": 81.41015625,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				2: {
					"left": 158.636719945462,
					"top": -710.296875,
					"width": 298,
					"height": 94,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				3: {
					"left": 457.387696507962,
					"top": -403,
					"width": 274,
					"height": 268.5,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				4: {
					"left": 254.165467504055,
					"top": -401.413757324219,
					"width": 141.265197753906,
					"height": 141.26513671875,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				5: {
					"left": 49.6654675040554,
					"top": -401.413757324219,
					"width": 141.265197753906,
					"height": 141.26513671875,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				},
				6: {
					"left":488.633761164157, 
					"top":-763.752771023464, 
					"width":131.808721205485, 
					"height":13.5788044336387,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": false
				}
			},
			"placementGuides":
			{
				"Right Sleeve": {
					"left": 372.768360570462,
					"top": -152.28624525849,
					"width": 21.5999999999985,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Left Sleeve": {
					"left": 372.774217854399,
					"top": -315.916267307441,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 112.365530409972,
					"top": -165.020221710205,
					"width": 72,
					"height": 14.4410095214844,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 133.965536513488,
					"top": -187.089252471924,
					"width": 28.7999877929688,
					"height": 28.7999877929688,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 126.765524306456,
					"top": -187.089221954346,
					"width": 43.2000122070312,
					"height": 43.2000122070312,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 589.891197197852,
					"top": -167.713781356812,
					"width": 43.2000122070312,
					"height": 43.1999969482422,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 582.69120024961,
					"top": -167.713796615601,
					"width": 57.6000061035156,
					"height": 57.5999908447266,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 579.091209404884,
					"top": -146.138784408569,
					"width": 64.7999877929688,
					"height": 14.3999938964844,
					"fill": false,
					"stroke": false,
					"strokeWidth": 0,
					"guides": true,
					"rename": true
				}
			},
			"mockupAssets":
			{
				"Locker Tag Display": {
					"left": 656.673709071549,
					"top": -715.543945361329,
					"width": 71.9919692737421,
					"height": 70.546875,
					"fill": "C1",
					"stroke": false,
					"strokeWidth": false,
					"guides": false,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				//adjust the stroke width of the edges.
				var edges = mockLay.groupItems["Edges"];
				edges.locked = false;
				for(var fss=0;fss<edges.groupItems[0].pageItems.length;fss++)
				{
					var thisStroke = mockLay.groupItems["Edges"].groupItems[0].pageItems[fss];
					thisStroke.strokeWidth = .72;
				}
				edges.locked = true;
			}
		},

		"FD_137Y":
		{
			"collarCalloutData":
			{	
				"left": 552.421847101657,
				"top": -782.1025390625,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[0].pageItems[6];
					}
					catch(e)
					{
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 479.981417414157,
					"top": -785.0263671875
				}
			},
			edge:
			{
				"Locker Tag Display": {
					"left": 658.357882257907,
					"top": -715.314883240615,
					"width": 67.716796875,
					"height": 68.5213000000003,
					"fill": false,
					"stroke": "EDGE",
					"strokeWidth": 1,
					"guides": false,
					"rename": true
				}
			},
			"placementGuides":
			{
				"Left Sleeve": {
					"left": 371.977071711033,
					"top": -319.658698443102,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Sleeve": {
					"left": 371.977071711033,
					"top": -156.292646530796,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 588.802958226715,
					"top": -169.911417544139,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 581.602958226722,
					"top": -169.91141781135,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 133.785160030053,
					"top": -179.867446545295,
					"width": 28.7999999999993,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 126.585160030052,
					"top": -179.867446831397,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 110.385160030052,
					"top": -159.599306762712,
					"width": 75.6000000000004,
					"height": 12.5999999999995,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 587.002958226716,
					"top": -151.936417260474,
					"width": 46.7999999999993,
					"height": 10.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"mockupAssets":
			{
				"Locker Tag Display": {
					"left": 658.357882257907,
					"top": -715.314883240615,
					"width": 67.716796875,
					"height": 68.5213000000003,
					"fill": "C1",
					"stroke": false,
					"strokeWidth": false,
					"guides": false,
					"rename": true
				}
			}
		},

		"FD_137":
		{
			"collarCalloutData":
			{
				"left": 557.385714289157,
				"top": -782.1025390625,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[0].pageItems[6];
					}
					catch(e)
					{
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 482.278292414157,
					"top": -782.1025390625
				}
			},
			"edge":{},
			"placementGuides":
			{
				"Left Sleeve": {
					"left": 373.747155761719,
					"top": -331.574841308592,
					"width": 28.7999999999993,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Sleeve": {
					"left": 366.607202148438,
					"top": -164.408581542967,
					"width": 28.7999999999993,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 155.538115100511,
					"top": -90.4265761677925,
					"width": 28.7999999999975,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 148.338115100509,
					"top": -90.4265764538941,
					"width": 43.2000000000025,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 126.73811510051,
					"top": -68.3584363852096,
					"width": 86.3999999999996,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 576.716707319418,
					"top": -73.7994077287285,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 569.516707319421,
					"top": -73.7994079959399,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 565.916707319418,
					"top": -52.2244076357993,
					"width": 64.7999999999993,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"mockupAssets":{}
		},

		"FD_210_211":
		{
			"collarCalloutData":
			{
				"left": 598.416490349309,
				"top": -491.078212316672,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return mockLay.groupItems["Mockup Collar"];
					}
					catch(e)
					{
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 378.79072919922,
					"top": -490.943043160623
				}
			},
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 588.517284599267,
					"top": -311.605168819427,
					"width": 14.4000000000015,
					"height": 78.462173461915,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 581.317284599267,
					"top": -413.996448442931,
					"width": 28.8000000000029,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 45.1398437500002,
					"top": -311.605168819427,
					"width": 14.3999999999996,
					"height": 78.462173461915,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 37.9398437499995,
					"top": -413.996447753916,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 271.033456062201,
					"top": -413.996447753922,
					"width": 28.8000000000029,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 134.152840524158,
					"top": -413.996447753922,
					"width": 28.8000000000002,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 60.5811966971141,
					"top": -83.8513551146152,
					"width": 28.7999999999993,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 53.3811966971134,
					"top": -83.8513554007168,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 31.781196697114,
					"top": -61.7832153320323,
					"width": 86.3999999999996,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 266.00597423265,
					"top": -50.3446400280027,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 258.805974232651,
					"top": -50.3446402952177,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 255.205974232651,
					"top": -28.7446401998232,
					"width": 64.7999999999993,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 99.7391233540902,
					"top": -21.1809069569863,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"shape": "circle"
				},
				"Locker Tag": {
					"left": 279.505975399781,
					"top": -28.7446403905578,
					"width": 16.1999999999998,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			}
		},

		"FD_210Y_211Y":
		{
			"collarCalloutData":
			{
				"left": 556.39079741828,
				"top": -493.69023053662,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return mockLay.groupItems["Mockup Collar"];
					}
					catch(e)
					{
						return null;v
					}
				},
				"moveExistingCallout": 
				{
					"left": 376.191173347079,
					"top": -493.19023053662
				}
			},
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 594.514606387558,
					"top": -345.911529450351,
					"width": 10.8000000000011,
					"height": 58.8466300964456,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 589.114606387559,
					"top": -419.158159568247,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 39.7945968594577,
					"top": -345.911529450351,
					"width": 10.8000000000011,
					"height": 58.8466300964456,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 153.174153854508,
					"top": -414.290489509043,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 261.5242252751,
					"top": -414.290489509043,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 34.394596859458,
					"top": -419.158159568247,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Locker Tag": {
					"left": 284.424585400391,
					"top": -41.8658236792971,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 96.3229081515856,
					"top": -45.7086725292902,
					"width": 21.4100419272809,
					"height": 21.41004192728,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"shape": "circle"
				},
				"Front Number NFHS": {
					"left": 61.6017887695316,
					"top": -95.9342284590366,
					"width": 28.7999999999993,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 54.4017887695309,
					"top": -95.9342287451382,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 38.201788769531,
					"top": -75.6660886764539,
					"width": 75.6000000000004,
					"height": 12.5999999999995,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 270.92459344652,
					"top": -59.8658237255931,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 263.724593446519,
					"top": -59.8658239928081,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 269.124593446521,
					"top": -41.8658236792971,
					"width": 46.7999999999993,
					"height": 10.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				guidesLay.pathItems[0].width -= 7.2;
				guidesLay.pathItems[0].height -= 7.2;
				guidesLay.pathItems[0].left += 3.8;
				guidesLay.pathItems[0].name = "Left Front Guide";
				guidesLay.pathItems[1].width -= 7.2;
				guidesLay.pathItems[1].height -= 7.2;
				guidesLay.pathItems[1].left += 3.8;
				guidesLay.pathItems[1].name = "Left Side Guide";
				guidesLay.pathItems[2].width -= 7.2;
				guidesLay.pathItems[2].height -= 7.2;
				guidesLay.pathItems[2].left += 3.8;
				guidesLay.pathItems[2].name = "Right Side Guide";
				guidesLay.pathItems[3].width -= 7.2;
				guidesLay.pathItems[3].height -= 7.2;
				guidesLay.pathItems[3].left += 3.8;
				guidesLay.pathItems[3].name = "Right Front Guide";
			},
		},

		"FD_220W_221W":
		{
			"collarCalloutData":
			{
				"left": 574.333333333334,
				"top": -491.366077358529,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return mockLay.groupItems["Mockup Collar"];
					}
					catch(e)
					{
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 371.208314238505,
					"top": -487.226553313716
				}
			},
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 593.522205815749,
					"top": -320.259490227698,
					"width": 10.7999999999993,
					"height": 89.7188110351617,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 588.122205815749,
					"top": -425.295534052058,
					"width": 21.5999999999985,
					"height": 21.5999999999894,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 43.6584599121097,
					"top": -320.259490227698,
					"width": 10.7999999999993,
					"height": 89.7188110351617,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 38.2584599121101,
					"top": -425.295534052058,
					"width": 21.5999999999985,
					"height": 21.5999999999894,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 277.857712769727,
					"top": -421.50430759265,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 133.988803247567,
					"top": -421.50430759265,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 264.318475781251,
					"top": -56.054217744726,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 257.118475781252,
					"top": -56.0542180119428,
					"width": 57.5999999999985,
					"height": 57.5999999999949,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 257.118475781252,
					"top": -37.9264286581674,
					"width": 57.5999999999985,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 58.1039860351566,
					"top": -93.4357978421694,
					"width": 28.7999999999993,
					"height": 28.8000000000029,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 50.9039860351559,
					"top": -93.4357978421694,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 36.5039860351562,
					"top": -71.3770653929796,
					"width": 72,
					"height": 14.4408259892025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 97.5452751324638,
					"top": -41.5190854612802,
					"width": 14.4146858050362,
					"height": 14.4146858050353,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"shape": "circle"
				}
			}
		},

		"FD-215W_FD-219W":
		{
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 601.521226734894,
					"top": -309.855000897827,
					"width": 10.7999999999993,
					"height": 75.5201772008495,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 596.121227698832,
					"top": -400.692410887876,
					"width": 21.5999999999985,
					"height": 21.5999999999894,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 42.023125738735,
					"top": -309.855000897827,
					"width": 10.7999999999993,
					"height": 75.5201772008495,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 36.6231267026724,
					"top": -400.692410887876,
					"width": 21.5999999999985,
					"height": 21.5999999999894,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 252.378423337109,
					"top": -396.503393215074,
					"width": 21.6000000000004,
					"height": 21.5999999999995,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 140.439986280526,
					"top": -396.503393215074,
					"width": 21.6000000000004,
					"height": 21.5999999999995,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 266.006015886074,
					"top": -45.928280922848,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 258.806015886075,
					"top": -45.9282811900648,
					"width": 57.5999999999985,
					"height": 57.5999999999949,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 258.806015886075,
					"top": -27.8004918362894,
					"width": 57.5999999999985,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 60.5812718207189,
					"top": -75.333397955229,
					"width": 28.7999999999993,
					"height": 28.8000000000029,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 53.3812718207182,
					"top": -75.333397955229,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 38.9812718207186,
					"top": -53.2746655060391,
					"width": 72,
					"height": 14.4408259892025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 96.5812717669723,
					"top": -29.6503713890215,
					"width": 14.4146858050362,
					"height": 14.4146858050353,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"shape": "circle"
				}
			},
			"additionalFunctionality": function()
			{
				for(var x = mockLay.pageItems.length-1;x >-1; x--)
				{
					var thisItem = mockLay.pageItems[x];
					if(((thisItem.width + buffer) > 21.6 && (thisItem.width - buffer) < 21.6) && ((thisItem.height + buffer) > 21.6 && (thisItem.height - buffer) < 21.6))
					{
						$.writeln("removing item[" + x + "]");
						thisItem.remove();
					}
				}
			}
		},

		"FD-215Y_FD-219Y":
		{
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 601.838564328973,
					"top": -336.944658601915,
					"width": 10.7999999999993,
					"height": 58.8466300964392,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 596.416892306443,
					"top": -421.671270005454,
					"width": 21.5999999999985,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 45.6654677361648,
					"top": -336.869381265637,
					"width": 10.7999999999993,
					"height": 58.8466300964392,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 265.276074036385,
					"top": -416.43989232855,
					"width": 21.5999999999985,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 152.125269294622,
					"top": -416.43989232855,
					"width": 21.5999999999985,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 40.2437957136344,
					"top": -421.595992669176,
					"width": 21.5999999999985,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Locker Tag": {
					"left": 279.506016700387,
					"top": -28.302689222789,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 95.6127691576321,
					"top": -28.8201512484629,
					"width": 18,
					"height": 18,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 60.5813027510876,
					"top": -75.9127357729012,
					"width": 28.7999999999993,
					"height": 28.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 53.3813027510869,
					"top": -75.912736059001,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 37.181302751088,
					"top": -55.3463650126523,
					"width": 75.5999999999985,
					"height": 12.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 266.006016700387,
					"top": -46.8526890509702,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 258.806016700388,
					"top": -46.8526893181906,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 264.206016700387,
					"top": -28.302689222789,
					"width": 46.7999999999993,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				} 
			},
			"additionalFunctionality": function()
			{
				for(var x = mockLay.pageItems.length-1;x >-1; x--)
				{
					var thisItem = mockLay.pageItems[x];
					if(((thisItem.width + buffer) > 21.6 && (thisItem.width - buffer) < 21.6) && ((thisItem.height + buffer) > 21.6 && (thisItem.height - buffer) < 21.6))
					{
						$.writeln("removing item[" + x + "]");
						thisItem.remove();
					}
				}
			}
		},

		"FD-215_FD-219":
		{
			"placementGuides":
			{
				"Left Leg Team Name": {
					"left": 599.002832195098,
					"top": -310.543281555176,
					"width": 14.3999999999996,
					"height": 78.4621734619141,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg": {
					"left": 591.802832195097,
					"top": -412.934561178679,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Team Name": {
					"left": 43.843795705332,
					"top": -310.543281555176,
					"width": 14.3999999999996,
					"height": 78.4621734619141,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Left Leg Front": {
					"left": 271.074558821913,
					"top": -410.022661856221,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg Front": {
					"left": 139.461416315734,
					"top": -410.022661856221,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Right Leg": {
					"left": 36.6437957053313,
					"top": -412.934561178679,
					"width": 28.8000000000011,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Locker Tag": {
					"left": 279.583877039324,
					"top": -24.7573640047076,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Upper Left": {
					"left": 100.716687334216,
					"top": -22.2199709310144,
					"width": 21.5999999999995,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,                                     
					"rename": true,
					"shape": "circle"
				},
				"Front Number NFHS": {
					"left": 60.662847827758,
					"top": -77.853963831798,
					"width": 28.7999999999993,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 53.4628478277573,
					"top": -77.8539641178995,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 31.8628478277578,
					"top": -55.7858240492151,
					"width": 86.3999999999996,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 266.083877039324,
					"top": -46.357363832888,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 258.883877039325,
					"top": -46.357364100103,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 255.283877039325,
					"top": -24.7573640047076,
					"width": 64.7999999999993,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			}
		},

		"FD_217":
		{
			"placementGuides":
			{
				"Front Number NFHS": {
					"left": 201.587912029784,
					"top": -188.232636649445,
					"width": 28.7999999999993,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 194.387912029783,
					"top": -188.232636935547,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 172.787912029784,
					"top": -166.164496866862,
					"width": 86.3999999999996,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 512.03747105078,
					"top": -164.699684438259,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 504.83747105078,
					"top": -164.699684705474,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 501.237471050781,
					"top": -143.099684610079,
					"width": 64.7999999999993,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Locker Tag":
				{
					"left": 525.53747105078,
					"top": -143.099683229606,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				//delete the existing "no artwork above this line" guides
				try
				{
					for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
					{
						var thisItem = guidesLay.groupItems[0].pageItems[x];
						if(thisItem.name.indexOf("bove")>-1)
						{
							thisItem.remove();
						}
					}
				}
				catch(e)
				{
					//oh well
				}
			}
		},

		"FD_217Y":
		{
			"placementGuides":
			{
				"Locker Tag": {
					"left": 529.145488803651,
					"top": -164.12581753105,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS": {
					"left": 200.306758182314,
					"top": -201.429856305736,
					"width": 28.7999999999993,
					"height": 28.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 193.106758182314,
					"top": -201.429856591836,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 176.906758182314,
					"top": -180.863485545487,
					"width": 75.6000000000004,
					"height": 12.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 515.645488803651,
					"top": -182.675816547006,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 508.445488803653,
					"top": -182.675816814226,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 513.845488803652,
					"top": -164.125816718824,
					"width": 46.7999999999993,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				//delete the existing "no artwork above this line" guides
				try
				{
					for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
					{
						var thisItem = guidesLay.groupItems[0].pageItems[x];
						if(thisItem.name.indexOf("bove")>-1)
						{
							thisItem.remove();
						}
					}
				}
				catch(e)
				{
					//oh well
				}
			}
		},

		"FD_217W":
		{
			"additionalFunctionality":function()
			{
				alert("This garment should be converted before fixing.");
			}
		},

		"FD_622W":
		{
			"collarCalloutData":
			{
				"left": 564.907686083985,
				"top": -782.1025390625,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[1].groupItems[4];
					}
					catch(e)
					{
						$.writeln("did not move the existing collar callout");
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 487.785644381715,
					"top": -784.8837890625
				}
			},
			"placementGuides":
			{
				"Right Sleeve Back":
				{
					"left": 590.081415162018,
					"top": -175.897259622544,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 68
				},
				"Left Sleeve Back":
				{
					"left": 424.020035060834,
					"top": -175.897259622544,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -68
				},
				"Left Sleeve Front":
				{
					"left": 324.798071334311,
					"top": -84.409353017807,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 68
				},
				"Right Sleeve Front":
				{
					"left": 158.736691233127,
					"top": -84.409353017807,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -68
				},
				"Locker Tag":
				{
					"left": 509.325509211032,
					"top": -186.458815652528,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS":
				{
					"left": 495.82550921103,
					"top": -204.586601457783,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number":
				{
					"left": 488.625509211033,
					"top": -204.586601725,
					"width": 57.5999999999985,
					"height": 57.5999999999949,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name":
				{
					"left": 488.625509211033,
					"top": -186.458812371225,
					"width": 57.5999999999985,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS":
				{
					"left": 237.815542509023,
					"top": -138.636049185734,
					"width": 28.7999999999993,
					"height": 28.8000000000029,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number":
				{
					"left": 230.615542509022,
					"top": -138.636049185734,
					"width": 43.2000000000007,
					"height": 43.2000000000025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo":
				{
					"left": 216.215542509022,
					"top": -116.577316736544,
					"width": 72,
					"height": 14.4408259892025,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				// "Front Upper Left":
				// {
				// 	"left": 276.644223389678,
				// 	"top": -95.5615853515956,
				// 	"width": 14.4146858050372,
				// 	"height": 14.4146858050353,
				// 	"fill": false,
				// 	"stroke": false,
				// 	"strokeWidth": false,
				// 	"guides": true,
				// 	"rename": true,
				// 	"shape":"circle"
				// }
			},
			"additionalFunctionality": function()
			{
				//delete the existing "no artwork above this line" guides
				try
				{
					for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
					{
						var thisItem = guidesLay.groupItems[0].pageItems[x];
						if(thisItem.name.indexOf("bove")>-1)
						{
							thisItem.remove();
						}
					}
				}
				catch(e)
				{
					//oh well
				}
			}                                                        
		},

		"FD_622Y":
		{
			"collarCalloutData":
			{
				"left": 564.907686083985,
				"top": -782.1025390625,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[1].groupItems[4];
					}
					catch(e)
					{
						$.writeln("did not move the existing collar callout");
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 487.785644381715,
					"top": -784.8837890625
				}
			},
			"placementGuides":
			{
				"Right Sleeve Back": {
					"left": 595.142058965175,
					"top": -175.496875130653,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 70
				},
				"Left Sleeve Back": {
					"left": 428.532683220117,
					"top": -175.496875130653,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -70
				},
				"Left Sleeve Front": {
					"left": 329.508553620784,
					"top": -74.5056005949973,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 70
				},
				"Right Sleeve Front": {
					"left": 162.899177875726,
					"top": -74.5056005949973,
					"width": 21.6000000000004,
					"height": 21.6000000000004,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -70       
				},
				"Front Number NFHS": {
					"left": 242.654355939512,
					"top": -122.769390950672,
					"width": 28.7999999999993,
					"height": 28.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number": {
					"left": 235.454355939512,
					"top": -122.769391236772,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo": {
					"left": 219.254355939512,
					"top": -102.203020190424,
					"width": 75.6000000000004,
					"height": 12.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS": {
					"left": 501.03669062313,
					"top": -210.12809927227,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number": {
					"left": 493.836690623131,
					"top": -210.12809953949,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name": {
					"left": 499.236690623131,
					"top": -191.578099444088,
					"width": 46.7999999999993,
					"height": 10.8000000000011,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Locker Tag":
				{
					"left": 514.53669062313,
					"top": -191.578095668257,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				//delete the existing "no artwork above this line" guides
				try
				{
					for(var x = guidesLay.pageItems.length-1;x >-1; x--)
					{
						var thisItem = guidesLay.pageItems[x];
						if(thisItem.name.indexOf("bove")>-1)
						{
							thisItem.remove();
						}
					}
				}
				catch(e)
				{
					//oh well
				}
			}  
		},

		"FD_622":
		{
			"collarCalloutData":
			{
				"left": 554.778292414157,
				"top": -782.1025390625,
				"size": 20,
				"textColor": "Info B",
				"tint": 30,
				"existingCallout" : function()
				{
					try
					{
						return bkgd.groupItems[0].groupItems[7];
					}
					catch(e)
					{
						$.writeln("did not move the existing collar callout");
						return null;
					}
				},
				"moveExistingCallout": 
				{
					"left": 482.278292414157,
					"top": -784.8837890625
				}
			},
			"placementGuides":
			{
				"Right Sleeve Back":
				{
					"left": 578.285158189698,
					"top": -191.780698607814,
					"width": 28.7999999999993,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -15
				},
				"Left Sleeve Back":
				{
					"left": 377.993074449463,
					"top": -191.780698607814,
					"width": 28.7999999999993,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 15
				},
				"Left Sleeve Front":
				{
					"left": 351.107784901701,
					"top": -86.2270824493344,
					"width": 28.8000000000002,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": -15
				},
				"Right Sleeve Front":
				{
					"left": 150.815695331834,
					"top": -86.2270824493344,
					"width": 28.8000000000002,
					"height": 28.8000000000002,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true,
					"rotate": 15
				},
				"Locker Tag":
				{
					"left": 484.439144131709,
					"top": -214.223089168681,
					"width": 16.2000000000007,
					"height": 16.1999999999998,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number NFHS":
				{
					"left": 250.799291702206,
					"top": -143.884732585123,
					"width": 28.7999999999975,
					"height": 28.7999999999993,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Number":
				{
					"left": 243.599291702203,
					"top": -143.884732871225,
					"width": 43.2000000000025,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Front Logo":
				{
					"left": 221.999291702205,
					"top": -121.81659280254,
					"width": 86.3999999999996,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number NFHS":
				{
					"left": 470.939144131709,
					"top": -235.798089643082,
					"width": 43.2000000000007,
					"height": 43.2000000000007,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Back Number":
				{
					"left": 463.739144131712,
					"top": -235.798089910293,
					"width": 57.5999999999985,
					"height": 57.5999999999985,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				},
				"Player Name":
				{
					"left": 460.13914413171,
					"top": -214.223089550153,
					"width": 64.7999999999993,
					"height": 14.3999999999996,
					"fill": false,
					"stroke": false,
					"strokeWidth": false,
					"guides": true,
					"rename": true
				}
			},
			"additionalFunctionality": function()
			{
				//delete the existing "no artwork above this line" guides
				try
				{
					for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
					{
						var thisItem = guidesLay.groupItems[0].pageItems[x];
						if(thisItem.name.indexOf("bove")>-1)
						{
							thisItem.remove();
						}
					}
				}
				catch(e)
				{
					//oh well
				}
			} 
		},

	//football
	"FD_250Y":
	{
		"additionalFunctionality":function()
		{
			//create a placement guidelines layer in the info layer
			try
			{
				infoLay.layers["Placement Guides"].remove();
			}
			catch(e)
			{
				//no existing placement guides layer.
			}

			var placeGuideLay = infoLay.layers.add();
			placeGuideLay.name = "Placement Guides";


			//move the guides from the guides layer
			//to the placement guides layer
			for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
			{
				var thisItem = guidesLay.groupItems[0].pageItems[x];
				if(thisItem.name.indexOf("YXL")>-1)
				{
					thisItem.name = thisItem.name.replace("YXL ","");
					thisItem.moveToBeginning(placeGuideLay);
				}
			}

			//take the remaining items on the guides layer and
			//set guides to false. give them an "EDGE" stroke
			for(var x = guidesLay.groupItems[0].pageItems.length-1;x >-1; x--)
			{
				var thisItem = guidesLay.groupItems[0].pageItems[x];
				if(thisItem.guides)
				{
					thisItem.guides = false;
					thisItem.filled = false;
					thisItem.stroked = true;
					thisItem.strokeColor = swatches["EDGE"].color;
					thisItem.strokeWidth = 1;
				}
			}

			//fix the collar/color callouts
			mockLay.pageItems[0].remove();
			mockLay.pageItems[0].remove();
			var colorCallout = infoLay.textFrames.add();
			colorCallout.contents = "COLOR";
			colorCallout.name = "Collar Color";
			colorCallout.left = 586.716796875;
			colorCallout.top = -759.4130859375;
			colorCallout.filled = true;
			colorCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			colorCallout.textRange.characterAttributes.fillColor.tint = 30;
			var collarCallout = bkgd.textFrames.add();
			collarCallout.contents = "COLLAR";
			collarCallout.name = "COLLAR";
			collarCallout.left = 583.6787109375;
			collarCallout.top = -789.4130859375;
			collarCallout.filled = true;
			collarCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			collarCallout.textRange.characterAttributes.fillColor.tint = 30;
			collarCallout.createOutline();

		}
	},

	"FD_250":
	{
		"placementGuides":
		{
			"Front Logo":
			{
				"left": 99.8670365614316,
				"top": -64.763041213384,
				"width": 71.9881181401897,
				"height": 14.3919753834225,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Back Number":
			{
				"left": 482.783422851562,
				"top": -65.2326306125096,
				"width": 79.2000000000007,
				"height": 79.1999999999998,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Front Number":
			{
				"left": 103.479228197259,
				"top": -86.3883785009384,
				"width": 64.8000000000011,
				"height": 64.8000000000002,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Player Name":
			{
				"left": 482.783422851562,
				"top": -31.9210942313985,
				"width": 79.2000000000007,
				"height": 18,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Player Name 2":
			{
				"left": 96.2792075238922,
				"top": -330.123001389296,
				"width": 79.2000000000007,
				"height": 18,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Right Cowl":
			{
				"left": 55.0103084680368,
				"top": -362.02847781848,
				"width": 25.1999999999998,
				"height": 25.2000000000007,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Right Sleeve":
			{
				"left": 314.894332889638,
				"top": -140.723694474211,
				"width": 25.1999999999971,
				"height": 25.2000000000016,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Left Sleeve":
			{
				"left": 314.589933877238,
				"top": -224.928221613874,
				"width": 25.1999999999989,
				"height": 25.2000000000016,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Left Cowl":
			{
				"left": 191.548119747334,
				"top": -362.02847781848,
				"width": 25.1999999999989,
				"height": 25.2000000000007,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			}
		},
		"additionalFunctionality": function()
		{
			for(var x = guidesLay.pageItems.length-1;x >-1; x--)
			{
				var thisItem = guidesLay.pageItems[x];
				if(thisItem.name.indexOf("Display")== -1)
				{
					thisItem.remove();
				}
			}

			//fix the collar/color callouts
			mockLay.pageItems[0].remove();
			mockLay.pageItems[0].remove();
			var colorCallout = infoLay.textFrames.add();
			colorCallout.contents = "COLOR";
			colorCallout.name = "Collar Color";
			colorCallout.left = 586.716796875;
			colorCallout.top = -759.4130859375;
			colorCallout.filled = true;
			colorCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			colorCallout.textRange.characterAttributes.fillColor.tint = 30;
			var collarCallout = bkgd.textFrames.add();
			collarCallout.contents = "COLLAR";
			collarCallout.name = "COLLAR";
			collarCallout.left = 583.6787109375;
			collarCallout.top = -789.4130859375;
			collarCallout.filled = true;
			collarCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			collarCallout.textRange.characterAttributes.fillColor.tint = 30;
			collarCallout.createOutline();

		}
	},

	"FD_5411Y":
	{
		"additionalFunctionality":function()
		{
			var srcGroup = guidesLay.groupItems["Art Guidelines"];
			var destGroup = infoLay.layers.add();
			destGroup.name = "Placement Guides";

			for(var x = srcGroup.pageItems.length-1;x >-1; x--)
			{
				var thisItem = srcGroup.pageItems[x];
				thisItem.name = thisItem.name.replace("YXL ","");
				thisItem.moveToBeginning(destGroup);
			}

			//fix the collar/color callouts
			mockLay.pageItems[0].remove();
			mockLay.pageItems[0].remove();
			var colorCallout = infoLay.textFrames.add();
			colorCallout.contents = "COLOR";
			colorCallout.name = "Collar Color";
			colorCallout.left = 586.716796875;
			colorCallout.top = -759.4130859375;
			colorCallout.filled = true;
			colorCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			colorCallout.textRange.characterAttributes.fillColor.tint = 30;
			var collarCallout = bkgd.textFrames.add();
			collarCallout.contents = "COLLAR";
			collarCallout.name = "COLLAR";
			collarCallout.left = 583.6787109375;
			collarCallout.top = -789.4130859375;
			collarCallout.filled = true;
			collarCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			collarCallout.textRange.characterAttributes.fillColor.tint = 30;
			collarCallout.createOutline();

		}
	},

	"FD_5411":
	{
		"placementGuides":
		{
			"Back Number":	{
				"left": 482.783422851562,
				"top": -65.2326306125096,
				"width": 79.2000000000007,
				"height": 79.1999999999998,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Front Number":	{
				"left": 103.479228197259,
				"top": -86.3883785009384,
				"width": 64.8000000000011,
				"height": 64.8000000000002,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Front Logo":	{
				"left": 99.8792281972601,
				"top": -64.7883787155151,
				"width": 71.9999999999982,
				"height": 14.3999999999996,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Player Name":	{
				"left": 482.783422851562,
				"top": -31.9210942313985,
				"width": 79.2000000000007,
				"height": 18,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Player Name 2":	{
				"left": 96.2792075238922,
				"top": -330.123001389296,
				"width": 79.2000000000007,
				"height": 18,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Right Cowl":	{
				"left": 55.0103084680368,
				"top": -362.02847781848,
				"width": 25.1999999999998,
				"height": 25.2000000000007,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Right Sleeve":	{
				"left": 314.894332889638,
				"top": -140.723694474211,
				"width": 25.1999999999971,
				"height": 25.2000000000016,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Left Sleeve":	{
				"left": 314.589933877238,
				"top": -224.928221613874,
				"width": 25.1999999999989,
				"height": 25.2000000000016,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			},
			"Left Cowl":	{
				"left": 191.548119747334,
				"top": -362.02847781848,
				"width": 25.1999999999989,
				"height": 25.2000000000007,
				"fill": false,
				"stroke": false,
				"strokeWidth": false,
				"guides": true,
				"rename": true
			}
		},

		"additionalFunctionality":function()
		{
			//fix the collar/color callouts
			mockLay.pageItems[0].remove();
			mockLay.pageItems[0].remove();
			var colorCallout = infoLay.textFrames.add();
			colorCallout.contents = "COLOR";
			colorCallout.name = "Collar Color";
			colorCallout.left = 586.716796875;
			colorCallout.top = -759.4130859375;
			colorCallout.filled = true;
			colorCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			colorCallout.textRange.characterAttributes.fillColor.tint = 30;
			var collarCallout = bkgd.textFrames.add();
			collarCallout.contents = "COLLAR";
			collarCallout.name = "COLLAR";
			collarCallout.left = 583.6787109375;
			collarCallout.top = -789.4130859375;
			collarCallout.filled = true;
			collarCallout.textRange.characterAttributes.fillColor = swatches["Info B"].color;
			collarCallout.textRange.characterAttributes.fillColor.tint = 30;
			collarCallout.createOutline();

			for(var x = guidesLay.pageItems.length-1;x >-1; x--)
			{
				var thisItem = guidesLay.pageItems[x];
				if(thisItem.name.indexOf("Display")== -1)
				{
					thisItem.remove();
				}
			}
		}
	}
}