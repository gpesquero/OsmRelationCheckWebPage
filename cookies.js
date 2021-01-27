
function setCookie(name, value) {
    
// Encode value in order to escape semicolons, commas, and whitespace
var cookie = name + "=" + encodeURIComponent(value);

var daysToLive = 30;

  if (typeof daysToLive === "number") {

    /* Sets the max-age attribute so that the cookie expires
    after the specified number of days */
    cookie += "; max-age=" + (daysToLive*24*60*60);

    cookie += "; path=/";
    
    document.cookie = cookie;

    //console.log('setCookie(): '+cookie);

    //console.log('Cookies: '+document.cookie);
  }
}

function getCookie(name, defaultValue) {

  //console.log('Cookies: '+document.cookie);

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

  console.log('defaultValue: '+defaultValue);
    
  // Return 'defaultValue' if not found
  return defaultValue;
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

  var adminErrorHigh = (getCookie('admin_error_high', 'true') === 'true');
  vectorErrorsAdminHigh.setVisible(adminErrorHigh);
  setErrorLevelCheckBox('admin_error_high', adminErrorHigh);

  var adminErrorMedium = (getCookie('admin_error_medium', 'true') === 'true');
  vectorErrorsAdminMedium.setVisible(adminErrorMedium);
  setErrorLevelCheckBox('admin_error_medium', adminErrorMedium);

  var adminErrorLow = (getCookie('admin_error_low', 'true') === 'true');
  vectorErrorsAdminLow.setVisible(adminErrorLow);
  setErrorLevelCheckBox('admin_error_low', adminErrorLow);
  
  var busErrorHigh = (getCookie('bus_error_high', 'true') === 'true');
  vectorErrorsBusHigh.setVisible(busErrorHigh);
  setErrorLevelCheckBox('bus_error_high', busErrorHigh);

  var busErrorMedium = (getCookie('bus_error_medium', 'true') === 'true');
  vectorErrorsBusMedium.setVisible(busErrorMedium);
  setErrorLevelCheckBox('bus_error_medium', busErrorMedium);

  var busErrorLow = (getCookie('bus_error_low', 'true') === 'true');
  vectorErrorsBusLow.setVisible(busErrorLow);
  setErrorLevelCheckBox('bus_error_low', busErrorLow);

  var hikingErrorHigh = (getCookie('hiking_error_high', 'true') === 'true');
  vectorErrorsHikingHigh.setVisible(hikingErrorHigh);
  setErrorLevelCheckBox('hiking_error_high', hikingErrorHigh);

  var hikingErrorMedium = (getCookie('hiking_error_medium', 'true') === 'true');
  vectorErrorsHikingMedium.setVisible(hikingErrorMedium);
  setErrorLevelCheckBox('hiking_error_medium', hikingErrorMedium);

  var hikingErrorLow = (getCookie('hiking_error_low', 'true') === 'true');
  vectorErrorsHikingLow.setVisible(hikingErrorLow);
  setErrorLevelCheckBox('hiking_error_low', hikingErrorLow);

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

  mapView.setCenter(center);
  mapView.setZoom(zoom);
}
