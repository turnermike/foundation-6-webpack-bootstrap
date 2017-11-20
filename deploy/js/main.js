/**
 * main.js
 *
 */


// import modules
import { foundation } from './lib/foundation-config.js';                         // individual foundation scripts can be loaded here
import truncatise from 'truncatise';

var windowSize;

// custom modue example
var customModuleExample = require('./custom-module.js');
customModuleExample('dudeski!!!');

// dom ready
$(document).ready(function(){

  // try{

    initDevDebug();

    // set the windowSize variable on window resize, trigger is used for page load
    $(window).on('resize', function() {
      windowSize = getBrowserSize();
      // console.log('windowSize', windowSize);
    }).trigger('resize');

    // initialize foundation
    $(document).foundation();

    // truncate test
    var testString = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.';
    var options = {
      TruncateLength: 14,
      TruncateBy: 'words',
      Strict: false,
      StripHTML: false,
      Suffix: '...'
    };
    var desc = truncatise(testString, options);
    $('.truncate-test p').html(desc);

  // }catch(error){

  //   console.log('Error: ', error);

  // }

}); // dom ready




/**
 * initDevDebug
 *
 * If the value of #txtDebug (hidden input located in footer.php) is set to true,
 * a small box will appear in the bottom left corner of the screen with screen
 * size info.
 *
 */
function initDevDebug() {

  console.log('initDevDebug');

  $('body', 'html').append('<div id="debug-message"></div>');
  $('#debug-message').append('<p class="small">small</p><p class="medium">medium</p><p class="large">large</p><p class="exlarge">extra large</p>');
  $(window).resize(function () {
      $('#debug-message').empty();
      $('#debug-message').append('<p class="small">small</p><p class="medium">medium</p><p class="large">large</p><p class="exlarge">extra large</p>');
      $('#debug-message').append('<p>width: ' + window.innerWidth + '</p>');
  });

} // initDebDebug


/**
 * getBrowserSize
 *
 * A string is attached to body:after for the current screensize. These are assigned
 * via _global.scss
 * Posibilities include: phone, mobile, tablet, small-desktop, medium-desktop, large-desktop
 *
 * @return (string) windowSize
 *
 */
function getBrowserSize(){

  console.log('getBrowserSize()');

  if(window.getComputedStyle){

      windowSize = window
          .getComputedStyle(document.body,':after')
          .getPropertyValue('content');
      windowSize = windowSize.replace(/["']/g,'');
  }
  return windowSize;

} // getBrowserSize()
