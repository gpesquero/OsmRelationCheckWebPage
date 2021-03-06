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

    getVisibleBusLines(zoom);
  }
  
  // Vector layers

  initVectorLayers();

  initBusLinesLayers();

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
