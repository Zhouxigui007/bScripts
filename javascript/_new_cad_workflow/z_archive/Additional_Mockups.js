function createNewArtboards(){
	var docRef = app.activeDocument;
	var aB = docRef.artboards;
	var originalLeft = aB[0].artboardRect[0];
	var originalRight = aB[0].artboardRect[2];
	var left = aB[0].artboardRect[0];
	var top = aB[0].artboardRect[1];
	var right = aB[0].artboardRect[2];
	var bot = aB[0].artboardRect[3];
	var move = 2100;
	
	var howMany = parseInt(prompt("How many extra artboards do you need?", "Enter number here..."));
	
	if(howMany <= 4){
		for(var a=0;a<howMany;a++){
			left=left+move;
			right=right+move;
			var newAbRect = [left,top,right,bot];
			var newAb = aB.add(newAbRect);
		}
	}
	else{
		var remaining = howMany;
		while(remaining >0){
			if(aB.length!= 5 && aB.length != 10 && aB.length != 15){
				left = left+move;
				right = right+move;
				var newAbRect = [left,top,right,bot];
				var newAb = aB.add(newAbRect);
			}
			else{
				left = originalLeft;
				right = originalRight;
				top = top-move;
				bot = bot-move;
				var newAbRect = [left,top,right,bot];
				var newAb = aB.add(newAbRect);
			}
			remaining--;
		}
	}
}	
createNewArtboards();