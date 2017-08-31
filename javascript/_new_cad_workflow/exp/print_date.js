function printDate()
{
	var now = Date.now();
	var numDays = 30;
	var exp = now + (1000 * 60 * 60 * 24 * numDays);
	console.log("var exp = " + exp + ";");
}
printDate();