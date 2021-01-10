// Global variables
var vectorErrorsAdminHigh;
var vectorErrorsAdminMedium;
var vectorErrorsAdminLow;

// Functions

function initAdminVectorLayers() {

  const circleStyleAdminHigh = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [128, 0, 0, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleAdminHigh = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleAdminHigh
  })

  const circleStyleAdminMedium = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [255, 0, 0, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleAdminMedium = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleAdminMedium
  })

  const circleStyleAdminLow = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [255, 192, 192, 0.8]
    }),
    radius: 7,
    stroke: errorStrokeStyle
  })

  const featureStyleAdminLow = new ol.style.Style({
    stroke: errorStrokeStyle,
    image: circleStyleAdminLow
  })
  
  var vectorSourceAdminHigh = new ol.source.Vector({
    url: './data/errors_admin_spain_high.geojson',
    format: new ol.format.GeoJSON() 
  })
    
  vectorErrorsAdminHigh = new ol.layer.VectorImage({
    source: vectorSourceAdminHigh,
    visible: true,
    title: 'VectorErrorsAdminHigh',
    style: featureStyleAdminHigh 
  })

  var listenerKeyAdminHigh = vectorSourceAdminHigh.on('change', function(e) {
    
    if (vectorSourceAdminHigh.getState() == 'ready') {
    
        var featureCount = vectorSourceAdminHigh.getFeatures().length;

        var element = document.getElementById("label_admin_error_high");

        element.innerHTML = "High ("+featureCount+")";
    
        ol.Observable.unByKey(listenerKeyAdminHigh);
    }
  });

  var vectorSourceAdminMedium = new ol.source.Vector({
    url: './data/errors_admin_spain_medium.geojson',
    format: new ol.format.GeoJSON() 
  })

  vectorErrorsAdminMedium = new ol.layer.VectorImage({
    source: vectorSourceAdminMedium,
    visible: true,
    title: 'VectorErrorsAdminMedium',
    style: featureStyleAdminMedium
  })

  var listenerKeyAdminMedium = vectorSourceAdminMedium.on('change', function(e) {
  
    if (vectorSourceAdminMedium.getState() == 'ready') {
    
      var featureCount = vectorSourceAdminMedium.getFeatures().length;

      var element = document.getElementById("label_admin_error_medium");

      element.innerHTML = "Medium ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyAdminMedium);
    }
  });

  var vectorSourceAdminLow = new ol.source.Vector({
    url: './data/errors_admin_spain_low.geojson',
    format: new ol.format.GeoJSON() 
  })
  
  vectorErrorsAdminLow = new ol.layer.VectorImage({
    source: vectorSourceAdminLow,
    visible: true,
    title: 'VectorErrorsAdminLow',
    style: featureStyleAdminLow 
  })

  var listenerKeyAdminLow = vectorSourceAdminLow.on('change', function(e) {
  
    if (vectorSourceAdminLow.getState() == 'ready') {
    
      var featureCount = vectorSourceAdminLow.getFeatures().length;

      var element = document.getElementById("label_admin_error_low");

      element.innerHTML = "Low ("+featureCount+")";
    
      ol.Observable.unByKey(listenerKeyAdminLow);
    }
  });

}
