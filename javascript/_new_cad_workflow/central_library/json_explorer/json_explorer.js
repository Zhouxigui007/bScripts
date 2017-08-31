function test()
{


	var path = new Folder("/Volumes/Customization/Library/Scripts/Script Resources/Data/json_design_files");

	var files = path.getFiles();

	for(var a=0;a<200;a++)
	{

		var thisFile = new File(files[a]);
		thisFile.open();
		var contents = "(" + thisFile.read() + ")";
		thisFile.close();
		if(contents.indexOf("<html>")>-1)
		{
			$.writeln(files[a] + " was an html file..");
			continue;
		}
		contents = eval(contents);
		var blah = contents;
		try
		{
			$.writeln("file " + a + ".config.top.mid = " + contents.config.top.mid);
			$.writeln("design id = " + contents.designId);
			$.writeln("config.graphics")
		}
		catch(e)
		{
			// $.writeln("file " + a + " doesn't have a .config.top.mid property.")
		}
	}
}
test();