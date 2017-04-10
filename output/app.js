webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

eval("module.exports = function (what) {\n  alert('Hello ' + what + '! Yo!');\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2FsZXJ0LmpzP2E5NWIiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAod2hhdCkge1xuICBhbGVydCgnSGVsbG8gJyArIHdoYXQgKyAnISBZbyEnKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hbGVydC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(Sticky) {\n\nvar $ = __webpack_require__(0);\nvar bootstrap = __webpack_require__(6);\nvar truncatise = __webpack_require__(3);\n\n\n\nvar yell = __webpack_require__(1);\n// yell('dude!');\n\n// jquery test\nconsole.log('jquery test: ', $('#test-element').html());\n\n// vendor test\nvar sticky = new Sticky('.main');\n\n// truncate test\nvar testString = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.';\nvar options = {\n  TruncateLength: 14,\n  TruncateBy: 'words',\n  Strict: false,\n  StripHTML: false,\n  Suffix: '...'\n};\nvar desc = truncatise(testString, options);\nconsole.log('truncate-test', desc);\n$('.truncate-test p').html(desc);\n\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL21haW4uanM/MWM3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxudmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnZhciBib290c3RyYXAgPSByZXF1aXJlKCdib290c3RyYXAtc2FzcycpO1xudmFyIHRydW5jYXRpc2UgPSByZXF1aXJlKCd0cnVuY2F0aXNlJyk7XG5cblxuXG52YXIgeWVsbCA9IHJlcXVpcmUoJy4vYWxlcnQuanMnKTtcbi8vIHllbGwoJ2R1ZGUhJyk7XG5cbi8vIGpxdWVyeSB0ZXN0XG5jb25zb2xlLmxvZygnanF1ZXJ5IHRlc3Q6ICcsICQoJyN0ZXN0LWVsZW1lbnQnKS5odG1sKCkpO1xuXG4vLyB2ZW5kb3IgdGVzdFxudmFyIHN0aWNreSA9IG5ldyBTdGlja3koJy5tYWluJyk7XG5cbi8vIHRydW5jYXRlIHRlc3RcbnZhciB0ZXN0U3RyaW5nID0gJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ZXIgYWRpcGlzY2luZyBlbGl0LiBEb25lYyBvZGlvLiBRdWlzcXVlIHZvbHV0cGF0IG1hdHRpcyBlcm9zLiBOdWxsYW0gbWFsZXN1YWRhIGVyYXQgdXQgdHVycGlzLiBTdXNwZW5kaXNzZSB1cm5hIG5pYmgsIHZpdmVycmEgbm9uLCBzZW1wZXIgc3VzY2lwaXQsIHBvc3VlcmUgYSwgcGVkZS4nO1xudmFyIG9wdGlvbnMgPSB7XG4gIFRydW5jYXRlTGVuZ3RoOiAxNCxcbiAgVHJ1bmNhdGVCeTogJ3dvcmRzJyxcbiAgU3RyaWN0OiBmYWxzZSxcbiAgU3RyaXBIVE1MOiBmYWxzZSxcbiAgU3VmZml4OiAnLi4uJ1xufTtcbnZhciBkZXNjID0gdHJ1bmNhdGlzZSh0ZXN0U3RyaW5nLCBvcHRpb25zKTtcbmNvbnNvbGUubG9nKCd0cnVuY2F0ZS10ZXN0JywgZGVzYyk7XG4kKCcudHJ1bmNhdGUtdGVzdCBwJykuaHRtbChkZXNjKTtcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Njc3MvYXBwLnNjc3M/ODg2NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2Nzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ })
],[8]);