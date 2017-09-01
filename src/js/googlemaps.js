function initAutocomplete() {
  $(function(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.6147, lng: -122},
    zoom: 13,
    disableDefaultUI: true,
    mapTypeId: 'terrain',
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  var input = document.getElementById('pac-input');
  var header = document.getElementById('t-header');
  document.getElementById('t-pac-submit').onclick = function () {
    google.maps.event.trigger(input, 'focus')
    google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
  };

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
    map.setZoom(14);
    $('html, body').animate({ scrollTop: $('main').offset().top - 20});
  
    const latVal = searchBox.getPlaces()[0].geometry.location.lat();
    const longVal = searchBox.getPlaces()[0].geometry.location.lng();

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
          
          const rain = Math.round(firstResponse[0].currently.precipProbability*100);
          const humid = Math.round(firstResponse[0].currently.humidity*100);
          const temp = Math.round(Number(firstResponse[0].currently.temperature));
          const wind = Math.round(firstResponse[0].currently.windSpeed);
          const wind_gust = firstResponse["0"].currently.windGust;
          const wind_bearing = firstResponse[0].currently.windBearing;
          const uv = Math.round(firstResponse[0].currently.uvIndex);
          const aqi = Math.round(secondResponse[0].data.aqi);
          const aqi_updated_time = secondResponse["0"].data.time.s;

          function aqiMessage() {if (secondResponse[0].data.aqi <= 50) {
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

          function uviMessage() {if (firstResponse[0].currently.uvIndex <= 2) {
              return "Low danger from the sun's UV rays for the average person."
            } else if (firstResponse[0].currently.uvIndex <= 5) {
              return "Moderate risk of harm from unprotected sun exposure."
            } else if (firstResponse[0].currently.uvIndex <= 7) {
              return "High risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed."
            } else if (firstResponse[0].currently.uvIndex <= 10) {
              return "Very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly."
            } else {
              return "Extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes. "}
          };

          function windMessage() {if (firstResponse[0].currently.windSpeed < 1) {
            return "Conditions are best described as calm. Smoke rises vertically."
          } else if (firstResponse[0].currently.windSpeed <= 3) {
            return "Conditions are best described as light. Wind motion visible in smoke."
          } else if (firstResponse[0].currently.windSpeed <= 7) {
            return "Wind is best described as a light breeze. Wind felt on exposed skin. Leaves rustle."
          } else if (firstResponse[0].currently.windSpeed <= 12) {
            return "Wind is best described as a gentle breeze. Leaves and smaller twigs in constant motion."
          } else if (firstResponse[0].currently.windSpeed <= 18) {
            return "Wind is best described as a moderate breeze. Dust and loose paper is raised. Small branches begin to move."
          } else if (firstResponse[0].currently.windSpeed <= 24) {
            return "Wind is best described as a fresh breeze. Smaller trees sway."
          } else if (firstResponse[0].currently.windSpeed <= 31) {
            return "Wind is best described as a strong breeze. Large branches in motion in motion. Whistling heard in overhead wires. Umbrella use becomes difficult."
          } else if (firstResponse[0].currently.windSpeed <= 38) {
            return "Wind is nearly a gale. Whole trees in motion. Some difficulty when walking into the wind."
          } else if (firstResponse[0].currently.windSpeed <= 46) {
            return "Wind is best described as a gale. Twigs broken from trees. Cars veer on road."
          } else if (firstResponse[0].currently.windSpeed <= 54) {
            return "Wind is best described as a severe gale. Expect light structure damage."
          } else if (firstResponse[0].currently.windSpeed <= 63) {
            return "Conditions are best described as a storm. Expect trees uprooted and considerable structural damage."
          } else if (firstResponse[0].currently.windSpeed <= 73) {
            return "Conditions are best described as a violent storm. Expect widespread structural damage."
          } else if (firstResponse[0].currently.windSpeed <= 95) {
            return "A hurricane is coming.  Expect considerable and widespread damage to structures."
          }
        };

          function windDirection() {if (firstResponse[0].currently.windBearing <= 11.25) {
              return "N"
            } else if (wind_bearing <= 33.75) {
              return "NNE"
            } else if (wind_bearing <= 56.25) {
              return "NE"
            } else if (wind_bearing <= 78.75) {
              return "ENE"
            } else if (wind_bearing <= 101.25) {
              return "E"
            } else if (wind_bearing <= 123.75) {
              return "ESE"
            } else if (wind_bearing <= 146.25) {
              return "SE"
            } else if (wind_bearing <= 168.75) {
              return "SSE"
            } else if (wind_bearing <= 191.25) {
              return "S"
            } else if (wind_bearing <= 213.75) {
              return "SSW"
            } else if (wind_bearing <= 236.25) {
              return "SW"
            } else if (wind_bearing <= 258.75) {
              return "WSW"
            } else if (wind_bearing <= 281.25) {
              return "W"
            } else if (wind_bearing <= 303.75) {
              return "WNW"
            } else if (wind_bearing <= 326.25) {
              return "NW"
            } else if (wind_bearing <= 348.75) {
              return "NNW"
            } else {
              return "N"}
          };

        function humidityMessage() {if (firstResponse[0].currently.humidity <= .20) {
            return "Outdoor relative humidity levels are extremely low. Expect dry air."
          } else if (firstResponse[0].currently.humidity <= .45) {
            return "Outdoor relative humidity levels are acceptable."
          } else if (firstResponse[0].currently.humidity <= .60) {
            return "Outdoor relative humidity levels are optimal."
          } else if (firstResponse[0].currently.humidity <= .70) {
            return "Outdoor relative humidity levels are acceptable."
          } else {
            return "Outdoor relative humidity levels are high. Expect a lot of moisture in the air."
          }
        };

        function tempMessage() {if (firstResponse[0].currently.temperature <= 25) {
          return "Recommended clothes to wear: winter bib tights; long-sleeve heavy wicking full turtleneck undershirt, long-sleeve jersey and lined cycling jacket; mittens or lobster claw gloves; balaclava; winter cycling shoes, wool socks, plastic bag, charcoal toe warmers."
        } else if (firstResponse[0].currently.temperature <= 30) {
          return "Recommended clothes to wear: heavyweight tights; long-sleeve heavy wicking turtleneck undershirt and heavy cycling jacket; heavy-weight gloves; lined skullcap; winter cycling shoes, shoe covers, wool socks with charcoal toe warmers."
        } else if (firstResponse[0].currently.temperature <= 35) {
          return "Recommended clothes to wear: Heavyweight tights; long-sleeve heavy wicking turtleneck undershirt and heavy cycling jacket; heavy-weight gloves; headband covering ears;  winter cycling shoes, shoe covers, wool socks with charcoal toe warmers."
        } else if (firstResponse[0].currently.temperature <= 40) {
          return "Recommended clothes to wear: Tights or leg warmers; long-sleeve heavy mock turtleneck (I like Under Armour) and lined cycling jacket; medium-weight gloves; headband covering ears;  winter cycling shoes, shoe covers, wool socks."
        } else if (firstResponse[0].currently.temperature <= 45) {
          return "Recommended clothes to wear: Tights or leg warmers; long-sleeve wicking undershirt and lined cycling jacket;  thin full-fingered gloves; headband covering ears; wool socks and shoe covers."
        } else if (firstResponse[0].currently.temperature <= 50) {
          return "Recommended clothes to wear: Tights or leg warmers; heavy long-sleeve jersey with sleeveless or short-sleeve wicking undershirt; or lightweight long-sleeve jersey with long-sleeve undershirt."
        } else if (firstResponse[0].currently.temperature <= 60) {
          return "Recommended clothes to wear: Shorts and long-sleeve jersey or long-sleeve thin undershirt."
        } else {
          return "Recommended clothes to wear: Shorts and short-sleeve jersey. "
        }
      };
 
          $("#t-temp-value").html(`${temp}°F`);
          $("#t-humidity-value").html(`${humid}%`);
          $("#t-wind-value").html(`${wind} mph`);
          $("#t-rain-value").html(`${rain}%`);
          $("#t-uv-value").html(`${uv}`);
          $("#t-aqi-value").html(`${aqi}`);
          $("#t-temp-explanation").html(`${tempMessage()}`);
          $("#t-humid-explanation").html(`${humidityMessage()}`);
          $("#t-wind-explanation").html(
            `
            <p>${windMessage()}</p>
            <br />
            <p>Coming from the direction of ${windDirection()}.</p>
            `
          );
          $("#t-rain-explanation").html(`${firstResponse["0"].hourly.summary}`);
          $("#t-uv-explanation").html(`${uviMessage()}`);
          $("#t-aqi-explanation").html(`<p>${aqiMessage()}</p>`);
        })
      })
  })
}
