﻿#target illustratorfunction ArtboardSwatches(){    // Spot colors or ink plates only!        function checkArtboardInks(index){        // Function 1:  gets the list of names from spot inks on an artboards.  Names will be used later to write the swatches.        //  Will set the active index and a selection.        doc.selection = null;        doc.artboards.setActiveArtboardIndex(index);        doc.selectObjectsOnActiveArtboard();        var newDoc = app.documents.add();        doc.activate();        for(var i=0; i<doc.selection.length; i++){            var thisSelectedObj = doc.selection[i];            thisSelectedObj.duplicate(newDoc.layers[0], ElementPlacement.PLACEATEND);        }        newDoc.activate();        newDoc.artboards[0].artboardRect = newDoc.visibleBounds;//~         redraw();        var inkList = newDoc.inkList;        var arr = [];        for(var i=0; i<inkList.length; i++){            var thisInk = inkList[i];            if(thisInk.inkInfo.printingStatus == InkPrintStatus.ENABLEINK && thisInk.name != "Process Cyan"&& //            thisInk.name != "Process Magenta" && thisInk.name != "Process Yellow" && thisInk.name != "Process Black" && //            thisInk.name != "[Registration]" && thisInk.name != "[None]" && thisInk.name.toLowerCase() != "cut line" && //            thisInk.name.toLowerCase() != "edge") {                arr.push(thisInk.name);            }        }        newDoc.close(SaveOptions.DONOTSAVECHANGES);        return (arr);    }    function writeSwatchesAtBottomOfArtboard(swatchList, artboardIndex){        //Function 2: writes the actual info, in this case rectangles.        var arb = doc.artboards[artboardIndex];        var arbRct = arb.artboardRect;        var x = arbRct[0] - 95;  // I pulled this out of my ear.        var y = arbRct[3] + 60;                        if(swatchList.length > 0){            var newGrp = doc.layers[0].groupItems.add();            newGrp.name = "Swatches for Artboard "+(artboardIndex+1);            for(var j=0; j<swatchList.length; j++){                var thisSwatchName = swatchList[j];                var colorBox = newGrp.pathItems.rectangle(y, x+=100, 100, 20);                var textBox = newGrp.pathItems.rectangle(y-6, x+5, 90,15);                  var textRefBox = newGrp.textFrames.areaText(textBox);                var lightColorText = swatches.getByName("Black B").color;                var darkColorText = swatches.getByName("White B").color;                textRefBox.contents = thisSwatchName;                if(thisSwatchName == "Black B" || thisSwatchName == "Dark Green B" || //                thisSwatchName == "Maroon B" || thisSwatchName == "Cardinal B" || //                thisSwatchName == "Navy B" || thisSwatchName == "Royal Blue B" || //                thisSwatchName == "Brown B" || thisSwatchName == "Dark Charcoal B" || //                thisSwatchName == "Purple B" || thisSwatchName == "Kelly Green B") {                    textRefBox.textRange.fillColor = darkColorText;                    }                else {                    textRefBox.textRange.fillColor = lightColorText;                    }                colorBox.stroked = false;                colorBox.filled = true;                colorBox.fillColor = doc.swatches.getByName(thisSwatchName).color; //Fill the swatch square with the color.                if(thisSwatchName == "White B"){                    colorBox.stroked = true;                    colorBox.strokeColor = doc.swatches.getByName("Black B").color;                    }            }        }    }        function existLabelColors(){        for (c=0; c<swatches.length; c++){            $.writeln(swatches[c].name);            if (swatches[c].name == "White B"){                existWhite = true;                $.writeln("white b swatch true");                }//~             else {//~                 existWhite = false;//~                 $.writeln("white b swatch false");//~                 }            if (swatches[c].name == "Black B"){                existBlack = true;                $.writeln("black b swatch true");                }//~             else {//~                 existBlack = false;//~                 }            }// end for loop C        } // end function existLabelColors();//============================================================= Main Script starts here    if(app.documents.length > 0){        var doc = app.activeDocument;        var swatches = doc.swatches;        var existWhite = false;        var existBlack = false;        existLabelColors();        if(existWhite == false){            var whiteLabel = doc.spots.add();            whiteLabelColor = new CMYKColor();            whiteLabelColor.cyan = 0;            whiteLabelColor.magenta = 0;            whiteLabelColor.yellow = 0;            whiteLabelColor.black = 0;            whiteLabel.name = "White B";            whiteLabel.color = whiteLabelColor;            whiteLabel.colorType = ColorModel.SPOT;            whiteLabel.tint = 100;            } // end create white label swatch                if(existBlack == false){            var blackLabel = doc.spots.add();                blackLabelColor = new CMYKColor();                blackLabelColor.cyan = 72;                blackLabelColor.magenta = 67;                blackLabelColor.yellow = 63;                blackLabelColor.black = 72;                blackLabel.name = "Black B";                blackLabel.color = blackLabelColor;                blackLabel.colorType = ColorModel.SPOT;                blackLabel.tint = 100;                } // end create black label swatch        for(var a=0; a<doc.artboards.length; a++){  // this goes through all artboards and writes the swatches.            var thisList = (checkArtboardInks(a));            writeSwatchesAtBottomOfArtboard(thisList, a);        }            doc.selection = null; // clear selection one final time.    } else {        alert("No document is open!");    }}ArtboardSwatches();