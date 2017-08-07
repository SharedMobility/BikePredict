function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34, lng: -84},
    zoom: 11,
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
              return "Air quality is considered satisfactory, and air pollution poses little or no risk."
            } else if (secondResponse[0].data.aqi <= 100) {
              return "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
            } else if (secondResponse[0].data.aqi <= 150) {
              return "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
            } else if (secondResponse[0].data.aqi <= 200) {
              return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects."  
            } else if (secondResponse[0].data.aqi <= 300) {
              return "Air quality is dangerous.  Health warnings of emergency conditions. The entire population is more likely to be affected."    
            } else {
              return "Air quality is acutely dangerous.  Health alert: everyone may experience more serious health effects."}
          };
          
          function uviMessage () {if (firstResponse[0].currently.uvIndex <= 2) {
              return "A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person."
            } else if (firstResponse[0].currently.uvIndex <= 5) {
              return "A UV Index reading of 3 to 5 means moderate risk of harm from unprotected sun exposure."
            } else if (firstResponse[0].currently.uvIndex <= 7) {
              return "A UV Index reading of 6 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed."
            } else if (firstResponse[0].currently.uvIndex <= 10) {
              return "A UV Index reading of 8 to 10 means very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly."  
            } else {
              return "A UV Index reading of 11 or more means extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes. "}
          };


          $('#api_info').html( 
            `
            <span class="component temp">${firstResponse[0].currently.temperature}°F</span>
            <span class="component humidity">${firstResponse[0].currently.humidity*100}%</span>
            <span class="component wind">${firstResponse[0].currently.windSpeed} mph</span>
            <span class="component rain">${firstResponse[0].currently.precipProbability*100}%</span>
            <span class="component aqi">${secondResponse[0].data.aqi}</span>
            <span class="component uv">${firstResponse[0].currently.uvIndex}</span>
            <div class="summary aqimessage">${aqiMessage()}</div>
            <div class="summary uvmessage">${uviMessage()}</div>
            `
          )
        })
      })
  })
}