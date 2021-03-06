(function() {
	
	// =========
	// Variables
	// =========

	// Svg
	var svgNS 			   = "http://www.w3.org/2000/svg",
		svg 			   = document.querySelector("#svg"),
		
		randomX 		   = 0,
		randomY 		   = 0,
		randomR 		   = 0,
		randomDelay 	   = 0,
	// Window
		ViewportX 		   = window.innerWidth,
		ViewportY 		   = window.innerHeight,
	// Document
		listItems 		   = Array.from(document.querySelectorAll(".list-item")),
	// Paths
		pathArr 		   = [
			{
				id: 0,
				path: createPathStr([74, 34.4, "L", 65.1, 26.8, "L", 68.1, 18.69, "L", 74.8, 24.9, "Z", "M", 74, 34.4, "L", 76.49, 43.2, "L", 78.4, 51.9, "L", 83.35, 55.2]),
				description: "In fact this stars' sequence is an asterism within Ursa Major. that is now the third largest of the 88 modern constellations. Also The Big Dipper is used as a symbol of north as well as flag of Alaska.",
			},
			{
				id: 1,
				path: createPathStr([71.61, 83.66, "L", 74.47, 75.95, "L", 77.34, 78.68, "L", 73.95, 87.43, "Z", "M", 71.61, 83.6, "L", 66.66, 89.07, "L", 61.45, 89.07, "L", 56.77, 86.88]),
				description: "The Ursa Minor has been one of the most important constellation. for navigation as it contains the Polaris being as North Star",
			},
			{
				id: 2,
				path: createPathStr([62.5, 12.56, "L", 46.875, 21.3, "L", 36.45, 27.86, "L", 28.125, 39.89, "M", 46.875, 21.30, "L", 47.65, 30, "L", 49.2, 36]),
				description: "This constellation was named in honor of. Cassiopeia's daughter — Andromeda, in the Greek myth.",
			},
			{
				id: 3,
				path: createPathStr([19.27, 56.3, "L", 21.875, 50.8, "L", 20.3125, 46.45, "L", 16.66, 45.9, "L", 14, 45.4, "L", 13.28, 51.91 ,"L", 12.76, 61.75, "L", 9.65, 74.68, "L", 8.59, 77.6, "L", 6.8, 78.69, "M", 6.8, 78.69, "L", 4.7, 89.57, "M", 6.8, 78.69, "L", 3.39, 88.8, "M", 6.8, 78.69, "L", 2.3, 83.6, "M", 6.8, 78.69, "L", 2.35, 83.6, "M", 6.8, 78.69, "L", 2.3, 75.96, "M", 6.8, 78.69, "L", 2.1, 71.58]),
				description: "Scorpio is one of the brightest constellations in the sky",
			},
			{
				id: 4,
				path: createPathStr([73.96, 45.36, "L", 77.6, 36.6, "L", 72.9, 33.3, "L", 72.1, 39.3, "Z", "M", 73.96, 45.36, "L", 73.96, 67.2, "L", 73.4, 78.1, "L", 68.75, 77, "L", 67.2, 68.3, "L", 66.4, 54.1, "L", 64.3, 44.8, "L", 62, 36.6, "L", 57.3, 36.1, "L", 45.3, 50.8, "L", 44, 54.1, "L", 40.1, 70.5, "L", 40.1, 86.3, "L", 45.3, 92.9]),
				description: "One of the Drago's star called Kepler-10 has. Kepler-10b — smallest and closest to Earth exoplanet",
			},
			{
				id: 5,
				path: createPathStr([58.3, 7.1, "L", 60.2, 16.4, "L", 60.7, 20.21, "L", 60.2, 25.1, "L", 59.6, 26.8, "L", 57.3, 30, "L", 55.5, 31.7, "L", 42.7, 26.8, "L", 38.5, 29, "M", 57.3, 30, "L", 58.9, 35, "M", 58.9, 35, "L", 66.1, 33.3 , "L", 65.6, 29.5, "L", 66.4, 26.2, "L", 69.5, 20.2, "L", 70.6, 19.1, "L", 72.6, 18, "M", 58.9, 35, "L", 57.8, 41, "L", 59.1, 50.8, "L", 64.6, 59.6, "M", 59.1, 50.8, "L", 53.6, 55.2, "L", 52.6, 65, "M", 53.6, 55.2, "L", 47.9, 53.5, "L", 44.8, 57.4]),
				description: "Sagittarius is one of the constellations of the zodiac. The center of the Milky Way lies in the westernmost part of Sagittarius",
			}
		];
	// Keywords color --> #084819	
	// =============
	// Sub Functions
	// =============

	// Func 0
	function createPathStr(pArr) {
		var path 	 	  = 'M',
			// The index here to iterate at numbers and to omit letters --> 74[1] - 34.4[2] - L[omit] - 65.1[3]
			index 		  = 1;
		
			pArr.forEach(function(p) {
				if(typeof p === "number") {
					if(index % 2 == 0) {
						// Find percentage of coord according to viewport --> 74% of 1920px = ~500px and 
						// 1. 74 / 100 = 0.74
						// 2. 0.74 * 1920 = ~1420
						// 3. 1920 - 1420 = 500
						path += " " + (ViewportY - ((p / 100) * ViewportY)).toFixed(0);
						index++;
					} else {
						path += " " + (ViewportX - ((p / 100) * ViewportX)).toFixed(0);
						index++;
				}
			} else {
				path += " " + p; 
			}
		});

		// console.log(path)
		return path;
	}

	// Func 1
	function setCoords(c, rX, rY, fill, isRandom) {
		
		c.setAttribute("cx", rX);
		c.setAttribute("cy", rY);
		c.setAttribute("fill", fill);

		// If isRandom is an integer, set specific radius, otherwise set a random number
		c.setAttribute("r", 2) ? Nubmer.isInteger(ifRandom) : c.setAttribute("r", isRandom);

		svg.appendChild(c);

		return;
	}

	// Func 2
	function setProps(el, classArr, attrArr) {
		if(el !== undefined) {

			if(classArr !== undefined && classArr.length && Array.isArray(classArr) ) {
				
				classArr.forEach(function(clas) {
					el.classList.add(clas);
				});
			}

			if (attrArr !== undefined && attrArr.length && Array.isArray(attrArr)) {
				attrArr.forEach(function(attr) {
					el.setAttribute(attr.style, attr.val);
				}); 
			}

		}	
		return;
	}

	// Func 3
	function setGroupCoords(group, rX, rY) {

		var txy = "translate(" + rX + "," + rY + ")"
		group.setAttribute("transform", txy);
		svg.appendChild(group);

		return;
	}

	// Func 4
	function setPath(pathStr) {
		let	pathEl 		   = document.createElementNS(svgNS, "path");

		setProps(pathEl, [], [ {style: "id", val: "constellation"}, {style: "fill", val: "none"}, {style: "stroke", val: "#fff"}, {style: "style", val: "opacity: .5;"}, {style: "stroke-width", val: 2}, {style: "d", val: pathStr},])

		var total_length = pathEl.getTotalLength();
		pathEl.setAttribute("stroke-dasharray", total_length);
		pathEl.setAttribute("stroke-dashoffset", total_length);
		
		svg.appendChild(pathEl);
	}


	// Func 5
	function setDesc(pathDesc) {
		var descEl 		   = document.createElementNS(svgNS, "text"),
			i 		 	   = 0,
			indentX  	   = 0,
			paragraphs	   = pathDesc.split("."),
			txtNode 	   = {},
			tspam 		   = {},
			x 			   = (ViewportX - ((67.54 / 100) * ViewportX	)).toFixed(0),
			y 			   = (ViewportY - ((67.3 / 100) * ViewportY)).toFixed(0),
			txy 		   = "translate(" + x + "," + y + ")",
			verticalIndent = 20;

			for(i, textNode = paragraphs.length; i < textNode; i++) {
				if(paragraphs[i].length) {
					tspan = document.createElementNS(svgNS, "tspan");
					indentX = i < 1 ? 0 : - 10;

					txtNode = document.createTextNode(paragraphs[i]);
					tspan.appendChild(txtNode);

					setProps(tspan, [], [{style: "y", val: verticalIndent}, {style: "x", val: indentX}]);	
					descEl.appendChild(tspan);							
					verticalIndent += 25; 
				}
			}	
			svg.appendChild(descEl);

			descEl.classList.add("desc");
			descEl.setAttribute("transform", txy);
	}

	// ==============
	// Main Functions
	// ==============
		
	// Func 0
	function drawStars() {
		var allCoords 	   = [],
		n 				   = (ViewportX >= 1000 && ViewportY >= 600) ? 40 : 20,
		n1				   = (ViewportX >= 1000 && ViewportY >= 600) ? 400 : 200;

		// Stars Loop
		for (var i = 0, stars = 300; i < stars; i++) {
			var circle 	   = document.createElementNS(svgNS, "circle");

			randomX 	   = +(Math.random() * (ViewportX - 0) + 0).toFixed(2);
			randomY 	   = +(Math.random() * (ViewportY - 0) + 0).toFixed(2);
			randomR 	   = +(Math.random() * 2.5).toFixed(2);

			setCoords(circle, randomX, randomY, "#fff", randomR);
			
			allCoords.push(circle);
			
		}
		

		// Animated Stars Loop
		for(var i = 0, animStars = n1; i < animStars; i++) {
			var circle 	   = document.createElementNS(svgNS, "circle");

			randomX 	   = +(Math.random() * (ViewportX - 0) + 0).toFixed(2);
			randomY 	   = +(Math.random() * (ViewportY - 0) + 0).toFixed(2);
			randomDelay    = +(Math.random() * (-4 - 2.5)  + -4).toFixed(2);

			circle.classList.add("animate");
			circle.style.animationDelay = randomDelay + "s";

			setCoords(circle, randomX, randomY, "#fff", 2);

			// Causing additional 2-3s of JS execution	
			// allCoords.push(circle);
		}

		// For each circle get its coords
		allCoords.forEach(function(el) {
			var elX 	   = +el.attributes["cx"].value, arrElX = 0,
				elY 	   = +el.attributes["cy"].value, arrElY = 0,
				pathStr    = "",
				i 		   = 0, 
				path,
				arr;
		
			for(i, arr = allCoords; i < arr.length; i++) {
				arrElX 	   = arr[i].attributes["cx"].value;
				arrElY 	   = arr[i].attributes["cy"].value;

				// Check for each circle whether other circles' coordinates enter to the its 40x40 range // If so, create a path with M (circle's coordinates) as well as L (other's coordinates)
				// and then put the path to "d" attribute   
				if( (elY - arrElY <= n && elY - arrElY >= -n) && (elX - arrElX <= n && elX - arrElX >= -n) ) {
					
					path = document.createElementNS(svgNS, "path");

					pathStr = "M" + " " + elX + " " + elY + " L" + " " + arrElX + " " + arrElY; 
					
					setProps(path, [], [{style: "fill", val: "none"}, {style: "stroke", val: "#fff"}, {style: "style", val: "opacity: .05;"}, {style: "stroke-width", val: 1}, {style: "d", val: pathStr}])
					
					svg.appendChild(path);
				}

			}
		});

		return;
			
	}

	// Func 1
	function drawPath() {
		var element 	   = this,
			id 			   = +element.id,
			stars 		   = 10,
			// Return the obj according to the ID
			currentPathObj = pathArr.find(function(obj) {return obj.id === id}),
			pathStr		   = currentPathObj.path,
			pathDesc 	   = currentPathObj.description,
			descPos 	   = currentPathObj.descPosition,
			pathRegex      = /\w\s\d+\s\d+/gi,
			filterM 	   = /M\s\d+\s\d+/g,	
			cleanCoords    = /[MLZ]\s/gi,
			xRegex 		   = /\d+/,
			yRegex 		   = /\d+$/,
			newCoords 	   = [],
			X  			   = 0,
			Y  			   = 0,
			c = svg.querySelectorAll(".animate");

			// Create path element --> 137 line
			setPath(pathStr);

			// eventListener on "animationend" wasn't used because of its delay
			for (var i = 0, circle = c.length / 1.4; i < circle; i++) {c[i].classList.add("paused")}
			var onAnimation    = svg.querySelector("#constellation");
			setTimeout(function(){for (var i = 0, circle = c.length; i < circle; i++) {c[i].classList.remove("paused")}}, 3000);

			// Drop a path by x and y coords --> "M 109 542 L 100 435 M 0 345..." to ["M 109 542", "L 100 435", "M 0 345"]
			coordsArr      = pathStr.match(pathRegex);
			coordsArr[0]   = coordsArr[0].replace(/M\s/gi, '');
			// Return coords without M comamnd to avoid several points in the same place
			coordsArr 	   = coordsArr.filter(function(coord) {return !coord.match(filterM)});
			// Return coords without commands --> e.g "M 131.20 500.11" to "131.20 500.11"
			coordsArr	   = coordsArr.forEach(function(coord) {newCoords.push(coord.replace(cleanCoords, ''))});

			// Create constellation's description --> 150 line
			setDesc(pathDesc);
		// Create (n) amount of a constellation's star 
		for (var i = 0, coords = newCoords.length; i < coords; i++) {

			var group      = document.createElementNS(svgNS, "g"),	
				circle 	   = document.createElementNS(svgNS, "circle");

			X 			   = +newCoords[i].match(xRegex);
			Y 			   = +newCoords[i].match(yRegex);

			// randomX is in range to avoid a circle creation over of the list
			randomX 	   = +(Math.random() * ((ViewportX - 100) - 250) + 250).toFixed(2);
			randomY 	   = +(Math.random() * ((ViewportY - 100) - 50) + 50).toFixed(2);
			randomR 	   = +(Math.random() * (4 - 1.5) + 1.5).toFixed(2);

			setProps(circle, ["cStar"], [{style: "stroke-width", val: 10}, {style: "stroke", val: "rgba(225,225,225,.1)"}, {style: "r", val: randomR}]);
			setProps(group, ["star-group"], []);
			
			group.appendChild(circle);
			setGroupCoords(group, X, Y);

		}

		// Func 1/2
		function deleteEl() {
			var path 	   = svg.querySelector("#constellation"),
				text 	   = svg.querySelector(".desc");
				
			// make animation runing again
			for (var i = 0, circle = c.length; i < circle; i++) {c[i].classList.contains("paused") ? c[i].classList.remove("paused") : false}

			if(path) {svg.removeChild(path); path = null}
			if(text) {svg.removeChild(text); text = null}
			svg.querySelectorAll(".star-group").forEach(function(el) {
				if(el)
				svg.removeChild(el);
				el = null;
			});
		}
		this.addEventListener("mouseout", deleteEl);
	}
	
	drawStars();

	listItems.forEach(function(el) {
		el.addEventListener("mouseover", drawPath);
	});

})();