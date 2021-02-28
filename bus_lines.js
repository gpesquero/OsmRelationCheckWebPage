// Global variables
var vectorBusLinesGroup;

// Functions

function initBusLinesLayers() {

  const strokeStyleBusLine = new ol.style.Stroke({
    color: [238, 28, 37, 1.0],
    width: 15.0
  })

  const circleStyleBusLine = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [238, 28, 37, 1.0]
    }),
    radius: 7,
    stroke: strokeStyleBusLine
  })

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
  
  var vectorSourceBusLine = new ol.source.Vector({
    url: './data/bus_lines/bus_line_164554.geojson',
    format: new ol.format.GeoJSON() 
  })
  
  var vectorBusLine = new ol.layer.VectorImage({
    source: vectorSourceBusLine,
    visible: true,
    title: 'VectorBusLine',
    style: customStyleFunction
  })

  // Layer group
  vectorBusLinesGroup = new ol.layer.Group({
    minZoom: 14,
    layers: [
      vectorBusLine
    ]
  })

  map.addLayer(vectorBusLinesGroup);
}

function showVisibleBusLines(zoom) {

  /*
  if (zoom < 14) {

    // Hide bus lines

    console.log("Hide bus lines");

    return;
  }

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
      }
    })
    .then(text => {
    
      console.log("Fetch received text: " + text);
  });
  */
}
