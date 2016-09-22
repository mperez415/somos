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
   ** Start background Slider
   ****************************/
  $('#background-wrapper').responsiveSlides();

  $(window).on('load', function () {
    /*
     ** Show popover link
     ****************************/
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
