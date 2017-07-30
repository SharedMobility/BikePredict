    function initMap() {
        
    var map = new google.maps.Map(document.getElementById('map'),  {  
        center: {lat: 34, lng: -83},  
        mapTypeId: "terrain",  
        zoom: 11  
        });

    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    var t = new Date().getTime();  
    var waqiMapOverlay = new google.maps.ImageMapType( {  
        getTileUrl: function(coord, zoom) {  
        return 'https://tiles.waqi.info/tiles/usepa-aqi/' + zoom + "/" + coord.x + "/" + coord.y + ".png?token=7af2191ef71f827a4de1cbcdd9463989a7c3bb6c";},  
        name: "Air Quality",  
    });  

    map.overlayMapTypes.insertAt(0,waqiMapOverlay);
    }
initMap();