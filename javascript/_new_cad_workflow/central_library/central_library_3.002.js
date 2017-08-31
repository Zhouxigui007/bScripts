/*

Library and Data Storage for Add_Artwork_5.0

Author: William Dowling
Build Date: 06 June, 2016

Version History:
	Version 1
		Version 1.001
			06 June, 2016
			Original Build
			Setup Library object and necessary key value pairs
			Began work on front logo function.
			Currently working for regular full chest logos.
			Need to adjust left/right chest logo functions

		Version 1.002
			07 June, 2016
			Fixed issue with variable names in left/right chest logo functions
			Currently working for all front logos on slowpitch shirts

		Version 1.003
			07 June, 2016
			Updated script UI appearance and text to be more descriptive.
			Added FD_BASE_FB_SS to library object.
		
		Version 1.004
			07 June, 2016
			Fixed bug in clip mask function that was causing the clip path to be too large.
			Found bug in left chest with full button garment. see ATTENTION below.

		Version 1.005
			08 June, 2016
			Fixed Bug in left/right chest function. typo in 'sideString' variable.
			Added function to automatically find position of front number (left right or center)
				Needs additional logic to work for full button jerseys
			Still not working to correctly determine front number position. always says "left".

		Version 1.006
			09 June, 2016
			Found and fixed bug causing front number to always be listed as "left".

		Version 1.007
			14 June, 2016
			Reworked front number function to accomodate a scaling logo.
			Currently doesn't work because front logo sizes aren't defined at runtime without app.redraw();
				Going to prototype gar object to include the smallest and next smallest logo sizes so i can get vertical movement.

		Version 1.008
			14 June, 2016
			Total bust trying to correctly position front number.
			Reverting back to 1.006 to proceed.

		Version 1.009
			16 June, 2016
			Create new object to hold front logo sizes and the bottom coordinate of each size front logo.
				Then i can use the bottom of the logo to place the top of the number.
			Currently working for consistent vertical positioning.
			Still need to adjust left/right movement

		Version 1.010
			16 June, 2016
			Fixed Front number positioning if front number is on wearer's left side. Doesn't work for the right side yet... ??
			Found bug that caused front number to always be placed as though they were left front numbers.
			Script currently works to add front logos and front numbers (in any position) to FD_SLOW and FD_BASE_FB_SS shirts.
			Still needs logic built for no logo contingency.

		Version 1.011
			24 June, 2016
			Added logic for no logo. Currently works well on mens slowpitch and base full button
			Built the following add art functions:
				Player Name
				Player Number
				Left Sleeve
				Right Sleeve
				Locker Tag
				Sponsor Logo
				Left Hood
				Right Hood
				Front Pocket
			All above are tested and working.
			Began writing logic for additional artwork.
				Attempting to automatically determine the correct dest for each piece of additional art.

		Version 1.012
			27 June, 2016
			Added logic to automatically determine correct destination piece.
			Works if logo is:
				completely contained within the shirt piece
				interesects 1 side of shrit piece
				intersects 2 adjacent sides of shirt piece
			****
			DOES NOT WORK if
			***
				intersects with 2 opposite sides of shirt piece
				logo completely encases shirt piece
			Fixed scaling and positioning. Positioning is not yet perfect, but it will do for now.
			
		Version 1.013
			05 July, 2016
			Added logic to account for 3+ sides of intersection for additional artwork
			Relative placement of additional artwork after scaling is still imperfect.
				Putting a pin in this for now. Logic needs to be much more robust. It'll do for now, the way it is.

		Version 1.014
			05 July, 2016
			Begin adding to library object for new styles
				womens slowpitch
			fixed bugs regarding scaling hoodie logos.
			Added additional logic to handle regular/raglan artwork placement
			Added youth slowpitch object.

		Version 1.015
			06 July, 2016
			Updated football 5411 placement coordinates
			Added logic to determine whether player name goes on back piece or cowl piece (based on whether the garment is football or not).
			Currently working for all garments in library object.
			Just need to keep adding garments and coordinates.

		Version 1.016
			07 July, 2016
			Added football style 250 to library.
			Added fast_fb_ss to library.
			Added fast_fb_sl to library.
			Added fdwh to library
			added base_fb_sl to library

		Version 1.017
			08 July, 2016
			Added youth football 250 to library.
			Fixed bug in youth 250 object. Sizes and Mockup Size were listed as adult sizes
			Added youth football 5411 to library

		Version 1.018
			14 July, 2016
			Added FD_BASK_RV to library
			Added FD_BASKW_RV to library

		Version 1.019
			19 July, 2016
			Added FD_BASE_2B_SS to library
			Added FD_BASE_2B_Y_SS to library
			Added FD_FAST_2B_SS to library
			Added FD_FAST_RB to library
			Added FD_FAST_SL to library
			Added FDYH to library

		Version 1.020
			20 July, 2016
			Added FD_BASKY_RV to library

		Version 1.021
			26 July, 2016
			Added logic to reposition front logo to logoTop so that logos follow 1/4" rule
			Added FD_SOC_SS to library
				Styles:
					858, 3061, 3062, 3064
					858Y, 3061Y, 3062Y, 3064Y 

		Version 1.022
			27 July, 2016
			Added FD_SOC_LSK to library
				Adult and youth

		Version 1.023
			28 July, 2016
			Added FD_SOC_SH to library
				Adult and youth
			Added FD_VOL_CS // FD_284 to library
			Updated FD_SOC_LSK to acccomodate duplicate of elbow patch/liner

		Version 1.024
			03 Aug, 2016
			Fixed issue with front number position finder.
				increased buffer to accomodate a larger front number, for example, football jerseys that have much larger front numbers
				and potentially "weird" baseline shifts.
			Fixed bug in additional artwork.
				If there was more than 1 object on the additional artwork layer, the loop exited the function before the loop could run
				the requisite number of times. 

		Version 1.025
			08 Aug, 2016
			Added functionality for no scale additional art contingency.
				instructions: add "no scale" (lowercase with a space) to the Additional Artwork layer name.

		Version 1.026
			25 Aug, 2016
			Added missing XXS placement information for women's hoodies per Mark F's bug report.

		Version 1.027
			29 Aug, 2016
			Added FD_285 (long sleeve volleyball) to library
			Added FD_210_211 (mens basketball uniform) to library

		Version 1.028
			30 Aug, 2016
			Added FD_210W_211W (women's basketball uniform) to library

		Version 1.029
			06 Sept, 2016
			Added FD_210Y_211W (youth basketball uniform) to library.

		Version 1.030
			08 Sept, 2016
			Fixed bug in full button portion of front logo function.
				Left side front logo was not being repositioned, but the right side logo was. stupid.

		Version 1.031
			08 Sept, 2016
			Added FD_BASE_FB_Y to library.

		Version 1.032
			21 Sept, 2016
			Updated volleyball uniforms.
				set scaleFrontLogo : false

		Version 1.033
			23 Sept, 2016
			Added FD_BASE_FB_Y_SL to library

		Version 1.034
			28 Sept, 2016
			Added 'binding pieces' to FD_250 
			
		Version 1.035
			28 Sept, 2016
			Added 'binding pieces' to FD_5411

		Version 1.036
			04 Oct, 2016
			Added 'binding pieces' and new sizes to FD_5411Y and 250Y

		Version 1.037
			05 Oct, 2016
			Added FD_7025 to library
			Added function to place artwork on outside collar pieces for FD_7025

		Version 1.038
			06 Oct, 2016
			Added FD_597 to library

		Version 1.039
			11 Oct, 2016
			Added no-scale option to additional artwork function.

		Version 1.040
			12 Oct, 2016
			Fixing bug in full button front number placement

	Version 2

		Version 2.001
			18 October, 2016
			Added centralized library file and removed library object from this file.
				Keeping coordinates separate from add art methods.
			Adding detailed error logging.

		Version 2.002
			19 October, 2016
			Continuing to add error logging messages.
			Detailed logging nearly complete for addArt["Front Logo"].

	Version 3

		Version 3.001
			28 October, 2016
			Disregard all above. Separated the library object from the addArt object. This file is now strictly for objects relating to the placement of artwork
				during add artwork script.

			All template creation information can be found in "build_template_library.js".
			All add artwork functions can be found in library.js.

		Version 3.002
			28 October, 2016
			Set scaleFrontLogo to false for all soccer uniforms.
			
*/

