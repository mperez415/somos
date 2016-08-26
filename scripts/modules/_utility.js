/*******************************************
 * _utility.js
*******************************************/

/**
 * @exports Utility
 */

var Utility = {

    /**
     * Loads all images on the page using Squarespace's Responsive ImageLoader.
     * @method loadAllImages
     * @see http://developers.squarespace.com/using-the-imageloader/
     * @memberof Utility
     */
    loadAllImages : function() {
      var images = document.querySelectorAll('img[data-src]' );
      for (var i = 0; i < images.length; i++) {
        ImageLoader.load(images[i], {load: true});
      }
    },

    /**
     * Fires a window resize event.
     * Use this to trigger Squarespace's Responsive ImageLoader.
     * @method corticaFireResize
     * @see https://answers.squarespace.com/questions/60474/how-do-you-refresh-or-reinitialize-squarespace-gallery-and-video-blocks-after-hiding-or-ajaxing-them.html
     * @memberof Utility
     */
    corticaFireResize: function() {
      if (document.createEvent) { // W3C
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      } else { // IE
          element = document.documentElement;
          var event = document.createEventObject();
          element.fireEvent("onresize",event);
      }
    },

    /**
     * Smooth scroll
     *
     * @method smoothScroll
     * @see
     * @memberof Utility
     * note: filters out locations that contain the accordion string
     */
    smoothScroll : function() {
      $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname && this.href.indexOf('#accordion') == -1) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top - $('#header').height()
              }, 1000);
              // console.log("smooth scrolled");
              return false;
            }
          }
        });
      });
    }
};

export { Utility };
