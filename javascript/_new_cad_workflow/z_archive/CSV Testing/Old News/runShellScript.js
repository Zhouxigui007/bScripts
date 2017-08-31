function test(){
	var docRef = app.activeDocument;
	var shell = new File("~/Desktop/In Progress/~OLD/Automation/Javascript/_New CAD Workflow/CSV Testing/shellScript.py");
	shell.open();
	var blah = shell.execute();
	shell.close();
	$.writeln(blah);
}