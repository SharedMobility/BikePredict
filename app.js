//   function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 14,
//       center: {lat: 33, lng: -83}
//     });

//     var bikeLayer = new google.maps.BicyclingLayer();
//     bikeLayer.setMap(map);
//   }

//   function watchSubmit() {
//     $('.js-search-form').submit(event => {
//       event.preventDefault();
//       const queryTarget = $(event.currentTarget).find('.js-query');
//       const query = queryTarget.val();
//       queryTarget.val("");
//       getDataFromApi(query);
//     });
//   }