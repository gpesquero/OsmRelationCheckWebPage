window.onload = init;

function init() {

  var defaultLocation = ol.proj.transform([-3.461, 40.298], 'EPSG:4326', 'EPSG:3857');
  var defaultZoom = 6;

  const view = new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
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
  
  map.addLayer(baseLayerGroup);
  
  // Layer switching...
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');
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

  function setCookie(name, value) {
    
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);

    var daysToLive = 30;
    
    if(typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive*24*60*60);

        cookie += "; path=/";
        
        document.cookie = cookie;

        console.log('setCookie(): '+cookie);

        console.log('Cookies: '+document.cookie);
    }
  }
  
  function getCookie(name) {

    console.log('Cookies: '+document.cookie);

    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {

        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
  }
  
  function readCookies() {

    console.log('readCookies() init');

    var baseLayer = getCookie('baseLayer');

    console.log('readCookies() baseLayer='+baseLayer);
    
    if (baseLayer == 'OsmHumanitarian') {

      console.log('setVisible() OsmHumanitarian');

      osmHumanitarianLayer.setVisible(true);
    }
    else if (baseLayer == 'OpenTopoMap') {

      console.log('setVisible() OpenTopoMap');
      
      openTopoMapLayer.setVisible(true);
    }
    else {

      console.log('setVisible() OsmStandard');
      
      osmStandardLayer.setVisible(true);
    }
  }

  readCookies();

  map.on('click', function(e) {
    console.log(e.coordinate)
  })
}

