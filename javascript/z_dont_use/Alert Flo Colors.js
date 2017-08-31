#target illustrator-18

function alertFlo(){
	if (app.documents.length>0){
		var docRef = app.activeDocument;
		var inks = docRef.inkList;
		var FO = '[Ink FLO ORANGE B]';
		var FY = '[Ink FLO YELLOW B]';
		var FP = '[Ink FLO PINK B]';
		var NC = '[Ink NEON CORAL B]';
		var TW = '[Ink Twitch B]';
		var colors = [];
		for(a=0;a<inks.length;a++){
			if(inks[a].inkInfo.printingStatus == InkPrintStatus.ENABLEINK){
				if (inks[a] == FO || inks[a] == FY || inks[a] == FP || inks[a] == NC || inks[a] == TW){
					var currentInk = "'" + inks[a] + "'";
					var substring = currentInk.substr(6, (currentInk.length-8));
					colors.push(substring);
				}
			}
		}
		if(colors.length>0){
			alert("Flo Colors In Document!!" + ('\n') + colors.join('\n'));
		}
		else{
			alert("No Flo Colors");
		}
	}
}

alertFlo(); 