/*

Script Name: Add_Rush_Order
Author: William Dowling
Build Date: 11 August, 2017
Description: Add a rush order to the database
Build number: 1.0
*/

function container()
{

	/*****************************************************************************/

	///////Begin/////////
	///Logic Container///
	/////////////////////

	//sendErrors Function Description
	//Display any errors to the user in a preformatted list
	function sendErrors(errorList)
	{
		alert(errorList.join("\n"));
	}

	function createDialog()
	{
		var result;
		var w = new Window("dialog", "Enter the information for the rush order.");
			var msg = "Enter the information for the rush order."
			var topTxt = w.add("statictext", undefined, msg);
			var inputGroup = w.add("group");
				inputGroup.orientation = "column";
				inputGroup.alignChildren = "center";
				
				//order number
				var inputOrderNumber = inputGroup.add("group");
					var ionText = inputOrderNumber.add("statictext", undefined, "Order Number: ");
					var ionInput = inputOrderNumber.add("edittext", undefined, "");
						ionInput.characters = 10;
						ionInput.active = true;

				//team name
				var inputTeamName = inputGroup.add("group");
					var itnText = inputTeamName.add("statictext", undefined, "Team Name: ");
					var itnInput = inputTeamName.add("edittext", undefined, "");
						itnInput.characters = 30;

				//paid rush?
				var inputPaidRush = inputGroup.add("group");
					// var iprCheckboxText = inputPaidRush.add("statictext", undefined, "Paid Rush: ");
					var iprCheckbox = inputPaidRush.add("checkbox", undefined, "Paid Rush");
						iprCheckbox.characters = 7;

			var btnGroup = w.add("group");
				var submit = btnGroup.add("button", undefined, "Submit");
					submit.onClick = function()
					{
						if(validate())
						{
							result = true;
							newRushData.createdBy = user;
							newRushData.createdOn = logTime();
							newRushData.due = getDueDay();
							newRushData.orderNumber = ionInput.text;
							newRushData.teamName = itnInput.text;
							newRushData.inProg = false;
							newRushData.approved = false;
							newRushData.approvedOn = "";
							newRushData.mockupArtist = "";
							newRushData.paidRush = iprCheckbox.value;
							newRushData.pullDate = "";
							newRushData.mockupSent = false;
							newRushData.mockupSentOn = "";
							newRushData.onHold = false;
							newRushData.holdLog = [];
							w.close();
						}
					}
				var cancel = btnGroup.add("button", undefined, "Cancel");
					cancel.onClick = function()
					{
						result = false;
						w.close();
					}

		w.show();

		return result;


		function validate()
		{
			var result = true;

			var onPat = /\d{7}/;

			if(!onPat.test(ionInput.text))
			{
				alert("Invalid Order Number.");
				result = false;
			}
			if(itnInput.text.length < 1)
			{
				alert("You must enter a team name.");
				result = false;
			}

			return result;
		}
	}

	function getDueDay()
	{
		var result = {};
		var date = new Date();
		var d = date.getDay();
		var days = [2,1,1,1,1,3,2];
		var dayText = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		date.setDate(date.getDate() + days[d]);

		result.dueDate = date.getDate();
		result.dueMonth = date.getMonth() + 1;
		result.dueDayName = dayText[date.getDay()];

		return result;
	}


	function writeDatabaseFile()
	{
		var parenPat = /[\(\)]/g;

		rushOrderData[newRushData.orderNumber] = newRushData;

		var str = "var rushOrderData = " + JSON.stringify(rushOrderData).replace(parenPat,"");

		dbFile.open("w");
		dbFile.write(str)
		dbFile.close();
	}


	////////End//////////
	///Logic Container///
	/////////////////////

	/*****************************************************************************/

	///////Begin////////
	////Data Storage////
	////////////////////

	var dbPath = "~/Desktop/automation/rush_orders/data.js"
	var dbFile = new File(dbPath);

	#include "/Volumes/Customization/Library/Scripts/Script Resources/Data/Utilities_Container.js";
	eval("#include \"" + dbPath + "\"");



	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////

	var errorList = [];

	var newRushData = {};

	var valid = true;

	valid = createDialog();

	if(valid && rushOrderData[newRushData.orderNumber])
	{
		valid = confirm("That order number already exists in the rush database. Do you want to overwrite?");
	}

	if(valid)
	{
		writeDatabaseFile();
	}




	////////End/////////
	///Function Calls///
	////////////////////

	/*****************************************************************************/

	if(errorList.length>0)
	{
		sendErrors(errorList);
	}
	return valid

}
container();