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
	
	var dropdown = document.getElementById("dropdown");
	
	dropdown.innerHTML = "";
	for (key in data[page]) {
		dropdown.innerHTML += "<option value=\"" + key + "\">" + key + "</option>";
	}
	
	if (savedDropdownValues[page] != null) {
		dropdown.value = savedDropdownValues[page];
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
		newVisualization += "<a onclick=\"jumpTo(2, '" + visData[i] + "')\" style=\"cursor: pointer;\">" + visData[i] + "</a><br>";
	}
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationStranka(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2 style=\"margin-bottom: 20px;\">Stranka</h2>";
	newVisualization += "<a onclick=\"jumpTo(1, '" + visData + "')\" style=\"cursor: pointer;\">" + visData + "</a><br>";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}

function addVisualizationAktivnost(visData) {
	var newVisualization = "";
	newVisualization += "<div class=\"visualization\">";
	newVisualization += "<h2>Aktivnost</h2>";
	newVisualization += "TODO";
	newVisualization += "</div>";
	document.getElementById("visualizations").innerHTML += newVisualization;
}
