// Global variables
var mapView;
var map;

// Init
window.onload = init;

// Functions
function init() {

  mapView = new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([0.0, 0.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 1,
    maxZoom: 19,
    minZoom: 1
  })
	
  map = new ol.Map({
    view: mapView,
    target: 'js-map'
  })

  zoomSlider = new ol.control.ZoomSlider();
  map.addControl(zoomSlider);

  initBaseLayers();
  
  // Set onMoveEnd event
  map.on('moveend', onMapMoveEnd);

  function onMapMoveEnd(evt) {

    //console.log('onMapMoveEnd');

    var lonLatPos = ol.proj.transform(mapView.getCenter(), 'EPSG:3857', 'EPSG:4326');

    var lon = lonLatPos[0];
    var lat = lonLatPos[1];
    var zoom = mapView.getZoom();

    //console.log("Center Lon: " + lon);
    //console.log("Center Lat: " + lat);

    setCookie('mapLon', lon);
    setCookie('mapLat', lat);
    setCookie('mapZoom', zoom);

    showVisibleBusLines(zoom);
  }
  
  // Vector layers

  initVectorLayers();

  readCookies();
  
  /*
  // Geolocation object setup to track the position of the device
  var geolocation = new ol.Geolocation({
	projection: view.getProjection(),
    tracking: true
  });
  
  geolocation.once('change:position', function() {
    var pos = geolocation.getPosition();
    console.log(pos[0] + ' : ' + pos[1]);
    view.setCenter([parseFloat(pos[0]), parseFloat(pos[1])]);
  });
  */

}

/* Set the width of the side panel to 250px (show it) */
function openSidePanel() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the side panel to 0 (hide it) */
function closeSidePanel() {
  document.getElementById("mySidepanel").style.width = "0";
}

function showVisibleBusLines(zoom) {

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
    
  //var element = document.getElementById("label_bus_line_count");

  //element.innerHTML = getBusLineCount();

  //element.innerHTML = increaseZoom(zoom);

  //const http = new XMLHttpRequest()

  //http.open("GET", "http://localhost");

  //var myURL = document.location;
  //document.location = myURL + "?zoom=" + zoom;

  //var url=window.location.href + "?zoom=" + zoom;

  //http.open("GET", url);
  //http.send();
  
  //http.onload = () => console.log(http.responseText);

  //element.innerHTML = 'Line count: <?php echo getBusLineCount()?>';

}
