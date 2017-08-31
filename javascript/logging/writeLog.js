//generateLogEntry Function Description
//
function log(priority,msg)
{
	var result = "";

	//headline priority level
	if(priority == "h")
	{
		result += "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
		result += "!!!!" + msg + "\n";
		result += "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n";
	}

	//error priority level
	else if(priority == "e")
	{
		result += "error occurred at : " + curTime
		result += "**ERROR**ERROR**ERROR**ERROR**\n";
		result += msg;
		result += "**ERROR**ERROR**ERROR**ERROR**\n\n";
	}

	//log priority level
	else if(priority == "l")
	{
		result += curTime + ": log:" + msg;
	}
	


	scriptLog += result;
}



/*
Arguments
potential priorities:
	error
	standard output
	optional parameters:
		item/object
		state (locked, visible etc)



global variables needed:
	curTime
	scriptLog