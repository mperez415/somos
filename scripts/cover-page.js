/******************************************************
  This is the entrypoint to the JS in your app.
  ES6 features are supported inside this file.
******************************************************/

/*
 ** Requires
******************************************/
// jQuery
window.jQuery = require('jquery');
window.$ = window.jQuery; // for use in this file

/*
 ** Imports
******************************************/
import {Utility} from './modules/_utility.js';
import { MdnzrExtends } from './modules/_modernizrExtends.js';

/*
 ** ok to load before DOM Ready
******************************************/
MdnzrExtends.init(); // Start modernizer extensions

/*
 ** jQuery Document Ready
******************************************/
$(document).ready(function() {

  /*
  ** Load all Images
  *****************************/
  Utility.loadAllImages();

  /*
  ** Replace svgs with pngs
  ** if svgs are not supported.
  *****************************/
  if (!Modernizr.svg) {
      var imgs = document.getElementsByTagName('img');
      var svgExtension = /.*\.svg$/ ;
      var l = imgs.length;
      for(var i = 0; i < l; i++) {
          if(imgs[i].src.match(svgExtension)) {
              imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
              console.log(imgs[i].src);
          }
      }
  }

});

/*
 ** js event subscriptions
******************************************/
// The event subscription that reloads images on window resize
window.addEventListener('resize', Utility.loadAllImages);