var prepressInfo = 
{
	/////////////////////
	//Slowpitch Jerseys//
	/////////////////////
	"FD_SLOW_SS" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" : 
		{
			"Regular": 
			{
				"XS" : {"XS Collar" : [-946.671,622.35],"XS Left Sleeve" : [-194.351,715.67],"XS Right Sleeve" : [-194.351,594.609],"XS Back" : [-448.011,721.26],"XS Front" : [-718.381,721.659]},
				"S" : {"S Collar" : [-948.921,362.97],"S Left Sleeve" : [-197.541,458.19],"S Right Sleeve" : [-197.541,335.319],"S Back" : [-453.541,465.449],"S Front" : [-723.901,465.84]},
				"M" : {"M Collar" : [-951.171,96.539],"M Left Sleeve" : [-200.731,193.359],"M Right Sleeve" : [-200.731,68.979],"M Back" : [-458.921,202.55],"M Front" : [-729.291,202.899]},
				"L" : {"L Collar" : [-953.421,-177.48],"L Left Sleeve" : [-202.961,-78.461],"L Right Sleeve" : [-202.961,-205.28],"L Back" : [-464.311,-67.771],"L Front" : [-734.681,-67.421]},
				"XL" : {"XL Collar" : [-955.221,-458.711],"XL Left Sleeve" : [-205.691,-357.86],"XL Right Sleeve" : [-205.691,-486.771],"XL Back" : [-469.771,-345.471],"XL Front" : [-740.061,-345.141]},
				"2XL" : {"2XL Collar" : [-957.921,-747.111],"2XL Left Sleeve" : [-209.061,-644.611],"2XL Right Sleeve" : [-209.061,-775.031],"2XL Back" : [-475.081,-630.181],"2XL Front" : [-745.451,-629.88]},
				"3XL" : {"3XL Collar" : [-960.171,-1042.73],"3XL Left Sleeve" : [-211.781,-938.281],"3XL Right Sleeve" : [-211.781,-1070.65],"3XL Back" : [-480.461,-922.261],"3XL Front" : [-750.841,-921.951]},
				"4XL" : {"4XL Collar" : [-962.421,-1345.42],"4XL Left Sleeve" : [-214.901,-1239.521],"4XL Right Sleeve" : [-214.901,-1373.14],"4XL Back" : [-485.991,-1221.381],"4XL Front" : [-756.361,-1221.101]},
				"5XL" : {"5XL Collar" : [-964.671,-1654.82],"5XL Left Sleeve" : [-218.041,-1546.841],"5XL Right Sleeve" : [-218.041,-1682.9],"5XL Back" : [-491.381,-1527.101],"5XL Front" : [-761.751,-1526.81]}
			},
			"Raglan" : 
			{
				"XS" : {"XS Collar" : [-1133.121,625.479],"XS Left Sleeve" : [-380.801,679.109],"XS Right Sleeve" : [-191.101,679.109],"XS Back" : [-634.601,721.26],"XS Front" : [-904.971,720.01]},
				"S" : {"S Collar" : [-1135.371,366.119],"S Left Sleeve" : [-383.991,423.369],"S Right Sleeve" : [-194.291,423.369],"S Back" : [-639.841,465.449],"S Front" : [-910.211,463.94]},
				"M" : {"M Collar" : [-1137.621,101.68],"M Left Sleeve" : [-387.181,162.399],"M Right Sleeve" : [-197.481,162.399],"M Back" : [-645.371,204.55],"M Front" : [-915.741,202.899]},
				"L" : {"L Collar" : [-1139.871,-172.141],"L Left Sleeve" : [-389.411,-108.29],"L Right Sleeve" : [-199.711,-108.29],"L Back" : [-650.761,-65.58],"L Front" : [-921.131,-67.421]},
				"XL" : {"XL Collar" : [-1141.671,-453.051],"XL Left Sleeve" : [-392.141,-385.73],"XL Right Sleeve" : [-202.441,-385.73],"XL Back" : [-656.221,-342.95],"XL Front" : [-926.511,-345.141]},
				"2XL" : {"2XL Collar" : [-1144.371,-740.871],"2XL Left Sleeve" : [-395.511,-670.21],"2XL Right Sleeve" : [-205.811,-670.21],"2XL Back" : [-661.531,-627.371],"2XL Front" : [-931.901,-629.88]},
				"3XL" : {"3XL Collar" : [-1146.621,-1036.671],"3XL Left Sleeve" : [-398.231,-962.451],"3XL Right Sleeve" : [-208.531,-962.451],"3XL Back" : [-666.911,-919.341],"3XL Front" : [-937.291,-921.951]},
				"4XL" : {"4XL Collar" : [-1148.871,-1339.05],"4XL Left Sleeve" : [-401.351,-1261.091],"4XL Right Sleeve" : [-211.651,-1261.091],"4XL Back" : [-672.441,-1218.181],"4XL Front" : [-942.811,-1221.101]},
				"5XL" : {"5XL Collar" : [-1151.121,-1648.31],"5XL Left Sleeve" : [-404.491,-1567.181],"5XL Right Sleeve" : [-214.791,-1567.181],"5XL Back" : [-677.831,-1523.761],"5XL Front" : [-948.201,-1526.81]}
			}
		}
	},
	"FD_SLOWW_SS" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"Regular" : 
			{
				"XXS" : {"XXS Collar" : [-837.831,547],"XXS Left Sleeve" : [-184.831,519],"XXS Right Sleeve" : [-184.831,628],"XXS Back" : [-411.831,643],"XXS Front" : [-633.831,643]},
				"XS" : {"XS Collar" : [-839.831,260],"XS Left Sleeve" : [-187.831,231],"XS Right Sleeve" : [-187.831,339],"XS Back" : [-415.831,357],"XS Front" : [-637.831,357]},
				"S" : {"S Collar" : [-841.831,-13],"S Left Sleeve" : [-190.831,-42],"S Right Sleeve" : [-190.831,65],"S Back" : [-418.831,87],"S Front" : [-641.831,88]},
				"M" : {"M Collar" : [-843.831,-289],"M Left Sleeve" : [-193.831,-317],"M Right Sleeve" : [-193.831,-209],"M Back" : [-422.831,-185],"M Front" : [-644.831,-184]},
				"L" : {"L Collar" : [-845.831,-596],"L Left Sleeve" : [-195.831,-624],"L Right Sleeve" : [-195.831,-515],"L Back" : [-425.831,-488],"L Front" : [-648.831,-487]},
				"XL" : {"XL Collar" : [-847.831,-891],"XL Left Sleeve" : [-197.831,-919],"XL Right Sleeve" : [-197.831,-809],"XL Back" : [-429.831,-779],"XL Front" : [-651.831,-779]},
				"2XL" : {"2XL Collar" : [-849.831,-1184],"2XL Left Sleeve" : [-199.831,-1212],"2XL Right Sleeve" : [-199.831,-1099],"2XL Back" : [-433.831,-1070],"2XL Front" : [-655.831,-1070]},
				"3XL" : {"3XL Collar" : [-851.831,-1499],"3XL Left Sleeve" : [-202.831,-1527],"3XL Right Sleeve" : [-202.831,-1414],"3XL Back" : [-436.831,-1384],"3XL Front" : [-659.831,-1383]}
			},
			"Raglan" : 
			{
				"XXS" : {"XXS Collar" : [-904.861,482],"XXS Left Sleeve" : [-164.321,528],"XXS Right Sleeve" : [-323.731,528],"XXS Back" : [-511.791,574],"XXS Front" : [-715.221,573]},
				"XS" : {"XS Collar" : [-906.861,242],"XS Left Sleeve" : [-166.221,288],"XS Right Sleeve" : [-325.631,288],"XS Back" : [-515.791,336],"XS Front" : [-719.221,334]},
				"S" : {"S Collar" : [-908.861,-5],"S Left Sleeve" : [-168.071,42],"S Right Sleeve" : [-327.471,42],"S Back" : [-519.791,92],"S Front" : [-723.221,91]},
				"M" : {"M Collar" : [-910.861,-257],"M Left Sleeve" : [-170.171,-209],"M Right Sleeve" : [-329.581,-209],"M Back" : [-522.791,-157],"M Front" : [-726.221,-158]},
				"L" : {"L Collar" : [-912.861,-517],"L Left Sleeve" : [-172.051,-467],"L Right Sleeve" : [-331.451,-467],"L Back" : [-526.791,-413],"L Front" : [-730.221,-415]},
				"XL" : {"XL Collar" : [-914.861,-784],"XL Left Sleeve" : [-173.571,-733],"XL Right Sleeve" : [-332.981,-733],"XL Back" : [-530.791,-676],"XL Front" : [-734.221,-678]},
				"2XL" : {"2XL Collar" : [-916.861,-1055],"2XL Left Sleeve" : [-176.281,-1002],"2XL Right Sleeve" : [-335.681,-1002],"2XL Back" : [-533.791,-946],"2XL Front" : [-737.221,-948]},
				"3XL" : {"3XL Collar" : [-918.861,-1330],"3XL Left Sleeve" : [-178.541,-1276],"3XL Right Sleeve" : [-337.951,-1276],"3XL Back" : [-537.791,-1219],"3XL Front" : [-741.221,-1221]}
			}
		}
	},
	"FD_SLOWY_SS" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YXS", "YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" :
		{
			"Regular" : 
			{
				"YXS" : {"YXS Collar" : [-709.481,-16.91],"YXS Left Sleeve" : [-165.841,39.669],"YXS Right Sleeve" : [-165.841,-50.771],"YXS Back" : [-340.971,56.069],"YXS Front" : [-518.971,56.069]},
				"YS" : {"YS Collar" : [-713.481,-225.851],"YS Left Sleeve" : [-169.951,-163.671],"YS Right Sleeve" : [-169.951,-257.78],"YS Back" : [-345.971,-147.931],"YS Front" : [-523.971,-147.931]},
				"YM" : {"YM Collar" : [-716.481,-444.16],"YM Left Sleeve" : [-173.071,-381.13],"YM Right Sleeve" : [-173.071,-478.641],"YM Back" : [-349.971,-361.931],"YM Front" : [-527.971,-360.931]},
				"YL" : {"YL Collar" : [-719.481,-673.671],"YL Left Sleeve" : [-176.611,-604.32],"YL Right Sleeve" : [-176.611,-707.5],"YL Back" : [-354.971,-585.931],"YL Front" : [-533.971,-584.931]},
				"YXL" : {"YXL Collar" : [-723.481,-914.931],"YXL Left Sleeve" : [-180.721,-838.4],"YXL Right Sleeve" : [-180.721,-946.97],"YXL Back" : [-358.971,-820.931],"YXL Front" : [-536.971,-820.931]}
			},
			"Raglan" : 
			{
				"YXS" : {"YXS Collar" : [-803.121,-39.211],"YXS Left Sleeve" : [-282.611,-3.66],"YXS Right Sleeve" : [-135.711,-3.66],"YXS Back" : [-435.551,29.93],"YXS Front" : [-619.551,28.659]},
				"YS" : {"YS Collar" : [-807.121,-238.73],"YS Left Sleeve" : [-283.611,-200.12],"YS Right Sleeve" : [-139.711,-200.12],"YS Back" : [-439.551,-164.181],"YS Front" : [-621.551,-165.341]},
				"YM" : {"YM Collar" : [-809.121,-448],"YM Left Sleeve" : [-284.611,-406.091],"YM Right Sleeve" : [-141.711,-406.091],"YM Back" : [-444.551,-368.091],"YM Front" : [-626.551,-369.341]},
				"YL" : {"YL Collar" : [-813.121,-668.66],"YL Left Sleeve" : [-285.611,-622.4],"YL Right Sleeve" : [-145.711,-622.4],"YL Back" : [-448.551,-583.371],"YL Front" : [-631.551,-584.341]},
				"YXL" : {"YXL Collar" : [-817.121,-900.07],"YXL Left Sleeve" : [-286.611,-849.8],"YXL Right Sleeve" : [-149.711,-849.8],"YXL Back" : [-453.551,-809.25],"YXL Front" : [-628.551,-810.341]}
			}
		}
	},

	/////////////
	//Fastpitch//
	/////////////

	"FD_FAST_RB" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Front", "Back"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-689.031,398.19],"XXS Back" : [-230.651,481.18],"XXS Front" : [-439.001,479.779]},
			"XS" : {"XS Collar" : [-690.831,158.309],"XS Back" : [-234.141,246.689],"XS Front" : [-442.561,245.34]},
			"S" : {"S Collar" : [-692.631,-95.65],"S Back" : [-237.701,0.88],"S Front" : [-446.101,-0.641]},
			"M" : {"M Collar" : [-694.431,-359.711],"M Back" : [-241.261,-257.98],"M Front" : [-449.641,-259.671]},
			"L" : {"L Collar" : [-696.231,-628.75],"L Back" : [-244.931,-525.15],"L Front" : [-453.331,-526.691]},
			"XL" : {"XL Collar" : [-696.231,-898.05],"XL Back" : [-248.621,-792.791],"XL Front" : [-457.011,-794.341]},
			"2XL" : {"2XL Collar" : [-696.231,-1171.631],"2XL Back" : [-252.171,-1064.46],"2XL Front" : [-460.561,-1066.131]},
			"3XL" : {"3XL Collar" : [-696.231,-1448.111],"3XL Back" : [-255.711,-1339.25],"3XL Front" : [-464.301,-1340.75]}
		}
	},

	"FD_FAST_SL" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Front", "Back"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-689.031,398.19],"XXS Back" : [-230.651,481.18],"XXS Front" : [-439.001,479.779]},
			"XS" : {"XS Collar" : [-690.831,158.309],"XS Back" : [-234.141,246.689],"XS Front" : [-442.561,245.34]},
			"S" : {"S Collar" : [-692.631,-95.65],"S Back" : [-237.701,0.88],"S Front" : [-446.101,-0.641]},
			"M" : {"M Collar" : [-694.431,-359.711],"M Back" : [-241.261,-257.98],"M Front" : [-449.641,-259.671]},
			"L" : {"L Collar" : [-696.231,-628.75],"L Back" : [-244.931,-525.15],"L Front" : [-453.331,-526.691]},
			"XL" : {"XL Collar" : [-696.231,-898.05],"XL Back" : [-248.621,-792.791],"XL Front" : [-457.011,-794.341]},
			"2XL" : {"2XL Collar" : [-696.231,-1171.631],"2XL Back" : [-252.171,-1064.46],"2XL Front" : [-460.561,-1066.131]},
			"3XL" : {"3XL Collar" : [-696.231,-1448.111],"3XL Back" : [-255.711,-1339.25],"3XL Front" : [-464.301,-1340.75]}
		}
	},


	///////////////
	//Full Button//
	///////////////
	"FD_BASE_FB_SS" :
	{
		"mockupSize" : "XL",
		"fullButton" : true,
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],	
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"S" : {"S Right Front" : [-887.001,727],"S Left Sleeve" : [-248.001,703],"S Right Sleeve" : [-248.001,587],"S Back" : [-518.001,734],"S Left Front" : [-716.001,727],"S Left Placard" : [-1020.001,728],"S Right Placard" : [-1099.001,728],"S Collar" : [-1234.001,618]},
			"M" : {"M Right Front" : [-890.001,432],"M Left Sleeve" : [-250.001,409],"M Right Sleeve" : [-250.001,288],"M Back" : [-523.001,439],"M Left Front" : [-718.001,432],"M Left Placard" : [-1021.001,432],"M Right Placard" : [-1100.001,432],"M Collar" : [-1235.001,319]},
			"L" : {"L Right Front" : [-892.001,129],"L Left Sleeve" : [-254.001,105],"L Right Sleeve" : [-254.001,-18],"L Back" : [-528.001,136],"L Left Front" : [-721.001,129],"L Left Placard" : [-1021.001,129],"L Right Placard" : [-1100.001,129],"L Collar" : [-1235.001,13]},
			"XL" : {"XL Right Front" : [-895.001,-182],"XL Left Sleeve" : [-257.001,-204],"XL Right Sleeve" : [-257.001,-331],"XL Back" : [-533.001,-174],"XL Left Front" : [-724.001,-182],"XL Left Placard" : [-1021.001,-181],"XL Right Placard" : [-1100.001,-181],"XL Collar" : [-1236.001,-300]},
			"2XL" : {"2XL Right Front" : [-898.001,-499],"2XL Left Sleeve" : [-261.001,-522],"2XL Right Sleeve" : [-261.001,-652],"2XL Back" : [-538.001,-492],"2XL Left Front" : [-726.001,-499],"2XL Left Placard" : [-1021.001,-499],"2XL Right Placard" : [-1100.001,-499],"2XL Collar" : [-1236.001,-621]},
			"3XL" : {"3XL Right Front" : [-901.001,-824],"3XL Left Sleeve" : [-266.001,-853],"3XL Right Sleeve" : [-266.001,-980],"3XL Back" : [-543.001,-816],"3XL Left Front" : [-729.001,-824],"3XL Left Placard" : [-1022.001,-823],"3XL Right Placard" : [-1101.001,-823],"3XL Collar" : [-1237.001,-949]},
			"4XL" : {"4XL Right Front" : [-903.001,-1155],"4XL Left Sleeve" : [-271.001,-1188],"4XL Right Sleeve" : [-271.001,-1311],"4XL Back" : [-550.001,-1148],"4XL Left Front" : [-732.001,-1155],"4XL Left Placard" : [-1022.001,-1155],"4XL Right Placard" : [-1101.001,-1155],"4XL Collar" : [-1237.001,-1281]},
			"5XL" : {"5XL Right Front" : [-906.001,-1487],"5XL Left Sleeve" : [-277.001,-1523],"5XL Right Sleeve" : [-277.001,-1643],"5XL Back" : [-555.001,-1480],"5XL Left Front" : [-735.001,-1487],"5XL Left Placard" : [-1023.001,-1487],"5XL Right Placard" : [-1102.001,-1487],"5XL Collar" : [-1238.001,-1613]}
		}
	},

	"FD_230" :
	{
		"mockupSize" : "XL",
		"fullButton" : true,
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],	
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"S" : {"S Right Front" : [-887.001,727],"S Left Sleeve" : [-248.001,703],"S Right Sleeve" : [-248.001,587],"S Back" : [-518.001,734],"S Left Front" : [-716.001,727],"S Left Placard" : [-1020.001,728],"S Right Placard" : [-1099.001,728],"S Collar" : [-1234.001,618]},
			"M" : {"M Right Front" : [-890.001,432],"M Left Sleeve" : [-250.001,409],"M Right Sleeve" : [-250.001,288],"M Back" : [-523.001,439],"M Left Front" : [-718.001,432],"M Left Placard" : [-1021.001,432],"M Right Placard" : [-1100.001,432],"M Collar" : [-1235.001,319]},
			"L" : {"L Right Front" : [-892.001,129],"L Left Sleeve" : [-254.001,105],"L Right Sleeve" : [-254.001,-18],"L Back" : [-528.001,136],"L Left Front" : [-721.001,129],"L Left Placard" : [-1021.001,129],"L Right Placard" : [-1100.001,129],"L Collar" : [-1235.001,13]},
			"XL" : {"XL Right Front" : [-895.001,-182],"XL Left Sleeve" : [-257.001,-204],"XL Right Sleeve" : [-257.001,-331],"XL Back" : [-533.001,-174],"XL Left Front" : [-724.001,-182],"XL Left Placard" : [-1021.001,-181],"XL Right Placard" : [-1100.001,-181],"XL Collar" : [-1236.001,-300]},
			"2XL" : {"2XL Right Front" : [-898.001,-499],"2XL Left Sleeve" : [-261.001,-522],"2XL Right Sleeve" : [-261.001,-652],"2XL Back" : [-538.001,-492],"2XL Left Front" : [-726.001,-499],"2XL Left Placard" : [-1021.001,-499],"2XL Right Placard" : [-1100.001,-499],"2XL Collar" : [-1236.001,-621]},
			"3XL" : {"3XL Right Front" : [-901.001,-824],"3XL Left Sleeve" : [-266.001,-853],"3XL Right Sleeve" : [-266.001,-980],"3XL Back" : [-543.001,-816],"3XL Left Front" : [-729.001,-824],"3XL Left Placard" : [-1022.001,-823],"3XL Right Placard" : [-1101.001,-823],"3XL Collar" : [-1237.001,-949]},
			"4XL" : {"4XL Right Front" : [-903.001,-1155],"4XL Left Sleeve" : [-271.001,-1188],"4XL Right Sleeve" : [-271.001,-1311],"4XL Back" : [-550.001,-1148],"4XL Left Front" : [-732.001,-1155],"4XL Left Placard" : [-1022.001,-1155],"4XL Right Placard" : [-1101.001,-1155],"4XL Collar" : [-1237.001,-1281]},
			"5XL" : {"5XL Right Front" : [-906.001,-1487],"5XL Left Sleeve" : [-277.001,-1523],"5XL Right Sleeve" : [-277.001,-1643],"5XL Back" : [-555.001,-1480],"5XL Left Front" : [-735.001,-1487],"5XL Left Placard" : [-1023.001,-1487],"5XL Right Placard" : [-1102.001,-1487],"5XL Collar" : [-1238.001,-1613]}
		}
	},

	"FD_BASE_FB_SL" : 
	{
		"mockupSize" : "XL",
		"fullButton" : true,
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"S" : {"S Back" : [-360.061,814.71],"S Left Front" : [-512.071,807.85],"S Right Front" : [-708.311,807.85],"S Left Placard" : [-829.291,807.68],"S Right Placard" : [-924.071,807.68],"S Collar" : [-1112.951,697.409]},
			"M" : {"M Back" : [-363.061,519.71],"M Left Front" : [-514.071,512.84],"M Right Front" : [-710.311,512.84],"M Left Placard" : [-834.291,512.6],"M Right Placard" : [-926.071,512.6],"M Collar" : [-1113.951,399.72]},
			"L" : {"L Back" : [-365.061,216.71],"L Left Front" : [-518.071,209.72],"L Right Front" : [-714.311,209.72],"L Left Placard" : [-839.291,209.609],"L Right Placard" : [-929.071,209.609],"L Collar" : [-1113.951,93.159]},
			"XL" : {"XL Back" : [-368.061,-94.29],"XL Left Front" : [-521.071,-101.32],"XL Right Front" : [-717.311,-101.32],"XL Left Placard" : [-844.291,-101.381],"XL Right Placard" : [-932.071,-101.381],"XL Collar" : [-1113.951,-220.471]},
			"2XL" : {"2XL Back" : [-371.061,-411.29],"2XL Left Front" : [-525.071,-418.431],"2XL Right Front" : [-721.311,-418.431],"2XL Left Placard" : [-849.291,-418.601],"2XL Right Placard" : [-934.071,-418.601],"2XL Collar" : [-1113.951,-541.24]},
			"3XL" : {"3XL Back" : [-374.061,-736.291],"3XL Left Front" : [-530.071,-743.23],"3XL Right Front" : [-726.311,-743.23],"3XL Left Placard" : [-854.291,-743.48],"3XL Right Placard" : [-937.071,-743.48],"3XL Collar" : [-1114.951,-869.75]},
			"4XL" : {"4XL Back" : [-376.061,-1067.291],"4XL Left Front" : [-535.071,-1074.361],"4XL Right Front" : [-731.311,-1074.361],"4XL Left Placard" : [-861.291,-1074.591],"4XL Right Placard" : [-940.071,-1074.591],"4XL Collar" : [-1114.951,-1200.861]},
			"5XL" : {"5XL Back" : [-379.061,-1399.291],"5XL Left Front" : [-541.071,-1406.31],"5XL Right Front" : [-737.311,-1406.31],"5XL Left Placard" : [-866.291,-1406.74],"5XL Right Placard" : [-943.071,-1406.74],"5XL Collar" : [-1115.951,-1532.97]}
		}
	},

	"FD_233" : 
	{
		"mockupSize" : "XL",
		"fullButton" : true,
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"S" : {"S Back" : [-360.061,814.71],"S Left Front" : [-512.071,807.85],"S Right Front" : [-708.311,807.85],"S Left Placard" : [-829.291,807.68],"S Right Placard" : [-924.071,807.68],"S Collar" : [-1112.951,697.409]},
			"M" : {"M Back" : [-363.061,519.71],"M Left Front" : [-514.071,512.84],"M Right Front" : [-710.311,512.84],"M Left Placard" : [-834.291,512.6],"M Right Placard" : [-926.071,512.6],"M Collar" : [-1113.951,399.72]},
			"L" : {"L Back" : [-365.061,216.71],"L Left Front" : [-518.071,209.72],"L Right Front" : [-714.311,209.72],"L Left Placard" : [-839.291,209.609],"L Right Placard" : [-929.071,209.609],"L Collar" : [-1113.951,93.159]},
			"XL" : {"XL Back" : [-368.061,-94.29],"XL Left Front" : [-521.071,-101.32],"XL Right Front" : [-717.311,-101.32],"XL Left Placard" : [-844.291,-101.381],"XL Right Placard" : [-932.071,-101.381],"XL Collar" : [-1113.951,-220.471]},
			"2XL" : {"2XL Back" : [-371.061,-411.29],"2XL Left Front" : [-525.071,-418.431],"2XL Right Front" : [-721.311,-418.431],"2XL Left Placard" : [-849.291,-418.601],"2XL Right Placard" : [-934.071,-418.601],"2XL Collar" : [-1113.951,-541.24]},
			"3XL" : {"3XL Back" : [-374.061,-736.291],"3XL Left Front" : [-530.071,-743.23],"3XL Right Front" : [-726.311,-743.23],"3XL Left Placard" : [-854.291,-743.48],"3XL Right Placard" : [-937.071,-743.48],"3XL Collar" : [-1114.951,-869.75]},
			"4XL" : {"4XL Back" : [-376.061,-1067.291],"4XL Left Front" : [-535.071,-1074.361],"4XL Right Front" : [-731.311,-1074.361],"4XL Left Placard" : [-861.291,-1074.591],"4XL Right Placard" : [-940.071,-1074.591],"4XL Collar" : [-1114.951,-1200.861]},
			"5XL" : {"5XL Back" : [-379.061,-1399.291],"5XL Left Front" : [-541.071,-1406.31],"5XL Right Front" : [-737.311,-1406.31],"5XL Left Placard" : [-866.291,-1406.74],"5XL Right Placard" : [-943.071,-1406.74],"5XL Collar" : [-1115.951,-1532.97]}
		}
	},

	"FD_BASE_FB_Y_SS" : 
	{
		"mockupSize" : "YXL",
		"fullButton" : true,
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Right Front" : [-651.993,12.886],"YS Left Sleeve" : [-215.737,1.43],"YS Right Sleeve" : [-215.737,-99.009],"YS Back" : [-390.744,19.786],"YS Left Front" : [-532.478,12.893],"YS Left Placard" : [-730.808,12.856],"YS Right Placard" : [-796.773,12.856],"YS Collar" : [-894.332,-69.261]},
			"YM" : {"YM Right Front" : [-658.125,-246.713],"YM Left Sleeve" : [-222.645,-262.44],"YM Right Sleeve" : [-222.645,-363.718],"YM Back" : [-398.456,-239.824],"YM Left Front" : [-538.631,-246.726],"YM Left Placard" : [-731.306,-246.776],"YM Right Placard" : [-797.274,-246.776],"YM Collar" : [-895.285,-334.217]},
			"YL" : {"YL Right Front" : [-656.179,-506.507],"YL Left Sleeve" : [-220.644,-527.154],"YL Right Sleeve" : [-220.644,-628.237],"YL Back" : [-398.715,-499.559],"YL Left Front" : [-536.673,-506.531],"YL Left Placard" : [-729.309,-506.531],"YL Right Placard" : [-797.274,-506.531],"YL Collar" : [-898.199,-599.301]},
			"YXL" : {"YXL Right Front" : [-658.298,-778.799],"YXL Left Sleeve" : [-223.013,-800.946],"YXL Right Sleeve" : [-223.013,-904.307],"YXL Back" : [-402.784,-771.924],"YXL Left Front" : [-538.797,-778.834],"YXL Left Placard" : [-729.783,-778.907],"YXL Right Placard" : [-797.753,-778.907],"YXL Collar" : [-899.129,-877.036]}
		}
	},

	"FD_230Y" : 
	{
		"mockupSize" : "YXL",
		"fullButton" : true,
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Right Front" : [-651.993,12.886],"YS Left Sleeve" : [-215.737,1.43],"YS Right Sleeve" : [-215.737,-99.009],"YS Back" : [-390.744,19.786],"YS Left Front" : [-532.478,12.893],"YS Left Placard" : [-730.808,12.856],"YS Right Placard" : [-796.773,12.856],"YS Collar" : [-894.332,-69.261]},
			"YM" : {"YM Right Front" : [-658.125,-246.713],"YM Left Sleeve" : [-222.645,-262.44],"YM Right Sleeve" : [-222.645,-363.718],"YM Back" : [-398.456,-239.824],"YM Left Front" : [-538.631,-246.726],"YM Left Placard" : [-731.306,-246.776],"YM Right Placard" : [-797.274,-246.776],"YM Collar" : [-895.285,-334.217]},
			"YL" : {"YL Right Front" : [-656.179,-506.507],"YL Left Sleeve" : [-220.644,-527.154],"YL Right Sleeve" : [-220.644,-628.237],"YL Back" : [-398.715,-499.559],"YL Left Front" : [-536.673,-506.531],"YL Left Placard" : [-729.309,-506.531],"YL Right Placard" : [-797.274,-506.531],"YL Collar" : [-898.199,-599.301]},
			"YXL" : {"YXL Right Front" : [-658.298,-778.799],"YXL Left Sleeve" : [-223.013,-800.946],"YXL Right Sleeve" : [-223.013,-904.307],"YXL Back" : [-402.784,-771.924],"YXL Left Front" : [-538.797,-778.834],"YXL Left Placard" : [-729.783,-778.907],"YXL Right Placard" : [-797.753,-778.907],"YXL Collar" : [-899.129,-877.036]}
		}
	},

	"FD_BASE_FB_Y_SL" : 
	{
		"mockupSize" : "YXL",
		"fullButton" : true,
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Back" : [-190.472,0.01],"YS Left Front" : [-330.212,-6.88],"YS Right Front" : [-442.962,-6.88],"YS Left Placard" : [-533.932,-6.88],"YS Right Placard" : [-596.312,-6.88],"YS Collar" : [-718.782,-89.08]},
			"YM" : {"YM Back" : [-192.472,-239.95],"YM Left Front" : [-332.212,-246.8],"YM Right Front" : [-444.962,-246.8],"YM Left Placard" : [-537.932,-246.8],"YM Right Placard" : [-599.312,-246.79],"YM Collar" : [-718.782,-334.46]},
			"YL" : {"YL Back" : [-194.472,-490.59],"YL Left Front" : [-335.212,-497.38],"YL Right Front" : [-447.962,-497.38],"YL Left Placard" : [-541.932,-497.37],"YL Right Placard" : [-603.312,-497.37],"YL Collar" : [-718.782,-590.49]},
			"YXL" : {"YXL Back" : [-196.472,-752.39],"YXL Left Front" : [-337.212,-759.13],"YXL Right Front" : [-449.962,-759.13],"YXL Left Placard" : [-546.932,-759.12],"YXL Right Placard" : [-607.312,-759.12],"YXL Collar" : [-719.782,-857.69]}
		}
	},

	"FD_233Y" : 
	{
		"mockupSize" : "YXL",
		"fullButton" : true,
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Back" : [-190.472,0.01],"YS Left Front" : [-330.212,-6.88],"YS Right Front" : [-442.962,-6.88],"YS Left Placard" : [-533.932,-6.88],"YS Right Placard" : [-596.312,-6.88],"YS Collar" : [-718.782,-89.08]},
			"YM" : {"YM Back" : [-192.472,-239.95],"YM Left Front" : [-332.212,-246.8],"YM Right Front" : [-444.962,-246.8],"YM Left Placard" : [-537.932,-246.8],"YM Right Placard" : [-599.312,-246.79],"YM Collar" : [-718.782,-334.46]},
			"YL" : {"YL Back" : [-194.472,-490.59],"YL Left Front" : [-335.212,-497.38],"YL Right Front" : [-447.962,-497.38],"YL Left Placard" : [-541.932,-497.37],"YL Right Placard" : [-603.312,-497.37],"YL Collar" : [-718.782,-590.49]},
			"YXL" : {"YXL Back" : [-196.472,-752.39],"YXL Left Front" : [-337.212,-759.13],"YXL Right Front" : [-449.962,-759.13],"YXL Left Placard" : [-546.932,-759.12],"YXL Right Placard" : [-607.312,-759.12],"YXL Collar" : [-719.782,-857.69]}
		}
	},

	"FD_FAST_FB_W_SS" :
	{
		"mockupSize" : "M",
		"fullButton" : true,
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Left Sleeve" : [-239.001,506],"XXS Right Sleeve" : [-239.001,404],"XXS Back" : [-465.001,530],"XXS Left Front" : [-629.001,528],"XXS Right Front" : [-776.001,528],"XXS Left Placard" : [-918.001,528],"XXS Right Placard" : [-997.001,528],"XXS Collar" : [-1130.001,436]},
			"XS" : {"XS Left Sleeve" : [-243.001,251],"XS Right Sleeve" : [-243.001,149],"XS Back" : [-468.001,277],"XS Left Front" : [-631.001,275],"XS Right Front" : [-778.001,275],"XS Left Placard" : [-918.001,275],"XS Right Placard" : [-997.001,275],"XS Collar" : [-1131.001,181]},
			"S" : {"S Left Sleeve" : [-247.001,-7],"S Right Sleeve" : [-246.001,-109],"S Back" : [-471.001,20],"S Left Front" : [-632.001,19],"S Right Front" : [-780.001,19],"S Left Placard" : [-919.001,19],"S Right Placard" : [-998.001,19],"S Collar" : [-1133.001,-78]},
			"M" : {"M Left Sleeve" : [-251.001,-270],"M Right Sleeve" : [-251.001,-373],"M Back" : [-475.001,-240],"M Left Front" : [-634.001,-241],"M Right Front" : [-781.001,-241],"M Left Placard" : [-919.001,-241],"M Right Placard" : [-998.001,-241],"M Collar" : [-1134.001,-341]},
			"L" : {"L Left Sleeve" : [-253.001,-539],"L Right Sleeve" : [-253.001,-644],"L Back" : [-478.001,-507],"L Left Front" : [-636.001,-509],"L Right Front" : [-783.001,-509],"L Left Placard" : [-920.001,-509],"L Right Placard" : [-999.001,-509],"L Collar" : [-1135.001,-613]},
			"XL" : {"XL Left Sleeve" : [-256.001,-816],"XL Right Sleeve" : [-256.001,-921],"XL Back" : [-482.001,-782],"XL Left Front" : [-638.001,-783],"XL Right Front" : [-785.001,-783],"XL Left Placard" : [-920.001,-783],"XL Right Placard" : [-999.001,-783],"XL Collar" : [-1135.001,-891]},
			"2XL" : {"2XL Left Sleeve" : [-259.001,-1098],"2XL Right Sleeve" : [-259.001,-1204],"2XL Back" : [-485.001,-1064],"2XL Left Front" : [-639.001,-1065],"2XL Right Front" : [-786.001,-1065],"2XL Left Placard" : [-921.001,-1065],"2XL Right Placard" : [-1000.001,-1065],"2XL Collar" : [-1136.001,-1174]},
			"3XL" : {"3XL Left Sleeve" : [-262.001,-1384],"3XL Right Sleeve" : [-262.001,-1491],"3XL Back" : [-489.001,-1349],"3XL Left Front" : [-641.001,-1351],"3XL Right Front" : [-788.001,-1351],"3XL Left Placard" : [-921.001,-1351],"3XL Right Placard" : [-1000.001,-1351],"3XL Collar" : [-1137.001,-1461]}
		}
	},

	"FD_240W" :
	{
		"mockupSize" : "M",
		"fullButton" : true,
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Left Sleeve" : [-239.001,506],"XXS Right Sleeve" : [-239.001,404],"XXS Back" : [-465.001,530],"XXS Left Front" : [-629.001,528],"XXS Right Front" : [-776.001,528],"XXS Left Placard" : [-918.001,528],"XXS Right Placard" : [-997.001,528],"XXS Collar" : [-1130.001,436]},
			"XS" : {"XS Left Sleeve" : [-243.001,251],"XS Right Sleeve" : [-243.001,149],"XS Back" : [-468.001,277],"XS Left Front" : [-631.001,275],"XS Right Front" : [-778.001,275],"XS Left Placard" : [-918.001,275],"XS Right Placard" : [-997.001,275],"XS Collar" : [-1131.001,181]},
			"S" : {"S Left Sleeve" : [-247.001,-7],"S Right Sleeve" : [-246.001,-109],"S Back" : [-471.001,20],"S Left Front" : [-632.001,19],"S Right Front" : [-780.001,19],"S Left Placard" : [-919.001,19],"S Right Placard" : [-998.001,19],"S Collar" : [-1133.001,-78]},
			"M" : {"M Left Sleeve" : [-251.001,-270],"M Right Sleeve" : [-251.001,-373],"M Back" : [-475.001,-240],"M Left Front" : [-634.001,-241],"M Right Front" : [-781.001,-241],"M Left Placard" : [-919.001,-241],"M Right Placard" : [-998.001,-241],"M Collar" : [-1134.001,-341]},
			"L" : {"L Left Sleeve" : [-253.001,-539],"L Right Sleeve" : [-253.001,-644],"L Back" : [-478.001,-507],"L Left Front" : [-636.001,-509],"L Right Front" : [-783.001,-509],"L Left Placard" : [-920.001,-509],"L Right Placard" : [-999.001,-509],"L Collar" : [-1135.001,-613]},
			"XL" : {"XL Left Sleeve" : [-256.001,-816],"XL Right Sleeve" : [-256.001,-921],"XL Back" : [-482.001,-782],"XL Left Front" : [-638.001,-783],"XL Right Front" : [-785.001,-783],"XL Left Placard" : [-920.001,-783],"XL Right Placard" : [-999.001,-783],"XL Collar" : [-1135.001,-891]},
			"2XL" : {"2XL Left Sleeve" : [-259.001,-1098],"2XL Right Sleeve" : [-259.001,-1204],"2XL Back" : [-485.001,-1064],"2XL Left Front" : [-639.001,-1065],"2XL Right Front" : [-786.001,-1065],"2XL Left Placard" : [-921.001,-1065],"2XL Right Placard" : [-1000.001,-1065],"2XL Collar" : [-1136.001,-1174]},
			"3XL" : {"3XL Left Sleeve" : [-262.001,-1384],"3XL Right Sleeve" : [-262.001,-1491],"3XL Back" : [-489.001,-1349],"3XL Left Front" : [-641.001,-1351],"3XL Right Front" : [-788.001,-1351],"3XL Left Placard" : [-921.001,-1351],"3XL Right Placard" : [-1000.001,-1351],"3XL Collar" : [-1137.001,-1461]}
		}
	},

	"FD_FAST_FB_W_SL" :
	{
		"mockupSize" : "M",
		"fullButton" : true,
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Back" : [-256.811,602.69],"XXS Left Front" : [-502.351,601.069],"XXS Right Front" : [-640.441,601.069],"XXS Left Placard" : [-768.641,601.069],"XXS Right Placard" : [-863.641,601.069],"XXS Collar" : [-1034.261,509.1]},
			"XS" : {"XS Back" : [-260.101,350.489],"XS Left Front" : [-504.031,348.869],"XS Right Front" : [-642.121,348.869],"XS Left Placard" : [-769.121,348.869],"XS Right Placard" : [-864.121,348.869],"XS Collar" : [-1035.261,255.1]},
			"S" : {"S Back" : [-263.421,93.789],"S Left Front" : [-505.721,92.18],"S Right Front" : [-643.811,92.18],"S Left Placard" : [-769.581,92.18],"S Right Placard" : [-864.581,92.18],"S Collar" : [-1036.251,-5.2]},
			"M" : {"M Back" : [-266.761,-170.511],"M Left Front" : [-507.431,-172.11],"M Right Front" : [-645.521,-172.11],"M Left Placard" : [-770.051,-172.11],"M Right Placard" : [-865.051,-172.11],"M Collar" : [-1037.241,-273.101]},
			"L" : {"L Back" : [-270.131,-442.131],"L Left Front" : [-509.151,-443.74],"L Right Front" : [-647.231,-443.74],"L Left Placard" : [-770.521,-443.74],"L Right Placard" : [-865.521,-443.74],"L Collar" : [-1038.221,-548.32]},
			"XL" : {"XL Back" : [-273.521,-719.8],"XL Left Front" : [-510.861,-721.41],"XL Right Front" : [-648.951,-721.41],"XL Left Placard" : [-770.981,-721.41],"XL Right Placard" : [-865.981,-721.41],"XL Collar" : [-1039.211,-829.591]},
			"2XL" : {"2XL Back" : [-276.921,-1003.74],"2XL Left Front" : [-512.601,-1005.351],"2XL Right Front" : [-650.691,-1005.351],"2XL Left Placard" : [-771.451,-1005.351],"2XL Right Placard" : [-866.451,-1005.351],"2XL Collar" : [-1040.181,-1115.33]},
			"3XL" : {"3XL Back" : [-280.351,-1293.49],"3XL Left Front" : [-514.331,-1295.101],"3XL Right Front" : [-652.421,-1295.101],"3XL Left Placard" : [-771.901,-1295.101],"3XL Right Placard" : [-866.901,-1295.101],"3XL Collar" : [-1041.161,-1406.881]}
		}
	},

	"FD_243W" :
	{
		"mockupSize" : "M",
		"fullButton" : true,
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Back" : [-256.811,602.69],"XXS Left Front" : [-502.351,601.069],"XXS Right Front" : [-640.441,601.069],"XXS Left Placard" : [-768.641,601.069],"XXS Right Placard" : [-863.641,601.069],"XXS Collar" : [-1034.261,509.1]},
			"XS" : {"XS Back" : [-260.101,350.489],"XS Left Front" : [-504.031,348.869],"XS Right Front" : [-642.121,348.869],"XS Left Placard" : [-769.121,348.869],"XS Right Placard" : [-864.121,348.869],"XS Collar" : [-1035.261,255.1]},
			"S" : {"S Back" : [-263.421,93.789],"S Left Front" : [-505.721,92.18],"S Right Front" : [-643.811,92.18],"S Left Placard" : [-769.581,92.18],"S Right Placard" : [-864.581,92.18],"S Collar" : [-1036.251,-5.2]},
			"M" : {"M Back" : [-266.761,-170.511],"M Left Front" : [-507.431,-172.11],"M Right Front" : [-645.521,-172.11],"M Left Placard" : [-770.051,-172.11],"M Right Placard" : [-865.051,-172.11],"M Collar" : [-1037.241,-273.101]},
			"L" : {"L Back" : [-270.131,-442.131],"L Left Front" : [-509.151,-443.74],"L Right Front" : [-647.231,-443.74],"L Left Placard" : [-770.521,-443.74],"L Right Placard" : [-865.521,-443.74],"L Collar" : [-1038.221,-548.32]},
			"XL" : {"XL Back" : [-273.521,-719.8],"XL Left Front" : [-510.861,-721.41],"XL Right Front" : [-648.951,-721.41],"XL Left Placard" : [-770.981,-721.41],"XL Right Placard" : [-865.981,-721.41],"XL Collar" : [-1039.211,-829.591]},
			"2XL" : {"2XL Back" : [-276.921,-1003.74],"2XL Left Front" : [-512.601,-1005.351],"2XL Right Front" : [-650.691,-1005.351],"2XL Left Placard" : [-771.451,-1005.351],"2XL Right Placard" : [-866.451,-1005.351],"2XL Collar" : [-1040.181,-1115.33]},
			"3XL" : {"3XL Back" : [-280.351,-1293.49],"3XL Left Front" : [-514.331,-1295.101],"3XL Right Front" : [-652.421,-1295.101],"3XL Left Placard" : [-771.901,-1295.101],"3XL Right Placard" : [-866.901,-1295.101],"3XL Collar" : [-1041.161,-1406.881]}
		}
	},

	////////////
	//2 Button//
	////////////

	"FD_BASE_2B_SS" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"S" : {"S Collar" : [-1220.109,607.96],"S Back" : [-515.781,724.97],"S Front" : [-803.761,718],"S Left Sleeve" : [-221.051,692.729],"S Right Sleeve" : [-221.051,576.51],"S Right Placard" : [-938.012,634.72],"S Center Placard" : [-1001.442,621.119],"S Left Placard" : [-1093.532,634.72]},
			"M" : {"M Collar" : [-1225.109,315.389],"M Back" : [-520.781,435],"M Front" : [-809.431,428],"M Left Sleeve" : [-226.101,401.21],"M Right Sleeve" : [-226.101,283.01],"M Right Placard" : [-938.012,342.09],"M Center Placard" : [-1002.442,327.63],"M Left Placard" : [-1094.532,342.09]},
			"L" : {"L Collar" : [-1230.109,-0.011],"L Back" : [-526.041,123.149],"L Front" : [-814.681,116],"L Left Sleeve" : [-229.441,89.55],"L Right Sleeve" : [-229.371,-32.41],"L Right Placard" : [-938.012,26.68],"L Center Placard" : [-1002.442,12.229],"L Left Placard" : [-1094.532,26.68]},
			"XL" : {"XL Collar" : [-1236.109,-312.771],"XL Back" : [-531.741,-186.94],"XL Front" : [-819.381,-194],"XL Left Sleeve" : [-232.511,-219.58],"XL Right Sleeve" : [-232.571,-346.061],"XL Right Placard" : [-938.012,-286.11],"XL Center Placard" : [-1002.442,-301.44],"XL Left Placard" : [-1095.532,-286.11]},
			"2XL" : {"2XL Collar" : [-1241.109,-634.47],"2XL Back" : [-536.981,-504.96],"2XL Front" : [-824.511,-512],"2XL Left Sleeve" : [-235.981,-537.921],"2XL Right Sleeve" : [-235.981,-667.74],"2XL Right Placard" : [-938.012,-606.921],"2XL Center Placard" : [-1002.442,-622.22],"2XL Left Placard" : [-1095.532,-606.921]},
			"3XL" : {"3XL Collar" : [-1246.109,-970.16],"3XL Back" : [-542.021,-836.941],"3XL Front" : [-829.191,-844],"3XL Left Sleeve" : [-240.741,-876],"3XL Right Sleeve" : [-240.971,-1003.341],"3XL Right Placard" : [-938.012,-941.701],"3XL Center Placard" : [-1002.442,-957.88],"3XL Left Placard" : [-1096.532,-941.701]},
			"4XL" : {"4XL Collar" : [-1252.109,-1306.16],"4XL Back" : [-547.721,-1172.96],"4XL Front" : [-834.781,-1180],"4XL Left Sleeve" : [-245.411,-1214.681],"4XL Right Sleeve" : [-245.411,-1339.4],"4XL Right Placard" : [-938.012,-1276.8],"4XL Center Placard" : [-1003.442,-1293.881],"4XL Left Placard" : [-1097.532,-1276.8]},
			"5XL" : {"5XL Collar" : [-1257.109,-1642.15],"5XL Back" : [-553.131,-1508.92],"5XL Front" : [-840.111,-1516],"5XL Left Sleeve" : [-250.341,-1553.25],"5XL Right Sleeve" : [-250.231,-1675.631],"5XL Right Placard" : [-938.012,-1611.89],"5XL Center Placard" : [-1003.442,-1629.87],"5XL Left Placard" : [-1098.532,-1611.89]}
		}
	},

	"FD_BASE_2B_Y" :
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Collar" : [-991.266,-106.921],"YS Back" : [-447.251,-13.79],"YS Front" : [-647.061,-20.7],"YS Left Sleeve" : [-216.841,-31.99],"YS Right Sleeve" : [-216.841,-132.54],"YS Right Placard" : [-741.685,-74.7],"YS Center Placard" : [-789.105,-100.131],"YS Left Placard" : [-864.175,-74.711]},
			"YM" : {"YM Collar" : [-992.156,-351],"YM Back" : [-450.491,-252.461],"YM Front" : [-650.301,-259.4],"YM Left Sleeve" : [-219.321,-275.551],"YM Right Sleeve" : [-219.321,-376.04],"YM Right Placard" : [-742.195,-317.9],"YM Center Placard" : [-789.105,-345.011],"YM Left Placard" : [-865.175,-317.9]},
			"YL" : {"YL Collar" : [-993.026,-605.781],"YL Back" : [-455.111,-501.851],"YL Front" : [-654.901,-508.8],"YL Left Sleeve" : [-221.741,-529.75],"YL Right Sleeve" : [-221.741,-630.33],"YL Right Placard" : [-742.685,-571.8],"YL Center Placard" : [-794.105,-600.611],"YL Left Placard" : [-871.175,-571.8]},
			"YXL" : {"YXL Collar" : [-993.886,-871.291],"YXL Back" : [-459.131,-761.96],"YXL Front" : [-658.911,-768.931],"YXL Left Sleeve" : [-224.121,-794.65],"YXL Right Sleeve" : [-224.121,-895.421],"YXL Right Placard" : [-743.155,-836.431],"YXL Center Placard" : [-796.105,-866.951],"YXL Left Placard" : [-874.175,-836.431]}
		}
	},

	"FD_BASE_2B_Y_SS" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Collar" : [-991.266,-106.921],"YS Back" : [-447.251,-13.79],"YS Front" : [-647.061,-20.7],"YS Left Sleeve" : [-216.841,-31.99],"YS Right Sleeve" : [-216.841,-132.54],"YS Right Placard" : [-741.685,-74.7],"YS Center Placard" : [-789.105,-100.131],"YS Left Placard" : [-864.175,-74.711]},
			"YM" : {"YM Collar" : [-992.156,-351],"YM Back" : [-450.491,-252.461],"YM Front" : [-650.301,-259.4],"YM Left Sleeve" : [-219.321,-275.551],"YM Right Sleeve" : [-219.321,-376.04],"YM Right Placard" : [-742.195,-317.9],"YM Center Placard" : [-789.105,-345.011],"YM Left Placard" : [-865.175,-317.9]},
			"YL" : {"YL Collar" : [-993.026,-605.781],"YL Back" : [-455.111,-501.851],"YL Front" : [-654.901,-508.8],"YL Left Sleeve" : [-221.741,-529.75],"YL Right Sleeve" : [-221.741,-630.33],"YL Right Placard" : [-742.685,-571.8],"YL Center Placard" : [-794.105,-600.611],"YL Left Placard" : [-871.175,-571.8]},
			"YXL" : {"YXL Collar" : [-993.886,-871.291],"YXL Back" : [-459.131,-761.96],"YXL Front" : [-658.911,-768.931],"YXL Left Sleeve" : [-224.121,-794.65],"YXL Right Sleeve" : [-224.121,-895.421],"YXL Right Placard" : [-743.155,-836.431],"YXL Center Placard" : [-796.105,-866.951],"YXL Left Placard" : [-874.175,-836.431]}
		}
	},

	"FD_FAST_2B_SS" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-1011.891,455.309],"XXS Back" : [-423.201,547.059],"XXS Front" : [-636.521,545.46],"XXS Left Sleeve" : [-188.461,523.979],"XXS Right Placard" : [-731.621,476.44],"XXS Center Placard" : [-800.121,464.69],"XXS Left Placard" : [-880.931,476.44],"XXS Right Sleeve" : [-188.461,420.75]},
			"XS" : {"XS Collar" : [-1015.331,206.789],"XS Back" : [-426.701,300.43],"XS Front" : [-639.901,298.939],"XS Left Sleeve" : [-191.831,275.819],"XS Right Placard" : [-732.621,228.38],"XS Center Placard" : [-801.001,216.239],"XS Left Placard" : [-884.311,228.38],"XS Right Sleeve" : [-191.831,172.329]},
			"S" : {"S Collar" : [-1018.881,-60.25],"S Back" : [-431.511,35.109],"S Front" : [-643.331,33.6],"S Left Sleeve" : [-195.261,8.789],"S Right Placard" : [-732.621,-38.2],"S Center Placard" : [-801.981,-50.75],"S Left Placard" : [-887.741,-38.2],"S Right Sleeve" : [-195.261,-94.74]},
			"M" : {"M Collar" : [-1022.121,-323.7],"M Back" : [-433.591,-224.75],"M Front" : [-647.151,-226.29],"M Left Sleeve" : [-199.081,-253.561],"M Right Placard" : [-732.621,-301.19],"M Center Placard" : [-802.931,-314.15],"M Left Placard" : [-891.561,-301.19],"M Right Sleeve" : [-199.081,-358.051]},
			"L" : {"L Collar" : [-1025.701,-595.671],"L Back" : [-438.301,-493.011],"L Front" : [-649.831,-494.531],"L Left Sleeve" : [-201.761,-524.22],"L Right Placard" : [-732.621,-572.71],"L Center Placard" : [-803.881,-586.08],"L Left Placard" : [-894.241,-572.71],"L Right Sleeve" : [-201.761,-629.751]},
			"XL" : {"XL Collar" : [-1028.831,-879.72],"XL Back" : [-440.331,-773.341],"XL Front" : [-651.831,-775.08],"XL Left Sleeve" : [-203.761,-806.66],"XL Right Placard" : [-733.621,-856.3],"XL Center Placard" : [-804.821,-870.101],"XL Left Placard" : [-896.241,-856.3],"XL Right Sleeve" : [-203.761,-913.39]},
			"2XL" : {"2XL Collar" : [-1032.381,-1168.08],"2XL Back" : [-443.881,-1059.97],"2XL Front" : [-654.691,-1061.531],"2XL Left Sleeve" : [-206.621,-1093.511],"2XL Right Placard" : [-733.621,-1144.21],"2XL Center Placard" : [-805.761,-1158.431],"2XL Left Placard" : [-899.101,-1144.21],"2XL Right Sleeve" : [-206.621,-1201.14]},
			"3XL" : {"3XL Collar" : [-1035.831,-1457.791],"3XL Back" : [-447.381,-1347.82],"3XL Front" : [-657.591,-1349.611],"3XL Left Sleeve" : [-209.521,-1382.031],"3XL Right Placard" : [-734.621,-1433.47],"3XL Center Placard" : [-806.691,-1448.12],"3XL Left Placard" : [-902.001,-1433.47],"3XL Right Sleeve" : [-209.521,-1490.431]}
		}
	},

	//////////////
	//Basketball//
	//////////////

	"FD_BASK_RV" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" :
		{
			"S" : {"S Left Leg Panel" : [-368.003,450.877],"S Right Leg Panel" : [-678.326,450.877],"S Back" : [-937.583,476.663],"S Front" : [-1204.204,476.869]},
			"M" : {"M Left Leg Panel" : [-372.565,167.835],"M Right Leg Panel" : [-682.889,167.835],"M Back" : [-944.47,193.908],"M Front" : [-1211.091,194.062]},
			"L" : {"L Left Leg Panel" : [-377.104,-121.677],"L Right Leg Panel" : [-687.428,-121.677],"L Back" : [-949.603,-95.778],"L Front" : [-1216.224,-95.639]},
			"XL" : {"XL Left Leg Panel" : [-382.197,-418.324],"XL Right Leg Panel" : [-692.521,-418.324],"XL Back" : [-955.43,-392.257],"XL Front" : [-1222.051,-392.051]},
			"2XL" : {"2XL Left Leg Panel" : [-386.146,-722.683],"2XL Right Leg Panel" : [-696.47,-722.683],"2XL Back" : [-961.518,-696.66],"2XL Front" : [-1228.139,-696.493]},
			"3XL" : {"3XL Left Leg Panel" : [-390.138,-1037.462],"3XL Right Leg Panel" : [-700.461,-1037.462],"3XL Back" : [-966.708,-1007.748],"3XL Front" : [-1233.329,-1007.594]}
		}
	},

	"FD_BASKW_RV" : 
	{
		"mockupSize" : "M",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 7.2,
		"smallestScale" : 2,
		"placement" :
		{
			"XS" : {"XS Left Leg Panel" : [-324.839,611.455],"XS Right Leg Panel" : [-635.135,611.459],"XS Back" : [-894.663,644.844],"XS Front" : [-1161.36,641.531]},
			"S" : {"S Left Leg Panel" : [-329.641,348.877],"S Right Leg Panel" : [-639.964,348.877],"S Back" : [-899.221,374.663],"S Front" : [-1165.842,374.868]},
			"M" : {"M Left Leg Panel" : [-334.203,65.835],"M Right Leg Panel" : [-644.527,65.835],"M Back" : [-906.108,91.908],"M Front" : [-1172.729,92.061]},
			"L" : {"L Left Leg Panel" : [-338.742,-223.677],"L Right Leg Panel" : [-649.066,-223.677],"L Back" : [-911.241,-197.779],"L Front" : [-1177.862,-197.64]},
			"XL" : {"XL Left Leg Panel" : [-343.835,-520.325],"XL Right Leg Panel" : [-654.159,-520.325],"XL Back" : [-917.068,-494.257],"XL Front" : [-1183.689,-494.051]},
			"2XL" : {"2XL Left Leg Panel" : [-347.784,-824.684],"2XL Right Leg Panel" : [-658.108,-824.684],"2XL Back" : [-923.156,-798.66],"2XL Front" : [-1189.777,-798.494]},
			"3XL" : {"3XL Left Leg Panel" : [-351.776,-1139.462],"3XL Right Leg Panel" : [-662.099,-1139.462],"3XL Back" : [-928.346,-1109.748],"3XL Front" : [-1194.967,-1109.595]}
		}
	},

	"FD_BASKY_RV" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" :
		{
			"YS" : {"YS Left Leg Panel" : [-352.476,82.503],"YS Right Leg Panel" : [-643.685,82.503],"YS Back" : [-849.531,113.024],"YS Front" : [-1064.709,108.723]},
			"YM" : {"YM Left Leg Panel" : [-356.87,-168.607],"YM Right Leg Panel" : [-648.079,-168.607],"YM Back" : [-853.233,-138.022],"YM Front" : [-1068.411,-142.548]},
			"YL" : {"YL Left Leg Panel" : [-361.104,-427.376],"YL Right Leg Panel" : [-652.313,-427.376],"YL Back" : [-856.591,-396.7],"YL Front" : [-1071.769,-401.101]},
			"YXL" : {"YXL Left Leg Panel" : [-365.345,-692.579],"YXL Right Leg Panel" : [-656.554,-692.579],"YXL Back" : [-860.317,-662.117],"YXL Front" : [-1075.495,-666.41]}
		}
	},

	"FD_210_211" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" :
		{
			"S" : {"S Left Leg Panel" : [-350.663,538.709],"S Right Leg Panel" : [-660.002,538.709],"S Back" : [-919.747,558.867],"S Front" : [-1163.293,558.991],"S Collar" : [-1453.451,447.639]},
			"M" : {"M Left Leg Panel" : [-355.221,197.576],"M Right Leg Panel" : [-664.563,197.576],"M Back" : [-924.146,217.953],"M Front" : [-1167.692,217.973],"M Collar" : [-1456.007,102.965]},
			"L" : {"L Left Leg Panel" : [-359.757,-143.556],"L Right Leg Panel" : [-669.098,-143.556],"L Back" : [-928.399,-123.183],"L Front" : [-1171.945,-123.147],"L Collar" : [-1457.329,-241.708]},
			"XL" : {"XL Left Leg Panel" : [-364.271,-484.556],"XL Right Leg Panel" : [-673.612,-484.556],"XL Back" : [-932.791,-464.234],"XL Front" : [-1176.336,-464.173],"XL Collar" : [-1458.74,-586.381]},
			"2XL" : {"2XL Left Leg Panel" : [-368.793,-825.688],"2XL Right Leg Panel" : [-678.134,-825.688],"2XL Back" : [-937.259,-805.341],"2XL Front" : [-1180.804,-805.286],"2XL Collar" : [-1461.282,-931.055]},
			"3XL" : {"3XL Left Leg Panel" : [-372.781,-1170.348],"3XL Right Leg Panel" : [-682.121,-1170.348],"3XL Back" : [-942.432,-1146.477],"3XL Front" : [-1185.977,-1146.426],"3XL Collar" : [-1463.078,-1275.728]}
		}
	},

	"FD_210W_211W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS","S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 7.2,
		"smallestScale" : 2,
		"placement" :
		{
			"XS" : {"XS Left Leg Panel" : [-371.781,517.628],"XS Right Leg Panel" : [-656.744,517.628],"XS Collar" : [-1369.881,431.847],"XS Back" : [-894.545,684.893],"XS Front" : [-1134.667,543.151]},
			"S" : {"S Left Leg Panel" : [-375.269,252.319],"S Right Leg Panel" : [-660.232,252.319],"S Collar" : [-1373.009,162.827],"S Back" : [-899.103,415.089],"S Front" : [-1139.148,277.702]},
			"M" : {"M Left Leg Panel" : [-378.946,-21.444],"M Right Leg Panel" : [-663.909,-21.444],"M Collar" : [-1376.155,-112.782],"M Back" : [-903.881,139.588],"M Front" : [-1143.899,5.617]},
			"L" : {"L Left Leg Panel" : [-383.745,-302.273],"L Right Leg Panel" : [-668.707,-302.273],"L Collar" : [-1379.702,-395.451],"L Back" : [-908.654,-143.184],"L Front" : [-1148.862,-273.537]},
			"XL" : {"XL Left Leg Panel" : [-388.178,-590.737],"XL Right Leg Panel" : [-673.141,-590.737],"XL Collar" : [-1382.92,-685.594],"XL Back" : [-913.571,-433.326],"XL Front" : [-1153.737,-559.985]},
			"2XL" : {"2XL Left Leg Panel" : [-392.45,-886.88],"2XL Right Leg Panel" : [-677.413,-886.88],"2XL Collar" : [-1386.225,-983.59],"2XL Back" : [-918.742,-731.078],"2XL Front" : [-1158.905,-854.421]},
			"3XL" : {"3XL Left Leg Panel" : [-396.715,-1190.122],"3XL Right Leg Panel" : [-681.678,-1190.122],"3XL Collar" : [-1389.591,-1288.645],"3XL Back" : [-924,-1035.926],"3XL Front" : [-1164.181,-1155.791]}
		}
	},

	"FD_210Y_211Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" :
		{
			"YS" : {"YS Left Leg Panel" : [-352.997,37.983],"YS Right Leg Panel" : [-605.901,37.983],"YS Back" : [-806.34,59.522],"YS Front" : [-1022.981,55.915],"YS Collar" : [-1222.038,-35.486]},
			"YM" : {"YM Left Leg Panel" : [-357.398,-201.413],"YM Right Leg Panel" : [-610.301,-201.413],"YM Back" : [-809.644,-179.746],"YM Front" : [-1026.285,-183.756],"YM Collar" : [-1224.288,-278.568]},
			"YL" : {"YL Left Leg Panel" : [-361.624,-447.837],"YL Right Leg Panel" : [-614.527,-447.837],"YL Back" : [-813.106,-426.593],"YL Front" : [-1029.779,-429.918],"YL Collar" : [-1225.638,-528.535]},
			"YXL" : {"YXL Left Leg Panel" : [-365.864,-702.521],"YXL Right Leg Panel" : [-618.767,-702.521],"YXL Back" : [-816.446,-681.497],"YXL Front" : [-1033.126,-684.724],"YXL Collar" : [-1227.888,-786.896]}
		}
	},

	////////////
	//Football//
	////////////
	"FD_5411" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
		"scaleFrontLogo" : false,
		"rotate" : true,
		"placement" : 
		{
			"S" : {"S Binding" : [-1265.436,764.343],"S Inside Cowl" : [-1277.01,665.381],"S Right Sleeve" : [-294.195,755.992],"S Outside Cowl" : [-401.483,672.93],"S Left Sleeve" : [-416.941,755.992],"S Right Side Panel" : [-1025.927,756.259],"S Left Side Panel" : [-1365.903,756.259],"S Collar" : [-1279.23,703.461],"S Back" : [-663.774,772.288],"S Right Cuff" : [-1242.03,739.86],"S Left Cuff" : [-1241.734,785.701],"S Front" : [-926.874,772.288]},
			"M" : {"M Binding" : [-1265.092,478.82],"M Inside Cowl" : [-1280.61,379.884],"M Right Sleeve" : [-294.195,458.405],"M Outside Cowl" : [-405.083,387.742],"M Left Sleeve" : [-416.941,458.396],"M Right Side Panel" : [-1025.927,474.547],"M Left Side Panel" : [-1365.903,474.547],"M Collar" : [-1279.058,417.997],"M Back" : [-667.753,490.556],"M Right Cuff" : [-1241.741,454.396],"M Left Cuff" : [-1241.796,500.237],"M Front" : [-930.856,490.297]},
			"L" : {"L Binding" : [-1265.092,193.349],"L Inside Cowl" : [-1284.21,94.381],"L Right Sleeve" : [-294.189,171.318],"L Outside Cowl" : [-408.683,100.662],"L Left Sleeve" : [-416.947,171.318],"L Right Side Panel" : [-1025.927,192.563],"L Left Side Panel" : [-1365.903,192.563],"L Collar" : [-1279.096,132.493],"L Back" : [-672.565,208.377],"L Right Cuff" : [-1242.191,168.894],"L Left Cuff" : [-1242.029,214.734],"L Front" : [-935.665,208.377]},
			"XL" : {"XL Binding" : [-1265.092,-92.389],"XL Inside Cowl" : [-1287.81,-191.294],"XL Right Sleeve" : [-294.189,-117.412],"XL Outside Cowl" : [-412.283,-188.057],"XL Left Sleeve" : [-416.947,-117.403],"XL Right Side Panel" : [-1025.927,-87.695],"XL Left Side Panel" : [-1365.903,-87.695],"XL Collar" : [-1279.02,-153.182],"XL Back" : [-678.126,-74.254],"XL Right Cuff" : [-1242.057,-116.781],"XL Left Cuff" : [-1241.79,-70.94],"XL Front" : [-941.226,-74.257]},
			"2XL" : {"2XL Binding" : [-1265.095,-377.878],"2XL Inside Cowl" : [-1291.41,-476.898],"2XL Right Sleeve" : [-294.189,-406.077],"2XL Outside Cowl" : [-415.883,-476.588],"2XL Left Sleeve" : [-416.947,-406.077],"2XL Right Side Panel" : [-1025.927,-369.637],"2XL Left Side Panel" : [-1365.903,-369.637],"2XL Collar" : [-1279.212,-438.747],"2XL Back" : [-684.022,-356.557],"2XL Right Cuff" : [-1241.586,-402.346],"2XL Left Cuff" : [-1241.586,-356.507],"2XL Front" : [-947.118,-356.553]},
			"3XL" : {"3XL Binding" : [-1265.436,-663.508],"3XL Inside Cowl" : [-1295.01,-762.364],"3XL Right Sleeve" : [-294.408,-694.88],"3XL Outside Cowl" : [-419.483,-764.806],"3XL Left Sleeve" : [-417.154,-694.889],"3XL Right Side Panel" : [-1025.927,-653.604],"3XL Left Side Panel" : [-1365.903,-653.604],"3XL Collar" : [-1279.157,-724.335],"3XL Back" : [-687.214,-638.642],"3XL Right Cuff" : [-1242.382,-687.935],"3XL Left Cuff" : [-1242.352,-642.095],"3XL Front" : [-950.312,-638.902]},
			"4XL" : {"4XL Binding" : [-1265.503,-949.158],"4XL Inside Cowl" : [-1298.61,-1048.199],"4XL Right Sleeve" : [-294.408,-988.534],"4XL Outside Cowl" : [-423.083,-1059.198],"4XL Left Sleeve" : [-417.154,-988.543],"4XL Right Side Panel" : [-1025.927,-933.024],"4XL Left Side Panel" : [-1365.903,-933.024],"4XL Collar" : [-1279.252,-1010.048],"4XL Back" : [-691.724,-916.288],"4XL Right Cuff" : [-1242.034,-973.648],"4XL Left Cuff" : [-1242.109,-927.807],"4XL Front" : [-954.822,-916.548]},
			"5XL" : {"5XL Binding" : [-1265.436,-1234.771],"5XL Inside Cowl" : [-1302.21,-1333.81],"5XL Right Sleeve" : [-294.413,-1276.488],"5XL Outside Cowl" : [-426.683,-1347.146],"5XL Left Sleeve" : [-417.145,-1276.484],"5XL Right Side Panel" : [-1025.927,-1214.596],"5XL Left Side Panel" : [-1365.903,-1214.596],"5XL Collar" : [-1279.454,-1295.66],"5XL Back" : [-696.07,-1200.085],"5XL Right Cuff" : [-1242.205,-1259.259],"5XL Left Cuff" : [-1241.879,-1213.419],"5XL Front" : [-959.169,-1200.082]}
		}
	},
	"FD_5411Y" :
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl", "Binding"],
		"scaleFrontLogo" : false,
		"rotate" : true,
		"placement" : 
		{
			"YXS" : {"YXS Outside Cowl" : [-277.834,330.183],"YXS Left Sleeve" : [-421.241,271.76],"YXS Right Sleeve" : [-421.241,337.6],"YXS Binding" : [-1150.775,378.43],"YXS Back" : [-612.63,363.515],"YXS Front" : [-799.274,363.11],"YXS Right Side Panel" : [-934.473,342.971],"YXS Inside Cowl" : [-1133.058,285.948],"YXS Left Cuff" : [-1132.643,398.945],"YXS Right Cuff" : [-1132.469,362.907],"YXS Collar" : [-1149.719,323.359],"YXS Left Side Panel" : [-1222.328,342.972]},
			"YS" : {"YS Binding" : [-1150.775,132.342],"YS Right Cuff" : [-1133.477,112.907],"YS Left Cuff" : [-1133.357,148.945],"YS Inside Cowl" : [-1139.383,35.948],"YS Right Sleeve" : [-421.241,87.6],"YS Outside Cowl" : [-284.156,80.183],"YS Left Sleeve" : [-421.241,21.76],"YS Right Side Panel" : [-934.469,92.971],"YS Left Side Panel" : [-1222.324,92.972],"YS Collar" : [-1149.718,73.359],"YS Back" : [-618.989,113.515],"YS Front" : [-805.667,113.11]},
			"YM" : {"YM Binding" : [-1150.775,-115.658],"YM Right Cuff" : [-1133.294,-134.574],"YM Left Cuff" : [-1133.343,-98.534],"YM Inside Cowl" : [-1145.82,-211.534],"YM Right Sleeve" : [-421.241,-147.73],"YM Outside Cowl" : [-290.593,-154.844],"YM Left Sleeve" : [-421.241,-212.971],"YM Right Side Panel" : [-934.473,-150.272],"YM Left Side Panel" : [-1222.328,-150.272],"YM Collar" : [-1149.719,-174.12],"YM Back" : [-625.354,-118.824],"YM Front" : [-812.064,-119.409]},
			"YL" : {"YL Binding" : [-1150.775,-362.658],"YL Right Cuff" : [-1133.384,-381.825],"YL Left Cuff" : [-1133.344,-345.787],"YL Inside Cowl" : [-1149.586,-458.785],"YL Right Sleeve" : [-421.241,-395.171],"YL Outside Cowl" : [-294.362,-402.287],"YL Left Sleeve" : [-421.241,-460.414],"YL Right Side Panel" : [-934.469,-391.189],"YL Left Side Panel" : [-1222.324,-391.183],"YL Collar" : [-1149.719,-421.372],"YL Back" : [-629.003,-362.208],"YL Front" : [-815.748,-362.611]},
			"YXL" : {"YXL Binding" : [-1150.775,-609.63],"YXL Right Cuff" : [-1133.29,-629.078],"YXL Left Cuff" : [-1133.344,-593.04],"YXL Inside Cowl" : [-1155.717,-706.041],"YXL Right Sleeve" : [-421.241,-642.132],"YXL Outside Cowl" : [-300.497,-649.54],"YXL Left Sleeve" : [-421.241,-707.957],"YXL Right Side Panel" : [-934.469,-632.846],"YXL Left Side Panel" : [-1222.324,-632.841],"YXL Collar" : [-1149.724,-668.625],"YXL Back" : [-634.987,-605.865],"YXL Front" : [-821.772,-606.264]},
			"Y2XL" : {"Y2XL Outside Cowl" : [-306.742,-900.54],"Y2XL Left Sleeve" : [-421.241,-958.957],"Y2XL Right Sleeve" : [-421.241,-893.132],"Y2XL Binding" : [-1150.358,-864.657],"Y2XL Back" : [-640.978,-856.865],"Y2XL Front" : [-827.792,-857.264],"Y2XL Right Side Panel" : [-934.473,-883.846],"Y2XL Left Cuff" : [-1132.469,-844.04],"Y2XL Right Cuff" : [-1132.469,-880.078],"Y2XL Collar" : [-1149.718,-919.625],"Y2XL Inside Cowl" : [-1161.966,-957.041],"Y2XL Left Side Panel" : [-1222.328,-883.841]}
		}
	},
	"FD_250" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
		"scaleFrontLogo" : false,
		"rotate" : true,
		"placement" : 
		{
			"S" : {"S Binding" : [-1265.436,764.343],"S Inside Cowl" : [-1277.01,665.381],"S Right Sleeve" : [-294.195,755.992],"S Outside Cowl" : [-401.483,672.93],"S Left Sleeve" : [-416.941,755.992],"S Right Side Panel" : [-1025.927,756.259],"S Left Side Panel" : [-1365.903,756.259],"S Collar" : [-1279.23,703.461],"S Back" : [-663.774,772.288],"S Right Cuff" : [-1242.03,739.86],"S Left Cuff" : [-1241.734,785.701],"S Front" : [-926.874,772.288]},
			"M" : {"M Binding" : [-1265.092,478.82],"M Inside Cowl" : [-1280.61,379.884],"M Right Sleeve" : [-294.195,458.405],"M Outside Cowl" : [-405.083,387.742],"M Left Sleeve" : [-416.941,458.396],"M Right Side Panel" : [-1025.927,474.547],"M Left Side Panel" : [-1365.903,474.547],"M Collar" : [-1279.058,417.997],"M Back" : [-667.753,490.556],"M Right Cuff" : [-1241.741,454.396],"M Left Cuff" : [-1241.796,500.237],"M Front" : [-930.856,490.297]},
			"L" : {"L Binding" : [-1265.092,193.349],"L Inside Cowl" : [-1284.21,94.381],"L Right Sleeve" : [-294.189,171.318],"L Outside Cowl" : [-408.683,100.662],"L Left Sleeve" : [-416.947,171.318],"L Right Side Panel" : [-1025.927,192.563],"L Left Side Panel" : [-1365.903,192.563],"L Collar" : [-1279.096,132.493],"L Back" : [-672.565,208.377],"L Right Cuff" : [-1242.191,168.894],"L Left Cuff" : [-1242.029,214.734],"L Front" : [-935.665,208.377]},
			"XL" : {"XL Binding" : [-1265.092,-92.389],"XL Inside Cowl" : [-1287.81,-191.294],"XL Right Sleeve" : [-294.189,-117.412],"XL Outside Cowl" : [-412.283,-188.057],"XL Left Sleeve" : [-416.947,-117.403],"XL Right Side Panel" : [-1025.927,-87.695],"XL Left Side Panel" : [-1365.903,-87.695],"XL Collar" : [-1279.02,-153.182],"XL Back" : [-678.126,-74.254],"XL Right Cuff" : [-1242.057,-116.781],"XL Left Cuff" : [-1241.79,-70.94],"XL Front" : [-941.226,-74.257]},
			"2XL" : {"2XL Binding" : [-1265.095,-377.878],"2XL Inside Cowl" : [-1291.41,-476.898],"2XL Right Sleeve" : [-294.189,-406.077],"2XL Outside Cowl" : [-415.883,-476.588],"2XL Left Sleeve" : [-416.947,-406.077],"2XL Right Side Panel" : [-1025.927,-369.637],"2XL Left Side Panel" : [-1365.903,-369.637],"2XL Collar" : [-1279.212,-438.747],"2XL Back" : [-684.022,-356.557],"2XL Right Cuff" : [-1241.586,-402.346],"2XL Left Cuff" : [-1241.586,-356.507],"2XL Front" : [-947.118,-356.553]},
			"3XL" : {"3XL Binding" : [-1265.436,-663.508],"3XL Inside Cowl" : [-1295.01,-762.364],"3XL Right Sleeve" : [-294.408,-694.88],"3XL Outside Cowl" : [-419.483,-764.806],"3XL Left Sleeve" : [-417.154,-694.889],"3XL Right Side Panel" : [-1025.927,-653.604],"3XL Left Side Panel" : [-1365.903,-653.604],"3XL Collar" : [-1279.157,-724.335],"3XL Back" : [-687.214,-638.642],"3XL Right Cuff" : [-1242.382,-687.935],"3XL Left Cuff" : [-1242.352,-642.095],"3XL Front" : [-950.312,-638.902]},
			"4XL" : {"4XL Binding" : [-1265.503,-949.158],"4XL Inside Cowl" : [-1298.61,-1048.199],"4XL Right Sleeve" : [-294.408,-988.534],"4XL Outside Cowl" : [-423.083,-1059.198],"4XL Left Sleeve" : [-417.154,-988.543],"4XL Right Side Panel" : [-1025.927,-933.024],"4XL Left Side Panel" : [-1365.903,-933.024],"4XL Collar" : [-1279.252,-1010.048],"4XL Back" : [-691.724,-916.288],"4XL Right Cuff" : [-1242.034,-973.648],"4XL Left Cuff" : [-1242.109,-927.807],"4XL Front" : [-954.822,-916.548]},
			"5XL" : {"5XL Binding" : [-1265.436,-1234.771],"5XL Inside Cowl" : [-1302.21,-1333.81],"5XL Right Sleeve" : [-294.413,-1276.488],"5XL Outside Cowl" : [-426.683,-1347.146],"5XL Left Sleeve" : [-417.145,-1276.484],"5XL Right Side Panel" : [-1025.927,-1214.596],"5XL Left Side Panel" : [-1365.903,-1214.596],"5XL Collar" : [-1279.454,-1295.66],"5XL Back" : [-696.07,-1200.085],"5XL Right Cuff" : [-1242.205,-1259.259],"5XL Left Cuff" : [-1241.879,-1213.419],"5XL Front" : [-959.169,-1200.082]}
		}
	},
	"FD_250Y" :
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Left Cuff", "Right Cuff", "Back", "Collar", "Left Side Panel", "Right Side Panel", "Left Sleeve", "Outside Cowl", "Right Sleeve", "Inside Cowl"],
		"scaleFrontLogo" : false,
		"rotate" : true,
		"placement" : 
		{
			"YXS" : {"YXS Outside Cowl" : [-277.834,330.183],"YXS Left Sleeve" : [-421.241,271.76],"YXS Right Sleeve" : [-421.241,337.6],"YXS Binding" : [-1150.775,378.43],"YXS Back" : [-612.63,363.515],"YXS Front" : [-799.274,363.11],"YXS Right Side Panel" : [-934.473,342.971],"YXS Inside Cowl" : [-1133.058,285.948],"YXS Left Cuff" : [-1132.643,398.945],"YXS Right Cuff" : [-1132.469,362.907],"YXS Collar" : [-1149.719,323.359],"YXS Left Side Panel" : [-1222.328,342.972]},
			"YS" : {"YS Binding" : [-1150.775,132.342],"YS Right Cuff" : [-1133.477,112.907],"YS Left Cuff" : [-1133.357,148.945],"YS Inside Cowl" : [-1139.383,35.948],"YS Right Sleeve" : [-421.241,87.6],"YS Outside Cowl" : [-284.156,80.183],"YS Left Sleeve" : [-421.241,21.76],"YS Right Side Panel" : [-934.469,92.971],"YS Left Side Panel" : [-1222.324,92.972],"YS Collar" : [-1149.718,73.359],"YS Back" : [-618.989,113.515],"YS Front" : [-805.667,113.11]},
			"YM" : {"YM Binding" : [-1150.775,-115.658],"YM Right Cuff" : [-1133.294,-134.574],"YM Left Cuff" : [-1133.343,-98.534],"YM Inside Cowl" : [-1145.82,-211.534],"YM Right Sleeve" : [-421.241,-147.73],"YM Outside Cowl" : [-290.593,-154.844],"YM Left Sleeve" : [-421.241,-212.971],"YM Right Side Panel" : [-934.473,-150.272],"YM Left Side Panel" : [-1222.328,-150.272],"YM Collar" : [-1149.719,-174.12],"YM Back" : [-625.354,-118.824],"YM Front" : [-812.064,-119.409]},
			"YL" : {"YL Binding" : [-1150.775,-362.658],"YL Right Cuff" : [-1133.384,-381.825],"YL Left Cuff" : [-1133.344,-345.787],"YL Inside Cowl" : [-1149.586,-458.785],"YL Right Sleeve" : [-421.241,-395.171],"YL Outside Cowl" : [-294.362,-402.287],"YL Left Sleeve" : [-421.241,-460.414],"YL Right Side Panel" : [-934.469,-391.189],"YL Left Side Panel" : [-1222.324,-391.183],"YL Collar" : [-1149.719,-421.372],"YL Back" : [-629.003,-362.208],"YL Front" : [-815.748,-362.611]},
			"YXL" : {"YXL Binding" : [-1150.775,-609.63],"YXL Right Cuff" : [-1133.29,-629.078],"YXL Left Cuff" : [-1133.344,-593.04],"YXL Inside Cowl" : [-1155.717,-706.041],"YXL Right Sleeve" : [-421.241,-642.132],"YXL Outside Cowl" : [-300.497,-649.54],"YXL Left Sleeve" : [-421.241,-707.957],"YXL Right Side Panel" : [-934.469,-632.846],"YXL Left Side Panel" : [-1222.324,-632.841],"YXL Collar" : [-1149.724,-668.625],"YXL Back" : [-634.987,-605.865],"YXL Front" : [-821.772,-606.264]},
			"Y2XL" : {"Y2XL Outside Cowl" : [-306.742,-900.54],"Y2XL Left Sleeve" : [-421.241,-958.957],"Y2XL Right Sleeve" : [-421.241,-893.132],"Y2XL Binding" : [-1150.358,-864.657],"Y2XL Back" : [-640.978,-856.865],"Y2XL Front" : [-827.792,-857.264],"Y2XL Right Side Panel" : [-934.473,-883.846],"Y2XL Left Cuff" : [-1132.469,-844.04],"Y2XL Right Cuff" : [-1132.469,-880.078],"Y2XL Collar" : [-1149.718,-919.625],"Y2XL Inside Cowl" : [-1161.966,-957.041],"Y2XL Left Side Panel" : [-1222.328,-883.841]}
		}
	},

	//////////
	//Soccer//
	//////////

	"FD_858" : 
	{
		"mockupSize" : "XL",
		"sizes": ["S", "M", "L", "XL", "2XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Collar 2", "Left Sleeve"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Left Sleeve" : [-278.51,321.708],"S Right Sleeve" : [-278.51,201.739],"S Collar 2" : [-904.889,236.47],"S Collar" : [-907.654,207.806],"S Back" : [-512.071,333.86],"S Front" : [-754.024,333.658]},
			"M" : {"M Left Sleeve" : [-281.635,42.175],"M Right Sleeve" : [-281.635,-79.594],"M Collar 2" : [-906.818,-30.374],"M Collar" : [-908.407,-59.045],"M Back" : [-517.467,55.608],"M Front" : [-759.424,55.893]},
			"L" : {"L Left Sleeve" : [-284.459,-260.945],"L Right Sleeve" : [-284.459,-384.514],"L Collar 2" : [-907.459,-336.295],"L Collar" : [-910.515,-364.959],"L Back" : [-522.872,-245.697],"L Front" : [-764.824,-245.455]},
			"XL" : {"XL Left Sleeve" : [-287.55,-579.426],"XL Right Sleeve" : [-287.55,-704.795],"XL Collar 2" : [-909.361,-655.486],"XL Collar" : [-911.264,-684.157],"XL Back" : [-529.584,-562.394],"XL Front" : [-771.074,-562.155]},
			"2XL" : {"2XL Left Sleeve" : [-290.356,-911.468],"2XL Right Sleeve" : [-290.356,-1038.637],"2XL Collar 2" : [-909.989,-990.693],"2XL Collar" : [-912.874,-1019.361],"2XL Back" : [-534.984,-892.646],"2XL Front" : [-776.474,-892.412]}
		}
	},
	"FD_858Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"YS" : {"YS Left Sleeve" : [-212.212,27.036],"YS Collar 2" : [-718.232,-31.692],"YS Collar" : [-721.074,-68.237],"YS Right Sleeve" : [-212.009,-81.8],"YS Back" : [-397.81,29.518],"YS Front" : [-586.277,29.724]},
			"YM" : {"YM Left Sleeve" : [-215.132,-189.384],"YM Collar 2" : [-720.216,-250.28],"YM Collar" : [-722.734,-286.825],"YM Right Sleeve" : [-215.131,-298.221],"YM Back" : [-402.347,-183.693],"YM Front" : [-590.811,-183.558]},
			"YL" : {"YL Left Sleeve" : [-218.666,-415.6],"YL Collar 2" : [-722.2,-479.53],"YL Collar" : [-724.403,-516.075],"YL Right Sleeve" : [-218.666,-524.436],"YL Back" : [-406.879,-407.417],"YL Front" : [-595.347,-407.297]},
			"YXL" : {"YXL Left Sleeve" : [-222.75,-654.244],"YXL Collar 2" : [-724.137,-720.985],"YXL Collar" : [-726.103,-757.549],"YXL Right Sleeve" : [-222.75,-763.081],"YXL Back" : [-411.275,-643.654],"YXL Front" : [-599.736,-643.512]}
		}
	},
	"FD_3061" :
	{
		"mockupSize" : "XL",
		"sizes": ["S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-453.064,205.341],"S Left Sleeve" : [-271.589,205.342],"S Back" : [-665.736,274.017],"S Front" : [-902.927,271.511],"S Collar" : [-1147.686,173.189]},
			"M" : {"M Right Sleeve" : [-455.193,-53.542],"M Left Sleeve" : [-273.719,-53.542],"M Back" : [-671.142,14.666],"M Front" : [-908.328,12.143],"M Collar" : [-1150.452,-89.293]},
			"L" : {"L Right Sleeve" : [-457.709,-320.476],"L Left Sleeve" : [-276.23,-320.47],"L Back" : [-676.543,-252.277],"L Front" : [-913.727,-254.809],"L Collar" : [-1152.007,-359.824]},
			"XL" : {"XL Right Sleeve" : [-460.073,-593.249],"XL Left Sleeve" : [-278.594,-593.249],"XL Back" : [-681.942,-525.065],"XL Front" : [-919.127,-527.607],"XL Collar" : [-1155.34,-636.202]},
			"2XL" : {"2XL Right Sleeve" : [-462.435,-871.609],"2XL Left Sleeve" : [-280.96,-871.612],"2XL Back" : [-687.336,-803.437],"2XL Front" : [-924.523,-805.984],"2XL Collar" : [-1157.119,-918.161]}
		}
	},
	"FD_3061Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"YS" : {"YS Left Sleeve" : [-372.211,-35.464],"YS Right Sleeve" : [-210.627,-35.466],"YS Back" : [-561.593,7.178],"YS Front" : [-751.71,4.607],"YS Collar" : [-967.885,-70.68]},
			"YM" : {"YM Left Sleeve" : [-376.805,-252.152],"YM Right Sleeve" : [-215.227,-252.152],"YM Back" : [-566.093,-206.361],"YM Front" : [-756.206,-208.929],"YM Collar" : [-970.373,-289.626]},
			"YL" : {"YL Left Sleeve" : [-381.151,-480.688],"YL Right Sleeve" : [-219.572,-480.688],"YL Back" : [-570.593,-431.753],"YL Front" : [-760.71,-434.313],"YL Collar" : [-972.217,-520.412]},
			"YXL" : {"YXL Left Sleeve" : [-385.388,-718.845],"YXL Right Sleeve" : [-223.809,-718.838],"YXL Back" : [-575.087,-666.759],"YXL Front" : [-765.209,-669.317],"YXL Collar" : [-974.183,-760.815]}
		}
	},
	"FD_3062" :
	{
		"mockupSize" : "XL",
		"sizes": ["S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-415.286,196.165],"S Left Sleeve" : [-244.9,196.165],"S Back" : [-617.06,246.967],"S Front" : [-836.253,244.637],"S Collar Triangle" : [-1001.283,174.2],"S Collar" : [-1061.642,101.674]},
			"M" : {"M Right Sleeve" : [-417.421,-62.129],"M Left Sleeve" : [-247.034,-62.129],"M Back" : [-622.46,-11.784],"M Front" : [-841.654,-14.139],"M Collar Triangle" : [-1002.043,-86.787],"M Collar" : [-1063.727,-160.22]},
			"L" : {"L Right Sleeve" : [-419.933,-327.161],"L Left Sleeve" : [-249.546,-327.161],"L Back" : [-627.861,-276.821],"L Front" : [-847.053,-279.193],"L Collar Triangle" : [-1002.226,-355.441],"L Collar" : [-1065.807,-428.852]},
			"XL" : {"XL Right Sleeve" : [-422.297,-597.817],"XL Left Sleeve" : [-251.911,-597.818],"XL Back" : [-633.261,-547.481],"XL Front" : [-852.454,-549.862],"XL Collar Triangle" : [-1002.508,-629.683],"XL Collar" : [-1067.896,-703.108]},
			"2XL" : {"2XL Right Sleeve" : [-424.662,-877.394],"2XL Left Sleeve" : [-254.276,-877.394],"2XL Back" : [-638.656,-827.063],"2XL Front" : [-857.854,-829.456],"2XL Collar Triangle" : [-1002.722,-912.869],"2XL Collar" : [-1069.983,-986.286]}
		}
	},
	"FD_3062Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"YS" : {"YS Right Sleeve" : [-405.385,-15.684],"YS Left Sleeve" : [-240.664,-15.684],"YS Back" : [-594.295,26.495],"YS Collar Triangle" : [-931.473,-17.502],"YS Front" : [-783.382,24.094],"YS Collar" : [-981.4,-83.648]},
			"YM" : {"YM Right Sleeve" : [-409.985,-231.685],"YM Left Sleeve" : [-245.264,-231.684],"YM Back" : [-598.795,-186.359],"YM Collar Triangle" : [-931.744,-235.756],"YM Front" : [-787.882,-188.757],"YM Collar" : [-983.483,-301.912]},
			"YL" : {"YL Right Sleeve" : [-414.33,-458.479],"YL Left Sleeve" : [-249.609,-458.472],"YL Back" : [-603.291,-410.006],"YL Collar Triangle" : [-932.04,-464.801],"YL Front" : [-792.381,-412.401],"YL Collar" : [-985.57,-530.957]},
			"YXL" : {"YXL Right Sleeve" : [-418.568,-698.236],"YXL Left Sleeve" : [-253.846,-698.237],"YXL Back" : [-607.795,-646.616],"YXL Collar Triangle" : [-932.303,-706.791],"YXL Front" : [-796.882,-649.009],"YXL Collar" : [-987.654,-772.905]}
		}
	},
	"FD_3063" :
	{
		"mockupSize" : "XL",
		"sizes": ["S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Placket" : [-864.691,247.723],"S Right Sleeve" : [-255.12,142.782],"S Outside Collar" : [-905.502,120.448],"S Binding" : [-905.123,192.206],"S Inside Collar" : [-905.504,167.169],"S Left Sleeve" : [-255.12,274.977],"S Back" : [-474.126,281.149],"S Front" : [-713.052,281.166]},
			"M" : {"M Placket" : [-864.863,-19.309],"M Right Sleeve" : [-258.042,-123.416],"M Outside Collar" : [-906.839,-146.665],"M Binding" : [-905.123,-74.89],"M Inside Collar" : [-906.839,-99.944],"M Left Sleeve" : [-258.042,8.779],"M Back" : [-479.526,17.606],"M Front" : [-718.452,17.624]},
			"L" : {"L Placket" : [-865.027,-295.136],"L Right Sleeve" : [-261.084,-398.265],"L Outside Collar" : [-908.731,-422.418],"L Binding" : [-905.123,-350.636],"L Inside Collar" : [-908.73,-375.696],"L Left Sleeve" : [-261.083,-266.07],"L Back" : [-484.926,-254.563],"L Front" : [-723.852,-254.55]},
			"XL" : {"XL Placket" : [-865.192,-576.908],"XL Right Sleeve" : [-264.118,-679.062],"XL Outside Collar" : [-910.678,-704.121],"XL Binding" : [-905.123,-632.331],"XL Inside Collar" : [-910.674,-657.402],"XL Left Sleeve" : [-264.122,-546.867],"XL Back" : [-490.325,-532.684],"XL Front" : [-729.252,-532.671]},
			"2XL" : {"2XL Placket" : [-865.365,-864.659],"2XL Right Sleeve" : [-267.16,-965.849],"2XL Outside Collar" : [-913.718,-991.813],"2XL Binding" : [-905.123,-920.017],"2XL Inside Collar" : [-913.718,-945.091],"2XL Left Sleeve" : [-267.16,-833.654],"2XL Back" : [-495.725,-816.791],"2XL Front" : [-734.652,-816.778]}
		}
	},
	"FD_3063Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"YS" : {"YS Placket" : [-751.095,31.333],"YS Right Sleeve" : [-238.247,-74.508],"YS Outside Collar" : [-782.867,-108.096],"YS Left Sleeve" : [-238.248,35.329],"YS Inside Collar" : [-782.867,-26.052],"YS Binding" : [-792.325,-78.617],"YS Back" : [-424.702,34.867],"YS Front" : [-615.021,35.186]},
			"YM" : {"YM Placket" : [-751.286,-195.267],"YM Right Sleeve" : [-240.641,-300.689],"YM Outside Collar" : [-784.807,-334.742],"YM Left Sleeve" : [-240.644,-190.853],"YM Inside Collar" : [-784.807,-252.702],"YM Binding" : [-792.325,-305.245],"YM Back" : [-429.201,-186.378],"YM Front" : [-619.524,-186.072]},
			"YL" : {"YL Placket" : [-751.476,-427.146],"YL Right Sleeve" : [-244.343,-532.154],"YL Outside Collar" : [-786.754,-566.669],"YL Left Sleeve" : [-244.342,-422.318],"YL Inside Collar" : [-786.75,-484.63],"YL Binding" : [-792.325,-537.159],"YL Back" : [-433.701,-412.908],"YL Front" : [-624.024,-412.609]},
			"YXL" : {"YXL Placket" : [-751.666,-669.888],"YXL Right Sleeve" : [-248.05,-774.483],"YXL Outside Collar" : [-788.768,-809.459],"YXL Left Sleeve" : [-248.05,-664.647],"YXL Inside Collar" : [-788.694,-727.423],"YXL Binding" : [-792.325,-779.937],"YXL Back" : [-438.2,-650.297],"YXL Front" : [-628.524,-650.005]}
		}
	},
	"FD_3064" :
	{
		"mockupSize" : "XL",
		"sizes": ["S", "M", "L", "XL", "2XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Collar", "Left Sleeve"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-265.575,256.887],"S Left Sleeve" : [-265.576,131.73],"S Back" : [-489.464,263.076],"S Collar" : [-944.177,159.077],"S Front" : [-716.542,263.091]},
			"M" : {"M Right Sleeve" : [-268.115,-7.808],"M Left Sleeve" : [-268.115,-134.759],"M Back" : [-494.478,0.135],"M Collar" : [-946.023,-107.229],"M Front" : [-721.556,0.157]},
			"L" : {"L Right Sleeve" : [-271.152,-279.417],"L Left Sleeve" : [-271.156,-408.164],"L Back" : [-499.882,-269.706],"L Collar" : [-948.295,-380.836],"L Front" : [-726.955,-269.676]},
			"XL" : {"XL Right Sleeve" : [-274.191,-558.133],"XL Left Sleeve" : [-274.195,-688.676],"XL Back" : [-505.278,-546.646],"XL Collar" : [-950.894,-661.348],"XL Front" : [-732.359,-546.61]},
			"2XL" : {"2XL Right Sleeve" : [-277.233,-844.04],"2XL Left Sleeve" : [-277.23,-976.38],"2XL Back" : [-510.678,-830.768],"2XL Collar" : [-953.123,-949.052],"2XL Front" : [-737.755,-830.733]}
		}
	},
	"FD_3064Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"YS" : {"YS Right Sleeve" : [-204.765,-78.742],"YS Left Sleeve" : [-204.771,31.095],"YS Back" : [-391.224,39.474],"YS Front" : [-582.803,39.526],"YS Collar" : [-782.464,-41.174]},
			"YM" : {"YM Right Sleeve" : [-207.166,-304.119],"YM Left Sleeve" : [-207.167,-194.282],"YM Back" : [-395.727,-181.437],"YM Front" : [-587.303,-181.378],"YM Collar" : [-785.45,-267.459]},
			"YL" : {"YL Right Sleeve" : [-210.869,-539.377],"YL Left Sleeve" : [-210.865,-429.541],"YL Back" : [-400.223,-412.225],"YL Front" : [-591.802,-412.159],"YL Collar" : [-787.247,-503.615]},
			"YXL" : {"YXL Right Sleeve" : [-214.571,-781.428],"YXL Left Sleeve" : [-214.567,-671.591],"YXL Back" : [-404.723,-649.797],"YXL Front" : [-596.302,-649.727],"YXL Collar" : [-789.577,-746.561]}
		}
	},
	"FD_3092" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"S" : {"S Right Cuff" : [-1132.387,261.221],"S Right Sleeve" : [-275.672,280.887],"S Left Cuff" : [-1133.219,161.922],"S Left Sleeve" : [-492.258,280.884],"S Right Liner 2" : [-1224.42,309.936],"S Right Liner" : [-1224.42,209.936],"S Left Liner 2" : [-1324.918,309.928],"S Left Liner" : [-1324.918,209.928],"S Back" : [-739.41,306.024],"S Collar" : [-1325.944,98.571],"S Front" : [-987.742,305.788]},
			"M" : {"M Right Cuff" : [-1134.311,-12.964],"M Right Sleeve" : [-281.128,8.503],"M Left Cuff" : [-1135.343,-112.263],"M Left Sleeve" : [-497.717,8.503],"M Right Liner 2" : [-1225.244,36.157],"M Right Liner" : [-1225.244,-63.843],"M Left Liner 2" : [-1325.742,36.153],"M Left Liner" : [-1325.742,-63.847],"M Back" : [-744.823,35.259],"M Collar" : [-1327.108,-175.613],"M Front" : [-993.138,35.203]},
			"L" : {"L Right Cuff" : [-1135.861,-293.075],"L Right Sleeve" : [-286.592,-269.808],"L Left Cuff" : [-1136.625,-392.377],"L Left Sleeve" : [-503.173,-269.808],"L Right Liner 2" : [-1226.074,-243.428],"L Right Liner" : [-1226.074,-343.428],"L Left Liner 2" : [-1326.57,-243.432],"L Left Liner" : [-1326.57,-343.432],"L Back" : [-749.869,-241.541],"L Collar" : [-1327.621,-455.727],"L Front" : [-998.538,-241.322]},
			"XL" : {"XL Right Cuff" : [-1137.89,-578.805],"XL Right Sleeve" : [-292.048,-553.731],"XL Left Cuff" : [-1138.803,-678.101],"XL Left Sleeve" : [-508.638,-553.731],"XL Right Liner 2" : [-1226.904,-528.599],"XL Right Liner" : [-1226.904,-628.599],"XL Left Liner 2" : [-1327.401,-528.608],"XL Left Liner" : [-1327.401,-628.608],"XL Back" : [-755.269,-523.672],"XL Collar" : [-1328.81,-741.458],"XL Front" : [-1003.939,-523.459]},
			"2XL" : {"2XL Right Cuff" : [-1139.721,-874.778],"2XL Right Sleeve" : [-297.505,-847.903],"2XL Left Cuff" : [-1140.607,-974.077],"2XL Left Sleeve" : [-514.097,-847.9],"2XL Right Liner 2" : [-1227.749,-824.016],"2XL Right Liner" : [-1227.749,-924.016],"2XL Left Liner 2" : [-1328.251,-824.018],"2XL Left Liner" : [-1328.251,-924.018],"2XL Back" : [-760.669,-816.049],"2XL Collar" : [-1329.758,-1037.43],"2XL Front" : [-1009.339,-815.843]}
		}
	},
	"FD_3092Y" :
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" :
		{
			"YS" : {"YS Right Cuff" : [-933.042,-77.291],"YS Right Sleeve" : [-437.499,15.054],"YS Left Cuff" : [-933.706,-6.481],"YS Left Sleeve" : [-261.012,15.056],"YS Right Liner 2" : [-1007.822,44.68],"YS Right Liner" : [-1007.822,-55.32],"YS Left Liner 2" : [-1083.02,45.206],"YS Left Liner" : [-1083.02,-54.794],"YS Back" : [-627.768,29.963],"YS Collar" : [-1086.311,-140.089],"YS Front" : [-809.778,30.62]},
			"YM" : {"YM Right Cuff" : [-936.746,-319.496],"YM Right Sleeve" : [-440.662,-223.732],"YM Left Cuff" : [-937.296,-248.685],"YM Left Sleeve" : [-264.177,-223.732],"YM Right Liner 2" : [-1008.648,-196.993],"YM Right Liner" : [-1008.648,-296.993],"YM Left Liner 2" : [-1083.845,-196.466],"YM Left Liner" : [-1083.845,-296.466],"YM Back" : [-631.564,-207.767],"YM Collar" : [-1087.134,-382.295],"YM Front" : [-813.838,-207.145]},
			"YL" : {"YL Right Cuff" : [-940.372,-562.248],"YL Right Sleeve" : [-444.111,-462.952],"YL Left Cuff" : [-940.896,-491.433],"YL Left Sleeve" : [-267.626,-462.951],"YL Right Liner 2" : [-1009.467,-439.201],"YL Right Liner" : [-1009.467,-539.201],"YL Left Liner 2" : [-1084.665,-438.671],"YL Left Liner" : [-1084.665,-538.671],"YL Back" : [-636.056,-445.954],"YL Collar" : [-1088.08,-625.046],"YL Front" : [-818.275,-445.341]},
			"YXL" : {"YXL Right Cuff" : [-943.968,-805.776],"YXL Right Sleeve" : [-447.689,-702.71],"YXL Left Cuff" : [-944.633,-734.966],"YXL Left Sleeve" : [-271.203,-702.71],"YXL Right Liner 2" : [-1010.299,-682.157],"YXL Right Liner" : [-1010.299,-782.157],"YXL Left Liner 2" : [-1085.496,-681.631],"YXL Left Liner" : [-1085.496,-781.631],"YXL Back" : [-640.518,-685.067],"YXL Collar" : [-1089.03,-868.574],"YXL Front" : [-822.686,-684.439]}
		}
	},
	"FD_857" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"placement" : 
		{
			"S" : {"S Left Leg Panel" : [-359.731,338.823],"S Right Leg Panel" : [-643.632,338.746]},
			"M" : {"M Left Leg Panel" : [-363.789,129.344],"M Right Leg Panel" : [-647.691,129.267]},
			"L" : {"L Left Leg Panel" : [-367.783,-87.207],"L Right Leg Panel" : [-651.685,-87.284]},
			"XL" : {"XL Left Leg Panel" : [-371.906,-309.422],"XL Right Leg Panel" : [-655.808,-309.5]},
			"2XL" : {"2XL Left Leg Panel" : [-375.822,-538.23],"2XL Right Leg Panel" : [-659.723,-538.307]},
			"3XL" : {"3XL Left Leg Panel" : [-379.945,-772.811],"3XL Right Leg Panel" : [-663.847,-772.889]}
		}
	},
	"FD_857Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"placement" : 
		{
			"YS" : {"YS Left Leg Panel" : [-336.523,65.918],"YS Right Leg Panel" : [-579.598,65.661]},
			"YM" : {"YM Left Leg Panel" : [-339.793,-117.51],"YM Right Leg Panel" : [-582.866,-117.768]},
			"YL" : {"YL Left Leg Panel" : [-342.877,-305.002],"YL Right Leg Panel" : [-585.952,-305.26]},
			"YXL" : {"YXL Left Leg Panel" : [-346.139,-495.993],"YXL Right Leg Panel" : [-589.212,-496.25]}
		}
	},

	//////////////
	//Volleyball//
	//////////////
	"FD_284" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-851.665,576.282],"XXS Left Sleeve" : [-753.83,533.347],"XXS Right Sleeve" : [-904.588,533.347],"XXS Back" : [-397.093,635.3],"XXS Front" : [-588.165,630.746]},
			"XS" : {"XS Collar" : [-851.665,334.234],"XS Left Sleeve" : [-753.83,291.299],"XS Right Sleeve" : [-904.588,291.299],"XS Back" : [-400.826,394.853],"XS Front" : [-591.907,391.977]},
			"S" : {"S Collar" : [-851.665,89.115],"S Left Sleeve" : [-753.83,46.18],"S Right Sleeve" : [-904.588,46.18],"S Back" : [-406.225,151.032],"S Front" : [-593.428,149.866]},
			"M" : {"M Collar" : [-853.465,-157.4],"M Left Sleeve" : [-755.141,-199.405],"M Right Sleeve" : [-905.898,-199.405],"M Back" : [-409.819,-93.782],"M Front" : [-597.303,-93.948]},
			"L" : {"L Collar" : [-853.465,-409.186],"L Left Sleeve" : [-754.773,-450.396],"L Right Sleeve" : [-905.531,-450.396],"L Back" : [-412.883,-343.818],"L Front" : [-600.462,-343.186]},
			"XL" : {"XL Collar" : [-857.065,-671.471],"XL Left Sleeve" : [-755.78,-711.823],"XL Right Sleeve" : [-906.538,-711.823],"XL Back" : [-416.55,-602.551],"XL Front" : [-604.017,-602.667]},
			"2XL" : {"2XL Collar" : [-857.065,-936.892],"2XL Left Sleeve" : [-757.009,-976.147],"2XL Right Sleeve" : [-907.767,-976.147],"2XL Back" : [-419.941,-866.172],"2XL Front" : [-607.987,-865.456]}
		}
	},
	"FD_285" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL"],
		"scaleFrontLogo" : false,
		"smallestScale" : 3,
		"smallestWidth" : 10.8,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-1013.303,457.224],"XXS Left Sleeve" : [-313.468,536.984],"XXS Right Sleeve" : [-464.226,536.984],"XXS Back" : [-612.731,548.162],"XXS Front" : [-803.803,544.746]},
			"XS" : {"XS Collar" : [-1013.303,216.796],"XS Left Sleeve" : [-313.468,297.456],"XS Right Sleeve" : [-464.226,297.456],"XS Back" : [-616.464,309.421],"XS Front" : [-807.545,305.976]},
			"S" : {"S Collar" : [-1013.303,-27.931],"S Left Sleeve" : [-313.468,53.395],"S Right Sleeve" : [-464.226,53.395],"S Back" : [-621.863,67.24],"S Front" : [-809.066,63.865]},
			"M" : {"M Collar" : [-1015.103,-273.424],"M Left Sleeve" : [-314.779,-191.429],"M Right Sleeve" : [-465.536,-191.429],"M Back" : [-625.457,-176.622],"M Front" : [-812.941,-179.949]},
			"L" : {"L Collar" : [-1015.103,-524.497],"L Left Sleeve" : [-314.411,-441.912],"L Right Sleeve" : [-465.169,-441.912],"L Back" : [-628.521,-425.846],"L Front" : [-816.1,-429.186]},
			"XL" : {"XL Collar" : [-1018.703,-785.693],"XL Left Sleeve" : [-315.418,-702.205],"XL Right Sleeve" : [-466.176,-702.205],"XL Back" : [-632.188,-685.198],"XL Front" : [-819.655,-688.667]},
			"2XL" : {"2XL Collar" : [-1018.703,-1050.459],"2XL Left Sleeve" : [-316.647,-967.374],"2XL Right Sleeve" : [-467.405,-967.374],"2XL Back" : [-635.579,-948.157],"2XL Front" : [-823.625,-951.457]}
		}
	},


	///////////
	//Hoodies//
	///////////
	"FDMH" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" : 
		{
			"S" : {"S Waistband" : [-1894.768,781.17],"S Right Inside Hood" : [-1218.368,838.05],"S Left Outside Hood" : [-1218.368,991.71],"S Left Inside Hood" : [-1363.488,838.05],"S Right Outside Hood" : [-1363.488,991.71],"S Left Cuff" : [-1733.778,839.159],"S Left Sleeve" : [-310.758,928.159],"S Right Cuff" : [-1894.768,839.159],"S Right Sleeve" : [-532.888,928.159],"S Pocket" : [-1588.588,915.739],"S Back" : [-790.328,946.159],"S Front" : [-1041.458,945.159]},
			"M" : {"M Waistband" : [-1894.768,441.17],"M Right Inside Hood" : [-1220.008,502.159],"M Left Outside Hood" : [-1220.008,655.819],"M Left Inside Hood" : [-1365.128,502.159],"M Right Outside Hood" : [-1365.128,655.819],"M Left Cuff" : [-1736.498,497.159],"M Left Sleeve" : [-316.388,619.579],"M Right Cuff" : [-1894.768,497.159],"M Right Sleeve" : [-538.518,619.609],"M Pocket" : [-1590.658,600.659],"M Back" : [-795.728,637.72],"M Front" : [-1046.858,636.77]},
			"L" : {"L Waistband" : [-1894.768,127.02],"L Right Inside Hood" : [-1221.698,160.13],"L Left Outside Hood" : [-1221.698,313.779],"L Left Inside Hood" : [-1366.818,160.13],"L Right Outside Hood" : [-1366.818,313.779],"L Left Cuff" : [-1739.158,185.01],"L Left Sleeve" : [-321.728,271.329],"L Right Cuff" : [-1894.768,185.01],"L Right Sleeve" : [-543.858,271.329],"L Pocket" : [-1592.728,267.409],"L Back" : [-801.128,299.149],"L Front" : [-1052.258,298.18]},
			"XL" : {"XL Waistband" : [-1894.768,-207.58],"XL Right Inside Hood" : [-1223.548,-178.391],"XL Left Outside Hood" : [-1223.548,-24.74],"XL Left Inside Hood" : [-1368.658,-178.391],"XL Right Outside Hood" : [-1368.658,-24.74],"XL Left Cuff" : [-1743.268,-147.601],"XL Left Sleeve" : [-326.048,-75.23],"XL Right Cuff" : [-1894.768,-147.601],"XL Right Sleeve" : [-548.178,-75.23],"XL Pocket" : [-1594.798,-71.28],"XL Back" : [-806.528,-35.851],"XL Front" : [-1057.648,-36.881]},
			"2XL" : {"2XL Waistband" : [-1894.768,-546.99],"2XL Right Inside Hood" : [-1225.388,-515.841],"2XL Left Outside Hood" : [-1225.388,-362.181],"2XL Left Inside Hood" : [-1370.508,-515.841],"2XL Right Outside Hood" : [-1370.508,-362.181],"2XL Left Cuff" : [-1747.778,-487],"2XL Left Sleeve" : [-330.758,-383.41],"2XL Right Cuff" : [-1894.768,-487],"2XL Right Sleeve" : [-552.878,-383.41],"2XL Pocket" : [-1596.858,-418.791],"2XL Back" : [-811.928,-371.641],"2XL Front" : [-1063.048,-372.711]},
			"3XL" : {"3XL Waistband 2" : [-1659.768,-944.14],"3XL Waistband" : [-1894.768,-944.14],"3XL Right Inside Hood" : [-1227.288,-882.81],"3XL Left Outside Hood" : [-1227.288,-729.15],"3XL Left Inside Hood" : [-1372.408,-882.81],"3XL Right Outside Hood" : [-1372.408,-729.15],"3XL Left Cuff" : [-1750.628,-884.281],"3XL Left Sleeve" : [-335.498,-737.46],"3XL Right Cuff" : [-1894.768,-884.281],"3XL Right Sleeve" : [-557.628,-737.63],"3XL Pocket" : [-1598.928,-781.98],"3XL Back" : [-817.328,-735.15],"3XL Front" : [-1068.448,-736.21]},
			"4XL" : {"4XL Waistband 2" : [-1659.768,-1315.06],"4XL Waistband" : [-1894.768,-1315.06],"4XL Right Inside Hood" : [-1229.178,-1236.82],"4XL Left Outside Hood" : [-1229.178,-1083.16],"4XL Left Inside Hood" : [-1374.298,-1236.82],"4XL Right Outside Hood" : [-1374.298,-1083.16],"4XL Left Cuff" : [-1752.648,-1252.08],"4XL Left Sleeve" : [-340.298,-1131.531],"4XL Right Cuff" : [-1894.768,-1252.08],"4XL Right Sleeve" : [-562.418,-1131.531],"4XL Pocket" : [-1600.988,-1143.041],"4XL Back" : [-822.728,-1087.541],"4XL Front" : [-1073.848,-1088.601]},
			"5XL" : {"5XL Waistband 2" : [-1659.768,-1654.101],"5XL Waistband" : [-1894.768,-1654.101],"5XL Right Inside Hood" : [-1231.078,-1600.89],"5XL Left Outside Hood" : [-1231.078,-1447.23],"5XL Left Inside Hood" : [-1376.198,-1600.89],"5XL Right Outside Hood" : [-1376.198,-1447.23],"5XL Left Cuff" : [-1755.418,-1594.111],"5XL Left Sleeve" : [-345.078,-1484.511],"5XL Right Cuff" : [-1894.768,-1594.111],"5XL Right Sleeve" : [-567.208,-1484.511],"5XL Pocket" : [-1603.058,-1499.181],"5XL Back" : [-828.118,-1449.9],"5XL Front" : [-1079.248,-1451.041]}
		}
	},
	"FDWH" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 7.2,
		"smallestScale" : 2,
		"placement" : 
		{
			"XXS" : {"XXS Right Inside Hood" : [-1052.604,660.139],"XXS Left Outside Hood" : [-1052.604,813.783],"XXS Left Inside Hood" : [-1146.754,660.087],"XXS Right Outside Hood" : [-1146.754,813.732],"XXS Right Cuff" : [-1532.738,712.768],"XXS Right Sleeve" : [-221.947,750.486],"XXS Waistband" : [-1494.535,648.406],"XXS Left Cuff" : [-1266.495,711.907],"XXS Left Sleeve" : [-415.463,751.074],"XXS Pocket" : [-1425.206,727.068],"XXS Back" : [-657.921,752.696],"XXS Front" : [-891.565,747.755]},
			"XS" : {"XS Right Inside Hood" : [-1054.156,341.835],"XS Left Outside Hood" : [-1054.156,495.484],"XS Left Inside Hood" : [-1148.306,341.824],"XS Right Outside Hood" : [-1148.306,495.484],"XS Right Cuff" : [-1533.476,397.875],"XS Right Sleeve" : [-226.627,449.984],"XS Waistband" : [-1501.736,325.654],"XS Left Cuff" : [-1267.396,397.875],"XS Left Sleeve" : [-419.916,451.955],"XS Pocket" : [-1427.766,414.684],"XS Back" : [-661.531,458.314],"XS Front" : [-895.159,456.595]},
			"S" : {"S Right Inside Hood" : [-1054.156,2.015],"S Left Outside Hood" : [-1054.156,155.665],"S Left Inside Hood" : [-1151.586,2.015],"S Right Outside Hood" : [-1151.576,155.665],"S Right Cuff" : [-1533.476,58.244],"S Right Sleeve" : [-230.697,113.014],"S Waistband" : [-1501.736,-13.976],"S Left Cuff" : [-1267.396,58.244],"S Left Sleeve" : [-423.986,115.014],"S Pocket" : [-1433.346,76.755],"S Back" : [-665.131,122.354],"S Front" : [-898.759,120.484]},
			"M" : {"M Right Inside Hood" : [-1054.156,-318.915],"M Left Outside Hood" : [-1054.156,-165.275],"M Left Inside Hood" : [-1154.936,-318.936],"M Right Outside Hood" : [-1154.936,-165.275],"M Right Cuff" : [-1535.476,-262.556],"M Right Sleeve" : [-234.737,-205.106],"M Waistband" : [-1511.736,-334.775],"M Left Cuff" : [-1269.396,-262.556],"M Left Sleeve" : [-428.016,-203.125],"M Pocket" : [-1435.096,-242.356],"M Back" : [-668.731,-194.785],"M Front" : [-902.359,-196.625]},
			"L" : {"L Right Inside Hood" : [-1054.156,-670.775],"L Left Outside Hood" : [-1054.156,-517.125],"L Left Inside Hood" : [-1158.336,-670.775],"L Right Outside Hood" : [-1158.336,-517.125],"L Right Cuff" : [-1536.476,-614.445],"L Right Sleeve" : [-238.947,-553.845],"L Waistband" : [-1522.736,-686.666],"L Left Cuff" : [-1270.396,-614.445],"L Left Sleeve" : [-432.236,-551.875],"L Pocket" : [-1436.866,-592.556],"L Back" : [-672.331,-543.005],"L Front" : [-905.959,-544.935]},
			"XL" : {"XL Right Inside Hood" : [-1054.156,-1004.316],"XL Left Outside Hood" : [-1054.156,-850.666],"XL Left Inside Hood" : [-1161.766,-1004.316],"XL Right Outside Hood" : [-1161.766,-850.666],"XL Right Cuff" : [-1538.476,-949.836],"XL Right Sleeve" : [-243.527,-886.086],"XL Waistband" : [-1535.736,-1022.056],"XL Left Cuff" : [-1273.396,-949.836],"XL Left Sleeve" : [-436.816,-884.115],"XL Pocket" : [-1438.626,-926.246],"XL Back" : [-677.741,-874.746],"XL Front" : [-911.369,-876.836]},
			"2XL" : {"2XL Right Inside Hood" : [-1054.156,-1337.965],"2XL Left Outside Hood" : [-1054.156,-1184.316],"2XL Left Inside Hood" : [-1165.336,-1337.976],"2XL Right Outside Hood" : [-1165.346,-1184.316],"2XL Right Cuff" : [-1539.476,-1283.556],"2XL Right Sleeve" : [-244.927,-1218.476],"2XL Waistband" : [-1547.736,-1355.775],"2XL Left Cuff" : [-1276.396,-1283.556],"2XL Left Sleeve" : [-438.216,-1216.306],"2XL Pocket" : [-1440.396,-1258.275],"2XL Back" : [-683.151,-1206.775],"2XL Front" : [-916.779,-1208.865]},
			"3XL" : {"3XL Right Inside Hood" : [-1056.606,-1627.636],"3XL Left Outside Hood" : [-1056.606,-1478.326],"3XL Left Inside Hood" : [-1167.786,-1627.636],"3XL Right Outside Hood" : [-1167.786,-1480.136],"3XL Right Cuff" : [-1279.126,-1543.056],"3XL Right Sleeve" : [-248.667,-1508.086],"3XL Waistband" : [-1560.476,-1650.505],"3XL Left Cuff" : [-1542.316,-1542.726],"3XL Left Sleeve" : [-441.956,-1508.076],"3XL Pocket" : [-1444.006,-1516.165],"3XL Back" : [-690.491,-1497.426],"3XL Front" : [-924.109,-1502.365]}
		}
	},

	"FDYH" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 10.8,
		"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Waistband" : [-1295.448,58.482],"YS Right Inside Hood" : [-847.198,-27.438],"YS Left Outside Hood" : [-847.198,127.212],"YS Left Inside Hood" : [-950.578,-27.428],"YS Right Outside Hood" : [-950.578,127.212],"YS Right Cuff" : [-1227.608,-31.518],"YS Right Sleeve" : [-223.648,59.412],"YS Left Cuff" : [-1327.618,-31.518],"YS Left Sleeve" : [-364.318,59.412],"YS Pocket" : [-1126.358,-14.388],"YS Back" : [-541.918,80.492],"YS Front" : [-721.988,75.792]},
			"YM" : {"YM Waistband" : [-1306.018,-243.368],"YM Left Outside Hood" : [-847.198,-173.948],"YM Right Inside Hood" : [-847.198,-328.588],"YM Left Inside Hood" : [-954.168,-328.588],"YM Right Outside Hood" : [-954.178,-173.948],"YM Right Cuff" : [-1228.518,-333.368],"YM Right Sleeve" : [-229.148,-240.708],"YM Left Cuff" : [-1327.698,-333.368],"YM Left Sleeve" : [-369.818,-240.708],"YM Pocket" : [-1129.958,-316.228],"YM Back" : [-547.318,-218.218],"YM Front" : [-727.388,-222.718]},
			"YL" : {"YL Waistband" : [-1316.568,-564.328],"YL Right Inside Hood" : [-847.198,-647.258],"YL Left Outside Hood" : [-847.198,-492.598],"YL Left Inside Hood" : [-957.768,-647.258],"YL Right Outside Hood" : [-957.768,-492.608],"YL Right Cuff" : [-1229.258,-654.318],"YL Right Sleeve" : [-234.458,-559.628],"YL Left Cuff" : [-1329.008,-654.318],"YL Left Sleeve" : [-375.118,-559.548],"YL Pocket" : [-1131.868,-636.288],"YL Back" : [-552.718,-536.028],"YL Front" : [-732.788,-540.328]},
			"YXL" : {"YXL Waistband" : [-1328.558,-893.368],"YXL Right Inside Hood" : [-847.198,-974.038],"YXL Left Outside Hood" : [-847.198,-819.388],"YXL Left Inside Hood" : [-961.378,-974.038],"YXL Right Outside Hood" : [-961.378,-819.388],"YXL Right Cuff" : [-1231.008,-983.358],"YXL Right Sleeve" : [-238.608,-886.648],"YXL Left Cuff" : [-1330.268,-983.368],"YXL Left Sleeve" : [-379.278,-886.648],"YXL Pocket" : [-1133.768,-964.428],"YXL Back" : [-558.118,-861.928],"YXL Front" : [-738.188,-866.028]}
		}
	},

	"FD_7025" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"scaleFrontLogo" : false,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"pieces" : ["Right Side Panel", "Front", "Left Side Panel", "Back", "Left Sleeve", "Right Sleeve", "Inside Collar", "Outside Collar", "Garage", "Left Zipper Facing", "Right Zipper Facing"],
		"placement" :
		{
			"S" : {"S Right Zipper Facing" : [-1214.286,862.592],"S Left Zipper Facing" : [-1280.547,862.69],"S Garage" : [-1246.724,799.947],"S Outside Collar" : [-742.108,947.076],"S Inside Collar" : [-1313.83,756.25],"S Right Sleeve" : [-280.399,917.067],"S Left Sleeve" : [-499.177,917.066],"S Back" : [-749.646,895.621],"S Left Side Panel" : [-1124.651,872.079],"S Front" : [-1005.248,893.623],"S Right Side Panel" : [-1393.211,872.081]},
			"M" : {"M Right Zipper Facing" : [-1226.194,542.161],"M Left Zipper Facing" : [-1292.298,542.255],"M Garage" : [-1258.475,479.451],"M Outside Collar" : [-743.909,630.443],"M Inside Collar" : [-1327.381,435.857],"M Right Sleeve" : [-285.72,599.464],"M Left Sleeve" : [-504.494,599.464],"M Back" : [-755.045,578.427],"M Left Side Panel" : [-1137.312,553.932],"M Front" : [-1009.037,576.749],"M Right Side Panel" : [-1405.873,553.931]},
			"L" : {"L Right Zipper Facing" : [-1215.186,211.134],"L Left Zipper Facing" : [-1281.447,211.229],"L Garage" : [-1247.624,148.486],"L Outside Collar" : [-745.707,303.257],"L Inside Collar" : [-1318.331,104.951],"L Right Sleeve" : [-291.033,271.419],"L Left Sleeve" : [-509.807,271.418],"L Back" : [-760.44,251.065],"L Left Side Panel" : [-1127.376,225.252],"L Front" : [-1012.811,249.349],"L Right Side Panel" : [-1395.934,225.252]},
			"XL" : {"XL Right Zipper Facing" : [-1217.757,-122.502],"XL Left Zipper Facing" : [-1283.494,-122.408],"XL Garage" : [-1249.723,-185.248],"XL Outside Collar" : [-747.509,-25.69],"XL Inside Collar" : [-1322.179,-228.597],"XL Right Sleeve" : [-296.495,-59.262],"XL Left Sleeve" : [-515.274,-59.258],"XL Back" : [-765.839,-79.866],"XL Left Side Panel" : [-1130.332,-106.065],"XL Front" : [-1016.592,-80.685],"XL Right Side Panel" : [-1398.893,-106.065]},
			"2XL" : {"2XL Right Zipper Facing" : [-1221.996,-464.06],"2XL Left Zipper Facing" : [-1287.466,-463.965],"2XL Garage" : [-1253.322,-526.866],"2XL Outside Collar" : [-749.313,-363.936],"2XL Inside Collar" : [-1327.629,-570.065],"2XL Right Sleeve" : [-301.976,-399.595],"2XL Left Sleeve" : [-520.747,-399.595],"2XL Back" : [-771.234,-417.831],"2XL Left Side Panel" : [-1134.891,-445.296],"2XL Front" : [-1020.357,-418.648],"2XL Right Side Panel" : [-1403.455,-445.295]},
			"3XL" : {"3XL Right Zipper Facing" : [-1218.686,-809.357],"3XL Left Zipper Facing" : [-1284.947,-809.262],"3XL Garage" : [-1250.404,-872.02],"3XL Outside Collar" : [-749.038,-707.136],"3XL Inside Collar" : [-1326.508,-915.248],"3XL Right Sleeve" : [-305.386,-743.613],"3XL Left Sleeve" : [-524.157,-743.607],"3XL Back" : [-774.56,-761.31],"3XL Left Side Panel" : [-1132.882,-790.043],"3XL Front" : [-1022.059,-762.13],"3XL Right Side Panel" : [-1401.442,-790.039]},
			"4XL" : {"4XL Right Zipper Facing" : [-1221.255,-1172.698],"4XL Left Zipper Facing" : [-1287.039,-1172.603],"4XL Garage" : [-1252.687,-1235.484],"4XL Outside Collar" : [-750.842,-1053.572],"4XL Inside Collar" : [-1330.574,-1278.543],"4XL Right Sleeve" : [-310.865,-1105.717],"4XL Left Sleeve" : [-529.645,-1105.72],"4XL Back" : [-779.957,-1107.894],"4XL Left Side Panel" : [-1136.057,-1152.897],"4XL Front" : [-1025.83,-1123.721],"4XL Right Side Panel" : [-1404.617,-1152.892]},
			"5XL" : {"5XL Right Zipper Facing" : [-1220.036,-1521.964],"5XL Left Zipper Facing" : [-1286.298,-1521.869],"5XL Garage" : [-1252.475,-1584.719],"5XL Outside Collar" : [-752.638,-1416.288],"5XL Inside Collar" : [-1332.178,-1627.66],"5XL Right Sleeve" : [-316.351,-1453.627],"5XL Left Sleeve" : [-535.126,-1453.627],"5XL Back" : [-785.358,-1470.308],"5XL Left Side Panel" : [-1136.767,-1501.567],"5XL Front" : [-1029.595,-1471.138],"5XL Right Side Panel" : [-1405.329,-1501.57]}
		}
	},

	"FD_597" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"scaleFrontLogo" : false,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" :
		{
			"S" : {"S Right Sleeve" : [-196.667,837.773],"S Left Sleeve" : [-196.667,950.783],"S Back" : [-456.634,958.797],"S Front" : [-723.552,959.204],"S Outside Collar" : [-1204.82,779.204],"S Moon" : [-1150.659,871.886],"S Placket" : [-1146.219,950.118],"S Inside Collar" : [-964.579,842.875],"S Binding" : [-1207.482,814.997]},
			"M" : {"M Right Sleeve" : [-200.672,484.393],"M Left Sleeve" : [-200.672,595.288],"M Back" : [-462.034,605.982],"M Front" : [-728.952,606.366],"M Outside Collar" : [-1207.063,423.646],"M Moon" : [-1151.561,517.408],"M Placket" : [-1146.637,595.613],"M Inside Collar" : [-966.825,488.367],"M Binding" : [-1211.453,460.502]},
			"L" : {"L Right Sleeve" : [-204.686,162.036],"L Left Sleeve" : [-204.686,271.899],"L Back" : [-467.434,282.827],"L Front" : [-734.352,283.202],"L Outside Collar" : [-1209.313,96.09],"L Moon" : [-1152.493,186.144],"L Placket" : [-1146.182,264.112],"L Inside Collar" : [-969.072,156.868],"L Binding" : [-1214.599,128.993]},
			"XL" : {"XL Right Sleeve" : [-208.673,-207.586],"XL Left Sleeve" : [-208.673,-99.222],"XL Back" : [-472.834,-80.287],"XL Front" : [-739.752,-79.927],"XL Outside Collar" : [-1211.56,-270.598],"XL Moon" : [-1153.396,-173.31],"XL Placket" : [-1146.545,-95.351],"XL Inside Collar" : [-971.318,-202.585],"XL Binding" : [-1218.571,-230.471]},
			"2XL" : {"2XL Right Sleeve" : [-212.671,-605.728],"2XL Left Sleeve" : [-212.667,-498.594],"2XL Back" : [-478.234,-473.44],"2XL Front" : [-745.152,-473.094],"2XL Outside Collar" : [-1213.806,-667.324],"2XL Moon" : [-1154.3,-578.82],"2XL Placket" : [-1146.699,-500.888],"2XL Inside Collar" : [-973.565,-608.113],"2XL Binding" : [-1222.328,-636.008]},
			"3XL" : {"3XL Right Sleeve" : [-216.68,-969.13],"3XL Left Sleeve" : [-216.68,-863.489],"3XL Back" : [-483.634,-818.051],"3XL Front" : [-750.551,-817.716],"3XL Outside Collar" : [-1216.049,-1015.512],"3XL Moon" : [-1155.198,-935.311],"3XL Placket" : [-1146.587,-857.384],"3XL Inside Collar" : [-975.811,-964.591],"3XL Binding" : [-1225.831,-992.505]},
			"4XL" : {"4XL Right Sleeve" : [-220.705,-1325.901],"4XL Left Sleeve" : [-220.706,-1220.627],"4XL Back" : [-489.034,-1171.71],"4XL Front" : [-755.952,-1171.383],"4XL Outside Collar" : [-1229.182,-1372.742],"4XL Moon" : [-1164.842,-1279.789],"4XL Placket" : [-1155.319,-1201.851],"4XL Inside Collar" : [-982.906,-1309.086],"4XL Binding" : [-1238.181,-1337.008]},
			"5XL" : {"5XL Right Sleeve" : [-224.74,-1721.076],"5XL Left Sleeve" : [-224.744,-1618.533],"5XL Back" : [-494.434,-1583.038],"5XL Front" : [-761.352,-1582.722],"5XL Outside Collar" : [-1231.429,-1787.649],"5XL Moon" : [-1174.916,-1698.981],"5XL Placket" : [-1164.506,-1621.103],"5XL Inside Collar" : [-994.317,-1728.274],"5XL Binding" : [-1250.912,-1756.222]}
		}
	},

	"FD_477" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Collar" : [-1220.535,592.622],"S Back Facing" : [-1488.155,502.952],"S Zipper Placket B" : [-1425.285,637.187],"S Zipper Placket A" : [-1474.771,637.187],"S Front Left Facing" : [-1310.491,585.233],"S Front Right Facing" : [-1629.399,584.595],"S Right Sleeve" : [-240.396,660.315],"S Left Sleeve" : [-471.172,660.315],"S Back Bottom Facing" : [-1531.203,554.02],"S Back" : [-722.052,649.292],"S Front" : [-1004.81,641.205]},
			"M" : {"M Collar" : [-1220.428,315.022],"M Back Facing" : [-1486.642,223.037],"M Zipper Placket B" : [-1422.764,357.289],"M Zipper Placket A" : [-1472.243,357.289],"M Front Left Facing" : [-1308.515,305.758],"M Front Right Facing" : [-1627.452,305.124],"M Right Sleeve" : [-244.028,383.129],"M Left Sleeve" : [-474.803,383.132],"M Back Bottom Facing" : [-1532.386,274.42],"M Back" : [-725.651,373.285],"M Front" : [-1008.409,364.902]},
			"L" : {"L Collar" : [-1221.52,27.774],"L Back Facing" : [-1486.588,-66.48],"L Zipper Placket B" : [-1471.298,67.762],"L Zipper Placket A" : [-1421.853,67.762],"L Front Left Facing" : [-1307.999,16.67],"L Front Right Facing" : [-1626.904,16.036],"L Right Sleeve" : [-247.66,96.332],"L Left Sleeve" : [-478.436,96.338],"L Back Bottom Facing" : [-1535.036,-14.793],"L Back" : [-729.251,87.667],"L Front" : [-1012.008,78.985]},
			"XL" : {"XL Collar" : [-1224.816,-267.384],"XL Back Facing" : [-1487.5,-364.485],"XL Zipper Placket B" : [-1421.821,-230.23],"XL Zipper Placket A" : [-1471.345,-230.23],"XL Front Left Facing" : [-1308.446,-280.891],"XL Front Right Facing" : [-1627.354,-281.525],"XL Right Sleeve" : [-251.293,-198.933],"XL Left Sleeve" : [-482.068,-198.933],"XL Back Bottom Facing" : [-1538.662,-312.493],"XL Back" : [-732.851,-206.845],"XL Front" : [-1015.608,-215.856]},
			"2XL" : {"2XL Collar" : [-1226.305,-562.744],"2XL Back Facing" : [-1488.408,-664.489],"2XL Zipper Placket B" : [-1421.893,-530.225],"2XL Zipper Placket A" : [-1471.326,-530.225],"2XL Front Left Facing" : [-1308.895,-580.464],"2XL Front Right Facing" : [-1627.804,-581.097],"2XL Right Sleeve" : [-254.934,-498.022],"2XL Left Sleeve" : [-485.708,-498.02],"2XL Back Bottom Facing" : [-1542.295,-612.187],"2XL Back" : [-736.45,-502.946],"2XL Front" : [-1019.208,-512.257]},
			"3XL" : {"3XL Collar" : [-1229.134,-859.994],"3XL Back Facing" : [-1489.319,-964.487],"3XL Zipper Placket B" : [-1421.983,-830.229],"3XL Zipper Placket A" : [-1471.427,-830.229],"3XL Front Left Facing" : [-1309.346,-880.03],"3XL Front Right Facing" : [-1628.26,-880.664],"3XL Right Sleeve" : [-258.576,-797.114],"3XL Left Sleeve" : [-489.351,-797.115],"3XL Back Bottom Facing" : [-1546.013,-911.892],"3XL Back" : [-740.051,-800.849],"3XL Front" : [-1022.808,-810.459]},
			"4XL" : {"4XL Collar" : [-1232.047,-1159.042],"4XL Back Facing" : [-1490.234,-1266.487],"4XL Zipper Placket B" : [-1421.858,-1132.232],"4XL Zipper Placket A" : [-1471.24,-1132.231],"4XL Front Left Facing" : [-1309.801,-1181.596],"4XL Front Right Facing" : [-1628.857,-1182.23],"4XL Right Sleeve" : [-262.224,-1098.203],"4XL Left Sleeve" : [-492.996,-1098.201],"4XL Back Bottom Facing" : [-1549.58,-1213.585],"4XL Back" : [-743.649,-1100.751],"4XL Front" : [-1026.409,-1110.656]},
			"5XL" : {"5XL Collar" : [-1234.958,-1457.961],"5XL Back Facing" : [-1491.14,-1568.488],"5XL Zipper Placket B" : [-1471.334,-1434.229],"5XL Zipper Placket A" : [-1421.846,-1434.229],"5XL Front Left Facing" : [-1310.248,-1483.161],"5XL Front Right Facing" : [-1629.16,-1483.795],"5XL Right Sleeve" : [-265.87,-1399.292],"5XL Left Sleeve" : [-496.641,-1399.287],"5XL Back Bottom Facing" : [-1553.503,-1515.299],"5XL Back" : [-747.25,-1400.656],"5XL Front" : [-1030.009,-1410.856]}
		}
	},

	"FD_692" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Left Sleeve", "Right Sleeve", "Locker Tag", "Sponsor Logo", "Right Hood", "Left Hood", "Front Pocket", "Additional Art"],
		"pieces" : ["Front", "Waistband", "Back", "Right Sleeve", "Right Cuff", "Left Sleeve", "Left Cuff", "Pocket", "Left Inside Hood", "Right Outside Hood", "Right Inside Hood", "Left Outside Hood"],
		"piecesb" : ["Front", "Waistband 1", "Back", "Waistband 2", "Right Sleeve", "Right Cuff", "Left Sleeve", "Left Cuff", "Pocket", "Left Inside Hood", "Right Outside Hood", "Right Inside Hood", "Left Outside Hood"],
		"scaleFrontLogo" : true,
		"smallestWidth" : 14.4,
		"smallestScale" : 4,
		"placement" : 
		{
			"S" : {"S Left Outside Hood" : [-236.322,669.224],"S Right Inside Hood" : [-236.322,824.198],"S Right Outside Hood" : [-353.006,669.059],"S Left Inside Hood" : [-353.006,824.009],"S Pocket" : [-1787.983,824.106],"S Left Cuff" : [-1624.331,729.206],"S Right Cuff" : [-1879.775,729.206],"S Waistband" : [-1866.729,674.986],"S Left Sleeve" : [-579.5,787.527],"S Right Sleeve" : [-814.886,787.527],"S Back" : [-1111.939,777.237],"S Front" : [-1386.73,769.887]},
			"M" : {"M Left Outside Hood" : [-237.645,352.515],"M Right Inside Hood" : [-237.645,507.489],"M Right Outside Hood" : [-354.33,352.35],"M Left Inside Hood" : [-354.33,507.3],"M Pocket" : [-1789.795,499.35],"M Left Cuff" : [-1625.458,400.734],"M Right Cuff" : [-1880.967,400.734],"M Waistband" : [-1877.496,346.505],"M Left Sleeve" : [-584.978,498.575],"M Right Sleeve" : [-820.364,498.575],"M Back" : [-1117.331,489.185],"M Front" : [-1392.129,481.758]},
			"L" : {"L Left Outside Hood" : [-238.978,27.033],"L Right Inside Hood" : [-238.978,182.007],"L Right Outside Hood" : [-355.663,26.868],"L Left Inside Hood" : [-355.663,181.818],"L Pocket" : [-1788.448,182.464],"L Left Cuff" : [-1623.22,81.488],"L Right Cuff" : [-1878.712,81.488],"L Waistband" : [-1885.107,27.24],"L Left Sleeve" : [-590.47,165.587],"L Right Sleeve" : [-825.855,165.587],"L Back" : [-1122.727,157.027],"L Front" : [-1397.528,149.619]},
			"XL" : {"XL Left Outside Hood" : [-240.307,-297.942],"XL Right Inside Hood" : [-240.307,-142.968],"XL Right Outside Hood" : [-356.992,-298.107],"XL Left Inside Hood" : [-356.992,-143.157],"XL Pocket" : [-1786.782,-138.005],"XL Left Cuff" : [-1623.11,-247.266],"XL Right Cuff" : [-1878.266,-247.266],"XL Waistband" : [-1894.921,-301.534],"XL Left Sleeve" : [-596.101,-165.096],"XL Right Sleeve" : [-831.486,-165.096],"XL Back" : [-1128.121,-173.299],"XL Front" : [-1402.927,-180.293]},
			"2XL" : {"2XL Left Outside Hood" : [-241.635,-624.166],"2XL Right Inside Hood" : [-241.635,-469.192],"2XL Right Outside Hood" : [-358.319,-624.331],"2XL Left Inside Hood" : [-358.319,-469.381],"2XL Pocket" : [-1788.621,-501.449],"2XL Left Cuff" : [-1623.995,-609.266],"2XL Right Cuff" : [-1879.621,-609.266],"2XL Waistband" : [-1905.721,-663.545],"2XL Left Sleeve" : [-601.765,-477.475],"2XL Right Sleeve" : [-837.15,-477.475],"2XL Back" : [-1133.516,-482.981],"2XL Front" : [-1408.326,-490.007]},
			"3XL" : {"3XL Left Outside Hood" : [-242.963,-951.919],"3XL Right Inside Hood" : [-242.963,-797.04],"3XL Right Outside Hood" : [-359.648,-951.84],"3XL Left Inside Hood" : [-359.648,-797.229],"3XL Pocket" : [-1792.979,-858.201],"3XL Left Cuff" : [-1625.05,-966.871],"3XL Right Cuff" : [-1880.645,-966.871],"3XL Waistband" : [-1916.521,-1021.089],"3XL Left Sleeve" : [-607.437,-842.184],"3XL Right Sleeve" : [-842.823,-842.184],"3XL Back" : [-1138.911,-846.78],"3XL Front" : [-1413.722,-853.844]},
			"4XL" : {"4XL Left Outside Hood" : [-244.305,-1277.775],"4XL Right Inside Hood" : [-244.305,-1122.8],"4XL Right Outside Hood" : [-361.208,-1277.938],"4XL Left Inside Hood" : [-361.208,-1122.988],"4XL Pocket" : [-1794.812,-1222.494],"4XL Left Cuff" : [-1626.797,-1344.484],"4XL Right Cuff" : [-1881.994,-1344.484],"4XL Waistband" : [-1927.321,-1398.683],"4XL Left Sleeve" : [-613.124,-1183.969],"4XL Right Sleeve" : [-848.515,-1184.148],"4XL Back" : [-1144.307,-1202.171],"4XL Front" : [-1419.117,-1203.097]},
			"5XL" : {"5XL Left Outside Hood" : [-245.641,-1606.029],"5XL Right Inside Hood" : [-245.641,-1451.053],"5XL Right Outside Hood" : [-362.326,-1606.192],"5XL Left Inside Hood" : [-362.326,-1451.241],"5XL Pocket" : [-1794.602,-1554.924],"5XL Left Cuff" : [-1626.981,-1662.506],"5XL Right Cuff" : [-1882.265,-1662.535],"5XL Waistband 2" : [-1704.172,-1716.618],"5XL Waistband 1" : [-1951.08,-1716.633],"5XL Left Sleeve" : [-618.82,-1503.173],"5XL Right Sleeve" : [-854.206,-1503.353],"5XL Back" : [-1149.702,-1516.645],"5XL Front" : [-1424.516,-1517.244]}
		}
	},

	"FD_752W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS", "S", "M", "L", "XL", "2XL"], 
		"artLayers" : ["Front Logo", "Front Number", "Player Name", "Back Number", "Left Sleeve", "Right Sleeve","Sponsor Logo", "Locker Tag", "Additional Artwork"],
		"pieces" : ["Collar", "Front", "Back", "Right Sleeve", "Left Sleeve"],
		"placement" : 
		{
			"XS" : {"XS Left Sleeve" : [-211.576,262.155],"XS Right Sleeve" : [-382.888,261.821],"XS Back" : [-620.55,295.161],"XS Front" : [-795.629,286.456],"XS Collar" : [-1005.116,184.509]},
			"S" : {"S Left Sleeve" : [-214.477,7.596],"S Right Sleeve" : [-385.789,7.262],"S Back" : [-624.112,39.334],"S Front" : [-799.251,31.104],"S Collar" : [-1004.558,-71.318]},
			"M" : {"M Left Sleeve" : [-217.377,-250.683],"M Right Sleeve" : [-388.689,-251.018],"M Back" : [-627.68,-220.197],"M Front" : [-802.872,-227.924],"M Collar" : [-1006.791,-330.849]},
			"L" : {"L Left Sleeve" : [-220.278,-516.971],"L Right Sleeve" : [-391.589,-517.305],"L Back" : [-631.244,-487.753],"L Front" : [-806.491,-494.976],"L Collar" : [-1006.915,-598.404]},
			"XL" : {"XL Left Sleeve" : [-223.895,-777.959],"XL Right Sleeve" : [-395.207,-778.293],"XL Back" : [-636.616,-755.407],"XL Front" : [-811.935,-762.067],"XL Collar" : [-1009.235,-866.059]},
			"2XL" : {"2XL Left Sleeve" : [-227.526,-1049.9],"2XL Right Sleeve" : [-398.838,-1050.234],"2XL Back" : [-641.99,-1029.695],"2XL Front" : [-817.373,-1035.851],"2XL Collar" : [-1011.974,-1140.347]}
		}
	}
}
