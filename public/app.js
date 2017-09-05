(function($) {

  var app = {

    init: function() {
      app.toggleModal()
    },

    toggleModal: function() {
      $("#t-modal").on("click", function() {
        alert("Hello World");
      })
    }

  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);
