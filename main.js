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

  // Vector layers

  const fillStyle = new ol.style.Fill({
    color: [84, 118, 255, 1]
  })

  const strokeStyle = new ol.style.Stroke({
    color: [0, 0, 0, 1],
    width: 3.0
  })

  const circleStyleHigh = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [255, 0, 0, 0.8]
    }),
    radius: 7,
    stroke: strokeStyle
  })

  const circleStyleMedium = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [255, 165, 0, 0.8]
    }),
    radius: 7,
    stroke: strokeStyle
  })

  const circleStyleLow = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [255, 255, 0, 0.8]
    }),
    radius: 7,
    stroke: strokeStyle
  })

  const featureStyleHigh = new ol.style.Style({
    stroke: strokeStyle,
    image: circleStyleHigh
  })

  const featureStyleMedium = new ol.style.Style({
    stroke: strokeStyle,
    image: circleStyleMedium
  })

  const featureStyleLow = new ol.style.Style({
    stroke: strokeStyle,
    image: circleStyleLow
  })

  const vectorErrorsLevelHigh = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/errors_high.geojson',
      format: new ol.format.GeoJSON() 
    }),
    visible: true,
    title: 'VectorErrorsLevelHigh',
    style: featureStyleHigh 
  })

  const vectorErrorsLevelMedium = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/errors_medium.geojson',
      format: new ol.format.GeoJSON() 
    }),
    visible: true,
    title: 'VectorErrorsLevelMedium',
    style: featureStyleMedium
  })

  const vectorErrorsLevelLow = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: './data/errors_low.geojson',
      format: new ol.format.GeoJSON() 
    }),
    visible: true,
    title: 'VectorErrorsLevelLow',
    style: featureStyleLow 
  })

  // Layer group
  const vectorErrorsGroup = new ol.layer.Group({
    layers: [
      vectorErrorsLevelLow, vectorErrorsLevelMedium, vectorErrorsLevelHigh 
    ]
  })

  map.addLayer(vectorErrorsGroup);

  var features = vectorErrorsLevelLow.getSource().getFeatures();

  /*
  const vectorSource = new ol.source.Vector({
    url: './data/errors_high.geojson',
    format: new ol.format.GeoJSON() 
  })

  //console.log(vectorSource);

  var features = vectorSource.getFeatures();

  console.log(features);

  var count = 0;

  vectorSource.forEachFeature(function(feature) {

    count++;
    
    console.log(count);
  })
  */

  function setErrorLevelCheckBox(checkboxName, enable) {

    console.log('setErrorLevelCheckBox() '+checkboxName+', '+enable);

    // Get checkboxes...
    const errorLevelElements = document.querySelectorAll('.sidebar > input[name=checkboxErrorLevel]');

    for (let errorLevelElement of errorLevelElements) {

      if (errorLevelElement.value === checkboxName) {

        errorLevelElement.checked = enable;
      }
    }
  }

  // Error vector selection...
  const errorLevelElements = document.querySelectorAll('.sidebar > input[name=checkboxErrorLevel]');

  for (let errorLevelElement of errorLevelElements) {

    errorLevelElement.addEventListener('change', function() {

      console.log('checkbox changed');

      // Get checkboxes...
      const errorLevelElements = document.querySelectorAll('.sidebar > input[name=checkboxErrorLevel]');

      for (let errorLevelElement of errorLevelElements) {

        if (errorLevelElement.value === 'error_level_high') {
  
          setCookie('error_level_high', errorLevelElement.checked);
          vectorErrorsLevelHigh.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'error_level_medium') {
  
          setCookie('error_level_medium', errorLevelElement.checked);
          vectorErrorsLevelMedium.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'error_level_low') {
  
          setCookie('error_level_low', errorLevelElement.checked);
          vectorErrorsLevelLow.setVisible(errorLevelElement.checked);
        }
      }
    })
  }

  // Vector feature clicks

  const overlayContainerElement = document.querySelector('.overlay-container');
  
  const overlayLayer = new ol.Overlay({

    element: overlayContainerElement
  })

  map.addOverlay(overlayLayer);

  const overlayFeatureTitle = document.getElementById('feature-title');
  const overlayFeatureRelation = document.getElementById('feature-relation');
  const overlayFeatureDescription = document.getElementById('feature-description');

  map.on('click', function(e) {

    overlayLayer.setPosition(undefined);

    map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {

      let coordinate = e.coordinate;

      let title = feature.get('title');
      let relation = feature.get('relation');
      let description = feature.get('description');
      
      console.log('onClicked(): relation='+relation+", description="+description);
      
      overlayLayer.setPosition(coordinate);

      overlayFeatureTitle.innerHTML = title;
      overlayFeatureRelation.innerHTML = relation;
      overlayFeatureDescription.innerHTML = description;
    })
  })
  
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

    var errorLevelHigh = (getCookie('error_level_high', 'true') === 'true');
    vectorErrorsLevelHigh.setVisible(errorLevelHigh);
    setErrorLevelCheckBox('error_level_high', errorLevelHigh);

    var errorLevelMedium = (getCookie('error_level_medium', 'true') === 'true');
    vectorErrorsLevelMedium.setVisible(errorLevelMedium);
    setErrorLevelCheckBox('error_level_medium', errorLevelMedium);

    var errorLevelLow = (getCookie('error_level_low', 'true') === 'true');
    vectorErrorsLevelLow.setVisible(errorLevelLow);
    setErrorLevelCheckBox('error_level_low', errorLevelLow);

    var lon = parseFloat(getCookie('mapLon', '0.0'));
    
    if (isNaN(lon)) {

      lon = 0.0;
    }

    var lat = parseFloat(getCookie('mapLat', '0.0'));

    if (isNaN(lat)) {

      lat = 0.0;
    }

    var zoom = parseFloat(getCookie('mapZoom', '4.0'));

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
}

