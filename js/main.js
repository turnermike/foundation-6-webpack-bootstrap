

var $ = require('jquery');
var bootstrap = require('bootstrap-sass');
var truncatise = require('truncatise');



var yell = require('./alert.js');
// yell('dude!');

// jquery test
console.log('jquery test: ', $('#test-element').html());

// vendor test
var sticky = new Sticky('.main');

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
console.log('truncate-test', desc);
$('.truncate-test p').html(desc);


