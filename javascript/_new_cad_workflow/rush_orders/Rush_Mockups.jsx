/*

Script Name: Add_Rush_Order
Author: William Dowling
Build Date: 11 August, 2017
Description: Add a rush order to the database
Build number: 1.0
*/

function container()
{

	var valid = true;

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

	////////In Prog////////
	//////Order Stuff//////
	///////////////////////

	function checkForInProg()
	{
		var result = [];
		for(var order in rushOrderData)
		{
			var curOrder = rushOrderData[order];
			if(!curOrder.archived && curOrder.inProg && curOrder.mockupArtist === user)
			{
				result.push(curOrder.orderNumber);
			}
		}
		return result;
	}

	function showInProgOrderDialog(inProgOrders)
	{
		/* beautify ignore:start */
		w = new Window("dialog", "Your Current Rush Orders:");
			
			listGroup = w.add("group");
			//create the listbox to hold all of the
			//current rush orders.
			populateListBox()

			//group/panel to hold the display info
			disp = w.add("panel", undefined, "Info");
				disp.orientation = "column";

				var dispStr = 'statictext {text:"",characters:20, justify:"right"}';
				
				//order number
				onGroup = disp.add("group");
					onTxt = onGroup.add(makeTxt("Order Number"));
					onDisp = onGroup.add(dispStr);

				//team name
				tnGroup = disp.add("group");
					tnTxt = tnGroup.add(makeTxt("Team Name"));
					tnDisp = tnGroup.add(dispStr);

				//paid rush
				prGroup = disp.add("group");
					prTxt = prGroup.add(makeTxt("Paid Rush"));
					prDisp = prGroup.add(dispStr);

				//due by
				dueGroup = disp.add("group");
					dueTxt = dueGroup.add(makeTxt("Due By"));
					dueDisp = dueGroup.add(dispStr);

				//in progress
				ipGroup = disp.add("group");
					ipTxt = ipGroup.add(makeTxt("In Progress"));
					ipDisp = ipGroup.add(dispStr);

				//mockup sent
				msGroup = disp.add("group");
					msTxt = msGroup.add(makeTxt("Mockup Sent"));
					msDisp = msGroup.add(dispStr);

				//approved
				apGroup = disp.add("group");
					apTxt = apGroup.add(makeTxt("Approved"));
					apDisp = apGroup.add(dispStr);

				//approved
				holdGroup = disp.add("group");
					holdTxt = holdGroup.add(makeTxt("On Hold"));
					holdDisp = holdGroup.add(dispStr);

			updateOrderBtnGroup = w.add("group");
				
				var mockupSentButton = updateOrderBtnGroup.add("button", undefined, "Mockup Sent");
					mockupSentButton.onClick = function()
					{
						var thisOrder = rushOrderData[list.selection.text];
						if(list.selection && !thisOrder.mockupSent)
						{
							thisOrder.mockupSent = true;
							thisOrder.mockupSentOn = logTime();
							alert("Successfully updated data.");
							changesMade = true;
							updateDisplay(list.selection.text);
						}
					}
				var onHoldButton = updateOrderBtnGroup.add("button", undefined, "Hold/Unhold");
					onHoldButton.onClick = function()
					{
						var thisOrder = rushOrderData[list.selection.text];
						if(list.selection)
						{
							if(thisOrder.onHold)
							{
								thisOrder.onHold = false;
								alert("Order Number " + list.selection.text + " is no longer on hold.");
								thisOrder.holdLog.push("unhold: " + logTime());
							}
							else
							{
								thisOrder.onHold = true;
								alert("Order Number " + list.selection.text + " has been put on hold.");
								thisOrder.holdLog.push("hold: " + logTime());
							}
							updateDisplay(list.selection.text);
							changesMade = true;
						}
					}
				var orderApprovedButton = updateOrderBtnGroup.add("button", undefined, "Mockup Approved");
					orderApprovedButton.onClick = function()
					{
						var thisOrder = rushOrderData[list.selection.text];
						if(list.selection)
						{
							thisOrder.approved = true;
							thisOrder.approvedOn = logTime();
							thisOrder.inProg = false;
							thisOrder.archived = true;
							changesMade = true;
							alert("Order Number " + list.selection.text + " is approved.");
							updateDisplay(list.selection.text);

						}
					}

			btnGroup = w.add("group");
				var getNew = btnGroup.add("button", undefined, "Get New Rush Order");
					getNew.onClick = function()
					{
						w.close();
						w.layout.layout("true");
						getNewRushOrder();
					}
				var close = btnGroup.add("button", undefined, "Close");
					close.onClick = function()
					{
						w.close();
					}

		if(list.selection)
			updateDisplay(list.selection.text);

		w.show();

		/* beautify ignore:end */
	}

	function makeTxt(txt)
	{
		return 'statictext {text:"' + txt + ':",characters:15, justify:"left"}';
	}

	function populateListBox()
	{
		list = listGroup.add("listbox", [50,50,200,250],inProgOrders);
		//add the images
		for(var lb=0;lb<list.children.length;lb++)
		{
			var thisOrder = list.children[lb];
			var orderNum = thisOrder.text;
			var curDate = todaysDate.getDate();

			if(!rushOrderData[orderNum].paidRush)
			{
				thisOrder.image = lateImg;
			}
			else if(rushOrderData[orderNum].due.dueDate < curDate)
			{
				thisOrder.image = lateImg;
			}
			else if(rushOrderData[orderNum].due.dueDate == curDate)
			{
				thisOrder.image = dueImg;
			}
			else if(rushOrderData[orderNum].due.dueDate > curDate)
			{
				thisOrder.image = regImg;
			}
		}


		list.selection = list.children[0];
		list.onChange = function()
		{
			if(list.selection)
				updateDisplay(list.selection.text);
		}
	}

	function updateDisplay(sel)
	{
		var data = rushOrderData[sel];
		if(!data)
		{
			alert(sel + " seems to be missing from the database.");
			return false;
		}

		onDisp.text = data.orderNumber;
		tnDisp.text = data.teamName;
		prDisp.text = data.paidRush;
		dueDisp.text = data.due.dueDayName + " " + data.due.dueMonth + "/" + data.due.dueDate;
		ipDisp.text = data.inProg;
		apDisp.text = data.approved;
		holdDisp.text = data.onHold;
		msDisp.text = data.mockupSent;
	}


	////////In Prog////////
	//////Order Stuff//////
	///////////////////////

	/*****************************************************************************/
	/*****************************************************************************/

	///////New/////////
	////Order Stuff////
	///////////////////

	function getNewRushOrder()
	{
		orderNumber = searchForRush();

		if(orderNumber === 0)
		{
			valid = false;
			alert("No rush orders in the system.");
		}

		if(valid)
		{
			valid = showNewOrderDialog(rushOrderData[orderNumber]);
		}
	}

	function searchForRush()
	{
		var result;
		var date = new Date();
		var curDate = date.getDate();
		var priority1 = [], priority2 = [], priority3 = [], priority4 = [];

		for(var order in rushOrderData)
		{
			var curOrder = rushOrderData[order];
			if(!curOrder.archived && !curOrder.approved && !curOrder.inProg)
			{
				if(!curOrder.paidRush)
				{
					priority1.push(curOrder.orderNumber);
					break;
				}
				else if(curOrder.due.dueDate < curDate)
				{
					priority2.push(curOrder.orderNumber);
				}
				else if(curOrder.due.dueDate == curDate)
				{
					priority3.push(curOrder.orderNumber);
				}
				else if(curOrder.due.dueDate > curDate)
				{
					priority4.push(curOrder.orderNumber);
				}
			}
			if(result)
			{
				break;
			}
		}

		if(priority1.length > 0)
		{
			result = priority1[0];
		}
		else if(priority2.length > 0)
		{
			result = priority2[0];
		}
		else if(priority3.length > 0)
		{
			result = priority3[0];
		}
		else if(priority4.length > 0)
		{
			result = priority4[0];
		}
		else
		{
			result = 0;
		}

		return result;
	}

	function showNewOrderDialog(data)
	{
		var result = false;
		var w = new Window("dialog");
			var topTxt = w.add("statictext", undefined, "This is the highest priority rush.");
			var dispGroup = w.add("group");
				dispGroup.orientation = "column";
				var onDisp = dispGroup.add("statictext", undefined, "Order Number: " + data.orderNumber);
				var tnDisp = dispGroup.add("statictext", undefined, "Team Name: " + data.teamName);
				var dueDisp = dispGroup.add("statictext", undefined, "Due By: " + data.due.dueDayName + ", " + data.due.dueMonth + "/" + data.due.dueDate);

			var btnGroup = w.add("group");
				var pull = btnGroup.add("button", undefined, "I want this order");
					pull.onClick = function()
					{
						changesMade = true;
						result = true;
						var thisOrder = rushOrderData[orderNumber];
						thisOrder.mockupArtist = user;
						thisOrder.inProg = true;
						thisOrder.pullDate = logTime();
						alert("ATTN:\nYou are now responsible for the rush mockup for order: " + thisOrder.orderNumber);
						w.close();
					}
				var cancel = btnGroup.add("button", undefined, "I DO NOT want this order");
					cancel.onClick = function()
					{
						result = false;
						w.close();
					}
		w.show();

		return result;
	}

	///////New/////////
	////Order Stuff////
	///////////////////



	function writeDatabaseFile()
	{
		var parenPat = /[\(\)]/g;
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

	var todaysDate = new Date();

	var imgPath = "/Volumes/Customization/Library/Scripts/Script Resources/Images/";
	var lateImg = new File(imgPath + "rush_late.png");
	var dueImg = new File(imgPath + "rush_due.png");
	var regImg = new File(imgPath + "rush_normal.png");


	////////End/////////
	////Data Storage////
	////////////////////

	/*****************************************************************************/

	///////Begin////////
	///Function Calls///
	////////////////////

	var errorList = [];
	var changesMade = false;
	var list,orderNumber;

	//button elements
	var updateOrderBtnGroup,btnGroup;
	//order number elements
	var onGroup,onTxt,onDisp;
	//team name elements
	var tnGroup,tnTxt,tnDisp;
	//paid rush elements
	var prGroup,prRtxt,prDisp;
	//in progress elements
	var ipGroup,ipTxt,ipDisp;
	//due by elements
	var dueGroup,dueTxt,dueDisp;
	//approved elements
	var apGroup,apTxt,apDisp;
	//hold elements
	var holdGroup,holdTxt,holdDisp;
	//mockup sent elements
	var msGroup,msTxt,msDisp;

	var inProgOrders = checkForInProg();


	showInProgOrderDialog(inProgOrders);
	// if(inProgOrders.length > 0)
	// {
	// 	showInProgOrderDialog(inProgOrders);
	// }
	// else
	// {
	// 	getNewRushOrder();
	// }

	if(changesMade)
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