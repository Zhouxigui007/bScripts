function blah(){

var test = {"designName":"","topOptions":{"material":"MM","selectedDesign":"1026","style":"SS","nsId":"","buttonColor":"","colorBlocks":{"PARAMCOLOR_X5F_C1":{"name":"C1","baseColor":"B","gradientStyle":"none","gradientColor":"W","gradientTop":false,"pattern":{"style":"","P1":"","opacity":1}},
"PARAMCOLOR_X5F_C2":{"name":"C2","baseColor":"DG","gradientStyle":"top_to_bottom","gradientColor":"DG","gradientTop":false,"pattern":{"style":"Argyle","P1":"B","opacity":0.83,"scale":0.5,"offsetX":451,"offsetY":478}},
"PARAMCOLOR_X5F_C3":{"name":"C3","baseColor":"W","gradientStyle":"","gradientColor":"","gradientTop":false,"pattern":{"style":"none","P1":"W","opacity":0.63,"scale":1,"offsetX":0,"offsetY":0}},
"PARAMCOLOR_X5F_COLLAR":{"name":"COLLAR","baseColor":"B","gradientStyle":"","gradientColor":"","gradientTop":false,"pattern":{"style":"","P1":"","opacity":1}}},
"selectedDesignNsId":"83"},
"topDecorations":{"logo":"FDS-PROVIDED","teamNames":["MOLLOY'S"],"teamNamesEntered":true,"logoColors":{"paramcolor_x5F_g1":{"colorCode":"W","colorValue":"FFFFFF","defaultColor":"GD","colorName":"White"},
"paramcolor_x5F_g2":{"colorCode":"DG","colorValue":"154031","defaultColor":"KG","colorName":"Dark Green"},"paramcolor_x5F_g3":{"colorCode":"B","colorValue":"222123","defaultColor":"B","colorName":"Black"}},"nsId":"116598"},"playerNames":{"style":"FDSP-1019","colors":
{"paramcolor_x5F_g1":{"colorCode":"W","defaultColor":"GD","colorName":"White"},"paramcolor_x5F_g2":{"colorCode":"DG","defaultColor":"PU","colorName":"Dark Green"}},"nsId":"106440"},"numberOptions":{"style":"FDSN-1040","frontLeft":false,"frontRight":true,"frontCenter":false,"back":true,"leftSleeve":true,"rightSleeve":true,"leftLeg":false,"rightLeg":false,"colors":{"paramcolor_x5F_g1":{"colorCode":"W","defaultColor":"DG","colorName":"White"},"paramcolor_x5F_g2":{"colorCode":"DG","defaultColor":"W","colorName":"Dark Green"},"paramcolor_x5F_g3":{"colorCode":"W","defaultColor":"OY","colorName":"White"}},"nsId":"158316"},"designId":"aHZkpyn4arIQ","sport":"","estimateNo":"245235",
"roster":[{"name":"Fink","number":"19","jerseySize":"XL","qty":"1","topId":"78531"},{"name":"Fink","number":"31","jerseySize":"L","qty":"1","topId":"78530"},{"name":"Nalley","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Rogers","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Halleran","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Hinton","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Fridell","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Hagan","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Pat","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Adam","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Garner","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Thompson","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Fischer","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Bisson","number":"","jerseySize":"S","qty":"1","topId":"78528"},{"name":"Fales","number":"","jerseySize":"S","qty":"1","topId":"78528"}],"params":{"userId":"170554","userEmail":"kevinjosephfink@gmail.com","saveEstimate":true,"product":"FD-SLOW","friendEmail":"tomfink31@gmail.com","comment":"","contactMe":false,"addToCart":false,"userName":" ","userPhone":""},"hasFluorecent":false}


var ros = test["roster"];

var players = [];
for(var a=0;a<ros.length;a++){
	var thisPlayer = {};
	thisPlayer.size = ros[a].jerseySize;
	thisPlayer.name = ros[a].name;
	thisPlayer.number = ros[a].number;
	players.push(thisPlayer);
}

for(var a=0;a<players.length;a++){
	$.writeln("Player: " + a);
	$.writeln(players[a].size);
	$.writeln(players[a].name);
	$.writeln(players[a].number);
	$.writeln('\n');
}

}

blah();