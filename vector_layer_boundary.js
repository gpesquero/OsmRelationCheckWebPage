// Global variables
var vectorBoundary;

// Functions
function initVectorLayerBoundary() {

  var vectorSourceBoundary = new ol.source.Vector({
    url: './data/boundary.geojson',
    format: new ol.format.GeoJSON() 
  })
  
  vectorBoundary = new ol.layer.VectorImage({
    source: vectorSourceBoundary,
    visible: true,
    title: 'VectorBoundary',
    style: featureStyleBoundary 
  })

  var listenerKeyBoundary = vectorSourceBoundary.on('change', function(e) {
  
    if (vectorSourceBoundary.getState() == 'ready') {
    
      var features = vectorSourceBoundary.getFeatures();

      var featureCount = features.length;

      console.log("Boundary count:"+featureCount);

      var pbfDateStamp, pbfTimeStamp;

      if (featureCount>0) {
        
        pbfDateStamp=features[0].get('pbf_date');
        pbfTimeStamp=features[0].get('pbf_time');
      }
      else {

        pbfDateStamp='????';
        pbfTimeStamp='????';
      }

      var element = document.getElementById('data_time_stamp');

      element.innerHTML = pbfDateStamp + " " + pbfTimeStamp;

      ol.Observable.unByKey(listenerKeyBoundary);
    }
  });
}
