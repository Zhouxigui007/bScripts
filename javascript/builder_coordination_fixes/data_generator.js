function test()
{
	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var obj = "";

	var fill = false;
	var stroke = false;
	var strokeWidth = false;
	var guides = true;
	var rename = true;

	var sel = docRef.selection;

	obj += "{\n";
	for(var x=0;x<sel.length;x++)
	{
		var thisItem = sel[x];
		obj += "\t\"" + thisItem.name + "\":";
		obj += "\t{\n"
		obj += "\t\t\"left\": " + thisItem.left + ",\n";
		obj += "\t\t\"top\": " + thisItem.top + ",\n";
		obj += "\t\t\"width\": " + thisItem.width + ",\n";
		obj += "\t\t\"height\": " + thisItem.height + ",\n";
		obj += "\t\t\"fill\": " + fill + ",\n";
		obj += "\t\t\"stroke\": " + stroke + ",\n";
		obj += "\t\t\"strokeWidth\": " + strokeWidth + ",\n";
		obj += "\t\t\"guides\": " + guides + ",\n";
		obj += "\t\t\"rename\": " + rename + "\n";
		if(x<sel.length-1)
		{
			obj += "\t},\n";	
		}
		else
		{
			obj += "\t}\n";
		}
	}
	obj += "}";
	$.writeln(obj);
}
test();