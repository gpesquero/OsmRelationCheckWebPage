// Global variables
var vectorErrorsBusHigh;
var vectorErrorsBusMedium;
var vectorErrorsBusLow;

// Functions
function initBusVectorLayers() {

  const circleStyleBusHigh = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [0, 128, 0, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleBusHigh = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleBusHigh
  })

  const circleStyleBusMedium = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [0, 255, 0, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleBusMedium = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleBusMedium
  })

  const circleStyleBusLow = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [192, 255, 192, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleBusLow = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleBusLow
  })

  var vectorSourceBusHigh = new ol.source.Vector({
    url: './data/errors_bus_madrid_high.geojson',
    format: new ol.format.GeoJSON() 
  })
    
  vectorErrorsBusHigh = new ol.layer.VectorImage({
    source: vectorSourceBusHigh,
    visible: true,
    title: 'VectorErrorsBusHigh',
    style: featureStyleBusHigh 
  })

  var listenerKeyBusHigh = vectorSourceBusHigh.on('change', function(e) {
    
    if (vectorSourceBusHigh.getState() == 'ready') {
    
        var featureCount = vectorSourceBusHigh.getFeatures().length;

        var element = document.getElementById("label_bus_error_high");

        element.innerHTML = "High ("+featureCount+")";
    
        ol.Observable.unByKey(listenerKeyBusHigh);
    }
  });

  var vectorSourceBusMedium = new ol.source.Vector({
    url: './data/errors_bus_madrid_medium.geojson',
    format: new ol.format.GeoJSON() 
  })

  vectorErrorsBusMedium = new ol.layer.VectorImage({
    source: vectorSourceBusMedium,
    visible: true,
    title: 'VectorErrorsBusMedium',
    style: featureStyleBusMedium
  })

  var listenerKeyBusMedium = vectorSourceBusMedium.on('change', function(e) {
  
    if (vectorSourceBusMedium.getState() == 'ready') {
    
      var featureCount = vectorSourceBusMedium.getFeatures().length;

      var element = document.getElementById("label_bus_error_medium");

      element.innerHTML = "Medium ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyBusMedium);
    }
  });

  var vectorSourceBusLow = new ol.source.Vector({
    url: './data/errors_bus_madrid_low.geojson',
    format: new ol.format.GeoJSON() 
  })
  
  vectorErrorsBusLow = new ol.layer.VectorImage({
    source: vectorSourceBusLow,
    visible: true,
    title: 'VectorErrorsBusLow',
    style: featureStyleBusLow 
  })

  var listenerKeyBusLow = vectorSourceBusLow.on('change', function(e) {
  
    if (vectorSourceBusLow.getState() == 'ready') {
    
      var featureCount = vectorSourceBusLow.getFeatures().length;

      var element = document.getElementById("label_bus_error_low");

      element.innerHTML = "Low ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyBusLow);
    }
  });

}
