// Global variables
var vectorErrorsHikingHigh;
var vectorErrorsHikingMedium;
var vectorErrorsHikingLow;

// Functions
function initHikingVectorLayers() {

  const circleStyleHikingHigh = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [0, 0, 128, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleHikingHigh = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleHikingHigh
  })

  const circleStyleHikingMedium = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [0, 0, 255, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleHikingMedium = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleHikingMedium
  })

  const circleStyleHikingLow = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [192, 192, 255, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleHikingLow = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleHikingLow
  })

  var vectorSourceHikingHigh = new ol.source.Vector({
    url: './data/errors_hiking_spain_high.geojson',
    format: new ol.format.GeoJSON() 
  })
    
  vectorErrorsHikingHigh = new ol.layer.VectorImage({
    source: vectorSourceHikingHigh,
    visible: true,
    title: 'VectorErrorsHikingHigh',
    style: featureStyleHikingHigh 
  })

  var listenerKeyHikingHigh = vectorSourceHikingHigh.on('change', function(e) {
    
    if (vectorSourceHikingHigh.getState() == 'ready') {
    
        var featureCount = vectorSourceHikingHigh.getFeatures().length;

        var element = document.getElementById("label_hiking_error_high");

        element.innerHTML = "High ("+featureCount+")";
    
        ol.Observable.unByKey(listenerKeyHikingHigh);
    }
  });

  var vectorSourceHikingMedium = new ol.source.Vector({
    url: './data/errors_hiking_spain_medium.geojson',
    format: new ol.format.GeoJSON() 
  })

  vectorErrorsHikingMedium = new ol.layer.VectorImage({
    source: vectorSourceHikingMedium,
    visible: true,
    title: 'VectorErrorsHikingMedium',
    style: featureStyleHikingMedium
  })

  var listenerKeyHikingMedium = vectorSourceHikingMedium.on('change', function(e) {
  
    if (vectorSourceHikingMedium.getState() == 'ready') {
    
      var featureCount = vectorSourceHikingMedium.getFeatures().length;

      var element = document.getElementById("label_hiking_error_medium");

      element.innerHTML = "Medium ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyHikingMedium);
    }
  });

  var vectorSourceHikingLow = new ol.source.Vector({
    url: './data/errors_hiking_spain_low.geojson',
    format: new ol.format.GeoJSON() 
  })
  
  vectorErrorsHikingLow = new ol.layer.VectorImage({
    source: vectorSourceHikingLow,
    visible: true,
    title: 'VectorErrorsHikingLow',
    style: featureStyleHikingLow 
  })

  var listenerKeyHikingLow = vectorSourceHikingLow.on('change', function(e) {
  
    if (vectorSourceHikingLow.getState() == 'ready') {
    
      var featureCount = vectorSourceHikingLow.getFeatures().length;

      var element = document.getElementById("label_hiking_error_low");

      element.innerHTML = "Low ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyHikingLow);
    }
  });

}
