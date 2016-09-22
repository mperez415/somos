/* =========================================
 * _modernizrExtends.js

 Includes extended featur detection for
 Squarespace version of Modernizr.
========================================= */

/**
 * @exports MdnzrExtends
 */

var MdnzrExtends = {

  /**
   * Starts MdnzrExtends scripts
   * @method init
   * @memberof MdnzrExtends
   */
  init: function () {
    /*
     * Detects vp units
     * Based on:
     http://www.unknownerror.org/opensource/Modernizr/Modernizr/q/stackoverflow/27592524/using-modernizr-to-detect-vh-vw-with-calc
    */
    Modernizr.addTest('calcvpunit', function () {
      var computedHeight;
      var div = document.createElement('div');

      div.style.height = 'calc(10vh + 10vw)';
      document.body.appendChild(div);
      computedHeight = window.getComputedStyle(div).height;
      document.body.removeChild(div);

      return computedHeight !== '0px';
    });
  }
};

export {
  MdnzrExtends
};
