// Global variables
var featureStyleBoundary;
var errorStrokeStyle;

// Functions
function initVectorLayerStyles() {

  const boundaryStrokeStyle = new ol.style.Stroke({
    color: [0, 0, 255, 1],
    width: 3.0
  })

  errorStrokeStyle = new ol.style.Stroke({
    color: [64, 64, 64, 0.8],
    width: 2.0
  })

  featureStyleBoundary = new ol.style.Style({
    stroke: boundaryStrokeStyle
  })

  
}
