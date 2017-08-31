/*
Player Name,Player Number
Fred,1
Jimmy,12
Hal,15
Tom,23
Colin,77
Andrew,88
*/

function testConvert(){
	function findDest(){
        var dest = new Folder("~/Desktop/In Progress/~OLD/Automation/Javascript/_New CAD Workflow/CSV Testing/");
        return dest.fsName;
    }
    
	var dest = findDest();
	dest = "/Volumes/Macintosh HD" + dest
	var theFile = new File(dest + "/test.csv");
	theFile.open();
	var theContents = theFile.read();
	theFile.close();
	
	var smalls = [];
	
	var dataTypes = [];
	
	
	function csvJSON(csv){

		var lines=csv.split("\n");

		var result = [];

		var headers=lines[0].split(",");
	  
		for(var a=0;a<headers.length;a++){
	  		dataTypes.push(headers[a]);
		}

		for(var i=1;i<lines.length;i++){

			var obj = {};
			var currentline=lines[i].split(",");

			for(var j=0;j<headers.length;j++){
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);

		}
  
		//return result; //JavaScript object
		return result; //JSON
	}
	
	
	var theObject = csvJSON(theContents);
	
	for(var a=0;a<theObject.length;a++){
		if(theObject[a].Size == "S"){
			smalls.push(theObject[a])
			theObject.splice(a,1);
		}
	}
	
	$.writeln("Smalls = " + smalls);
	$.writeln(dataTypes);
	$.writeln(theObject);
	$.writeln(theObject[0]);
}
testConvert();