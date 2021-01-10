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

  initBaseLayers();
  
  // Set onMoveEnd event
  map.on('moveend', onMapMoveEnd);

  function onMapMoveEnd(evt) {

    //console.log('onMapMoveEnd');

    var center = mapView.getCenter();

    var lonLatPos = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');

    var lon = lonLatPos[0];
    var lat = lonLatPos[1];
    var zoom = mapView.getZoom();

    setCookie('mapLon', lon);
    setCookie('mapLat', lat);
    setCookie('mapZoom', zoom);
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

