function getStyles()
{

	var path = "/Volumes/Customization/Library/cads/prepress/SOCCER/FD-857Y_Youth_Shorts/_Converted_Templates";

	var folder = new Folder(path);

	var files = folder.getFiles();

	var styleNum;

	for(var x=0;x<files.length;x++)
	{
		var name = files[x].name;
		styleNum = name.substring(name.indexOf("_")+1, name.length);
		styleNum = styleNum.substring(styleNum.indexOf("_")+1, styleNum.length);
		styleNum = styleNum.substring(0,styleNum.indexOf(".ait"));
		$.writeln(styleNum);
	}
}
getStyles();