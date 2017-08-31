function container()
{
	var db =  new File("database.txt");
	db.open();
	var contents = db.read();
	alert(contents);
}
container();