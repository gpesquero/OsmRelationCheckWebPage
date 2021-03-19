// Global variables
var vectorBusLinesGroup;
var strokeStyleBusLine;
var circleStyleBusLine;

// Functions

function initBusLinesLayers() {

  strokeStyleBusLine = new ol.style.Stroke({
    color: [238, 28, 37, 1.0],
    width: 15.0
  })

  circleStyleBusLine = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [238, 28, 37, 1.0]
    }),
    radius: 7,
    stroke: strokeStyleBusLine
  })

  // Layer group
  vectorBusLinesGroup = new ol.layer.Group({
    minZoom: 14,
    layers: [
    //  vectorBusLine
    ]
  })

  map.addLayer(vectorBusLinesGroup);
}

var customStyleFunction = function(feature, resolution) {

  if (feature.get('role') === 'platform') {

    imageValue = new ol.style.Icon({
      size: [64, 64],
      opacity: 1,
      scale: 0.40,
      src: '../img/bus_stop.png'
    });  
  }
  else {

    imageValue = circleStyleBusLine;
  }
  
  return [new ol.style.Style({
    stroke: strokeStyleBusLine,
    image: imageValue
  })];
}

function getVisibleBusLines(zoom) {

  // Get map view extends

  var viewExtends = mapView.calculateExtent();

  var pos1 = [viewExtends[0], viewExtends[1]];
  var pos2 = [viewExtends[2], viewExtends[3]];

  var coord1 = ol.proj.transform(pos1, 'EPSG:3857', 'EPSG:4326');
  var coord2 = ol.proj.transform(pos2, 'EPSG:3857', 'EPSG:4326');

  //console.log(coord1);
  //console.log(coord2);

  var minLon = coord1[0];
  var maxLon = coord2[0];
  var minLat = coord1[1];
  var maxLat = coord2[1];

  // Create fetch url 
  
  var url = "/fetchBusLines.php?" +
            "minLon=" + minLon + "&" +
            "maxLon=" + maxLon + "&" +
            "minLat=" + minLat + "&" +
            "maxLat=" + maxLat;

  //console.log(url);

  fetch(url)
    .then(response => {

      if (response.ok) {

        //console.log("Fetch response Ok!!");

        return response.text();   
      }
      else {

        console.log("Fetch response NOT Ok!!");

        return "NOT Ok!!";
      }
    })
    .then(text => {
    
      console.log("Fetch received text: " + text);

      // Create collection
      var fetchedBusLines;

      if (text.startsWith("BUS_LINES")) {

        var start = text.indexOf('<');
        var end = text.indexOf('>');

        console.log("Fetched Bus Lines: " + text.substring(start+1, end));

        var lines = text.substring(start+1, end).split(",");

        // Create collection with fetched bus lines
        fetchedBusLines = new ol.Collection(lines);
      }
      else {

        // Create empty collection
        fetchedBusLines = new ol.Collection();
      }

      showBusLines(fetchedBusLines);
  });
}

function showBusLines(fetchedBusLines) {

  var busLinesCollection = vectorBusLinesGroup.getLayers();

  console.log("Initial bus lines count: " + busLinesCollection.getLength());

  busLinesCollection.forEach(currentBusLine => {

    var busId = currentBusLine.get('title');
    
    console.log("Checking existing bus line: " + busId);

    var found = false;

    // Check if bus line is already loaded...

    for (let i = 0; i < fetchedBusLines.getLength(); i++) {

      var fetchedLine = fetchedBusLines.item(i);

      if (fetchedLine.localeCompare(busId) == 0) {

        // Bus line found in fetched lines

        console.log("Bus line #" + busId + " found in fetched lines");

        // Remove bus line from fetched lines

        fetchedBusLines.removeAt(i);

        found = true;
        
        break;
      }
    }

    if (!found) {

      // The existing bus line has not been fetched
      // Delete from shown bus lines...

      busLinesCollection.remove(currentBusLine);

      console.log("Removed bus line #" + busId + " from shown lines");
    }
  })

  console.log("Final fetched bus lines count: " + fetchedBusLines.getLength());

  // Add final fetched bus lines

  fetchedBusLines.forEach(function(fetchedLine) {

    var busFileName = "./data/bus_lines/bus_line_" + fetchedLine + ".geojson";
  
    var vectorSourceBusLine = new ol.source.Vector({
      url: busFileName,
      format: new ol.format.GeoJSON() 
    })
    
    var vectorBusLine = new ol.layer.VectorImage({
      source: vectorSourceBusLine,
      visible: true,
      title: fetchedLine,
      style: customStyleFunction
    })

    busLinesCollection.push(vectorBusLine); 
  })

  console.log("Final bus lines count: " + busLinesCollection.getLength());

  console.log("--------------------------------------------------------");
}
