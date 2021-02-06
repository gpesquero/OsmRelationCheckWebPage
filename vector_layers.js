// Global variables

// Functions
function initVectorLayers() {

  initVectorLayerStyles();

  initVectorLayerBoundary();
  
  initAdminVectorLayers();

  initBusVectorLayers();

  initHikingVectorLayers();

  // Layer group
  const vectorErrorsGroup = new ol.layer.Group({
    layers: [
      vectorBoundary,
      vectorErrorsHikingLow,
      vectorErrorsBusLow,
      vectorErrorsAdminLow,
      vectorErrorsHikingMedium,
      vectorErrorsBusMedium,
      vectorErrorsAdminMedium,
      vectorErrorsHikingHigh,
      vectorErrorsBusHigh,
      vectorErrorsAdminHigh 
    ]
  })

  map.addLayer(vectorErrorsGroup);

  // Error vector selection...
  const errorLevelElements = document.querySelectorAll('.sidepanel > input[name=checkboxErrorLevel]');

  for (let errorLevelElement of errorLevelElements) {

    errorLevelElement.addEventListener('change', function() {

      //console.log('checkbox changed');

      // Get checkboxes...
      const errorLevelElements = document.querySelectorAll('.sidepanel > input[name=checkboxErrorLevel]');

      for (let errorLevelElement of errorLevelElements) {

        if (errorLevelElement.value === 'admin_error_high') {
  
          setCookie('admin_error_high', errorLevelElement.checked);
          vectorErrorsAdminHigh.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'admin_error_medium') {
    
          setCookie('admin_error_medium', errorLevelElement.checked);
          vectorErrorsAdminMedium.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'admin_error_low') {
    
          setCookie('admin_error_low', errorLevelElement.checked);
          vectorErrorsAdminLow.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'bus_error_high') {
  
          setCookie('bus_error_high', errorLevelElement.checked);
          vectorErrorsBusHigh.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'bus_error_medium') {
  
          setCookie('bus_error_medium', errorLevelElement.checked);
          vectorErrorsBusMedium.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'bus_error_low') {
  
          setCookie('bus_error_low', errorLevelElement.checked);
          vectorErrorsBusLow.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'hiking_error_high') {
  
          setCookie('hiking_error_high', errorLevelElement.checked);
          vectorErrorsHikingHigh.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'hiking_error_medium') {
  
          setCookie('hiking_error_medium', errorLevelElement.checked);
          vectorErrorsHikingMedium.setVisible(errorLevelElement.checked);
        }
        else if (errorLevelElement.value === 'hiking_error_low') {
  
          setCookie('hiking_error_low', errorLevelElement.checked);
          vectorErrorsHikingLow.setVisible(errorLevelElement.checked);
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
      
      //console.log('onClicked(): relation='+relation+", description="+description);
      
      overlayLayer.setPosition(coordinate);

      overlayFeatureTitle.innerHTML = title;
      overlayFeatureRelation.innerHTML = relation;
      overlayFeatureDescription.innerHTML = description;
    })
  })
}

function setErrorLevelCheckBox(checkboxName, enable) {

  console.log('setErrorLevelCheckBox() '+checkboxName+', '+enable);

  // Get checkboxes...
  const errorLevelElements = document.querySelectorAll('.sidepanel > input[name=checkboxErrorLevel]');

  for (let errorLevelElement of errorLevelElements) {

    if (errorLevelElement.value === checkboxName) {

      errorLevelElement.checked = enable;
    }
  }
}
