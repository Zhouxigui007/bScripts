function align(){
    var myDoc = app.activeDocument;
    var aB = myDoc.artboards;
    var layers = myDoc.layers;

    for(var a=0;a<aB.length;a++){
        aB.setActiveArtboardIndex(a);
        myDoc.selectObjectsOnActiveArtboard();

        var reference; // this is the object we wan to align to.. AKA Key object
        var obj; // this is the object we want to align.
        var items = myDoc.selection;

        var topLayer = layers[0];
        var botLayer = layers[1];


        if(topLayer =! null || botLayer =! null){
            for(var b=0;b<2;b++){
                if(items[b].layer == botLayer){
                    reference = items[b];
                }
                else if(items[b].laer = topLayer){
                    obj = items[b];
                }
            }

            //recursive function digs into groupItems until
            //it finds the first clipping path, then returns
            //the clipping path that serves as the bounds visible to us.
            function findClip(thisGroup){
                var item;
                for(var b=0;b<thisGroup.pageItems.length;b++){
                    item = thisGroup.pageItems[b];
                    if(item.clipping){
                        return item;
                    }
                }
                if(thisGroup.groupItems.length>0){
                    for(var b=0;b<thisGroup.groupItems.length;b++){
                        var inGroup = thisGroup.groupItems[b];
                        return findClip(inGroup);
                    }
                }
            }

            //the next 2 lines find the top-most clipping path.
            //for all intents and purposes, this is the "visible bounds"
            //as they should be. this object will be used for final positioning.
            var refClip = findClip(reference);
            var objClip = findClip(obj);

            //determines the extraneous, invisible, extra art
            //on the left side and top of the objects so that
            //that measurement can be ignored during placement
            var objExtraLeft = objClip.left - obj.left;
            var objExtraTop = obj.top - objClip.top;
            var refExtraLeft = refClip.left - reference.left;
            var refExtraTop = reference.top - refClip.top;

            //determine top and left coordinates for object
            //to be aligned.
            var left = reference.left + (refExtraLeft-objExtraLeft);
            var top = reference.top - (refExtraTop - objExtraTop);

            //move object to be aligned into position
            obj.left = left;
            obj.top = top;


        }
        else{
            alert("You're missing a layer!");
        }
    }
}
align();