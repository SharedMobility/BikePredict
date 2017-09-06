(function($) {

  var app = {

    init: function() {
      app.toggleModal()
    },

    toggleModal: function() {
      let modal = document.getElementById('myModal');
      let span = document.getElementsByClassName("close")[0];

      $("#t-modal").on("click", function() {
        modal.style.display = "block";
      })
      span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
      }
    }
  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);
