function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {

    center: {lat: 34, lng: -84},
    zoom: 12,
    mapTypeId: 'terrain'
  });

  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

    const latVal = searchBox.getPlaces()[0].geometry.location.lat();
    const longVal = searchBox.getPlaces()[0].geometry.location.lng();
    console.log(latVal, longVal);
    
      $(function(){
      const AQI_URL = 'https://api.waqi.info/feed/geo:' + `${latVal};${longVal}` + '/?'
      var settings = {
          "async": true,
          "crossDomain": true,
          "url": AQI_URL,
          "data": {
            "token": "7af2191ef71f827a4de1cbcdd9463989a7c3bb6c"
          },
          "method": "GET"
      }

        // $.ajax(settings).done(function (response) {
        //    $('#aqi').append( "Aqi: " + response.data.iaqi.o3.v)
        //    $('#aqi2').append( "Aqi: " + response.data.iaqi.o3.v)
        //    $('#aqi3').append( "Aqi: " + response.data.iaqi.o3.v)
        //    $('#aqi4').append( "Aqi: " + response.data.iaqi.o3.v)
        //    $('#aqi5').append( "Aqi: " + response.data.iaqi.o3.v)
        //    $('#aqi6').append( "Aqi: " + response.data.iaqi.o3.v)
        // })

        // $.ajax(settings).done(function (response) {
        // console.log(response);
        // })

        $.ajax(settings).done(function (response) {
           $('#aqi').html( "Aqi: " + response.data.iaqi.o3.v)
        })
      })
  })
}
initAutocomplete();