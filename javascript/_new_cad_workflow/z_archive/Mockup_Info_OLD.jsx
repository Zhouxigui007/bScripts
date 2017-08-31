﻿function getStarted(){	var docRef = app.activeDocument;	var layers = docRef.layers;	var infoLayer = layers.getByName("Information");		var valid = true;		var orderNumber;	var teamName;	var initials;		var curDate = getDate();		function getDate(){			var today = new Date();			var dd = today.getDate();			var mm = today.getMonth()+1; //January is 0!			var yyyy = today.getYear();			var yy = yyyy-100;			if(dd<10) {				dd='0'+dd			} 			if(mm<10) {				mm='0'+mm			} 			return mm+'.'+dd+'.'+yy;		}		var infoInitials = infoLayer.textFrames.getByName("Mockup Initials");	var infoOrderNumber = infoLayer.textFrames.getByName("Order Number");	var infoFabricType = infoLayer.textFrames.getByName("Fabric Type");					//Begin ScriptUI dialog	var info = new Window("dialog", "Input Mockup Info");			//Initials		var INGroup = info.add("group");			INGroup.orientation = "column"			var text = INGroup.add("statictext", undefined, "Initials");			var INText = INGroup.add("edittext", undefined, "ABC");				INText.active = true;				INText.characters = 5;						//Order Number				var ONGroup = info.add("group");			ONGroup.orientation = "column";			var text = ONGroup.add("statictext", undefined, "Order Number");			var ONText = ONGroup.add("edittext", undefined, "1234567");				ONText.characters = 10;					//Team Name(Customer)			var TNGroup = info.add("group");			TNGroup.orientation = "column";			var text = TNGroup.add("statictext", undefined, "Team Name(Customer)");				var TNText = TNGroup.add("edittext", undefined, "Bandits(Smith)");				TNText.characters = 30;			//Fabric Type		var FTGroup = info.add("group");			FTGroup.orientation = "column";			var text = FTGroup.add("statictext", undefined, "Fabric Type");			var FTText = FTGroup.add("edittext", undefined, "Density (36g)");				FTText.characters = 10;				//Buttons		var buttonGroup = info.add("group");			buttonGroup.add("button", undefined, "OK");			buttonGroup.add("button", undefined, "Cancel");	if(info.show() == 1){		orderNumber = ONText.text + " " + TNText.text;		infoOrderNumber.contents = orderNumber;				initials = INText.text + " " + curDate;		infoInitials.contents = initials;				fabricType = FTText.text;		infoFabricType.contents = fabricType;	}	else{	valid = false;	}	//End ScriptUI dialog			}getStarted();