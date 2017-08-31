//Get_Collars Rebuild
//Lets try to make some sense this time, eh?

function container()
{
	
	///////Begin/////////
	///Logic Container///
	/////////////////////

	function isTemplate(layers)
	{
		var templateList = [];
		var result;
		var error;

		for(var a=0;a<layers.length;a++)
		{
			if(layers[a].name.indexOf("FD") > -1)
				templateList.push(layers[a]);
		}

		if(templateList.length == 0)
		{
			error = "Not a scriptable template.";
			result = null;
		}
		else if(templateList.length == 1)
		{
			error = "No Errors";
			result = templateList[0]
		}
		else
		{
			error = "No Errors";
			result = templateList;
		}

		return {"result":result,"error":error};
	}

	function validateTemplate(template)
	{

	}




	////////End//////////
	///Logic Container///
	/////////////////////


	///////Begin////////
	///Function Calls///
	////////////////////

	//Script Global Variable Definitions

	var docRef = app.activeDocument;
	var layers = docRef.layers;
	var errors;

	//get template layer or list of template layers
	//return format is array [layer(s),error string]
	var template = isTemplate(layers);
	errors = template["error"];
	var validate = validateTemplate(template);


	////////End/////////
	///Function Calls///
	////////////////////


}
container();