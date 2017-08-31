function logLayerStructure(wearerLayers)
{
	log.bp("Beginning inspection of script template sublayers::Checking for locked and visible states.::Checking down to the group level to see whether everything is properly locked/unlocked");

	if(wearerLayers.length===0)
	{
		log.l("wearerLayers.length = 0")
		log.l("aborting")
		return true;
	}
	else
	{
		for(var x=0;x<wearerLayers.length;x++)
		{
			var thisWearer = wearerLayers[x];
			log.l("thisWearer.name = " + thisWearer.name);
			log.l("thisWearer.locked = " + thisWearer.locked);
			log.l("thisWearer.visible = " + thisWearer.visible);
			log.l("Setting prepress layer visible=true");
			thisWearer.layers["Prepress"].visible = true;
			log.l(thisWearer.name + " prepress layer.visible = " + thisWearer.layers["Prepress"].visible)
			
			log.l("Looping prepress layers.");
			for(var b=0;b<thisWearer.layers["Prepress"].layers.length;b++)
			{
				var thisSizeLayer= thisWearer.layers["Prepress"].layers[b];
				var curSize = thisSizeLayer.name;
				log.l("curSize: " + curSize);
				log.l("curSize.locked = " + thisSizeLayer.locked);
				log.l("curSize.visible = " + thisSizeLayer.visible);
				for(var c=0;c<thisSizeLayer.groupItems.length;c++)
				{
					var thisGroup = thisSizeLayer.groupItems[c];
					thisGroup.visible = true;
					log.l(curSize + ": groupItems[c] =" + thisGroup.name);
					log.l(curSize + ": groupItems[c].locked =" + thisGroup.locked);
					log.l(curSize + ": groupItems[c].visible =" + thisGroup.visible);

				}
				log.l("**end of " + curSize + " group loop**");
				log.l(" ::************::*************");
			}
			log.l("****end of " + thisWearer.name + " layer loop");
			log.l(" ::************::*************")
		}
		log.l("********end of " + wearerLayers + " layer loop");
		log.l(" ::************::*************")
	}
}