/* ====================================================
  This is the entrypoint to the JS in your app.
  ES6 features are supported inside this file.
==================================================== /

/*
 ** Requires
 ******************************************/
// jQuery
window.jQuery = require('jquery');
window.$ = window.jQuery; // for use in this file
require('responsiveslides');

/*
 ** Imports
 ******************************************/
import {
  Utility
} from './modules/_utility.js';
import {
  MdnzrExtends
} from './modules/_modernizrExtends.js';

/*
 ** ok to load before DOM Ready
 ******************************************/
MdnzrExtends.init(); // Start modernizer extensions

/*
 ** jQuery Document Ready
 ******************************************/
$(document).ready(function () {
  /*
   ** Load all Images
   *****************************/
  Utility.loadAllImages();

  /*
   ** Make sure content has margin
   ** equal to header height
   ****************************/
  function contentPadding () {
    let $content = $('#main-content');
    let $header = $('.header');
    let height;
    let resizetimer;

    function getHeight ($el) {
      return $el.outerHeight();
    }

    function setPadding ($target, $el) {
      height = getHeight($el);
      $target.css({'padding-top': height});
      console.log('padding is set to: ' + height);
    }

    setPadding($content, $header);

    $(window).on('load', function () {
      setPadding($content, $header);
    });

    $(window).on('resize', function () { // Resize event subscription. Uses a debounce technique
      clearTimeout(resizetimer); // clear resizetimer
      resizetimer = setTimeout(function () { // start new resize timer function
        setPadding($content, $header);
      }, 50);
    });
  }

  contentPadding();

  /*
   ** Start background Slider
   ****************************/
  $('#background-wrapper').responsiveSlides();

  /*
   ** Show popover link
   ****************************/
  $(window).on('load', function () {
    $('#popover-link').animate({
      opacity: 1
    }, 'slow', function () {
      // Animation complete.
    });
  });
});

/*
 ** js event subscriptions
 ******************************************/
// The event subscription that reloads images on window resize
window.addEventListener('resize', Utility.loadAllImages);
