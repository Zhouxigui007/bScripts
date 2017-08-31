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

		Version 3.003
			31 October, 2016
			Fixed entry for FD_752 to include "scaleFrontLogo" : false.
				This omission would have caused add artwork to fail.
			Added FD_3037W to library.
			Fixed incorrect code for women's basketball uniforms. code should have been FD_220W_221W but was saved as FD_210W_211W. made a duplicate so the old entry is still
				accessible for any existing files with the incorrect code.

		Version 3.004
			18 November, 2016
			Added "FD_SLOW", "FD_SLOWW" and "FD_SLOWY" to library.
			Script was tripping up when the converted template did not have the "SS" at the end of the layer name.

*/

var prepressInfo = 
{
	/////////////////////
	//Slowpitch Jerseys//
	/////////////////////
	"FD_SLOW_SS" :
	{
		"mockupSize" : "XL",
		// "sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
	"FD_SLOW" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
	"FD_SLOWW" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
	"FD_SLOWY" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YXS", "YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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

	"FD-400W" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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

	"FD-500W" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Front", "Back"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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

	"FD-234" :
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Collar" : [-991.266,-106.921],"YS Back" : [-447.251,-13.79],"YS Front" : [-647.061,-20.7],"YS Left Sleeve" : [-216.841,-31.99],"YS Right Sleeve" : [-216.841,-132.54],"YS Right Placard" : [-741.685,-74.7],"YS Center Placard" : [-789.105,-100.131],"YS Left Placard" : [-864.175,-74.711]},
			"YM" : {"YM Collar" : [-992.156,-351],"YM Back" : [-450.491,-252.461],"YM Front" : [-650.301,-259.4],"YM Left Sleeve" : [-219.321,-275.551],"YM Right Sleeve" : [-219.321,-376.04],"YM Right Placard" : [-742.195,-317.9],"YM Center Placard" : [-789.105,-345.011],"YM Left Placard" : [-865.175,-317.9]},
			"YL" : {"YL Collar" : [-993.026,-605.781],"YL Back" : [-455.111,-501.851],"YL Front" : [-654.901,-508.8],"YL Left Sleeve" : [-221.741,-529.75],"YL Right Sleeve" : [-221.741,-630.33],"YL Right Placard" : [-742.685,-571.8],"YL Center Placard" : [-794.105,-600.611],"YL Left Placard" : [-871.175,-571.8]},
			"YXL" : {"YXL Collar" : [-993.886,-871.291],"YXL Back" : [-459.131,-761.96],"YXL Front" : [-658.911,-768.931],"YXL Left Sleeve" : [-224.121,-794.65],"YXL Right Sleeve" : [-224.121,-895.421],"YXL Right Placard" : [-743.155,-836.431],"YXL Center Placard" : [-796.105,-866.951],"YXL Left Placard" : [-874.175,-836.431]}
		}
	},

	"FD-234Y" :
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Left Front", "Right Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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

	"FD-246W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Collar", "Left Sleeve", "Right Sleeve", "Front", "Back", "Left Placard", "Right Placard"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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

	"FD-215_FD-219" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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

	"FD-215W_FD-219W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" :
		{
			"YS" : {"YS Left Leg Panel" : [-352.476,82.503],"YS Right Leg Panel" : [-643.685,82.503],"YS Back" : [-849.531,113.024],"YS Front" : [-1064.709,108.723]},
			"YM" : {"YM Left Leg Panel" : [-356.87,-168.607],"YM Right Leg Panel" : [-648.079,-168.607],"YM Back" : [-853.233,-138.022],"YM Front" : [-1068.411,-142.548]},
			"YL" : {"YL Left Leg Panel" : [-361.104,-427.376],"YL Right Leg Panel" : [-652.313,-427.376],"YL Back" : [-856.591,-396.7],"YL Front" : [-1071.769,-401.101]},
			"YXL" : {"YXL Left Leg Panel" : [-365.345,-692.579],"YXL Right Leg Panel" : [-656.554,-692.579],"YXL Back" : [-860.317,-662.117],"YXL Front" : [-1075.495,-666.41]}
		}
	},

	"FD-215Y_FD-219Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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

	"FD_220W_221W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS","S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Left Leg Panel", "Right Leg Panel"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" :
		{
			"YS" : {"YS Left Leg Panel" : [-352.997,37.983],"YS Right Leg Panel" : [-605.901,37.983],"YS Back" : [-806.34,59.522],"YS Front" : [-1022.981,55.915],"YS Collar" : [-1222.038,-35.486]},
			"YM" : {"YM Left Leg Panel" : [-357.398,-201.413],"YM Right Leg Panel" : [-610.301,-201.413],"YM Back" : [-809.644,-179.746],"YM Front" : [-1026.285,-183.756],"YM Collar" : [-1224.288,-278.568]},
			"YL" : {"YL Left Leg Panel" : [-361.624,-447.837],"YL Right Leg Panel" : [-614.527,-447.837],"YL Back" : [-813.106,-426.593],"YL Front" : [-1029.779,-429.918],"YL Collar" : [-1225.638,-528.535]},
			"YXL" : {"YXL Left Leg Panel" : [-365.864,-702.521],"YXL Right Leg Panel" : [-618.767,-702.521],"YXL Back" : [-816.446,-681.497],"YXL Front" : [-1033.126,-684.724],"YXL Collar" : [-1227.888,-786.896]}
		}
	},

	"FD_137" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"XS" : {"XS Left Sleeve" : [-201.366,731.217],"XS Right Sleeve" : [-418.497,731.217],"XS Back" : [-664.825,773.364],"XS Front" : [-934.215,772.111],"XS Collar" : [-1168.33,677.58]},
			"S" : {"S Left Sleeve" : [-204.133,481.333],"S Right Sleeve" : [-421.264,481.333],"S Back" : [-670.069,523.417],"S Front" : [-939.458,521.906],"S Collar" : [-1170.346,424.091]},
			"M" : {"M Left Sleeve" : [-206.345,223.828],"M Right Sleeve" : [-423.477,223.828],"M Back" : [-675.597,265.978],"M Front" : [-944.986,264.324],"M Collar" : [-1172.362,163.104]},
			"L" : {"L Left Sleeve" : [-208.519,-43.038],"L Right Sleeve" : [-425.65,-43.038],"L Back" : [-680.983,-0.328],"L Front" : [-950.372,-2.165],"L Collar" : [-1174.378,-106.882]},
			"XL" : {"XL Left Sleeve" : [-210.588,-315.55],"XL Right Sleeve" : [-427.719,-315.55],"XL Back" : [-686.369,-272.766],"XL Front" : [-955.758,-274.961],"XL Collar" : [-1176.394,-382.868]},
			"2XL" : {"2XL Left Sleeve" : [-212.845,-596.691],"2XL Right Sleeve" : [-429.976,-596.691],"2XL Back" : [-691.755,-553.847],"2XL Front" : [-961.143,-556.36],"2XL Collar" : [-1178.41,-667.346]},
			"3XL" : {"3XL Left Sleeve" : [-215.126,-885.133],"3XL Right Sleeve" : [-432.258,-885.133],"3XL Back" : [-697.14,-842.02],"3XL Front" : [-966.529,-844.63],"3XL Collar" : [-1180.426,-959.346]},
			"4XL" : {"4XL Left Sleeve" : [-217.359,-1179.399],"4XL Right Sleeve" : [-434.505,-1179.399],"4XL Back" : [-702.527,-1136.476],"4XL Front" : [-971.915,-1139.393],"4XL Collar" : [-1182.442,-1257.346]},
			"5XL" : {"5XL Left Sleeve" : [-219.91,-1484.214],"5XL Right Sleeve" : [-437.041,-1484.214],"5XL Back" : [-708.054,-1440.792],"5XL Front" : [-977.443,-1443.843],"5XL Collar" : [-1184.458,-1565.346]}
		}
	},

	"FD_137W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"XXS" : {"XXS Left Sleeve" : [-325.759,487.911],"XXS Right Sleeve" : [-148.694,485.433],"XXS Back" : [-552.809,571.783],"XXS Collar" : [-1015.348,465.523],"XXS Front" : [-799.884,565.671]},
			"XS" : {"XS Left Sleeve" : [-328.333,254.686],"XS Right Sleeve" : [-151.261,252.205],"XS Back" : [-556.409,333.63],"XS Collar" : [-1017.396,227.523],"XS Front" : [-803.486,328.171]},
			"S" : {"S Left Sleeve" : [-331.637,17.458],"S Right Sleeve" : [-154.569,14.984],"S Back" : [-560.006,91.63],"S Collar" : [-1026.542,-14.478],"S Front" : [-807.087,86.755]},
			"M" : {"M Left Sleeve" : [-334.5,-229.754],"M Right Sleeve" : [-157.433,-232.23],"M Back" : [-563.605,-158.577],"M Collar" : [-1029.001,-264.478],"M Front" : [-810.686,-162.704]},
			"L" : {"L Left Sleeve" : [-338.168,-479.837],"L Right Sleeve" : [-161.104,-482.313],"L Back" : [-567.561,-412.68],"L Collar" : [-1030.924,-518.474],"L Front" : [-814.645,-416.204]},
			"XL" : {"XL Left Sleeve" : [-343.283,-734.176],"XL Right Sleeve" : [-166.215,-736.664],"XL Back" : [-572.962,-672.782],"XL Collar" : [-1033.577,-778.477],"XL Front" : [-820.046,-675.62]},
			"2XL" : {"2XL Left Sleeve" : [-348.412,-999.361],"2XL Right Sleeve" : [-171.344,-1001.846],"2XL Back" : [-578.359,-940.884],"2XL Collar" : [-1035.802,-1046.477],"2XL Front" : [-825.441,-943.12]},
			"3XL" : {"3XL Left Sleeve" : [-353.642,-1271.283],"3XL Right Sleeve" : [-176.569,-1273.77],"3XL Back" : [-583.757,-1212.988],"3XL Collar" : [-1038.052,-1318.477],"3XL Front" : [-830.837,-1214.663]}
		}
	},

	"FD_137Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"YS" : {"YS Left Sleeve" : [-158.574,-107.573],"YS Right Sleeve" : [-344.566,-106.961],"YS Back" : [-544.09,-30.625],"YS Collar" : [-933.895,-143.927],"YS Front" : [-739.583,-36.018]},
			"YM" : {"YM Left Sleeve" : [-161.169,-320.08],"YM Right Sleeve" : [-347.157,-319.465],"YM Back" : [-548.41,-251.506],"YM Collar" : [-936.034,-362.917],"YM Front" : [-743.903,-253.218]},
			"YL" : {"YL Left Sleeve" : [-167.142,-545.957],"YL Right Sleeve" : [-353.134,-545.345],"YL Back" : [-552.73,-480.995],"YL Collar" : [-938.19,-592.404],"YL Front" : [-748.223,-481.668]},
			"YXL" : {"YXL Left Sleeve" : [-173.223,-784.426],"YXL Right Sleeve" : [-359.217,-783.818],"YXL Back" : [-554.984,-723.983],"YXL Collar" : [-940.501,-835.393],"YXL Front" : [-750.476,-724.111]}
		}
	},

	"FD_217Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"YS" : {"YS Back" : [-201.917,-13.671],"YS Front" : [-389.463,-14.471]},
			"YM" : {"YM Back" : [-210.017,-235.289],"YM Front" : [-397.563,-237.138]},
			"YL" : {"YL Back" : [-212.717,-479.725],"YL Front" : [-400.263,-480.735]},
			"YXL" : {"YXL Back" : [-215.417,-725.73],"YXL Front" : [-402.963,-725.763]}
		}
	},

	"FD_217" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Back" : [-271.68,799.137],"S Front" : [-526.643,799.427]},
			"M" : {"M Back" : [-277.08,516.261],"M Front" : [-532.043,516.568]},
			"L" : {"L Back" : [-282.48,233.28],"L Front" : [-537.443,233.596]},
			"XL" : {"XL Back" : [-287.88,-57.955],"XL Front" : [-542.843,-57.618]},
			"2XL" : {"2XL Back" : [-293.281,-357.07],"2XL Front" : [-548.243,-356.719]},
			"3XL" : {"3XL Back" : [-298.68,-665.208],"3XL Front" : [-553.642,-664.846]},
			"4XL" : {"4XL Back" : [-304.08,-979.334],"4XL Front" : [-559.043,-978.955]},
			"5XL" : {"5XL Back" : [-309.48,-1302.465],"5XL Front" : [-564.442,-1302.076]}
		}
	},

	"FD_622W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"XXS" : {"XXS Right Cuff" : [-1120.374,594.442],"XXS Right Sleeve" : [-209.942,689.005],"XXS Left Cuff" : [-1040.319,594.694],"XXS Left Sleeve" : [-408.348,689.005],"XXS Back" : [-656.873,682.883],"XXS Collar" : [-1115.863,555.282],"XXS Front" : [-906.034,681.51]},
			"XS" : {"XS Right Cuff" : [-1121.331,334.483],"XS Right Sleeve" : [-213.169,431.395],"XS Left Cuff" : [-1041.308,334.623],"XS Left Sleeve" : [-411.571,431.396],"XS Back" : [-660.47,426.025],"XS Collar" : [-1118.088,295.323],"XS Front" : [-909.637,424.489]},
			"S" : {"S Right Cuff" : [-1122.185,70.441],"S Right Sleeve" : [-216.394,169.784],"S Left Cuff" : [-1042.308,70.582],"S Left Sleeve" : [-414.798,169.782],"S Back" : [-664.071,165.168],"S Collar" : [-1120.316,31.282],"S Front" : [-913.238,163.47]},
			"M" : {"M Right Cuff" : [-1123.048,-193.558],"M Right Sleeve" : [-219.189,-92.82],"M Left Cuff" : [-1043.244,-193.418],"M Left Sleeve" : [-417.595,-92.82],"M Back" : [-667.671,-95.785],"M Collar" : [-1122.839,-232.718],"M Front" : [-916.833,-97.559]},
			"L" : {"L Right Cuff" : [-1123.964,-461.559],"L Right Sleeve" : [-222.767,-358.863],"L Left Cuff" : [-1044.217,-461.418],"L Left Sleeve" : [-421.172,-358.863],"L Back" : [-671.623,-360.675],"L Collar" : [-1124.59,-500.718],"L Front" : [-920.794,-362.599]},
			"XL" : {"XL Right Cuff" : [-1124.866,-741.528],"XL Right Sleeve" : [-227.755,-636.036],"XL Left Cuff" : [-1044.896,-741.388],"XL Left Sleeve" : [-426.156,-636.029],"XL Back" : [-677.029,-637.589],"XL Collar" : [-1127.259,-780.718],"XL Front" : [-926.195,-639.637]},
			"2XL" : {"2XL Right Cuff" : [-1125.857,-1013.558],"2XL Right Sleeve" : [-232.713,-906.622],"2XL Left Cuff" : [-1045.797,-1013.418],"2XL Left Sleeve" : [-431.119,-906.615],"2XL Back" : [-682.427,-908.295],"2XL Collar" : [-1129.513,-1052.54],"2XL Front" : [-931.592,-910.484]},
			"3XL" : {"3XL Right Cuff" : [-1126.767,-1289.558],"3XL Right Sleeve" : [-237.698,-1182.586],"3XL Left Cuff" : [-1046.697,-1289.419],"3XL Left Sleeve" : [-436.1,-1182.586],"3XL Back" : [-687.824,-1183.034],"3XL Collar" : [-1131.752,-1328.718],"3XL Front" : [-936.99,-1185.354]}
		}
	},

	"FD_622Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"YS" : {"YS Left Cuff" : [-939.833,-112.507],"YS Left Sleeve" : [-354.12,-25.04],"YS Right Cuff" : [-857.396,-112.375],"YS Right Sleeve" : [-169.642,-25.036],"YS Back" : [-554.365,-28.142],"YS Collar" : [-938.712,-148.041],"YS Front" : [-748.217,-29.017]},
			"YM" : {"YM Left Cuff" : [-940.745,-343.503],"YM Left Sleeve" : [-357.943,-252.788],"YM Right Cuff" : [-858.312,-343.365],"YM Right Sleeve" : [-173.467,-252.788],"YM Back" : [-558.685,-254.186],"YM Collar" : [-940.89,-379.098],"YM Front" : [-752.533,-255.038]},
			"YL" : {"YL Left Cuff" : [-941.585,-583.491],"YL Left Sleeve" : [-362.498,-489.348],"YL Right Cuff" : [-859.049,-583.353],"YL Right Sleeve" : [-178.024,-489.351],"YL Back" : [-563.006,-488.597],"YL Collar" : [-943.02,-619.087],"YL Front" : [-756.853,-489.43]},
			"YXL" : {"YXL Left Cuff" : [-942.605,-826.48],"YXL Left Sleeve" : [-369.808,-728.912],"YXL Right Cuff" : [-860.059,-826.341],"YXL Right Sleeve" : [-185.326,-728.912],"YXL Back" : [-565.259,-725.278],"YXL Collar" : [-945.31,-862.075],"YXL Front" : [-759.106,-726.073]}
		}
	},

	"FD_622" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Right Cuff" : [-1109.203,596.771],"S Right Sleeve" : [-200.478,712.685],"S Left Cuff" : [-1207.574,596.771],"S Left Sleeve" : [-420.451,712.692],"S Back" : [-682.842,707.15],"S Collar" : [-1191.602,556.797],"S Front" : [-963.59,706.55]},
			"M" : {"M Right Cuff" : [-1110.352,314.735],"M Right Sleeve" : [-203.125,430.919],"M Left Cuff" : [-1208.777,314.734],"M Left Sleeve" : [-423.093,430.919],"M Back" : [-688.224,428.252],"M Collar" : [-1193.795,274.76],"M Front" : [-968.967,427.655]},
			"L" : {"L Right Cuff" : [-1110.827,26.753],"L Right Sleeve" : [-205.091,146.292],"L Left Cuff" : [-1209.097,26.706],"L Left Sleeve" : [-425.06,146.292],"L Back" : [-693.646,143.324],"L Collar" : [-1195.343,-13.269],"L Front" : [-974.376,142.875]},
			"XL" : {"XL Right Cuff" : [-1112.056,-261.323],"XL Right Sleeve" : [-207.398,-141.879],"XL Left Cuff" : [-1210.349,-261.324],"XL Left Sleeve" : [-427.366,-141.876],"XL Back" : [-699.027,-141.012],"XL Collar" : [-1197.777,-301.298],"XL Front" : [-979.749,-141.311]},
			"2XL" : {"2XL Right Cuff" : [-1112.964,-549.352],"2XL Right Sleeve" : [-209.668,-430.041],"2XL Left Cuff" : [-1211.248,-549.352],"2XL Left Sleeve" : [-429.634,-430.042],"2XL Back" : [-704.407,-425.906],"2XL Collar" : [-1199.755,-589.326],"2XL Front" : [-985.131,-426.218]},
			"3XL" : {"3XL Right Cuff" : [-1113.959,-849.382],"3XL Right Sleeve" : [-212.053,-728.131],"3XL Left Cuff" : [-1212.149,-849.383],"3XL Left Sleeve" : [-432.021,-728.131],"3XL Back" : [-709.793,-722.824],"3XL Collar" : [-1201.954,-889.356],"3XL Front" : [-990.525,-723.297]},
			"4XL" : {"4XL Right Cuff" : [-1114.864,-1149.209],"4XL Right Sleeve" : [-214.529,-1026.058],"4XL Left Cuff" : [-1213.048,-1149.345],"4XL Left Sleeve" : [-434.501,-1026.058],"4XL Back" : [-715.322,-1022.866],"4XL Collar" : [-1203.89,-1189.276],"4XL Front" : [-996.052,-1023.175]},
			"5XL" : {"5XL Right Cuff" : [-1115.661,-1443.337],"5XL Right Sleeve" : [-217.178,-1321.124],"5XL Left Cuff" : [-1213.949,-1443.441],"5XL Left Sleeve" : [-437.146,-1321.124],"5XL Back" : [-720.565,-1317.316],"5XL Collar" : [-1205.71,-1483.387],"5XL Front" : [-1001.302,-1317.532]}
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
		"placement" :
		{
			"YS" : {"YS Right Cuff" : [-933.042,-77.291],"YS Right Sleeve" : [-437.499,15.054],"YS Left Cuff" : [-933.706,-6.481],"YS Left Sleeve" : [-261.012,15.056],"YS Right Liner 2" : [-1007.822,44.68],"YS Right Liner" : [-1007.822,-55.32],"YS Left Liner 2" : [-1083.02,45.206],"YS Left Liner" : [-1083.02,-54.794],"YS Back" : [-627.768,29.963],"YS Collar" : [-1086.311,-140.089],"YS Front" : [-809.778,30.62]},
			"YM" : {"YM Right Cuff" : [-936.746,-319.496],"YM Right Sleeve" : [-440.662,-223.732],"YM Left Cuff" : [-937.296,-248.685],"YM Left Sleeve" : [-264.177,-223.732],"YM Right Liner 2" : [-1008.648,-196.993],"YM Right Liner" : [-1008.648,-296.993],"YM Left Liner 2" : [-1083.845,-196.466],"YM Left Liner" : [-1083.845,-296.466],"YM Back" : [-631.564,-207.767],"YM Collar" : [-1087.134,-382.295],"YM Front" : [-813.838,-207.145]},
			"YL" : {"YL Right Cuff" : [-940.372,-562.248],"YL Right Sleeve" : [-444.111,-462.952],"YL Left Cuff" : [-940.896,-491.433],"YL Left Sleeve" : [-267.626,-462.951],"YL Right Liner 2" : [-1009.467,-439.201],"YL Right Liner" : [-1009.467,-539.201],"YL Left Liner 2" : [-1084.665,-438.671],"YL Left Liner" : [-1084.665,-538.671],"YL Back" : [-636.056,-445.954],"YL Collar" : [-1088.08,-625.046],"YL Front" : [-818.275,-445.341]},
			"YXL" : {"YXL Right Cuff" : [-943.968,-805.776],"YXL Right Sleeve" : [-447.689,-702.71],"YXL Left Cuff" : [-944.633,-734.966],"YXL Left Sleeve" : [-271.203,-702.71],"YXL Right Liner 2" : [-1010.299,-682.157],"YXL Right Liner" : [-1010.299,-782.157],"YXL Left Liner 2" : [-1085.496,-681.631],"YXL Left Liner" : [-1085.496,-781.631],"YXL Back" : [-640.518,-685.067],"YXL Collar" : [-1089.03,-868.574],"YXL Front" : [-822.686,-684.439]}
		}
	},
	"FD_3090W" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"scaleFrontLogo" : false,
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
		"placement" :
		{
			"XXS" : {"XXS Insert Right" : [-1108.807,685.341],"XXS Insert Right" : [-1108.807,616.732],"XXS Insert Left" : [-1181.992,685.169],"XXS Insert Left" : [-1181.992,616.56],"XXS Right Cuff" : [-1039.203,605.736],"XXS Right Sleeve" : [-458.787,655.565],"XXS Left Cuff" : [-1279.16,605.852],"XXS Left Sleeve" : [-274.202,655.911],"XXS Back" : [-687.397,701.53],"XXS Collar" : [-1193.207,537.49],"XXS Front" : [-910.504,699.744]},
			"XS" : {"XS Insert Right" : [-1108.807,441.692],"XS Insert Right" : [-1108.807,373.083],"XS Insert Left" : [-1181.992,441.706],"XS Insert Left" : [-1181.992,373.097],"XS Right Cuff" : [-1040.103,361.749],"XS Right Sleeve" : [-460.87,415.413],"XS Left Cuff" : [-1280.059,362.03],"XS Left Sleeve" : [-276.284,415.761],"XS Back" : [-688.271,454.504],"" : [-691,457.717],"XS Collar" : [-1195.546,294.152],"XS Front" : [-914.105,456.582]},
			"S" : {"S Insert Right" : [-1108.807,191.192],"S Insert Right" : [-1108.807,122.583],"S Insert Left" : [-1181.992,191.17],"S Insert Left" : [-1181.992,122.561],"S Right Cuff" : [-1041.205,111.789],"S Right Sleeve" : [-462.954,169.273],"S Left Cuff" : [-1280.96,111.744],"S Left Sleeve" : [-278.369,169.621],"S Back" : [-694.601,207.953],"S Collar" : [-1201.415,39.365],"S Front" : [-917.707,207.323]},
			"M" : {"M Insert Right" : [-1108.807,-60.676],"M Insert Right" : [-1108.807,-129.285],"M Insert Left" : [-1181.992,-60.764],"M Insert Left" : [-1181.992,-129.373],"M Right Cuff" : [-1041.904,-140.169],"M Right Sleeve" : [-465.037,-81.143],"M Left Cuff" : [-1281.859,-140.105],"M Left Sleeve" : [-280.451,-81.014],"M Back" : [-698.202,-43.813],"M Collar" : [-1204.538,-212.635],"M Front" : [-921.308,-43.654]},
			"L" : {"L Insert Right" : [-1108.807,-314.723],"L Insert Right" : [-1108.807,-383.332],"L Insert Left" : [-1181.992,-314.609],"L Insert Left" : [-1181.992,-383.218],"L Right Cuff" : [-1043.346,-393.987],"L Right Sleeve" : [-467.12,-334.309],"L Left Cuff" : [-1282.76,-394.028],"L Left Sleeve" : [-282.534,-334.136],"L Back" : [-701.804,-297.563],"L Collar" : [-1206.446,-466.635],"L Front" : [-924.91,-296.816]},
			"XL" : {"XL Insert Right" : [-1108.807,-576.776],"XL Insert Right" : [-1108.807,-645.385],"XL Insert Left" : [-1181.992,-576.687],"XL Insert Left" : [-1181.992,-645.296],"XL Right Cuff" : [-1043.703,-656.113],"XL Right Sleeve" : [-469.204,-595.417],"XL Left Cuff" : [-1283.66,-656.073],"XL Left Sleeve" : [-284.618,-595.243],"XL Back" : [-705.405,-559.313],"XL Collar" : [-1209.889,-728.635],"XL Front" : [-928.51,-558.073]},
			"2XL" : {"2XL Insert Right" : [-1108.807,-838.691],"2XL Insert Right" : [-1108.807,-907.3],"2XL Insert Left" : [-1181.992,-838.545],"2XL Insert Left" : [-1181.992,-907.154],"2XL Right Cuff" : [-1044.603,-918.323],"2XL Right Sleeve" : [-471.288,-856.509],"2XL Left Cuff" : [-1284.559,-918.324],"2XL Left Sleeve" : [-286.702,-856.335],"2XL Back" : [-709.005,-821.063],"2XL Collar" : [-1214.542,-990.635],"2XL Front" : [-932.112,-819.05]},
			"3XL" : {"3XL Insert Right" : [-1108.807,-1104.768],"3XL Insert Right" : [-1108.807,-1173.377],"3XL Insert Left" : [-1181.992,-1104.627],"3XL Insert Left" : [-1181.992,-1173.236],"3XL Right Cuff" : [-1045.617,-1184.085],"3XL Right Sleeve" : [-473.372,-1121.617],"3XL Left Cuff" : [-1285.46,-1184.174],"3XL Left Sleeve" : [-288.786,-1121.442],"3XL Back" : [-712.608,-1086.845],"3XL Collar" : [-1216.346,-1256.635],"3XL Front" : [-935.712,-1084.306]}
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestScale" : 3,
		//"smallestWidth" : 10.8,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
	"FD-1873" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
	"FD-872" : 
	{
		"mockupSize" : "XL",
		"sizes" : ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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

	"FD-1873W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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

	"FD-872W" : 
	{
		"mockupSize" : "M",
		"sizes" : ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 7.2,
		//"smallestScale" : 2,
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
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Waistband" : [-1295.448,58.482],"YS Right Inside Hood" : [-847.198,-27.438],"YS Left Outside Hood" : [-847.198,127.212],"YS Left Inside Hood" : [-950.578,-27.428],"YS Right Outside Hood" : [-950.578,127.212],"YS Right Cuff" : [-1227.608,-31.518],"YS Right Sleeve" : [-223.648,59.412],"YS Left Cuff" : [-1327.618,-31.518],"YS Left Sleeve" : [-364.318,59.412],"YS Pocket" : [-1126.358,-14.388],"YS Back" : [-541.918,80.492],"YS Front" : [-721.988,75.792]},
			"YM" : {"YM Waistband" : [-1306.018,-243.368],"YM Left Outside Hood" : [-847.198,-173.948],"YM Right Inside Hood" : [-847.198,-328.588],"YM Left Inside Hood" : [-954.168,-328.588],"YM Right Outside Hood" : [-954.178,-173.948],"YM Right Cuff" : [-1228.518,-333.368],"YM Right Sleeve" : [-229.148,-240.708],"YM Left Cuff" : [-1327.698,-333.368],"YM Left Sleeve" : [-369.818,-240.708],"YM Pocket" : [-1129.958,-316.228],"YM Back" : [-547.318,-218.218],"YM Front" : [-727.388,-222.718]},
			"YL" : {"YL Waistband" : [-1316.568,-564.328],"YL Right Inside Hood" : [-847.198,-647.258],"YL Left Outside Hood" : [-847.198,-492.598],"YL Left Inside Hood" : [-957.768,-647.258],"YL Right Outside Hood" : [-957.768,-492.608],"YL Right Cuff" : [-1229.258,-654.318],"YL Right Sleeve" : [-234.458,-559.628],"YL Left Cuff" : [-1329.008,-654.318],"YL Left Sleeve" : [-375.118,-559.548],"YL Pocket" : [-1131.868,-636.288],"YL Back" : [-552.718,-536.028],"YL Front" : [-732.788,-540.328]},
			"YXL" : {"YXL Waistband" : [-1328.558,-893.368],"YXL Right Inside Hood" : [-847.198,-974.038],"YXL Left Outside Hood" : [-847.198,-819.388],"YXL Left Inside Hood" : [-961.378,-974.038],"YXL Right Outside Hood" : [-961.378,-819.388],"YXL Right Cuff" : [-1231.008,-983.358],"YXL Right Sleeve" : [-238.608,-886.648],"YXL Left Cuff" : [-1330.268,-983.368],"YXL Left Sleeve" : [-379.278,-886.648],"YXL Pocket" : [-1133.768,-964.428],"YXL Back" : [-558.118,-861.928],"YXL Front" : [-738.188,-866.028]}
		}
	},

	"FD-872Y" : 
	{
		"mockupSize" : "YXL",
		"sizes" : ["YS", "YM", "YL", "YXL"],
		"pieces" : ["Front", "Back", "Right Sleeve", "Left Sleeve", "Waistband", "Right Cuff", "Left Cuff", "Left Inside Hood", "Left Outside Hood", "Right Inside Hood", "Right Outside Hood", "Pocket"],
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Waistband" : [-1295.448,58.482],"YS Right Inside Hood" : [-847.198,-27.438],"YS Left Outside Hood" : [-847.198,127.212],"YS Left Inside Hood" : [-950.578,-27.428],"YS Right Outside Hood" : [-950.578,127.212],"YS Right Cuff" : [-1227.608,-31.518],"YS Right Sleeve" : [-223.648,59.412],"YS Left Cuff" : [-1327.618,-31.518],"YS Left Sleeve" : [-364.318,59.412],"YS Pocket" : [-1126.358,-14.388],"YS Back" : [-541.918,80.492],"YS Front" : [-721.988,75.792]},
			"YM" : {"YM Waistband" : [-1306.018,-243.368],"YM Left Outside Hood" : [-847.198,-173.948],"YM Right Inside Hood" : [-847.198,-328.588],"YM Left Inside Hood" : [-954.168,-328.588],"YM Right Outside Hood" : [-954.178,-173.948],"YM Right Cuff" : [-1228.518,-333.368],"YM Right Sleeve" : [-229.148,-240.708],"YM Left Cuff" : [-1327.698,-333.368],"YM Left Sleeve" : [-369.818,-240.708],"YM Pocket" : [-1129.958,-316.228],"YM Back" : [-547.318,-218.218],"YM Front" : [-727.388,-222.718]},
			"YL" : {"YL Waistband" : [-1316.568,-564.328],"YL Right Inside Hood" : [-847.198,-647.258],"YL Left Outside Hood" : [-847.198,-492.598],"YL Left Inside Hood" : [-957.768,-647.258],"YL Right Outside Hood" : [-957.768,-492.608],"YL Right Cuff" : [-1229.258,-654.318],"YL Right Sleeve" : [-234.458,-559.628],"YL Left Cuff" : [-1329.008,-654.318],"YL Left Sleeve" : [-375.118,-559.548],"YL Pocket" : [-1131.868,-636.288],"YL Back" : [-552.718,-536.028],"YL Front" : [-732.788,-540.328]},
			"YXL" : {"YXL Waistband" : [-1328.558,-893.368],"YXL Right Inside Hood" : [-847.198,-974.038],"YXL Left Outside Hood" : [-847.198,-819.388],"YXL Left Inside Hood" : [-961.378,-974.038],"YXL Right Outside Hood" : [-961.378,-819.388],"YXL Right Cuff" : [-1231.008,-983.358],"YXL Right Sleeve" : [-238.608,-886.648],"YXL Left Cuff" : [-1330.268,-983.368],"YXL Left Sleeve" : [-379.278,-886.648],"YXL Pocket" : [-1133.768,-964.428],"YXL Back" : [-558.118,-861.928],"YXL Front" : [-738.188,-866.028]}
		}
	},

	"FD_1873Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Waistband" : [-1295.448,58.482],"YS Right Inside Hood" : [-847.198,-27.438],"YS Left Outside Hood" : [-847.198,127.212],"YS Left Inside Hood" : [-950.578,-27.428],"YS Right Outside Hood" : [-950.578,127.212],"YS Right Cuff" : [-1227.608,-31.518],"YS Right Sleeve" : [-223.648,59.412],"YS Left Cuff" : [-1327.618,-31.518],"YS Left Sleeve" : [-364.318,59.412],"YS Pocket" : [-1126.358,-14.388],"YS Back" : [-541.918,80.492],"YS Front" : [-721.988,75.792]},
			"YM" : {"YM Waistband" : [-1306.018,-243.368],"YM Left Outside Hood" : [-847.198,-173.948],"YM Right Inside Hood" : [-847.198,-328.588],"YM Left Inside Hood" : [-954.168,-328.588],"YM Right Outside Hood" : [-954.178,-173.948],"YM Right Cuff" : [-1228.518,-333.368],"YM Right Sleeve" : [-229.148,-240.708],"YM Left Cuff" : [-1327.698,-333.368],"YM Left Sleeve" : [-369.818,-240.708],"YM Pocket" : [-1129.958,-316.228],"YM Back" : [-547.318,-218.218],"YM Front" : [-727.388,-222.718]},
			"YL" : {"YL Waistband" : [-1316.568,-564.328],"YL Right Inside Hood" : [-847.198,-647.258],"YL Left Outside Hood" : [-847.198,-492.598],"YL Left Inside Hood" : [-957.768,-647.258],"YL Right Outside Hood" : [-957.768,-492.608],"YL Right Cuff" : [-1229.258,-654.318],"YL Right Sleeve" : [-234.458,-559.628],"YL Left Cuff" : [-1329.008,-654.318],"YL Left Sleeve" : [-375.118,-559.548],"YL Pocket" : [-1131.868,-636.288],"YL Back" : [-552.718,-536.028],"YL Front" : [-732.788,-540.328]},
			"YXL" : {"YXL Waistband" : [-1328.558,-893.368],"YXL Right Inside Hood" : [-847.198,-974.038],"YXL Left Outside Hood" : [-847.198,-819.388],"YXL Left Inside Hood" : [-961.378,-974.038],"YXL Right Outside Hood" : [-961.378,-819.388],"YXL Right Cuff" : [-1231.008,-983.358],"YXL Right Sleeve" : [-238.608,-886.648],"YXL Left Cuff" : [-1330.268,-983.368],"YXL Left Sleeve" : [-379.278,-886.648],"YXL Pocket" : [-1133.768,-964.428],"YXL Back" : [-558.118,-861.928],"YXL Front" : [-738.188,-866.028]}	
		}
	},

	"FD-1873Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
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
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XS" : {"XS Left Sleeve" : [-211.576,262.155],"XS Right Sleeve" : [-382.888,261.821],"XS Back" : [-620.55,295.161],"XS Front" : [-795.629,286.456],"XS Collar" : [-1005.116,184.509]},
			"S" : {"S Left Sleeve" : [-214.477,7.596],"S Right Sleeve" : [-385.789,7.262],"S Back" : [-624.112,39.334],"S Front" : [-799.251,31.104],"S Collar" : [-1004.558,-71.318]},
			"M" : {"M Left Sleeve" : [-217.377,-250.683],"M Right Sleeve" : [-388.689,-251.018],"M Back" : [-627.68,-220.197],"M Front" : [-802.872,-227.924],"M Collar" : [-1006.791,-330.849]},
			"L" : {"L Left Sleeve" : [-220.278,-516.971],"L Right Sleeve" : [-391.589,-517.305],"L Back" : [-631.244,-487.753],"L Front" : [-806.491,-494.976],"L Collar" : [-1006.915,-598.404]},
			"XL" : {"XL Left Sleeve" : [-223.895,-777.959],"XL Right Sleeve" : [-395.207,-778.293],"XL Back" : [-636.616,-755.407],"XL Front" : [-811.935,-762.067],"XL Collar" : [-1009.235,-866.059]},
			"2XL" : {"2XL Left Sleeve" : [-227.526,-1049.9],"2XL Right Sleeve" : [-398.838,-1050.234],"2XL Back" : [-641.99,-1029.695],"2XL Front" : [-817.373,-1035.851],"2XL Collar" : [-1011.974,-1140.347]}
		}
	},

	"FD_3037W" :
	{
		"mockupSize" : "M",
		"sizes" : ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
		"scaleFrontLogo" : false,
		"placement" :
		{
			"XXS" : {"XXS Left Sleeve" : [-219.966,396.7],"XXS Right Sleeve" : [-219.964,516.819],"XXS Back" : [-436.223,524.824],"XXS Front" : [-669.402,522.559],"XXS Collar" : [-888.25,411.874]},
			"XS" : {"XS Left Sleeve" : [-222.154,157.641],"XS Right Sleeve" : [-222.152,277.76],"XS Back" : [-439.802,281.167],"XS Front" : [-672.991,279.706],"XS Collar" : [-890.554,168.315]},
			"S" : {"S Left Sleeve" : [-224.344,-92.431],"S Right Sleeve" : [-224.341,27.687],"S Back" : [-443.385,35.448],"S Front" : [-676.59,34.858],"S Collar" : [-892.858,-77.379]},
			"M" : {"M Left Sleeve" : [-226.534,-344.335],"M Right Sleeve" : [-226.85,-224.217],"M Back" : [-446.984,-213.359],"M Front" : [-680.171,-212.983],"M Collar" : [-895.162,-326.161]},
			"L" : {"L Left Sleeve" : [-228.712,-601.054],"L Right Sleeve" : [-228.71,-480.935],"L Back" : [-450.564,-468.027],"L Front" : [-683.769,-467.273],"L Collar" : [-897.465,-580.781]},
			"XL" : {"XL Left Sleeve" : [-230.89,-871.905],"XL Right Sleeve" : [-230.887,-751.786],"XL Back" : [-454.179,-729.303],"XL Front" : [-687.368,-727.677],"XL Collar" : [-899.77,-842.032]},
			"2XL" : {"2XL Left Sleeve" : [-233.043,-1131.994],"2XL Right Sleeve" : [-233.041,-1011.883],"2XL Back" : [-457.771,-993.617],"2XL Front" : [-690.967,-990.65],"2XL Collar" : [-902.074,-1106.322]},
			"3XL" : {"3XL Left Sleeve" : [-235.199,-1405.557],"3XL Right Sleeve" : [-235.516,-1285.439],"3XL Back" : [-461.372,-1263.928],"3XL Front" : [-694.559,-1260.065],"3XL Collar" : [-904.378,-1376.584]}
		}
	},

	"FD_3417" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-254.418,730.15],"S Collar" : [-1145.53,768.132],"S Left Sleeve" : [-254.421,858.451],"S Back" : [-550.673,885.575],"S Front" : [-832.432,878.416]},
			"M" : {"M Right Sleeve" : [-256.533,435.016],"M Collar" : [-1151.729,469.364],"M Left Sleeve" : [-256.533,563.325],"M Back" : [-555.747,590.382],"M Front" : [-837.651,583.252]},
			"L" : {"L Right Sleeve" : [-260.1,127.855],"L Collar" : [-1150.091,158.606],"L Left Sleeve" : [-260.095,256.158],"L Back" : [-560.753,283.212],"L Front" : [-843.049,276.094]},
			"XL" : {"XL Right Sleeve" : [-263.454,-183.234],"XL Collar" : [-1156.414,-155.949],"XL Left Sleeve" : [-263.453,-54.92],"XL Back" : [-565.692,-27.744],"XL Front" : [-847.72,-34.867]},
			"2XL" : {"2XL Right Sleeve" : [-267.437,-506.156],"2XL Collar" : [-1154.506,-481.908],"2XL Left Sleeve" : [-267.437,-377.839],"2XL Back" : [-570.838,-350.11],"2XL Front" : [-853.849,-357.208]},
			"3XL" : {"3XL Right Sleeve" : [-272.277,-845.651],"3XL Collar" : [-1158.861,-817.841],"3XL Left Sleeve" : [-272.277,-717.332],"3XL Back" : [-575.98,-682.429],"3XL Front" : [-859.25,-689.502]},
			"4XL" : {"4XL Right Sleeve" : [-278.186,-1185.281],"4XL Collar" : [-1160.014,-1153.773],"4XL Left Sleeve" : [-278.182,-1056.971],"4XL Back" : [-581.122,-1018.387],"4XL Front" : [-864.651,-1025.442]},
			"5XL" : {"5XL Right Sleeve" : [-283.404,-1525.062],"5XL Collar" : [-1164.505,-1489.706],"5XL Left Sleeve" : [-283.404,-1396.836],"5XL Back" : [-586.262,-1354.326],"5XL Front" : [-870.052,-1361.338]}
		}
	},

	"FD_4416W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"XXS" : {"XXS Right Sleeve" : [-189.827,541.547],"XXS Collar" : [-867.856,566.478],"XXS Left Sleeve" : [-189.827,649.595],"XXS Back" : [-417.149,672.192],"XXS Front" : [-644.298,670.702]},
			"XS" : {"XS Right Sleeve" : [-193.09,285.52],"XS Collar" : [-869.069,310.482],"XS Left Sleeve" : [-193.089,393.566],"XS Back" : [-420.758,418.179],"XS Front" : [-647.901,416.613]},
			"S" : {"S Right Sleeve" : [-196.962,27.454],"S Collar" : [-870.976,52.483],"S Left Sleeve" : [-196.958,135.5],"S Back" : [-424.362,162.205],"S Front" : [-651.498,160.561]},
			"M" : {"M Right Sleeve" : [-201.022,-236.073],"M Collar" : [-873.23,-211.514],"M Left Sleeve" : [-201.026,-128.026],"M Back" : [-427.975,-98.094],"M Front" : [-655.094,-99.794]},
			"L" : {"L Right Sleeve" : [-203.799,-509.097],"L Collar" : [-875.477,-485.51],"L Left Sleeve" : [-203.798,-401.05],"L Back" : [-431.594,-368.373],"L Front" : [-658.686,-370.143]},
			"XL" : {"XL Right Sleeve" : [-206.566,-788.193],"XL Collar" : [-877.522,-765.507],"XL Left Sleeve" : [-206.567,-680.145],"XL Back" : [-435.208,-644.668],"XL Front" : [-662.271,-646.476]},
			"2XL" : {"2XL Right Sleeve" : [-209.296,-1074.675],"2XL Collar" : [-880.283,-1052.893],"2XL Left Sleeve" : [-209.296,-966.628],"2XL Back" : [-438.812,-930.08],"2XL Front" : [-665.873,-931.94]},
			"3XL" : {"3XL Right Sleeve" : [-212.128,-1365.725],"3XL Collar" : [-882.25,-1344.888],"3XL Left Sleeve" : [-212.129,-1257.678],"3XL Back" : [-442.418,-1220.175],"3XL Front" : [-669.47,-1222.071]}
		}
	},

	"FD_3185W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-1112.925,257.609],"XXS Right Sleeve" : [-291.944,336.721],"XXS Left Sleeve" : [-463.106,336.722],"XXS Back" : [-666.761,349.332],"XXS Front" : [-878.7,345.905]},
			"XS" : {"XS Collar" : [-1115.085,11.109],"XS Right Sleeve" : [-294.799,90.663],"XS Left Sleeve" : [-465.963,90.663],"XS Back" : [-670.393,104.612],"XS Front" : [-882.322,101.216]},
			"S" : {"S Collar" : [-1117.245,-235.73],"S Right Sleeve" : [-297.648,-156.243],"S Left Sleeve" : [-468.849,-156.243],"S Back" : [-674.033,-141.019],"S Front" : [-885.94,-144.4]},
			"M" : {"M Collar" : [-1119.405,-489.774],"M Right Sleeve" : [-300.634,-409.405],"M Left Sleeve" : [-471.875,-409.405],"M Back" : [-677.653,-392.842],"M Front" : [-889.561,-396.276]},
			"L" : {"L Collar" : [-1121.565,-750.293],"L Right Sleeve" : [-303.589,-669.414],"L Left Sleeve" : [-474.819,-669.416],"L Back" : [-684.919,-651.437],"L Front" : [-896.805,-654.89]},
			"XL" : {"XL Collar" : [-1123.725,-1011.094],"XL Right Sleeve" : [-306.43,-929.845],"XL Left Sleeve" : [-477.626,-929.845],"XL Back" : [-688.565,-910.458],"XL Front" : [-900.423,-913.918]},
			"2XL" : {"2XL Collar" : [-1125.885,-1275.353],"2XL Right Sleeve" : [-309.379,-1193.861],"2XL Left Sleeve" : [-480.543,-1193.859],"2XL Back" : [-692.178,-1173.049],"2XL Front" : [-904.041,-1176.541]}
		}
	},

	"FD_3184W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XXS" : {"XXS Right Sleeve" : [-649.813,267.446],"XXS Collar" : [-865.42,303.658],"XXS Left Sleeve" : [-649.813,364.893],"XXS Back" : [-268.765,392.944],"XXS Front" : [-474.981,391.432]},
			"XS" : {"XS Right Sleeve" : [-649.78,20.608],"XS Collar" : [-867.58,56.349],"XS Left Sleeve" : [-649.78,118.055],"XS Back" : [-272.037,147.379],"XS Front" : [-478.591,145.856]},
			"S" : {"S Right Sleeve" : [-652.686,-230.994],"S Collar" : [-869.739,-196.235],"S Left Sleeve" : [-652.686,-133.547],"S Back" : [-275.339,-103.515],"S Front" : [-482.191,-105.047]},
			"M" : {"M Right Sleeve" : [-655.593,-481.922],"M Collar" : [-871.9,-448.302],"M Left Sleeve" : [-655.593,-384.476],"M Back" : [-278.674,-353.72],"M Front" : [-485.794,-355.269]},
			"L" : {"L Right Sleeve" : [-658.503,-735.847],"L Collar" : [-874.06,-703.241],"L Left Sleeve" : [-658.503,-638.4],"L Back" : [-285.414,-606.923],"L Front" : [-493.023,-608.486]},
			"XL" : {"XL Right Sleeve" : [-661.418,-997.271],"XL Collar" : [-876.22,-965.686],"XL Left Sleeve" : [-661.418,-899.825],"XL Back" : [-288.803,-867.63],"XL Front" : [-496.625,-869.196]},
			"2XL" : {"2XL Right Sleeve" : [-664.338,-1260.202],"2XL Collar" : [-878.38,-1229.606],"2XL Left Sleeve" : [-664.338,-1162.755],"2XL Back" : [-292.222,-1129.826],"2XL Front" : [-500.225,-1131.403]}
		}
	},

	"FD_260" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XS" : {"XS Left Sleeve" : [-228.798,419.03],"XS Right Sleeve" : [-459.868,419.028],"XS Back" : [-713.961,454.751],"XS Front" : [-977.976,441.511],"XS Front Left Collar" : [-1084.032,390.507],"XS Front Right Collar" : [-1146.611,390.505],"XS Back Collar" : [-1145.299,334.617]},
			"S" : {"S Left Sleeve" : [-231.482,182.905],"S Right Sleeve" : [-462.546,182.901],"S Back" : [-718.468,220.872],"S Front" : [-982.844,207.712],"S Front Left Collar" : [-1084.265,151.35],"S Front Right Collar" : [-1146.843,151.352],"S Back Collar" : [-1147.497,94.052]},
			"M" : {"M Left Sleeve" : [-234.136,-70.264],"M Right Sleeve" : [-465.199,-70.265],"M Back" : [-723.654,-32.233],"M Front" : [-987.607,-44.633],"M Front Left Collar" : [-1084.032,-103.191],"M Front Right Collar" : [-1146.61,-103.19],"M Back Collar" : [-1146.746,-161.788]},
			"L" : {"L Left Sleeve" : [-237.149,-314.794],"L Right Sleeve" : [-468.208,-314.789],"L Back" : [-728.986,-276.312],"L Front" : [-992.485,-289.475],"L Front Left Collar" : [-1084.032,-350.884],"L Front Right Collar" : [-1146.61,-350.884],"L Back Collar" : [-1148.473,-409.801]},
			"XL" : {"XL Left Sleeve" : [-240.41,-575.532],"XL Right Sleeve" : [-471.472,-575.528],"XL Back" : [-734.238,-536.774],"XL Front" : [-997.949,-550.424],"XL Front Left Collar" : [-1084.032,-614.051],"XL Front Right Collar" : [-1146.61,-613.978],"XL Back Collar" : [-1150.371,-673.726]},
			"2XL" : {"2XL Left Sleeve" : [-243.677,-840.265],"2XL Right Sleeve" : [-474.74,-840.262],"2XL Back" : [-739.49,-801.242],"2XL Front" : [-1003.416,-815.37],"2XL Front Left Collar" : [-1084.032,-881.29],"2XL Front Right Collar" : [-1146.61,-881.289],"2XL Back Collar" : [-1152.27,-941.655]},
			"3XL" : {"3XL Left Sleeve" : [-246.957,-1113.05],"3XL Right Sleeve" : [-478.02,-1113.062],"3XL Back" : [-744.747,-1073.702],"3XL Front" : [-1008.883,-1088.315],"3XL Front Left Collar" : [-1084.032,-1155.091],"3XL Front Right Collar" : [-1146.611,-1155.027],"3XL Back Collar" : [-1154.17,-1217.579]}
		}
	},

	"FD_164" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 14.4,
		//"smallestScale" : 4,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-206.678,652.555],"S Left Sleeve" : [-436.331,652.555],"S Back" : [-691.342,667.963],"S Collar" : [-1189.254,564.437],"S Front" : [-964.564,668.207]},
			"M" : {"M Right Sleeve" : [-208.881,385.489],"M Left Sleeve" : [-438.533,385.489],"M Back" : [-696.729,403.494],"M Collar" : [-1192.31,296.437],"M Front" : [-969.95,403.705]},
			"L" : {"L Right Sleeve" : [-211.236,113.745],"L Left Sleeve" : [-440.889,113.745],"L Back" : [-702.114,133.593],"L Collar" : [-1195.388,22.837],"L Front" : [-975.335,133.796]},
			"XL" : {"XL Right Sleeve" : [-214.181,-167.453],"XL Left Sleeve" : [-443.834,-167.453],"XL Back" : [-707.642,-143.073],"XL Collar" : [-1198.477,-257.363],"XL Front" : [-980.863,-142.875]},
			"2XL" : {"2XL Right Sleeve" : [-218.55,-458.696],"2XL Left Sleeve" : [-448.202,-458.696],"2XL Back" : [-713.027,-429.693],"2XL Collar" : [-1201.577,-547.563],"2XL Front" : [-986.249,-429.542]},
			"3XL" : {"3XL Right Sleeve" : [-222.219,-760.562],"3XL Left Sleeve" : [-451.871,-760.562],"3XL Back" : [-718.271,-726.117],"3XL Collar" : [-1204.687,-847.563],"3XL Front" : [-991.493,-725.878]},
			"4XL" : {"4XL Right Sleeve" : [-224.507,-1072.052],"4XL Left Sleeve" : [-454.159,-1072.052],"4XL Back" : [-723.799,-1030.494],"4XL Collar" : [-1207.808,-1155.563],"4XL Front" : [-997.02,-1030.344]},
			"5XL" : {"5XL Right Sleeve" : [-226.749,-1385.205],"5XL Left Sleeve" : [-456.401,-1385.205],"5XL Back" : [-729.184,-1340.814],"5XL Collar" : [-1210.93,-1469.563],"5XL Front" : [-1002.406,-1340.64]}
		}
	},

	"FD_106" : 
	{
		"placement" : 
		{
			// "Back" : {"Back1" : [-1965.504,6165.599],"Back2" : [-1443.33,6165.599],"Back3" : [-1965.536,5724.764],"Back4" : [-1443.33,5724.764]},
			// "Front" : {"Front1" : [-6074.922,6166.008],"Front2" : [-5552.621,6166.008],"Front3" : [-6074.827,5725.167],"Front4" : [-5552.526,5725.167]}		

			// "Back" : {"Back1" : [4412.991,-118.048],"Back2" : [4935.165,-118.048],"Back3" : [4412.959,-558.883],"Back4" : [4935.165,-558.883]},
			// "Front" : {"Front1" : [303.573,-117.64],"Front2" : [825.874,-117.64],"Front3" : [303.668,-558.48],"Front4" : [825.969,-558.48]}

			"Back" : {"Back1" : [2004.869,-119.305],"Back2" : [2527.043,-119.305],"Back3" : [2004.837,-560.14],"Back4" : [2527.043,-560.14]},
			"Front" : {"Front1" : [-2104.549,-118.897],"Front2" : [-1582.248,-118.897],"Front3" : [-2104.454,-559.738],"Front4" : [-1582.153,-559.738]}
		}
	},

	"FD_6061" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Garage" : [-1181.946,681.865],"S Binding" : [-1230.521,615.848],"S Fly" : [-1243.054,707.789],"S Inside Collar" : [-1263.723,517.107],"S Outside Collar" : [-1263.724,576.848],"S Right Sleeve" : [-210.321,713.702],"S Left Sleeve" : [-450.022,713.702],"S Back" : [-724.799,689.739],"S Front" : [-1008.155,686.352]},
			"M" : {"M Garage" : [-1181.946,387.811],"M Binding" : [-1232.145,321.881],"M Fly" : [-1243.054,413.764],"M Inside Collar" : [-1266.974,223.303],"M Outside Collar" : [-1266.974,283.042],"M Right Sleeve" : [-213.947,422.88],"M Left Sleeve" : [-453.647,422.879],"M Back" : [-730.198,399.3],"M Front" : [-1013.553,395.954]},
			"L" : {"L Garage" : [-1181.946,90.941],"L Binding" : [-1233.761,25.001],"L Fly" : [-1243.054,116.735],"L Inside Collar" : [-1270.225,-73.497],"L Outside Collar" : [-1270.225,-13.757],"L Right Sleeve" : [-217.579,129.047],"L Left Sleeve" : [-457.28,129.047],"L Back" : [-735.595,105.95],"L Front" : [-1018.95,102.552]},
			"XL" : {"XL Garage" : [-1181.946,-215.179],"XL Binding" : [-1235.381,-281.208],"XL Fly" : [-1243.054,-189.276],"XL Inside Collar" : [-1273.453,-378.989],"XL Outside Collar" : [-1273.453,-319.248],"XL Right Sleeve" : [-221.657,-173.78],"XL Left Sleeve" : [-461.356,-173.78],"XL Back" : [-740.992,-196.577],"XL Front" : [-1024.349,-199.863]},
			"2XL" : {"2XL Garage" : [-1181.946,-524.21],"2XL Binding" : [-1237.001,-590.11],"2XL Fly" : [-1243.054,-498.049],"2XL Inside Collar" : [-1276.682,-687.478],"2XL Outside Collar" : [-1276.682,-627.739],"2XL Right Sleeve" : [-225.749,-481.405],"2XL Left Sleeve" : [-465.449,-481.404],"2XL Back" : [-746.39,-501.983],"2XL Front" : [-1029.746,-505.27]},
			"3XL" : {"3XL Garage" : [-1181.946,-833.117],"3XL Binding" : [-1238.621,-899.455],"3XL Fly" : [-1243.054,-806.856],"3XL Inside Collar" : [-1279.913,-995.969],"3XL Outside Collar" : [-1279.913,-936.23],"3XL Right Sleeve" : [-229.847,-789.919],"3XL Left Sleeve" : [-469.547,-789.919],"3XL Back" : [-751.788,-807.442],"3XL Front" : [-1035.144,-810.685]},
			"4XL" : {"4XL Garage" : [-1181.995,-1145.361],"4XL Binding" : [-1240.241,-1211.353],"4XL Fly" : [-1243.054,-1119.29],"4XL Inside Collar" : [-1283.144,-1307.46],"4XL Outside Collar" : [-1283.144,-1247.72],"4XL Right Sleeve" : [-233.949,-1101.457],"4XL Left Sleeve" : [-473.65,-1101.457],"4XL Back" : [-757.187,-1115.875],"4XL Front" : [-1040.543,-1119.091]},
			"5XL" : {"5XL Garage" : [-1181.946,-1457.223],"5XL Binding" : [-1241.865,-1523.294],"5XL Fly" : [-1243.054,-1430.67],"5XL Inside Collar" : [-1286.376,-1618.951],"5XL Outside Collar" : [-1286.375,-1559.211],"5XL Right Sleeve" : [-238.055,-1412.984],"5XL Left Sleeve" : [-477.754,-1412.984],"5XL Back" : [-762.586,-1424.303],"5XL Front" : [-1045.941,-1427.505]}
		}
	},

	"FD_3417Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		//"smallestWidth" : 10.8,
		//"smallestScale" : 3,
		"placement" : 
		{
			"YS" : {"YS Right Sleeve" : [-216.874,-114.384],"YS Collar" : [-798.577,-80.76],"YS Left Sleeve" : [-216.881,-6.672],"YS Back" : [-405.364,8.917],"YS Front" : [-602.031,1.936]},
			"YM" : {"YM Right Sleeve" : [-219.287,-354.973],"YM Collar" : [-801.574,-322.76],"YM Left Sleeve" : [-219.283,-247.26],"YM Back" : [-409.804,-227.752],"YM Front" : [-606.46,-234.748]},
			"YL" : {"YL Right Sleeve" : [-221.589,-611.63],"YL Collar" : [-803.537,-580.763],"YL Left Sleeve" : [-221.585,-503.914],"YL Back" : [-414.183,-480.409],"YL Front" : [-610.848,-487.415]},
			"YXL" : {"YXL Right Sleeve" : [-223.885,-876.284],"YXL Collar" : [-807.386,-846.763],"YXL Left Sleeve" : [-223.881,-768.571],"YXL Back" : [-418.594,-741.054],"YXL Front" : [-615.253,-748.058]}
		}
	},

	"FD_3090W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XXS" : {"XXS Insert Right" : [-1053.169,573.231],"XXS Insert Right" : [-1053.169,573.231],"XXS Insert Left" : [-1126.354,573.059],"XXS Insert Left" : [-1126.354,573.059],"XXS Right Cuff" : [-983.565,562.235],"XXS Right Sleeve" : [-413.058,590.091],"XXS Left Cuff" : [-1223.522,562.351],"XXS Left Sleeve" : [-228.473,590.265],"XXS Back" : [-631.759,629.53],"XXS Collar" : [-1137.569,493.989],"XXS Front" : [-854.866,627.744]},
			"XS" : {"XS Insert Right" : [-1053.169,329.582],"XS Insert Right" : [-1053.169,329.582],"XS Insert Left" : [-1126.354,329.596],"XS Insert Left" : [-1126.354,329.596],"XS Right Cuff" : [-984.465,318.248],"XS Right Sleeve" : [-415.605,346.983],"XS Left Cuff" : [-1224.421,318.529],"XS Left Sleeve" : [-231.019,347.158],"XS Back" : [-635.362,385.718],"XS Collar" : [-1139.908,250.651],"XS Front" : [-858.467,384.582]},
			"S" : {"S Insert Right" : [-1053.169,79.082],"S Insert Right" : [-1053.169,79.082],"S Insert Left" : [-1126.354,79.06],"S Insert Left" : [-1126.354,79.06],"S Right Cuff" : [-985.567,68.288],"S Right Sleeve" : [-418.153,97.891],"S Left Cuff" : [-1225.322,68.243],"S Left Sleeve" : [-233.568,98.065],"S Back" : [-638.963,135.953],"S Collar" : [-1145.777,-4.136],"S Front" : [-862.069,135.324]},
			"M" : {"M Insert Right" : [-1053.169,-172.786],"M Insert Right" : [-1053.169,-172.786],"M Insert Left" : [-1126.354,-172.874],"M Insert Left" : [-1126.354,-172.874],"M Right Cuff" : [-986.266,-183.67],"M Right Sleeve" : [-420.7,-153.217],"M Left Cuff" : [-1226.221,-183.606],"M Left Sleeve" : [-236.114,-153.042],"M Back" : [-642.564,-115.813],"M Collar" : [-1148.9,-256.136],"M Front" : [-865.67,-115.654]},
			"L" : {"L Insert Right" : [-1053.169,-426.833],"L Insert Right" : [-1053.169,-426.833],"L Insert Left" : [-1126.354,-426.719],"L Insert Left" : [-1126.354,-426.719],"L Right Cuff" : [-987.708,-437.488],"L Right Sleeve" : [-423.247,-406.309],"L Left Cuff" : [-1227.122,-437.529],"L Left Sleeve" : [-238.662,-406.135],"L Back" : [-646.166,-369.563],"L Collar" : [-1150.808,-510.136],"L Front" : [-869.272,-368.816]},
			"XL" : {"XL Insert Right" : [-1053.169,-688.886],"XL Insert Right" : [-1053.169,-688.886],"XL Insert Left" : [-1126.354,-688.797],"XL Insert Left" : [-1126.354,-688.797],"XL Right Cuff" : [-988.065,-699.614],"XL Right Sleeve" : [-425.796,-667.417],"XL Left Cuff" : [-1228.022,-699.574],"XL Left Sleeve" : [-241.21,-667.242],"XL Back" : [-649.767,-631.313],"XL Collar" : [-1154.251,-772.136],"XL Front" : [-872.872,-630.073]},
			"2XL" : {"2XL Insert Right" : [-1053.169,-950.801],"2XL Insert Right" : [-1053.169,-950.801],"2XL Insert Left" : [-1126.354,-950.655],"2XL Insert Left" : [-1126.354,-950.655],"2XL Right Cuff" : [-988.965,-961.824],"2XL Right Sleeve" : [-428.344,-928.509],"2XL Left Cuff" : [-1228.921,-961.825],"2XL Left Sleeve" : [-243.758,-928.335],"2XL Back" : [-653.367,-893.063],"2XL Collar" : [-1158.904,-1034.136],"2XL Front" : [-876.474,-891.05]},
			"3XL" : {"3XL Insert Right" : [-1053.169,-1216.878],"3XL Insert Right" : [-1053.169,-1216.878],"3XL Insert Left" : [-1126.354,-1216.737],"3XL Insert Left" : [-1126.354,-1216.737],"3XL Right Cuff" : [-989.979,-1227.586],"3XL Right Sleeve" : [-430.892,-1193.617],"3XL Left Cuff" : [-1229.822,-1227.675],"3XL Left Sleeve" : [-246.306,-1193.442],"3XL Back" : [-656.97,-1158.845],"3XL Collar" : [-1160.708,-1300.136],"3XL Front" : [-880.074,-1156.306]}
		}
	},

	"FD_261" :
	{
		"mockupSize" : "XL",
		"placement" :
		{
			"S" : {"S Left Leg Panel" : [-314.163,287.542],"S Right Leg Panel" : [-600.106,287.459]},
			"M" : {"M Left Leg Panel" : [-318.752,50.731],"M Right Leg Panel" : [-604.695,50.866]},
			"L" : {"L Left Leg Panel" : [-323.317,-182.974],"L Right Leg Panel" : [-609.259,-182.814]},
			"XL" : {"XL Left Leg Panel" : [-327.859,-419.362],"XL Right Leg Panel" : [-613.802,-419.105]},
			"2XL" : {"2XL Left Leg Panel" : [-332.905,-665.561],"2XL Right Leg Panel" : [-618.848,-665.206]},
			"3XL" : {"3XL Left Leg Panel" : [-336.425,-916.248],"3XL Right Leg Panel" : [-622.368,-915.758]}
		}
	}, 

	"FD_3007" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XS" : {"XS Outside Front Collar B" : [-1178.681,335.94],"XS Outside Front Collar A" : [-1227.179,335.94],"XS Back Collar" : [-1162.588,259.922],"XS Inside Front Collar B" : [-1066.205,335.94],"XS Right Sleeve" : [-262.165,285.542],"XS Inside Front Collar A" : [-1114.703,335.94],"XS Cowl Yoke" : [-964.224,331.706],"XS Left Sleeve" : [-262.165,420.439],"XS Back" : [-487.074,387.734],"XS Front" : [-739.163,387.724]},
			"S" : {"S Outside Front Collar B" : [-1178.015,75.006],"S Outside Front Collar A" : [-1227.398,75.012],"S Back Collar" : [-1163.21,-2.075],"S Inside Front Collar B" : [-1067.326,75.006],"S Right Sleeve" : [-265.039,25.355],"S Inside Front Collar A" : [-1114.929,75.006],"S Cowl Yoke" : [-969.624,69.708],"S Left Sleeve" : [-265.039,160.252],"S Back" : [-492.477,129.332],"S Front" : [-744.563,129.323]},
			"M" : {"M Outside Front Collar B" : [-1179.134,-191.922],"M Outside Front Collar A" : [-1227.628,-191.808],"M Back Collar" : [-1164.401,-270.078],"M Inside Front Collar B" : [-1066.657,-191.93],"M Right Sleeve" : [-267.911,-240.83],"M Inside Front Collar A" : [-1115.152,-191.928],"M Cowl Yoke" : [-975.024,-198.292],"M Left Sleeve" : [-267.914,-105.935],"M Back" : [-497.873,-135.077],"M Front" : [-749.963,-135.077]},
			"L" : {"L Outside Front Collar B" : [-1179.354,-456.864],"L Outside Front Collar A" : [-1227.851,-456.864],"L Back Collar" : [-1164.96,-536.078],"L Inside Front Collar B" : [-1066.88,-456.855],"L Right Sleeve" : [-270.788,-505.017],"L Inside Front Collar A" : [-1115.379,-456.855],"L Cowl Yoke" : [-980.424,-464.294],"L Left Sleeve" : [-270.792,-370.122],"L Back" : [-503.273,-397.48],"L Front" : [-755.362,-397.476]},
			"XL" : {"XL Outside Front Collar B" : [-1179.585,-721.798],"XL Outside Front Collar A" : [-1228.083,-721.798],"XL Back Collar" : [-1166.077,-802.079],"XL Inside Front Collar B" : [-1067.108,-721.798],"XL Right Sleeve" : [-273.665,-769.195],"XL Inside Front Collar A" : [-1115.603,-721.798],"XL Cowl Yoke" : [-985.828,-730.294],"XL Left Sleeve" : [-273.662,-634.307],"XL Back" : [-508.672,-659.88],"XL Front" : [-760.762,-659.877]},
			"2XL" : {"2XL Outside Front Collar B" : [-1179.804,-988.731],"2XL Outside Front Collar A" : [-1228.306,-988.731],"2XL Back Collar" : [-1167.09,-1070.079],"2XL Inside Front Collar B" : [-1067.331,-988.725],"2XL Right Sleeve" : [-276.54,-1035.381],"2XL Inside Front Collar A" : [-1115.829,-988.731],"2XL Cowl Yoke" : [-991.224,-998.294],"2XL Left Sleeve" : [-276.54,-901.399],"2XL Back" : [-514.072,-924.281],"2XL Front" : [-766.162,-924.276]},
			"3XL" : {"3XL Outside Front Collar B" : [-1180.03,-1257.666],"3XL Outside Front Collar A" : [-1228.525,-1257.666],"3XL Back Collar" : [-1168.38,-1340.079],"3XL Inside Front Collar B" : [-1067.557,-1257.666],"3XL Right Sleeve" : [-279.415,-1303.576],"3XL Inside Front Collar A" : [-1116.054,-1257.666],"3XL Cowl Yoke" : [-996.625,-1247.441],"3XL Left Sleeve" : [-279.409,-1170.508],"3XL Back" : [-519.472,-1190.681],"3XL Front" : [-771.565,-1190.676]}
		}
	},

	"FD_3050" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XS" : {"XS Left Sleeve" : [-224.105,312.636],"XS Right Sleeve" : [-449.125,312.63],"XS Bottom Binding" : [-1433.716,278.809],"XS Sleeve Binding" : [-1401.284,252.804],"XS Back" : [-697.434,349.531],"XS Collar" : [-1321.274,223.917],"XS Front" : [-959.982,339.127]},
			"S" : {"S Left Sleeve" : [-227.139,94.714],"S Right Sleeve" : [-452.161,94.712],"S Bottom Binding" : [-1433.725,56.79],"S Sleeve Binding" : [-1401.267,30.785],"S Back" : [-701.942,133.599],"S Collar" : [-1323.366,1.898],"S Front" : [-964.845,123.31]},
			"M" : {"M Left Sleeve" : [-229.917,-142.567],"M Right Sleeve" : [-454.939,-142.566],"M Bottom Binding" : [-1433.577,-183.234],"M Sleeve Binding" : [-1401.336,-209.239],"M Back" : [-707.127,-103.545],"M Collar" : [-1325.384,-238.126],"M Front" : [-969.612,-113.062]},
			"L" : {"L Left Sleeve" : [-232.844,-376.154],"L Right Sleeve" : [-457.865,-376.158],"L Bottom Binding" : [-1433.983,-420.258],"L Sleeve Binding" : [-1401.254,-446.263],"L Back" : [-712.459,-336.645],"L Collar" : [-1328.372,-475.15],"L Front" : [-974.49,-346.926]},
			"XL" : {"XL Left Sleeve" : [-235.695,-618.641],"XL Right Sleeve" : [-460.718,-618.641],"XL Bottom Binding" : [-1433.625,-666.28],"XL Sleeve Binding" : [-1401.445,-692.224],"XL Back" : [-717.711,-579.127],"XL Collar" : [-1332.267,-721.174],"XL Front" : [-979.954,-589.902]},
			"2XL" : {"2XL Left Sleeve" : [-237.922,-873.266],"2XL Right Sleeve" : [-462.948,-873.26],"2XL Bottom Binding" : [-1433.553,-924.087],"2XL Sleeve Binding" : [-1401.22,-950.258],"2XL Back" : [-722.961,-833.628],"2XL Collar" : [-1335.39,-979.2],"2XL Front" : [-985.421,-844.874]},
			"3XL" : {"3XL Left Sleeve" : [-240.675,-1133.897],"3XL Right Sleeve" : [-465.188,-1133.894],"3XL Bottom Binding" : [-1433.703,-1188.347],"3XL Sleeve Binding" : [-1401.328,-1214.337],"3XL Back" : [-728.217,-1089.345],"3XL Collar" : [-1339.456,-1243.239],"3XL Front" : [-990.884,-1105.858]}
		}
	},

	"FD_4005W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XXS" : {"XXS Back Left" : [-182.419,414.89],"XXS Front Left" : [-282.913,411.418],"XXS Front Right" : [-451.236,411.418],"XXS Back Right" : [-573.372,414.89]},
			"XS" : {"XS Back Left" : [-182.419,242.184],"XS Front Left" : [-287.412,238.707],"XS Front Right" : [-451.236,238.707],"XS Back Right" : [-577.86,242.185]},
			"S" : {"S Back Left" : [-182.419,63.679],"S Front Left" : [-291.916,60.211],"S Front Right" : [-451.236,60.211],"S Back Right" : [-582.376,63.679]},
			"M" : {"M Back Left" : [-182.419,-122.184],"M Front Left" : [-296.417,-125.655],"M Front Right" : [-451.236,-125.655],"M Back Right" : [-586.876,-122.177]},
			"L" : {"L Back Left" : [-182.419,-307.603],"L Front Left" : [-300.917,-311.083],"L Front Right" : [-451.236,-311.083],"L Back Right" : [-591.365,-307.604]},
			"XL" : {"XL Back Left" : [-182.419,-499.028],"XL Front Left" : [-305.417,-502.51],"XL Front Right" : [-451.236,-502.51],"XL Back Right" : [-595.877,-499.028]},
			"2XL" : {"2XL Back Left" : [-182.419,-687.452],"2XL Front Left" : [-309.916,-690.937],"2XL Front Right" : [-451.236,-690.937],"2XL Back Right" : [-600.376,-687.452]},
			"3XL" : {"3XL Back Left" : [-182.419,-884.878],"3XL Front Left" : [-314.412,-888.374],"3XL Front Right" : [-451.236,-888.375],"3XL Back Right" : [-604.86,-884.878]}
		}
	},

	"FD_3048W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"XXS" : {"XXS Left Sleeve" : [-147.738,416.971],"XXS Right Sleeve" : [-147.745,536.802],"XXS Back" : [-364.727,545.287],"XXS Front" : [-588.796,545.338],"XXS Neck Tab" : [-758.563,470.379],"XXS Collar" : [-817.841,430.636]},
			"XS" : {"XS Left Sleeve" : [-149.931,174.971],"XS Right Sleeve" : [-149.938,294.802],"XS Back" : [-368.309,304.611],"XS Front" : [-592.385,304.655],"XS Neck Tab" : [-759.371,228.379],"XS Collar" : [-820.129,188.636]},
			"S" : {"S Left Sleeve" : [-152.127,-77.029],"S Right Sleeve" : [-152.135,42.802],"S Back" : [-371.898,53.94],"S Front" : [-595.983,53.983],"S Neck Tab" : [-760.101,-23.621],"S Collar" : [-822.432,-63.364]},
			"M" : {"M Left Sleeve" : [-154.322,-327.243],"M Right Sleeve" : [-154.329,-207.412],"M Back" : [-375.491,-192.698],"M Front" : [-599.565,-192.655],"M Neck Tab" : [-760.109,-273.835],"M Collar" : [-824.737,-313.578]},
			"L" : {"L Left Sleeve" : [-156.505,-586.128],"L Right Sleeve" : [-156.512,-466.297],"L Back" : [-379.071,-448.905],"L Front" : [-603.163,-448.853],"L Neck Tab" : [-760.172,-533.621],"L Collar" : [-827.04,-573.364]},
			"XL" : {"XL Left Sleeve" : [-158.688,-851.229],"XL Right Sleeve" : [-158.696,-731.398],"XL Back" : [-382.684,-713.118],"XL Front" : [-606.762,-713.066],"XL Neck Tab" : [-760.246,-799.621],"XL Collar" : [-829.344,-839.364]},
			"2XL" : {"2XL Left Sleeve" : [-160.845,-1116.528],"2XL Right Sleeve" : [-160.853,-996.697],"2XL Back" : [-386.278,-979.33],"2XL Front" : [-610.361,-979.279],"2XL Neck Tab" : [-760.31,-1067.621],"2XL Collar" : [-831.649,-1107.364]},
			"3XL" : {"3XL Left Sleeve" : [-163.004,-1387.829],"3XL Right Sleeve" : [-163.011,-1267.999],"3XL Back" : [-389.877,-1251.541],"3XL Front" : [-613.955,-1251.486],"3XL Neck Tab" : [-760.375,-1341.621],"3XL Collar" : [-834.03,-1381.364]}
		}
	},

	"PS_5014" : 
	{
		"mockupSize" : "",
		"scaleFrontLogo" : false,
		"pantsSizing" : true,
		"placement" : 
		{
			"26I" : {"44Wx26I Small Belt Loop" : [-63.337,1108.63],"44Wx26I Solid Welt 2" : [-141.396,650.156],"44Wx26I Left Leg Panel" : [-141.396,1107.372],"44Wx26I Solid Welt 1" : [-219.357,650.156],"44Wx26I Large Belt Loop 3" : [-219.357,700.158],"44Wx26I Large Belt Loop 2" : [-219.357,744.534],"44Wx26I Large Belt Loop 1" : [-219.357,790.48],"44Wx26I Right Leg Panel" : [-219.357,1107.372],"42Wx26I Small Belt Loop" : [-310.307,1101.974],"42Wx26I Solid Welt 2" : [-388.552,651.816],"42Wx26I Left Leg Panel" : [-388.552,1105.429],"42Wx26I Solid Welt 1" : [-467.106,651.816],"42Wx26I Large Belt Loop 3" : [-467.106,700.154],"42Wx26I Large Belt Loop 2" : [-467.106,744.53],"42Wx26I Large Belt Loop 1" : [-467.106,790.476],"42Wx26I Right Leg Panel" : [-467.106,1105.429],"40Wx26I Small Belt Loop" : [-558.037,1095.984],"40Wx26I Solid Welt 2" : [-636.544,651.816],"40Wx26I Left Leg Panel" : [-636.544,1103.717],"40Wx26I Solid Welt 1" : [-714.636,651.816],"40Wx26I Large Belt Loop 3" : [-714.636,700.148],"40Wx26I Large Belt Loop 2" : [-714.636,744.523],"40Wx26I Large Belt Loop 1" : [-714.636,790.469],"40Wx26I Right Leg Panel" : [-714.636,1103.717],"38Wx26I Small Belt Loop" : [-805.622,1096.564],"38Wx26I Solid Welt 2" : [-883.964,651.816],"38Wx26I Left Leg Panel" : [-883.964,1101.05],"38Wx26I Solid Welt 1" : [-962.143,651.816],"38Wx26I Large Belt Loop 3" : [-962.143,700.154],"38Wx26I Large Belt Loop 2" : [-962.143,744.529],"38Wx26I Large Belt Loop 1" : [-962.143,790.476],"38Wx26I Right Leg Panel" : [-962.143,1101.05],"36Wx26I Small Belt Loop" : [-1053.104,1098.618],"36Wx26I Solid Welt 2" : [-1131.442,651.815],"36Wx26I Left Leg Panel" : [-1131.442,1099.728],"36Wx26I Solid Welt 1" : [-1210.955,651.815],"36Wx26I Large Belt Loop 3" : [-1210.955,700.154],"36Wx26I Large Belt Loop 2" : [-1210.955,744.53],"36Wx26I Large Belt Loop 1" : [-1210.955,790.476],"36Wx26I Right Leg Panel" : [-1210.955,1099.728],"34Wx26I Small Belt Loop" : [-1302.465,1096.974],"34Wx26I Solid Welt 2" : [-1380.74,651.816],"34Wx26I Left Leg Panel" : [-1380.74,1097.223],"34Wx26I Solid Welt 1" : [-1459.208,651.816],"34Wx26I Large Belt Loop 3" : [-1459.208,700.154],"34Wx26I Large Belt Loop 2" : [-1459.208,744.529],"34Wx26I Large Belt Loop 1" : [-1459.208,790.475],"34Wx26I Right Leg Panel" : [-1459.208,1097.223],"32Wx26I Small Belt Loop" : [-1550.322,1094.506],"32Wx26I Solid Welt 2" : [-1628.601,651.816],"32Wx26I Left Leg Panel" : [-1628.601,1095.916],"32Wx26I Solid Welt 1" : [-1706.797,651.816],"32Wx26I Large Belt Loop 3" : [-1706.797,700.154],"32Wx26I Large Belt Loop 2" : [-1706.797,744.529],"32Wx26I Large Belt Loop 1" : [-1706.797,790.475],"32Wx26I Right Leg Panel" : [-1706.797,1095.916],"30Wx26I Small Belt Loop" : [-1797.994,1090.663],"30Wx26I Solid Welt 2" : [-1876.426,651.816],"30Wx26I Left Leg Panel" : [-1876.426,1095.916],"30Wx26I Solid Welt 1" : [-1954.973,651.816],"30Wx26I Large Belt Loop 3" : [-1954.973,700.145],"30Wx26I Large Belt Loop 2" : [-1954.973,744.521],"30Wx26I Large Belt Loop 1" : [-1954.973,790.467],"30Wx26I Right Leg Panel" : [-1954.973,1095.916]},
			"28I" : {"44Wx28I Small Belt Loop" : [-63.337,512.922],"44Wx28I Solid Welt 2" : [-141.396,43.354],"44Wx28I Left Leg Panel" : [-141.396,522.708],"44Wx28I Solid Welt 1" : [-219.357,43.354],"44Wx28I Large Belt Loop 3" : [-219.357,94.308],"44Wx28I Large Belt Loop 2" : [-219.357,139.451],"44Wx28I Large Belt Loop 1" : [-219.357,187.15],"44Wx28I Right Leg Panel" : [-219.357,522.708],"42Wx28I Small Belt Loop" : [-310.307,512.922],"42Wx28I Solid Welt 2" : [-388.552,43.354],"42Wx28I Left Leg Panel" : [-388.552,520.765],"42Wx28I Solid Welt 1" : [-467.106,43.354],"42Wx28I Large Belt Loop 3" : [-467.106,94.304],"42Wx28I Large Belt Loop 2" : [-467.106,139.447],"42Wx28I Large Belt Loop 1" : [-467.106,187.073],"42Wx28I Right Leg Panel" : [-467.106,520.764],"40Wx28I Small Belt Loop" : [-558.037,508.929],"40Wx28I Solid Welt 2" : [-636.544,39.029],"40Wx28I Left Leg Panel" : [-636.544,518.82],"40Wx28I Solid Welt 1" : [-714.636,39.029],"40Wx28I Large Belt Loop 3" : [-714.636,94.297],"40Wx28I Large Belt Loop 2" : [-714.636,139.439],"40Wx28I Large Belt Loop 1" : [-714.636,186.066],"40Wx28I Right Leg Panel" : [-714.636,518.82],"38Wx28I Small Belt Loop" : [-805.622,508.262],"38Wx28I Solid Welt 2" : [-883.964,39.029],"38Wx28I Left Leg Panel" : [-883.964,516.376],"38Wx28I Solid Welt 1" : [-962.143,39.029],"38Wx28I Large Belt Loop 3" : [-962.143,94.304],"38Wx28I Large Belt Loop 2" : [-962.143,139.447],"38Wx28I Large Belt Loop 1" : [-962.143,185.073],"38Wx28I Right Leg Panel" : [-962.143,516.376],"36Wx28I Small Belt Loop" : [-1053.104,505.6],"36Wx28I Solid Welt 2" : [-1131.442,39.029],"36Wx28I Left Leg Panel" : [-1131.442,514.474],"36Wx28I Solid Welt 1" : [-1210.955,39.029],"36Wx28I Large Belt Loop 3" : [-1210.955,94.304],"36Wx28I Large Belt Loop 2" : [-1210.955,139.447],"36Wx28I Large Belt Loop 1" : [-1210.955,187.478],"36Wx28I Right Leg Panel" : [-1210.955,514.474],"34Wx28I Small Belt Loop" : [-1302.465,502.271],"34Wx28I Solid Welt 2" : [-1380.74,39.029],"34Wx28I Left Leg Panel" : [-1380.74,512.558],"34Wx28I Solid Welt 1" : [-1459.208,39.029],"34Wx28I Large Belt Loop 3" : [-1459.208,94.303],"34Wx28I Large Belt Loop 2" : [-1459.208,139.445],"34Wx28I Large Belt Loop 1" : [-1459.208,187.072],"34Wx28I Right Leg Panel" : [-1459.208,512.559],"32Wx28I Small Belt Loop" : [-1550.322,506.265],"32Wx28I Solid Welt 2" : [-1628.601,39.029],"32Wx28I Left Leg Panel" : [-1628.601,510.649],"32Wx28I Solid Welt 1" : [-1706.797,39.029],"32Wx28I Large Belt Loop 3" : [-1706.797,89.977],"32Wx28I Large Belt Loop 2" : [-1706.797,135.119],"32Wx28I Large Belt Loop 1" : [-1706.797,182.476],"32Wx28I Right Leg Panel" : [-1706.797,510.649],"30Wx28I Small Belt Loop" : [-1797.994,504.933],"30Wx28I Solid Welt 2" : [-1876.426,36.796],"30Wx28I Left Leg Panel" : [-1876.426,509.447],"30Wx28I Solid Welt 1" : [-1954.973,36.796],"30Wx28I Large Belt Loop 3" : [-1954.973,87.736],"30Wx28I Large Belt Loop 2" : [-1954.973,132.878],"30Wx28I Large Belt Loop 1" : [-1954.973,179.517],"30Wx28I Right Leg Panel" : [-1954.973,509.447]},
			"30I" : {"44Wx30I Small Belt Loop" : [-63.337,-55.949],"44Wx30I Solid Welt 2" : [-141.396,-540.737],"44Wx30I Left Leg Panel" : [-141.396,-41.132],"44Wx30I Solid Welt 1" : [-219.357,-540.737],"44Wx30I Large Belt Loop 3" : [-219.357,-488.144],"44Wx30I Large Belt Loop 2" : [-219.357,-438.789],"44Wx30I Large Belt Loop 1" : [-219.357,-387.669],"44Wx30I Right Leg Panel" : [-219.357,-41.132],"42Wx30I Small Belt Loop" : [-310.307,-55.949],"42Wx30I Solid Welt 2" : [-388.552,-540.737],"42Wx30I Left Leg Panel" : [-388.552,-43.078],"42Wx30I Solid Welt 1" : [-467.106,-540.737],"42Wx30I Large Belt Loop 3" : [-467.106,-488.148],"42Wx30I Large Belt Loop 2" : [-467.106,-438.792],"42Wx30I Large Belt Loop 1" : [-467.106,-387.673],"42Wx30I Right Leg Panel" : [-467.106,-43.078],"40Wx30I Small Belt Loop" : [-558.037,-55.949],"40Wx30I Solid Welt 2" : [-636.544,-540.737],"40Wx30I Left Leg Panel" : [-636.544,-44.668],"40Wx30I Solid Welt 1" : [-714.636,-540.737],"40Wx30I Large Belt Loop 3" : [-714.636,-488.155],"40Wx30I Large Belt Loop 2" : [-714.636,-438.801],"40Wx30I Large Belt Loop 1" : [-714.636,-387.133],"40Wx30I Right Leg Panel" : [-714.636,-44.668],"38Wx30I Small Belt Loop" : [-805.622,-55.949],"38Wx30I Solid Welt 2" : [-883.964,-540.737],"38Wx30I Left Leg Panel" : [-883.964,-45.668],"38Wx30I Solid Welt 1" : [-962.143,-540.737],"38Wx30I Large Belt Loop 3" : [-962.143,-488.148],"38Wx30I Large Belt Loop 2" : [-962.143,-438.793],"38Wx30I Large Belt Loop 1" : [-962.143,-387.174],"38Wx30I Right Leg Panel" : [-962.143,-45.668],"36Wx30I Small Belt Loop" : [-1053.104,-55.949],"36Wx30I Solid Welt 2" : [-1131.442,-540.737],"36Wx30I Left Leg Panel" : [-1131.442,-49.368],"36Wx30I Solid Welt 1" : [-1210.955,-540.737],"36Wx30I Large Belt Loop 3" : [-1210.955,-488.148],"36Wx30I Large Belt Loop 2" : [-1210.955,-438.793],"36Wx30I Large Belt Loop 1" : [-1210.955,-386.173],"36Wx30I Right Leg Panel" : [-1210.955,-49.368],"34Wx30I Small Belt Loop" : [-1302.465,-55.949],"34Wx30I Solid Welt 2" : [-1380.74,-540.737],"34Wx30I Left Leg Panel" : [-1380.74,-51.284],"34Wx30I Solid Welt 1" : [-1459.208,-540.737],"34Wx30I Large Belt Loop 3" : [-1459.208,-488.149],"34Wx30I Large Belt Loop 2" : [-1459.208,-438.793],"34Wx30I Large Belt Loop 1" : [-1459.208,-385.174],"34Wx30I Right Leg Panel" : [-1459.208,-51.284],"32Wx30I Small Belt Loop" : [-1550.322,-55.949],"32Wx30I Solid Welt 2" : [-1628.601,-540.737],"32Wx30I Left Leg Panel" : [-1628.601,-51.392],"32Wx30I Solid Welt 1" : [-1706.797,-540.737],"32Wx30I Large Belt Loop 3" : [-1706.797,-488.149],"32Wx30I Large Belt Loop 2" : [-1706.797,-438.794],"32Wx30I Large Belt Loop 1" : [-1706.797,-386.174],"32Wx30I Right Leg Panel" : [-1706.797,-51.392],"30Wx30I Small Belt Loop" : [-1797.994,-55.949],"30Wx30I Solid Welt 2" : [-1876.426,-540.737],"30Wx30I Left Leg Panel" : [-1876.426,-54.315],"30Wx30I Solid Welt 1" : [-1954.973,-540.737],"30Wx30I Large Belt Loop 3" : [-1954.973,-488.157],"30Wx30I Large Belt Loop 2" : [-1954.973,-438.802],"30Wx30I Large Belt Loop 1" : [-1954.973,-387.182],"30Wx30I Right Leg Panel" : [-1954.973,-54.315]},
			"32I" : {"44Wx32I Small Belt Loop" : [-63.337,-604.021],"44Wx32I Solid Welt 2" : [-141.396,-1125.965],"44Wx32I Left Leg Panel" : [-141.396,-603.157],"44Wx32I Solid Welt 1" : [-219.357,-1125.965],"44Wx32I Large Belt Loop 3" : [-219.357,-1073.371],"44Wx32I Large Belt Loop 2" : [-219.357,-1015.216],"44Wx32I Large Belt Loop 1" : [-219.357,-964.086],"44Wx32I Right Leg Panel" : [-219.357,-603.157],"42Wx32I Small Belt Loop" : [-310.307,-606.204],"42Wx32I Solid Welt 2" : [-388.552,-1125.965],"42Wx32I Left Leg Panel" : [-388.552,-605.103],"42Wx32I Solid Welt 1" : [-467.106,-1125.965],"42Wx32I Large Belt Loop 3" : [-467.106,-1073.375],"42Wx32I Large Belt Loop 2" : [-467.106,-1015.219],"42Wx32I Large Belt Loop 1" : [-467.106,-965.396],"42Wx32I Right Leg Panel" : [-467.106,-605.103],"40Wx32I Small Belt Loop" : [-558.037,-607.597],"40Wx32I Solid Welt 2" : [-636.544,-1125.965],"40Wx32I Left Leg Panel" : [-636.544,-607.046],"40Wx32I Solid Welt 1" : [-714.636,-1125.965],"40Wx32I Large Belt Loop 3" : [-714.636,-1073.382],"40Wx32I Large Belt Loop 2" : [-714.636,-1015.227],"40Wx32I Large Belt Loop 1" : [-714.636,-963.044],"40Wx32I Right Leg Panel" : [-714.636,-607.046],"38Wx32I Small Belt Loop" : [-805.622,-608.415],"38Wx32I Solid Welt 2" : [-883.964,-1125.965],"38Wx32I Left Leg Panel" : [-883.964,-609.371],"38Wx32I Solid Welt 1" : [-962.143,-1125.965],"38Wx32I Large Belt Loop 3" : [-962.143,-1073.375],"38Wx32I Large Belt Loop 2" : [-962.143,-1015.22],"38Wx32I Large Belt Loop 1" : [-962.143,-965.397],"38Wx32I Right Leg Panel" : [-962.143,-609.371],"36Wx32I Small Belt Loop" : [-1053.104,-612.091],"36Wx32I Solid Welt 2" : [-1131.442,-1125.965],"36Wx32I Left Leg Panel" : [-1131.442,-611.392],"36Wx32I Solid Welt 1" : [-1210.955,-1125.965],"36Wx32I Large Belt Loop 3" : [-1210.955,-1073.375],"36Wx32I Large Belt Loop 2" : [-1210.955,-1015.22],"36Wx32I Large Belt Loop 1" : [-1210.955,-965.552],"36Wx32I Right Leg Panel" : [-1210.955,-611.392],"34Wx32I Small Belt Loop" : [-1302.465,-616.175],"34Wx32I Solid Welt 2" : [-1380.74,-1125.965],"34Wx32I Left Leg Panel" : [-1380.74,-613.309],"34Wx32I Solid Welt 1" : [-1459.208,-1125.965],"34Wx32I Large Belt Loop 3" : [-1459.208,-1073.375],"34Wx32I Large Belt Loop 2" : [-1459.208,-1015.22],"34Wx32I Large Belt Loop 1" : [-1459.208,-962.016],"34Wx32I Right Leg Panel" : [-1459.208,-613.308],"32Wx32I Small Belt Loop" : [-1550.322,-617.809],"32Wx32I Solid Welt 2" : [-1628.601,-1125.965],"32Wx32I Left Leg Panel" : [-1628.601,-615.192],"32Wx32I Solid Welt 1" : [-1706.797,-1125.965],"32Wx32I Large Belt Loop 3" : [-1706.797,-1073.376],"32Wx32I Large Belt Loop 2" : [-1706.797,-1015.22],"32Wx32I Large Belt Loop 1" : [-1706.797,-965.397],"32Wx32I Right Leg Panel" : [-1706.797,-615.192],"30Wx32I Small Belt Loop" : [-1797.994,-617.809],"30Wx32I Solid Welt 2" : [-1876.426,-1125.965],"30Wx32I Left Leg Panel" : [-1876.426,-616.522],"30Wx32I Solid Welt 1" : [-1954.973,-1125.965],"30Wx32I Large Belt Loop 3" : [-1954.973,-1073.384],"30Wx32I Large Belt Loop 2" : [-1954.973,-1015.228],"30Wx32I Large Belt Loop 1" : [-1954.973,-965.405],"30Wx32I Right Leg Panel" : [-1954.973,-616.522]},
			"34I" : {"44Wx34I Small Belt Loop" : [-63.337,-1226.511],"44Wx34I Solid Welt 2" : [-141.396,-1763.199],"44Wx34I Left Leg Panel" : [-141.396,-1229.186],"44Wx34I Solid Welt 1" : [-219.357,-1763.199],"44Wx34I Large Belt Loop 3" : [-219.357,-1712.639],"44Wx34I Large Belt Loop 2" : [-219.357,-1654.584],"44Wx34I Large Belt Loop 1" : [-219.357,-1607.637],"44Wx34I Right Leg Panel" : [-219.357,-1229.187],"42Wx34I Small Belt Loop" : [-310.307,-1226.511],"42Wx34I Solid Welt 2" : [-388.552,-1761.097],"42Wx34I Left Leg Panel" : [-388.552,-1231.131],"42Wx34I Solid Welt 1" : [-467.106,-1761.097],"42Wx34I Large Belt Loop 3" : [-467.106,-1712.643],"42Wx34I Large Belt Loop 2" : [-467.106,-1654.588],"42Wx34I Large Belt Loop 1" : [-467.106,-1605.315],"42Wx34I Right Leg Panel" : [-467.106,-1231.131],"40Wx34I Small Belt Loop" : [-558.037,-1228.505],"40Wx34I Solid Welt 2" : [-636.544,-1761.097],"40Wx34I Left Leg Panel" : [-636.544,-1233.078],"40Wx34I Solid Welt 1" : [-714.636,-1761.097],"40Wx34I Large Belt Loop 3" : [-714.636,-1712.65],"40Wx34I Large Belt Loop 2" : [-714.636,-1654.595],"40Wx34I Large Belt Loop 1" : [-714.636,-1603.336],"40Wx34I Right Leg Panel" : [-714.636,-1233.077],"38Wx34I Small Belt Loop" : [-805.622,-1234.486],"38Wx34I Solid Welt 2" : [-883.964,-1761.097],"38Wx34I Left Leg Panel" : [-883.964,-1235.523],"38Wx34I Solid Welt 1" : [-962.143,-1761.097],"38Wx34I Large Belt Loop 3" : [-962.143,-1712.644],"38Wx34I Large Belt Loop 2" : [-962.143,-1654.589],"38Wx34I Large Belt Loop 1" : [-962.143,-1604.387],"38Wx34I Right Leg Panel" : [-962.143,-1235.523],"36Wx34I Small Belt Loop" : [-1053.104,-1237.477],"36Wx34I Solid Welt 2" : [-1131.442,-1761.097],"36Wx34I Left Leg Panel" : [-1131.442,-1237.393],"36Wx34I Solid Welt 1" : [-1210.955,-1761.097],"36Wx34I Large Belt Loop 3" : [-1210.955,-1712.644],"36Wx34I Large Belt Loop 2" : [-1210.955,-1654.589],"36Wx34I Large Belt Loop 1" : [-1210.955,-1606.516],"36Wx34I Right Leg Panel" : [-1210.955,-1237.393],"34Wx34I Small Belt Loop" : [-1302.465,-1237.478],"34Wx34I Solid Welt 2" : [-1380.74,-1761.097],"34Wx34I Left Leg Panel" : [-1380.74,-1239.337],"34Wx34I Solid Welt 1" : [-1459.208,-1761.097],"34Wx34I Large Belt Loop 3" : [-1459.208,-1712.644],"34Wx34I Large Belt Loop 2" : [-1459.208,-1654.589],"34Wx34I Large Belt Loop 1" : [-1459.208,-1605.838],"34Wx34I Right Leg Panel" : [-1459.208,-1239.337],"32Wx34I Small Belt Loop" : [-1550.322,-1245.452],"32Wx34I Solid Welt 2" : [-1628.601,-1761.097],"32Wx34I Left Leg Panel" : [-1628.601,-1241.247],"32Wx34I Solid Welt 1" : [-1706.797,-1761.097],"32Wx34I Large Belt Loop 3" : [-1706.797,-1712.644],"32Wx34I Large Belt Loop 2" : [-1706.797,-1654.589],"32Wx34I Large Belt Loop 1" : [-1706.797,-1605.213],"32Wx34I Right Leg Panel" : [-1706.797,-1241.247],"30Wx34I Small Belt Loop" : [-1797.994,-1248.444],"30Wx34I Solid Welt 2" : [-1876.426,-1761.097],"30Wx34I Left Leg Panel" : [-1876.426,-1243.149],"30Wx34I Solid Welt 1" : [-1954.973,-1761.097],"30Wx34I Large Belt Loop 3" : [-1954.973,-1712.653],"30Wx34I Large Belt Loop 2" : [-1954.973,-1654.598],"30Wx34I Large Belt Loop 1" : [-1954.973,-1605.439],"30Wx34I Right Leg Panel" : [-1954.973,-1243.149]},
			"36I" : {"44Wx36I Small Belt Loop" : [-63.337,-1846.288],"44Wx36I Solid Welt 2" : [-141.396,-2395.338],"44Wx36I Left Leg Panel" : [-141.396,-1841.273],"44Wx36I Solid Welt 1" : [-219.357,-2395.338],"44Wx36I Large Belt Loop 3" : [-219.357,-2343.736],"44Wx36I Large Belt Loop 2" : [-219.357,-2294.687],"44Wx36I Large Belt Loop 1" : [-219.357,-2245.319],"44Wx36I Right Leg Panel" : [-219.357,-1841.273],"42Wx36I Small Belt Loop" : [-310.307,-1847.285],"42Wx36I Solid Welt 2" : [-388.552,-2395.338],"42Wx36I Left Leg Panel" : [-388.552,-1843.216],"42Wx36I Solid Welt 1" : [-467.106,-2395.338],"42Wx36I Large Belt Loop 3" : [-467.106,-2343.739],"42Wx36I Large Belt Loop 2" : [-467.106,-2294.691],"42Wx36I Large Belt Loop 1" : [-467.106,-2246.203],"42Wx36I Right Leg Panel" : [-467.106,-1843.216],"40Wx36I Small Belt Loop" : [-558.037,-1851.273],"40Wx36I Solid Welt 2" : [-636.544,-2395.338],"40Wx36I Left Leg Panel" : [-636.544,-1845.162],"40Wx36I Solid Welt 1" : [-714.636,-2395.338],"40Wx36I Large Belt Loop 3" : [-714.636,-2343.746],"40Wx36I Large Belt Loop 2" : [-714.636,-2294.698],"40Wx36I Large Belt Loop 1" : [-714.636,-2244.873],"40Wx36I Right Leg Panel" : [-714.636,-1845.162],"38Wx36I Small Belt Loop" : [-805.622,-1849.279],"38Wx36I Solid Welt 2" : [-883.964,-2395.338],"38Wx36I Left Leg Panel" : [-883.964,-1847.607],"38Wx36I Solid Welt 1" : [-962.143,-2395.338],"38Wx36I Large Belt Loop 3" : [-962.143,-2343.74],"38Wx36I Large Belt Loop 2" : [-962.143,-2294.692],"38Wx36I Large Belt Loop 1" : [-962.143,-2246.374],"38Wx36I Right Leg Panel" : [-962.143,-1847.607],"36Wx36I Small Belt Loop" : [-1053.104,-1855.261],"36Wx36I Solid Welt 2" : [-1131.442,-2395.338],"36Wx36I Left Leg Panel" : [-1131.442,-1849.507],"36Wx36I Solid Welt 1" : [-1210.955,-2395.338],"36Wx36I Large Belt Loop 3" : [-1210.955,-2343.74],"36Wx36I Large Belt Loop 2" : [-1210.955,-2294.692],"36Wx36I Large Belt Loop 1" : [-1210.955,-2245.324],"36Wx36I Right Leg Panel" : [-1210.955,-1849.507],"34Wx36I Small Belt Loop" : [-1302.465,-1857.255],"34Wx36I Solid Welt 2" : [-1380.74,-2395.338],"34Wx36I Left Leg Panel" : [-1380.74,-1851.424],"34Wx36I Solid Welt 1" : [-1459.208,-2395.338],"34Wx36I Large Belt Loop 3" : [-1459.208,-2343.74],"34Wx36I Large Belt Loop 2" : [-1459.208,-2294.692],"34Wx36I Large Belt Loop 1" : [-1459.208,-2246.375],"34Wx36I Right Leg Panel" : [-1459.208,-1851.423],"32Wx36I Small Belt Loop" : [-1550.322,-1853.268],"32Wx36I Solid Welt 2" : [-1628.601,-2395.338],"32Wx36I Left Leg Panel" : [-1628.601,-1853.331],"32Wx36I Solid Welt 1" : [-1706.797,-2395.338],"32Wx36I Large Belt Loop 3" : [-1706.797,-2343.741],"32Wx36I Large Belt Loop 2" : [-1706.797,-2294.693],"32Wx36I Large Belt Loop 1" : [-1706.797,-2245.225],"32Wx36I Right Leg Panel" : [-1706.797,-1853.331],"30Wx36I Small Belt Loop" : [-1797.994,-1862.241],"30Wx36I Solid Welt 2" : [-1876.426,-2395.338],"30Wx36I Left Leg Panel" : [-1876.426,-1854.865],"30Wx36I Solid Welt 1" : [-1954.973,-2395.338],"30Wx36I Large Belt Loop 3" : [-1954.973,-2343.749],"30Wx36I Large Belt Loop 2" : [-1954.973,-2294.701],"30Wx36I Large Belt Loop 1" : [-1954.973,-2243.231],"30Wx36I Right Leg Panel" : [-1954.973,-1854.865]}
		}
	},

	"PS_5014Y" : 
	{
		"mockupSize" : "",
		"scaleFrontLogo" : false,
		"pantsSizing" : true,
		"placement" : 
		{
			"26I" : {"30Wx26I Small Belt Loop" : [-78.817,427.057],"30Wx26I Solid Welt 2" : [-150.029,16.423],"30Wx26I Left Leg Panel" : [-150.029,427.164],"30Wx26I Solid Welt 1" : [-220.44,16.423],"30Wx26I Large Belt Loop 3" : [-220.44,55.022],"30Wx26I Large Belt Loop 2" : [-220.44,88.203],"30Wx26I Large Belt Loop 1" : [-220.44,121.89],"30Wx26I Right Leg Panel" : [-220.44,427.164],"28Wx26I Small Belt Loop" : [-312.298,424.883],"28Wx26I Solid Welt 2" : [-383.32,16.423],"28Wx26I Left Leg Panel" : [-383.32,425.58],"28Wx26I Solid Welt 1" : [-452.594,16.423],"28Wx26I Large Belt Loop 3" : [-452.594,57.515],"28Wx26I Large Belt Loop 2" : [-452.594,90.696],"28Wx26I Large Belt Loop 1" : [-452.594,122.769],"28Wx26I Right Leg Panel" : [-452.594,425.58],"26Wx26I Small Belt Loop" : [-544.319,428.562],"26Wx26I Solid Welt 2" : [-612.873,16.423],"26Wx26I Left Leg Panel" : [-612.873,424.595],"26Wx26I Solid Welt 1" : [-681.814,16.423],"26Wx26I Large Belt Loop 3" : [-681.814,57.022],"26Wx26I Large Belt Loop 2" : [-681.814,90.204],"26Wx26I Large Belt Loop 1" : [-681.814,124.252],"26Wx26I Right Leg Panel" : [-681.814,424.595],"24Wx26I Small Belt Loop" : [-773.827,427.408],"24Wx26I Solid Welt 2" : [-844.405,16.423],"24Wx26I Left Leg Panel" : [-844.405,423.699],"24Wx26I Solid Welt 1" : [-914.185,16.423],"24Wx26I Large Belt Loop 3" : [-914.185,58.015],"24Wx26I Large Belt Loop 2" : [-914.185,91.197],"24Wx26I Large Belt Loop 1" : [-914.185,124.22],"24Wx26I Right Leg Panel" : [-914.185,423.699],"22Wx26I Small Belt Loop" : [-1004.518,420.251],"22Wx26I Solid Welt 2" : [-1073.506,16.423],"22Wx26I Left Leg Panel" : [-1073.506,422.318],"22Wx26I Solid Welt 1" : [-1143.199,16.423],"22Wx26I Large Belt Loop 3" : [-1143.199,56.523],"22Wx26I Large Belt Loop 2" : [-1143.199,89.705],"22Wx26I Large Belt Loop 1" : [-1143.199,124.778],"22Wx26I Right Leg Panel" : [-1143.199,422.318]},
			"28I" : {"30Wx28I Small Belt Loop" : [-78.817,-98.011],"30Wx28I Solid Welt 2" : [-150.029,-511.118],"30Wx28I Left Leg Panel" : [-150.029,-85.977],"30Wx28I Solid Welt 1" : [-220.44,-511.118],"30Wx28I Large Belt Loop 3" : [-220.44,-474.02],"30Wx28I Large Belt Loop 2" : [-220.44,-440.838],"30Wx28I Large Belt Loop 1" : [-220.44,-406.767],"30Wx28I Right Leg Panel" : [-220.44,-85.977],"28Wx28I Small Belt Loop" : [-312.298,-94.863],"28Wx28I Solid Welt 2" : [-383.32,-511.118],"28Wx28I Left Leg Panel" : [-383.32,-86.169],"28Wx28I Solid Welt 1" : [-452.594,-511.118],"28Wx28I Large Belt Loop 3" : [-452.594,-472.527],"28Wx28I Large Belt Loop 2" : [-452.594,-439.346],"28Wx28I Large Belt Loop 1" : [-452.594,-404.655],"28Wx28I Right Leg Panel" : [-452.594,-86.169],"26Wx28I Small Belt Loop" : [-544.319,-94.735],"26Wx28I Solid Welt 2" : [-612.873,-511.118],"26Wx28I Left Leg Panel" : [-612.873,-86.169],"26Wx28I Solid Welt 1" : [-681.814,-511.118],"26Wx28I Large Belt Loop 3" : [-681.814,-471.52],"26Wx28I Large Belt Loop 2" : [-681.814,-438.338],"26Wx28I Large Belt Loop 1" : [-681.814,-404.44],"26Wx28I Right Leg Panel" : [-681.814,-86.168],"24Wx28I Small Belt Loop" : [-773.827,-94.016],"24Wx28I Solid Welt 2" : [-844.405,-511.118],"24Wx28I Left Leg Panel" : [-844.405,-89.102],"24Wx28I Solid Welt 1" : [-914.185,-511.118],"24Wx28I Large Belt Loop 3" : [-914.185,-475.321],"24Wx28I Large Belt Loop 2" : [-914.185,-442.139],"24Wx28I Large Belt Loop 1" : [-914.185,-408.37],"24Wx28I Right Leg Panel" : [-914.185,-89.102],"22Wx28I Small Belt Loop" : [-1004.518,-91.851],"22Wx28I Solid Welt 2" : [-1073.506,-511.118],"22Wx28I Left Leg Panel" : [-1073.506,-90.437],"22Wx28I Solid Welt 1" : [-1143.199,-511.118],"22Wx28I Large Belt Loop 3" : [-1143.199,-472.018],"22Wx28I Large Belt Loop 2" : [-1143.199,-438.837],"22Wx28I Large Belt Loop 1" : [-1143.199,-406.19],"22Wx28I Right Leg Panel" : [-1143.199,-90.437]},
			"30I" : {"30Wx30I Small Belt Loop" : [-78.817,-624.568],"30Wx30I Solid Welt 2" : [-150.029,-1052.405],"30Wx30I Left Leg Panel" : [-150.029,-612.864],"30Wx30I Solid Welt 1" : [-220.44,-1052.405],"30Wx30I Large Belt Loop 3" : [-220.44,-1014.306],"30Wx30I Large Belt Loop 2" : [-220.44,-981.125],"30Wx30I Large Belt Loop 1" : [-220.44,-947.284],"30Wx30I Right Leg Panel" : [-220.44,-612.864],"28Wx30I Small Belt Loop" : [-312.298,-618.386],"28Wx30I Solid Welt 2" : [-383.32,-1052.405],"28Wx30I Left Leg Panel" : [-383.32,-614.589],"28Wx30I Solid Welt 1" : [-452.594,-1052.405],"28Wx30I Large Belt Loop 3" : [-452.594,-1016.814],"28Wx30I Large Belt Loop 2" : [-452.594,-983.632],"28Wx30I Large Belt Loop 1" : [-452.594,-950.076],"28Wx30I Right Leg Panel" : [-452.594,-614.589],"26Wx30I Small Belt Loop" : [-544.319,-619.225],"26Wx30I Solid Welt 2" : [-612.873,-1052.405],"26Wx30I Left Leg Panel" : [-612.873,-615.329],"26Wx30I Solid Welt 1" : [-681.814,-1052.405],"26Wx30I Large Belt Loop 3" : [-681.814,-1018.306],"26Wx30I Large Belt Loop 2" : [-681.814,-985.125],"26Wx30I Large Belt Loop 1" : [-681.814,-950.735],"26Wx30I Right Leg Panel" : [-681.814,-615.329],"24Wx30I Small Belt Loop" : [-773.827,-618.378],"24Wx30I Solid Welt 2" : [-844.405,-1052.405],"24Wx30I Left Leg Panel" : [-844.405,-617.025],"24Wx30I Solid Welt 1" : [-914.185,-1052.405],"24Wx30I Large Belt Loop 3" : [-914.185,-1014.313],"24Wx30I Large Belt Loop 2" : [-914.185,-981.132],"24Wx30I Large Belt Loop 1" : [-914.185,-948.517],"24Wx30I Right Leg Panel" : [-914.185,-617.025],"22Wx30I Small Belt Loop" : [-1004.518,-621.214],"22Wx30I Solid Welt 2" : [-1073.506,-1052.405],"22Wx30I Left Leg Panel" : [-1073.506,-617.968],"22Wx30I Solid Welt 1" : [-1143.199,-1052.405],"22Wx30I Large Belt Loop 3" : [-1143.199,-1013.805],"22Wx30I Large Belt Loop 2" : [-1143.199,-980.623],"22Wx30I Large Belt Loop 1" : [-1143.199,-947.472],"22Wx30I Right Leg Panel" : [-1143.199,-617.968]},
			"32I" : {"30Wx32I Small Belt Loop" : [-78.817,-1161.73],"30Wx32I Solid Welt 2" : [-150.029,-1606.683],"30Wx32I Left Leg Panel" : [-150.029,-1152.573],"30Wx32I Solid Welt 1" : [-220.44,-1606.683],"30Wx32I Large Belt Loop 3" : [-220.44,-1572.085],"30Wx32I Large Belt Loop 2" : [-220.44,-1538.904],"30Wx32I Large Belt Loop 1" : [-220.44,-1504.495],"30Wx32I Right Leg Panel" : [-220.44,-1152.574],"28Wx32I Small Belt Loop" : [-312.298,-1160.064],"28Wx32I Solid Welt 2" : [-383.32,-1606.683],"28Wx32I Left Leg Panel" : [-383.32,-1154.301],"28Wx32I Solid Welt 1" : [-452.594,-1606.683],"28Wx32I Large Belt Loop 3" : [-452.594,-1570.092],"28Wx32I Large Belt Loop 2" : [-452.594,-1536.911],"28Wx32I Large Belt Loop 1" : [-452.594,-1501.145],"28Wx32I Right Leg Panel" : [-452.594,-1154.301],"26Wx32I Small Belt Loop" : [-544.319,-1156.708],"26Wx32I Solid Welt 2" : [-612.873,-1606.683],"26Wx32I Left Leg Panel" : [-612.873,-1155.265],"26Wx32I Solid Welt 1" : [-681.814,-1606.683],"26Wx32I Large Belt Loop 3" : [-681.814,-1566.085],"26Wx32I Large Belt Loop 2" : [-681.814,-1532.903],"26Wx32I Large Belt Loop 1" : [-681.814,-1500.637],"26Wx32I Right Leg Panel" : [-681.814,-1155.265],"24Wx32I Small Belt Loop" : [-773.827,-1160.057],"24Wx32I Solid Welt 2" : [-844.405,-1606.683],"24Wx32I Left Leg Panel" : [-844.405,-1156.317],"24Wx32I Solid Welt 1" : [-914.185,-1606.683],"24Wx32I Large Belt Loop 3" : [-914.185,-1568.592],"24Wx32I Large Belt Loop 2" : [-914.185,-1535.41],"24Wx32I Large Belt Loop 1" : [-914.185,-1501.907],"24Wx32I Right Leg Panel" : [-914.185,-1156.317],"22Wx32I Small Belt Loop" : [-1004.518,-1162.375],"22Wx32I Solid Welt 2" : [-1073.506,-1606.683],"22Wx32I Left Leg Panel" : [-1073.506,-1156.317],"22Wx32I Solid Welt 1" : [-1143.199,-1606.683],"22Wx32I Large Belt Loop 3" : [-1143.199,-1567.583],"22Wx32I Large Belt Loop 2" : [-1143.199,-1534.402],"22Wx32I Large Belt Loop 1" : [-1143.199,-1501.422],"22Wx32I Right Leg Panel" : [-1143.199,-1156.317]}
		}
	},

	"PS_5075W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : false,
		// "pantsSizing" : false,
		"placement" : 
		{		
			"20x16" : {"20x16 Right Leg Panel" : [-373.767,446.032],"20x16 Left Leg Panel" : [-432.758,445.685],"20x16 Pocket Welt 2" : [-502.266,437.227],"20x16 Pocket Welt 1" : [-502.266,405.924],"20x16 Large Belt Loop 3" : [-498.773,326.911],"20x16 Large Belt Loop 2" : [-498.773,282.809],"20x16 Large Belt Loop 1" : [-498.773,371.186]},
			"22x17" : {"22x17 Right Leg Panel" : [-373.767,147.645],"22x17 Left Leg Panel" : [-432.758,147.907],"22x17 Pocket Welt 2" : [-502.266,139.041],"22x17 Pocket Welt 1" : [-502.266,107.633],"22x17 Large Belt Loop 3" : [-500.585,25.671],"22x17 Large Belt Loop 2" : [-500.585,-18.497],"22x17 Large Belt Loop 1" : [-500.585,69.878]},
			"24x18" : {"24x18 Right Leg Panel" : [-373.767,-154.415],"24x18 Left Leg Panel" : [-432.758,-154.665],"24x18 Pocket Welt 2" : [-504.066,-168.137],"24x18 Pocket Welt 1" : [-504.066,-201.6],"24x18 Large Belt Loop 3" : [-500.585,-282.417],"24x18 Large Belt Loop 2" : [-500.585,-327.646],"24x18 Large Belt Loop 1" : [-500.585,-237.338],"24x18 Small Belt Loop" : [-553.561,-170.768]},
			"26x19" : {"26x19 Right Leg Panel" : [-373.767,-456.13],"26x19 Left Leg Panel" : [-432.758,-456.505],"26x19 Pocket Welt 2" : [-508.928,-480.755],"26x19 Pocket Welt 1" : [-508.928,-513.614],"26x19 Large Belt Loop 3" : [-509.548,-593.265],"26x19 Large Belt Loop 2" : [-509.548,-637.515],"26x19 Large Belt Loop 1" : [-509.548,-548.865],"26x19 Small Belt Loop" : [-553.562,-476.913]},
			"28x20" : {"28x20 Right Leg Panel" : [-373.767,-766.627],"28x20 Left Leg Panel" : [-432.758,-766.627],"28x20 Pocket Welt 2" : [-510.841,-788.994],"28x20 Pocket Welt 1" : [-510.841,-824.384],"28x20 Large Belt Loop 3" : [-509.543,-904.067],"28x20 Large Belt Loop 2" : [-509.543,-947.9],"28x20 Large Belt Loop 1" : [-509.543,-859.563],"28x20 Small Belt Loop" : [-553.561,-787.572]},
			"30x21" : {"30x21 Right Leg Panel" : [-373.767,-1072.918],"30x21 Left Leg Panel" : [-432.769,-1072.918],"30x21 Pocket Welt 2" : [-510.728,-1092.494],"30x21 Pocket Welt 1" : [-510.728,-1129.241],"30x21 Large Belt Loop 3" : [-511.354,-1210.298],"30x21 Large Belt Loop 2" : [-511.354,-1255.029],"30x21 Large Belt Loop 1" : [-511.354,-1165.803],"30x21 Small Belt Loop" : [-553.561,-1099.073]},
			"32x22" : {"32x22 Right Leg Panel" : [-373.767,-1352.308],"32x22 Left Leg Panel" : [-432.758,-1352.16],"32x22 Pocket Welt 2" : [-512.078,-1412.739],"32x22 Pocket Welt 1" : [-512.078,-1377.295],"32x22 Large Belt Loop 3" : [-511.349,-1487.032],"32x22 Large Belt Loop 2" : [-511.349,-1531.301],"32x22 Large Belt Loop 1" : [-511.349,-1443.094],"32x22 Small Belt Loop" : [-553.561,-1379.448]},
			"34x23" : {"34x23 Right Leg Panel" : [-79.599,471.54],"34x23 Left Leg Panel" : [-138.59,471.54],"34x23 Pocket Welt 2" : [-217.911,430.69],"34x23 Pocket Welt 1" : [-217.911,400.243],"34x23 Large Belt Loop 3" : [-218.991,318.562],"34x23 Large Belt Loop 2" : [-218.991,273.478],"34x23 Large Belt Loop 1" : [-218.991,363.777],"34x23 Small Belt Loop" : [-259.394,436.699]},
			"36x24" : {"36x24 Right Leg Panel" : [-79.599,174.616],"36x24 Left Leg Panel" : [-138.59,174.616],"36x24 Pocket Welt 2" : [-219.71,130.548],"36x24 Pocket Welt 1" : [-219.71,95.12],"36x24 Large Belt Loop 3" : [-218.991,13.537],"36x24 Large Belt Loop 2" : [-218.991,-31.05],"36x24 Large Belt Loop 1" : [-218.991,59.25],"36x24 Small Belt Loop" : [-259.394,135.34]},
			"38x24" : {"38x24 Right Leg Panel" : [-79.599,-131.339],"38x24 Left Leg Panel" : [-138.59,-131.351],"38x24 Pocket Welt 2" : [-219.71,-172.324],"38x24 Pocket Welt 1" : [-219.71,-209.394],"38x24 Large Belt Loop 3" : [-220.792,-290.491],"38x24 Large Belt Loop 2" : [-220.792,-334.563],"38x24 Large Belt Loop 1" : [-220.792,-246.257],"38x24 Small Belt Loop" : [-259.394,-170.786]},
			"40x26" : {"40x26 Right Leg Panel" : [-79.599,-436.153],"40x26 Left Leg Panel" : [-138.59,-436.249],"40x26 Pocket Welt 2" : [-219.71,-479.853],"40x26 Pocket Welt 1" : [-219.71,-514.855],"40x26 Large Belt Loop 3" : [-220.792,-593.816],"40x26 Large Belt Loop 2" : [-220.792,-637.666],"40x26 Large Belt Loop 1" : [-220.792,-549.824],"40x26 Small Belt Loop" : [-259.394,-477.466]},
			"42x24" : {"42x24 Right Leg Panel" : [-79.599,-745.79],"42x24 Left Leg Panel" : [-138.59,-745.84],"42x24 Pocket Welt 2" : [-219.99,-791.535],"42x24 Pocket Welt 1" : [-219.71,-826.79],"42x24 Large Belt Loop 3" : [-222.595,-906.976],"42x24 Large Belt Loop 2" : [-222.595,-951.902],"42x24 Large Belt Loop 1" : [-222.595,-861.971],"42x24 Small Belt Loop" : [-259.394,-787.53]},
			"44x24" : {"44x24 Right Leg Panel" : [-79.599,-1056.082],"44x24 Left Leg Panel" : [-138.59,-1056.482],"44x24 Pocket Welt 2" : [-219.711,-1098.735],"44x24 Pocket Welt 1" : [-219.711,-1132.935],"44x24 Large Belt Loop 3" : [-222.593,-1213.702],"44x24 Large Belt Loop 2" : [-222.593,-1258.398],"44x24 Large Belt Loop 1" : [-222.593,-1169.537],"44x24 Small Belt Loop" : [-259.394,-1099.038]}			
		}
	},

	"FD_5060W" : 
	{
		"mockupSize" : "",
		"scaleFrontLogo" : false,
		"placement" : 
		{	
			"16x14" : {"16x14 Front Left Leg" : [-141.002,1784.23],"16x14 Front Right Leg" : [-308.668,1784.897],"16x14 Back Left Leg" : [-498.965,1792.607],"16x14 Back Right Leg" : [-633.465,1792.607],"16x14 Right Fly Facing" : [-751.551,1782.563],"16x14 Crotch Facing" : [-788.628,1767.063],"16x14 Left Fly Facing" : [-839.615,1775.719],"16x14 Knee Panel 2" : [-1133.607,1697.027],"16x14 Knee Panel 1" : [-1133.607,1775.694],"16x14 Pocket Facing 2" : [-774.107,1675.444],"16x14 Pocket Facing 1" : [-774.107,1716.444],"16x14 Pocket 2" : [-844.459,1675.444],"16x14 Pocket 1" : [-844.459,1716.444],"16x14 Large Belt Loop 3" : [-1055.295,1670.444],"16x14 Large Belt Loop 2" : [-1055.295,1722.944],"16x14 Large Belt Loop 1" : [-1055.295,1776.944]},
			"18x15" : {"18x15 Front Left Leg" : [-138.334,1503.525],"18x15 Front Right Leg" : [-298.834,1501.609],"18x15 Back Left Leg" : [-477.077,1510.453],"18x15 Back Right Leg" : [-644.077,1510.453],"18x15 Right Fly Facing" : [-746.066,1507.803],"18x15 Crotch Facing" : [-782.954,1494.99],"18x15 Pocket Facing 2" : [-768.262,1355.72],"18x15 Pocket Facing 1" : [-768.262,1396.637],"18x15 Pocket 2" : [-825.596,1355.72],"18x15 Pocket 1" : [-825.596,1396.637],"18x15 Left Fly Facing" : [-830.734,1504.229],"18x15 Large Belt Loop 3" : [-1057.664,1442.654],"18x15 Large Belt Loop 2" : [-1057.664,1488.904],"18x15 Large Belt Loop 1" : [-1057.664,1535.154],"18x15 Knee Panel 2" : [-1139.003,1459.018],"18x15 Knee Panel 1" : [-1139.003,1545.018]},
			"20x16" : {"20x16 Large Belt Loop 3" : [-1052.735,1099.786],"20x16 Large Belt Loop 2" : [-1052.735,1149.786],"20x16 Large Belt Loop 1" : [-1052.735,1199.786],"20x16 Right Fly Facing" : [-763.594,1230.428],"20x16 Back Left Leg" : [-472.621,1243.196],"20x16 Left Fly Facing" : [-837.432,1230.423],"20x16 Front Left Leg" : [-147.739,1237.703],"20x16 Pocket 2" : [-853.182,1093.332],"20x16 Pocket 1" : [-853.182,1131.939],"20x16 Crotch Facing" : [-799.674,1211.935],"20x16 Front Right Leg" : [-293.287,1237.588],"20x16 Pocket Facing 2" : [-773.094,1093.631],"20x16 Pocket Facing 1" : [-773.094,1132.131],"20x16 Back Right Leg" : [-659.518,1243.196],"20x16 Knee Panel 2" : [-1129.754,1221.246],"20x16 Knee Panel 1" : [-1129.766,1119.883]},
			"22x17" : {"22x17 Large Belt Loop 3" : [-1026.879,851.567],"22x17 Large Belt Loop 2" : [-1026.879,898.192],"22x17 Large Belt Loop 1" : [-1026.879,944.817],"22x17 Right Fly Facing" : [-763.594,979.097],"22x17 Back Left Leg" : [-474.41,996.224],"22x17 Left Fly Facing" : [-837.432,979.061],"22x17 Front Left Leg" : [-149.535,990.672],"22x17 Pocket 2" : [-853.182,841.001],"22x17 Pocket 1" : [-853.182,882.667],"22x17 Crotch Facing" : [-799.674,960.421],"22x17 Front Right Leg" : [-295.082,990.033],"22x17 Pocket Facing 2" : [-772.895,840.89],"22x17 Pocket Facing 1" : [-772.895,882.556],"22x17 Back Right Leg" : [-661.309,996.224],"22x17 Knee Panel 2" : [-1131.267,966.227],"22x17 Knee Panel 1" : [-1131.267,864.864]},
			"24x18" : {"24x18 Small Belt Loop 2" : [-896.33,717.008],"24x18 Small Belt Loop 1" : [-951.772,717.008],"24x18 Large Belt Loop 3" : [-1026.879,585.851],"24x18 Large Belt Loop 2" : [-1026.879,633.184],"24x18 Large Belt Loop 1" : [-1026.879,680.518],"24x18 Right Fly Facing" : [-763.594,714.837],"24x18 Back Left Leg" : [-476.605,736.657],"24x18 Left Fly Facing" : [-837.432,714.853],"24x18 Front Left Leg" : [-151.327,730.103],"24x18 Pocket 2" : [-854.082,581.566],"24x18 Pocket 1" : [-854.082,618.561],"24x18 Crotch Facing" : [-799.674,696.494],"24x18 Front Right Leg" : [-296.875,730.157],"24x18 Pocket Facing 2" : [-773.795,581.533],"24x18 Pocket Facing 1" : [-773.795,618.527],"24x18 Back Right Leg" : [-663.099,736.657],"24x18 Knee Panel 2" : [-1132.804,706.738],"24x18 Knee Panel 1" : [-1132.804,605.375]},
			"26x19" : {"26x19 Small Belt Loop 2" : [-896.33,445.667],"26x19 Small Belt Loop 1" : [-951.772,445.667],"26x19 Large Belt Loop 3" : [-1028.685,318.978],"26x19 Large Belt Loop 2" : [-1028.685,361.728],"26x19 Large Belt Loop 1" : [-1028.685,405.728],"26x19 Right Fly Facing" : [-763.594,443.478],"26x19 Back Left Leg" : [-478.015,469.744],"26x19 Left Fly Facing" : [-837.432,443.729],"26x19 Front Left Leg" : [-153.128,462.92],"26x19 Pocket 2" : [-854.083,312.11],"26x19 Pocket 1" : [-854.083,347.61],"26x19 Crotch Facing" : [-799.674,424.788],"26x19 Front Right Leg" : [-298.675,462.752],"26x19 Pocket Facing 2" : [-773.796,311.696],"26x19 Pocket Facing 1" : [-773.796,347.196],"26x19 Back Right Leg" : [-664.913,469.744],"26x19 Knee Panel 2" : [-1134.965,431.901],"26x19 Knee Panel 1" : [-1134.607,330.787]},
			"28x20" : {"28x20 Small Belt Loop 2" : [-896.711,171.834],"28x20 Small Belt Loop 1" : [-951.772,171.453],"28x20 Large Belt Loop 3" : [-1028.685,44.43],"28x20 Large Belt Loop 2" : [-1028.685,91.569],"28x20 Large Belt Loop 1" : [-1028.685,137.945],"28x20 Right Fly Facing" : [-763.594,169.415],"28x20 Back Left Leg" : [-480.399,194.604],"28x20 Left Fly Facing" : [-837.966,169.409],"28x20 Front Left Leg" : [-154.883,189.594],"28x20 Pocket 2" : [-855.882,22.028],"28x20 Pocket 1" : [-855.882,71.282],"28x20 Crotch Facing" : [-801.313,150.944],"28x20 Front Right Leg" : [-300.431,189.502],"28x20 Pocket Facing 2" : [-775.596,22.306],"28x20 Pocket Facing 1" : [-775.596,71.56],"28x20 Back Right Leg" : [-666.795,194.604],"28x20 Knee Panel 2" : [-1133.691,166.948],"28x20 Knee Panel 1" : [-1133.691,65.891]},
			"30x21" : {"30x21 Small Belt Loop 2" : [-896.758,-105.979],"30x21 Small Belt Loop 1" : [-951.772,-105.719],"30x21 Large Belt Loop 3" : [-1030.492,-227.017],"30x21 Large Belt Loop 2" : [-1030.492,-180.309],"30x21 Large Belt Loop 1" : [-1030.492,-132.642],"30x21 Right Fly Facing" : [-763.584,-106.172],"30x21 Back Left Leg" : [-482.248,-78.386],"30x21 Left Fly Facing" : [-837.471,-106.275],"30x21 Front Left Leg" : [-156.676,-83.446],"30x21 Pocket 2" : [-855.882,-257.972],"30x21 Pocket 1" : [-855.882,-209.846],"30x21 Crotch Facing" : [-800.697,-126.888],"30x21 Front Right Leg" : [-302.223,-83.692],"30x21 Pocket Facing 2" : [-775.596,-257.309],"30x21 Pocket Facing 1" : [-775.596,-209.183],"30x21 Back Right Leg" : [-668.832,-78.386],"30x21 Knee Panel 2" : [-1135.506,-105.138],"30x21 Knee Panel 1" : [-1135.506,-205.982]},
			"32x22" : {"32x22 Small Belt Loop 2" : [-896.694,-399.08],"32x22 Small Belt Loop 1" : [-951.772,-399.101],"32x22 Large Belt Loop 3" : [-1030.486,-519.763],"32x22 Large Belt Loop 2" : [-1030.486,-472.716],"32x22 Large Belt Loop 1" : [-1030.486,-425.716],"32x22 Right Fly Facing" : [-763.583,-399.5],"32x22 Back Left Leg" : [-484.39,-366.165],"32x22 Left Fly Facing" : [-837.934,-399.398],"32x22 Front Left Leg" : [-158.468,-371.117],"32x22 Pocket 2" : [-857.233,-553.734],"32x22 Pocket 1" : [-857.233,-501.11],"32x22 Crotch Facing" : [-801.253,-419.697],"32x22 Front Right Leg" : [-304.017,-371.409],"32x22 Pocket Facing 2" : [-776.946,-553.78],"32x22 Pocket Facing 1" : [-776.946,-501.155],"32x22 Back Right Leg" : [-670.776,-366.165],"32x22 Knee Panel 2" : [-1137.598,-397.901],"32x22 Knee Panel 1" : [-1137.681,-499.044]},
			"34x23" : {"34x23 Small Belt Loop 2" : [-896.511,-697.746],"34x23 Small Belt Loop 1" : [-951.772,-697.746],"34x23 Large Belt Loop 3" : [-1032.297,-811.774],"34x23 Large Belt Loop 2" : [-1032.297,-765.109],"34x23 Large Belt Loop 1" : [-1032.297,-719.776],"34x23 Right Fly Facing" : [-763.567,-694.438],"34x23 Back Left Leg" : [-486.376,-659.98],"34x23 Left Fly Facing" : [-837.827,-694.427],"34x23 Front Left Leg" : [-160.265,-666.369],"34x23 Pocket 2" : [-857.248,-848.675],"34x23 Pocket 1" : [-857.248,-803.706],"34x23 Crotch Facing" : [-801.205,-718.366],"34x23 Front Right Leg" : [-305.814,-666.44],"34x23 Pocket Facing 2" : [-776.946,-848.675],"34x23 Pocket Facing 1" : [-776.946,-803.706],"34x23 Back Right Leg" : [-672.819,-659.98],"34x23 Knee Panel 2" : [-1139.101,-689.349],"34x23 Knee Panel 1" : [-1139.101,-790.089]},
			"36x24" : {"36x24 Small Belt Loop 2" : [-896.807,-1007.54],"36x24 Small Belt Loop 1" : [-951.772,-1007.382],"36x24 Large Belt Loop 3" : [-1032.297,-1112.656],"36x24 Large Belt Loop 2" : [-1032.297,-1065.366],"36x24 Large Belt Loop 1" : [-1032.297,-1019.032],"36x24 Right Fly Facing" : [-763.567,-1004.268],"36x24 Back Left Leg" : [-488.016,-964.889],"36x24 Left Fly Facing" : [-837.785,-1004.098],"36x24 Front Left Leg" : [-162.075,-970.89],"36x24 Pocket 2" : [-859.033,-1153.558],"36x24 Pocket 1" : [-859.033,-1112.959],"36x24 Crotch Facing" : [-801.377,-1027.73],"36x24 Front Right Leg" : [-307.621,-971.89],"36x24 Pocket Facing 2" : [-778.746,-1153.71],"36x24 Pocket Facing 1" : [-778.746,-1113.11],"36x24 Back Right Leg" : [-675.421,-964.885],"36x24 Knee Panel 2" : [-1140.914,-990.938],"36x24 Knee Panel 1" : [-1140.91,-1091.573]},
			"38x24" : {"38x24 Small Belt Loop 2" : [-896.683,-1311.295],"38x24 Small Belt Loop 1" : [-951.772,-1311.295],"38x24 Large Belt Loop 3" : [-1034.098,-1444.407],"38x24 Large Belt Loop 2" : [-1034.098,-1390.407],"38x24 Large Belt Loop 1" : [-1034.098,-1336.407],"38x24 Right Fly Facing" : [-763.567,-1308.143],"38x24 Back Left Leg" : [-490.363,-1266.937],"38x24 Left Fly Facing" : [-837.921,-1308.19],"38x24 Front Left Leg" : [-163.885,-1274.281],"38x24 Pocket 2" : [-859.033,-1453.583],"38x24 Pocket 1" : [-859.033,-1416.991],"38x24 Crotch Facing" : [-801.377,-1332.063],"38x24 Front Right Leg" : [-309.425,-1274.463],"38x24 Pocket Facing 2" : [-778.746,-1453.723],"38x24 Pocket Facing 1" : [-778.746,-1416.97],"38x24 Back Right Leg" : [-677.008,-1266.937],"38x24 Knee Panel 2" : [-1142.733,-1309.323],"38x24 Knee Panel 1" : [-1142.733,-1410.686]},
			"40x24" : {"40x24 Small Belt Loop 2" : [-896.79,-1630.152],"40x24 Small Belt Loop 1" : [-951.772,-1630.152],"40x24 Large Belt Loop 3" : [-1034.097,-1762.103],"40x24 Large Belt Loop 2" : [-1034.097,-1717.539],"40x24 Large Belt Loop 1" : [-1034.097,-1672.974],"40x24 Right Fly Facing" : [-763.554,-1623.846],"40x24 Back Left Leg" : [-491.234,-1584.707],"40x24 Left Fly Facing" : [-837.893,-1623.889],"40x24 Front Left Leg" : [-164.726,-1592.972],"40x24 Pocket 2" : [-859.033,-1786.275],"40x24 Pocket 1" : [-859.033,-1740.275],"40x24 Crotch Facing" : [-801.485,-1651.436],"40x24 Front Right Leg" : [-310.265,-1592.957],"40x24 Pocket Facing 2" : [-778.746,-1786.224],"40x24 Pocket Facing 1" : [-778.746,-1740.224],"40x24 Back Right Leg" : [-679.195,-1584.707],"40x24 Knee Panel 2" : [-1144.291,-1639.902],"40x24 Knee Panel 1" : [-1144.291,-1741.265]},
			"42x24" : {"42x24 Small Belt Loop 2" : [-896.825,-1954.516],"42x24 Small Belt Loop 1" : [-951.772,-1954.516],"42x24 Large Belt Loop 3" : [-1035.901,-2071.267],"42x24 Large Belt Loop 2" : [-1035.901,-2024.6],"42x24 Large Belt Loop 1" : [-1035.901,-1977.933],"42x24 Right Fly Facing" : [-763.549,-1945.681],"42x24 Back Left Leg" : [-492.769,-1905.754],"42x24 Left Fly Facing" : [-837.893,-1945.847],"42x24 Front Left Leg" : [-165.582,-1915.767],"42x24 Pocket 2" : [-859.033,-2105.307],"42x24 Pocket 1" : [-859.033,-2066.474],"42x24 Crotch Facing" : [-801.485,-1975.373],"42x24 Front Right Leg" : [-311.12,-1915.423],"42x24 Pocket Facing 2" : [-778.746,-2105.451],"42x24 Pocket Facing 1" : [-778.746,-2066.618],"42x24 Back Right Leg" : [-681.222,-1905.754],"42x24 Knee Panel 2" : [-1145.91,-1949.063],"42x24 Knee Panel 1" : [-1145.91,-2050.427]},
"44x24" : {"44x24 Small Belt Loop 2" : [-896.79,-2283.95],"44x24 Small Belt Loop 1" : [-951.772,-2283.95],"44x24 Large Belt Loop 3" : [-1035.899,-2408.095],"44x24 Large Belt Loop 2" : [-1035.899,-2358.345],"44x24 Large Belt Loop 1" : [-1035.899,-2308.595],"44x24 Right Fly Facing" : [-763.548,-2275.897],"44x24 Back Left Leg" : [-494.281,-2235.1],"44x24 Left Fly Facing" : [-837.893,-2275.633],"44x24 Front Left Leg" : [-166.452,-2244.392],"44x24 Pocket 2" : [-859.033,-2438.97],"44x24 Pocket 1" : [-859.033,-2395.554],"44x24 Crotch Facing" : [-801.485,-2305.044],"44x24 Front Right Leg" : [-311.99,-2244.433],"44x24 Pocket Facing 2" : [-778.746,-2438.858],"44x24 Pocket Facing 1" : [-778.746,-2395.441],"44x24 Back Right Leg" : [-681.559,-2235.1],"44x24 Knee Panel 2" : [-1147.474,-2283.199],"44x24 Knee Panel 1" : [-1147.473,-2384.563]}
			// "20x16" : {"20x16 Large Belt Loop 3" : [-1086.704,1195.069],"20x16 Large Belt Loop 2" : [-1086.704,1245.069],"20x16 Large Belt Loop 1" : [-1086.704,1295.069],"20x16 Right Fly Facing" : [-797.563,1325.711],"20x16 Back Left Leg" : [-506.59,1338.479],"20x16 Left Fly Facing" : [-871.401,1325.706],"20x16 Front Left Leg" : [-181.708,1332.986],"20x16 Pocket 2" : [-887.151,1188.615],"20x16 Pocket 1" : [-887.151,1227.222],"20x16 Crotch Facing" : [-833.643,1307.218],"20x16 Front Right Leg" : [-327.256,1332.871],"20x16 Pocket Facing 2" : [-807.063,1188.914],"20x16 Pocket Facing 1" : [-807.063,1227.414],"20x16 Back Right Leg" : [-693.487,1338.479],"20x16 Knee Panel 2" : [-1163.723,1316.529],"20x16 Knee Panel 1" : [-1163.735,1215.166]},
			// "22x17" : {"22x17 Large Belt Loop 3" : [-1060.848,946.85],"22x17 Large Belt Loop 2" : [-1060.848,993.475],"22x17 Large Belt Loop 1" : [-1060.848,1040.1],"22x17 Right Fly Facing" : [-797.563,1074.38],"22x17 Back Left Leg" : [-508.379,1091.507],"22x17 Left Fly Facing" : [-871.401,1074.344],"22x17 Front Left Leg" : [-183.504,1085.955],"22x17 Pocket 2" : [-887.151,936.284],"22x17 Pocket 1" : [-887.151,977.95],"22x17 Crotch Facing" : [-833.643,1055.704],"22x17 Front Right Leg" : [-329.051,1085.316],"22x17 Pocket Facing 2" : [-806.864,936.173],"22x17 Pocket Facing 1" : [-806.864,977.839],"22x17 Back Right Leg" : [-695.278,1091.507],"22x17 Knee Panel 2" : [-1165.236,1061.51],"22x17 Knee Panel 1" : [-1165.236,960.147]},
			// "24x18" : {"24x18 Small Belt Loop 2" : [-930.299,812.291],"24x18 Small Belt Loop 1" : [-985.741,812.291],"24x18 Large Belt Loop 3" : [-1060.848,681.134],"24x18 Large Belt Loop 2" : [-1060.848,728.467],"24x18 Large Belt Loop 1" : [-1060.848,775.801],"24x18 Right Fly Facing" : [-797.563,810.12],"24x18 Back Left Leg" : [-510.574,831.94],"24x18 Left Fly Facing" : [-871.401,810.136],"24x18 Front Left Leg" : [-185.296,825.386],"24x18 Pocket 2" : [-888.051,676.849],"24x18 Pocket 1" : [-888.051,713.844],"24x18 Crotch Facing" : [-833.643,791.777],"24x18 Front Right Leg" : [-330.844,825.44],"24x18 Pocket Facing 2" : [-807.764,676.816],"24x18 Pocket Facing 1" : [-807.764,713.81],"24x18 Back Right Leg" : [-697.068,831.94],"24x18 Knee Panel 2" : [-1166.773,802.021],"24x18 Knee Panel 1" : [-1166.773,700.658]},
			// "26x19" : {"26x19 Small Belt Loop 2" : [-930.299,540.95],"26x19 Small Belt Loop 1" : [-985.741,540.95],"26x19 Large Belt Loop 3" : [-1062.654,414.261],"26x19 Large Belt Loop 2" : [-1062.654,457.011],"26x19 Large Belt Loop 1" : [-1062.654,501.011],"26x19 Right Fly Facing" : [-797.563,538.761],"26x19 Back Left Leg" : [-511.984,565.027],"26x19 Left Fly Facing" : [-871.401,539.012],"26x19 Front Left Leg" : [-187.097,558.203],"26x19 Pocket 2" : [-888.052,407.393],"26x19 Pocket 1" : [-888.052,442.893],"26x19 Crotch Facing" : [-833.643,520.071],"26x19 Front Right Leg" : [-332.644,558.035],"26x19 Pocket Facing 2" : [-807.765,406.979],"26x19 Pocket Facing 1" : [-807.765,442.479],"26x19 Back Right Leg" : [-698.882,565.027],"26x19 Knee Panel 2" : [-1168.934,527.184],"26x19 Knee Panel 1" : [-1168.576,426.07]},
			// "28x20" : {"28x20 Small Belt Loop 2" : [-930.68,267.117],"28x20 Small Belt Loop 1" : [-985.741,266.736],"28x20 Large Belt Loop 3" : [-1062.654,139.713],"28x20 Large Belt Loop 2" : [-1062.654,186.852],"28x20 Large Belt Loop 1" : [-1062.654,233.228],"28x20 Right Fly Facing" : [-797.563,264.698],"28x20 Back Left Leg" : [-514.368,289.887],"28x20 Left Fly Facing" : [-871.935,264.692],"28x20 Front Left Leg" : [-188.852,284.877],"28x20 Pocket 2" : [-889.851,117.311],"28x20 Pocket 1" : [-889.851,166.565],"28x20 Crotch Facing" : [-835.282,246.227],"28x20 Front Right Leg" : [-334.4,284.785],"28x20 Pocket Facing 2" : [-809.565,117.589],"28x20 Pocket Facing 1" : [-809.565,166.843],"28x20 Back Right Leg" : [-700.764,289.887],"28x20 Knee Panel 2" : [-1167.66,262.231],"28x20 Knee Panel 1" : [-1167.66,161.174]},
			// "30x21" : {"30x21 Small Belt Loop 2" : [-930.727,-10.696],"30x21 Small Belt Loop 1" : [-985.741,-10.436],"30x21 Large Belt Loop 3" : [-1064.461,-131.734],"30x21 Large Belt Loop 2" : [-1064.461,-85.026],"30x21 Large Belt Loop 1" : [-1064.461,-37.359],"30x21 Right Fly Facing" : [-797.553,-10.889],"30x21 Back Left Leg" : [-516.217,16.897],"30x21 Left Fly Facing" : [-871.44,-10.992],"30x21 Front Left Leg" : [-190.645,11.837],"30x21 Pocket 2" : [-889.851,-162.689],"30x21 Pocket 1" : [-889.851,-114.563],"30x21 Crotch Facing" : [-834.666,-31.605],"30x21 Front Right Leg" : [-336.192,11.591],"30x21 Pocket Facing 2" : [-809.565,-162.026],"30x21 Pocket Facing 1" : [-809.565,-113.9],"30x21 Back Right Leg" : [-702.801,16.897],"30x21 Knee Panel 2" : [-1169.475,-9.855],"30x21 Knee Panel 1" : [-1169.475,-110.699]},
			// "32x22" : {"32x22 Small Belt Loop 2" : [-930.663,-303.797],"32x22 Small Belt Loop 1" : [-985.741,-303.818],"32x22 Large Belt Loop 3" : [-1064.455,-424.48],"32x22 Large Belt Loop 2" : [-1064.455,-377.433],"32x22 Large Belt Loop 1" : [-1064.455,-330.433],"32x22 Right Fly Facing" : [-797.552,-304.217],"32x22 Back Left Leg" : [-518.359,-270.882],"32x22 Left Fly Facing" : [-871.903,-304.115],"32x22 Front Left Leg" : [-192.437,-275.834],"32x22 Pocket 2" : [-891.202,-458.451],"32x22 Pocket 1" : [-891.202,-405.827],"32x22 Crotch Facing" : [-835.222,-324.414],"32x22 Front Right Leg" : [-337.986,-276.126],"32x22 Pocket Facing 2" : [-810.915,-458.497],"32x22 Pocket Facing 1" : [-810.915,-405.872],"32x22 Back Right Leg" : [-704.745,-270.882],"32x22 Knee Panel 2" : [-1171.567,-302.618],"32x22 Knee Panel 1" : [-1171.65,-403.761]},
			// "34x23" : {"34x23 Small Belt Loop 2" : [-930.48,-602.463],"34x23 Small Belt Loop 1" : [-985.741,-602.463],"34x23 Large Belt Loop 3" : [-1066.266,-716.491],"34x23 Large Belt Loop 2" : [-1066.266,-669.826],"34x23 Large Belt Loop 1" : [-1066.266,-624.493],"34x23 Right Fly Facing" : [-797.536,-599.155],"34x23 Back Left Leg" : [-520.345,-564.697],"34x23 Left Fly Facing" : [-871.796,-599.144],"34x23 Front Left Leg" : [-194.234,-571.086],"34x23 Pocket 2" : [-891.217,-753.392],"34x23 Pocket 1" : [-891.217,-708.423],"34x23 Crotch Facing" : [-835.174,-623.083],"34x23 Front Right Leg" : [-339.783,-571.157],"34x23 Pocket Facing 2" : [-810.915,-753.392],"34x23 Pocket Facing 1" : [-810.915,-708.423],"34x23 Back Right Leg" : [-706.788,-564.697],"34x23 Knee Panel 2" : [-1173.07,-594.066],"34x23 Knee Panel 1" : [-1173.07,-694.806]},
			// "36x24" : {"36x24 Small Belt Loop 2" : [-930.776,-912.257],"36x24 Small Belt Loop 1" : [-985.741,-912.099],"36x24 Large Belt Loop 3" : [-1066.266,-1017.373],"36x24 Large Belt Loop 2" : [-1066.266,-970.083],"36x24 Large Belt Loop 1" : [-1066.266,-923.749],"36x24 Right Fly Facing" : [-797.536,-908.985],"36x24 Back Left Leg" : [-521.985,-869.606],"36x24 Left Fly Facing" : [-871.754,-908.815],"36x24 Front Left Leg" : [-196.044,-875.607],"36x24 Pocket 2" : [-893.002,-1058.275],"36x24 Pocket 1" : [-893.002,-1017.676],"36x24 Crotch Facing" : [-835.346,-932.447],"36x24 Front Right Leg" : [-341.59,-876.607],"36x24 Pocket Facing 2" : [-812.715,-1058.427],"36x24 Pocket Facing 1" : [-812.715,-1017.827],"36x24 Back Right Leg" : [-709.39,-869.602],"36x24 Knee Panel 2" : [-1174.883,-895.655],"36x24 Knee Panel 1" : [-1174.879,-996.29]},
			// "38x24" : {"38x24 Small Belt Loop 2" : [-930.652,-1216.012],"38x24 Small Belt Loop 1" : [-985.741,-1216.012],"38x24 Large Belt Loop 3" : [-1068.067,-1349.124],"38x24 Large Belt Loop 2" : [-1068.067,-1295.124],"38x24 Large Belt Loop 1" : [-1068.067,-1241.124],"38x24 Right Fly Facing" : [-797.536,-1212.86],"38x24 Back Left Leg" : [-524.332,-1171.654],"38x24 Left Fly Facing" : [-871.89,-1212.907],"38x24 Front Left Leg" : [-197.854,-1178.998],"38x24 Pocket 2" : [-893.002,-1358.3],"38x24 Pocket 1" : [-893.002,-1321.708],"38x24 Crotch Facing" : [-835.346,-1236.78],"38x24 Front Right Leg" : [-343.394,-1179.18],"38x24 Pocket Facing 2" : [-812.715,-1358.44],"38x24 Pocket Facing 1" : [-812.715,-1321.687],"38x24 Back Right Leg" : [-710.977,-1171.654],"38x24 Knee Panel 2" : [-1176.702,-1214.04],"38x24 Knee Panel 1" : [-1176.702,-1315.403]},
			// "40x24" : {"40x24 Small Belt Loop 2" : [-930.759,-1534.869],"40x24 Small Belt Loop 1" : [-985.741,-1534.869],"40x24 Large Belt Loop 3" : [-1068.066,-1666.82],"40x24 Large Belt Loop 2" : [-1068.066,-1622.256],"40x24 Large Belt Loop 1" : [-1068.066,-1577.691],"40x24 Right Fly Facing" : [-797.523,-1528.563],"40x24 Back Left Leg" : [-525.203,-1489.424],"40x24 Left Fly Facing" : [-871.862,-1528.606],"40x24 Front Left Leg" : [-198.695,-1497.689],"40x24 Pocket 2" : [-893.002,-1690.992],"40x24 Pocket 1" : [-893.002,-1644.992],"40x24 Crotch Facing" : [-835.454,-1556.153],"40x24 Front Right Leg" : [-344.234,-1497.674],"40x24 Pocket Facing 2" : [-812.715,-1690.941],"40x24 Pocket Facing 1" : [-812.715,-1644.941],"40x24 Back Right Leg" : [-713.164,-1489.424],"40x24 Knee Panel 2" : [-1178.26,-1544.619],"40x24 Knee Panel 1" : [-1178.26,-1645.982]},
			// "42x24" : {"42x24 Small Belt Loop 2" : [-930.794,-1859.233],"42x24 Small Belt Loop 1" : [-985.741,-1859.233],"42x24 Large Belt Loop 3" : [-1069.87,-1975.984],"42x24 Large Belt Loop 2" : [-1069.87,-1929.317],"42x24 Large Belt Loop 1" : [-1069.87,-1882.65],"42x24 Right Fly Facing" : [-797.518,-1850.398],"42x24 Back Left Leg" : [-526.738,-1810.471],"42x24 Left Fly Facing" : [-871.862,-1850.564],"42x24 Front Left Leg" : [-199.551,-1820.484],"42x24 Pocket 2" : [-893.002,-2010.024],"42x24 Pocket 1" : [-893.002,-1971.191],"42x24 Crotch Facing" : [-835.454,-1880.09],"42x24 Front Right Leg" : [-345.089,-1820.14],"42x24 Pocket Facing 2" : [-812.715,-2010.168],"42x24 Pocket Facing 1" : [-812.715,-1971.335],"42x24 Back Right Leg" : [-715.191,-1810.471],"42x24 Knee Panel 2" : [-1179.879,-1853.78],"42x24 Knee Panel 1" : [-1179.879,-1955.144]},
			// "44x24" : {"44x24 Small Belt Loop 2" : [-930.759,-2188.667],"44x24 Small Belt Loop 1" : [-985.741,-2188.667],"44x24 Large Belt Loop 3" : [-1069.868,-2312.812],"44x24 Large Belt Loop 2" : [-1069.868,-2263.062],"44x24 Large Belt Loop 1" : [-1069.868,-2213.312],"44x24 Right Fly Facing" : [-797.517,-2180.614],"44x24 Back Left Leg" : [-528.25,-2139.817],"44x24 Left Fly Facing" : [-871.862,-2180.35],"44x24 Front Left Leg" : [-200.421,-2149.109],"44x24 Pocket 2" : [-893.002,-2343.687],"44x24 Pocket 1" : [-893.002,-2300.271],"44x24 Crotch Facing" : [-835.454,-2209.761],"44x24 Front Right Leg" : [-345.959,-2149.15],"44x24 Pocket Facing 2" : [-812.715,-2343.575],"44x24 Pocket Facing 1" : [-812.715,-2300.158],"44x24 Back Right Leg" : [-715.528,-2139.817],"44x24 Knee Panel 2" : [-1181.443,-2187.916],"44x24 Knee Panel 1" : [-1181.442,-2289.28]}
		}
	},

	"FD_609" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Collar" : [-772.997,679.805],"S Back" : [-273.247,781.913],"S Front" : [-554.14,781.878]},
			"M" : {"M Collar" : [-776.547,413.512],"M Back" : [-278.582,519.147],"M Front" : [-559.493,519.139]},
			"L" : {"L Collar" : [-776.2,141.236],"L Back" : [-283.914,250.419],"L Front" : [-564.804,250.422]},
			"XL" : {"XL Collar" : [-782.052,-137.606],"XL Back" : [-289.259,-24.865],"XL Front" : [-570.159,-24.851]},
			"2XL" : {"2XL Collar" : [-786.469,-424.643],"2XL Back" : [-294.597,-308.338],"2XL Front" : [-575.514,-308.316]},
			"3XL" : {"3XL Collar" : [-788.212,-718.651],"3XL Back" : [-299.957,-598.777],"3XL Front" : [-580.866,-598.75]},
			"4XL" : {"4XL Collar" : [-791.06,-1020.205],"4XL Back" : [-305.303,-896.752],"4XL Front" : [-586.212,-896.72]},
			"5XL" : {"5XL Collar" : [-792.643,-1329.296],"5XL Back" : [-310.653,-1202.253],"5XL Front" : [-591.567,-1202.228]}
		}
	},

	"FD_609W" : 
	{
		"mockupSize" : "M",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"XXS" : {"XXS Collar" : [-643.079,535.245],"XXS Back" : [-212.652,644.559],"XXS Front" : [-440.08,638.918]},
			"XS" : {"XS Collar" : [-644.472,316.125],"XS Back" : [-216.309,425.381],"XS Front" : [-443.762,420.684]},
			"S" : {"S Collar" : [-645.732,86.657],"S Back" : [-219.959,195.872],"S Front" : [-447.438,192.014]},
			"M" : {"M Collar" : [-646.964,-159.463],"M Back" : [-223.619,-50.286],"M Front" : [-451.109,-53.283]},
			"L" : {"L Collar" : [-648.299,-416.784],"L Back" : [-227.263,-307.623],"L Front" : [-454.772,-309.697]},
			"XL" : {"XL Collar" : [-649.685,-679.705],"XL Back" : [-230.922,-570.661],"XL Front" : [-458.45,-571.716]},
			"2XL" : {"2XL Collar" : [-650.799,-945.428],"2XL Back" : [-234.564,-836.322],"2XL Front" : [-462.109,-836.548]},
			"3XL" : {"3XL Collar" : [-652.13,-1210.216],"3XL Back" : [-238.212,-1101.157],"3XL Front" : [-465.764,-1101.43]}
		}
	},

	"FD_609Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"YS" : {"YS Collar" : [-638.439,96.885],"YS Back" : [-240.328,175.27],"YS Front" : [-439.465,175.406]},
			"YM" : {"YM Collar" : [-640.11,-122.508],"YM Back" : [-244.718,-38.75],"YM Front" : [-443.865,-38.65]},
			"YL" : {"YL Collar" : [-640.194,-353.85],"YL Back" : [-249.145,-264.723],"YL Front" : [-448.28,-264.638]},
			"YXL" : {"YXL Collar" : [-642.48,-593.926],"YXL Back" : [-253.571,-499.421],"YXL Front" : [-452.709,-499.351]}
		}
	},

	"FD-251" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Up Pocket 2" : [-178.813,864.697],"S Up Pocket 1" : [-178.814,947.548],"S Low Pocket 2" : [-244.285,850.989],"S Low Pocket 1" : [-244.285,908.018],"S Low PK FL 2" : [-244.285,947.816],"S Low PK FL 1" : [-244.285,983.409],"S Crotch 2" : [-295.977,1015.845],"S Crotch 1" : [-337.622,1015.483],"S Back Left" : [-453.077,1024.602],"S Front Left" : [-527.323,1015.708],"S Front Right" : [-665.539,1015.708],"S Belt" : [-761.184,786.484],"S Back Right" : [-761.423,1024.602]},
			"M" : {"M Up Pocket 2" : [-178.814,533.273],"M Up Pocket 1" : [-178.814,612.794],"M Low Pocket 2" : [-244.285,517.349],"M Low Pocket 1" : [-244.285,579.367],"M Low PK FL 2" : [-244.285,620.187],"M Low PK FL 1" : [-244.285,659.394],"M Crotch 2" : [-295.977,682.042],"M Crotch 1" : [-337.758,681.95],"M Back Left" : [-453.077,690.921],"M Front Left" : [-529.971,682.085],"M Front Right" : [-665.539,682.084],"M Belt" : [-761.55,450.365],"M Back Right" : [-761.423,690.92]},
			"L" : {"L Up Pocket 2" : [-178.814,231.985],"L Up Pocket 1" : [-178.814,313.943],"L Low Pocket 2" : [-244.282,208.244],"L Low Pocket 1" : [-244.282,272.245],"L Low PK FL 2" : [-244.285,310.421],"L Low PK FL 1" : [-244.285,342.164],"L Crotch 2" : [-295.974,374.494],"L Crotch 1" : [-337.762,374.752],"L Back Left" : [-453.077,383.481],"L Front Left" : [-532.977,374.752],"L Front Right" : [-665.539,374.752],"L Belt" : [-761.155,143.476],"L Back Right" : [-761.423,383.482]},
			"XL" : {"XL Up Pocket 2" : [-178.814,-75.135],"XL Up Pocket 1" : [-178.818,3.132],"XL Low Pocket 2" : [-244.285,-96.488],"XL Low Pocket 1" : [-244.285,-38.738],"XL Low PK FL 2" : [-244.285,-6.098],"XL Low PK FL 1" : [-244.285,27.145],"XL Crotch 2" : [-295.977,69.195],"XL Crotch 1" : [-337.762,69.156],"XL Back Left" : [-453.077,77.995],"XL Front Left" : [-535.67,69.361],"XL Front Right" : [-665.539,69.361],"XL Belt" : [-761.501,-167.346],"XL Back Right" : [-761.423,77.995]},
			"2XL" : {"2XL Up Pocket 2" : [-178.818,-376.432],"2XL Up Pocket 1" : [-178.817,-299.31],"2XL Low Pocket 2" : [-244.285,-407.705],"2XL Low Pocket 1" : [-244.285,-346.634],"2XL Low PK FL 2" : [-244.285,-310.965],"2XL Low PK FL 1" : [-244.282,-274.184],"2XL Crotch 2" : [-295.977,-249.338],"2XL Crotch 1" : [-337.626,-249.338],"2XL Back Left" : [-453.077,-240.441],"2XL Front Left" : [-538.074,-249.121],"2XL Front Right" : [-665.539,-249.121],"2XL Belt" : [-761.498,-485.696],"2XL Back Right" : [-761.423,-240.44]},
			"3XL" : {"3XL Up Pocket 2" : [-178.814,-693.581],"3XL Up Pocket 1" : [-178.818,-614.581],"3XL Low Pocket 2" : [-244.285,-715.546],"3XL Low Pocket 1" : [-244.285,-655.406],"3XL Low PK FL 2" : [-244.285,-617.987],"3XL Low PK FL 1" : [-244.285,-584.004],"3XL Crotch 2" : [-295.978,-545.45],"3XL Crotch 1" : [-337.762,-545.591],"3XL Back Left" : [-453.077,-536.736],"3XL Front Left" : [-541.74,-545.311],"3XL Front Right" : [-665.539,-545.311],"3XL Belt" : [-761.498,-777.398],"3XL Back Right" : [-761.423,-536.736]},
			"4XL" : {"4XL Up Pocket 2" : [-178.817,-1010.271],"4XL Up Pocket 1" : [-178.817,-933.26],"4XL Low Pocket 2" : [-244.285,-1030.547],"4XL Low Pocket 1" : [-244.285,-970.834],"4XL Low PK FL 2" : [-244.282,-931.828],"4XL Low PK FL 1" : [-244.282,-899.058],"4XL Crotch 2" : [-295.977,-864.546],"4XL Crotch 1" : [-337.626,-864.645],"4XL Back Left" : [-453.077,-855.772],"4XL Front Left" : [-545.448,-864.263],"4XL Front Right" : [-665.539,-864.263],"4XL Belt" : [-761.498,-1094.636],"4XL Back Right" : [-761.423,-855.776]},
			"5XL" : {"5XL Up Pocket 2" : [-178.814,-1321.686],"5XL Up Pocket 1" : [-178.817,-1242.337],"5XL Low Pocket 2" : [-244.285,-1348.883],"5XL Low Pocket 1" : [-244.285,-1291.215],"5XL Low PK FL 2" : [-244.285,-1257.435],"5XL Low PK FL 1" : [-244.285,-1225.819],"5XL Crotch 2" : [-296.095,-1184.91],"5XL Crotch 1" : [-337.626,-1184.946],"5XL Back Left" : [-453.077,-1176.253],"5XL Front Left" : [-549.177,-1184.624],"5XL Front Right" : [-665.539,-1184.624],"5XL Belt" : [-761.498,-1419.429],"5XL Back Right" : [-761.423,-1176.253]}
		}
	},

	"FD-251Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"YXS" : {"YXS Left Pocket 1" : [-94.506,481.537],"YXS Right Pocket 1" : [-94.506,556.33],"YXS Left Pocket 2" : [-161.27,471.323],"YXS Right Pocket 2" : [-161.27,529.943],"YXS Right Low Pocket Flap" : [-161.501,565.761],"YXS Left Low Pocket Flap" : [-161.501,598.414],"YXS Outside Crotch" : [-235.749,595.21],"YXS Inside Crotch" : [-313.293,595.454],"YXS Back Left" : [-445.934,597.984],"YXS Front Left" : [-574.755,596.067],"YXS Front Right" : [-698.111,596.059],"YXS Belt" : [-810.572,380.249],"YXS Back Right" : [-838.004,598.188]},
			"YS" : {"YS Left Pocket 1" : [-94.506,170.423],"YS Right Pocket 1" : [-94.506,247.961],"YS Left Pocket 2" : [-161.27,159.536],"YS Right Pocket 2" : [-161.27,223.648],"YS Right Low Pocket Flap" : [-161.501,269.143],"YS Left Low Pocket Flap" : [-161.501,307.686],"YS Outside Crotch" : [-236.1,291.255],"YS Inside Crotch" : [-313.507,291.218],"YS Back Left" : [-447.731,300.568],"YS Front Left" : [-576.639,298.225],"YS Front Right" : [-699.118,298.231],"YS Belt" : [-810.765,82.347],"YS Back Right" : [-839.799,300.766]},
			"YM" : {"YM Left Pocket 1" : [-94.506,-137.574],"YM Right Pocket 1" : [-94.506,-60.4],"YM Left Pocket 2" : [-161.271,-147.346],"YM Right Pocket 2" : [-161.27,-75.552],"YM Right Low Pocket Flap" : [-161.501,-32.92],"YM Left Low Pocket Flap" : [-161.501,2.832],"YM Outside Crotch" : [-235.749,-12.456],"YM Inside Crotch" : [-313.431,-12.627],"YM Back Left" : [-449.527,3.159],"YM Front Left" : [-573.903,0.393],"YM Front Right" : [-700.734,0.393],"YM Belt" : [-810.765,-226.182],"YM Back Right" : [-841.595,3.359]},
			"YL" : {"YL Left Pocket 1" : [-94.506,-459.13],"YL Right Pocket 1" : [-94.506,-391.753],"YL Left Pocket 2" : [-161.27,-470.219],"YL Right Pocket 2" : [-161.27,-398.059],"YL Right Low Pocket Flap" : [-161.679,-353.903],"YL Left Low Pocket Flap" : [-161.501,-310.532],"YL Outside Crotch" : [-236.077,-326.534],"YL Inside Crotch" : [-313.294,-326.432],"YL Back Left" : [-451.288,-314.283],"YL Front Left" : [-575.71,-317.334],"YL Front Right" : [-702.869,-317.334],"YL Belt" : [-810.765,-556.464],"YL Back Right" : [-843.356,-314.125]},
			"YXL" : {"YXL Left Pocket 1" : [-94.506,-793.559],"YXL Right Pocket 1" : [-94.506,-720.782],"YXL Left Pocket 2" : [-161.659,-803.944],"YXL Right Pocket 2" : [-161.271,-729.085],"YXL Right Low Pocket Flap" : [-161.908,-679.233],"YXL Left Low Pocket Flap" : [-161.501,-633.318],"YXL Outside Crotch" : [-235.749,-653.604],"YXL Inside Crotch" : [-313.361,-653.363],"YXL Back Left" : [-453.087,-637.522],"YXL Front Left" : [-577.888,-641.217],"YXL Front Right" : [-705.432,-641.219],"YXL Belt" : [-810.765,-886.34],"YXL Back Right" : [-845.154,-637.347]},
			"Y2XL" : {"Y2XL Left Pocket 1" : [-94.506,-1129.671],"Y2XL Right Pocket 1" : [-94.506,-1030.496],"Y2XL Left Pocket 2" : [-161.271,-1140.326],"Y2XL Right Pocket 2" : [-161.462,-1059.602],"Y2XL Right Low Pocket Flap" : [-161.501,-1001.631],"Y2XL Left Low Pocket Flap" : [-161.557,-957.588],"Y2XL Outside Crotch" : [-236.193,-979.406],"Y2XL Inside Crotch" : [-313.665,-978.453],"Y2XL Back Left" : [-454.883,-958.075],"Y2XL Front Left" : [-580.138,-968.302],"Y2XL Front Right" : [-706.895,-969.282],"Y2XL Belt" : [-804.837,-1233.834],"Y2XL Back Right" : [-846.951,-962.812]}
		}
	},

	"FD-2051" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Arm Binding 2" : [-866.209,404.547],"S Arm Binding 1" : [-866.078,439.402],"S Collar Binding" : [-866.396,482.519],"S Back" : [-228.825,574.765],"S Front" : [-495.625,571.136]},
			"M" : {"M Arm Binding 2" : [-867.762,149.188],"M Arm Binding 1" : [-867.629,184.043],"M Collar Binding" : [-867.569,227.16],"M Back" : [-234.23,319.434],"M Front" : [-500.921,316.63]},
			"L" : {"L Arm Binding 2" : [-865.985,-114.493],"L Arm Binding 1" : [-866.393,-79.638],"L Collar Binding" : [-866.307,-36.518],"L Back" : [-239.646,55.783],"L Front" : [-506.516,53.687]},
			"XL" : {"XL Arm Binding 2" : [-868.539,-387.276],"XL Arm Binding 1" : [-868.663,-352.435],"XL Collar Binding" : [-868.634,-309.321],"XL Back" : [-245.048,-217.036],"XL Front" : [-511.917,-218.22]},
			"2XL" : {"2XL Arm Binding 2" : [-870.534,-664.046],"2XL Arm Binding 1" : [-870.41,-629.191],"2XL Collar Binding" : [-870.366,-586.071],"2XL Back" : [-250.46,-493.791],"2XL Front" : [-517.436,-494.155]},
			"3XL" : {"3XL Arm Binding 2" : [-870.869,-950.293],"3XL Arm Binding 1" : [-870.396,-915.434],"3XL Collar Binding" : [-870.174,-872.317],"3XL Back" : [-255.868,-779.978],"3XL Front" : [-522.716,-779.496]},
			"4XL" : {"4XL Arm Binding 2" : [-870.524,-1240.512],"4XL Arm Binding 1" : [-870.754,-1205.657],"4XL Collar Binding" : [-870.753,-1162.537],"4XL Back" : [-261.267,-1070.219],"4XL Front" : [-528.115,-1068.93]},
			"5XL" : {"5XL Arm Binding 2" : [-870.71,-1528.512],"5XL Arm Binding 1" : [-870.771,-1493.622],"5XL Collar Binding" : [-870.807,-1450.555],"5XL Back" : [-266.673,-1358.236],"5XL Front" : [-533.516,-1356.059]}
		}
	},

	"FD-2052" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Back" : [-269.624,586.137],"S Front" : [-535.895,580.665]},
			"M" : {"M Back" : [-275.115,328.762],"M Front" : [-541.295,324.226]},
			"L" : {"L Back" : [-280.515,67.727],"L Front" : [-546.695,64.15]},
			"XL" : {"XL Back" : [-285.915,-202.218],"XL Front" : [-552.099,-204.929]},
			"2XL" : {"2XL Back" : [-291.315,-472.281],"2XL Front" : [-557.495,-474.112]},
			"3XL" : {"3XL Back" : [-296.715,-756.647],"3XL Front" : [-562.895,-757.68]},
			"4XL" : {"4XL Back" : [-302.115,-1044.671],"4XL Front" : [-568.295,-1044.689]},
			"5XL" : {"5XL Back" : [-307.515,-1343.103],"5XL Front" : [-573.698,-1342.347]}
		}
	},

	"FD-5064Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"YXS" : {"YXS Right Hip Pocket" : [-465.245,428.434],"YXS Inside Button Hole 2" : [-505.09,523.949],"YXS Inside Button Hole 1" : [-572.499,524.805],"YXS Belt" : [-756.656,337.839],"YXS Left Hip Pocket" : [-586.436,428.086],"YXS C Front In Waist" : [-640.893,531.551],"YXS Right Pocket" : [-673.22,454.774],"YXS C Back In Waist" : [-713.151,532.031],"YXS Left Pocket" : [-744.362,454.741],"YXS Inside Crotch" : [-807.112,504.038],"YXS Outside Crotch" : [-868.675,514.613],"YXS Left Leg" : [-162.562,513.435],"YXS Right Leg" : [-330.364,514.319]},
			"YS" : {"YS Right Hip Pocket" : [-470.002,148.62],"YS Inside Button Hole 2" : [-505.09,243.69],"YS Inside Button Hole 1" : [-572.499,243.69],"YS Belt" : [-771.13,59.115],"YS Left Hip Pocket" : [-591.2,148.616],"YS C Front In Waist" : [-641.228,251.385],"YS Right Pocket" : [-673.219,176.25],"YS C Back In Waist" : [-713.151,253.557],"YS Left Pocket" : [-744.361,176.402],"YS Inside Crotch" : [-807.093,226.173],"YS Outside Crotch" : [-868.673,236.75],"YS Left Leg" : [-167.095,232.366],"YS Right Leg" : [-334.893,232.229]},
			"YM" : {"YM Right Hip Pocket" : [-474.758,-134.281],"YM Inside Button Hole 2" : [-505.276,-41.585],"YM Inside Button Hole 1" : [-572.499,-41.343],"YM Belt" : [-771.13,-233.397],"YM Left Hip Pocket" : [-595.955,-134.281],"YM C Front In Waist" : [-641.229,-33.652],"YM Right Pocket" : [-673.237,-106.562],"YM C Back In Waist" : [-713.151,-31.437],"YM Left Pocket" : [-744.368,-106.407],"YM Inside Crotch" : [-807.103,-56.352],"YM Outside Crotch" : [-868.674,-45.686],"YM Left Leg" : [-171.621,-52.767],"YM Right Leg" : [-339.416,-51.155]},
			"YL" : {"YL Right Hip Pocket" : [-479.513,-417.182],"YL Inside Button Hole 2" : [-505.09,-326.691],"YL Inside Button Hole 1" : [-572.499,-326.691],"YL Belt" : [-792.731,-518.383],"YL Left Hip Pocket" : [-600.702,-417.178],"YL C Front In Waist" : [-641.228,-318.884],"YL Right Pocket" : [-673.295,-389.441],"YL C Back In Waist" : [-713.151,-316.87],"YL Left Pocket" : [-744.437,-389.325],"YL Inside Crotch" : [-807.046,-338.462],"YL Outside Crotch" : [-868.723,-328.014],"YL Left Leg" : [-176.142,-338.479],"YL Right Leg" : [-343.937,-338.47]},
			"YXL" : {"YXL Right Hip Pocket" : [-484.257,-698.579],"YXL Inside Button Hole 2" : [-505.089,-609.896],"YXL Inside Button Hole 1" : [-572.499,-610.092],"YXL Belt" : [-792.731,-801.87],"YXL Left Hip Pocket" : [-605.454,-698.579],"YXL C Front In Waist" : [-641.228,-602.298],"YXL Right Pocket" : [-673.419,-670.677],"YXL C Back In Waist" : [-713.151,-599.976],"YXL Left Pocket" : [-744.537,-670.65],"YXL Inside Crotch" : [-807.069,-619.575],"YXL Outside Crotch" : [-868.804,-608.913],"YXL Left Leg" : [-180.661,-621.819],"YXL Right Leg" : [-348.453,-621.956]},
			"Y2XL" : {"Y2XL Right Hip Pocket" : [-489.006,-981.482],"Y2XL Inside Button Hole 2" : [-505.26,-894.832],"Y2XL Inside Button Hole 1" : [-572.792,-894.84],"Y2XL Belt" : [-792.731,-1086.735],"Y2XL Left Hip Pocket" : [-610.203,-981.482],"Y2XL C Front In Waist" : [-640.893,-886.001],"Y2XL Right Pocket" : [-677.215,-953.412],"Y2XL C Back In Waist" : [-713.151,-884.893],"Y2XL Left Pocket" : [-748.295,-953.332],"Y2XL Inside Crotch" : [-807.156,-901.804],"Y2XL Outside Crotch" : [-868.911,-891.269],"Y2XL Left Leg" : [-185.177,-906.805],"Y2XL Right Leg" : [-352.965,-906.942]}
		}
	},

	"FD-5064" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Hip Pocket 2" : [-999.437,901.232],"S Belt" : [-1072.283,770.554],"S Hip Pocket 1" : [-999.437,996.766],"S Inside Button Hole 2" : [-1074.275,856.6],"S Inside Button Hole 1" : [-1104.277,857.068],"S Pocket 2" : [-741.947,994.241],"S C Back In Waist" : [-1105.615,929.733],"S Pocket 1" : [-831.782,994.241],"S C Front In Waist" : [-1107.644,987.806],"S Inside Crotch" : [-1175.637,997.021],"S Outside Crotch" : [-1236.401,997.021],"S Left Leg" : [-368.164,982.019],"S Right Leg" : [-611.787,982.026]},
			"M" : {"M Hip Pocket 2" : [-1001.819,586.182],"M Belt" : [-1073.474,454.012],"M Hip Pocket 1" : [-1001.819,681.716],"M Inside Button Hole 2" : [-1074.275,540.036],"M Inside Button Hole 1" : [-1104.277,540.655],"M Pocket 2" : [-741.948,679.192],"M C Back In Waist" : [-1105.616,613.319],"M Pocket 1" : [-831.782,679.192],"M C Front In Waist" : [-1107.643,671.354],"M Inside Crotch" : [-1175.554,676.601],"M Outside Crotch" : [-1236.407,676.601],"M Left Leg" : [-371.576,661.6],"M Right Leg" : [-615.145,661.594]},
			"L" : {"L Hip Pocket 2" : [-1003.441,245.455],"L Belt" : [-1074.285,116.543],"L Hip Pocket 1" : [-1003.441,340.989],"L Inside Button Hole 2" : [-1074.275,202.553],"L Inside Button Hole 1" : [-1104.277,203.259],"L Pocket 2" : [-741.948,338.464],"L C Back In Waist" : [-1105.616,275.614],"L Pocket 1" : [-831.786,338.464],"L C Front In Waist" : [-1107.645,333.886],"L Inside Crotch" : [-1175.479,339.764],"L Outside Crotch" : [-1236.405,339.764],"L Left Leg" : [-372.517,324.763],"L Right Leg" : [-616.152,324.761]},
			"XL" : {"XL Hip Pocket 2" : [-1005.4,-119.216],"XL Belt" : [-1089.669,-250.94],"XL Hip Pocket 1" : [-1005.407,-23.682],"XL Inside Button Hole 2" : [-1074.275,-164.199],"XL Inside Button Hole 1" : [-1104.277,-163.769],"XL Pocket 2" : [-741.948,-26.206],"XL C Back In Waist" : [-1105.616,-91.34],"XL Pocket 1" : [-831.786,-26.206],"XL C Front In Waist" : [-1107.645,-32.819],"XL Inside Crotch" : [-1175.548,-27.402],"XL Outside Crotch" : [-1236.405,-27.402],"XL Left Leg" : [-374.725,-42.403],"XL Right Leg" : [-618.583,-42.401]},
			"2XL" : {"2XL Hip Pocket 2" : [-1009.494,-448.936],"2XL Belt" : [-1091.714,-592.1],"2XL Hip Pocket 1" : [-1009.498,-353.403],"2XL Inside Button Hole 2" : [-1074.274,-511.667],"2XL Inside Button Hole 1" : [-1104.278,-511.527],"2XL Pocket 2" : [-741.948,-355.927],"2XL C Back In Waist" : [-1105.616,-438.747],"2XL Pocket 1" : [-831.786,-355.927],"2XL C Front In Waist" : [-1107.708,-381.447],"2XL Inside Crotch" : [-1175.474,-371.972],"2XL Outside Crotch" : [-1236.401,-371.972],"2XL Left Leg" : [-377.228,-386.973],"2XL Right Leg" : [-620.974,-386.964]},
			"3XL" : {"3XL Hip Pocket 2" : [-1013.655,-818.553],"3XL Belt" : [-1093.793,-950.029],"3XL Hip Pocket 1" : [-1013.656,-723.02],"3XL Inside Button Hole 2" : [-1074.274,-863.654],"3XL Inside Button Hole 1" : [-1104.278,-863.071],"3XL Pocket 2" : [-741.948,-725.544],"3XL C Back In Waist" : [-1105.653,-790.366],"3XL Pocket 1" : [-831.782,-725.544],"3XL C Front In Waist" : [-1107.648,-732.539],"3XL Inside Crotch" : [-1175.51,-723.471],"3XL Outside Crotch" : [-1236.405,-723.471],"3XL Left Leg" : [-380.377,-738.472],"3XL Right Leg" : [-623.188,-738.467]},
			"4XL" : {"4XL Hip Pocket 2" : [-1018.7,-1163.253],"4XL Belt" : [-1110.716,-1308.537],"4XL Hip Pocket 1" : [-1018.701,-1067.72],"4XL Inside Button Hole 2" : [-1074.566,-1222.482],"4XL Inside Button Hole 1" : [-1104.499,-1222.135],"4XL Pocket 2" : [-741.947,-1070.244],"4XL C Back In Waist" : [-1105.887,-1149.422],"4XL Pocket 1" : [-831.782,-1070.244],"4XL C Front In Waist" : [-1107.686,-1091.656],"4XL Inside Crotch" : [-1175.475,-1080.915],"4XL Outside Crotch" : [-1236.423,-1080.915],"4XL Left Leg" : [-385.102,-1095.917],"4XL Right Leg" : [-628.78,-1095.911]},
			"5XL" : {"5XL Hip Pocket 2" : [-1021.198,-1536.626],"5XL Belt" : [-1111.962,-1665.83],"5XL Hip Pocket 1" : [-1021.193,-1441.093],"5XL Inside Button Hole 2" : [-1074.275,-1579.381],"5XL Inside Button Hole 1" : [-1104.277,-1578.627],"5XL Pocket 2" : [-741.951,-1443.617],"5XL C Back In Waist" : [-1105.616,-1506.523],"5XL Pocket 1" : [-831.782,-1443.617],"5XL C Front In Waist" : [-1107.644,-1448.187],"5XL Inside Crotch" : [-1175.479,-1441.241],"5XL Outside Crotch" : [-1236.401,-1441.241],"5XL Left Leg" : [-388.953,-1456.243],"5XL Right Leg" : [-632.775,-1456.248]}
		}
	},

	"FD-2050" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Collar" : [-638.911,499.923],"S Back" : [-221.305,627.408],"S Front" : [-456.965,622.45]},
			"M" : {"M Collar" : [-646.217,265.974],"M Back" : [-226.677,393.423],"M Front" : [-462.352,392.119]},
			"L" : {"L Collar" : [-646.417,19.949],"L Back" : [-232.102,147.467],"L Front" : [-467.766,143.792]},
			"XL" : {"XL Collar" : [-650.959,-233.584],"XL Back" : [-237.512,-106.014],"XL Front" : [-473.176,-106.516]},
			"2XL" : {"2XL Collar" : [-654.513,-494.53],"2XL Back" : [-242.954,-367.044],"2XL Front" : [-478.611,-367.226]},
			"3XL" : {"3XL Collar" : [-656.537,-761.557],"3XL Back" : [-248.36,-634.036],"3XL Front" : [-484.017,-633.805]},
			"4XL" : {"4XL Collar" : [-658.438,-1037.5],"4XL Back" : [-253.77,-909.905],"4XL Front" : [-489.424,-909.407]},
			"5XL" : {"5XL Collar" : [-659.96,-1318.029],"5XL Back" : [-259.172,-1190.561],"5XL Front" : [-494.834,-1189.367]}
		}
	},

	"FD-5080Y" : 
	{
		"mockupSize" : "YXL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"YXS" : {"YXS Low Pocket Flap 2" : [-118.8,303.965],"YXS Low Pocket Flap 1" : [-118.8,373.873],"YXS Low Pocket Left" : [-199.645,316.3],"YXS Low Pocket Right" : [-199.645,386.579],"YXS Upper Pocket 2" : [-292.314,321.051],"YXS Upper Pocket 1" : [-292.314,391.035],"YXS Belt" : [-327.202,238.073],"YXS Outside Gusset" : [-402.465,387.759],"YXS Inside Gusset" : [-444.619,387.588],"YXS Left Side Panel" : [-498.509,389.915],"YXS Right Side Panel" : [-547.048,389.915],"YXS Back Right" : [-642.149,390.769],"YXS Back Left" : [-737.696,390.769],"YXS Front Left" : [-833.276,387.706],"YXS Front Right" : [-919.885,387.706]},
			"YS" : {"YS Low Pocket Flap 2" : [-118.8,64.789],"YS Low Pocket Flap 1" : [-118.8,152.798],"YS Low Pocket Left" : [-199.645,77.354],"YS Low Pocket Right" : [-199.645,165.508],"YS Upper Pocket 2" : [-292.314,81.803],"YS Upper Pocket 1" : [-292.314,170.058],"YS Belt" : [-325.457,7.25],"YS Outside Gusset" : [-402.465,161.714],"YS Inside Gusset" : [-444.619,161.57],"YS Left Side Panel" : [-498.505,166.815],"YS Right Side Panel" : [-547.048,166.881],"YS Back Right" : [-643.532,167.843],"YS Back Left" : [-739.08,167.906],"YS Front Left" : [-833.968,164.53],"YS Front Right" : [-920.577,164.53]},
			"YM" : {"YM Low Pocket Flap 2" : [-118.8,-168.968],"YM Low Pocket Flap 1" : [-118.8,-90.637],"YM Low Pocket Left" : [-199.645,-156.321],"YM Low Pocket Right" : [-199.645,-78.012],"YM Upper Pocket 2" : [-292.314,-151.9],"YM Upper Pocket 1" : [-292.314,-73.598],"YM Belt" : [-325.528,-233.195],"YM Outside Gusset" : [-402.464,-76.332],"YM Inside Gusset" : [-444.619,-76.228],"YM Left Side Panel" : [-498.509,-67.261],"YM Right Side Panel" : [-547.048,-67.261],"YM Back Right" : [-645.567,-66.195],"YM Back Left" : [-741.115,-66.196],"YM Front Left" : [-834.774,-69.636],"YM Front Right" : [-921.383,-69.636]},
			"YL" : {"YL Low Pocket Flap 2" : [-118.8,-418.909],"YL Low Pocket Flap 1" : [-118.8,-339.851],"YL Low Pocket Left" : [-199.645,-406.187],"YL Low Pocket Right" : [-199.645,-327.282],"YL Upper Pocket 2" : [-292.314,-401.909],"YL Upper Pocket 1" : [-292.314,-322.778],"YL Belt" : [-346.666,-488.248],"YL Outside Gusset" : [-402.464,-321.003],"YL Inside Gusset" : [-444.619,-321.011],"YL Left Side Panel" : [-498.509,-313.894],"YL Right Side Panel" : [-547.048,-313.895],"YL Back Right" : [-647.612,-312.783],"YL Back Left" : [-743.159,-312.783],"YL Front Left" : [-836.826,-316.224],"YL Front Right" : [-923.435,-316.224]},
			"YXL" : {"YXL Low Pocket Flap 2" : [-118.8,-673.385],"YXL Low Pocket Flap 1" : [-118.8,-585.173],"YXL Low Pocket Left" : [-199.645,-660.856],"YXL Low Pocket Right" : [-199.645,-572.586],"YXL Upper Pocket 2" : [-292.314,-656.168],"YXL Upper Pocket 1" : [-292.314,-567.995],"YXL Belt" : [-348.359,-743.509],"YXL Outside Gusset" : [-402.464,-571.139],"YXL Inside Gusset" : [-444.618,-571.032],"YXL Left Side Panel" : [-498.509,-562.352],"YXL Right Side Panel" : [-547.048,-562.394],"YXL Back Right" : [-649.616,-561.241],"YXL Back Left" : [-745.163,-561.242],"YXL Front Left" : [-837.863,-564.681],"YXL Front Right" : [-924.472,-564.681]},
			"Y2XL" : {"Y2XL Low Pocket Flap 2" : [-118.8,-946.789],"Y2XL Low Pocket Flap 1" : [-118.8,-859.13],"Y2XL Low Pocket Left" : [-199.645,-934.037],"Y2XL Low Pocket Right" : [-199.645,-846.56],"Y2XL Upper Pocket 2" : [-292.314,-929.642],"Y2XL Upper Pocket 1" : [-292.314,-841.991],"Y2XL Belt" : [-349.512,-1012.399],"Y2XL Outside Gusset" : [-402.464,-832.066],"Y2XL Inside Gusset" : [-444.618,-831.702],"Y2XL Left Side Panel" : [-498.509,-821.631],"Y2XL Right Side Panel" : [-547.048,-821.753],"Y2XL Back Right" : [-651.65,-820.71],"Y2XL Back Left" : [-747.197,-820.568],"Y2XL Front Left" : [-839.001,-824.156],"Y2XL Front Right" : [-925.61,-824.156]}
		}
	},

	"FD-5080" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Low Pocket Flap 2" : [-240.302,879.62],"S Low Pocket Flap 1" : [-240.302,979.59],"S Low Pocket 2" : [-330.476,879.62],"S Low Pocket 1" : [-330.476,979.59],"S Belt" : [-441.437,781.226],"S Upper Pocket 2" : [-441.437,879.62],"S Upper Pocket 1" : [-441.437,979.59],"S Outside Gusset" : [-506.806,979.59],"S Inside Gusset" : [-566.858,979.59],"S Left Side Panel" : [-645.066,980.196],"S Right Side Panel" : [-715.621,979.59],"S Back Right" : [-805.183,979.59],"S Back Left" : [-897.726,979.59],"S Front Left" : [-996.749,980.938],"S Front Right" : [-1094.54,980.88]},
			"M" : {"M Low Pocket Flap 2" : [-240.302,581.614],"M Low Pocket Flap 1" : [-240.302,680.126],"M Low Pocket 2" : [-330.476,581.614],"M Low Pocket 1" : [-330.476,680.126],"M Belt" : [-441.437,475.627],"M Upper Pocket 2" : [-441.437,581.614],"M Upper Pocket 1" : [-441.437,680.126],"M Outside Gusset" : [-506.806,680.126],"M Inside Gusset" : [-566.858,680.126],"M Left Side Panel" : [-644.549,680.126],"M Right Side Panel" : [-715.62,680.126],"M Back Right" : [-805.616,680.126],"M Back Left" : [-898.154,680.126],"M Front Left" : [-998.022,680.126],"M Front Right" : [-1095.761,680.126]},
			"L" : {"L Low Pocket Flap 2" : [-240.302,282.79],"L Low Pocket Flap 1" : [-240.298,389.1],"L Low Pocket 2" : [-330.476,282.79],"L Low Pocket 1" : [-330.476,389.1],"L Belt" : [-441.437,178.912],"L Upper Pocket 2" : [-441.437,282.79],"L Upper Pocket 1" : [-441.437,389.1],"L Outside Gusset" : [-506.805,389.1],"L Inside Gusset" : [-566.858,389.1],"L Left Side Panel" : [-644.549,389.1],"L Right Side Panel" : [-715.62,389.1],"L Back Right" : [-806.955,389.1],"L Back Left" : [-899.492,389.1],"L Front Left" : [-999.601,389.1],"L Front Right" : [-1097.389,389.1]},
			"XL" : {"XL Low Pocket Flap 2" : [-240.302,-27.491],"XL Low Pocket Flap 1" : [-240.298,75.269],"XL Low Pocket 2" : [-330.476,-27.491],"XL Low Pocket 1" : [-330.476,75.269],"XL Belt" : [-441.437,-141.97],"XL Upper Pocket 2" : [-441.437,-27.491],"XL Upper Pocket 1" : [-441.437,75.269],"XL Outside Gusset" : [-506.806,75.269],"XL Inside Gusset" : [-566.857,75.269],"XL Left Side Panel" : [-644.548,75.269],"XL Right Side Panel" : [-715.619,75.269],"XL Back Right" : [-808.301,75.269],"XL Back Left" : [-900.839,75.269],"XL Front Left" : [-1000.934,75.269],"XL Front Right" : [-1098.721,75.269]},
			"2XL" : {"2XL Low Pocket Flap 2" : [-240.302,-402.238],"2XL Low Pocket Flap 1" : [-240.298,-279.71],"2XL Low Pocket 2" : [-330.476,-402.238],"2XL Low Pocket 1" : [-330.476,-279.71],"2XL Belt" : [-441.437,-507.377],"2XL Upper Pocket 2" : [-441.437,-402.238],"2XL Upper Pocket 1" : [-441.437,-279.71],"2XL Outside Gusset" : [-506.805,-279.71],"2XL Inside Gusset" : [-566.857,-279.71],"2XL Left Side Panel" : [-644.548,-279.71],"2XL Right Side Panel" : [-715.623,-279.71],"2XL Back Right" : [-808.284,-279.71],"2XL Back Left" : [-900.822,-279.71],"2XL Front Left" : [-1002.168,-279.71],"2XL Front Right" : [-1099.955,-279.71]},
			"3XL" : {"3XL Low Pocket Flap 2" : [-240.302,-758.712],"3XL Low Pocket Flap 1" : [-240.302,-638.379],"3XL Low Pocket 2" : [-330.476,-758.712],"3XL Low Pocket 1" : [-330.476,-638.379],"3XL Belt" : [-441.437,-856.377],"3XL Upper Pocket 2" : [-441.437,-758.712],"3XL Upper Pocket 1" : [-441.437,-638.379],"3XL Outside Gusset" : [-506.806,-638.379],"3XL Inside Gusset" : [-566.857,-638.379],"3XL Left Side Panel" : [-644.548,-638.379],"3XL Right Side Panel" : [-715.619,-638.379],"3XL Back Right" : [-809.89,-638.379],"3XL Back Left" : [-902.432,-638.379],"3XL Front Left" : [-1004.061,-638.379],"3XL Front Right" : [-1101.799,-638.379]},
			"4XL" : {"4XL Low Pocket Flap 2" : [-240.432,-1083.049],"4XL Low Pocket Flap 1" : [-240.426,-984.614],"4XL Low Pocket 2" : [-330.476,-1083.049],"4XL Low Pocket 1" : [-330.476,-984.614],"4XL Belt" : [-441.437,-1215.377],"4XL Upper Pocket 2" : [-441.437,-1083.049],"4XL Upper Pocket 1" : [-441.437,-984.614],"4XL Outside Gusset" : [-506.802,-984.614],"4XL Inside Gusset" : [-566.854,-984.614],"4XL Left Side Panel" : [-644.548,-984.614],"4XL Right Side Panel" : [-715.619,-984.614],"4XL Back Right" : [-812.144,-984.614],"4XL Back Left" : [-904.686,-984.614],"4XL Front Left" : [-1005.862,-984.614],"4XL Front Right" : [-1103.65,-984.614]},
			"5XL" : {"5XL Low Pocket Flap 2" : [-240.302,-1431.267],"5XL Low Pocket Flap 1" : [-240.302,-1325.788],"5XL Low Pocket 2" : [-330.476,-1431.267],"5XL Low Pocket 1" : [-330.476,-1325.788],"5XL Belt" : [-441.437,-1537.306],"5XL Upper Pocket 2" : [-441.437,-1431.267],"5XL Upper Pocket 1" : [-441.437,-1325.788],"5XL Outside Gusset" : [-506.805,-1325.788],"5XL Inside Gusset" : [-566.854,-1325.788],"5XL Left Side Panel" : [-644.548,-1325.788],"5XL Right Side Panel" : [-715.619,-1325.788],"5XL Back Right" : [-814.313,-1325.193],"5XL Back Left" : [-907.028,-1326.461],"5XL Front Left" : [-1007.748,-1325.788],"5XL Front Right" : [-1105.536,-1325.788]}
		}
	},

	"FD-3181" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Back" : [-222.088,342.953],"S Front" : [-478.399,341.86],"S Neck Tape" : [-668.472,200.165],"S Collar" : [-709.958,253.527]},
			"M" : {"M Back" : [-227.457,75.236],"M Front" : [-483.77,74.652],"M Neck Tape" : [-670.59,-67.835],"M Collar" : [-712.297,-14.473]},
			"L" : {"L Back" : [-232.827,-204.453],"L Front" : [-489.132,-204.562],"L Neck Tape" : [-671.083,-347.835],"L Collar" : [-714.637,-294.475]},
			"XL" : {"XL Back" : [-238.199,-488.155],"XL Front" : [-494.512,-487.735],"XL Neck Tape" : [-673.096,-631.837],"XL Collar" : [-716.978,-578.475]},
			"2XL" : {"2XL Back" : [-243.574,-779.811],"2XL Front" : [-499.882,-778.906],"2XL Neck Tape" : [-674.402,-923.835],"2XL Collar" : [-719.318,-870.475]},
			"3XL" : {"3XL Back" : [-248.953,-1083.514],"3XL Front" : [-505.258,-1082.031],"3XL Neck Tape" : [-676.008,-1227.835],"3XL Collar" : [-721.66,-1174.475]}
		}
	},

	"FD-3182" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : true,
		"placement" : 
		{
			"S" : {"S Right Sleeve" : [-212.946,205.774],"S Left Sleeve" : [-212.951,296.855],"S Back" : [-441.542,356.162],"S Front" : [-689.304,354.153],"S Neck Tape" : [-898.599,216.89],"S Collar" : [-948.767,269.591]},
			"M" : {"M Right Sleeve" : [-215.074,-64.428],"M Left Sleeve" : [-215.074,26.654],"M Back" : [-446.938,84.37],"M Front" : [-694.7,82.944],"M Neck Tape" : [-900.633,-55.11],"M Collar" : [-951.112,-2.41]},
			"L" : {"L Right Sleeve" : [-217.225,-346.628],"L Left Sleeve" : [-217.224,-255.546],"L Back" : [-452.341,-199.38],"L Front" : [-700.1,-200.273],"L Neck Tape" : [-901.275,-339.11],"L Collar" : [-953.458,-286.41]},
			"XL" : {"XL Right Sleeve" : [-219.351,-628.829],"XL Left Sleeve" : [-219.352,-537.745],"XL Back" : [-457.738,-483.15],"XL Front" : [-705.5,-483.419],"XL Neck Tape" : [-903.452,-623.11],"XL Collar" : [-955.793,-570.41]},
			"2XL" : {"2XL Right Sleeve" : [-221.481,-923.027],"2XL Left Sleeve" : [-221.481,-831.945],"2XL Back" : [-463.137,-778.9],"2XL Front" : [-710.896,-778.583],"2XL Neck Tape" : [-904.872,-919.11],"2XL Collar" : [-958.135,-866.41]},
			"3XL" : {"3XL Right Sleeve" : [-223.616,-1221.212],"3XL Left Sleeve" : [-223.615,-1130.132],"3XL Back" : [-468.538,-1078.636],"3XL Front" : [-716.296,-1077.73],"3XL Neck Tape" : [-906.306,-1219.11],"3XL Collar" : [-960.479,-1166.41]}
		}
	},

	"FD-4057" : 
	{
		"mockupSize" : "XL",
		"scaleFrontLogo" : false,
		"placement" : 
		{
			"S" : {"S Left Leg" : [-424.632,229.909],"S Right Leg" : [-725.727,229.916]},
			"M" : {"M Left Leg" : [-427.711,1],"M Right Leg" : [-729.277,0.997]},
			"L" : {"L Left Leg" : [-431.529,-227.909],"L Right Leg" : [-732.84,-227.911]},
			"XL" : {"XL Left Leg" : [-435.242,-464.317],"XL Right Leg" : [-736.642,-464.318]},
			"2XL" : {"2XL Left Leg" : [-438.918,-703.723],"2XL Right Leg" : [-740.414,-703.717]},
			"3XL" : {"3XL Left Leg" : [-442.284,-946.12],"3XL Right Leg" : [-743.73,-946.124]}
		}
	},
}
