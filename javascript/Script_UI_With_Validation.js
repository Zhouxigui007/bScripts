function wrapper(){

	var docRef = app.activeDocument;

	var resultsOfDialog = makeUIDialog()

	var defaultText1 = "";
	var defaultText2 = "";

	function makeUIDialog()
	{

		var result = {};

		if(result == null)
			return null;


		var myDlg = new Window("dialog","Text Description");
			var txtInput1 = myDlg.add("statictext", undefined, "Enter Some Text");
			var userInput1 = myDlg.add("edittext", undefined, defaultText1);
				userInput1.characters = 25;
			var txtInput2 = myDlg.add("statictext", undefined, "Enter an integer greater than 0");
			var userInput2 = myDlg.add("edittext", undefined, defaultText2);
				userInput2.characters = 2;

			var btnGroup = myDlg.add("group")
				var submitButton = btnGroup.add("button", undefined, "OK");
				var cancelButton = btnGroup.add("button", undefined, "Cancel");


			
		function validate()
		{
			

			if(myDlg.show() == 1)
			{
				defaultText1 = userInput1.text;
				defaultText2 = userInput2.text;

				if(userInput1.text == "")
				{
					alert("Such and Such can't be empty!");
					// result = null;
					makeUIDialog();
				}
				else
				{
					result["userInput1"] = userInput1.text;
				}

				if(parseInt(userInput2.text) * 0 != 0)
				{
					alert("Such and Such Else must be an integer!");
					result = null;
					makeUIDialog();df
				}
				else if(parseInt(userInput2.text)<1)
				{
					alert("Such and Such must be greater than 0!");
					result = null;
					makeUIDialog();
				}
				else
				{
					result["userInput2"] = userInput2.text;
				}
				
			}

			else
			{
				alert("Why you cancel? You stupid!");
				result = null;
			}

		
			

		}

		validate();

		var allText = docRef.textFrames;

		try
		{
			for (var i = 0; i < allText.length; i++)
			{    
				if (allText[i].layer == "[Layer Single Line]" || allText[i].layer == "[Layer Two Line]" || allText[i].layer == "[Layer Three Line]" || allText[i].layer == "[Layer Four Line]")
				{    
					if (allText[i].contents.substr(0, 4) == "UENR" || allText[i].contents.substr(0, 4) == "RENR" || allText[i].contents.substr(0, 4) == "SENR" || allText[i].contents.substr(0, 4) == "KENR")
					{    
						var mediaNumber = allText[i].contents;    
					}    
				}    
			}
		}
		catch(e)
		{
			result["mediaNumber"] = null;
		}

		result["mediaNumber"] = mediaNumber;


		return result;
	}


	if(resultsOfDialog != null)
	{
		alert("Results:\nUser Input 1 = " + resultsOfDialog["userInput1"] + "\nUser Input 2 = " + //
			resultsOfDialog["userInput2"] + "\nMedia Number = " + resultsOfDialog["mediaNumber"]);
	}

}
wrapper();