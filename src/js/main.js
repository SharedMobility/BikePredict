(function($) {

  var app = {

    init: function() {
      app.test();
    },

    test: function() {
      alert('heythere');
    }

  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);
