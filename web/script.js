var data = [];
var page = -1;
var savedDropdownValues = [null, null, null];

function btnClickHandler(btn) {
	if (btn == page) {
		return;
	}
	page = btn;
	
	btns = document.getElementsByTagName("button");
	for (i in btns) {
		if (i == page) {
			btns[i].className = "selectedButton";
		}
		else {
			btns[i].className = "";
		}
	}
	
	var dropdownOptions = "";
	for (key in data[page]) {
		dropdownOptions += "<option value=\"" + key + "\">" + key + "</option>";
	}
	document.getElementById("dropdown").innerHTML = dropdownOptions;
	if (savedDropdownValues[page] != null) {
		document.getElementById("dropdown").value = savedDropdownValues[page];
	}
	
	dropdownChangeHandler();
}

function dropdownChangeHandler() {
	var dropdownValue = document.getElementById("dropdown").value;
	savedDropdownValues[page] = dropdownValue;
	
	document.getElementById("visualizations").innerHTML = "";
	switch (page) {
		case 0:
			addVisualizationPotekSeje(data[page][dropdownValue][0]);
			addVisualizationPogosteBesede(data[page][dropdownValue][1]);
			break;
		case 1:
			addVisualizationPoslanci(data[page][dropdownValue][0]);
			addVisualizationPogosteBesede(data[page][dropdownValue][1]);
			break;
		case 2:
			addVisualizationStranka(data[page][dropdownValue][0]);
			addVisualizationAktivnost(data[page][dropdownValue][1]);
			addVisualizationPogosteBesede(data[page][dropdownValue][2]);
			break;
	}
}

function jumpTo(pageId, dropdownValue) {
	btnClickHandler(pageId);
	document.getElementById("dropdown").value = dropdownValue;
	dropdownChangeHandler();
}

function addVisualizationPotekSeje(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2>Potek seje</h2>";
	newVisualization += "12.02.1992 12:05<br>";
	newVisualization += "<svg width=\"600\" height=\"400\" style=\"fill: " + getComputedStyle(document.body).getPropertyValue('--c1') + ";\">"
	newVisualization += "<rect x=\"295\" y=\"0\" width=\"10\" height=\"400\" style=\"fill: " + getComputedStyle(document.body).getPropertyValue('--c1') + ";\">"
	newVisualization += "</svg><br>";
	newVisualization += "12.02.1992 12:20";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationPogosteBesede(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2>Pogoste besede</h2>";
	newVisualization += "<svg width=\"300\" height=\"195\" style=\"fill: " + getComputedStyle(document.body).getPropertyValue('--c1') + ";\">"
	for (i in visData) {
		newVisualization += "<text x=\"145\" y=\"" + (11 + (20 * i)) + "\" text-anchor=\"end\">" + visData[i][0] + "</text>";
		newVisualization += "<rect x=\"155\" y=\"" + (4 + (20 * i)) + "\" width=\"" + (100 * visData[i][1] / visData[0][1]) + "\" height=\"6\"/>";
	}
	newVisualization += "</svg>";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationPoslanci(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2 style=\"margin-bottom: 20px;\">Poslanci</h2>";
	for (i in visData) {
		newVisualization += "<a onclick=\"jumpTo(2, '" + visData[i] + "')\" style=\"cursor: pointer; line-height: 25px;\">" + visData[i] + "</a><br>";
	}
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationStranka(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2 style=\"margin-bottom: 20px;\">Stranka</h2>";
	newVisualization += "<a onclick=\"jumpTo(1, '" + visData + "')\" style=\"cursor: pointer; line-height: 25px;\">" + visData + "</a><br>";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationAktivnost(visData) {
	var c1 = getComputedStyle(document.body).getPropertyValue('--c1');
	var c2 = getComputedStyle(document.body).getPropertyValue('--c2');
	
	var xMin = 60;
	var xMax = 440;
	var yMin = 250;
	var yMax = 10;
	
	var avgs = [788, 966, 2589, 0, 714, 1425, 1808, 2755, 2441, 389, 3856, 1347, 2481, 1893, 1654, 1103, 2425, 2601, 1206, 2410, 1600, 637, 2771, 1054, 1172, 1566, 2324, 0, 1522, 1725, 1217];
	var max = 0;
	for (var i = 0; i < avgs.length; i++) {
		if (visData[i] > max) {
			max = visData[i];
		}
		if (avgs[i] > max) {
			max = avgs[i];
		}
	}
	
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2>Aktivnost po mesecih</h2>";
	newVisualization += "<svg width=\"500\" height=\"300\" style=\"fill: " + c1 + ";\">";
	// avgs polygon
	newVisualization += "<polygon points=\"" + xMin + "," + yMin + " ";
	for (var i = 0; i < avgs.length; i++) {
		var x = xMin + (i / (avgs.length - 1) * (xMax - xMin));
		var y = yMin + (avgs[i] / max * (yMax - yMin));
		newVisualization += x + "," + y + " ";
	}
	newVisualization += xMax + "," + yMin + "\" style=\"fill: rgba(0,0,0,0.07); stroke: none;\"/>";
	// axis
	newVisualization += "<polygon points=\"";
	newVisualization += xMin + "," + yMax + " ";
	newVisualization += xMin + "," + yMin + " ";
	newVisualization += xMax + "," + yMin + " ";
	newVisualization += xMax + "," + yMax + " ";
	newVisualization += "\" style=\"fill: none; stroke: " + c1 + "; stroke-width: 2;\"/>";
	// visData polyline
	newVisualization += "<polyline points=\"";
	for (var i = 0; i < avgs.length; i++) {
		var x = xMin + (i / (avgs.length - 1) * (xMax - xMin));
		var y = yMin + (visData[i] / max * (yMax - yMin));
		newVisualization += x + "," + y + " ";
	}
	newVisualization += "\" style=\"fill: none; stroke: " + c2 + "; stroke-width: 2;\"/>";
	// visData dots
	for (var i = 0; i < avgs.length; i++) {
		var x = xMin + (i / (avgs.length - 1) * (xMax - xMin));
		var y = yMin + (visData[i] / max * (yMax - yMin));
		newVisualization += "<circle cx=\"" + x + "\" cy=\"" + y + "\" r=\"4\" style=\"fill: " + c2 + ";\"/>";
	}
	// text x
	newVisualization += "<text x=\"" + xMin + "\" y=\"" + (yMin + 21) + "\" text-anchor=\"start\">maj</text>";
	newVisualization += "<text x=\"" + (xMin - 1) + "\" y=\"" + (yMin + 40) + "\" text-anchor=\"start\">1990</text>";
	newVisualization += "<text x=\"" + xMax + "\" y=\"" + (yMin + 21) + "\" text-anchor=\"end\">november</text>";
	newVisualization += "<text x=\"" + xMax + "\" y=\"" + (yMin + 40) + "\" text-anchor=\"end\">1992</text>";
	// text y
	newVisualization += "<text x=\"" + (xMin - 15) + "\" y=\"" + (yMax + 11) + "\" text-anchor=\"end\">" + max + "</text>";
	newVisualization += "<text x=\"" + (xMin - 15) + "\" y=\"" + (yMin - 1) + "\" text-anchor=\"end\">0</text>";
	
	newVisualization += "</svg>";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}
