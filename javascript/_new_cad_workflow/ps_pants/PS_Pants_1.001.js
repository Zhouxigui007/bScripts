/*


Script Name: 
Author: William Dowling
Build Date: 21 September, 2016
Description: change all of the text on the side panels of a PS pants prepress file and apply the appropriate character styles (graphic styles and fonts)
Build number: 

Progress:

	Version 1.001
		

*/

function container()
{

	/*****************************************************************************/

	///////Begin/////////
	///Logic Container///
	/////////////////////

	function test()
	{
		var docRef = app.activeDocument;
		var srcDoc = app.documents["PS_Fonts.ai"];
		var getStyle = prompt("Enter a style number.", "1002");
		getStyle = "PS_" + getStyle;
		var style = srcDoc.layers[getStyle].pageItems[0];
		var font = srcDoc.layers[getStyle].layers[0].name;

		var styleCopy = style.duplicate(docRef);

		styleCopy.remove();
		var txt = docRef.textFrames[0];
		try
		{
			txt.textRange.characterAttributes.textFont = textFonts[font];
		}
		catch(e)
		{
			alert("Please activate the font: " + font + " in FontAgentPro and try again.");
			return;
		}
		var gStyle = docRef.graphicStyles[getStyle];
		gStyle.applyTo(txt)

	}
	test();	



	////////End//////////
	///Logic Container///
	/////////////////////

	/*****************************************************************************/

	///////Begin////////
	////Data Storage////
	////////////////////




	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////

	var docRef = app.activeDocument;
	var srcDoc = "/Volumes/Customization/Library/Scripts/Script Resources/Data/"




	////////End/////////
	///Function Calls///
	////////////////////

	/*****************************************************************************/

}
container();