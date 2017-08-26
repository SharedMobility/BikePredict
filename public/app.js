(function($) {

  var app = {

    init: function() {
      //app.isPage()
    },

    isPage: function() {
      let count = $('#t-search-count').val();
      if(count != 0) {
        $('#pac-input').addClass('in-nav');
      }
    }

  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);
