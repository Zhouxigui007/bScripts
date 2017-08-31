/*

Script Name: view_rush_orders
Author: William Dowling
Build Date: 11 August, 2017
Description: Display the status of all current rush orders
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

	//create the dialog
	function makeDialog()
	{
		/* beautify ignore:start */
		w = new Window("dialog", "Rush Orders");
			// w.preferredSize = [500,0];
			// w.size = [500,600];
			
			listGroup = w.add("group");
			//create the listbox to hold all of the
			//current rush orders.
			populateListBox(rushOrderData,archiveVisible)

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

				//approved
				apGroup = disp.add("group");
					apTxt = apGroup.add(makeTxt("Approved"));
					apDisp = apGroup.add(dispStr);

				//approved on
				aoGroup = disp.add("group");
					aoTxt = aoGroup.add(makeTxt("Approved On"));
					aoDisp = aoGroup.add(dispStr);

				//mockup artist
				maGroup = disp.add("group");
					maTxt = maGroup.add(makeTxt("Mockup Artist"));
					maDisp = maGroup.add(dispStr);

				//created on
				coGroup = disp.add("group");
					coTxt = coGroup.add(makeTxt("Created On"));
					coDisp = coGroup.add(dispStr);

			btnGroup = w.add("group");
				var fin = btnGroup.add("button", undefined,"Finished");
					fin.onClick = function()
					{
						w.close();
					}
				var archiveButton = btnGroup.add("button", undefined, "Archive Order");
					archiveButton.onClick = function()
					{
						if(list.selection)
						{
							var index = list.selection.index;
							if(archiveVisible)
							{
								var bool = false;
								var msg = "unarchived";
							}
							else
							{
								var bool = true;
								var msg = "archived";
							}
							rushOrderData[list.selection.text].archived = bool;
							alert("Successfully " + msg + " order: " + list.selection.text + ".");
							list.remove(list.items[index]);
							changesMade = true;
							generateArrays();
						}
						else
						{
							alert("Failed to archive the order. Please try again.");
						}
					}
				var viewArchive = btnGroup.add("button", undefined, "View Archived Orders");
					viewArchive.onClick = function()
					{
						listGroup.remove(listGroup.children[0]);
						archiveVisible = !archiveVisible;
						populateListBox(rushOrderData,archiveVisible);
						w.layout.layout(true);
						if(archiveVisible)
						{
							archiveButton.text = "Unarchive Order";
							viewArchive.text = "Hide Archived Orders";
						}
						else
						{
							archiveButton.text = "Archive Order";
							viewArchive.text = "Show Archived Orders";
						}
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

	function populateListBox(data,archive)
	{
		if(archive)
		{
			list = listGroup.add("listbox", [50,50,200,250],archivedOrders);
		}
		else
		{
			list = listGroup.add("listbox", [50,50,200,250],currentOrders);
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
				else if(data[orderNum].due.dueDate < curDate)
				{
					thisOrder.image = lateImg;
				}
				else if(data[orderNum].due.dueDate == curDate)
				{
					thisOrder.image = dueImg;
				}
				else if(data[orderNum].due.dueDate > curDate)
				{
					thisOrder.image = regImg;
				}
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
		dueDisp.text = data.due.dueDayName;
		ipDisp.text = data.inProg;
		apDisp.text = data.approved;
		aoDisp.text = data.approvedOn;
		maDisp.text = data.mockupArtist
		coDisp.text = data.createdOn;
	}

	function generateArrays()
	{
		var cur = [], arch = [];
		var orderCount = countOrders(rushOrderData);
		var curDate = 0;

		//remove all the archived orders
		for(var x in rushOrderData)
		{
			var order = rushOrderData[x];
			if(order.archived || order.approved)
			{
				arch.push(order.orderNumber);
				orderCount--;
			}
			else if(!order.paidRush)
			{
				cur.push(order.orderNumber);
				orderCount--;
			}
		}

		//populate the cur array in order by
		//due day
		while(orderCount > 0)
		{
			for(var x in rushOrderData)
			{
				var order = rushOrderData[x];
				if(!order.archived && !order.approved && order.paidRush && order.due.dueDate == curDate)
				{
					cur.push(order.orderNumber);
					orderCount--;
				}
			}
			curDate++;
		}
		currentOrders = cur;
		archivedOrders = arch;
	}

	function countOrders(data)
	{
		var result = 0;
		for(var x in data)
		{
			if(data.hasOwnProperty(x))
			{
				result++;
			}
		}
		return result;
	}

	function overwriteDatabase()
	{
		var parenPat = /[\(\)]/g;

		dataFile.open("w");
		dataFile.write("var rushOrderData = " + JSON.stringify(rushOrderData).replace(parenPat,""));
		dataFile.close();

		alert("Successfully updated database.");
	}

	////////End//////////
	///Logic Container///
	/////////////////////

	/*****************************************************************************/

	///////Begin////////
	////Data Storage////
	////////////////////

	var dataPath = "~/Desktop/automation/rush_orders/data.js"
	var dataFile = new File(dataPath);
	eval("#include \"" + dataPath + "\"");


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

	var valid = true;
	var changesMade = false;
	var archiveVisible = false;

	//order arrays
	var currentOrders;
	var archivedOrders;

	//global dialog variables
	var w;
	var listGroup,list,disp;
	var btnGroup;

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
	//approved on elements
	var aoGroup,aoTxt,aoDisp;
	//created on elements
	var coGroup,coTxt,coDisp;

	generateArrays();

	makeDialog();

	if(changesMade)
	{
		overwriteDatabase();
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