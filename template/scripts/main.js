(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * This is the entrypoint to the JS in your app.
 * ES6 features are supported inside this file.
 */

'use strict';

var _modules_utilityJs = require('./modules/_utility.js');

var _modules_modernizrExtendsJs = require('./modules/_modernizrExtends.js');

_modules_modernizrExtendsJs.MdnzrExtends.init(); // Start modernizer extensions

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);

},{"./modules/_modernizrExtends.js":2,"./modules/_utility.js":3}],2:[function(require,module,exports){
/*******************************************
 * _modernizrExtends.js

 Includes extended featur detection for
 Squarespace version of Modernizr.
*******************************************/

/**
 * @exports MdnzrExtends
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var MdnzrExtends = {

  /**
   * Starts MdnzrExtends scripts
   * @method init
   * @memberof MdnzrExtends
   */
  init: function init() {

    /*
     * Detects vp units
     * Based on:
     http://www.unknownerror.org/opensource/Modernizr/Modernizr/q/stackoverflow/27592524/using-modernizr-to-detect-vh-vw-with-calc
    */
    Modernizr.addTest('calcvpunit', function () {
      var computedHeight,
          div = document.createElement('div');

      div.style.height = 'calc(10vh + 10vw)';
      document.body.appendChild(div);
      computedHeight = window.getComputedStyle(div).height;
      document.body.removeChild(div);

      return computedHeight !== "0px";
    });
  }
};

exports.MdnzrExtends = MdnzrExtends;

},{}],3:[function(require,module,exports){
/*******************************************
 * _utility.js
*******************************************/

/**
 * @exports Utility
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Utility = {

  /**
   * Loads all images on the page using Squarespace's Responsive ImageLoader.
   * @method loadAllImages
   * @see http://developers.squarespace.com/using-the-imageloader/
   * @memberof Utility
   */
  loadAllImages: function loadAllImages() {
    var images = document.querySelectorAll('img[data-src]');
    for (var i = 0; i < images.length; i++) {
      ImageLoader.load(images[i], { load: true });
    }
  },

  /**
   * Fires a window resize event.
   * Use this to trigger Squarespace's Responsive ImageLoader.
   * @method corticaFireResize
   * @see https://answers.squarespace.com/questions/60474/how-do-you-refresh-or-reinitialize-squarespace-gallery-and-video-blocks-after-hiding-or-ajaxing-them.html
   * @memberof Utility
   */
  corticaFireResize: function corticaFireResize() {
    if (document.createEvent) {
      // W3C
      var ev = document.createEvent('Event');
      ev.initEvent('resize', true, true);
      window.dispatchEvent(ev);
    } else {
      // IE
      element = document.documentElement;
      var event = document.createEventObject();
      element.fireEvent("onresize", event);
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
  smoothScroll: function smoothScroll() {
    $(function () {
      $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.href.indexOf('#accordion') == -1) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
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

exports.Utility = Utility;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9NYWNpbnRvc2ggSEQvVXNlcnMvTWFyaW8vRG9jdW1lbnRzL1dvcmsvTG93cnkgQ3JlYXRpdmUvQ3VycmVudCBQcm9qZWN0cy9KYXNwZXIgQ29uc3RydWN0aW9uL1dlYnNpdGUvU2l0ZS9zdGFnaW5nL3NjcmlwdHMvbWFpbi5qcyIsIi9Wb2x1bWVzL01hY2ludG9zaCBIRC9Vc2Vycy9NYXJpby9Eb2N1bWVudHMvV29yay9Mb3dyeSBDcmVhdGl2ZS9DdXJyZW50IFByb2plY3RzL0phc3BlciBDb25zdHJ1Y3Rpb24vV2Vic2l0ZS9TaXRlL3N0YWdpbmcvc2NyaXB0cy9tb2R1bGVzL19tb2Rlcm5penJFeHRlbmRzLmpzIiwiL1ZvbHVtZXMvTWFjaW50b3NoIEhEL1VzZXJzL01hcmlvL0RvY3VtZW50cy9Xb3JrL0xvd3J5IENyZWF0aXZlL0N1cnJlbnQgUHJvamVjdHMvSmFzcGVyIENvbnN0cnVjdGlvbi9XZWJzaXRlL1NpdGUvc3RhZ2luZy9zY3JpcHRzL21vZHVsZXMvX3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O2lDQ0tzQix1QkFBdUI7OzBDQUNoQixnQ0FBZ0M7O0FBRzdELHlDQUFhLElBQUksRUFBRSxDQUFDOzs7QUFHcEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7QUFHN0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pqRCxJQUFJLFlBQVksR0FBRzs7Ozs7OztBQU9qQixNQUFJLEVBQUcsZ0JBQVc7Ozs7Ozs7QUFRaEIsYUFBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsWUFBVztBQUN2QyxVQUFJLGNBQWM7VUFDZCxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FB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IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFRoaXMgaXMgdGhlIGVudHJ5cG9pbnQgdG8gdGhlIEpTIGluIHlvdXIgYXBwLlxuICogRVM2IGZlYXR1cmVzIGFyZSBzdXBwb3J0ZWQgaW5zaWRlIHRoaXMgZmlsZS5cbiAqL1xuXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vbW9kdWxlcy9fdXRpbGl0eS5qcyc7XG5pbXBvcnQgeyBNZG56ckV4dGVuZHMgfSBmcm9tICcuL21vZHVsZXMvX21vZGVybml6ckV4dGVuZHMuanMnO1xuXG5cbk1kbnpyRXh0ZW5kcy5pbml0KCk7IC8vIFN0YXJ0IG1vZGVybml6ZXIgZXh0ZW5zaW9uc1xuXG4vLyBUaGUgZXZlbnQgc3Vic2NyaXB0aW9uIHRoYXQgbG9hZHMgaW1hZ2VzIHdoZW4gdGhlIHBhZ2UgaXMgcmVhZHlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBsb2FkQWxsSW1hZ2VzKTtcblxuLy8gVGhlIGV2ZW50IHN1YnNjcmlwdGlvbiB0aGF0IHJlbG9hZHMgaW1hZ2VzIG9uIHJlc2l6ZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGxvYWRBbGxJbWFnZXMpO1xuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIF9tb2Rlcm5penJFeHRlbmRzLmpzXG5cbiBJbmNsdWRlcyBleHRlbmRlZCBmZWF0dXIgZGV0ZWN0aW9uIGZvclxuIFNxdWFyZXNwYWNlIHZlcnNpb24gb2YgTW9kZXJuaXpyLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBAZXhwb3J0cyBNZG56ckV4dGVuZHNcbiAqL1xuXG52YXIgTWRuenJFeHRlbmRzID0ge1xuXG4gIC8qKlxuICAgKiBTdGFydHMgTWRuenJFeHRlbmRzIHNjcmlwdHNcbiAgICogQG1ldGhvZCBpbml0XG4gICAqIEBtZW1iZXJvZiBNZG56ckV4dGVuZHNcbiAgICovXG4gIGluaXQgOiBmdW5jdGlvbigpIHtcblxuXG4gICAgLypcbiAgICAgKiBEZXRlY3RzIHZwIHVuaXRzXG4gICAgICogQmFzZWQgb246XG4gICAgIGh0dHA6Ly93d3cudW5rbm93bmVycm9yLm9yZy9vcGVuc291cmNlL01vZGVybml6ci9Nb2Rlcm5penIvcS9zdGFja292ZXJmbG93LzI3NTkyNTI0L3VzaW5nLW1vZGVybml6ci10by1kZXRlY3Qtdmgtdnctd2l0aC1jYWxjXG4gICAgKi9cbiAgICBNb2Rlcm5penIuYWRkVGVzdCgnY2FsY3ZwdW5pdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tcHV0ZWRIZWlnaHQsXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gJ2NhbGMoMTB2aCArIDEwdncpJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICBjb21wdXRlZEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikuaGVpZ2h0O1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRpdik7XG5cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkSGVpZ2h0ICE9PSBcIjBweFwiO1xuICAgIH0pO1xuXG4gIH1cbn1cblxuZXhwb3J0IHsgTWRuenJFeHRlbmRzIH07XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogX3V0aWxpdHkuanNcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQGV4cG9ydHMgVXRpbGl0eVxuICovXG5cbnZhciBVdGlsaXR5ID0ge1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYWxsIGltYWdlcyBvbiB0aGUgcGFnZSB1c2luZyBTcXVhcmVzcGFjZSdzIFJlc3BvbnNpdmUgSW1hZ2VMb2FkZXIuXG4gICAgICogQG1ldGhvZCBsb2FkQWxsSW1hZ2VzXG4gICAgICogQHNlZSBodHRwOi8vZGV2ZWxvcGVycy5zcXVhcmVzcGFjZS5jb20vdXNpbmctdGhlLWltYWdlbG9hZGVyL1xuICAgICAqIEBtZW1iZXJvZiBVdGlsaXR5XG4gICAgICovXG4gICAgbG9hZEFsbEltYWdlcyA6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZ1tkYXRhLXNyY10nICk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBJbWFnZUxvYWRlci5sb2FkKGltYWdlc1tpXSwge2xvYWQ6IHRydWV9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRmlyZXMgYSB3aW5kb3cgcmVzaXplIGV2ZW50LlxuICAgICAqIFVzZSB0aGlzIHRvIHRyaWdnZXIgU3F1YXJlc3BhY2UncyBSZXNwb25zaXZlIEltYWdlTG9hZGVyLlxuICAgICAqIEBtZXRob2QgY29ydGljYUZpcmVSZXNpemVcbiAgICAgKiBAc2VlIGh0dHBzOi8vYW5zd2Vycy5zcXVhcmVzcGFjZS5jb20vcXVlc3Rpb25zLzYwNDc0L2hvdy1kby15b3UtcmVmcmVzaC1vci1yZWluaXRpYWxpemUtc3F1YXJlc3BhY2UtZ2FsbGVyeS1hbmQtdmlkZW8tYmxvY2tzLWFmdGVyLWhpZGluZy1vci1hamF4aW5nLXRoZW0uaHRtbFxuICAgICAqIEBtZW1iZXJvZiBVdGlsaXR5XG4gICAgICovXG4gICAgY29ydGljYUZpcmVSZXNpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7IC8vIFczQ1xuICAgICAgICB2YXIgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgZXYuaW5pdEV2ZW50KCdyZXNpemUnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgfSBlbHNlIHsgLy8gSUVcbiAgICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvbnJlc2l6ZVwiLGV2ZW50KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU21vb3RoIHNjcm9sbFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzbW9vdGhTY3JvbGxcbiAgICAgKiBAc2VlXG4gICAgICogQG1lbWJlcm9mIFV0aWxpdHlcbiAgICAgKiBub3RlOiBmaWx0ZXJzIG91dCBsb2NhdGlvbnMgdGhhdCBjb250YWluIHRoZSBhY2NvcmRpb24gc3RyaW5nXG4gICAgICovXG4gICAgc21vb3RoU2Nyb2xsIDogZnVuY3Rpb24oKSB7XG4gICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSAmJiB0aGlzLmhyZWYuaW5kZXhPZignI2FjY29yZGlvbicpID09IC0xKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gJCgnI2hlYWRlcicpLmhlaWdodCgpXG4gICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNtb290aCBzY3JvbGxlZFwiKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG59O1xuXG5leHBvcnQgeyBVdGlsaXR5IH07XG4iXX0=
