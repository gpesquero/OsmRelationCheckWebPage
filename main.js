window.onload = init;

function init() {

  const view = new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([0.0, 0.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 1,
    maxZoom: 19,
    minZoom: 1
  })
	
  const map = new ol.Map({
    view: view,
    target: 'js-map'
  })
  
  // Base Layers
  const osmStandardLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: false,
    title: 'OsmStandard'
  })
  
  const osmHumanitarianLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OsmHumanitarian'
  })
  
  const openTopoMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OpenTopoMap'
  })
  
  // Layer group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      osmStandardLayer, osmHumanitarianLayer, openTopoMapLayer
    ]
  })
  
  // Add all base layers to map 
  map.addLayer(baseLayerGroup);

  // Set onMoveEnd event
  map.on('moveend', onMapMoveEnd);

  function onMapMoveEnd(evt) {

    //console.log('onMapMoveEnd');

    var center = view.getCenter();

    var lonLatPos = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');

    var lon = lonLatPos[0];
    var lat = lonLatPos[1];
    var zoom = view.getZoom();

    setCookie('mapLon', lon);
    setCookie('mapLat', lat);
    setCookie('mapZoom', zoom);

    //console.log('Lon: '+lon.toFixed(6));
    //console.log('Lat: '+lat.toFixed(6));
    //console.log('Zoom: '+zoom.toFixed(2));
  }
  
  // Layer switching...
  const baseLayerElements = document.querySelectorAll('.sidebar > input[name=baseLayerRadioButton]');

  for (let baseLayerElement of baseLayerElements) {

    baseLayerElement.addEventListener('change', function() {

      let baseLayerElementValue = this.value;

      baseLayerGroup.getLayers().forEach(function(element, index, array) {

        let baseLayerTitle = element.get('title');

        if (baseLayerTitle === baseLayerElementValue) {

          setCookie('baseLayer', baseLayerTitle);

          element.setVisible(true);
        }
        else {

          element.setVisible(false);
        }
        
      })
    })
  }

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

  

  function setBaseLayerRadioButton(baseLayerName) {

    console.log('setBaseLayerRadioButton() '+baseLayerName);

    // Get all radio buttons...
    const baseLayerElements = document.querySelectorAll('.sidebar > input[name=baseLayerRadioButton]');

    for (let baseLayerElement of baseLayerElements) {

      baseLayerElement.checked = (baseLayerElement.value === baseLayerName);
    }
  }
  
  function readCookies() {

    console.log('readCookies() init');

    var baseLayer = getCookie('baseLayer', 'OsmStandard');

    console.log('readCookies() baseLayer='+baseLayer);
    
    if (baseLayer == 'OsmHumanitarian') {

      console.log('setVisible() OsmHumanitarian');

      osmHumanitarianLayer.setVisible(true);

      setBaseLayerRadioButton('OsmHumanitarian');
    }
    else if (baseLayer == 'OpenTopoMap') {

      console.log('setVisible() OpenTopoMap');
      
      openTopoMapLayer.setVisible(true);

      setBaseLayerRadioButton('OpenTopoMap');
    }
    else {

      console.log('setVisible() OsmStandard');
      
      osmStandardLayer.setVisible(true);

      setBaseLayerRadioButton('OsmStandard');
    }

    var lonString=getCookie('mapLon', '0.0');
    console.log('lonString: '+lonString);

    var lon = parseFloat(getCookie('mapLon', '0.0'));
    var lat = parseFloat(getCookie('mapLat', '0.0'));
    var zoom = parseFloat(getCookie('mapZoom', '4.0'));

    if (isNaN(lon)) {

      lon = 0.0;
    }

    if (isNaN(lat)) {

      lat = 0.0;
    }
    if (isNaN(zoom)) {

      zoom = 4.0;
    }
   
    console.log('Lon: '+lon.toFixed(6));
    console.log('Lat: '+lat.toFixed(6));
    console.log('Zoom: '+zoom.toFixed(2));

    var center = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857');

    view.setCenter(center);
    view.setZoom(zoom);
  }

  /*
  map.on('click', function(e) {
    console.log(e.coordinate)
  })
  */
}
