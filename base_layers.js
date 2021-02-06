// Global variables
var osmStandardLayer;
var osmHumanitarianLayer;
var openTopoMapLayer;

// Functions
function initBaseLayers() {

  osmStandardLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: false,
    title: 'OsmStandard'
  })
  
  osmHumanitarianLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    }),
    visible: false,
    title: 'OsmHumanitarian'
  })
  
  openTopoMapLayer = new ol.layer.Tile({
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

  // Base layer switching...
  const baseLayerElements = document.querySelectorAll('.sidepanel > input[name=baseLayerRadioButton]');

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
}

function setBaseLayerRadioButton(baseLayerName) {

  console.log('setBaseLayerRadioButton() '+baseLayerName);

  // Get all radio buttons...
  const baseLayerElements = document.querySelectorAll('.sidepanel > input[name=baseLayerRadioButton]');

  for (let baseLayerElement of baseLayerElements) {

    baseLayerElement.checked = (baseLayerElement.value === baseLayerName);
  }
}
