/**
 * This is the entrypoint to the JS in your app.
 * ES6 features are supported inside this file.
 */

import {Utility} from './modules/_utility.js';
import { MdnzrExtends } from './modules/_modernizrExtends.js';


MdnzrExtends.init(); // Start modernizer extensions

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);
