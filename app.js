function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34, lng: -84},
    zoom: 12,
    mapTypeId: 'terrain'
  });

  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  var legend = document.getElementById('legend');
    var div = document.createElement('div');
    div.innerHTML = '<img src=http://i.imgur.com/6yQ0Cbe.png>';
    legend.appendChild(div);

    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(legend);
  
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
    
      $(function(){
      
      var weatherCall =
        $.ajax({
          "async": true,
          "crossDomain": true,
          "url": 'https://cors-anywhere.herokuapp.com/' + 'https://api.darksky.net/forecast/455fb5192a422fe4e13e58391b3c0a17/' + `${latVal},${longVal}`,
          "method": "GET"
      });

      var aqiCall =
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": 'https://api.waqi.info/feed/geo:' + `${latVal};${longVal}` + '/?',
        "data": {
        "token": "7af2191ef71f827a4de1cbcdd9463989a7c3bb6c"
        },
        "method": "GET"
      });

        $.when(weatherCall, aqiCall).done(function (firstResponse, secondResponse) {
          
          function aqiMessage () {if (secondResponse[0].data.aqi <= 50) {
            return "The air quality is good today."
          } else if (secondResponse[0].data.aqi <= 100) {
            return "The air quality is questionable today."
          } else if (secondResponse[0].data.aqi <= 150) {
            return "The air quality sucks today."  
          } else {
            return "Don't leave your house."}
        };

          $('#displayWeatherInfo').html( 
            `
            <div>Apparent Temperature: ${firstResponse[0].currently.apparentTemperature} Degrees Fahrenheit</div>
            <div>Humidity: ${firstResponse[0].currently.humidity}</div>
            <div>UV Index: ${firstResponse[0].currently.uvIndex}</div>
            <div>Wind Bearing: ${firstResponse[0].currently.windBearing}</div>
            <div>Wind Gust: ${firstResponse[0].currently.windGust}</div>
            <div>Wind Speed: ${firstResponse[0].currently.windSpeed}</div>
            <div>Chance of Rain: ${firstResponse[0].currently.precipProbability}</div>
            <div>Air Quality Index: ${secondResponse[0].data.aqi}</div>
            <div>Air Quality Forecast: ${aqiMessage()}</div>
            <div>Nearest City: <a href="${secondResponse[0].data.city.url}">${secondResponse[0].data.city.name}</a></div>
            <div>Recording Station: <a href="${secondResponse[0].data.attributions[0].url}">${secondResponse[0].data.attributions[0].name}</a></div>
            <div>Updated Time: ${secondResponse[0].data.time.s}</div>
            `
          )
        })
      })
  })
}